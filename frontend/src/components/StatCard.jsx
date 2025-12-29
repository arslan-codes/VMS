export default function StatCard({ title, value, icon }) {
  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100" style={{ 
        background: "#f8fafc", 
        border: "1px solid #cbd5e1", 
        borderLeft: "4px solid #1e3a5f",
        borderRadius: "0px"
      }}>
        <div className="card-body d-flex align-items-center">
          <div className="rounded p-3 me-3" style={{ background: "#e2e8f0", color: "#1e3a5f" }}>
            {icon}
          </div>
          <div>
            <div className="text-uppercase fw-bold text-muted" style={{ fontSize: "10px", letterSpacing: "1px" }}>
              {title}
            </div>
            <div className="h4 mb-0 fw-black font-monospace" style={{ color: "#0f172a" }}>
              {value}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}