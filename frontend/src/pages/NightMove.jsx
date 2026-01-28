import React, { useState, useEffect } from "react";
import { Moon, Clock, MapPin, ShieldAlert, Download, Loader2 } from "lucide-react";

export default function NightMove() {
  const [moves, setMoves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNightMoves = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/sidebar/night-move-logs');
      const data = await res.json();
      setMoves(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching night moves:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNightMoves();
    const interval = setInterval(fetchNightMoves, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  // Count unauthorized moves for the warning banner
  const unauthorizedCount = moves.filter(m => m.speed > 0).length; // Simplified logic: if it's night and moving, flag it

  return (
    <div className="p-4" style={{ animation: "fadeIn 0.4s ease-out" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1 d-flex align-items-center gap-2">
            <Moon className="text-primary" fill="#0d6efd" size={24} /> Night Move Inspection
          </h3>
          <p className="text-muted small">Real-time movement detection (2200 hrs - 0600 hrs).</p>
        </div>
        <button className="btn btn-outline-dark btn-sm d-flex align-items-center gap-2">
          <Download size={16} /> Export Disciplinary Log
        </button>
      </div>

      {/* Warning Banner */}
      {unauthorizedCount > 0 && (
        <div className="alert alert-danger border-0 shadow-sm d-flex align-items-center gap-3 mb-4">
          <ShieldAlert className="text-danger" size={24} />
          <div>
            <strong className="d-block">Unauthorized Night Movement Detected</strong>
            <small>The system has flagged {unauthorizedCount} active assets moving during restricted hours.</small>
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="card border-0 shadow-sm overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr className="text-muted small text-uppercase" style={{ fontSize: '11px' }}>
                <th className="ps-4 text-center">BA Number</th>
                <th>Unit</th>
                <th>Recorded Time</th>
                <th>Speed</th>
                <th>Current Coordinates</th>
                <th>Status</th>
                <th className="text-end pe-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    <Loader2 className="spinner-border spinner-border-sm me-2" /> Loading tactical data...
                  </td>
                </tr>
              ) : moves.length > 0 ? moves.map((move, i) => (
                <tr key={i} style={{ fontSize: '14px' }}>
                  <td className="ps-4 fw-bold text-primary text-center">{move.ba}</td>
                  <td>{move.unit}</td>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <Clock size={14} className="text-muted" />
                      <span>{new Date(move.recorded_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                    </div>
                  </td>
                  <td>
                    <span className="fw-bold">{move.speed}</span> <small className="text-muted">km/h</small>
                  </td>
                  <td>
                    <div className="small text-muted">
                      <MapPin size={12} className="text-danger" /> {Number(move.lat).toFixed(4)}, {Number(move.lng).toFixed(4)}
                    </div>
                  </td>
                  <td>
                    {/* If speed > 0 during night without specific auth logic, we label as Un-Authorized for discipline check */}
                    <span className={`badge ${move.speed > 0 ? 'bg-danger' : 'bg-success'}`}>
                      {move.speed > 0 ? 'UN-AUTHORIZED' : 'PARKED'}
                    </span>
                  </td>
                  <td className="text-end pe-4">
                    <button className="btn btn-outline-primary btn-sm">Intercept</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-muted">No night movements detected in this sector.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}