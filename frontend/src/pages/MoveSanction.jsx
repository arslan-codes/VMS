import React, { useState, useEffect } from "react";
import { Plus, Clock, MapPin, CheckCircle, Trash2, FileText } from "lucide-react";

export default function MoveSanction() {
    const [sanctions, setSanctions] = useState([]);
    const [units, setUnits] = useState([]);
    const [availableVehicles, setAvailableVehicles] = useState([]);
    const [formData, setFormData] = useState({
        unit_id: "", 
        vehicle_id: "", 
        route_from: "", 
        route_to: "", 
        start_datetime: new Date().toISOString().slice(0, 16), // Default to now
        end_datetime: ""
    });

    useEffect(() => {
        fetchSanctions();
        fetchUnits();
    }, []);

    // Fetch vehicles when unit selection changes
    useEffect(() => {
        if (formData.unit_id) {
            fetch(`http://localhost:5000/api/vehicles/by-unit/${formData.unit_id}`)
                .then(res => res.json())
                .then(data => setAvailableVehicles(data))
                .catch(err => console.error("Vehicle fetch error:", err));
        } else {
            setAvailableVehicles([]);
        }
    }, [formData.unit_id]);

    const fetchSanctions = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/sanctions');
            const data = await res.json();
            setSanctions(data);
        } catch (err) { console.error("Fetch error:", err); }
    };

    const fetchUnits = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/units_full');
            const data = await res.json();
            setUnits(data);
        } catch (err) { console.error("Units error:", err); }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Format dates for MySQL: 'YYYY-MM-DD HH:MM:SS'
        const submissionData = {
            ...formData,
            start_datetime: formData.start_datetime.replace('T', ' ') + ':00',
            end_datetime: formData.end_datetime.replace('T', ' ') + ':00'
        };

        try {
            const res = await fetch('http://localhost:5000/api/sanctions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData)
            });

            if (res.ok) {
                alert("Sanction Issued Successfully!");
                setFormData({ 
                    unit_id: "", vehicle_id: "", route_from: "", route_to: "", 
                    start_datetime: new Date().toISOString().slice(0, 16), 
                    end_datetime: "" 
                });
                fetchSanctions();
            }
        } catch (err) {
            alert("Error connecting to server.");
        }
    };

    return (
        <div className="p-4 bg-light min-vh-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold text-dark mb-0">Move Sanction Management</h3>
                <span className="badge bg-primary px-3 py-2">Total Active: {sanctions.length}</span>
            </div>

            {/* ISSUANCE FORM */}
            <div className="card shadow-sm border-0 mb-5 overflow-hidden">
                <div className="card-header bg-success text-white py-3">
                    <h5 className="mb-0 d-flex align-items-center gap-2">
                        <Plus size={20} /> Issue New Movement Order
                    </h5>
                </div>
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-md-4">
                            <label className="form-label small fw-bold text-muted">Formation/Unit</label>
                            <select className="form-select border-2" value={formData.unit_id} onChange={(e) => setFormData({...formData, unit_id: e.target.value})} required>
                                <option value="">Select Unit...</option>
                                {units.map(u => <option key={u.unit_id} value={u.unit_id}>{u.unit_name}</option>)}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small fw-bold text-muted">Vehicle (BA Number)</label>
                            <select className="form-select border-2" value={formData.vehicle_id} onChange={(e) => setFormData({...formData, vehicle_id: e.target.value})} required disabled={!formData.unit_id}>
                                <option value="">Select Vehicle...</option>
                                {availableVehicles.map(v => <option key={v.vehicle_id} value={v.vehicle_id}>{v.vehicle_no}</option>)}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label className="form-label small fw-bold text-muted">Route From</label>
                            <input type="text" className="form-control border-2" placeholder="Origin" value={formData.route_from} onChange={(e) => setFormData({...formData, route_from: e.target.value})} required />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label small fw-bold text-muted">Route To</label>
                            <input type="text" className="form-control border-2" placeholder="Destination" value={formData.route_to} onChange={(e) => setFormData({...formData, route_to: e.target.value})} required />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small fw-bold text-muted">Valid Until (Expiry)</label>
                            <input type="datetime-local" className="form-control border-2" value={formData.end_datetime} onChange={(e) => setFormData({...formData, end_datetime: e.target.value})} required />
                        </div>
                        <div className="col-md-8 d-flex align-items-end justify-content-end gap-2">
                            <button type="button" className="btn btn-outline-secondary px-4" onClick={() => setFormData({...formData, unit_id: ""})}>Clear</button>
                            <button type="submit" className="btn btn-success px-5 fw-bold shadow-sm">Authorize Movement</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* LIST OF SANCTIONS */}
            <div className="d-flex align-items-center gap-2 mb-3">
                <FileText className="text-primary" />
                <h4 className="fw-bold mb-0">Active Authorization List</h4>
            </div>
            
            <div className="card shadow-sm border-0 rounded-3">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th className="ps-4 py-3">BA Number</th>
                                <th>Unit</th>
                                <th>Route Details</th>
                                <th>Validity Period</th>
                                <th className="text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {sanctions.length > 0 ? sanctions.map((s) => (
                                <tr key={s.sanction_id}>
                                    <td className="ps-4 fw-bold text-primary">{s.vehicle_no}</td>
                                    <td className="text-muted">{s.unit_name}</td>
                                    <td>
                                        <div className="d-flex align-items-center gap-2">
                                            <MapPin size={16} className="text-danger" />
                                            <span className="fw-medium">{s.route_from}</span>
                                            <span className="text-muted">→</span>
                                            <span className="fw-medium">{s.route_to}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center gap-2 small">
                                            <Clock size={14} className="text-secondary" />
                                            {new Date(s.end_datetime).toLocaleString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <span className={`badge ${s.status === 'ACTIVE' ? 'bg-success' : 'bg-warning text-dark'} px-3`}>
                                            {s.status}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="5" className="text-center py-5 text-muted">
                                        No active movement sanctions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}