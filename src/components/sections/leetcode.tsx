"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { SiLeetcode } from "react-icons/si";
import { USER_NAMES, SOCIAL_LINKS } from "@/components/constants/data";

// =============================================
// TYPES & API
// =============================================
interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  ranking: number;
  recentSubmissions?: {
    title: string;
    statusDisplay: string;
    timestamp: string | number;
  }[];
}

const fetchLeetCodeStats = async (
  username: string
): Promise<LeetCodeStats | null> => {
  try {
    const response = await fetch(`https://leetscan.vercel.app/${username}`);
    return await response.json();
  } catch {
    throw new Error("Failed to load LeetCode stats");
  }
};

const formatDate = (timestamp: string | number): string => {
  const date = new Date(Number(timestamp) * 1000);
  return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getFullYear().toString().slice(-2)}`;
};

// =============================================
// COMPONENTS
// =============================================
const StatCard = ({
  label,
  value,
  color = "hsl(var(--foreground))",
}: {
  label: string;
  value: string;
  color?: string;
}) => (
  <div className="tilt-card p-4 flex flex-col gap-1 min-h-[110px]">
    <span className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
      {label}
    </span>
    <span className="text-base font-mono font-semibold" style={{ color }}>
      {value}
    </span>
  </div>
);

export default function LeetCodeCard() {
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLeetCodeStats(USER_NAMES.leetcodeUsername)
      .then(setStats)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (
    !USER_NAMES.leetcodeUsername ||
    USER_NAMES.leetcodeUsername.trim() === ""
  ) {
    return null;
  }

  if (loading) {
    return (
      <section className="py-6">
        <div className="glass-panel text-center text-sm text-muted-foreground animate-pulse">
          Loading LeetCode stats...
        </div>
      </section>
    );
  }

  if (error || !stats) {
    return (
      <section className="py-6">
        <div className="glass-panel text-center text-sm text-red-400">
          {error || "No data found."}
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 space-y-4" id="leetcode">
      <h2 className="section-title w-full">leetcode.</h2>

      <div className="glass-panel hover-lift space-y-5">
        <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
          <Link
            href={SOCIAL_LINKS.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-[hsl(var(--border-hover))]"
          >
            <SiLeetcode className="w-4 h-4 text-yellow-400" />
            {USER_NAMES.leetcodeUsername}
            <MdOutlineArrowOutward className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 w-full">
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                label="Solved"
                value={`${stats.totalSolved} / ${stats.totalQuestions}`}
              />
              <StatCard label="Rank" value={`# ${stats.ranking}`} />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <StatCard
                label="Easy"
                value={`${stats.easySolved} / ${stats.totalEasy}`}
                color="rgb(74 222 128)"
              />
              <StatCard
                label="Medium"
                value={`${stats.mediumSolved} / ${stats.totalMedium}`}
                color="rgb(250 204 21)"
              />
              <StatCard
                label="Hard"
                value={`${stats.hardSolved} / ${stats.totalHard}`}
                color="rgb(248 113 113)"
              />
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <div className="tilt-card p-4 h-full space-y-3">
              <span className="text-sm font-semibold text-foreground block">
                Recent Submissions
              </span>
              <div className="flex flex-col gap-3">
                {stats.recentSubmissions &&
                stats.recentSubmissions.length > 0 ? (
                  stats.recentSubmissions.slice(0, 4).map((sub, idx) => (
                    <div
                      key={idx}
                      className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground border-b border-dashed border-[hsl(var(--border)/0.4)] pb-2 last:border-b-0 last:pb-0"
                    >
                      <span className="font-mono text-foreground flex-1 min-w-[140px]">
                        {sub.title}
                      </span>
                      <span>{sub.statusDisplay}</span>
                      <span>{formatDate(sub.timestamp)}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground">
                    No recent submissions
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
