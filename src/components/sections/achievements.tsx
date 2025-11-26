"use client";

const PLACEHOLDER_BADGES = [
  {
    title: "GitHub Foundations",
    platform: "GitHub",
    description: "GitHub Foundations certification",
    imagePath: "https://images.credly.com/images/024d0122-724d-4c5a-bd83-cfe3c4b7a073/image.png"
  },
  {
    title: "50 Days Badge",
    platform: "LeetCode",
    description: "Solved problems for 50 consecutive days",
    imagePath: "https://assets.leetcode.com/static_assets/marketing/2024-50.gif"
  },
  {
    title: "100 Days Badge",
    platform: "LeetCode",
    description: "Solved problems for 100 consecutive days",
    imagePath: "https://assets.leetcode.com/static_assets/marketing/2024-100.gif"
  },
  {
    title: "Pull Shark",
    platform: "GitHub",
    description: "Opened pull requests that have been merged",
    imagePath: "https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png"
  },
  {
    title: "Quickdraw",
    platform: "GitHub",
    description: "Closed an issue or pull request within 5 minutes",
    imagePath: "https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png"
  },
  {
    title: "YOLO",
    platform: "GitHub",
    description: "Merged a pull request without code review",
    imagePath: "https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png"
  },
  {
    title: "Starstruck",
    platform: "GitHub",
    description: "Created a repository that has 16+ stars",
    imagePath: "https://github.githubassets.com/images/modules/profile/achievements/starstruck-default.png"
  },
  {
    title: "Pair Extraordinaire",
    platform: "GitHub",
    description: "Co-authored commits on merged pull requests",
    imagePath: "https://github.githubassets.com/images/modules/profile/achievements/pair-extraordinaire-default.png"
  },
];

const BadgeCard = ({
  title,
  platform,
  description,
  imagePath,
}: (typeof PLACEHOLDER_BADGES)[number]) => (
  <div className="tilt-card p-4 flex flex-col gap-3">
    <div className="w-full h-32 md:h-40 rounded-2xl border border-dashed border-[hsl(var(--border)/0.6)] bg-gradient-to-br from-[hsl(var(--accent)/0.25)] to-[hsl(var(--accent-secondary)/0.25)] flex items-center justify-center overflow-hidden">
      {imagePath ? (
        <img 
          src={imagePath} 
          alt={title}
          className="max-w-full max-h-full object-contain p-3"
        />
      ) : (
        <span className="text-xs uppercase tracking-[0.35em] text-muted-foreground font-mono text-center">
          Badge Image
        </span>
      )}
    </div>
    <div className="space-y-1 text-center">
      <p className="text-sm font-semibold">{title}</p>
      <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">{platform}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
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