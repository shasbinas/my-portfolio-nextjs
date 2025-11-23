
import { ImageResponse } from "next/og";
import { ABOUT_ME, SOCIAL_LINKS } from "../components/constants/data";


export const runtime = "edge";
export const alt = `${ABOUT_ME.name} - Portfolio Website`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
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
          background: "#111",
        }}
      >
        <h1 style={{ fontSize: 64, color: "#fff", fontWeight: 700, margin: 0 }}>{ABOUT_ME.name}</h1>
        <p style={{ fontSize: 32, color: "#bbb", margin: "16px 0 0 0" }}>{ABOUT_ME.title}</p>
        <p style={{ fontSize: 24, color: "#888", margin: "32px 0 0 0" }}>{SOCIAL_LINKS.github.replace("https://github.com/", "github.com/")}</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
