import Link from "next/link";
import { ABOUT_ME, SOCIAL_LINKS } from "@/components/constants/data";
import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { SiLeetcode, SiPeerlist } from "react-icons/si";
import { FaBlog } from "react-icons/fa";

// =============================================
// SOCIAL BUTTONS DATA
// =============================================
const SOCIAL_BUTTONS = [
  {
    href: SOCIAL_LINKS.github,
    label: "GitHub",
    icon: <Github className="w-5 h-5" />,
  },
  {
    href: SOCIAL_LINKS.linkedin,
    label: "LinkedIn",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    href: SOCIAL_LINKS.twitter,
    label: "X (Twitter)",
    icon: <FaXTwitter className="w-5 h-5" />,
  },
  {
    href: SOCIAL_LINKS.leetcode,
    label: "LeetCode",
    icon: <SiLeetcode className="w-5 h-5" />,
  },
  {
    href: SOCIAL_LINKS.peerlist,
    label: "Peerlist",
    icon: <SiPeerlist className="w-5 h-5" />,
  },
  {
    href: SOCIAL_LINKS.instagram,
    label: "Instagram",
    icon: <FaInstagram className="w-5 h-5" />,
  },
  {
    href: SOCIAL_LINKS.blog,
    label: "Blog",
    icon: (
      <>
        <FaBlog className="w-5 h-5" /> Blog
      </>
    ),
    className: "flex items-center gap-2 font-medium",
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

// =============================================
// MAIN COMPONENT
// =============================================
export default function AboutMe() {
  return (
    <section className="pb-10">
      <div className="mb-8">
        {ABOUT_ME.description.map((para, i) => (
          <p
            key={i}
            className="mb-4 text-[15px] sm:text-base text-muted-foreground text-justify"
          >
            {para}
          </p>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap">
        {SOCIAL_BUTTONS.filter((btn) => btn.href && btn.href.trim() !== "").map((btn) => (
          <Link
            key={btn.label}
            href={btn.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-3 py-2 rounded-lg btn text-sm hover:scale-95 transition-transform ${btn.className || ""}`}
            aria-label={btn.label}
          >
            {btn.icon}
          </Link>
        ))}
      </div>
    </section>
  );
}
