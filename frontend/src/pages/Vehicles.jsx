export default function Vehicles() {
  return (
    <div className="bg-white p-3 rounded shadow-sm">
      <h5>Live Vehicle List</h5>
      <table className="table table-sm mt-3">
        <thead>
          <tr>
            <th>IMEI</th>
            <th>Status</th>
            <th>Speed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>356938035643809</td>
            <td>Moving</td>
            <td>54 km/h</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
