export default function LiveTable({ log }) {
  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body p-0">
        <table className="table table-hover table-sm mb-0">
          <thead className="table-light">
            <tr>
              <th>Time</th>
              <th>IMEI</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Speed</th>
              <th>GPS</th>
            </tr>
          </thead>
          <tbody>
            {(log || []).map((r, i) => (
              <tr key={i}>
                <td>{r.time}</td>
                <td>{r.imei}</td>
                <td>{r.latitude}</td>
                <td>{r.longitude}</td>
                <td>{r.speed}</td>
                <td>
                  <span
                    className={
                      r.gpsFix === "Valid"
                        ? "badge bg-success"
                        : "badge bg-danger"
                    }
                  >
                    {r.gpsFix}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
