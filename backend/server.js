/******************************************************************
 * EC20 TCP LISTENER GATEWAY – VT100 TRACKER RECEIVER
 * Stable version for single-tracker testing
 ******************************************************************/

const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const COM_PORT = 'COM11';
const BAUD_RATE = 115200;

const port = new SerialPort({ path: COM_PORT, baudRate: BAUD_RATE });
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

function send(cmd) {
    console.log(`\x1b[36m[SENDING]: ${cmd}\x1b[0m`);
    port.write(cmd + '\r\n');
}

let isNetworkReady = false;
let recvBuffer = "";

/* =========================================================
   VT100 PACKET PARSER
   ========================================================= */

function parseVT100Packet(packet) {
    if (!packet.startsWith("&&>")) {
        throw new Error("Invalid VT100 packet header");
    }

    const payload = packet.replace("&&>", "");
    const fields = payload.split(",");

    if (fields.length < 23) {
        throw new Error("Incomplete VT100 packet");
    }

    // Parse DateTime (DDMMYYHHMMSS)
    const dt = fields[5];
    const year = "20" + dt.substring(4, 6);
    const month = dt.substring(2, 4);
    const day = dt.substring(0, 2);
    const hour = dt.substring(6, 8);
    const minute = dt.substring(8, 10);
    const second = dt.substring(10, 12);

    return {
        imei: fields[1],
        timestamp: `${year}-${month}-${day} ${hour}:${minute}:${second}`,
        gpsStatus: fields[6] === "A" ? "VALID" : "INVALID",
        latitude: parseFloat(fields[7]),
        longitude: parseFloat(fields[8]),
        speedKmh: Number(fields[9]),
        hdop: parseFloat(fields[10]),
        altitude: Number(fields[11]),
        course: Number(fields[12]),
        satellites: Number(fields[13]),
        gsmSignal: Number(fields[16]),
        accStatus: fields[18] === "01" ? "ON" : "OFF",
        chargingStatus: fields[19] === "01" ? "ON" : "OFF",
        cellInfo: fields[15],
        ioStatus: fields[20],
        packetIndex: fields[21]
    };
}

/* =========================================================
   NETWORK INITIALIZATION (STABLE SEQUENCE)
   ========================================================= */

function setupGateway() {
    console.log(`\n\x1b[44m  RE-INITIALIZING TACTICAL LINK...  \x1b[0m\n`);
    isNetworkReady = false;
    recvBuffer = "";

    // Hard reset network stack
    send("AT+QIDEACT=1");

    // Step 1: Set APN
    setTimeout(() => {
        send('AT+CGDCONT=1,"IP","ufone.corporate"');
    }, 1500);

    // Step 2: Configure TCP/IP modes (CRITICAL)
    setTimeout(() => {
        send("AT+QIMODE=0");                 // Buffer mode
        send("AT+QIMUX=0");                  // Single socket
        send('AT+QICFG="dataformat",0,0');   // Raw data
    }, 3000);

    // Step 3: Activate PDP context
    setTimeout(() => {
        send("AT+QIACT=1");
    }, 5000);

    // Step 4: Verify IP ready
    setTimeout(() => {
        send("AT+QIACT?");
    }, 8000);

    // Step 5: Open TCP LISTENER on FIXED PORT 5000
    setTimeout(() => {
        send('AT+QIOPEN=1,0,"TCP LISTENER","0.0.0.0",5000,5000,2');
    }, 11000);
}

/* =========================================================
   SERIAL OPEN
   ========================================================= */

port.on('open', () => {
    console.log(`\x1b[32m[SUCCESS]: ${COM_PORT} Connected.\x1b[0m`);
    setupGateway();
});

/* =========================================================
   MODEM RESPONSE HANDLER
   ========================================================= */

parser.on('data', (line) => {
    const raw = line.trim();
    if (!raw) return;

    console.log(`\x1b[90m[MODEM]: ${raw}\x1b[0m`);

    /* ---------- NETWORK DROP HANDLING ---------- */

    if (raw.includes('+QIURC: "pdpdeact"')) {
        console.log("\x1b[31m[PDP DROPPED]: Network lost. Reinitializing...\x1b[0m");
        setTimeout(setupGateway, 3000);
        return;
    }

    if (raw.includes('+QIURC: "closed",0')) {
        console.log("\x1b[31m[SOCKET CLOSED]: Restarting gateway...\x1b[0m");
        setTimeout(setupGateway, 3000);
        return;
    }

    /* ---------- SOCKET OPEN SUCCESS ---------- */

    if (raw.includes("+QIOPEN: 0,0")) {
        isNetworkReady = true;
        console.log("\x1b[42m\x1b[30m SYSTEM LIVE \x1b[0m Listening on port 5000...");
        return;
    }

    /* ---------- SOCKET OPEN FAILURE ---------- */

    if (raw.includes("+QIOPEN: 0,562") || raw.includes("+QIOPEN: 0,572") || raw === "ERROR") {
        console.log("\x1b[31m[SOCKET ERROR]: Retrying gateway in 5s...\x1b[0m");
        setTimeout(setupGateway, 5000);
        return;
    }

    /* ---------- DATA ARRIVAL ---------- */

    if (raw.includes('+QIURC: "recv",0')) {
        console.log(`\x1b[35m[INCOMING]: Data detected. Reading buffer...\x1b[0m`);
        send("AT+QIRD=0,1500");
        return;
    }

    /* ---------- IGNORE MODEM HEADERS ---------- */

    if (raw.startsWith("+QIRD:")) return;
    if (raw === "OK") return;

    /* ---------- ACCUMULATE GPS DATA SAFELY ---------- */

    if (raw.includes("&&")) {
        recvBuffer += raw;

        // VT100 packets normally end with ,0D
        if (recvBuffer.includes(",0D")) {
            const packet = recvBuffer.trim();
            recvBuffer = "";

            console.log(`\n\x1b[43m\x1b[30m GPS DATA RECEIVED \x1b[0m`);
            console.log(`\x1b[33m${packet}\x1b[0m\n`);

            // Send ACK to tracker
            send("OK");

            // Parse packet
            try {
                const parsed = parseVT100Packet(packet);
                console.log("\x1b[32m[PARSED DATA]:\x1b[0m");
                console.log(parsed);
            } catch (e) {
                console.error("\x1b[31m[PARSE ERROR]:\x1b[0m", e.message);
            }
        }
    }
});

/* =========================================================
   HEARTBEAT
   ========================================================= */

setInterval(() => {
    if (isNetworkReady) {
        send("AT+CSQ");
    }
}, 30000);
