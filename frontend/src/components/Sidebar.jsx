import React from "react";
import dvgnLogo from "../assets/images/01021.png";
import { FaTachometerAlt, FaCar, FaCog, FaInfoCircle, FaShieldAlt } from "react-icons/fa";

export default function Sidebar({ active, setActive }) {
  const menu = [
    { id: "dashboard", label: "COMD DASHBOARD", icon: <FaTachometerAlt /> },
    { id: "vehicles", label: "FLEET STATUS", icon: <FaCar /> },
    { id: "settings", label: "SYSTEM CONFIG", icon: <FaCog /> },
    { id: "about", label: "UNIT INFO", icon: <FaInfoCircle /> },
  ];

  // Tactical Color Palette
  const colors = {
    background: "#111827", // Dark Slate (Military Standard)
    textInactive: "#9CA3AF", // Muted Grey
    textActive: "#FFFFFF", // High Vis White
    accent: "#3b82f6", // Tactical Blue (Or use #eab308 for Warning Amber)
    hoverBg: "rgba(255, 255, 255, 0.05)",
    border: "#374151"
  };

  return (
    <div
      className="d-flex flex-column"
      style={{
        width: "260px",
        height: "100vh", // Full height fixed
        background: colors.background,
        borderRight: `1px solid ${colors.border}`,
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}
    >
      {/* 1. HEADER: Division Identity */}
      <div
        onClick={() => setActive("home")}
        className="d-flex align-items-center p-4 mb-2"
        style={{
          cursor: "pointer",
          borderBottom: `1px solid ${colors.border}`,
          background: "rgba(0,0,0,0.2)"
        }}
      >
        <img
          src={dvgnLogo}
          alt="Div Logo"
          style={{ height: "45px", width: "auto", filter: "drop-shadow(0px 0px 4px rgba(255,255,255,0.2))" }}
        />
        <div className="ms-3 d-flex flex-column justify-content-center">
          <span style={{ color: "#fff", fontSize: "18px", fontWeight: "800", letterSpacing: "1px" }}>34 DIV</span>
          <span style={{ color: colors.accent, fontSize: "10px", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase" }}>HQ</span>
        </div>
      </div>

      {/* 2. MENU ITEMS */}
      <div className="flex-grow-1 px-3 py-2">
        <small className="text-uppercase fw-bold mb-3 d-block" style={{ color: "#4B5563", fontSize: "11px", letterSpacing: "1.5px" }}>
          Main Operations
        </small>
        
        {menu.map((item) => {
          const isActive = active === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setActive(item.id)}
              className="d-flex align-items-center mb-2 px-3 py-3"
              style={{
                cursor: "pointer",
                borderRadius: "4px", // Minimal rounding, not pill
                background: isActive ? "rgba(59, 130, 246, 0.15)" : "transparent",
                borderLeft: isActive ? `4px solid ${colors.accent}` : "4px solid transparent",
                color: isActive ? colors.textActive : colors.textInactive,
                transition: "all 0.2s ease-in-out",
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = colors.hoverBg;
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = "transparent";
              }}
            >
              <span style={{ fontSize: "18px", width: "30px", display: "flex", justifyContent: "center" }}>
                {item.icon}
              </span>
              <span style={{ fontSize: "14px", fontWeight: isActive ? "600" : "500", letterSpacing: "0.5px" }}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* 3. FOOTER: Connection Status (Critical for Offline Systems) */}
      <div className="p-3 mt-auto" style={{ borderTop: `1px solid ${colors.border}`, background: "rgba(0,0,0,0.2)" }}>
        <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10B981", boxShadow: "0 0 8px #10B981", marginRight: "10px" }}></div>
                <span style={{ color: colors.textInactive, fontSize: "12px" }}>SYSTEM ONLINE</span>
            </div>
            <FaShieldAlt style={{ color: "#4B5563" }} />
        </div>
        <div className="text-muted mt-1" style={{ fontSize: "10px", fontFamily: "monospace" }}>
           VMS-DIV-V1.4.2
        </div>
      </div>
    </div>
  );
}