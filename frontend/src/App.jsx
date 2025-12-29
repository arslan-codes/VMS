import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Home from "./pages/Home";

import './index.css'; 

export default function App() {
  // Set default starting page to 'home' so soldiers see the briefing first
  const [page, setPage] = useState("home");

  function renderPage() {
    switch (page) {
      case "home":
        return <Home />;
      case "dashboard":
        return <Dashboard />;
      case "vehicles":
        return <Vehicles />;
      case "settings":
        return <Settings />;
      case "about":
        return <About />;
      default:
        return <Home />;
    }
  }

  // Logic to format the Topbar title nicely
  const getDisplayTitle = () => {
    switch(page) {
      case "home": return "34 DIV | OPERATIONAL OVERVIEW";
      case "dashboard": return "LIVE COMMAND DASHBOARD";
      case "vehicles": return "ASSET INVENTORY & STATUS";
      case "settings": return "SYSTEM CONFIGURATION";
      case "about": return "TECHNICAL SPECIFICATIONS";
      default: return "VEHICLE MANAGEMENT SYSTEM";
    }
  };


  return (
    <div className="d-flex" style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
      
      {/* SIDEBAR: Locked width */}
      <div style={{ flex: "0 0 260px", backgroundColor: "#0f172a" }}>
        <Sidebar active={page} setActive={setPage} />
      </div>

      {/* RIGHT SIDE: Fixed Column */}
      <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
        
        {/* TOPBAR: Fixed Height */}
        <div style={{ height: "60px", flexShrink: 0 }}>
          <Topbar title={page.toUpperCase()} />
        </div>

        {/* MAIN CONTENT: The only thing allowed to scroll */}
        <main style={{ flexGrow: 1, overflowY: "auto", backgroundColor: "#f8fafc" }}>
          {/* Use w-100 and no max-width here */}
          <div className="p-4 w-100">
            {renderPage()}
          </div>
        </main>

      </div>
    </div>
  );
}
