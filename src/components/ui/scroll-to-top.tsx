"use client";
import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setIsVisible(scrollTop > 100);
      setScrollProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-[opacity,transform] duration-300 ease-in-out ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        className="relative w-8 h-8 bg-accent rounded-full shadow-md transition-[background-color,box-shadow,transform] duration-300 hover:shadow-lg hover:scale-110 group"
        aria-label="Scroll to top"
      >
        {/* Progress Circle */}
        <svg
          className="absolute inset-0 w-8 h-8 -rotate-90"
          viewBox="0 0 48 48"
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="hsl(var(--background))"
            strokeWidth="3"
            opacity="0.3"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="hsl(var(--background))"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={125.66}
            className="transition-[stroke-dashoffset] duration-150"
            strokeDashoffset={125.66 * (1 - scrollProgress / 100)}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <FaArrowUp
            size={12}
            color="hsl(var(--background))"
            className="transition-transform duration-300 group-hover:-translate-y-0.5"
          />
        </div>
      </button>
    </div>
  );
}
