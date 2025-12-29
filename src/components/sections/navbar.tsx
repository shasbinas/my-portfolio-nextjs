"use client";

import { useState, useEffect } from "react";
import ScrollLink from "../ScrollLink";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ABOUT_ME } from "../constants/data";
import ThemeToggle from "../ui/theme-toggle";

const STAGGER = 30; // Delay between each letter in milliseconds

// Navigation items with their respective href values
const navItems = [
  { name: "Skills", href: "#skills" },
  { name: "Github", href: "#github" },
  { name: "Leetcode", href: "#leetcode" },
  { name: "Projects", href: "#projects" },
  { name: "Achievements", href: "#achievements" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Handle scroll to detect when to make navbar sticky
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section using IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);



  return (
    <>
      <nav
        className={`fixed top-2 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-6xl rounded-2xl transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 dark:bg-background/80 backdrop-blur-md outline outline-1 outline-[hsl(var(--link))]"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between h-12 px-4">
          {/* Logo/Brand link */}
          <ScrollLink
            href="/"
            className="text-lg font-semibold text-foreground cursor-pointer"
          >
            {ABOUT_ME.name?.split(" ")[0]}.
          </ScrollLink>

          {/* Desktop navigation menu */}
          <div className="hidden lg:flex space-x-5 items-center relative">
            {navItems.map((item) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;

              return (
                <ScrollLink
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="relative block w-fit leading-[1.5] py-1 text-sm text-foreground/80 cursor-pointer group nav-link hover:text-[hsl(var(--link))] hover:scale-105 transition-transform"
                >
                  {/* Container for letter animations */}
                  <span className="relative inline-block">
                    {item.name.split("").map((letter, i) => (
                      <span
                        key={i}
                        className="relative inline-block overflow-hidden"
                      >
                        {/* Original letter that slides up on hover */}
                        <span
                          className="block transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-full group-hover:opacity-80"
                          style={{
                            transitionDelay: `${i * STAGGER}ms`,
                          }}
                        >
                          {letter}
                        </span>

                        {/* Duplicate letter that slides down from above on hover WITH LINK COLOR */}
                        <span
                          className="block absolute left-0 top-0 font-medium translate-y-full opacity-0 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-0 group-hover:opacity-100"
                          style={{
                            transitionDelay: `${i * STAGGER}ms`,
                            color: "hsl(var(--link))",
                          }}
                        >
                          {letter}
                        </span>
                      </span>
                    ))}
                  </span>

                  {/* Active section underline indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute -bottom-1 left-0 w-full h-[2px] bg-[hsl(var(--link))]"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 20,
                      }}
                    />
                  )}
                </ScrollLink>
              );
            })}

            <ThemeToggle />

            {/* Request a Project button */}
            <ScrollLink
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors"
            >
              Request a Project
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </ScrollLink>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg bg-foreground/10 hover:bg-foreground/20 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-background/95 dark:bg-background/95 rounded-b-xl shadow-lg border-t border-border">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navItems.map((item) => {
                const sectionId = item.href.substring(1);
                const isActive = activeSection === sectionId;

                return (
                  <ScrollLink
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                    className={`block px-3 py-2 rounded-md text-sm text-center text-foreground/80 hover:bg-foreground/10 transition-colors capitalize ${
                      isActive ? "text-[hsl(var(--link))] font-medium" : ""
                    }`}
                  >
                    {item.name}
                  </ScrollLink>
                );
              })}
              <ScrollLink
                href="#contact"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors mt-2"
              >
                Request a Project
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </ScrollLink>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
