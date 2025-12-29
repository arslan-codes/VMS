import { 
  FaCogs, FaBullseye, FaSignal, FaUsers, FaTruck, FaGlobe, FaFileAlt 
} from "react-icons/fa";

export default function Home() {
  const units = [
    { title: "Artillery", icon: <FaBullseye />, color: "#dc2626", desc: "Long-range support assets." },
    { title: "EME", icon: <FaCogs />, color: "#2563eb", desc: "Technical maintenance & recovery." },
    { title: "Signals", icon: <FaSignal />, color: "#059669", desc: "Secure comms & network nodes." },
    { title: "Infantry", icon: <FaUsers />, color: "#d97706", desc: "Transport & troop movement." },
    { title: "Ordnance", icon: <FaTruck />, color: "#475569", desc: "Logistics and supply chain." },
    { title: "SNT", icon: <FaGlobe />, color: "#0891b2", desc: "Special tactical deployments." }
  ];
  return (
  <div className="bg-white rounded shadow-sm p-4" style={{ maxWidth: "1000px", margin: "0 auto" }}>

      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold slide-in">Welcome to 34 DIV VMS</h2>
        <p className="text-muted">Military Vehicle Management System overview</p>
      </div>
 <div className="row g-3 mb-4">
        {units.map((u, i) => (
          <div key={i} className="col-md-4 col-xl-2"> {/* Responsive: 6 cards per row on large screens */}
            <div className="card h-100 border-0 shadow-sm" style={{ 
              borderTop: `4px solid ${u.color}`, 
              borderRadius: '0',
              backgroundColor: '#ffffff' 
            }}>
              <div className="card-body text-center p-3">
                <div style={{ color: u.color, fontSize: '28px' }} className="mb-2">
                  {u.icon}
                </div>
                <h6 className="fw-bold text-uppercase mb-1" style={{ fontSize: '12px' }}>{u.title}</h6>
                <p className="text-muted mb-0" style={{ fontSize: '11px', lineHeight: '1.3' }}>{u.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed VMS Information Section */}
      <div className="card border-secondary shadow-sm mb-4" style={{ borderRadius: '0' }}>
        <div className="card-header bg-dark text-white fw-bold py-2 d-flex align-items-center">
          <FaFileAlt className="me-2" /> 
          <span>SYSTEM OPERATIONAL BRIEFING</span>
        </div>
        <div className="card-body bg-light" style={{ fontSize: "14px", lineHeight: "1.6" }}>
          <div className="row">
            {/* Column 1: Purpose & Telemetry */}
            <div className="col-lg-6 border-end border-2">
              <h5 className="fw-bold text-uppercase border-bottom pb-1" style={{ color: "#1e3a5f" }}>1.0 Purpose & Scope</h5>
              <p>
                The <strong>Division Vehicle Management System (VMS)</strong> provides real-time monitoring and 
                management of all assets across the division. It integrates GPS tracking and 
                reporting into a centralized interface for HQ staff.
              </p>

              <h6 className="fw-bold mt-4 mb-2">2.0 TELEMETRY DATA POINTS</h6>
              <ul className="list-unstyled">
                <li className="mb-1">● Real-time GPS location tracking</li>
                <li className="mb-1">● Status: Moving, Idle, Stopped, Maintenance</li>
                <li className="mb-1">● Speed and Engine Diagnostics</li>
                <li className="mb-1">● Route deviation and emergency alerts</li>
              </ul>
            </div>

            {/* Column 2: Workflow & Importance */}
            <div className="col-lg-6 ps-lg-4 mt-4 mt-lg-0">
              <h5 className="fw-bold text-uppercase border-bottom pb-1" style={{ color: "#1e3a5f" }}>3.0 Operational Workflow</h5>
              <ol className="ps-3 mb-4">
                <li><strong>Tracking:</strong> Continuous monitoring of vehicle movement.</li>
                <li><strong>Alerts:</strong> Breakdowns or emergencies trigger immediate HQ alerts.</li>
                <li><strong>Reporting:</strong> Mission-specific logs generated for review.</li>
                <li><strong>Maintenance:</strong> Scheduled based on mileage and engine hours.</li>
              </ol>

              <div className="p-3 bg-white border border-warning border-start-4">
                <h6 className="fw-bold text-warning mb-1">STRATEGIC IMPORTANCE</h6>
                <p className="small mb-0 text-muted">
                  Ensures situational awareness for commanders, optimizes logistics, and 
                  maintains combat readiness through proactive resource management.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Footer of the Briefing */}
        <div className="card-footer bg-white text-center py-2">
           <small className="fw-bold text-muted font-monospace">ELECTRONIC SIGNATURE: 41 SIGNAL UNIT R&D</small>
        </div>
      </div>
     



      </div>
  );
}
