import { useState } from "react";

export default function Vehicles() {
  // Sample vehicle data
  const [vehicles] = useState([
    { imei: "356938035643809", status: "Moving", speed: 54 },
    { imei: "356938035643810", status: "Stopped", speed: 0 },
    { imei: "356938035643811", status: "Idle", speed: 10 },
    { imei: "356938035643812", status: "Moving", speed: 72 },
  ]);

  const [search, setSearch] = useState("");

  // Filter vehicles based on search input
  const filteredVehicles = vehicles.filter(
    (v) =>
      v.imei.includes(search) ||
      v.status.toLowerCase().includes(search.toLowerCase()) ||
      v.speed.toString().includes(search)
  );

  return (
    <div className="bg-white p-3 rounded shadow-sm">
      <h5>Live Vehicle List</h5>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by IMEI, Status, or Speed"
        className="form-control mt-3 mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Vehicle Table */}
      <table className="table table-sm mt-3">
        <thead>
          <tr>
            <th>IMEI</th>
            <th>Status</th>
            <th>Speed</th>
          </tr>
        </thead>
        <tbody>
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map((v) => (
              <tr key={v.imei}>
                <td>{v.imei}</td>
                <td>{v.status}</td>
                <td>{v.speed} km/h</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center">
                No vehicles found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
