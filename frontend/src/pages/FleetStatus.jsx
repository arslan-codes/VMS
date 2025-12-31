import React from "react";
import { Search, Filter, ArrowUpRight } from "lucide-react";

const dummyFleet = [
  { ba: "34-A-1234", imei: "3569380356...", unit: "HQ 34 DIV", status: "Moving", speed: "45 km/h", health: "100%" },
  { ba: "19-GJ-2114", imei: "8610002341...", unit: "41 Sig Bn", status: "Parked", speed: "0 km/h", health: "92%" },
  { ba: "16-GL-0104", imei: "3582210045...", unit: "3 LCB", status: "Offline", speed: "N/A", health: "0%" },
  { ba: "22-GJ-1109", imei: "8610005562...", unit: "751 WC", status: "Moving", speed: "12 km/h", health: "88%" },
];

export default function FleetStatus() {
  return (
    <div className="p-4 animate-in fade-in duration-500">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">Fleet Inventory</h3>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2">
            <Filter size={16} /> Filter Unit
          </button>
          <button className="btn btn-primary btn-sm">Export Report</button>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr style={{ fontSize: '12px' }} className="text-muted text-uppercase">
                <th className="ps-4">BA Number</th>
                <th>Unit / Brigade</th>
                <th>Current Status</th>
                <th>Live Speed</th>
                <th>Tracker Health</th>
                <th className="text-end pe-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {dummyFleet.map((veh, i) => (
                <tr key={i} style={{ fontSize: '14px' }}>
                  <td className="ps-4 fw-bold text-primary">{veh.ba}</td>
                  <td>{veh.unit}</td>
                  <td>
                    <span className={`badge rounded-pill ${
                      veh.status === 'Moving' ? 'bg-success-subtle text-success' : 
                      veh.status === 'Parked' ? 'bg-warning-subtle text-warning' : 'bg-danger-subtle text-danger'
                    }`}>
                      {veh.status}
                    </span>
                  </td>
                  <td>{veh.speed}</td>
                  <td>
                    <div className="progress" style={{ height: '6px', width: '100px' }}>
                      <div className={`progress-bar ${veh.health === '100%' ? 'bg-success' : 'bg-warning'}`} 
                           style={{ width: veh.health }}></div>
                    </div>
                  </td>
                  <td className="text-end pe-4">
                    <button className="btn btn-light btn-sm"><ArrowUpRight size={14} /></button>
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