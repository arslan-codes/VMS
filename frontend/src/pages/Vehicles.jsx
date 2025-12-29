import { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";

export default function Vehicles() {
  const [search, setSearch] = useState("");
  const vehicles = [
    { imei: "356938035643809", unit: "41 SIG", status: "Moving", speed: 54 },
    { imei: "356938035643810", unit: "12 ART", status: "Stopped", speed: 0 },
    { imei: "356938035643811", unit: "EME SEC", status: "Idle", speed: 10 },
  ];

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold mb-0">ASSET INVENTORY</h4>
        <div className="d-flex gap-2">
          <div className="input-group" style={{ width: "300px" }}>
            <span className="input-group-text bg-white border-end-0"><FaSearch className="text-muted" /></span>
            <input 
              className="form-control border-start-0" 
              placeholder="Filter by IMEI or Unit..." 
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-outline-dark d-flex align-items-center gap-2" style={{ borderRadius: '0' }}>
            <FaFilter /> EXPORT
          </button>
        </div>
      </div>

      <div className="card border-secondary shadow-sm" style={{ borderRadius: '0' }}>
        <table className="table table-hover table-striped mb-0">
          <thead className="table-dark">
            <tr style={{ fontSize: '12px', letterSpacing: '1px' }}>
              <th className="ps-4">SERIAL / IMEI</th>
              <th>ASSIGNED UNIT</th>
              <th>CURRENT STATUS</th>
              <th>LAST RECORDED SPEED</th>
            </tr>
          </thead>
          <tbody className="font-monospace">
            {vehicles.map((v) => (
              <tr key={v.imei} className="align-middle">
                <td className="ps-4 fw-bold text-primary">{v.imei}</td>
                <td className="fw-bold text-uppercase">{v.unit}</td>
                <td>
                    <span className={`badge rounded-0 ${v.status === 'Moving' ? 'bg-success' : 'bg-secondary'}`}>
                        {v.status.toUpperCase()}
                    </span>
                </td>
                <td>{v.speed} KM/H</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}