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

const sendAT = (cmd) => {
    console.log(`[AT COMMAND]: ${cmd}`);
    port.write(`${cmd}\r\n`);
};

port.on('open', () => {
    console.log("--- Initializing Tactical Link (4GVMS) ---");
    sendAT("AT+QIDEACT=1");
    setTimeout(() => sendAT('AT+CGDCONT=1,"IP","ufone.corporate"'), 2000);
    setTimeout(() => sendAT("AT+QIACT=1"), 5000);
    setTimeout(() => sendAT('AT+QIOPEN=1,0,"TCP LISTENER","0.0.0.0",0,5000,2'), 8000);
});

// --- 3. DATA ENGINE (GPS PARSER) ---
parser.on('data', async (line) => {
    const raw = line.trim();
    if (!raw) return;

    if (raw.includes('+QIURC: "recv",0')) {
        sendAT("AT+QIRD=0,1500");
        return;
    }

    if (raw.includes("&&")) {
        const p = raw.split(',');
        if (p.length < 10) return;

        const gps = {
            imei: p[1],
            status: p[6], 
            lat: parseFloat(p[7]),
            lng: parseFloat(p[8]),
            speed: parseInt(p[9]) || 0
        };

        if (gps.status === 'A') {
            try {
                const hour = new Date().getHours();
                const isNight = (hour >= 19 || hour < 6);

                const [asset] = await db.execute(`
                    SELECT v.vehicle_id, v.vehicle_no, u.unit_name 
                    FROM vehicles v
                    JOIN units u ON v.unit_id = u.unit_id
                    WHERE v.imei = ? LIMIT 1
                `, [gps.imei]);

                if (asset.length > 0) {
                    const { vehicle_id, vehicle_no, unit_name } = asset[0];

                    // Update Live Status
                    await db.execute(`
                        INSERT INTO vehicle_status (vehicle_id, latitude, longitude, speed, last_ping) 
                        VALUES (?, ?, ?, ?, NOW()) ON DUPLICATE KEY UPDATE 
                        latitude=VALUES(latitude), longitude=VALUES(longitude), speed=VALUES(speed), last_ping=NOW()
                    `, [vehicle_id, gps.lat, gps.lng, gps.speed]);

                    // Log Active Movement
                    await db.execute(`
                        INSERT INTO active_move (vehicle_id, lat, lng, speed, is_night_move) 
                        VALUES (?, ?, ?, ?, ?)
                    `, [vehicle_id, gps.lat, gps.lng, gps.speed, isNight]);

                    broadcast({ ba: vehicle_no, unit: unit_name, lat: gps.lat, lng: gps.lng, speed: gps.speed, isNight });
                }
            } catch (err) { console.error("Data Engine Error:", err.message); }
        }
    }
});

// --- 4. API ENDPOINTS ---

/** FLEET & DASHBOARD **/
app.get('/api/fleet/status', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT v.vehicle_no, v.vehicle_type, u.unit_name, 
                   vs.latitude, vs.longitude, vs.speed, vs.last_ping
            FROM vehicles v
            LEFT JOIN vehicle_status vs ON v.vehicle_id = vs.vehicle_id
            JOIN units u ON v.unit_id = u.unit_id
            ORDER BY v.vehicle_no ASC
        `);
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

/** REPORTS & HISTORY **/
app.get(['/api/sidebar/move-history', '/api/reports/mileage'], async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT v.vehicle_no AS ba, u.unit_name AS unit, 
                   mh.start_lat AS startLat, mh.start_lng AS startLng, 
                   mh.end_lat AS lastLat, mh.end_lng AS lastLng, 
                   mh.total_distance AS total, mh.avg_speed AS currentSpeed,
                   mh.completed_at
            FROM move_history mh
            JOIN vehicles v ON mh.vehicle_id = v.vehicle_id
            JOIN units u ON v.unit_id = u.unit_id
            ORDER BY mh.completed_at DESC
        `);
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

/** MOVE SANCTION MANAGEMENT **/
app.get('/api/sanctions', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT ms.*, v.vehicle_no, u.unit_name 
            FROM move_sanctions ms 
            JOIN vehicles v ON ms.vehicle_id = v.vehicle_id 
            JOIN units u ON v.unit_id = u.unit_id
            ORDER BY ms.created_at DESC
        `);
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/sanctions', async (req, res) => {
    const { vehicle_id, route_from, route_to, start_datetime, end_datetime } = req.body;
    try {
        const [result] = await db.execute(`
            INSERT INTO move_sanctions 
            (vehicle_id, route_from, route_to, start_datetime, end_datetime, status, created_at) 
            VALUES (?, ?, ?, ?, ?, 'ACTIVE', NOW())
        `, [vehicle_id, route_from, route_to, start_datetime, end_datetime]);
        res.status(201).json({ message: "Sanction Issued", id: result.insertId });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

/** ALERTS & LOGS **/
app.get('/api/sidebar/violations-alerts', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT va.*, v.vehicle_no AS ba, u.unit_name AS unit
            FROM violations_alerts va 
            JOIN vehicles v ON va.vehicle_id = v.vehicle_id 
            JOIN units u ON v.unit_id = u.unit_id
            WHERE va.is_resolved = FALSE ORDER BY va.created_at DESC
        `);
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/sidebar/night-move-logs', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT am.*, v.vehicle_no AS ba, u.unit_name AS unit
            FROM active_move am 
            JOIN vehicles v ON am.vehicle_id = v.vehicle_id 
            JOIN units u ON v.unit_id = u.unit_id
            WHERE am.is_night_move = TRUE ORDER BY am.recorded_at DESC
        `);
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

/** DROPDOWN HELPERS **/
app.get('/api/units_full', async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT unit_id, unit_name FROM units ORDER BY unit_name ASC");
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/vehicles/by-unit/:unitId', async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT vehicle_id, vehicle_no FROM vehicles WHERE unit_id = ?", [req.params.unitId]);
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});
app.get('/api/sidebar/violations-alerts', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT 
                va.alert_id,
                va.alert_type,
                va.details,
                va.is_resolved,
                va.created_at,
                v.vehicle_no AS ba, 
                u.unit_name AS unit
            FROM violations_alerts va 
            JOIN vehicles v ON va.vehicle_id = v.vehicle_id 
            JOIN units u ON v.unit_id = u.unit_id
            WHERE va.is_resolved = FALSE 
            ORDER BY va.created_at DESC
        `);
        res.json(rows);
    } catch (err) { 
        console.error("Alerts Route Error:", err.message);
        res.status(500).json({ error: err.message }); 
    }
});
app.get('/api/path/:vehicleId', async (req, res) => {
    const [rows] = await db.execute(`
        SELECT lat, lng, speed, recorded_at as time 
        FROM active_move 
        WHERE vehicle_id = ? 
        ORDER BY recorded_at ASC
    `, [req.params.vehicleId]);
    res.json(rows);
});
app.listen(5000, () => console.log("Tactical VMS Server active on Port 5000"));