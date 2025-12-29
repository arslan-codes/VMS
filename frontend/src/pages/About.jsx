import divisionLogo from "../assets/images/01021.png";
import unitLogo from "../assets/images/UnitLogo3.png";
export default function About() {
  const styles = {
    container: { backgroundColor: "#f8fafc", minHeight: "100vh", color: "#1e293b", padding: "40px" },
    paper: { 
      background: "#ffffff", 
      border: "1px solid #94a3b8", 
      boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
      padding: "40px",
      maxWidth: "900px",
      margin: "0 auto"
    },
    headerBox: { borderBottom: "3px solid #1e293b", marginBottom: "30px", paddingBottom: "10px" }
  };

  return (
    <div style={styles.container}>
      <div style={styles.paper}>
        <div className="d-flex justify-content-between align-items-start" style={styles.headerBox}>
          <div>
            <h1 className="fw-black mb-0">ABOUT SYSTEM</h1>
            <p className="fw-bold text-muted">VMS TECHNICAL DOCUMENTATION // 34 DIV</p>
          </div>
          <img src={divisionLogo} alt="Div" style={{ height: "70px" }} />
        </div>

        <div className="row">
          <div className="col-8" style={{ borderRight: "1px solid #e2e8f0" }}>
            <h5 className="fw-bold bg-light p-2 border-start border-dark border-4">1.0 OPERATIONAL OVERVIEW</h5>
            <p className="mb-4">
              The Division Vehicle Management System is a proprietary command platform 
              developed for secure, real-time tracking of divisional assets. 
              The system utilizes private APN protocols to ensure data integrity without 
              exposure to public internet infrastructure.
            </p>

            <h5 className="fw-bold bg-light p-2 border-start border-dark border-4">2.0 DEVELOPMENT UNIT</h5>
            <p>
              Developed by <strong>41 Signal Unit</strong>. This unit is responsible for 
              all tactical communications and electronic infrastructure within the division area of responsibility.
            </p>
          </div>

          <div className="col-4 ps-4">
            <h6 className="fw-bold text-uppercase small text-muted">Project Authority</h6>
            <ul className="list-unstyled font-monospace small">
              <li className="mb-2">● MAJ MEHR</li>
              <li className="mb-2">● CAPT ARSLAN</li>
              <li className="mb-2">● CAPT JAVERIA</li>
            </ul>
            <hr />
            <div className="mt-4 p-2 border border-warning bg-light text-center">
                <small className="fw-bold">CLASSIFICATION:<br/>UNCLASSIFIED // FOUO</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}