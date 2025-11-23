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
        hour12: false,
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
  <div className="flex-shrink-0">
    <div
      className="w-24 h-24 rounded-full overflow-hidden border-4 border-border cursor-pointer duration-200"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering ? (
        <Image
          src={ABOUT_ME.profileGif}
          alt="Profile GIF"
          width={96}
          height={96}
          className="w-full h-full object-cover"
          unoptimized
        />
      ) : (
        <Image
          src={ABOUT_ME.profileImage}
          alt={ABOUT_ME.name}
          width={96}
          height={96}
          className="w-full h-full object-cover"
          priority
        />
      )}
    </div>
  </div>
);

const VerifiedBadge = ({ showTooltip, setShowTooltip }: VerifiedBadgeProps) => (
  <div
    className="relative"
    onMouseEnter={() => setShowTooltip(true)}
    onMouseLeave={() => setShowTooltip(false)}
  >
    <MdVerified className="w-6 h-6 cursor-pointer" />
    {showTooltip && (
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white text-black text-sm px-2 py-1 rounded-lg whitespace-nowrap z-10 shadow-lg">
        npm verified: human@latest
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black dark:border-t-white"></div>
      </div>
    )}
  </div>
);

const LocationTime = ({ currentTime }: LocationTimeProps) => (
  <div className="hidden md:block text-base text-muted-foreground space-y-1 text-right">
    <div className="flex items-center gap-2 justify-end">
      <FaLocationCrosshairs className="w-4 h-4" />
      <span className="font-mono">{ABOUT_ME.location}</span>
    </div>
    <div className="font-mono">{currentTime} IST</div>
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
    <section className="pt-5">
      <div className="flex items-center gap-4 mb-4">
        <ProfileImage isHovering={isHovering} setIsHovering={setIsHovering} />

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">
              {ABOUT_ME.name}
            </h1>
            <VerifiedBadge
              showTooltip={showTooltip}
              setShowTooltip={setShowTooltip}
            />
          </div>
          <p className="text-base text-muted-foreground font-medium">
            {ABOUT_ME.title}
          </p>
        </div>

        <LocationTime currentTime={currentTime} />
      </div>
    </section>
  );
};

export default Header;
