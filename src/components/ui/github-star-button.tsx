"use client";
import Link from "next/link";
import { SiGithub } from "react-icons/si";

export default function GithubStarButton() {
  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Link
        href="https://github.com/shasbinas/my-portfolio-nextjs"
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-12 h-12 bg-accent rounded-full shadow-md transition-[background-color,box-shadow,transform] duration-300 hover:shadow-lg hover:scale-110 group flex items-center justify-center"
        aria-label="Star this repository on GitHub"
      >
        <SiGithub
          size={18}
          color="hsl(var(--foreground))"
          className="transition-transform duration-300 group-hover:scale-110"
        />

        {/* Tooltip */}
        <span className="absolute left-full ml-3 px-3 py-1.5 text-xs font-medium text-white bg-black border border-gray-700 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 flex items-center">
          Give it a ⭐ on GitHub!
          {/* Tooltip arrow pointing left */}
          <span className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-gray-700"></span>
          <span className="absolute right-full top-1/2 -translate-y-1/2 ml-[1px] w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[5px] border-r-black"></span>
        </span>
      </Link>
    </div>
  );
}
