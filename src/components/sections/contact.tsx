"use client";

import { useState, MouseEvent } from "react";
import {
  Mail,
  Github,
  Linkedin,
  Phone,
  Instagram,
  Copy,
  Check,
} from "lucide-react";
import { SiLeetcode, SiWhatsapp } from "react-icons/si";
import { ABOUT_ME, SOCIAL_LINKS } from "../constants/data";

type ContactLink = {
  label: string;
  value: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
};

const Contact = () => {
  const emailAddress =
    SOCIAL_LINKS.email?.replace("mailto:", "") || ABOUT_ME.email;
  const emailHref =
    SOCIAL_LINKS.email && SOCIAL_LINKS.email.trim() !== ""
      ? SOCIAL_LINKS.email.trim()
      : `mailto:${ABOUT_ME.email}`;
  const [copied, setCopied] = useState(false);
  const whatsappLink = SOCIAL_LINKS.whatsapp;

  const contactLinks: ContactLink[] = [
    {
      label: "Email",
      value: emailAddress,
      href: SOCIAL_LINKS.email,
      icon: Mail,
    },
    SOCIAL_LINKS.github && {
      label: "GitHub",
      value: SOCIAL_LINKS.github.replace("https://", ""),
      href: SOCIAL_LINKS.github,
      icon: Github,
    },
    SOCIAL_LINKS.linkedin && {
      label: "LinkedIn",
      value: SOCIAL_LINKS.linkedin.replace("https://", ""),
      href: SOCIAL_LINKS.linkedin,
      icon: Linkedin,
    },
    SOCIAL_LINKS.leetcode && {
      label: "LeetCode",
      value: SOCIAL_LINKS.leetcode.replace("https://", ""),
      href: SOCIAL_LINKS.leetcode,
      icon: SiLeetcode,
    },
    SOCIAL_LINKS.phone && {
      label: "Phone",
      value: SOCIAL_LINKS.phone,
      href: `tel:${SOCIAL_LINKS.phone.replace(/\s+/g, "")}`,
      icon: Phone,
    },
    SOCIAL_LINKS.instagram && {
      label: "Instagram",
      value: SOCIAL_LINKS.instagram.replace("https://", ""),
      href: SOCIAL_LINKS.instagram,
      icon: Instagram,
    },
  ].filter(Boolean) as ContactLink[];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // no-op
    }
  };

  const handleOpenWhatsApp = () => {
    if (whatsappLink) {
      window.open(whatsappLink, "_blank", "noopener,noreferrer");
    }
  };

  const handleSpecialNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
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

  return (
    <section className="py-6 space-y-4">
      <h2 className="section-title w-full">let&apos;s connect.</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel p-6 space-y-6">
          <div>
            <p className="text-xl font-semibold">Let&apos;s Connect</p>
            <p className="text-sm text-muted-foreground">
              I&apos;m always open to new opportunities, freelance gigs, or a
              quick coffee chat about ideas.
            </p>
          </div>

          <div className="space-y-3">
            {contactLinks.map((item) => {
              const Icon = item.icon;
              const content = (
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[hsl(var(--accent)/0.15)] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      {item.label}
                    </p>
                    <p className="text-sm font-mono text-foreground break-all">
                      {item.value}
                    </p>
                  </div>
                </div>
              );

              if (item.href) {
                const isMailLink = item.href.startsWith("mailto:");
                const isExternal = item.href.startsWith("http");
                if (isMailLink) {
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(event) =>
                        handleSpecialNavigation(event, item.href!)
                      }
                      className="flex items-center gap-4 rounded-2xl border border-transparent bg-[hsl(var(--background)/0.4)]/50 px-4 py-3 text-left transition-colors hover:border-[hsl(var(--border)/0.6)]"
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 rounded-2xl border border-transparent bg-[hsl(var(--background)/0.4)]/50 px-4 py-3 transition-colors hover:border-[hsl(var(--border)/0.6)]"
                  >
                    {content}
                  </a>
                );
              }

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-4 rounded-2xl border border-transparent bg-[hsl(var(--background)/0.4)]/50 px-4 py-3"
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass-panel p-6 space-y-4">
          <div>
            <p className="text-xl font-semibold">Get In Touch</p>
            <p className="text-sm text-muted-foreground">
              Choose your preferred way to reach me.
            </p>
          </div>

          <div className="rounded-2xl border border-[hsl(var(--border)/0.35)] p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[hsl(var(--accent)/0.15)] flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Email Me</p>
                <p className="text-xs text-muted-foreground">
                  Send me an email directly.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="relative px-4 py-3 rounded-xl border border-[hsl(var(--border)/0.35)] bg-[hsl(var(--background)/0.6)] text-sm font-mono flex items-center justify-between gap-3">
                <span className="truncate">{emailAddress}</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1 text-xs font-semibold rounded-lg px-3 py-1.5 bg-[hsl(var(--accent))] text-[hsl(var(--background))]"
                >
                  {copied ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <a
                href={emailHref}
                onClick={(event) => handleSpecialNavigation(event, emailHref)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[hsl(var(--accent))] text-[hsl(var(--background))] text-sm font-semibold py-3 transition hover:bg-[hsl(var(--accent)/0.9)]"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-[hsl(var(--border)/0.35)] p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center">
                <SiWhatsapp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">WhatsApp</p>
                <p className="text-xs text-muted-foreground">
                  Chat with me instantly.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleOpenWhatsApp}
              disabled={!whatsappLink}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 text-white text-sm font-semibold py-3 transition hover:bg-green-400 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <SiWhatsapp className="w-4 h-4" />
              Open WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
