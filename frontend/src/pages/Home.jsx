import { 
  FaCogs,        // EME
  FaBullseye,    // Artillery
  FaSignal,      // Signals
  FaUsers,       // Infantry / general
  FaTruck,       // Logistics / Ordnance
  FaGlobe        // Global operations / SNT
} from "react-icons/fa";

export default function Home() {
  return (
  <div className="bg-white rounded shadow-sm p-4" style={{ maxWidth: "1000px", margin: "0 auto" }}>

      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold slide-in">Welcome to 34 DIV VMS</h2>
        <p className="text-muted">Military Vehicle Management System overview</p>
      </div>

      {/* Vehicle Type Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3 fade-in">
          <div className="card shadow-sm h-100 text-center">
            <div className="card-body">
              <FaBullseye size={40} className="mb-2 text-danger" />
              <h5 className="card-title">Artillery</h5>
              <p className="card-text">
                Heavy artillery vehicles for long-range support and firepower deployment.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3 fade-in delay-1">
          <div className="card shadow-sm h-100 text-center">
            <div className="card-body">
              <FaCogs size={40} className="mb-2 text-primary" />
              <h5 className="card-title">EME</h5>
              <p className="card-text">
                Engineering Maintenance Vehicles ensuring technical support and repairs.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3 fade-in delay-2">
          <div className="card shadow-sm h-100 text-center">
            <div className="card-body">
              <FaSignal size={40} className="mb-2 text-success" />
              <h5 className="card-title">Signals</h5>
              <p className="card-text">
                Communication vehicles managing secure and reliable signal operations.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3 fade-in delay-3">
          <div className="card shadow-sm h-100 text-center">
            <div className="card-body">
              <FaUsers size={40} className="mb-2 text-warning" />
              <h5 className="card-title">Infantry</h5>
              <p className="card-text">
                Transport and troop movement vehicles supporting infantry operations.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3 fade-in delay-4">
          <div className="card shadow-sm h-100 text-center">
            <div className="card-body">
              <FaTruck size={40} className="mb-2 text-secondary" />
              <h5 className="card-title">Ordnance</h5>
              <p className="card-text">
                Logistics and ordnance vehicles handling ammunition, equipment, and supplies.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3 fade-in delay-5">
          <div className="card shadow-sm h-100 text-center">
            <div className="card-body">
              <FaGlobe size={40} className="mb-2 text-info" />
              <h5 className="card-title">SNT</h5>
              <p className="card-text">
                Special operations and tactical vehicles deployed across operational theaters.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Example Military Images */}
      <div className="row gy-3">
        {/* Detailed VMS Information */}
<section className="mt-5 p-4 bg-light rounded shadow-sm fade-in">
  <h4 className="mb-3">About the Vehicle Management System (VMS)</h4>

  <p>
    The <strong>Division Vehicle Management System (VMS)</strong> is a comprehensive solution 
    designed to provide real-time monitoring, operational control, and management of all vehicles 
    across the division. It integrates location tracking, status monitoring, maintenance scheduling, 
    and reporting into a centralized interface accessible to commanders and HQ staff.
  </p>

  <h5 className="mt-3">How it Works</h5>
  <p>
    The VMS operates by collecting data from each vehicle through GPS trackers, telematics sensors, 
    and onboard diagnostic systems. This data includes:
  </p>
  <ul>
    <li>Vehicle location and movement (real-time GPS tracking)</li>
    <li>Current operational status (moving, idle, stopped, under maintenance)</li>
    <li>Speed, fuel consumption, and engine diagnostics</li>
    <li>Alerts for emergencies, breakdowns, or route deviations</li>
  </ul>
  <p>
    All this information is transmitted securely to the central system where it is processed, 
    visualized on dashboards, and made available for decision-making.
  </p>

  <h5 className="mt-3">Operational Workflow</h5>
  <ol>
    <li><strong>Vehicle Assignment:</strong> Vehicles are assigned to units or missions through the system.</li>
    <li><strong>Real-time Tracking:</strong> The VMS continuously monitors vehicle movements and statuses.</li>
    <li><strong>Alert Management:</strong> Any deviation, breakdown, or emergency triggers alerts to HQ and unit commanders.</li>
    <li><strong>Reporting:</strong> Daily, weekly, and mission-specific reports are generated for operational review.</li>
    <li><strong>Maintenance Scheduling:</strong> Preventive maintenance is scheduled based on mileage and operational hours.</li>
  </ol>

  <h5 className="mt-3">Importance of VMS</h5>
  <p>
    A VMS is critical in modern military operations for several reasons:
  </p>
  <ul>
    <li><strong>Operational Efficiency:</strong> Ensures vehicles are deployed optimally for missions.</li>
    <li><strong>Situational Awareness:</strong> Commanders have a real-time overview of all vehicle positions and statuses.</li>
    <li><strong>Maintenance & Safety:</strong> Reduces the risk of breakdowns and accidents through proactive monitoring.</li>
    <li><strong>Resource Management:</strong> Tracks fuel usage, vehicle availability, and personnel assignments.</li>
    <li><strong>Strategic Planning:</strong> Historical data helps in logistics, route planning, and mission readiness.</li>
  </ul>

  <h5 className="mt-3">Key Features</h5>
  <ul>
    <li>Real-time GPS location tracking of all vehicles</li>
    <li>Status monitoring: Moving, Idle, Maintenance, Emergency</li>
    <li>Alerts for route deviations, breakdowns, or incidents</li>
    <li>Dashboard visualizations and analytics</li>
    <li>Unit-wise vehicle allocation and history logs</li>
    <li>Maintenance and service scheduling</li>
    <li>Secure access for HQ, commanders, and unit staff</li>
  </ul>

  <p className="mt-3">
    Overall, the VMS enhances the efficiency, safety, and operational control of the division’s vehicles, 
    enabling commanders to make informed decisions, optimize logistics, and maintain combat readiness.
  </p>
</section>

        {/* <div className="col-md-6 fade-in">
          <img
            src="https://cdn.pixabay.com/photo/2017/12/10/14/47/tank-3013954_1280.jpg"
            alt="Artillery Vehicle"
            className="img-fluid rounded shadow-sm"
          />
          <p className="mt-2 text-center text-muted small">
            Example of an artillery vehicle
          </p>
        </div>

        <div className="col-md-6 fade-in delay-1">
          <img
            src="https://cdn.pixabay.com/photo/2020/03/21/08/27/military-4957555_1280.jpg"
            alt="Logistics Vehicle"
            className="img-fluid rounded shadow-sm"
          />
          <p className="mt-2 text-center text-muted small">
            Example of logistics/ordnance truck
          </p>
        </div> */}
      </div>
    </div>
  );
}
