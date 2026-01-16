import React, { useState } from "react";
import { ShieldAlert, ArrowRight, Trash2, Plus } from "lucide-react";

export default function MoveSanctions({ sanctions, onAdd, onDelete }) {
  const [form, setForm] = useState({ id: "", ba: "", from: "", to: "", unit: "", date: "", validTo: "" });

  const handleAdd = (e) => {
    e.preventDefault();
    
    if (!form.id || !form.ba) return alert("Please enter Sanction ID and BA Number");
    onAdd({ ...form});
    setForm({ id: "", ba: "", from: "", to: "", unit: "", date: "", validTo: "" });
  };

  return (
    <div className="p-4 bg-light">
      <div className="row g-4">
        {/* INPUT FORM */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-4 text-success d-flex align-items-center gap-2">
              <ShieldAlert size={20} /> Register Sanction
            </h5>
            <form onSubmit={handleAdd}>
              <div className="mb-2">
                <label className="small fw-bold text-muted">SANCTION ID</label>
                <input type="text" className="form-control" placeholder="S-2026/XX" 
                  value={form.id} onChange={e => setForm({...form, id: e.target.value})} />
              </div>
              <div className="mb-2">
                <label className="small fw-bold text-muted">BA NUMBER</label>
                <input type="text" className="form-control" placeholder="BA-XXXX" 
                  value={form.ba} onChange={e => setForm({...form, ba: e.target.value.toUpperCase()})} />
              </div>
              <div className="row g-2 mb-3">
                <div className="col"><input type="text" className="form-control" placeholder="From" value={form.from} onChange={e => setForm({...form, from: e.target.value})} /></div>
                <div className="col"><input type="text" className="form-control" placeholder="To" value={form.to} onChange={e => setForm({...form, to: e.target.value})} /></div>
              </div>
              <div className="mb-2">
                <label className="small fw-bold text-muted">Unit</label>
                <input type="text" className="form-control" placeholder="41 Sigs" 
                  value={form.unit} onChange={e => setForm({...form, unit: e.target.value.toUpperCase()})} />

              </div><div className="mb-2">
                <label className="small fw-bold text-muted">Date</label>
                <input type="date" className="form-control" placeholder="" 
                  value={form.date} onChange={e => setForm({...form, date: e.target.value})} />

              </div>

              <button className="btn btn-dark w-100 fw-bold d-flex align-items-center justify-content-center gap-2">
                <Plus size={18} /> Add Sanction
              </button>
            </form>
          </div>
        </div>

        {/* DATA TABLE */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm overflow-hidden">
            <div className="card-header bg-white py-3 border-0">
              <h6 className="mb-0 fw-bold">DIV Sanction Registry</h6>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="bg-light small text-uppercase">
                  <tr>
                    <th className="ps-4">ID</th>
                    <th>Vehicle</th>
                    <th>Unit</th>
                    <th>Route</th>
                    <th className="text-end pe-4">Action</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {sanctions.map((s) => (
                    <tr key={s.id}>
                      <td className="ps-4 font-monospace small">{s.id}</td>
                      <td className="fw-bold text-primary">{s.ba}</td>
                      <td>{s.unit}</td>
                      <td>
                        <span className="small">{s.from}</span>
                        <ArrowRight size={12} className="mx-2 text-success" />
                        <span className="small">{s.to}</span>
                      </td>
                      <td className="text-end pe-4">
                        <button onClick={() => onDelete(s.id)} className="btn btn-sm btn-outline-danger border-0">
                          <Trash2 size={16} />
                        </button>
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