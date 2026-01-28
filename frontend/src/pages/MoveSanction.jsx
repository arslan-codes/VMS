import React, { useState, useEffect } from "react";
import { Plus, Clock, MapPin, CheckCircle } from "lucide-react";

export default function MoveSanction() {
    const [sanctions, setSanctions] = useState([]);
    const [units, setUnits] = useState([]);
    const [availableVehicles, setAvailableVehicles] = useState([]);
    const [formData, setFormData] = useState({
        unit_id: "", vehicle_id: "", route_from: "", route_to: "", start_datetime: "", end_datetime: ""
    });

    useEffect(() => {
        fetchSanctions();
        fetchUnits();
    }, []);

    const fetchSanctions = async () => {
        const res = await fetch('http://localhost:5000/api/sanctions');
        const data = await res.json();
        setSanctions(data);
    };

    const fetchUnits = async () => {
        const res = await fetch('http://localhost:5000/api/units_full'); // Use a route that gives IDs
        const data = await res.json();
        setUnits(data);
    };

    // When unit changes, fetch only vehicles belonging to that unit
    useEffect(() => {
        if (formData.unit_id) {
            fetch(`http://localhost:5000/api/vehicles/by-unit/${formData.unit_id}`)
                .then(res => res.json())
                .then(data => setAvailableVehicles(data));
        }
    }, [formData.unit_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/api/sanctions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (res.ok) {
            alert("Sanction Issued Successfully!");
            setFormData({ unit_id: "", vehicle_id: "", route_from: "", route_to: "", start_datetime: "", end_datetime: "" });
            fetchSanctions();
        }
    };

    return (
        <div className="p-4">
            <h3 className="fw-bold mb-4">Move Sanction Management</h3>

            {/* ISSUANCE FORM */}
            <div className="card shadow-sm border-0 p-4 mb-4">
                <h5 className="mb-3 text-success"><Plus size={18} /> Issue New Sanction</h5>
                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-md-3">
                        <label className="form-label small fw-bold">Select Unit</label>
                        <select className="form-select" value={formData.unit_id} onChange={(e) => setFormData({...formData, unit_id: e.target.value})} required>
                            <option value="">Select Unit...</option>
                            {units.map(u => <option key={u.unit_id} value={u.unit_id}>{u.unit_name}</option>)}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label small fw-bold">Vehicle (BA Number)</label>
                        <select className="form-select" value={formData.vehicle_id} onChange={(e) => setFormData({...formData, vehicle_id: e.target.value})} required disabled={!formData.unit_id}>
                            <option value="">Select Vehicle...</option>
                            {availableVehicles.map(v => <option key={v.vehicle_id} value={v.vehicle_id}>{v.vehicle_no}</option>)}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label small fw-bold">Route From</label>
                        <input type="text" className="form-control" placeholder="Origin" value={formData.route_from} onChange={(e) => setFormData({...formData, route_from: e.target.value})} required />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label small fw-bold">Route To</label>
                        <input type="text" className="form-control" placeholder="Destination" value={formData.route_to} onChange={(e) => setFormData({...formData, route_to: e.target.value})} required />
                    </div>
                    <div className="col-md-3">
                        <label className="form-label small fw-bold">Date & Time</label>
                        <input type="datetime-local" className="form-control" value={formData.end_datetime} onChange={(e) => setFormData({...formData, end_datetime: e.target.value})} required />
                    </div>
                    <div className="col-md-3 d-flex align-items-end">
                        <button type="submit" className="btn btn-success w-100">Add Sanction</button>
                    </div>
                </form>
            </div>


            {/* LIST OF SANCTIONS */}
            <h3 className="fw-bold mb-4">Active Sanctions</h3>
           
            <div className="card shadow-sm border-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr className="small text-uppercase">
                                <th className="ps-4">BA Number</th>
                                <th>Unit</th>
                                <th>Route</th>
                                <th>Valid Until</th>
                                <th className="pe-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sanctions.map((s) => (
                                <tr key={s.sanction_id} className="small" style={{ fontSize: '14px' }}>
                                    <td className="ps-4 fw-bold">{s.vehicle_no}</td>
                                    <td>{s.unit_name}</td>
                                    <td><MapPin size={14}/> {s.route_from} → {s.route_to}</td>
                                    <td><Clock size={14}/> {new Date(s.end_datetime).toLocaleString()}</td>
                                    <td className="pe-4">
                                        <span className={`badge rounded-pill ${s.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary'}`}>
                                            {s.status}
                                        </span>
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