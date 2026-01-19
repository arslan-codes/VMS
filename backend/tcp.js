const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const COM_PORT = 'COM11';
const BAUD_RATE = 115200;

const port = new SerialPort({ path: COM_PORT, baudRate: BAUD_RATE });
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

function send(cmd) {
    console.log(`\x1b[36m[SENDING]: ${cmd}\x1b[0m`);
    port.write(`${cmd}\r\n`);
}

// State tracker to prevent command collision
let isNetworkReady = false;

function setupGateway() {
    console.log(`\n\x1b[44m  RE-INITIALIZING TACTICAL LINK...  \x1b[0m\n`);
    isNetworkReady = false;
    send("AT+QIDEACT=1"); // Kill any old/stuck context
    setTimeout(() => send('AT+CGDCONT=1,"IP","ufone.corporate"'), 2000);
    setTimeout(() => send("AT+QIACT=1"), 4000);
    setTimeout(() => send('AT+QIOPEN=1,0,"TCP LISTENER","127.0.0.1",0,5000,2'), 7000);
}

port.on('open', () => {
    console.log(`\x1b[32m[SUCCESS]: COM11 Connected.\x1b[0m`);
    setupGateway();
});

parser.on('data', (line) => {
    const raw = line.trim();
    if (!raw) return;

    console.log(`\x1b[90m[MODEM]: ${raw}\x1b[0m`);

    // --- 1. HANDLE NETWORK DROP ---
    if (raw.includes("pdpdeact")) {
        console.log("\x1b[31m[CRITICAL]: Network Deactivated by Tower. Reconnecting...\x1b[0m");
        setupGateway();
    }

    // --- 2. SUCCESSFUL ACTIVATION ---
    if (raw.includes("+QIOPEN: 0,0")) {
        isNetworkReady = true;
        console.log("\x1b[42m\x1b[30m SYSTEM LIVE \x1b[0m Listening for Assets...");
    }

    // --- 3. DATA PUSH DETECTION ---
    if (raw.includes('+QIURC: "recv"')) {
        console.log(`\x1b[35m[INCOMING]: Data Payload arriving...\x1b[0m`);
    }

    // --- 4. CAPTURE DATA PACKET ---
    if (raw.includes("&&")) {
        console.log(`\n\x1b[43m\x1b[30m GPS DATA RECEIVED \x1b[0m`);
        console.log(`\x1b[33m${raw}\x1b[0m\n`);
    }

    // --- 5. KEEP ALIVE (If we see OK and we are live, do nothing, otherwise keep pulse) ---
});

// HEARTBEAT: Send a pulse every 30 seconds to prevent "pdpdeact"
setInterval(() => {
    if (isNetworkReady) {
        // Just a simple signal check to keep the tower happy
        port.write("AT+CSQ\r\n"); 
    }
}, 30000);