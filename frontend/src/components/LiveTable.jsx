export default function LiveTable({ log }) {
  return (
    <div className="card border-1 shadow-sm" style={{ borderColor: "#94a3b8", borderRadius: "0px" }}>
      <div className="card-header bg-secondary text-white py-1 fw-bold small" style={{ letterSpacing: '1px' }}>
        LIVE TELEMETRY STREAM
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover table-sm mb-0">
            <thead style={{ backgroundColor: "#e2e8f0", borderBottom: "2px solid #94a3b8" }}>
              <tr className="text-uppercase" style={{ fontSize: "11px", color: "#475569" }}>
                <th className="ps-3">Time</th>
                <th>IMEI / Asset ID</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Speed (km/h)</th>
                <th className="text-center">GPS Status</th>
              </tr>
            </thead>
            <tbody className="font-monospace" style={{ fontSize: "13px" }}>
              {(log || []).map((r, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td className="ps-3 fw-bold text-primary">{r.time}</td>
                  <td>{r.imei}</td>
                  <td>{r.latitude}</td>
                  <td>{r.longitude}</td>
                  <td className="fw-bold">{r.speed}</td>
                  <td className="text-center">
                    <span 
                      className="badge" 
                      style={{ 
                        backgroundColor: r.gpsFix === "Valid" ? "#059669" : "#dc2626",
                        borderRadius: "2px",
                        fontSize: "10px",
                        padding: "4px 8px"
                      }}
                    >
                      {r.gpsFix === "Valid" ? "SIGNAL LOCK" : "NO FIX"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}