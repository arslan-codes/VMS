/******************************************************************
 * VT100 GPS Packet Parser – Single Tracker Test
 * Tracker: VT100
 * Transport: TCP/IP
 * Purpose: Parse raw GPS packet into structured data
 ******************************************************************/

/* =========================
   RAW DATA (TEST PACKET)
   ========================= */

var rawPacket = "&&>138,861327086942252,000,0,,260118101451,A,33.773673,72.781703,12,1.6,0,338,185,19091,410|3|2FBF|01B41802,18,001C,00,00,051A|0190|0000|0000,1,0D";

/* =========================
   PARSER FUNCTION
   ========================= */

function parseVT100Packet(packet) {
    if (!packet.startsWith("&&>")) {
        throw new Error("Invalid VT100 packet header");
    }

    // Remove protocol header
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

        cellInfo: fields[15],   // MCC|MNC|LAC|CID (raw)
        ioStatus: fields[20],   // IO bitmap (raw)

        packetIndex: fields[21]
    };
}

/* =========================
   EXECUTION
   ========================= */

try {
    console.log("RAW PACKET:");
    console.log(rawPacket);

    console.log("\nPARSED DATA:");
    const parsedData = parseVT100Packet(rawPacket);
    console.log(parsedData);

} catch (err) {
    console.error("ERROR:", err.message);
}
