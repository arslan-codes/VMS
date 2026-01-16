import React from "react";
import { Gauge, Download, Calendar, Filter, ArrowUp, ArrowDown } from "lucide-react";

const dummyMileage = [
  { ba: "34-A-1234", unit: "HQ 34 DIV", start: "14502 km", end: "14612 km", total: "110 km", avgSpeed: "42 km/h", fuelEst: "14L" },
  { ba: "19-GJ-2114", unit: "41 Sig Bn", start: "22310 km", end: "22345 km", total: "35 km", avgSpeed: "28 km/h", fuelEst: "5L" },
  { ba: "16-GL-0104", unit: "3 LCB", start: "8902 km", end: "8902 km", total: "0 km", avgSpeed: "0 km/h", fuelEst: "0L" },
  { ba: "22-GJ-1109", unit: "751 WC", start: "11200 km", end: "11285 km", total: "85 km", avgSpeed: "35 km/h", fuelEst: "11L" },
];

export default function MileageReport() {
  return (
    <div className="p-4" style={{ animation: "fadeIn 0.4s ease-out" }}>
      {/* Header & Controls */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Mileage & Resource Report</h3>
          <p className="text-muted small">Daily and monthly distance tracking per vehicle asset.</p>
        </div>
        <div className="d-flex gap-2">
          <div className="input-group input-group-sm">
            <span className="input-group-text bg-white border-end-0"><Calendar size={14}/></span>
            <input type="date" className="form-control border-start-0" defaultValue="2024-05-20" />
          </div>
          <button className="btn btn-dark btn-sm d-flex align-items-center gap-2">
            <Download size={16} /> Export PDF
          </button>
        </div>
      </div>

      {/* Analytics Row */}
      <div className="row g-3 mb-4">
        {[
          { label: "Total Fleet Distance", value: "1,240 km", trend: "+12%", color: "primary" },
          { label: "Most Active Unit", value: "751 WC", trend: "850 km", color: "success" },
          { label: "Idle Assets", value: "14 Units", trend: "-2%", color: "warning" }
        ].map((stat, i) => (
          <div className="col-md-4" key={i}>
            <div className="card border-0 shadow-sm p-3">
              <small className="text-muted fw-bold text-uppercase" style={{ fontSize: '10px' }}>{stat.label}</small>
              <div className="d-flex align-items-baseline gap-2">
                <h3 className="fw-bold mb-0">{stat.value}</h3>
                <small className={`text-${stat.color === 'primary' ? 'primary' : 'success'} fw-bold`}>{stat.trend}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Data Table */}
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center border-bottom">
          <h6 className="mb-0 fw-bold">Detailed Logs</h6>
          <div className="d-flex gap-2">
            <button className="btn btn-light btn-sm"><Filter size={14} /> Unit Filter</button>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr className="text-muted small text-uppercase" style={{ fontSize: '11px' }}>
                <th className="ps-4">BA Number</th>
                <th>Assigned Unit</th>
                <th>Start Meter</th>
                <th>End Meter</th>
                <th>Total Distance</th>
                <th>Avg Speed</th>
                <th>Est. Consumption</th>
                <th className="text-end pe-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {dummyMileage.map((item, i) => (
                <tr key={i} style={{ fontSize: '14px' }}>
                  <td className="ps-4">
                    <div className="d-flex align-items-center gap-2">
                      <div className="bg-primary-subtle p-1 rounded">
                        <Gauge size={14} className="text-primary" />
                      </div>
                      <span className="fw-bold">{item.ba}</span>
                    </div>
                  </td>
                  <td>{item.unit}</td>
                  <td className="text-muted">{item.start}</td>
                  <td className="text-muted">{item.end}</td>
                  <td className="fw-bold text-dark">{item.total}</td>
                  <td>{item.avgSpeed}</td>
                  <td>
                    <span className="badge bg-light text-dark border">{item.fuelEst}</span>
                  </td>
                  <td className="text-end pe-4">
                    <button className="btn btn-link btn-sm text-decoration-none p-0">View Path</button>
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