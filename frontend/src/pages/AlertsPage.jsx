import React from "react";
import { AlertTriangle, ShieldAlert, Clock, CheckCircle, MapPin } from "lucide-react";

const dummyAlerts = [
  { id: 1, ba: "34-A-1234", type: "PANIC", severity: "CRITICAL", time: "10:15 AM", location: "Sector B-4", status: "Unresolved" },
  { id: 2, ba: "19-GJ-2114", type: "OVERSPEED", value: "75 km/h", severity: "HIGH", time: "09:42 AM", location: "Main GT Road", status: "Pending" },
  { id: 3, ba: "22-GJ-1109", type: "GEOFENCE EXIT", severity: "MEDIUM", time: "08:12 AM", location: "Garrison Gate 3", status: "Acknowledged" },
  { id: 4, ba: "16-GL-0104", type: "NIGHT MOVE", severity: "HIGH", time: "02:00 AM", location: "Supply Route X", status: "Pending" },
];

export default function AlertsPage() {
  return (
    <div className="p-4" style={{ animation: "fadeIn 0.4s ease-out" }}>
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h3 className="fw-bold mb-1 text-dark">Violations & Sanctions</h3>
          <p className="text-muted small mb-0">Live log of disciplinary and security breaches across all units.</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-danger btn-sm px-3">Clear Resolved</button>
          <button className="btn btn-dark btn-sm px-3">Download Log</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row g-3 mb-4">
        {['Critical', 'Pending', 'Resolved'].map((stat, i) => (
          <div className="col-md-4" key={i}>
            <div className="card border-0 shadow-sm p-3">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted small fw-bold text-uppercase">{stat} Alerts</span>
                {i === 0 ? <ShieldAlert className="text-danger" size={18} /> : <Clock className="text-primary" size={18} />}
              </div>
              <div className="fs-3 fw-bold">{i === 0 ? "04" : i === 1 ? "12" : "85"}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts List */}
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr className="text-muted small text-uppercase" style={{ fontSize: '11px' }}>
                <th className="ps-4">Timestamp</th>
                <th>BA Number</th>
                <th>Violation Type</th>
                <th>Location</th>
                <th>Severity</th>
                <th>Status</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dummyAlerts.map((alert) => (
                <tr key={alert.id} style={{ fontSize: '14px' }}>
                  <td className="ps-4 text-muted">
                    <div className="d-flex align-items-center gap-2">
                      <Clock size={14} /> {alert.time}
                    </div>
                  </td>
                  <td className="fw-bold text-dark">{alert.ba}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <AlertTriangle size={16} className={alert.severity === 'CRITICAL' ? 'text-danger' : 'text-warning'} />
                      <span>{alert.type} {alert.value && `(${alert.value})`}</span>
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center gap-2 text-muted">
                      <MapPin size={14} /> {alert.location}
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${alert.severity === 'CRITICAL' ? 'bg-danger' : alert.severity === 'HIGH' ? 'bg-warning text-dark' : 'bg-info'} opacity-75`}>
                      {alert.severity}
                    </span>
                  </td>
                  <td>
                    <span className={`small fw-bold ${alert.status === 'Unresolved' ? 'text-danger' : 'text-success'}`}>
                      {alert.status}
                    </span>
                  </td>
                  <td className="text-end pe-4">
                    <button className="btn btn-outline-primary btn-sm me-2">Investigate</button>
                    <button className="btn btn-light btn-sm"><CheckCircle size={14} /></button>
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