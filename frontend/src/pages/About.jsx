// import dvgnLogo from "../assets/images/dvgn_logo.png";
import divisionLogo from "../assets/images/01021.png";
// import brigadeLogo from "../assets/images/brigade1.png";
import unitLogo from "../assets/images/UnitLogo3.png";

export default function About() {
  return (
    <div className="bg-white rounded shadow-sm p-4" style={{ maxWidth: "800px", margin: "0 auto" }}>
      {/* Top Logo and Title */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        {/* <img src={dvgnLogo} alt="DVGN Logo" style={{ height: "50px", marginRight: "15px" }} /> */}
        <h4 className="mb-0">Division Vehicle Management System</h4><section className="d-flex gap-3 mt-3">
        <img src={divisionLogo} alt="Division Logo" style={{ height: "50px" }} />
        {/* <img src={brigadeLogo} alt="Brigade Logo" style={{ height: "50px" }} /> */}
        <img src={unitLogo} alt="Unit Logo" style={{ height: "50px" }} />
      </section>
      </div>

      {/* About the VMS */}
      <section className="mb-4">
        <h5>About the VMS</h5>
        <p>
          The Division Vehicle Management System (VMS) is designed to provide real-time
          monitoring and operational control of vehicles across the division. It allows
          commanders and HQ staff to view vehicle locations, statuses, alerts, and other
          critical operational data in a secure and centralized interface.
        </p>
      </section>

      {/* About the Unit */}
      <section className="mb-4">
        <h5>About the Unit</h5>
        <p>
          Developed by <strong>41 Signal Unit</strong>, a specialized unit of the army
          focused on communications and technological solutions. The unit has a history
          of designing and implementing advanced systems to enhance operational efficiency
          and battlefield situational awareness.
        </p>
      </section>

      {/* R&D / Team */}
      <section className="mb-4">
        <h5>R&D and Team</h5>
        <p>
          This project is undertaken by the unit's R&D team, responsible for innovation
          in military vehicle tracking and monitoring solutions. The team includes software
          engineers, data analysts, and field experts who contribute to the design, development,
          and testing of the VMS.
        </p>
        <ul>
          <li> MAJ MEHR</li>
          <li> CAPT ARSLAN</li>
          <li> CAPT JAVERIA</li>
        </ul>
      </section>

      {/* Formation / Division Logos */}
      
    </div>
  );
}
