import { useState } from "react";
import MapView from "../components/MapView";
import StatCard from "../components/StatCard";
import { FaSatellite, FaCarSide, FaExclamationTriangle } from "react-icons/fa";

export default function Dashboard() {
  // 1. Organize vehicles into an array for easy mapping
  const [vehicles] = useState([
    { id: "MAIN_01", imei: "356938035643809", lat: 33.7, lng: 72.8, status: "MOVING", speed: "54 km/h" },
    { id: "MAIN_02", imei: "356938035643810", lat: 33.8, lng: 72.9, status: "STOPPED", speed: "0 km/h" },
    { id: "MAIN_03", imei: "356938035643811", lat: 33.75, lng: 72.85, status: "MOVING", speed: "42 km/h" }
  ]);

  return (
    <div className="container-fluid p-0">
      {/* Quick Stats Row */}
      <div className="row g-3 mb-3">
        <StatCard title="Active Assets" value={vehicles.length} icon={<FaCarSide />} />
        <StatCard title="Signal Health" value="98%" icon={<FaSatellite />} />
        <StatCard title="Alerts (24h)" value="03" icon={<FaExclamationTriangle />} />
      </div>

      <div className="row g-3">
        {/* Map Panel - 8 Columns */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-secondary" style={{ height: "600px", borderRadius: "0" }}>
            <div className="card-header bg-white fw-bold d-flex justify-content-between align-items-center">
              <span>TACTICAL NAVIGATION MAP</span>
              <span className="badge bg-success">LIVE FEED: {vehicles.length} UNITS</span>
            </div>
            <div className="card-body p-0" style={{ height: "calc(600px - 45px)" }}>
              {/* 2. Pass the entire array to the MapView */}
              <MapView vehicles={vehicles} />
            </div>
          </div>
        </div>

        {/* Side Info Panel - 4 Columns */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-secondary h-100" style={{ borderRadius: "0" }}>
            <div className="card-header bg-white fw-bold">ASSET TELEMETRY</div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover table-sm font-monospace mb-0" style={{ fontSize: "12px" }}>
                  <thead className="table-light">
                    <tr>
                      <th className="ps-3">IMEI</th>
                      <th>STATUS</th>
                      <th>SPD</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* 3. Dynamically generate table rows from the array */}
                    {vehicles.map((v) => (
                      <tr key={v.id} className={v.status === "STOPPED" ? "bg-light" : ""}>
                        <td className="ps-3">{v.imei}</td>
                        <td>
                          <span className={v.status === "MOVING" ? "text-success" : "text-muted"}>
                            ● {v.status}
                          </span>
                        </td>
                        <td>{v.speed}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}