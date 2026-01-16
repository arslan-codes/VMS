import React, { useState } from "react";
import { MapContainer, TileLayer, Polygon,Marker, CircleMarker, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import signalsLogo from "../assets/images/UnitLogo3.png"
 import jeepIconImg from "../assets/images/jeep.png";

// Data from your KML
const hierarchy = {
  "340 BDE": {
    color: "#ff4d4d",
    locations: [
      { name: "Phalodran", pos: [34.8491, 73.5725] },
      { name: "Penstok", pos: [34.7676, 73.5258] },
      { name: "Paras", pos: [34.6625, 73.4624] },
      { name: "Rashakai", pos: [34.0664, 72.1441] },
      { name: "Havelian", pos: [34.0358, 73.1157] }
    ]
  },
  "341 BDE": {
    color: "#3498db",
    locations: [
      { name: "Multan", pos: [30.1741, 71.3913] },
      { name: "RCM", pos: [30.1176, 71.5233] },
      { name: "QASP", pos: [29.3248, 71.9189] },
      { name: "SCFPP", pos: [30.7129, 73.2392] },
      { name: "Okara", pos: [30.8138, 73.4533] }
    ]
  },
  "342 BDE": {
    color: "#f1c40f",
    locations: [
      { name: "Lahore", pos: [31.4787, 74.4160] },
      { name: "TNB", pos: [31.4940, 74.2438] },
      { name: "Balloki", pos: [31.0367, 73.9267] }
    ]
  },
  "34 DIV ARTY": {
    color: "#9b59b6",
    locations: [
      { name: "GWA", pos: [32.1475, 74.1914] },
      { name: "Sialkot", pos: [32.5162, 74.5639] },
      { name: "KHPP", pos: [33.6016, 73.6075] },
      { name: "Wah Cantt", pos: [33.7715, 72.7510] }
    ]
  },
  "34 DIV": {
    color: "#2ecc71",
    locations: [{ name: "HQ 34 DIV", pos: [33.5690, 73.0865] }]
  }
};

function MapController({ activeUnit }) {
  const map = useMap();
  const view = activeUnit === "34 DIV" 
    ? { center: [32.20, 73.20], zoom: 7 } 
    : { center: hierarchy[activeUnit].locations[0].pos, zoom: 9 };
  map.setView(view.center, view.zoom, { animate: true, duration: 1.5 });
  return null;
}
const jeepIcon = new L.Icon({
  iconUrl: jeepIconImg,
  iconSize: [58, 58],
  iconAnchor: [24, 24],
  popupAnchor: [0, -14],
});
const truckIcon = new L.Icon({
  iconUrl:jeepIconImg,
  iconSize: [58, 58],
  iconAnchor: [24, 24],
  popupAnchor: [0, -14],
});
const fleetData = {
  "BA-4501": { unit: "41 Sig Unit", type: "Single Cabin" },
  "BA-8822": { unit: "55 Fd Arty", type: "Double Cabin" },
  "BA-1203": { unit: "13 Engr", type: "5 Ton" },
  "BA-9944": { unit: "8 PR", type: "Single Cabin" },
  "BA-3315": { unit: "8 SR", type: "5 Ton" },
  "BA-7766": { unit: "33 SR", type: "Double Cabin" },
  "BA-1077": { unit: "10 PR", type: "Single Cabin" },
  "BA-9708": { unit: "97 Ord", type: "5 Ton" },
  "BA-5909": { unit: "59 S&T", type: "5 Ton" },
};
const generateVehiclesForAOR = (locations) => {
  const offsets = [
    [0.01, 0.01],
    [-0.01, 0.008],
    [0.008, -0.01],
    [-0.008, -0.008],
    [0.012, 0],
    [0, 0.012],
  ];

  return Object.entries(fleetData).map(([ba, veh], idx) => {
    const base = locations[idx % locations.length].pos;
    const off = offsets[idx % offsets.length];
    return {
      ba,
      ...veh,
      pos: [base[0] + off[0], base[1] + off[1]],
    };
  });
};
export default function BlinkingTacticalMap() {
  const [activeUnit, setActiveUnit] = useState("34 DIV");
const vehiclesByAOR = {};
  Object.entries(hierarchy).forEach(([unit, data]) => {
    vehiclesByAOR[unit] = generateVehiclesForAOR(data.locations);
  });

  return (
    <div className="vh-100 vw-100 bg-dark position-relative overflow-hidden">
      
      {/* TOP NAV BAR */}
 {/* TOP NAV BAR */}
<div className="position-absolute top-0 start-0 w-100" style={{ zIndex: 1000 }}>
  {/* The 'vw-100' and 'overflow-hidden' on the parent container (BlinkingTacticalMap) 
      combined with 'w-100' here ensures the bar never exceeds the screen width. */}
  <div className="d-flex align-items-center justify-content-between px-3 py-2 shadow-lg border-bottom border-secondary" 
       style={{ 
         background: 'rgba(0, 0, 0, 0)', 
         backdropFilter: 'blur(2px)', 
         width: '100%',
         height: '60px' 
       }}>
    
    {/* LEFT SECTION: Title and Unit Selection */}
    <div className="d-flex align-items-center gap-3 overflow-hidden">
      <div className="border-end border-black border-2 pe-3 flex-shrink-0">
        {/* <h6 className="text-success fw-bold mb-0">34 DIV AOR</h6> */}
        <img 
        src={signalsLogo} 
        alt="41 Signals" 
        style={{ 
          height: "35px", 
          objectFit: "contain",
          filter: "grayscale(100%) brightness(100) invert(1)", 
          // opacity: 
        }} 
      />
      </div>

      {/* Button Group */}
      <div className="d-flex gap-2  no-scrollbar">
        {Object.keys(hierarchy).reverse().map((unit) => (
          <button
            key={unit}
            onClick={() => setActiveUnit(unit)}
            className={`btn btn-sm px-3 py-2 rounded-2 d-flex align-items-center gap-2 flex-shrink-0 transition-all ${
              activeUnit === unit ? 'bg-success text-white shadow' : 'text-secondary border-0'
            }`}
            style={{ fontSize: '11px', fontWeight: '700' }}
          >
            <div className={activeUnit === unit ? "blink-dot" : ""} style={{ 
              width: '8px', height: '8px', borderRadius: '50%', 
              backgroundColor: activeUnit === unit ? '#fff' : hierarchy[unit].color 
            }}></div>
            {unit}
          </button>
        ))}
         
      </div>
    </div>

    {/* RIGHT SECTION: Logo */}
   
  </div>
</div>

      <MapContainer 
        center={[32.5, 73.0]} 
        zoom={7} 
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        {/* <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" /> */}
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapController activeUnit={activeUnit} />

        {Object.entries(hierarchy).map(([unitName, data]) => {
          const isVisible = activeUnit === "34 DIV" || activeUnit === unitName;
          
          return (
            <React.Fragment key={unitName}>
              {/* Boundaries */}
              {unitName !== "34 DIV" && (
                <Polygon 
                  positions={data.locations.map(l => l.pos)}
                  pathOptions={{
                    color: data.color,
                    fillColor: isVisible ? data.color : 'transparent',
                    fillOpacity: activeUnit === unitName ? 0.15 : 0.05,
                    weight: isVisible ? 2 : 1,
                    dashArray: isVisible ? '0' : '5, 10'
                  }}
                />
              )}

              {/* Blinking Markers */}
              {data.locations.map((loc, i) => (
                <CircleMarker 
                  key={i}
                  center={loc.pos}
                  radius={activeUnit === unitName || activeUnit === "34 DIV" ? 7 : 4}
                  className={isVisible ? "tactical-node-blink" : ""}
                  pathOptions={{
                    color: isVisible ? data.color : '#444',
                    fillColor: isVisible ? data.color : '#222',
                    fillOpacity: 1,
                    weight: 2
                  }}
                >
                  <Tooltip permanent direction="top" offset={[0, -10]} className="tactical-tooltip">
                    {loc.name}
                  </Tooltip>
                </CircleMarker>
              ))}
            </React.Fragment>
          );
        })}
          {Object.entries(vehiclesByAOR).map(([unit, vehicles]) => {
          const isVisible = activeUnit === "34 DIV" || activeUnit === unit;
          if (!isVisible) return null;

          return vehicles.map((veh) => (
            <Marker
              key={veh.ba}
              position={veh.pos}
              icon={veh.type.includes("5 Ton") ? truckIcon : jeepIcon}
            >
              <Tooltip>
                <strong>{veh.ba}</strong>
                <br />
                {veh.type}
                <br />
                {veh.unit}
              </Tooltip>
            </Marker>
          ));
        })}
      </MapContainer>

      <style>{`
        /* Blinking Animation for Map Icons */
        .tactical-node-blink {
          animation: node-pulse 1.5s infinite ease-in-out;
        }

        @keyframes node-pulse {
          0% { stroke-width: 2; stroke-opacity: 1; fill-opacity: 1; }
          50% { stroke-width: 8; stroke-opacity: 0.3; fill-opacity: 0.7; }
          100% { stroke-width: 2; stroke-opacity: 1; fill-opacity: 1; }
        }

        /* Small Blink for Nav Buttons */
        .blink-dot {
          animation: simple-blink 1s infinite;
        }

        @keyframes simple-blink {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }

        .tactical-tooltip {
          background: rgba(0, 0, 0, 0.8) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: #fff !important;
          font-weight: 600;
          font-size: 10px !important;
          padding: 2px 6px !important;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}