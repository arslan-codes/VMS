import React from "react";
import { Moon, Clock, MapPin, ShieldAlert, Download } from "lucide-react";

const dummyNightMoves = [
  { ba: "34-A-1234", unit: "HQ 34 DIV", startTime: "23:45", endTime: "01:15", duration: "1h 30m", startLoc: "Garrison", endLoc: "Sector C", auth: "Un-Authorized" },
  { ba: "22-GJ-1109", unit: "751 WC", startTime: "02:10", endTime: "02:45", duration: "35m", startLoc: "Supply Depot", endLoc: "Checkpoint 4", auth: "Authorized" },
  { ba: "19-GJ-2114", unit: "41 Sig Bn", startTime: "22:15", endTime: "22:50", duration: "35m", startLoc: "Signal HQ", endLoc: "Living Qtrs", auth: "Un-Authorized" },
];

export default function NightMove() {
  return (
    <div className="p-4" style={{ animation: "fadeIn 0.4s ease-out" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1 d-flex align-items-center gap-2">
            <Moon className="text-indigo" fill="#4f46e5" size={24} /> Night Move Inspection
          </h3>
          <p className="text-muted small">Movement detection between 2200 hrs and 0600 hrs.</p>
        </div>
        <button className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2">
          <Download size={16} /> Export Disciplinary Log
        </button>
      </div>

      {/* Warning Banner */}
      <div className="alert alert-warning border-0 shadow-sm d-flex align-items-center gap-3 mb-4">
        <ShieldAlert className="text-warning" size={24} />
        <div>
          <strong className="d-block">Curfew Enforcement Active</strong>
          <small>The system has flagged 02 un-authorized night movements in the last 24 hours.</small>
        </div>
      </div>

      {/* Data Table */}
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr className="text-muted small text-uppercase" style={{ fontSize: '11px' }}>
                <th className="ps-4">BA Number</th>
                <th>Unit</th>
                <th>Time Window</th>
                <th>Duration</th>
                <th>Route (Start - End)</th>
                <th>Authorization</th>
                <th className="text-end pe-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {dummyNightMoves.map((move, i) => (
                <tr key={i} style={{ fontSize: '14px' }}>
                  <td className="ps-4 fw-bold text-dark">{move.ba}</td>
                  <td>{move.unit}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <Clock size={14} className="text-muted" />
                      <span>{move.startTime} - {move.endTime}</span>
                    </div>
                  </td>
                  <td>{move.duration}</td>
                  <td>
                    <div className="small text-muted">
                      <MapPin size={12} /> {move.startLoc} → {move.endLoc}
                    </div>
                  </td>
                  <td>
                    <span className={`fw-bold ${move.auth === 'Authorized' ? 'text-success' : 'text-danger'}`}>
                      {move.auth}
                    </span>
                  </td>
                  <td className="text-end pe-4">
                    <button className="btn btn-light btn-sm">View Path</button>
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