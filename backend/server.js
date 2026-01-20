const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const express = require('express');
const { WebSocketServer } = require('ws');
const path = require('path');

// --- CONFIGURATION ---
const COM_PORT = 'COM11';
const BAUD_RATE = 115200;
const WEB_PORT = 3000;

// --- WEB SERVER & WEBSOCKET SETUP ---
const app = express();
const server = app.listen(WEB_PORT, () => {
    console.log(`\x1b[32m[SERVER]: Web Dashboard live at http://localhost:${WEB_PORT}\x1b[0m`);
});
const wss = new WebSocketServer({ server });

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// Function to send data to all connected browser tabs
function broadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === 1) {
            client.send(JSON.stringify(data));
        }
    });
}

// --- SERIAL PORT SETUP ---
const port = new SerialPort({ path: COM_PORT, baudRate: BAUD_RATE });
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

let isNetworkReady = false;

function send(cmd) {
    console.log(`\x1b[36m[SENDING]: ${cmd}\x1b[0m`);
    port.write(`${cmd}\r\n`);
}

function setupGateway() {
    console.log(`\n\x1b[44m RE-INITIALIZING TACTICAL LINK... \x1b[0m\n`);
    isNetworkReady = false;
    send("AT+QIDEACT=1");
    setTimeout(() => send('AT+CGDCONT=1,"IP","ufone.corporate"'), 2000);
    setTimeout(() => send("AT+QIACT=1"), 4000);
    setTimeout(() => send('AT+QIOPEN=1,0,"TCP LISTENER","127.0.0.1",0,5000,2'), 7000);
}

// --- VT100 PARSER METHOD ---
function parseVT100(raw) {
    try {
        const startIndex = raw.indexOf("&&") + 3;
        const body = raw.substring(startIndex);
        const p = body.split(',');

        if (p.length < 12) return null;

        // Date format: 260118101451 -> 2026-01-18 10:14:51
        const rawTime = p[5];
        const formattedTime = `20${rawTime.substring(0,2)}-${rawTime.substring(2,4)}-${rawTime.substring(4,6)} ${rawTime.substring(6,8)}:${rawTime.substring(8,10)}:${rawTime.substring(10,12)}`;

        return {
            imei: p[1],
            time: formattedTime,
            status: p[6] === 'A' ? 'ACTIVE' : 'VOID',
            lat: parseFloat(p[7]),
            lng: parseFloat(p[8]),
            speed: p[10],
            course: p[11],
            altitude: p[12]
        };
    } catch (err) {
        console.error("Parsing Error:", err);
        return null;
    }
}

// --- DATA HANDLING ---
port.on('open', () => {
    console.log(`\x1b[32m[SUCCESS]: ${COM_PORT} Connected.\x1b[0m`);
    setupGateway();
});

parser.on('data', (line) => {
    const raw = line.trim();
    if (!raw) return;

    console.log(`\x1b[90m[MODEM]: ${raw}\x1b[0m`);

    if (raw.includes("pdpdeact")) {
        setupGateway();
    }

    if (raw.includes("+QIOPEN: 0,0")) {
        isNetworkReady = true;
        console.log("\x1b[42m\x1b[30m SYSTEM LIVE \x1b[0m");
    }

    // Capture and Broadcast GPS Data
    if (raw.includes("&&")) {
        const parsedData = parseVT100(raw);
        if (parsedData) {
            console.log(`\x1b[33m[GPS]: Lat ${parsedData.lat}, Lng ${parsedData.lng}\x1b[0m`);
            broadcast(parsedData);
        }
    }
});

// Heartbeat to keep the connection alive
setInterval(() => {
    if (isNetworkReady) port.write("AT+CSQ\r\n");
}, 30000);