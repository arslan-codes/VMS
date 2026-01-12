const net = require("net");
const WebSocket = require("ws");

/* ================= CONFIG ================= */
const TCP_PORT = 5000;
const WS_PORT = 8080;

/* ================= WEBSOCKET ================= */
const wsServer = new WebSocket.Server({ port: WS_PORT });

wsServer.on("connection", ws => {
  console.log("Frontend connected via WebSocket");
  ws.on("close", () => console.log("Frontend disconnected"));
});

console.log(`WebSocket Server running on port ${WS_PORT}`);

console.log("Starting TCP Server...");
console.log("Listening for incoming tracker connections...");
console.log("=====================================");
/* ================= PARSER ================= */
function parseASCII(text) {
  try {
    const parts = text.replace("&&\\", "").trim().split(",");

    return {
      time: Date.now(),
      imei: parts[1],
      gpsFix: parts[6] === "A" ? "Valid" : "Invalid",
      latitude: parseFloat(parts[7]),
      longitude: parseFloat(parts[8]),
      speed: parseFloat(parts[11])
    };
  } catch (err) {
    console.error("Parse error:", err);
    return null;
  }
}

/* ================= TCP SERVER ================= */
const tcpServer = net.createServer(socket => {
  console.log("Tracker connected:", socket.remoteAddress);

  socket.on("data", data => {
    const raw = data.toString().trim();
    console.log("RAW:", raw);

    const parsed = parseASCII(raw);
    if (!parsed) return;

    wsServer.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(parsed));
      }
    });
  });

  socket.on("close", () => console.log("Tracker disconnected"));
});

tcpServer.listen(TCP_PORT, () =>
  console.log(`TCP Server running on port ${TCP_PORT}`)
);
