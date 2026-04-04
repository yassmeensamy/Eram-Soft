import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "EramSoft — Software Development & Digital Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0e1a 0%, #141c2a 40%, #1a2540 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(80,170,255,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-10%",
            left: "-5%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(80,170,255,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#e8edf4",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            EramSoft
          </div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 500,
              color: "rgba(180, 195, 215, 0.7)",
              letterSpacing: "0.05em",
              textTransform: "uppercase" as const,
            }}
          >
            Software Development & Digital Solutions
          </div>
        </div>

        {/* Bottom border accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "10%",
            right: "10%",
            height: "4px",
            background: "linear-gradient(90deg, transparent, #50aaff, transparent)",
            borderRadius: "2px",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
