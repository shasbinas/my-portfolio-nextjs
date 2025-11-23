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
  color = "text-foreground",
}: {
  label: string;
  value: string;
  color?: string;
}) => (
  <div className="box bg-background border border-border flex flex-col items-center justify-center p-2">
    <span className={`font-bold text-sm ${color}`}>{label}</span>
    <span className="text-sm text-foreground font-mono font-bold">{value}</span>
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

  if (!USER_NAMES.leetcodeUsername || USER_NAMES.leetcodeUsername.trim() === "") {
    return null;
  }

  // Loading and error states
  if (loading) {
    return (
      <div className="text-center py-8 text-lg text-gray-500 animate-pulse">
        Loading LeetCode stats...
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="text-red-500 text-center py-8">
        {error || "No data found."}
      </div>
    );
  }

  return (
    <section className="py-5" id="leetcode">
      <h2 className="text-xl font-semibold mb-4">leetcode.</h2>

      {/* LeetCode Profile Link */}
      <div className="mb-4 flex items-center gap-2">
        <Link
          href={SOCIAL_LINKS.leetcode}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link text-sm font-mono font-medium text-muted-foreground transition-colors flex items-center gap-1"
        >
          <SiLeetcode
            className="inline-block align-middle mr-1 text-yellow-500"
            size={16}
          />
          {USER_NAMES.leetcodeUsername}
          <MdOutlineArrowOutward className="inline-block w-4 h-4 ml-1" />
        </Link>
      </div>

      {/* LeetCode Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 max-w-5xl w-full">
        {/* Stats Overview */}
        <div className="lg:col-span-3 w-full flex flex-col gap-4 pl-0 lg:pl-2">
          <div className="grid grid-cols-2 gap-3 w-full">
            <StatCard
              label="Solved"
              value={`${stats.totalSolved} / ${stats.totalQuestions}`}
            />
            <StatCard label="Rank" value={`# ${stats.ranking}`} />
          </div>
          <div className="grid grid-cols-3 gap-3 w-full">
            <StatCard
              label="Easy"
              value={`${stats.easySolved} / ${stats.totalEasy}`}
              color="text-green-600"
            />
            <StatCard
              label="Medium"
              value={`${stats.mediumSolved} / ${stats.totalMedium}`}
              color="text-yellow-500"
            />
            <StatCard
              label="Hard"
              value={`${stats.hardSolved} / ${stats.totalHard}`}
              color="text-red-500"
            />
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="lg:col-span-2 w-full flex flex-col h-full pr-0 lg:pr-2">
          <div className="box bg-background border border-border rounded-lg px-4 py-2 flex flex-col h-full justify-start">
            <span className="text-foreground font-semibold text-sm mb-2 block">
              Recent Submissions
            </span>
            <div className="flex flex-col gap-2">
              {stats.recentSubmissions && stats.recentSubmissions.length > 0 ? (
                stats.recentSubmissions.slice(0, 4).map((sub, idx) => (
                  <div
                    key={idx}
                    className="flex flex-row items-center justify-between w-full gap-2 min-w-0"
                  >
                    <span className="font-mono text-xs text-foreground truncate whitespace-nowrap flex-1">
                      {sub.title}
                    </span>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {sub.statusDisplay}
                    </span>
                    <span className="text-xs text-muted-foreground flex-shrink-0">
                      {formatDate(sub.timestamp)}
                    </span>
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
    </section>
  );
}
