const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const express = require('express');
const { WebSocketServer } = require('ws');
const path = require('path');

// --- SERVER SETUP ---
const app = express();
const server = app.listen(3000, () => console.log('Dashboard: http://localhost:3000'));
const wss = new WebSocketServer({ server });

app.use(express.static(path.join(__dirname))); // Serve index.html

function broadcast(data) {
    wss.clients.forEach(client => {
        if (client.readyState === 1) client.send(JSON.stringify(data));
    });
}

// --- SERIAL SETUP ---
const port = new SerialPort({ path: 'COM11', baudRate: 115200 });
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

function send(cmd) {
    console.log(`\x1b[36m[SENDING]: ${cmd}\x1b[0m`);
    port.write(`${cmd}\r\n`);
}

// --- VT100 PARSER ---
function parseVT100(raw) {
    try {
        const startIndex = raw.indexOf("&&") + 3;
        const body = raw.substring(startIndex);
        const p = body.split(',');
        if (p.length < 12) return null;

        return {
            imei: p[1],
            time: `20${p[5].substring(0,2)}-${p[5].substring(2,4)}-${p[5].substring(4,6)} ${p[5].substring(6,8)}:${p[5].substring(8,10)}`,
            lat: parseFloat(p[7]),
            lng: parseFloat(p[8]),
            speed: p[10],
            status: p[6] === 'A' ? 'Active' : 'Searching'
        };
    } catch (e) { return null; }
}

// --- MODEM LOGIC ---
let isNetworkReady = false;
function setupGateway() {
    isNetworkReady = false;
    send("AT+QIDEACT=1"); 
    setTimeout(() => send('AT+CGDCONT=1,"IP","ufone.corporate"'), 2000);
    setTimeout(() => send("AT+QIACT=1"), 5000);
    setTimeout(() => send('AT+QIOPEN=1,0,"TCP LISTENER","0.0.0.0",0,5000,2'), 9000);
}

port.on('open', () => setupGateway());

parser.on('data', (line) => {
    const raw = line.trim();
    if (!raw) return;
    console.log(`[MODEM]: ${raw}`);

    if (raw.includes("+QIOPEN: 0,0")) isNetworkReady = true;
    
    if (raw.includes('+QIURC: "recv",0')) {
        send("AT+QIRD=0,1500");
    }

    if (raw.includes("&&")) {
        const data = parseVT100(raw);
        if (data) broadcast(data); // Send to Webpage
    }
});

setInterval(() => { if (isNetworkReady) port.write("AT+CSQ\r\n"); }, 30000);