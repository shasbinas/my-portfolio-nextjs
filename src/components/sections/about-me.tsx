"use client";

import Link from "next/link";
import { ABOUT_ME, SOCIAL_LINKS } from "@/components/constants/data";
import { Mail, FileText } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { FaGithub, FaLinkedin } from "react-icons/fa";

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
      <div className="glass-panel hover-lift space-y-6">
        <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
          {ABOUT_ME.description.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="flex gap-3 flex-wrap">
          {SOCIAL_BUTTONS.filter(
            (btn) => btn.href && btn.href.trim() !== ""
          ).map((btn) => {
            const href = btn.href.trim();
            const isExternal = href.startsWith("http");

            const isSpecial =
              href.startsWith("mailto:") || href.startsWith("tel:");

            if (isExternal) {
              return (
                <Link
                  key={btn.label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-foreground/85 tracking-wide transition-all hover-lift ${btn.className || ""}`}
                  style={{ borderColor: "hsl(var(--border) / 0.6)" }}
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
                onClick={(event) =>
                  isSpecial && handleSpecialNavigation(event, href)
                }
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-foreground/85 tracking-wide transition-all hover-lift ${btn.className || ""}`}
                style={{ borderColor: "hsl(var(--border) / 0.6)" }}
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
