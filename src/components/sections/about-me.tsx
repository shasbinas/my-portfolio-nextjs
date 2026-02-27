"use client";

import Link from "next/link";
import { ABOUT_ME, SOCIAL_LINKS } from "@/components/constants/data";
import { Mail, FileText } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { AboutTerminal } from "../ui/AboutTerminal";
import { TerminalWindow } from "../ui/TerminalWindow";

// =============================================
// SOCIAL BUTTONS DATA
// =============================================
const SOCIAL_BUTTONS = [
  {
    href: SOCIAL_LINKS.github,
    label: "GitHub",
    icon: <FaGithub className="w-5 h-5" />,
  },
  {
    href: SOCIAL_LINKS.linkedin,
    label: "LinkedIn",
    icon: <FaLinkedin className="w-5 h-5" />,
  },
  {
    href: SOCIAL_LINKS.leetcode,
    label: "LeetCode",
    icon: <SiLeetcode className="w-5 h-5" />,
  },
  {
    href: SOCIAL_LINKS.resume,
    label: "Resume",
    icon: (
      <>
        <FileText className="w-5 h-5" /> Resume
      </>
    ),
    className: "flex items-center gap-2 font-medium",
  },
  {
    href: SOCIAL_LINKS.email,
    label: "Email",
    icon: (
      <>
        <Mail className="w-5 h-5" /> Email
      </>
    ),
    className: "flex items-center gap-2 font-medium",
  },
];

const handleSpecialNavigation = (
  event: React.MouseEvent<HTMLAnchorElement>,
  href: string
) => {
  if (!href) return;
  const trimmed = href.trim();
  if (
    typeof window !== "undefined" &&
    (trimmed.startsWith("mailto:") || trimmed.startsWith("tel:"))
  ) {
    event.preventDefault();
    window.location.href = trimmed;
  }
};

// =============================================
// MAIN COMPONENT
// =============================================
export default function AboutMe() {
  return (
    <section className="pb-6">
      {/* Section Header - Synced with Technical Skills */}
      <div className="mb-8">
        <h2 className="section-title w-full">about.</h2>
      </div>

      <div className="glass-panel hover-lift space-y-5">
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12 w-full">
          {/* Left Side: Interactive Terminal */}
          <div 
            className="flex flex-col gap-3"
            style={{ flex: 1, minWidth: 0 }}
          >
            <div className="flex items-center gap-2 px-1 text-[11px] sm:text-xs font-bold animate-pulse tracking-wide shrink-0">
              <span className="text-[#ff2cf1] dark:text-[#ff2cf1] font-extrabold uppercase tracking-widest">Try me!</span>
              <span className="text-muted-foreground/60 font-medium">click & type</span>
              <span className="text-[#ff2cf1]/60">↓</span>
            </div>
            <div className="flex-1 flex flex-col min-h-[400px] min-w-0">
              <TerminalWindow />
            </div>
          </div>

        {/* Right Side: Bio Terminal */}
        <div 
          className="flex flex-col gap-3"
          style={{ flex: 1, minWidth: 0 }}
        >
          <div className="hidden lg:block h-[18px] shrink-0" aria-hidden="true"></div>
          <div className="flex-1 flex flex-col min-h-[400px] min-w-0">
            <AboutTerminal />
          </div>
        </div>
      </div>

      {/* Social Buttons - Moved to Bottom & Styled to Match Reference */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:justify-start">
        {SOCIAL_BUTTONS.filter(
          (btn) => btn.href && btn.href.trim() !== ""
        ).map((btn) => {
          const href = btn.href.trim();
          const isExternal = href.startsWith("http");
          const isSpecial = href.startsWith("mailto:") || href.startsWith("tel:");
          
          // Style based on icon type (circular for icons, pill for text)
          const isPill = btn.label === "Resume" || btn.label === "Email";
          
          const baseStyles = "flex items-center justify-center bg-muted/60 dark:bg-white/5 text-muted-foreground hover:bg-accent/10 hover:text-accent dark:hover:bg-white/10 dark:hover:text-white transition-all duration-300 shadow-lg border border-border/50 dark:border-white/5";
          const finalStyles = isPill 
            ? `${baseStyles} px-6 py-2.5 rounded-xl text-sm font-semibold gap-3`
            : `${baseStyles} w-12 h-12 rounded-full`;

          if (isExternal) {
            return (
              <Link
                key={btn.label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={finalStyles}
                aria-label={btn.label}
              >
                {btn.icon}
              </Link>
            );
          }

          return (
            <a
              key={btn.label}
              href={href}
              onClick={(event) => isSpecial && handleSpecialNavigation(event, href)}
              className={finalStyles}
              aria-label={btn.label}
            >
              {btn.icon}
            </a>
          );
        })}
      </div>
      </div>
    </section>
  );
}
