"use client";
import Link from "next/link";
import { ABOUT_ME } from "../constants/data";
import ThemeToggle from "../ui/theme-toggle";

const STAGGER = 30; // Delay between each letter in milliseconds

// Navigation items with their respective href values
const navItems = [
  { name: "skills", href: "#skills" },
  { name: "projects", href: "#projects" },
  { name: "blog", href: "#blog" },
  { name: "contact", href: "#contact" },
];

export default function Navbar() {
  // Handle smooth scroll to section when nav link is clicked
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.getElementById(href.substring(1)); // Remove '#' from href
    if (element) element.scrollIntoView({ behavior: "instant" });
  };

  return (
    <nav className="py-5 sm:py-10">
      <div className="flex items-center justify-between">
        {/* Logo/Brand link */}
        <Link href="/" className="text-lg font-semibold text-foreground">
          {ABOUT_ME.name?.split(" ")[0]}.
        </Link>

        {/* Desktop navigation menu */}
        <div className="hidden md:flex items-center justify-end flex-1 space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => handleScrollToSection(e, item.href)}
              className="relative block w-fit leading-[1.5] py-1 text-base text-foreground/80 cursor-pointer group nav-link"
            >
              {/* Container for letter animations */}
              <span className="relative inline-block">
                {item.name.split("").map((letter, i) => (
                  <span key={i} className="relative inline-block overflow-hidden">
                    {/* Original letter that slides up on hover */}
                    <span
                      className="block transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:-translate-y-full group-hover:opacity-80"
                      style={{
                        transitionDelay: `${i * STAGGER}ms`
                      }}
                    >
                      {letter}
                    </span>

                    {/* Duplicate letter that slides down from above on hover WITH GREEN COLOR */}
                    <span
                      className="block absolute left-0 top-0 font-medium translate-y-full opacity-0 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-0 group-hover:opacity-100"
                      style={{
                        transitionDelay: `${i * STAGGER}ms`,
                        color: 'hsl(var(--link))' // Green color from your CSS
                      }}
                    >
                      {letter}
                    </span>
                  </span>
                ))}
              </span>
            </Link>
          ))}
        </div>

        {/* Theme toggle button */}
        <div className="ml-6">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
