import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Navigation, Zap, Clock, ChevronRight } from "lucide-react";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Create a custom vehicle icon
const vehicleIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/809/809998.png", // Replace with a local tank/jeep icon later
  iconSize: [30, 30],
  iconAnchor: [15, 15],
});

// Dummy Path Data (simulating 4G IP pings)
const flightPath = [
  { lat: 33.772513, lng: 72.780174, speed: 0,  time: "09:00 AM", status: "Ignition On" },
  { lat: 33.772455, lng: 72.780230, speed: 8,  time: "09:01 AM", status: "Moving" },
  { lat: 33.772397, lng: 72.780286, speed: 14, time: "09:02 AM", status: "Moving" },
  { lat: 33.772339, lng: 72.780342, speed: 22, time: "09:03 AM", status: "Moving" },
  { lat: 33.772281, lng: 72.780398, speed: 28, time: "09:04 AM", status: "Moving" },

  { lat: 33.772223, lng: 72.780454, speed: 35, time: "09:05 AM", status: "Cruising" },
  { lat: 33.772165, lng: 72.780510, speed: 42, time: "09:06 AM", status: "Cruising" },
  { lat: 33.772107, lng: 72.780566, speed: 48, time: "09:07 AM", status: "Cruising" },
  { lat: 33.772049, lng: 72.780622, speed: 52, time: "09:08 AM", status: "Moving" },
  { lat: 33.771991, lng: 72.780678, speed: 55, time: "09:09 AM", status: "Moving" },

  { lat: 33.771933, lng: 72.780734, speed: 58, time: "09:10 AM", status: "Highway Speed" },
  { lat: 33.771875, lng: 72.780790, speed: 60, time: "09:11 AM", status: "Highway Speed" },
  { lat: 33.771817, lng: 72.780846, speed: 57, time: "09:12 AM", status: "Cruising" },
  { lat: 33.771759, lng: 72.780902, speed: 50, time: "09:13 AM", status: "Cruising" },
  { lat: 33.771701, lng: 72.780958, speed: 45, time: "09:14 AM", status: "Approaching Area" },

  { lat: 33.771643, lng: 72.781014, speed: 38, time: "09:15 AM", status: "Urban Traffic" },
  { lat: 33.771585, lng: 72.781070, speed: 30, time: "09:16 AM", status: "Urban Traffic" },
  { lat: 33.771527, lng: 72.781126, speed: 22, time: "09:17 AM", status: "Slow Moving" },
  { lat: 33.771469, lng: 72.781182, speed: 18, time: "09:18 AM", status: "Near Destination" },
  { lat: 33.771411, lng: 72.781238, speed: 12, time: "09:19 AM", status: "Near Destination" },

  { lat: 33.771353, lng: 72.781294, speed: 8,  time: "09:20 AM", status: "Slowing Down" },
  { lat: 33.771295, lng: 72.781350, speed: 5,  time: "09:21 AM", status: "Final Approach" },
  { lat: 33.771237, lng: 72.781406, speed: 3,  time: "09:22 AM", status: "Parking" },
  { lat: 33.771179, lng: 72.781462, speed: 1,  time: "09:23 AM", status: "Stopping" },
  { lat: 33.771122, lng: 72.781515, speed: 0,  time: "09:24 AM", status: "Arrived at Destination" }
];

export default function HistoryView() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(500); // ms
  const timerRef = useRef(null);

  // Function to handle animation logic
  useEffect(() => {
    if (isPlaying && currentIndex < flightPath.length - 1) {
      timerRef.current = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, playbackSpeed);
    } else {
      setIsPlaying(false);
      clearTimeout(timerRef.current);
    }
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentIndex, playbackSpeed]);

  const resetPlayback = () => {
    setIsPlaying(false);
    setCurrentIndex(0);
  };

  const currentPos = flightPath[currentIndex];

  return (
    <div className="h-100 d-flex flex-column bg-light" style={{ minHeight: '90vh' }}>
      
      {/* 1. Control Header */}
      <div className="bg-dark text-white p-3 d-flex align-items-center gap-4 shadow">
        <div>
          <h5 className="mb-0 fw-bold">Route Playback</h5>
          <small className="text-info">Asset: 34-A-1234 | 41 Sig Unit</small>
        </div>

        <div className="d-flex gap-2 ms-auto">
          <input type="date" className="form-control form-control-sm bg-secondary text-white border-0" />
          <button className="btn btn-primary btn-sm px-3">Load Data</button>
        </div>
      </div>

      {/* 2. Map Area */}
      <div className="flex-grow-1 position-relative">
        <MapContainer center={[33.772025, 72.782718]}
        zoom={14} className="h-100 w-100">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          
          {/* Static Full Path Line */}
          <Polyline positions={flightPath.map(p => [p.lat, p.lng])} color="#4f46e5" weight={3} dashArray="5, 10" />
          
          {/* The Active Trail (Progressive Line) */}
          <Polyline 
            positions={flightPath.slice(0, currentIndex + 1).map(p => [p.lat, p.lng])} 
            color="#22c55e" 
            weight={5} 
          />

          {/* The Moving Vehicle */}
          <Marker position={[currentPos.lat, currentPos.lng]} icon={vehicleIcon}>
            <Popup>
              <strong>{currentPos.time}</strong><br/>
              Speed: {currentPos.speed} km/h
            </Popup>
          </Marker>

          <RecenterMap lat={currentPos.lat} lng={currentPos.lng} />
        </MapContainer>

        {/* Floating Telemetry HUD */}
        <div className="position-absolute top-0 start-0 m-3" style={{ zIndex: 1000 }}>
          <div className="card bg-dark text-white border-0 shadow-lg p-3 opacity-90" style={{ width: '200px' }}>
            <div className="small text-muted mb-2 text-uppercase fw-bold">Telemetry</div>
            <div className="d-flex justify-content-between mb-1">
              <span><Zap size={14} className="text-warning"/> Speed</span>
              <span className="fw-bold">{currentPos.speed} <small>km/h</small></span>
            </div>
            <div className="d-flex justify-content-between mb-1">
              <span><Clock size={14} className="text-info"/> Time</span>
              <span className="fw-bold">{currentPos.time}</span>
            </div>
            <div className="progress mt-2" style={{ height: '4px' }}>
              <div 
                className="progress-bar bg-success" 
                style={{ width: `${(currentIndex / (flightPath.length - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Replay Controller Bar */}
      <div className="bg-white border-top p-3 px-5 shadow-lg">
        <div className="row align-items-center">
          <div className="col-auto d-flex gap-2">
            <button 
              className={`btn ${isPlaying ? 'btn-outline-danger' : 'btn-primary'} rounded-circle p-2`} 
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button className="btn btn-light rounded-circle p-2" onClick={resetPlayback}>
              <RotateCcw size={24} />
            </button>
          </div>

          <div className="col px-4">
            <input 
              type="range" 
              className="form-range" 
              min="0" 
              max={flightPath.length - 1} 
              value={currentIndex} 
              onChange={(e) => setCurrentIndex(parseInt(e.target.value))}
            />
            <div className="d-flex justify-content-between small fw-bold text-muted mt-1">
              <span>{flightPath[0].time} (Start)</span>
              <span className="text-primary px-3 bg-light rounded">Sequence: {currentIndex + 1} / {flightPath.length}</span>
              <span>{flightPath[flightPath.length-1].time} (End)</span>
            </div>
          </div>

          <div className="col-auto">
            <select 
              className="form-select form-select-sm fw-bold border-primary"
              onChange={(e) => setPlaybackSpeed(parseInt(e.target.value))}
            >
              <option value="1000">Speed: 0.5x</option>
              <option value="500" selected>Speed: 1.0x</option>
              <option value="200">Speed: 2.0x</option>
              <option value="50">Speed: 5.0x</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component to auto-pan the map during playback
function RecenterMap({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    map.panTo([lat, lng]);
  }, [lat, lng, map]);
  return null;
}