import React from "react";
import { Search } from "lucide-react";
import signalsLogo from "../assets/images/UnitLogo3.png"


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

      <div className="d-flex justify-content-end px-3 py-2" style={{ width: "300px" }}>
  <img src={signalsLogo} alt="41 Signals" style={{ height: "60px", objectFit: "contain" }} />
</div>
    </div>
  );
}