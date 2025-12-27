import { useState } from "react";
import MapView from "../components/MapView";

export default function Dashboard() {
  // Example vehicle data (replace with live data later)
  const [vehicleData, setVehicleData] = useState({
    latitude: 33.7,
    longitude: 72.8,
  });

  return (
    <div className="d-flex flex-column h-100">
      {/* Top Navbar */}
      {/* <div
        className="bg-white d-flex align-items-center px-4"
        style={{
          height: "60px",
          borderBottom: "1px solid #979797ff",
          fontWeight: 600,
          color: "#1e3a5f",
        }}
      >
        DIVISION COMMAND DASHBOARD
      </div> */}

      {/* Main Section */}
      <div className="flex-grow-1 p-4" style={{ overflow: "auto" }}>
        {/* Map Panel */}
        <div className="bg-white rounded shadow-sm mb-4" style={{ height: "400px" }}>
          <h6 className="p-3">Operational Map</h6>
          <div style={{ height: "340px" }}>
            <MapView data={vehicleData} />
          </div>
        </div>

        {/* Data / Vehicle Table */}
        <div className="bg-white rounded shadow-sm p-3">
          <h6>Live Vehicle Data</h6>
          <table className="table table-sm mt-3">
            <thead>
              <tr>
                <th>IMEI</th>
                <th>Status</th>
                <th>Speed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>356938035643809</td>
                <td>Moving</td>
                <td>54 km/h</td>
              </tr>
              <tr>
                <td>356938035643810</td>
                <td>Stopped</td>
                <td>0 km/h</td>
              </tr>
              {/* Add more rows dynamically */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
