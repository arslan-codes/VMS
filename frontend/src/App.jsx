import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import StatHeader from "./components/StatHeader";

// Import your page components
import AlertsPage from "./pages/AlertsPage";
import AssetRegistry from "./pages/MoveSanction";
import FleetStatus from "./pages/FleetStatus";
import MileageReport from "./pages/MileageReport";
import HistoryView from "./pages/MoveHistory";
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

  return (
    <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>
      <Sidebar active={activePage} setActive={setActivePage} />
      
      <div className="flex-grow-1 d-flex flex-column bg-light">
        
        {/* CONDITIONALLY HIDE HEADER */}
        {/* If the activePage is NOT 'dashboard', show the StatHeader */}
        {activePage !== "dashboard" && <StatHeader />}
        
        <main className="flex-grow-1 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}