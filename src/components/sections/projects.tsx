"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Plus } from "lucide-react";
import { PROJECTS } from "@/components/constants/data";

// Shuffle Text Effect Component
function ShuffleText({
  text,
  isActive,
  className,
}: {
  text: string;
  isActive: boolean;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_";

  useEffect(() => {
    if (!isActive) {
      setDisplayText(text);
      return;
    }

    let frame = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (frame > index) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      frame += 1;
      if (frame > text.length + 5) {
        clearInterval(interval);
        setDisplayText(text);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isActive, text]);

  return <span className={className}>{displayText}</span>;
}

function ProjectRow({
  project,
  index,
  isExpanded,
  onToggle,
}: {
  project: any;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-foreground/10 last:border-b-0" ref={rowRef}>
      {/* Row Header */}
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onToggle}
        whileHover={{ x: 10, backgroundColor: "rgba(var(--foreground), 0.05)" }}
        className={`
          group relative py-6 px-4 md:px-8 cursor-pointer transition-all duration-300
          ${isExpanded ? "bg-foreground/[0.06]" : ""}
        `}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Left Side */}
          <div className="flex items-center gap-4 md:gap-10 flex-1">
            <span
              className={`font-mono transition-all duration-300 text-xs md:text-sm whitespace-nowrap ${isExpanded || isHovered ? "text-accent scale-110" : "text-muted-foreground/70"}`}
            >
              {index < 9 ? `0${index + 1}` : index + 1}
            </span>

            <h3
              className={`font-semibold text-xl md:text-3xl transition-all duration-500 tracking-tight ${isExpanded || isHovered ? "text-foreground translate-x-2" : "text-foreground/60"}`}
            >
              <ShuffleText text={project.name} isActive={isHovered} />
            </h3>
          </div>

          {/* Inline Image Preview (Floating effect) */}
          <div className="hidden md:block w-48 h-28 flex-shrink-0 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{
                opacity: isHovered && !isExpanded ? 1 : 0,
                scale: isHovered && !isExpanded ? 1 : 0.8,
                y: isHovered && !isExpanded ? 0 : 10,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 rounded-xl overflow-hidden border border-accent/30 shadow-[0_20px_50px_rgba(var(--accent),0.2)] bg-black"
              style={{
                borderColor: isHovered ? project.color : undefined,
                boxShadow: isHovered
                  ? `0 20px 50px ${project.color}40`
                  : undefined,
              }}
            >
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.name}
                className="w-full h-full object-cover opacity-80"
              />
              {/* Enhanced Scanning Effect */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                <div
                  className="absolute inset-0 opacity-40 animate-scan"
                  style={{
                    background: `linear-gradient(to bottom, transparent 40%, ${project.color} 50%, transparent 60%)`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
              </div>
            </motion.div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-6 flex-shrink-0">
            <span
              className={`hidden md:block font-mono text-[10px] tracking-[0.2em] transition-colors uppercase ${isHovered ? "text-accent" : "text-muted-foreground/50"}`}
            >
              {project.category}
            </span>
            <motion.div
              animate={{
                rotate: isExpanded ? 45 : 0,
                scale: isHovered ? 1.2 : 1,
              }}
              className={`transition-colors flex-shrink-0 ${isExpanded || isHovered ? "text-accent" : "text-muted-foreground/60"}`}
            >
              <Plus size={20} />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Expanded Details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden bg-foreground/[0.04]"
          >
            <div className="px-4 md:px-8 pb-10 pt-6">
              <div className="grid lg:grid-cols-12 gap-10 items-start">
                {/* Left: Project Image */}
                <div className="lg:col-span-5">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="aspect-video w-full rounded-2xl overflow-hidden border border-border/60 relative group bg-black shadow-2xl"
                  >
                    {/* Noise texture overlay */}
                    <motion.div
                      initial={{ opacity: 0.4 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 1.5, delay: 0.3 }}
                      className="absolute inset-0 z-10 pointer-events-none"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E\")",
                        mixBlendMode: "overlay",
                      }}
                    />

                    {/* Main image with smooth multi-stage blur */}
                    <motion.img
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      initial={{
                        filter:
                          "blur(60px) brightness(0.4) contrast(1.3) saturate(0.3)",
                        opacity: 0.3,
                      }}
                      animate={{
                        filter: [
                          "blur(60px) brightness(0.4) contrast(1.3) saturate(0.3)",
                          "blur(30px) brightness(0.7) contrast(1.15) saturate(0.7)",
                          "blur(10px) brightness(0.9) contrast(1.05) saturate(0.95)",
                          "blur(0px) brightness(1) contrast(1) saturate(1)",
                        ],
                        opacity: [0.3, 0.6, 0.9, 1],
                      }}
                      transition={{
                        duration: 0.8,
                        times: [0, 0.3, 0.65, 1],
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="w-full h-full object-cover"
                      style={{
                        willChange: "filter, opacity",
                      }}
                    />

                    {/* Scanline overlay */}
                    <motion.div
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="absolute inset-0 pointer-events-none z-20"
                      style={{
                        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${project.color}08 2px, ${project.color}08 4px)`,
                      }}
                    />

                    {/* Hologram Scanlines */}
                    <div className="absolute inset-0 pointer-events-none z-30">
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${project.color}08 2px, ${project.color}08 4px)`,
                        }}
                      />
                      {/* Moving scanner line in expanded view */}
                      <div
                        className="absolute inset-0 opacity-20 animate-scan"
                        style={{
                          background: `linear-gradient(to bottom, transparent 40%, ${project.color} 50%, transparent 60%)`,
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent pointer-events-none z-10" />
                  </motion.div>
                </div>

                {/* Right: Details */}
                <div className="lg:col-span-7 flex flex-col gap-8">
                  <div className="space-y-4">
                    {/* <h4 className="text-[10px] text-accent font-bold uppercase tracking-[0.3em] flex items-center gap-2">
                       <span className="w-8 h-[1px] bg-accent/30"></span> // Dossier
                    </h4> */}
                    <div className="text-sm md:text-base text-foreground/85 leading-relaxed space-y-4 font-normal">
                      {project.description
                        .split("\n")
                        .map((line: string, i: number) => {
                          const parts = line.split("**");
                          if (parts.length === 3) {
                            return (
                              <p key={i}>
                                <strong className="text-foreground font-semibold uppercase text-xs tracking-wider mr-2">
                                  {parts[1]}
                                </strong>
                                {parts[2]}
                              </p>
                            );
                          }
                          return <p key={i}>{line}</p>;
                        })}
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="space-y-3">
                      <h4 className="text-[9px] text-muted-foreground font-bold uppercase tracking-[0.3em]">
                        // Technology_Matrix
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech: string) => (
                          <span
                            key={tech}
                            className="text-[10px] px-3 py-1.5 bg-foreground/[0.05] border border-foreground/20 rounded-lg font-mono text-foreground/70 hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 md:flex-none px-6 py-4 rounded-xl bg-foreground text-background font-bold font-mono text-xs tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        <Github size={14} />
                        SOURCE_CODE
                      </a>
                      {project.link && project.link !== "#" ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 md:flex-none group/btn px-6 py-4 rounded-xl bg-accent/15 border border-accent/40 text-accent font-bold font-mono text-xs tracking-widest transition-all duration-300 hover:bg-accent hover:text-background hover:shadow-[0_0_30px_rgba(var(--accent),0.4)] flex items-center justify-center gap-2"
                        >
                          LIVE_DEMO
                          <ExternalLink
                            size={14}
                            className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                          />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Projects() {
  const [expandedId, setExpandedId] = useState<number | null>(1);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-4 mb-16 px-4 md:px-0">
          <h2 className="section-title">Featured Work.</h2>
          <p className="text-sm md:text-base text-muted-foreground/80 max-w-xl leading-relaxed">
            A selection of projects where I've tackled complex architectural
            challenges and pushed the boundaries of backend engineering.
          </p>
        </div>

        <div className="rounded-3xl border border-border/60 bg-foreground/[0.03] backdrop-blur-md overflow-hidden shadow-2xl">
          <div className="flex flex-col">
            {PROJECTS.map((project: any, index: number) => (
              <ProjectRow
                key={project.id}
                project={project}
                index={index}
                isExpanded={expandedId === project.id}
                onToggle={() =>
                  setExpandedId(expandedId === project.id ? null : project.id)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
