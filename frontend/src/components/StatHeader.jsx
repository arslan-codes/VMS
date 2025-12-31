import React from "react";
import { Search } from "lucide-react";

export default function StatHeader() {
  const stats = [
    { label: "Total Assets", value: "731", color: "text-black" },
    { label: "Active", value: "450", color: "text-success" },
    { label: "Faulty", value: "281", color: "text-danger" },
    { label: "Violations (24h)", value: "12", color: "text-warning" },
  ];

  return (
    <div className="bg-white border-bottom shadow-sm p-3 d-flex align-items-center justify-content-between">
      <div className="d-flex gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="border-end pe-4 last-child-no-border">
            <div className="text-muted text-uppercase fw-bold" style={{ fontSize: '10px' }}>{stat.label}</div>
            <div className={`fs-4 fw-bold ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="d-flex align-items-center bg-light rounded-pill px-3 py-2" style={{ width: "300px" }}>
        <Search size={18} className="text-muted me-2" />
        <input 
          type="text" 
          placeholder="Search BA Number..." 
          className="bg-transparent border-0 outline-none w-100"
          style={{ fontSize: '14px' }}
        />
      </div>
    </div>
  );
}