import React from "react";
import { Cpu, Send, Server, Shield, Smartphone, Globe } from "lucide-react";

export default function Architecture() {
  return (
    <div className="p-5" style={{ animation: "fadeIn 0.5s ease-in-out", background: "#f8f9fa", minHeight: "100vh" }}>
      <div className="text-center mb-5">
        <h2 className="fw-bold">System Data Flow Architecture</h2>
        <p className="text-muted">Real-time Multicast Telemetry from VT100 Assets to Command Nodes</p>
        <div className="mx-auto bg-primary" style={{ width: '80px', height: '4px', borderRadius: '2px' }}></div>
      </div>

      <div className="row justify-content-center align-items-center g-4">
        
        {/* Step 1: The Asset */}
        <div className="col-md-3">
          <div className="card border-0 shadow-sm p-4 text-center bg-white h-100">
            <div className="mb-3 text-primary"><Smartphone size={40} /></div>
            <h6 className="fw-bold">VT100 Tracker</h6>
            <p className="small text-muted mb-0">Installed in Asset. Captures GPS, Ignition, & Battery Status.</p>
            <div className="mt-3 py-1 bg-primary-subtle text-primary rounded-pill small fw-bold">RAW TCP PACKET</div>
          </div>
        </div>

        {/* Arrow 1 */}
        <div className="col-md-1 text-center d-none d-md-block">
          <Send className="text-muted" size={24} />
        </div>

        {/* Step 2: The Core Engine */}
        <div className="col-md-4">
          <div className="card border-0 shadow-lg p-4 text-center bg-dark text-white h-100 position-relative">
            <div className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-primary px-3">NODE.JS CORE</div>
            <div className="mb-3 mt-2 text-info"><Server size={48} /></div>
            <h5 className="fw-bold">41 Signals Central Server</h5>
            <p className="small opacity-75">Processes TCP Stream, Decodes VT100 Protocol, and Updates MySQL DB.</p>
            <div className="d-flex justify-content-center gap-2 mt-2">
              <Globe size={14} className="text-info"/> <span className="small font-monospace">Port: 5000</span>
            </div>
          </div>
        </div>

        {/* Arrow 2 (Splitting) */}
        <div className="col-md-1 text-center d-none d-md-block">
          <div className="d-flex flex-column align-items-center gap-4">
             <Send className="text-muted" style={{ transform: 'rotate(-30deg)' }} size={20} />
             <Send className="text-muted" style={{ transform: 'rotate(30deg)' }} size={20} />
          </div>
        </div>

        {/* Step 3: Distribution Nodes */}
        <div className="col-md-3">
          <div className="d-flex flex-column gap-3">
            {/* Brigade View */}
            <div className="card border-0 shadow-sm p-3 bg-white border-start border-info border-4">
              <div className="d-flex align-items-center gap-3">
                <Shield className="text-info" size={24} />
                <div>
                  <h6 className="mb-0 fw-bold">Brigade HQ</h6>
                  <small className="text-muted">Local Fleet Monitoring</small>
                </div>
              </div>
            </div>

            {/* Division View */}
            <div className="card border-0 shadow-sm p-3 bg-white border-start border-primary border-4">
              <div className="d-flex align-items-center gap-3">
                <Cpu className="text-primary" size={24} />
                <div>
                  <h6 className="mb-0 fw-bold">Division HQ</h6>
                  <small className="text-muted">Full AOR Oversight</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logic Explanation Box */}
      <div className="row justify-content-center mt-5">
        <div className="col-md-10">
          <div className="card border-0 bg-white p-4 shadow-sm">
            <h6 className="fw-bold border-bottom pb-2 mb-3">Technical Communication Logic</h6>
            <div className="row g-4 small text-muted">
              <div className="col-md-4">
                <strong>1. Ingestion:</strong> The VT100 sends a hex-encoded packet via APN to the Central Server IP.
              </div>
              <div className="col-md-4">
                <strong>2. Broadcasting:</strong> Node.js uses WebSockets (Socket.io) to multicast the data to all connected clients.
              </div>
              <div className="col-md-4">
                <strong>3. Filtering:</strong> Brigade terminals automatically filter the stream to only show BA numbers registered to their specific Unit ID.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}