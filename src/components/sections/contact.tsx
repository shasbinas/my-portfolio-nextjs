"use client";

import { User, Mail } from "lucide-react";
import { FaRegCommentDots, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import Link from "next/link";
import { useState, ChangeEvent, FormEvent, ComponentType } from "react";
import { FORM_ENDPOINT } from "../constants/data";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormField {
  name: keyof FormData;
  type: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  placeholder: string;
  rows?: number;
}

type FormStatus = "idle" | "submitting" | "success" | "error";
type SetStateFunction<T> = (value: T | ((prev: T) => T)) => void;

const FORM_CONFIG = {
  endpoint: FORM_ENDPOINT,
  initialData: { name: "", email: "", message: "" } as FormData,
  fields: [
    {
      name: "name",
      type: "text",
      label: "Name",
      icon: User,
      placeholder: "Your name",
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      icon: Mail,
      placeholder: "your.email@example.com",
    },
    {
      name: "message",
      type: "textarea",
      label: "Message",
      icon: FaRegCommentDots,
      placeholder: "What would you like to discuss?",
      rows: 4,
    },
  ] as FormField[],
};

// API Submit
const submitForm = async (
  formData: FormData,
  setStatus: SetStateFunction<FormStatus>,
  setErrorMessage: SetStateFunction<string>,
  setFormData: SetStateFunction<FormData>
) => {
  setStatus("submitting");
  setErrorMessage("");

  try {
    const response = await fetch(FORM_CONFIG.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setStatus("success");
      setFormData(FORM_CONFIG.initialData);
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.error || "Something went wrong. Please try again.");
      setStatus("error");
    }
  } catch {
    setErrorMessage("An unexpected error occurred. Please try again.");
    setStatus("error");
  }
};

const renderField = (
  field: FormField,
  formData: FormData,
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
) => {
  const Icon = field.icon;
  const commonClasses =
    "w-full bg-background/60 pl-11 pr-4 py-3 rounded-xl border border-border/50 backdrop-blur-md shadow-sm text-foreground placeholder:text-muted-foreground transition focus:ring-2 focus:ring-primary focus:outline-none";

  return (
    <div key={field.name} className="space-y-1">
      <label htmlFor={field.name} className="block text-sm font-medium text-muted-foreground">
        {field.label}
      </label>

      <div className="relative">
        <Icon className="w-5 h-5 absolute left-3 top-3 text-muted-foreground" />

        {field.type === "textarea" ? (
          <textarea
            id={field.name}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            required
            placeholder={field.placeholder}
            rows={field.rows}
            className={`${commonClasses} resize-none`}
          />
        ) : (
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formData[field.name]}
            onChange={handleChange}
            required
            placeholder={field.placeholder}
            className={commonClasses}
          />
        )}
      </div>
    </div>
  );
};

const Contact = () => {
  const emailAddress =
    SOCIAL_LINKS.email?.replace("mailto:", "") || ABOUT_ME.email;
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

  return (
<<<<<<< HEAD
    <section className="py-6 space-y-4">
      <h2 className="section-title">let&apos;s connect.</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel p-6 space-y-6">
          <div>
            <p className="text-xl font-semibold">Let&apos;s Connect</p>
            <p className="text-sm text-muted-foreground">
              I&apos;m always open to new opportunities, freelance gigs, or a quick
              coffee chat about ideas.
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
                    <p className="text-sm font-medium break-all">{item.value}</p>
                  </div>
                </div>
              );

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 rounded-2xl border border-transparent bg-[hsl(var(--background)/0.4)]/50 px-4 py-3 transition-colors hover:border-[hsl(var(--border)/0.6)]"
                >
                  {content}
                </a>
              ) : (
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
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
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
=======
    <section className="py-8 space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Let's Connect</h2>
      <p className="text-muted-foreground text-sm">Choose your preferred way to contact me.</p>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Card 1 */}
        <div className="p-5 rounded-2xl bg-card/70 backdrop-blur-md border border-border/40 shadow-md transition hover:shadow-lg hover:bg-card/80">
          <h3 className="font-semibold text-sm mb-3">Profiles & Links</h3>

          <div className="space-y-3 text-sm">
            <Link href="https://github.com/shasbinas" target="_blank" className="premium-link">
              <FaGithub className="icon" /> GitHub
            </Link>

            <Link href="https://linkedin.com" target="_blank" className="premium-link">
              <FaLinkedin className="icon" /> LinkedIn
            </Link>

            <Link href="https://leetcode.com/u/shasbinas/" target="_blank" className="premium-link">
              <SiLeetcode className="icon" /> LeetCode
            </Link>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-2xl bg-card/70 backdrop-blur-md border border-border/40 shadow-md transition hover:shadow-lg hover:bg-card/80">
          <h3 className="font-semibold text-sm mb-3">Get in Touch</h3>

          <div className="space-y-3 text-sm">
            <Link href="https://wa.me/919746998909" target="_blank" className="premium-link">
              <FaWhatsapp className="icon" /> WhatsApp
            </Link>

            <Link href="mailto:shasbinas1@gmail.com" className="premium-link">
              <Mail className="icon" /> Send Email
            </Link>
>>>>>>> 6909741a9b33fa9cf85e3e87ee07c89ad3e988f0
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .premium-link {
          display: flex;
          gap: 8px;
          align-items: center;
          padding: 8px 10px;
          border-radius: 10px;
          transition: 0.25s ease;
        }
        .premium-link:hover {
          background: rgba(255,255,255,0.08);
          transform: translateX(3px);
        }
        .icon {
          width: 18px;
          height: 18px;
        }
      `}</style>
    </section>
  );
};

export default Contact;
