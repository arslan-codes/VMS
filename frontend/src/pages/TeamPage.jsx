import React from "react";
import { Code, ShieldCheck, UserCheck } from "lucide-react";

import divLogo from "../assets/images/divlogo.png";
import signalsLogo from "../assets/images/UnitLogo3.png";

// Import all images
import teamPhoto from "../assets/images/w1.jpg";
import teamPhoto1 from "../assets/images/w11.jpeg";
import teamPhoto2 from "../assets/images/w12.jpeg";
import teamPhoto5 from "../assets/images/w5.jpeg";
import teamPhoto6 from "../assets/images/w7.jpeg";
import teamPhoto7 from "../assets/images/w2.jpg";
import teamPhoto8 from "../assets/images/w9.jpeg";

export default function TeamPage() {
  const images = [teamPhoto8, teamPhoto7, teamPhoto6, teamPhoto5, teamPhoto, teamPhoto1, teamPhoto2];

  return (
    <div className="p-4" style={{ animation: "fadeIn 0.6s ease-out", background: "#f8f9fa", minHeight: "100vh" }}>
      
      {/* 1. Official Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 px-5">
        <img src={divLogo} alt="34 DIV HQ" style={{ height: "60px", objectFit: "contain" }} />
        <div className="text-center">
          <h2 className="fw-bold mb-0 text-dark" style={{ letterSpacing: '-1px' }}>Research & Development</h2>
          <p className="text-success tracking-widest text-uppercase fw-bold small mb-0">41 Signals Unit | 34 DIV Tactical Project</p>
        </div>
        <img src={signalsLogo} alt="41 Signals" style={{ height: "60px", objectFit: "contain" }} />
      </div>

      {/* 2. Full Width Patron Card (Lt Col Karrar) */}
      <div className="row justify-content-center mb-3">
        <div className="col-lg-11">
          <div className="card border-0 shadow-sm overflow-hidden" style={{ borderRadius: '15px' }}>
            <div className="row g-0 align-items-center">
              <div className="col-md-12 p-4 bg-white border-start border-success border-5">
                <h3 className="fw-bold mb-0 text-dark h4">Lt Col Karrar</h3>
                <p className="text-primary fw-bold text-uppercase mb-2" style={{ fontSize: '0.85rem' }}>CO 41 Signals Unit</p>
                <p className="text-dark mb-0 fw-medium" style={{ fontSize: '14px', lineHeight: '1.5' }}>
                  Conceived the vision for an IP-based 4G VMS arch 
                  to bridge the gap in tactical veh oversight, providing the STRAD for the trans
                   from SMS-based sys to a high-speed, 4G-enabled RT net.
                   {/* please write the military abbreviarions for this Conceived the vision for an IP-based 4G VMS architecture to bridge the gap in tactical vehicle oversight, providing the strategic roadmap for the transition from SMS-based systems to a high-speed, 4G-enabled real-time network. */}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Carousel Section */}
      <div className="row justify-content-center mb-4">
        <div className="col-lg-11">
          <div id="rdTeamCarousel" className="carousel slide shadow rounded-4 overflow-hidden border border-4 border-white" data-bs-ride="carousel">
            
            {/* Indicators - Dynamically created for 7 images */}
            <div className="carousel-indicators">
              {images.map((_, index) => (
                <button 
                  key={index}
                  type="button" 
                  data-bs-target="#rdTeamCarousel" 
                  data-bs-slide-to={index} 
                  className={index === 0 ? "active" : ""}
                ></button>
              ))}
            </div>

            {/* Carousel Items */}
            <div className="carousel-inner" style={{ height: '400px' }}>
              {images.map((img, index) => (
                <div key={index} className={`carousel-item h-100 ${index === 0 ? 'active' : ''}`} data-bs-interval="3000">
                  <img src={img} className="d-block w-100 h-100" style={{ objectFit: 'cover' }} alt={`Slide ${index}`} />
                </div>
              ))}
            </div>

            {/* Controls */}
            <button className="carousel-control-prev" type="button" data-bs-target="#rdTeamCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon shadow-sm"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#rdTeamCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon shadow-sm"></span>
            </button>

            {/* Persistent Bottom Label */}
            <div className="position-absolute bottom-0 start-0 w-100 p-2 bg-dark bg-opacity-75 text-white text-center" style={{ zIndex: 10 }}>
              <span className="fw-bold small px-3 tracking-widest text-uppercase">41 SIGNALS R&D CELL</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. The Execution Team Row */}
      <div className="row g-3 px-4 pb-4">
        {[
          { name: "Maj Mehr", icon: <UserCheck size={24} /> },
          { name: "Capt Arslan", icon: <Code size={24} /> },
          { name: "Capt Javeria", icon: <ShieldCheck size={24} /> }
        ].map((member, idx) => (
          <div key={idx} className="col-md-4">
            <div className="card border-0 shadow-sm p-3 text-center h-100 bg-white">
              <div className="text-primary mb-2">{member.icon}</div>
              <h6 className="fw-bold mb-0 text-dark">{member.name}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}