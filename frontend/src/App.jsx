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
  const [page, setPage] = useState("dashboard");

  function renderPage() {
    switch (page) {
      case "vehicles":
        return <Vehicles />;
      case "settings":
        return <Settings />;
        case "about":
        return <About />;
        case "home":
        return<Home/>;
      default:
        return <Dashboard />;
    }
  }

  return (
    <div className="d-flex" style={{ height: "100vh", background: "#f4f7f3ff" }}>
      <Sidebar active={page} setActive={setPage} />

      <div className="flex-grow-1 d-flex flex-column">
        <Topbar title={page.toUpperCase()} />
        <div className="flex-grow-1 p-4" style={{ overflow: "auto" }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
