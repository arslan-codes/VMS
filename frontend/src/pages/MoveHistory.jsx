import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Zap, Clock, Truck, ChevronRight, ChevronLeft, Search, Filter } from "lucide-react";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Custom Icon Logic for different Vehicle Types
const getVehicleIcon = (type) => {
  const iconUrl = type === "5 Ton" 
    ? "https://cdn-icons-png.flaticon.com/512/2555/2555013.png" // Truck icon
    : "https://cdn-icons-png.flaticon.com/512/3202/3202926.png"; // Jeep/Pickup icon
  
  return new L.Icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};


// 24 DIV FLEET DATA SETUP
const fleetData = {
  "BA-4501": { name: "Single Cabin", unit: "41 Sig Unit", type: "Single Cabin", div: "34 Div" },
  "BA-8822": { name: "Double Cabin", unit: "55 Fd Arty", type: "Double Cabin", div: "34 Div" },
  "BA-1203": { name: "5 Ton GS", unit: "13 Engr", type: "5 Ton", div: "34 Div" },
  "BA-9944": { name: "Single Cabin", unit: "8 PR", type: "Single Cabin", div: "34 Div" },
  "BA-3315": { name: "5 Ton GS", unit: "8 SR", type: "5 Ton", div: "34 Div" },
  "BA-7766": { name: "Double Cabin", unit: "33 SR", type: "Double Cabin", div: "34 Div" },
  "BA-1077": { name: "Single Cabin", unit: "10 PR", type: "Single Cabin", div: "34 Div" },
  "BA-9708": { name: "5 Ton GS", unit: "97 Ord", type: "5 Ton", div: "34 Div" },
  "BA-5909": { name: "5 Ton GS", unit: "59 S&T", type: "5 Ton", div: "34 Div" },
};

// Add mock paths to each asset
Object.keys(fleetData).forEach((ba, index) => {
  fleetData[ba].path = generateMockPath(33.772 + (index * 0.01), 72.780 + (index * 0.005));
});

export default function ActiveMove() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedBA, setSelectedBA] = useState("BA-4501");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(500);
  const timerRef = useRef(null);

  const currentAsset = fleetData[selectedBA];
  const flightPath = currentAsset.path;
  const currentPos = flightPath[currentIndex];

  useEffect(() => {
    if (isPlaying && currentIndex < flightPath.length - 1) {
      timerRef.current = setTimeout(() => setCurrentIndex(prev => prev + 1), playbackSpeed);
    } else {
      setIsPlaying(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentIndex, playbackSpeed, flightPath]);

  return (
    <div className="d-flex  border-2  shadow-sm" style={{ height: "100vh", overflow: "hidden" }}>
      {/* --- CSS STYLES FOR SCROLLBAR --- */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #000;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #198754; /* Success Green on hover */
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #333 #000;
        }
      `}</style>
      {/* --- ASSET SIDEBAR (24 DIV) --- */}
      <div className={`bg-black   transition-all shadow-lg ${isSidebarOpen ? 'w-300' : 'w-0'}`} 
           style={{ width: isSidebarOpen ? '320px' : '0px', transition: '0.3s ease', overflow: 'hidden', zIndex: 1050 }}>
        <div style={{ width: '320px' }} className="p-3 border-2  text-white">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <h6 className="text-success fw-bold mb-0">Vehicles</h6>
          </div>
          <small className="text-white d-block mb-3 border-bottom border-secondary pb-2"> Overview</small>
          
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text bg-secondary border-0 text-white"><Search size={14}/></span>
            <input type="text" className="form-control bg-secondary border-0 text-white shadow-none" placeholder="Search BA / Unit..." />
          </div>

          <div className="overflow-auto custom-scrollbar flex-grow-1 pe-2" style={{ maxHeight: 'calc(100vh - 150px)' }}>
            {Object.keys(fleetData).map(ba => (
              <div key={ba} onClick={() => { setSelectedBA(ba); setCurrentIndex(0); setIsPlaying(false); }}
                   className={`p-2 px-3 mb-2 rounded border-start border-4 cursor-pointer transition ${selectedBA === ba ? 'bg-primary border-white' : 'bg-secondary opacity-50'}`}>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold" style={{ letterSpacing: '1px' }}>{ba}</span>
                  <span className="badge bg-black text-white x-small" style={{ fontSize: '10px' }}>{fleetData[ba].type}</span>
                </div>
                <small className="d-block text-white-50">{fleetData[ba].unit}</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-grow-1 d-flex flex-column position-relative bg-success">
        
        {/* Sidebar Toggle */}
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} 
                className="btn btn-dark ms-2 border border-secondary bg-black position-absolute start-0 top-50 translate-middle-y rounded-end p-1 shadow-lg" 
                style={{ zIndex: 1100, left: 0 }}>
          {isSidebarOpen ? <ChevronLeft size={20}/> : <ChevronRight size={20}/>}
        </button>

        {/* 1. Control Header */}
        <div className="bg-black border-2 border-white  border-bottom  text-white p-3 d-flex align-items-center gap-4 shadow" style={{ zIndex: 1001 }}>
          <div>
            <h5 className="mb-0 fw-bold">{selectedBA} <small className="text-white">| {currentAsset.name}</small></h5>
            <div className="d-flex gap-3 mt-1">
                <span className="badge bg-warning text-dark">{currentAsset.unit}</span>
                <span className="badge bg-secondary">{currentAsset.div}</span>
            </div>
          </div>
         
        </div>

        {/* 2. Map Area */}
        <div className="flex-grow-1 position-relative">
          <MapContainer center={[33.772025, 72.782718]} zoom={12} className="h-100 w-100">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            
            <Polyline positions={flightPath.map(p => [p.lat, p.lng])} color="#4f46e5" weight={2} dashArray="10, 10" opacity={0.5} />
            <Polyline positions={flightPath.slice(0, currentIndex + 1).map(p => [p.lat, p.lng])} color="#22c55e" weight={5} />
            
            <Marker position={[currentPos.lat, currentPos.lng]} icon={getVehicleIcon(currentAsset.type)}>
              <Popup><strong>{selectedBA}</strong><br/>{currentAsset.unit}</Popup>
            </Marker>
            
            <RecenterMap lat={currentPos.lat} lng={currentPos.lng} />
          </MapContainer>

         
         </div>

        {/* 3. Replay Controller */}
        <div className="bg-white border-top p-3 px-5 shadow-lg" style={{ zIndex: 1001 }}>
          <div className="row align-items-center">
            <div className="col-auto d-flex gap-2">
              <button className={`btn ${isPlaying ? 'btn-outline-danger' : 'btn-primary'} rounded-circle p-2`} onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button className="btn btn-light rounded-circle p-2" onClick={() => {setCurrentIndex(0); setIsPlaying(false);}}>
                <RotateCcw size={24} />
              </button>
            </div>
            <div className="col px-4">
              <input type="range" className="form-range" max={flightPath.length - 1} value={currentIndex} onChange={(e) => setCurrentIndex(parseInt(e.target.value))} />
            </div>
            <div className="col-auto">
              <select className="form-select form-select-sm fw-bold border-primary" onChange={(e) => setPlaybackSpeed(parseInt(e.target.value))}>
                <option value="500">1.0x </option>
                <option value="200">2.0x </option>
                <option value="50">10.0x </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Map Helper
function RecenterMap({ lat, lng }) {
  const map = useMap();
  useEffect(() => { map.panTo([lat, lng]); }, [lat, lng, map]);
  return null;
}

// Path Generator
function generateMockPath(startLat, startLng) {
  let currentLat = startLat;
  let currentLng = startLng;

  return Array.from({ length: 100 }, (_, i) => {
    let latStep = 0;
    let lngStep = 0;

    // These segments are calibrated for the specific street lengths in your image
    if (i < 35) {
      // SEGMENT 1: Driving North-West up the street
      latStep = 0.00008; 
      lngStep = -0.00004;
    } else if (i < 65) {
      // SEGMENT 2: THE TURN - Vehicle turns right at the T-junction
      // Moving North-East along the horizontal-ish road
      latStep = 0.00005;
      lngStep = 0.00008;
    } else {
      // SEGMENT 3: Turning North to follow the main road exit
      latStep = 0.0005;
      lngStep = 0.00002;
    }

    // CRITICAL: Very low jitter (0.000002) so it doesn't leave the road line
    const jitter = (Math.random() - 0.5) * 0.000004;

    currentLat += latStep + jitter;
    currentLng += lngStep + jitter;

    return {
      lat: currentLat,
      lng: currentLng,
      speed: Math.floor(Math.random() * 5) + 30, // Realistic speed for residential turns
      time: new Date(Date.now() + i * 10000).toLocaleTimeString([], { 
        hour: '2-digit', minute: '2-digit', second: '2-digit' 
      }),
    };
  });
}