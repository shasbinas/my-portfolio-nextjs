"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MdVerified } from "react-icons/md";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { ABOUT_ME } from "@/components/constants/data";

// =============================================
// TYPE DEFINITIONS
// =============================================
interface ProfileImageProps {
  isHovering: boolean;
  setIsHovering: (hovering: boolean) => void;
}

interface VerifiedBadgeProps {
  showTooltip: boolean;
  setShowTooltip: (show: boolean) => void;
}

interface LocationTimeProps {
  currentTime: string;
}

// =============================================
// CUSTOM HOOKS
// =============================================
const useISTTime = () => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const timeString = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return currentTime;
};

// =============================================
// UI COMPONENTS
// =============================================
const ProfileImage = ({ isHovering, setIsHovering }: ProfileImageProps) => (
  <div className="flex-shrink-0 relative">
    <div
      className="w-28 h-28 rounded-3xl overflow-hidden border border-border cursor-pointer duration-300 hover-lift"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering ? (
        <Image
          src={ABOUT_ME.profileGif}
          alt="Profile GIF"
          width={112}
          height={112}
          className="w-full h-full object-cover"
          unoptimized
        />
      ) : (
        <Image
          src={ABOUT_ME.profileImage}
          alt={ABOUT_ME.name}
          width={112}
          height={112}
          className="w-full h-full object-cover"
          priority
        />
      )}
    </div>
    <span className="absolute -inset-3 blur-2xl bg-gradient-to-br from-[hsl(var(--accent)/0.45)] to-[hsl(var(--accent-secondary)/0.35)] opacity-60 pointer-events-none"></span>
  </div>
);

const VerifiedBadge = ({ showTooltip, setShowTooltip }: VerifiedBadgeProps) => (
  <div
    className="relative"
    onMouseEnter={() => setShowTooltip(true)}
    onMouseLeave={() => setShowTooltip(false)}
  >
    <button
      type="button"
      className="inline-flex items-center gap-1 rounded-full border border-blue-400/70 bg-blue-600/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-lg transition-all hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
      aria-pressed="true"
    >
      <MdVerified className="w-4 h-4 text-white" />
      verified
    </button>
    {showTooltip && (
      <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-black/90 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap shadow-2xl border border-border">
        npm verified · human@latest
      </div>
    )}
  </div>
);

const LocationTime = ({ currentTime }: LocationTimeProps) => (
  <div className="hidden md:flex flex-col items-end gap-2 text-right text-sm">
    <div className="contact-card flex items-center gap-2 text-muted-foreground">
      <FaLocationCrosshairs className="w-4 h-4 text-[hsl(var(--border-hover))]" />
      <span className="font-mono uppercase tracking-wide">{ABOUT_ME.location}</span>
    </div>
    <div className="contact-card font-mono text-foreground">
      {currentTime ? `${currentTime} IST` : "Loading IST..."}
    </div>
    <span className="text-xs text-muted-foreground">Asia/Kolkata · UTC+05:30</span>
  </div>
);


// =============================================
// MAIN COMPONENT
// =============================================
const Header = () => {
  const currentTime = useISTTime();
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  return (
    <section className="pt-4">
      <div className="glass-panel hover-lift space-y-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <ProfileImage isHovering={isHovering} setIsHovering={setIsHovering} />

          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-tight">
                {ABOUT_ME.name}
              </h1>
              <VerifiedBadge
                showTooltip={showTooltip}
                setShowTooltip={setShowTooltip}
              />
            </div>
            <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
              {ABOUT_ME.title}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
              {ABOUT_ME.description[0]}
            </p>
          </div>

          <LocationTime currentTime={currentTime} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div className="contact-card">
            <p className="text-blue-500 uppercase tracking-[0.3em] text-[0.6rem] mb-1">
              availability
            </p>
            <p className="font-semibold">
              Open to remote collabs · 9:00 AM - 7:00 PM IST
            </p>
          </div>
          <div className="contact-card">
            <p className="text-blue-500 uppercase tracking-[0.3em] text-[0.6rem] mb-1">
              speciality
            </p>
            <p className="font-semibold">Backend systems & secure APIs</p>
          </div>
          <div className="contact-card">
            <p className="text-blue-500 uppercase tracking-[0.3em] text-[0.6rem] mb-1">
              timezone
            </p>
            <p className="font-semibold">
              {currentTime ? `${currentTime} IST` : "Loading IST..."}
            </p>
            <p className="text-xs text-muted-foreground">Asia/Kolkata · UTC+05:30</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
