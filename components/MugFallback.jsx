export default function MugFallback() {
  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        background: "#0A0A12",
        borderRadius: "12px",
      }}
    >
      <div
        style={{
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          background: "#6C63FF",
          opacity: 0.15,
        }}
      />
      <p style={{ color: "#9CA0B3", fontSize: "14px" }}>
        3D preview unavailable — reduced motion is enabled or device is low-power.
      </p>
    </div>
  );
}