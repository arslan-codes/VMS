import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Activity, Shield, Navigation, Radio } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Dummy data for live vehicles
const liveVehicles = [
  { id: 1, ba: "34-A-1234", lat: 33.772025, lng: 72.782718, status: "Moving", speed: "42 km/h" },
  { id: 2, ba: "19-GJ-2114", lat: 33.6944, lng: 72.0679, status: "Parked", speed: "0 km/h" },
  { id: 3, ba: "22-GJ-1109", lat: 33.7044, lng: 73.0879, status: "Moving", speed: "15 km/h" },
];

export default function DashboardMap() {
  return (
    <div className="h-100 position-relative w-100 bg-dark">
      {/* 1. Floating Tactical Metrics Overlay */}
      <div className="position-absolute top-0 start-0 m-3 d-flex flex-column gap-2" style={{ zIndex: 1000, width: '280px' }}>
        <div className="card bg-dark text-white border-secondary shadow-lg opacity-90 p-3">
          <div className="d-flex align-items-center gap-2 mb-2 text-primary">
            <Radio size={18} className="animate-pulse" />
            <span className="fw-bold small text-uppercase">Live Signals</span>
          </div>
          <div className="d-flex justify-content-between mb-1">
            <small className="text-muted">Active Pings</small>
            <span className="badge bg-success">14 Units</span>
          </div>
          <div className="d-flex justify-content-between">
            <small className="text-muted">Comm Status</small>
            <span className="text-success small">Stable</span>
          </div>
        </div>

        {/* 2. Quick Alerts Panel */}
        <div className="card bg-dark text-white border-danger shadow-lg opacity-90 p-3">
          <div className="d-flex align-items-center gap-2 mb-2 text-danger">
            <Shield size={18} />
            <span className="fw-bold small text-uppercase">Priority Alerts</span>
          </div>
          <div className="small border-start border-danger ps-2 mb-2">
            <strong>34-A-1234:</strong> Overspeeding <br/>
            <small className="text-muted">Sector B-4 | 10:42 AM</small>
          </div>
        </div>
      </div>

      {/* 3. The Map Layer */}
      <MapContainer 
        center={[33.6844, 73.0479]} 
        zoom={13} 
        style={{ height: "100%", width: "100%" }}
        zoomControl={false} // We move it to bottom right for cleaner UI
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap'
        />
        
        {liveVehicles.map((veh) => (
          <Marker key={veh.id} position={[veh.lat, veh.lng]}>
            <Popup>
              <div className="p-1">
                <strong className="text-primary d-block">{veh.ba}</strong>
                <small className="d-block text-muted">{veh.status} - {veh.speed}</small>
                <hr className="my-1"/>
                <button className="btn btn-primary btn-sm w-100 mt-1 py-0" style={{ fontSize: '10px' }}>
                  Track Focus
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* 4. Bottom Legend Panel */}
      <div className="position-absolute bottom-0 start-0 m-3 bg-white p-2 rounded shadow-sm d-flex gap-3 px-3 border" style={{ zIndex: 1000 }}>
        <div className="d-flex align-items-center gap-2 small">
          <span className="bg-success rounded-circle" style={{ width: 10, height: 10 }}></span> Moving
        </div>
        <div className="d-flex align-items-center gap-2 small border-start ps-3">
          <span className="bg-warning rounded-circle" style={{ width: 10, height: 10 }}></span> Idle
        </div>
        <div className="d-flex align-items-center gap-2 small border-start ps-3">
          <span className="bg-danger rounded-circle" style={{ width: 10, height: 10 }}></span> Stopped
        </div>
      </div>
    </div>
  );
}