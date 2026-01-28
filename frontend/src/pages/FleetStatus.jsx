import React, { useState, useEffect } from "react";
import { Filter, FileDown, MapPin } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function FleetStatus() {
  const [fleet, setFleet] = useState([]);
  const [filteredFleet, setFilteredFleet] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState("All");

  // Actual Units from your fleetData
  const unitList = [
    "All", "41 Sig Unit", "55 Fd Arty", "13 Engr", 
    "8 PR", "8 SR", "33 SR", "10 PR", "97 Ord", "59 S&T"
  ];

  // 1. Fetch live data from backend
  // inside FleetStatus.jsx
useEffect(() => {
    const fetchFleet = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/fleet/status');
            const data = await res.json();
            
            // CRITICAL: Overwrite the state entirely with 'data' 
            // Do not use setFleet(prev => [...prev, ...data])
            setFleet(data); 
            
            // If the user hasn't selected a specific unit, update the display list too
            if (selectedUnit === "All") {
                setFilteredFleet(data);
            }
        } catch (err) {
            console.error("Error fetching fleet:", err);
        }
    };

    fetchFleet();
    const interval = setInterval(fetchFleet, 5000); // Polling every 5 seconds
    
    return () => clearInterval(interval); // Cleanup on unmount
}, [selectedUnit]); // Re-run if selectedUnit changes to keep filter consistent

  // 2. Handle Filtering
  useEffect(() => {
    if (selectedUnit === "All") {
      setFilteredFleet(fleet);
    } else {
      setFilteredFleet(fleet.filter(v => v.unit_name === selectedUnit));
    }
  }, [selectedUnit, fleet]);

  // 3. Export PDF Function
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text(`Fleet Status Report - ${selectedUnit}`, 14, 15);
    
    const tableColumn = ["BA Number", "Unit", "Type", "Status", "Speed", "Location"];
    const tableRows = filteredFleet.map(v => [
      v.vehicle_no,
      v.unit_name,
      v.vehicle_type,
      v.speed > 0 ? "Moving" : "Parked",
      `${v.speed || 0} km/h`,
      `${v.latitude}, ${v.longitude}`
    ]);

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save(`Fleet_Report_${selectedUnit}_${new Date().toLocaleDateString()}.pdf`);
  };

  return (
    <div className="p-4 animate-in fade-in duration-500">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-0">Fleet Inventory</h3>
          <p className="text-muted small">Real-time status of 34 DIV assets</p>
        </div>
        
        <div className="d-flex gap-2">
          {/* Unit Filter Dropdown */}
          <div className="dropdown">
            <button className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-2 dropdown-toggle" 
                    type="button" data-bs-toggle="dropdown">
              <Filter size={16} /> {selectedUnit}
            </button>
            <ul className="dropdown-menu shadow-sm border-0">
              {unitList.map(unit => (
                <li key={unit}>
                  <button className="dropdown-item small" onClick={() => setSelectedUnit(unit)}>
                    {unit}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button onClick={exportPDF} className="btn btn-primary btn-sm d-flex align-items-center gap-2">
            <FileDown size={16} /> Export Report
          </button>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr style={{ fontSize: '11px' }} className="text-muted text-uppercase">
                <th className="ps-4">BA Number</th>
                <th>Unit / Brigade</th>
                <th>Status</th>
                <th>Last Coordinates</th>
                <th>Speed</th>
                <th className="pe-4">Health</th>
              </tr>
            </thead>
            <tbody>
              {filteredFleet.map((veh) => (
                <tr key={veh.vehicle_no} style={{ fontSize: '13px' }}>
                  <td className="ps-4 fw-bold text-primary">{veh.vehicle_no}</td>
                  <td>
                    <span className="fw-medium">{veh.unit_name}</span>
                    <div className="text-muted" style={{fontSize: '10px'}}>{veh.vehicle_type}</div>
                  </td>
                  <td>
                    <span className={`badge rounded-pill ${
                      veh.speed > 0 ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'
                    }`}>
                      {veh.speed > 0 ? 'Moving' : 'Parked'}
                    </span>
                  </td>
                  {/* Change this line in your FleetStatus.jsx */}
<td className="text-muted small">
  <MapPin size={12} className="me-1 text-danger"/>
  {Number(veh.latitude || 0).toFixed(4)}, {Number(veh.longitude || 0).toFixed(4)}
</td>
                  <td className="fw-bold">{veh.speed || 0} <span className="small fw-normal text-muted">km/h</span></td>
                  <td className="pe-4">
                    <div className="progress" style={{ height: '6px', width: '80px' }}>
                      <div className={`progress-bar ${veh.speed > 80 ? 'bg-danger' : 'bg-success'}`} 
                           style={{ width: '100%' }}></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredFleet.length === 0 && (
            <div className="p-5 text-center text-muted">No vehicles found for {selectedUnit}</div>
          )}
        </div>
      </div>
    </div>
  );
}