export default function Topbar({ title }) {
  return (
    <div
      style={{
        height: "60px",
        background: "#ffffff",
        borderBottom: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        fontWeight: "600",
        color: "#1e3a5f"
      }}
    >
      {title}
    </div>
  );
}
