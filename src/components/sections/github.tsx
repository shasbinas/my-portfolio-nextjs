"use client";

import GitHubCalendar from "react-github-calendar";
import { useEffect, useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { SiGithub } from "react-icons/si";
import Link from "next/link";
import { USER_NAMES, SOCIAL_LINKS } from "@/components/constants/data";

// =============================================
// THEME HOOK
// =============================================
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

// =============================================
// MAIN COMPONENT
// =============================================
export default function Github() {
  const colorScheme = useTheme();

  return (
    <section className="py-5" id="github">
      <h2 className="text-xl font-semibold mb-4">github.</h2>

      {/* GitHub Profile Link */}
      <div className="mb-4 flex items-center gap-2">
        <Link
          href={SOCIAL_LINKS.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link text-sm font-mono font-medium text-muted-foreground transition-colors flex items-center gap-1"
        >
          <SiGithub
            className="inline-block align-middle mr-1 text-muted-foreground"
            size={16}
            style={{ transition: "none" }}
          />
          {USER_NAMES.githubUsername}
          <MdOutlineArrowOutward className="inline-block w-4 h-4 ml-1" />
        </Link>
      </div>

      {/* GitHub Calendar */}
      <div className="w-full overflow-hidden">
        <div className="overflow-x-auto">
          <div className="flex justify-center">
            <GitHubCalendar
              username={USER_NAMES.githubUsername}
              blockSize={8}
              blockMargin={5}
              colorScheme={colorScheme}
              fontSize={12}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
