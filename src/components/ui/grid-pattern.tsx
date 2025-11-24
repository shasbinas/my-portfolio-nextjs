export default function GridPattern() {
  return (
    <div
      className="absolute inset-0 z-0 w-full h-full grid-pattern pointer-events-none"
      style={{
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(74, 222, 128, 0.2), transparent 40%),
          radial-gradient(circle at 80% 10%, rgba(192, 132, 252, 0.18), transparent 45%),
          linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: "auto, auto, 60px 60px, 60px 60px",
        mixBlendMode: "screen",
      }}
    />
  );
}
