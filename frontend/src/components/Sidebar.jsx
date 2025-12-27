import dvgnLogo from "../assets/images/01021.png";
export default function Sidebar({ active, setActive }) {
  const menu = [
    { id: "dashboard", label: "Dashboard" },
    { id: "vehicles", label: "Vehicles" },
    { id: "settings", label: "System Settings" },
    { id: "about", label: "About / Unit Info" }

  ];

  return (
    <div
      style={{
        width: "240px",
        background: "#ffffff",
        borderRight: "1px solid #ddd",
        padding: "15px"
      }}
    >
      <div className="fw-bold mb-4  " style={{ color: "#1e3a5f", fontSize: "16px" }}disabled>
     
       <img
        src={dvgnLogo}
        alt="DVGN Logo"
        style={{ height: "80px", marginRight: "30px" }}
      />
              </div>

      {menu.map(item => (
        <div
          key={item.id}
          onClick={() => setActive(item.id)}
          style={{
            padding: "12px",
            borderRadius: "6px",
            marginBottom: "8px",
            cursor: "pointer",
            background: active === item.id ? "#1e3a5f" : "transparent",
            color: active === item.id ? "#fff" : "#1f2937"
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}
