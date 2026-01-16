import React from "react";
import { 
  LayoutDashboard, Car, History,Users,Cpu, 
  AlertTriangle, Gauge, ShieldAlert
} from "lucide-react";
import { Map as MapIcon } from "lucide-react";
import divLogo  from "../assets/images/divlogo.png";
export default function Sidebar({ active, setActive }) {
  const menuGroups = [
    {
      label: "Operational",
      items: [
        { id: "dashboard", label: "Main Dashboard", icon: <LayoutDashboard size={20} /> },
        { id: "fleet", label: "Vehicle Status", icon: <Car size={20} /> }
      ]
    },
    {
      label: "Audit & Reports",
      items: [
        { id: "moving", label: "Move Sanctions", icon: <MapIcon size={20} /> },
        { id: "history", label: "Move History", icon: <Gauge size={20} /> },
        { id: "Active_move", label: "Active Move ", icon: <History size={20} /> },
        { id: "night_move", label: "Night Move Logs", icon: <ShieldAlert size={20} /> },
      ]
    },
    {
      label: "Security & Sanctions",
      items: [
        { id: "alerts", label: "Violations/Alerts", icon: <AlertTriangle size={20}  color="#ef4444"/> },
        // { id: "panic", label: "Faulty/Removal update", icon: <ShieldAlert size={20} color="#ef4444" /> },
      ]
    },
    {
  label: "Project Info",
  items: [
    { id: "rd_team", label: "R&D Team", icon: <Users size={20} /> },
    { id: "architecture", label: "System Architecture", icon: <Cpu size={20} /> },
  ]
}
  ];

  // Inline style to hide scrollbar
  const hideScrollbarStyle = {
    msOverflowStyle: 'none',  /* IE and Edge */
    scrollbarWidth: 'none',   /* Firefox */
    WebkitOverflowScrolling: 'touch',
  };

  return (
    <div className="d-flex flex-column bg-dark text-white shadow" style={{ width: "260px", height: "100vh", flexShrink: 0 }}>
      {/* Branding Header */}
      <div className="p-4 border-bottom border-secondary bg-black text-center">
                <img src={divLogo} alt="34 DIV HQ" style={{ height: "60px", objectFit: "contain" }} />
        
        <h4 className="mb-0 fw-bold tracking-tighter">34 DIV VMS</h4>
        {/* <small className="text-success fw-bold letter-spacing-2" style={{ fontSize: '11px' }}>TACTICAL HQ</small> */}
      </div>

      {/* Navigation Area */}
      <div 
        className="flex-grow-1 overflow-y-auto py-3 px-2 no-scrollbar" 
        style={{ ...hideScrollbarStyle, overflowX: 'hidden' }}
      >
        {/* CSS to hide webkit scrollbars specifically */}
        <style>
          {`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {menuGroups.map((group, idx) => (
          <div key={idx} className="mb-4">
            <small className="text-uppercase text-muted fw-bold px-3 mb-2 d-block" style={{ fontSize: '10px', letterSpacing: '1px' }}>
              {group.label}
            </small>
            {group.items.map((item) => (
              <div
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`d-flex align-items-center px-3 py-2 rounded-2 mb-1 cursor-pointer transition-all ${
                  active === item.id ? "bg-success text-white shadow-sm" : "text-secondary hover-bg-dark"
                }`}
                style={{ cursor: "pointer", transition: '0.2s' }}
              >
                <span className="me-3 d-flex align-items-center">{item.icon}</span>
                <span style={{ fontSize: "14px", fontWeight: active === item.id ? "600" : "400" }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}