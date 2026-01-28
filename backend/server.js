const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const { WebSocketServer } = require('ws');
const express = require('express');
const cors = require('cors');
const db = require('./database');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// --- 1. WEBSOCKET FOR REAL-TIME UI ---
const wss = new WebSocketServer({ port: 8080 });
function broadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === 1) client.send(JSON.stringify(data));
    });
}

// --- 2. MODEM GATEWAY CONFIG ---
const port = new SerialPort({ path: 'COM11', baudRate: 115200 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

function sendAT(cmd) {
    console.log(`[AT COMMAND]: ${cmd}`);
    port.write(`${cmd}\r\n`);
}

function initModem() {
    console.log("--- Initializing Tactical Link ---");
    sendAT("AT+QIDEACT=1");
    setTimeout(() => sendAT('AT+CGDCONT=1,"IP","ufone.corporate"'), 2000);
    setTimeout(() => sendAT("AT+QIACT=1"), 5000);
    setTimeout(() => sendAT('AT+QIOPEN=1,0,"TCP LISTENER","0.0.0.0",0,5000,2'), 8000);
}

port.on('open', () => initModem());

// --- 3. THE DATA ENGINE ---
parser.on('data', async (line) => {
    const raw = line.trim();
    if (!raw) return;

    // Trigger manual read when data arrives in modem buffer
    if (raw.includes('+QIURC: "recv",0')) {
        sendAT("AT+QIRD=0,1500");
        return;
    }

    // Process VT100 GPS Packet
    if (raw.includes("&&")) {
        console.log("GPS PACKET INBOUND:", raw);
        const p = raw.split(',');
        if (p.length < 10) return;

        const gps = {
            imei: p[1],
            status: p[6], // 'A' = Valid, 'V' = Invalid
            lat: parseFloat(p[7]),
            lng: parseFloat(p[8]),
            speed: parseInt(p[9]) || 0
        };

        if (gps.status === 'A') {
            try {
                // Find which vehicle this IMEI belongs to
                const [asset] = await db.execute(`
                    SELECT v.vehicle_id, v.vehicle_no, u.unit_name 
                    FROM vehicles v
                    JOIN trackers t ON v.tracker_id = t.tracker_id
                    JOIN units u ON v.unit_id = u.unit_id
                    WHERE t.imei = ? LIMIT 1
                `, [gps.imei]);

                if (asset.length > 0) {
                    const { vehicle_id, vehicle_no, unit_name } = asset[0];

                    // UPDATE LIVE VIEW (One row per truck)
                    await db.execute(`
                        INSERT INTO live_status (imei, latitude, longitude, speed) 
                        VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE 
                        latitude=VALUES(latitude), longitude=VALUES(longitude), speed=VALUES(speed), updated_at=NOW()
                    `, [gps.imei, gps.lat, gps.lng, gps.speed]);

                    // STORE IN HISTORY (Continuous path points)
                    await db.execute(`
                        INSERT INTO location_history (vehicle_id, lat, lng, speed, raw_packet) 
                        VALUES (?, ?, ?, ?, ?)
                    `, [vehicle_id, gps.lat, gps.lng, gps.speed, raw]);

                    // PUSH TO WEB INTERFACE
                    broadcast({
                        ba: vehicle_no,
                        unit: unit_name,
                        lat: gps.lat,
                        lng: gps.lng,
                        speed: gps.speed
                    });
                }
            } catch (err) {
                console.error("Database Processing Error:", err);
            }
        }
    }
});

// --- 4. API ENDPOINTS ---

// For Active Move (History) Page
app.get('/api/history/:ba', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT lat, lng, speed, DATE_FORMAT(recorded_at, '%H:%i:%s') as time
            FROM location_history lh
            JOIN vehicles v ON lh.vehicle_id = v.vehicle_id
            WHERE v.vehicle_no = ? 
            ORDER BY recorded_at ASC LIMIT 1000
        `, [req.params.ba]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// For Fleet Overview Page
app.get('/api/fleet/status', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT v.vehicle_no, v.vehicle_type, u.unit_name, 
            COALESCE(ls.latitude, 0) as latitude, COALESCE(ls.longitude, 0) as longitude, COALESCE(ls.speed, 0) as speed
            FROM vehicles v
            JOIN units u ON v.unit_id = u.unit_id
            LEFT JOIN trackers t ON v.tracker_id = t.tracker_id
            LEFT JOIN live_status ls ON t.imei = ls.imei
            GROUP BY v.vehicle_no
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log("Tactical Server running on Port 5000"));