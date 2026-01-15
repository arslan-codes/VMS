
export default function Topbar({ title }) {
  return (
    <div
      style={{
        height: "60px",
        background: "#ffffff",
        borderBottom: "2px solid #cbd5e1",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 20px",
        color: "#0f172a"
      }}
    >
      <div className="d-flex align-items-center">
        {/* <div style={{ width: "4px", height: "24px", background: "#1e3a5f", marginRight: "12px" }}></div> */}
        <span style={{ fontWeight: "800", letterSpacing: "1.5px", textTransform: "uppercase", fontSize: "18px" }}>
          {title}
        </span>
      </div>
      
      <div className="d-flex align-items-center gap-4">
        <div className="text-end">
          <div style={{ fontSize: "10px", fontWeight: "bold", color: "#64748b" }}>CURRENT SECTOR</div>
          <div style={{ fontSize: "12px", fontWeight: "bold" }}>RAWALPINDI DIV</div>
        </div>
        <div className="font-monospace bg-light p-2 border" style={{ fontSize: "12px" }}>
          {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}