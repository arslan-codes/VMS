import dvgnLogo from "../assets/images/01021.png";
import { FaTachometerAlt, FaCar, FaCog, FaInfoCircle } from "react-icons/fa";

export default function Sidebar({ active, setActive }) {
  const menu = [
    { id: "dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
    { id: "vehicles", label: "Vehicles", icon: <FaCar /> },
    { id: "settings", label: "System Settings", icon: <FaCog /> },
    { id: "about", label: "About / Unit Info", icon: <FaInfoCircle /> },
  ];

  return (
    <div
      style={{
        width: "240px",
        background: "#ffffffff",
        borderRight: "1px solid #bab8b8ff",
        padding: "15px",
      }}
    >
      {/* DVGN Logo */}
      <div
        onClick={() => setActive("home")}
       className="fw-bold mb-4 d-flex align-items-center"
  style={{
    color: "#000",
    fontSize: "16px",
    cursor: "pointer",
    paddingBottom: "6px",
    borderBottom: active === "home" ? "3px solid #000" : "3px solid transparent",
    transition: "border-bottom 0.25s ease",
  }}
      >
        <img
          src={dvgnLogo}
          alt="DVGN Logo"
          style={{ height: "50px", marginRight: "10px" }}
        />
        <span style={{ fontSize: "20px", fontWeight: 700 }}>34 DIV</span>
      </div>

      {/* Menu Items */}
      {menu.map((item) => (
        <div
          key={item.id}
          onClick={() => setActive(item.id)}
          style={{
            padding: "12px",
            borderRadius: "62px",
            marginBottom: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            border: active === item.id ? "2px solid #000" : "2px solid transparent",
            color: active === item.id ? "#000" : "#1f2937",
            fontWeight: 500,
            background: active === item.id ? "#c5fa96ff" : "transparent",
            transform: active === item.id ? "scale(1.05)" : "scale(1)",
            transition: "all 0.3s ease",
          }}
        >
          <span style={{ fontSize: "18px" }}>{item.icon}</span>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
