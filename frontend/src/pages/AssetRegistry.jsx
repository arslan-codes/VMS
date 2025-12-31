import React, { useState } from "react";
import { Plus, Database, Shield, Truck, Hash } from "lucide-react";

export default function AssetRegistry() {
  const [formData, setFormData] = useState({
    baNumber: "",
    imei: "",
    unit: "",
    brigade: "34-DIV-HQ",
    type: "Jeep"
  });

  return (
    <div className="p-4" style={{ animation: "fadeIn 0.4s ease-out" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Asset Registry</h3>
          <p className="text-muted small">Pair hardware IMEIs with Vehicle BA Numbers and Units.</p>
        </div>
        <button className="btn btn-primary d-flex align-items-center gap-2">
          <Database size={18} /> Sync with Station DB
        </button>
      </div>

      <div className="row g-4">
        {/* Registration Form */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-4 d-flex align-items-center gap-2">
              <Plus size={20} className="text-primary" /> Register New Unit
            </h5>
            
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted text-uppercase">BA Number</label>
              <div className="input-group border rounded-2">
                <span className="input-group-text bg-transparent border-0"><Truck size={16}/></span>
                <input type="text" className="form-control border-0" placeholder="e.g. 34-A-1234" />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold text-muted text-uppercase">Tracker IMEI</label>
              <div className="input-group border rounded-2">
                <span className="input-group-text bg-transparent border-0"><Hash size={16}/></span>
                <input type="text" className="form-control border-0" placeholder="15-digit IMEI" />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold text-muted text-uppercase">Assigned Unit</label>
              <input type="text" className="form-control border" placeholder="e.g. 6 Sig Unit" />
            </div>

            <div className="mb-4">
              <label className="form-label small fw-bold text-muted text-uppercase">Parent Formation</label>
              <select className="form-select border">
                <option value="34-DIV">34 DIV HQ</option>
                <option value="102-BDE">102 BDE</option>
                <option value="103-BDE">103 BDE</option>
                <option value="SIG-UNIT">SIG UNIT HQ</option>
              </select>
            </div>

            <button className="btn btn-dark w-100 py-2 fw-bold">Add to Station Registry</button>
          </div>
        </div>

        {/* Existing Registry List */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm overflow-hidden">
            <div className="card-header bg-white py-3 border-0">
              <h6 className="mb-0 fw-bold">Active Station Registry</h6>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light">
                  <tr className="text-muted small text-uppercase" style={{ fontSize: '10px' }}>
                    <th className="ps-4">BA Number</th>
                    <th>IMEI Number</th>
                    <th>Brigade</th>
                    <th>Unit</th>
                    <th className="text-end pe-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { ba: "34-A-1234", imei: "3569380356...", bde: "34 DIV", unit: "HQ", status: "Active" },
                    { ba: "19-GJ-2114", imei: "8610002341...", bde: "102 BDE", unit: "41 Sig Bn", status: "Active" }
                  ].map((row, i) => (
                    <tr key={i} style={{ fontSize: '14px' }}>
                      <td className="ps-4 fw-bold text-primary">{row.ba}</td>
                      <td className="text-muted font-monospace">{row.imei}</td>
                      <td><span className="badge bg-light text-dark border">{row.bde}</span></td>
                      <td>{row.unit}</td>
                      <td className="text-end pe-4">
                        <span className="text-success small fw-bold">● Connected</span>
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