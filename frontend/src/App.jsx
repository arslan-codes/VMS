import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import StatHeader from "./components/StatHeader";

// Import your page components
import AlertsPage from "./pages/AlertsPage";
import AssetRegistry from "./pages/MoveSanction"; // Mapping AssetRegistry to MoveSanction
import FleetStatus from "./pages/FleetStatus";
import MileageReport from "./pages/MileageReport";
import HistoryView from "./pages/MoveHistory"; // Mapping HistoryView to MoveHistory
import DashboardMap from "./pages/DashboardMap";
import NightMove from "./pages/NightMove";
import PanicList from "./pages/PanicList";
import TeamPage from "./pages/TeamPage";
import Architecture from "./pages/Architecture.JSX";

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");

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
      case "history":
        return <HistoryView />;
      case "alerts":
        return <AlertsPage />;
      case "night_move":
        return <NightMove />;
      case "panic":
        return <PanicList />;
      case "moving":
        return <AssetRegistry />;
      case "mileage":
        return <MileageReport />;
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
  const hideHeader = activePage === "dashboard" || activePage === "rd_team";

  return (
    <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>
      {/* Sidebar - Passes the setter function to update App state */}
      <Sidebar active={activePage} setActive={setActivePage} />
      
      <div className="flex-grow-1 d-flex flex-column bg-light">
        
        {/* CONDITIONALLY HIDE HEADER */}
        {/* Only render StatHeader if hideHeader is false */}
        {!hideHeader && <StatHeader />}
        
        <main className="flex-grow-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}