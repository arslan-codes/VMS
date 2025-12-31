import React from "react";
import { Award, Code, ShieldCheck, Lightbulb, UserCheck } from "lucide-react";

import divLogo from "../assets/images/divlogo.png";
import signalsLogo from "../assets/images/UnitLogo3.png";
import teamPhoto from "../assets/images/w1.jpg";

export default function TeamPage() {
  return (
    <div className="p-4" style={{ animation: "fadeIn 0.6s ease-out", background: "#f8f9fa", minHeight: "100vh" }}>
      
      {/* 1. Official Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 px-5">
        <img src={divLogo} alt="34 DIV HQ" style={{ height: "60px", objectFit: "contain" }} />
        <div className="text-center">
          <h2 className="fw-bold mb-0 text-dark" style={{ letterSpacing: '-1px' }}>Research & Development
</h2>
          <p className="text-success tracking-widest text-uppercase fw-bold small mb-0">41 Signals Unit | 34 DIV Tactical Project</p>
        </div>
        <img src={signalsLogo} alt="41 Signals" style={{ height: "60px", objectFit: "contain" }} />
      </div>

      {/* 2. Full Width Patron Card (Lt Col Karrar) */}
      <div className="row justify-content-center mb-2">
        <div className="col-lg-11">
          <div className="card border-0 shadow-sm overflow-hidden" style={{ borderRadius: '15px' }}>
            <div className="row g-0 align-items-center">
             
              <div className="col-md-11 p-4 bg-white border-start border-success border-5">
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h3 className="fw-bold mb-0 text-dark h4  ">Lt Col Karrar</h3>
                    <p className="text-primary fw-bold text-uppercase small h2 mb-2">CO 41 Signals Unit </p>
                  </div>
                 
                </div>
                {/* Updated Technical Quote */}
                <p className="text-dark mb-0 fw-medium" style={{ fontSize: '14px', lineHeight: '1.5',  }}>
                  Conceived the vision for an IP-based 4G VMS architecture to bridge the gap in tactical vehicle oversight, 
                  providing the strategic roadmap for the transition from sms based systems to a high-speed, 
                  4G-enabled real-time network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Centralized Team Picture Section */}
      <div className="row justify-content-center mb-4">
        <div className="col-lg-11">
          <div className="position-relative shadow rounded-4 overflow-hidden border border-4 border-white" style={{ height: '340px' }}>
            <img 
              src={teamPhoto} 
              alt="R&D Working Team" 
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
            />
            <div className="position-absolute bottom-0 start-0 w-100 p-2 bg-dark bg-opacity-75 text-white text-center">
              <span className="fw-bold small px-3">41 SIGNALS R&D CELL - SWIFT & SECURE</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. The Execution Team (Unified Bottom Row) */}
      <div className="row g-3 px-4 pb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 text-center h-100 bg-white">
            <UserCheck size={24} className="mx-auto mb-2 text-primary" />
            <h6 className="fw-bold mb-1">Maj Mehr</h6>
            <p className="text-primary small fw-bold text-uppercase mb-2">Project Lead & OC</p>
            {/* <p className="text-muted small mb-0 px-2">Operational planning and project lifecycle management.</p> */}
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 text-center h-100 bg-white">
            <Code size={24} className="mx-auto mb-2 text-primary" />
            <h6 className="fw-bold mb-1">Capt Arslan</h6>
            <p className="text-primary small fw-bold text-uppercase mb-2">Lead Developer</p>
            {/* <p className="text-muted small mb-0 px-2">Systems Architecture, TCP Node.js Engine & React Interface.</p> */}
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3 text-center h-100 bg-white">
            <ShieldCheck size={24} className="mx-auto mb-2 text-primary" />
            <h6 className="fw-bold mb-1">Capt Javeria</h6>
            <p className="text-primary small fw-bold text-uppercase mb-2">Systems Analyst</p>
            {/* <p className="text-muted small mb-0 px-2">GIS Database Management & Security Protocol Design.</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}