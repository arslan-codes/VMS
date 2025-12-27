export default function StatCard({ title, value, icon }) {
  return (
    <div className="col-md-3 mb-4">
      <div className="card shadow-sm border-0 h-100">
        <div className="card-body d-flex align-items-center">
          {icon && <span className="me-3 fs-3">{icon}</span>}
          <div>
            <div className="text-muted small">{title}</div>
            <div className="h5 fw-bold">{value}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
