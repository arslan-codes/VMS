import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Search, ChevronRight, ChevronLeft, MapPin } from "lucide-react";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import jeepIconImg from "../assets/images/jeep.png";
import Ton5Img from "../assets/images/5Ton.png";

const getVehicleIcon = (type) => {
  const iconUrl = type === "5 Ton" ? Ton5Img : jeepIconImg;
  return new L.Icon({
    iconUrl,
    iconSize: [45, 45],
    iconAnchor: [22, 22],
  });
};

export default function ActiveMove() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [fleet, setFleet] = useState([]);
  const [selectedBA, setSelectedBA] = useState(null);
  const [flightPath, setFlightPath] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(500);
  const [searchTerm, setSearchTerm] = useState("");
  const timerRef = useRef(null);

  // 1. Fetch Fleet List for Sidebar
  useEffect(() => {
    fetch("http://localhost:5000/api/fleet/status")
      .then((res) => res.json())
      .then((data) => {
        setFleet(data);
        if (data.length > 0) setSelectedBA(data[0].vehicle_no);
      });
  }, []);

  // 2. Fetch History when selectedBA changes
  useEffect(() => {
    if (selectedBA) {
      fetch(`http://localhost:5000/api/history/${selectedBA}`)
        .then((res) => res.json())
        .then((data) => {
          const formatted = data.map((p) => ({
            lat: parseFloat(p.lat),
            lng: parseFloat(p.lng),
            speed: p.speed,
            time: p.time,
          }));
          setFlightPath(formatted);
          setCurrentIndex(0);
          setIsPlaying(false);
        });
    }
  }, [selectedBA]);

  // 3. Playback Logic
  useEffect(() => {
    if (isPlaying && currentIndex < flightPath.length - 1) {
      timerRef.current = setTimeout(() => setCurrentIndex((prev) => prev + 1), playbackSpeed);
    } else {
      setIsPlaying(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentIndex, playbackSpeed, flightPath]);

  const currentAsset = fleet.find((v) => v.vehicle_no === selectedBA) || {};
  const currentPos = flightPath[currentIndex] || { lat: 33.772, lng: 72.782 };

  const filteredFleet = fleet.filter(v => 
    v.vehicle_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.unit_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex bg-dark" style={{ height: "100vh", overflow: "hidden" }}>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #333 #000; }
      `}</style>

      {/* --- SIDEBAR --- */}
      <div className="bg-black text-white transition-all shadow-lg" 
           style={{ width: isSidebarOpen ? '320px' : '0px', transition: '0.3s ease', overflow: 'hidden' }}>
        <div style={{ width: '320px' }} className="p-3">
          <h6 className="text-success fw-bold mb-3">Vehicle History</h6>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text bg-secondary border-0 text-white"><Search size={14}/></span>
            <input 
                type="text" 
                className="form-control bg-secondary border-0 text-white shadow-none" 
                placeholder="Search BA / Unit..." 
                onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="overflow-auto custom-scrollbar" style={{ maxHeight: 'calc(100vh - 150px)' }}>
            {filteredFleet.map((v) => (
              <div key={v.vehicle_no} onClick={() => setSelectedBA(v.vehicle_no)}
                   className={`p-2 px-3 mb-2 rounded border-start border-4 cursor-pointer transition ${selectedBA === v.vehicle_no ? 'bg-primary border-white' : 'bg-secondary opacity-50'}`}>
                <div className="d-flex justify-content-between">
                  <span className="fw-bold">{v.vehicle_no}</span>
                  <span className="badge bg-black small">{v.vehicle_type}</span>
                </div>
                <small className="text-white-50">{v.unit_name}</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-grow-1 d-flex flex-column position-relative">
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} 
                className="btn btn-dark position-absolute start-0 top-50 translate-middle-y rounded-end p-1 shadow-lg" 
                style={{ zIndex: 1100 }}>
          {isSidebarOpen ? <ChevronLeft size={20}/> : <ChevronRight size={20}/>}
        </button>

        {/* Header Information */}
        <div className="bg-black border-bottom border-secondary text-white p-3 d-flex align-items-center gap-4">
          <div>
            <h5 className="mb-0 fw-bold">{selectedBA} <small className="text-muted">| Route Replay</small></h5>
            <div className="d-flex gap-2 mt-1">
                <span className="badge bg-warning text-dark">{currentAsset.unit_name}</span>
                <span className="badge bg-info text-dark">{currentPos.speed} km/h</span>
                <span className="badge bg-secondary text-white">{currentPos.time}</span>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="flex-grow-1">
          <MapContainer center={[33.772, 72.782]} zoom={14} className="h-100 w-100">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            
            {/* Historical Path Lines */}
            <Polyline positions={flightPath.map(p => [p.lat, p.lng])} color="#4f46e5" weight={2} dashArray="5, 5" opacity={0.4} />
            <Polyline positions={flightPath.slice(0, currentIndex + 1).map(p => [p.lat, p.lng])} color="#22c55e" weight={4} />
            
            {flightPath.length > 0 && (
                <Marker position={[currentPos.lat, currentPos.lng]} icon={getVehicleIcon(currentAsset.vehicle_type)}>
                    <Popup><strong>{selectedBA}</strong><br/>Time: {currentPos.time}</Popup>
                </Marker>
            )}
            
            <RecenterMap lat={currentPos.lat} lng={currentPos.lng} />
          </MapContainer>
        </div>

        {/* Playback Controls */}
        <div className="bg-white border-top p-3 px-5 shadow-lg">
          <div className="row align-items-center">
            <div className="col-auto d-flex gap-2">
              <button className={`btn ${isPlaying ? 'btn-outline-danger' : 'btn-primary'} rounded-circle`} onClick={() => setIsPlaying(!isPlaying)}>
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button className="btn btn-light rounded-circle" onClick={() => {setCurrentIndex(0); setIsPlaying(false);}}>
                <RotateCcw size={24} />
              </button>
            </div>
            <div className="col px-4">
              <input type="range" className="form-range" min="0" max={flightPath.length > 0 ? flightPath.length - 1 : 0} value={currentIndex} onChange={(e) => setCurrentIndex(parseInt(e.target.value))} />
            </div>
            <div className="col-auto">
              <select className="form-select form-select-sm fw-bold border-primary" onChange={(e) => setPlaybackSpeed(parseInt(e.target.value))}>
                <option value="500">1.0x Speed</option>
                <option value="200">2.5x Speed</option>
                <option value="50">10.0x Speed</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecenterMap({ lat, lng }) {
  const map = useMap();
  useEffect(() => { if (lat && lng) map.panTo([lat, lng]); }, [lat, lng, map]);
  return null;
}