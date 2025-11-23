export default function GridPattern() {
  return (
    <div
      className="absolute inset-0 z-0 w-full h-full grid-pattern"
      // grid-pattern class is fetched from globals.css
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(128, 128, 128, 0.4) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(128, 128, 128, 0.4) 1px, transparent 1px)
        `,
        backgroundSize: "30px 30px",
      }}
    />
  );
}
