export default function Topbar({ title }) {
  return (
    <div
      style={{
        height: "60px",
        background: "#ffffffff",
        borderBottom: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        padding: "20px 20px",
        fontWeight: "600",
        color: "#1e3a5f"
      }}
    >
      {title}
    </div>
  );
}
