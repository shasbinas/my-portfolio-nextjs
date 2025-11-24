"use client";

const PLACEHOLDER_BADGES = [
  {
    title: "Open Source Galaxy",
    platform: "GitHub",
    description: "Replace with your GitHub badge / trophy",
  },
  {
    title: "Contest Crusher",
    platform: "LeetCode",
    description: "Swap in your contest or streak badge",
  },
  {
    title: "API Specialist",
    platform: "GitHub",
    description: "Add a workflow / contribution badge",
  },
  {
    title: "DSA Marathon",
    platform: "LeetCode",
    description: "Paste any LeetCode milestone badge",
  },
];

const BadgeCard = ({
  title,
  platform,
  description,
}: (typeof PLACEHOLDER_BADGES)[number]) => (
  <div className="tilt-card p-5 flex flex-col gap-4">
    <div className="w-full h-48 md:h-56 rounded-2xl border border-dashed border-[hsl(var(--border)/0.6)] bg-gradient-to-br from-[hsl(var(--accent)/0.25)] to-[hsl(var(--accent-secondary)/0.25)] flex items-center justify-center text-xs uppercase tracking-[0.35em] text-muted-foreground font-mono text-center">
      badge image
    </div>
    <div className="space-y-1 text-center md:text-left">
      <p className="text-base font-semibold">{title}</p>
      <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">{platform}</p>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

export default function Achievements() {
  return (
    <section className="py-6 space-y-4" id="achievements">
      <div className="flex flex-col gap-2">
        <h2 className="section-title">achievements.</h2>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Showcase GitHub trophies, LeetCode badges, hackathon recognitions, or certifications.
          Drop your media into any card to keep this reel up to date.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {PLACEHOLDER_BADGES.map((badge) => (
          <BadgeCard key={badge.title} {...badge} />
        ))}
      </div>
    </section>
  );
}

