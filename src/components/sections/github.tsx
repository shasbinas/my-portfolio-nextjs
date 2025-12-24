"use client";

import GitHubCalendar from "react-github-calendar";
import { useEffect, useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { SiGithub } from "react-icons/si";
import Link from "next/link";
import { USER_NAMES, SOCIAL_LINKS } from "@/components/constants/data";

const useTheme = () => {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const updateTheme = () => {
      setColorScheme(
        document.documentElement.classList.contains("dark") ? "dark" : "light"
      );
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return colorScheme;
};

export default function Github() {
  const colorScheme = useTheme();
  const [stats, setStats] = useState({
    followers: 0,
    stars: 0,
    loading: true,
    error: "",
  });
  const username = USER_NAMES.githubUsername;

  useEffect(() => {
    if (!username) return;

    const controller = new AbortController();

    const fetchStats = async () => {
      try {
        const profilePromise = fetch(
          `https://api.github.com/users/${username}`,
          {
            signal: controller.signal,
          }
        ).then((res) => res.json());

        const gatherStars = async () => {
          let stars = 0;
          let page = 1;
          while (true) {
            const res = await fetch(
              `https://api.github.com/users/${username}/repos?per_page=100&page=${page}`,
              { signal: controller.signal }
            );
            const repos = await res.json();
            if (!Array.isArray(repos) || repos.length === 0) break;
            stars += repos.reduce(
              (sum, repo) => sum + (repo?.stargazers_count || 0),
              0
            );
            if (repos.length < 100) break;
            page += 1;
          }
          return stars;
        };

        const [profile, stars] = await Promise.all([
          profilePromise,
          gatherStars(),
        ]);

        setStats({
          followers: profile?.followers || 0,
          stars,
          loading: false,
          error: "",
        });
      } catch {
        if (controller.signal.aborted) return;
        setStats((prev) => ({
          ...prev,
          loading: false,
          error: "Unable to fetch GitHub stats.",
        }));
      }
    };

    fetchStats();

    return () => controller.abort();
  }, [username]);

  const pillClasses =
    "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.35em] border-red-600/60 bg-red-50 text-orange-600 dark:border-red-400/30 dark:bg-red-500/15 dark:text-orange-400";
  return (
    <section className="py-6 space-y-4" id="github">
      <div className="flex flex-col gap-2">
        <h2 className="section-title">github.</h2>
        <p className="text-sm text-muted-foreground">
          Building in public – contributions, experiments, and playful repos.
        </p>
      </div>

      <div className="glass-panel hover-lift space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-sm font-mono text-muted-foreground">
          <Link
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-[hsl(var(--border-hover))]"
          >
            <SiGithub className="w-4 h-4" />
            {USER_NAMES.githubUsername}
            <MdOutlineArrowOutward className="w-4 h-4" />
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <span className={pillClasses}>activity</span>
            <span className={pillClasses} aria-label="Total followers">
              followers
              <span className="text-sm font-semibold tracking-normal text-blue-600 dark:text-orange-400">
                {stats.loading ? "…" : stats.followers.toLocaleString()}
              </span>
            </span>
            <span className={pillClasses} aria-label="Total stars">
              total stars
              <span className="text-sm font-semibold tracking-normal text-blue-600 dark:text-orange-400">
                {stats.loading ? "…" : stats.stars.toLocaleString()}
              </span>
            </span>
          </div>
        </div>

        {stats.error && (
          <p className="text-xs text-red-400 font-mono">{stats.error}</p>
        )}

        <div
          className="w-full overflow-hidden rounded-2xl border"
          style={{ borderColor: "hsl(var(--border) / 0.4)" }}
        >
          <div className="w-full overflow-x-auto p-4">
            <GitHubCalendar
              username={USER_NAMES.githubUsername}
              blockSize={11}
              blockMargin={4}
              colorScheme={colorScheme}
              fontSize={12}
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
