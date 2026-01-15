import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// 1. Define the AOR Coordinates
const aorZones = {
  "340 BDE": { center: [34.015, 72.350], zoom: 10 }, // Phalodran to Rashakai area
  "341 BDE": { center: [30.157, 71.524], zoom: 9 },  // Multan, Sahiwal, Bahawalpur
  "342 BDE": { center: [31.520, 74.358], zoom: 10 }, // Lahore to Head Baloki
  "34 DIV": { center: [32.000, 73.000], zoom: 7 },   // Overall view
};

const liveVehicles = [
  { id: 1, ba: "34-A-1234", lat: 33.772025, lng: 72.782718, status: "Moving", speed: "42 km/h" },
  { id: 2, ba: "19-GJ-2114", lat: 30.157, lng: 71.524, status: "Parked", speed: "0 km/h" },
  { id: 3, ba: "22-GJ-1109", lat: 31.520, lng: 74.358, status: "Moving", speed: "15 km/h" },
];

// 2. Helper component to handle Map movement
function MapController({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom, { animate: true, duration: 1.5 });
  return null;
}

export default function DashboardMap() {
  const [activeUnit, setActiveUnit] = useState("34 DIV");

  return (
    <div className="h-100 position-relative w-100 bg-dark">
      
      {/* 3. Horizontal Unit Selector Overlay */}
      <div className="position-absolute top-0 start-0 m-3 d-flex flex-row gap-2" style={{ zIndex: 1000 }}>
        {Object.keys(aorZones).map((unit) => {
          const isActive = activeUnit === unit;
          return (
            <div 
              key={unit}
              onClick={() => setActiveUnit(unit)}
              className="card border-secondary shadow-lg p-2 d-flex align-items-center justify-content-center"
              style={{ 
                minWidth: '100px', 
                backgroundColor: 'rgba(0, 0, 0, 0.7)', 
                backdropFilter: 'blur(4px)',
                cursor: 'pointer',
                border: isActive ? '1px solid #198754' : '1px solid rgba(255,255,255,0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              <div className="d-flex align-items-center gap-2">
                {/* Ping Icon: Green if active, Blue if not */}
                <div 
                  className={`rounded-circle ${isActive ? 'bg-success' : 'bg-primary'}`} 
                  style={{ 
                    width: '8px', 
                    height: '8px',
                    boxShadow: isActive ? '0 0 8px #198754' : 'none'
                  }}
                ></div>
                <span className="text-white fw-bold small text-nowrap" style={{ fontSize: '11px' }}>
                  {unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. The Map Layer */}
      <MapContainer 
        center={aorZones["34 DIV"].center} 
        zoom={aorZones["34 DIV"].zoom} 
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {/* The Controller that reacts to state changes */}
        <MapController 
          center={aorZones[activeUnit].center} 
          zoom={aorZones[activeUnit].zoom} 
        />
        
        {liveVehicles.map((veh) => (
          <Marker key={veh.id} position={[veh.lat, veh.lng]}>
            <Popup>
              <div className="p-1">
                <strong className="text-primary d-block">{veh.ba}</strong>
                <small className="d-block text-muted">{veh.status} - {veh.speed}</small>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* 5. Bottom Legend Panel */}
      <div className="position-absolute bottom-0 start-0 m-3 bg-white p-2 rounded shadow-sm d-flex gap-3 px-3 border" style={{ zIndex: 1000 }}>
        <div className="d-flex align-items-center gap-2 small">
          <span className="bg-success rounded-circle" style={{ width: 10, height: 10 }}></span> Moving
        </div>
        <div className="d-flex align-items-center gap-2 small border-start ps-3">
          <span className="bg-primary rounded-circle" style={{ width: 10, height: 10 }}></span> Active Unit
        </div>
      </div>
    </div>
  );
}