import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import StatHeader from "./components/StatHeader";
import { TrackingProvider } from './context/TrackingContext';
// Import your page components
import AlertsPage from "./pages/AlertsPage";
import MoveSanction from "./pages/MoveSanction"; // Mapping AssetRegistry to MoveSanction
import FleetStatus from "./pages/FleetStatus";
import History from "./pages/History";
import ActiveMove from "./pages/MoveHistory"; // Mapping HistoryView to MoveHistory
import DashboardMap from "./pages/DashboardMap";
import NightMove from "./pages/NightMove";
import PanicList from "./pages/PanicList";
import TeamPage from "./pages/TeamPage";
import Architecture from "./pages/Architecture.JSX";

export default function App() {
 const [activePage, setActivePage] = useState("dashboard");

  // --- STATE MANAGEMENT & LOCAL STORAGE ---
  const [sanctions, setSanctions] = useState(() => {
    const saved = localStorage.getItem("vms_sanctions");
    return saved ? JSON.parse(saved) : [
      { id: "S-2026/001", ba: "BA-4501", unit: "41 Sig Unit", from: "Taxila", to: "Rawalpindi", validTo: "2026-01-20" }
    ];
  });

  useEffect(() => {
    localStorage.setItem("vms_sanctions", JSON.stringify(sanctions));
  }, [sanctions]);

  const addSanction = (newMove) => {
    setSanctions((prev) => [newMove, ...prev]);
  };

  const deleteSanction = (id) => {
    setSanctions(prev => prev.filter(s => s.id !== id));
  };

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardMap />;
      case "architecture":
        return <Architecture />;
      case "rd_team":
        return <TeamPage />;
      case "fleet":
        return <FleetStatus />;
        case "moving":
        return <MoveSanction sanctions={sanctions} onAdd={addSanction} onDelete={deleteSanction} />;
      case "Active_move":
        return <ActiveMove  />; 
      case "alerts":
        return <AlertsPage />;
      case "night_move":
        return <NightMove />;
      case "panic":
        return <PanicList />;
      
      case "history":
        return <History />;
      default:
        return (
          <div className="p-5 text-center">
            <h4 className="text-muted">Module "{activePage}" is being configured.</h4>
          </div>
        );
    }
  };

  // Logic to determine if header should be shown
  // We hide it if activePage is "dashboard" OR "rd_team"
  const hideHeader = activePage==="Active_move"  ||activePage === "dashboard" || activePage === "rd_team";

  return (
    <TrackingProvider>
    <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>
      {/* Sidebar - Passes the setter function to update App state */}
      <Sidebar active={activePage} setActive={setActivePage} />
      
      <div className="flex-grow-1 d-flex flex-column bg-light">
        
        {/* CONDITIONALLY HIDE HEADER */}
        {!hideHeader && <StatHeader />}
        
        <main className="flex-grow-1 overflow-auto">
          {renderContent()}
        </main>
      </div>

    </div>
    </TrackingProvider>

  );
}