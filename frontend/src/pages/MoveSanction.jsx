import React, { useState } from "react";
import { FileCheck, ShieldAlert, Calendar, MapPin, UserCheck, Search, ArrowRight } from "lucide-react";

export default function MoveSanctions() {
  // In a real app, this state would be shared via App.jsx or a Database
  const [sanctions, setSanctions] = useState([
    { id: "S-2026/001", ba: "BA-4501", unit: "41 Sig Unit", from: "Taxila", to: "Rawalpindi", validTo: "2026-01-20", status: "Approved" },
    { id: "S-2026/042", ba: "BA-8822", unit: "55 Fd Arty", from: "Multan", to: "Okara Cantt", validTo: "2026-01-18", status: "Approved" }
  ]);

  return (
    <div className="p-4 bg-light min-vh-100" style={{ animation: "fadeIn 0.3s ease-out" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1 text-dark">Move Sanctions</h3>
          <p className="text-muted small">Log approved movement clearances from DIV HQ for route monitoring.</p>
        </div>
      </div>

      <div className="row g-4">
        {/* Form to Add Sanction Record */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
              <ShieldAlert size={20} className="text-success" /> Log DIV Sanction
            </h5>
            
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted">VEHICLE BA NUMBER</label>
              <input type="text" className="form-control border-secondary-subtle bg-light" placeholder="e.g. BA-4501" />
            </div>

            <div className="row mb-3">
              <div className="col">
                <label className="form-label small fw-bold text-muted">FROM</label>
                <input type="text" className="form-control border-secondary-subtle" placeholder="Source" />
              </div>
              <div className="col">
                <label className="form-label small fw-bold text-muted">TO</label>
                <input type="text" className="form-control border-secondary-subtle" placeholder="Dest" />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold text-muted">VALID UNTIL</label>
              <input type="date" className="form-control border-secondary-subtle" />
            </div>

            <div className="mb-4">
              <label className="form-label small fw-bold text-muted">SANCTION AUTHORITY ID</label>
              <input type="text" className="form-control border-secondary-subtle" placeholder="e.g. DIV/OPS/102" />
            </div>

            <button className="btn btn-dark w-100 py-2 fw-bold shadow-sm">Add to Move Records</button>
          </div>
        </div>

        {/* List of Sanctions */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm overflow-hidden">
            <div className="card-header bg-white py-3 border-0">
              <h6 className="mb-0 fw-bold">Authorized Move Registry</h6>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light">
                  <tr className="text-muted small text-uppercase" style={{ fontSize: '10px' }}>
                    <th className="ps-4">Sanction ID</th>
                    <th>BA Number</th>
                    <th>Unit</th>
                    <th>Approved Route</th>
                    <th className="text-end pe-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sanctions.map((row, i) => (
                    <tr key={i} style={{ fontSize: '13px' }}>
                      <td className="ps-4 font-monospace fw-bold">{row.id}</td>
                      <td className="text-primary fw-bold">{row.ba}</td>
                      <td>{row.unit}</td>
                      <td>
                        <span className="text-muted">{row.from}</span>
                        <ArrowRight size={12} className="mx-2 text-success"/>
                        <span className="fw-bold">{row.to}</span>
                      </td>
                      <td className="text-end pe-4">
                        <button className="btn btn-sm btn-primary px-3 shadow-sm">Plot History</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}