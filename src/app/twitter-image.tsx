import { ImageResponse } from "next/og";
import { ABOUT_ME, SOCIAL_LINKS } from "../components/constants/data";

export const runtime = "edge";
export const alt = `${ABOUT_ME.name} - Portfolio Website`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#030014",
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(121, 40, 202, 0.2) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(0, 112, 243, 0.2) 0%, transparent 40%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Modern Grid Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: 0.5,
          }}
        />

        {/* Central Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(10, 10, 20, 0.7)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "48px",
            padding: "80px 100px",
            backdropFilter: "blur(40px)",
            boxShadow: "0 40px 100px -20px rgba(0, 0, 0, 0.8)",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              padding: "6px 20px",
              borderRadius: "100px",
              background: "linear-gradient(90deg, #7928CA, #FF0080)",
              marginBottom: "30px",
            }}
          >
            <span
              style={{
                fontSize: "16px",
                color: "#fff",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
              }}
            >
              Developer Portfolio
            </span>
          </div>

          <h1
            style={{
              fontSize: "96px",
              fontWeight: 900,
              margin: 0,
              textAlign: "center",
              letterSpacing: "-0.03em",
              background: "linear-gradient(to bottom, #fff, #999)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Shasbin AS
          </h1>

          <p
            style={{
              fontSize: "42px",
              color: "#0070f3",
              margin: "15px 0 0 0",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Full Stack Developer
          </p>

          <p
            style={{
              fontSize: "24px",
              color: "#888",
              margin: "25px 0 0 0",
              fontWeight: 500,
              letterSpacing: "0.1em",
            }}
          >
            MERN Stack | Next.js | Node.js
          </p>

          <div
            style={{
              marginTop: "50px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(255, 255, 255, 0.05)",
              padding: "10px 24px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#fff",
              fontSize: "20px",
            }}
          >
            <span style={{ opacity: 0.6 }}>github.com/</span>
            <span style={{ fontWeight: 600 }}>shasbinas</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

