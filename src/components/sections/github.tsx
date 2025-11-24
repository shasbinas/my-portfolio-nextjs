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

  return (
    <section className="py-6 space-y-4" id="github">
      <div className="flex flex-col gap-2">
        <h2 className="section-title">github.</h2>
        <p className="text-sm text-muted-foreground">
          Building in public – contributions, experiments, and playful repos.
        </p>
      </div>

      <div className="glass-panel hover-lift space-y-4">
        <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
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
          <span className="px-3 py-1 rounded-full border text-[0.65rem] uppercase tracking-[0.3em]" style={{ borderColor: "hsl(var(--border) / 0.5)" }}>
            activity
          </span>
        </div>

        <div
          className="w-full overflow-hidden rounded-2xl border"
          style={{ borderColor: "hsl(var(--border) / 0.4)" }}
        >
          <div className="w-full overflow-x-auto p-4">
            <GitHubCalendar
              username={USER_NAMES.githubUsername}
              blockSize={14}
              blockMargin={5}
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
