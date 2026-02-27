"use client";

import { useState, useEffect, useRef } from "react";
import { ABOUT_ME } from "../constants/data";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Terminal, Cpu, Wifi, Disc, Keyboard } from "lucide-react";

const ASCII_ART = `
  ██████╗ ██╗  ██╗ █████╗ ███████╗██████╗ ██╗███╗   ██╗
 ██╔════╝ ██║  ██║██╔══██╗██╔════╝██╔══██╗██║████╗  ██║
 ╚█████╗  ███████║███████║███████╗██████╔╝██║██╔██╗ ██║
  ╚═══██╗ ██╔══██║██╔══██║╚════██║██╔══██╗██║██║╚██╗██║
 ██████╔╝ ██║  ██║██║  ██║███████║██████╔╝██║██║ ╚████║
 ╚═════╝  ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═════╝ ╚═╝╚═╝  ╚═══╝
`;

interface LogEntry {
  id: string | number;
  message: React.ReactNode;
  level?: "info" | "success" | "warning" | "error" | "system";
  timestamp?: string;
  isCommand?: boolean;
  color?: string;
}

const Typewriter = ({
  text,
  delay = 0,
  speed = 5,
}: {
  text: string;
  delay?: number;
  speed?: number;
}) => {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        return;
      }
      setDisplayText(text.slice(0, i + 1));
      i++;
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, started]);

  return <span>{displayText}</span>;
};

export function TerminalWindow() {
  const [history, setHistory] = useState<LogEntry[]>([]);
  const [input, setInput] = useState("");
  const [isBooting, setIsBooting] = useState(true);
  const [placeholderText, setPlaceholderText] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-30%" });

  const placeholderPrompts = [
    "try me! type 'help' →",
    "whoami • status • focus",
    "click here & explore",
    "type a command ↓",
  ];

  const getLocalTime = (date: Date = new Date()) => {
    const h = date.getHours().toString().padStart(2, "0");
    const m = date.getMinutes().toString().padStart(2, "0");
    const s = date.getSeconds().toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  useEffect(() => {
    const now = new Date();
    const bootLogs: LogEntry[] = [
      {
        id: "boot-1",
        timestamp: getLocalTime(now),
        level: "system",
        message: "INITIALIZING NEURAL INTERFACE...",
        color: "text-accent",
      },
      {
        id: "boot-2",
        timestamp: getLocalTime(new Date(now.getTime() + 400)),
        level: "info",
        message: "LOADING CORE MODULES...",
        color: "text-accent-secondary",
      },
      {
        id: "boot-3",
        timestamp: getLocalTime(new Date(now.getTime() + 800)),
        level: "warning",
        message: "ESTABLISHING SECURE CONNECTION...",
        color: "text-yellow-400",
      },
      {
        id: "boot-4",
        timestamp: getLocalTime(new Date(now.getTime() + 1200)),
        level: "success",
        message: "ACCESS GRANTED",
        color: "text-green-400",
      },
    ];
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    bootLogs.forEach((log, i) => {
      const t = setTimeout(
        () => {
          setHistory((prev) => [...prev, log]);
          if (i === bootLogs.length - 1) setIsBooting(false);
        },
        400 * (i + 1)
      );
      timeouts.push(t);
    });
    return () => timeouts.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (isBooting) return;
    const current = placeholderPrompts[placeholderIndex];
    let t: ReturnType<typeof setTimeout>;
    if (isDeleting) {
      t = setTimeout(() => {
        setPlaceholderText(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 50);
    } else {
      t = setTimeout(() => {
        setPlaceholderText(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 100);
    }
    if (!isDeleting && charIndex === current.length) {
      t = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setPlaceholderIndex((p) => (p + 1) % placeholderPrompts.length);
    }
    return () => clearTimeout(t);
  }, [charIndex, isDeleting, placeholderIndex, isBooting]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
      const t = setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 150);
      return () => clearTimeout(t);
    }
  }, [history]);

  useEffect(() => {
    if (isInView && !isBooting) {
      inputRef.current?.focus();
    }
  }, [isInView, isBooting]);

  const handleContainerClick = () => inputRef.current?.focus();

  const addResponse = (lines: (string | React.ReactNode)[]) => {
    const newLogs: LogEntry[] = lines.map((line) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      message: line,
      color: "text-white/60",
    }));
    setHistory((prev) => [...prev, ...newLogs]);
  };

  const handleCommand = (cmd: string) => {
    const clean = cmd.trim().toLowerCase().replace(/[^\x20-\x7E]/g, "");
    setHistory((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        message: (
          <span className="flex items-center gap-2">
            <span className="text-fuchsia-500 font-bold">➜</span>
            <span className="text-white font-medium">{cmd}</span>
          </span>
        ),
        isCommand: true,
      },
    ]);

    switch (clean) {
      case "help":
        addResponse([
          <Typewriter key="h1" text="available commands:" speed={5} />,
          "",
          <div
            key="help-grid"
            className="grid grid-cols-[100px_1fr] gap-x-2 gap-y-1"
          >
            <span className="text-accent">
              <Typewriter text="whoami" delay={50} speed={10} />
            </span>
            <span className="text-white/40">
              → <Typewriter text="system identity" delay={60} speed={5} />
            </span>
            <span className="text-accent">
              <Typewriter text="status" delay={100} speed={10} />
            </span>
            <span className="text-white/40">
              → <Typewriter text="runtime state" delay={110} speed={5} />
            </span>
            <span className="text-accent">
              <Typewriter text="focus" delay={150} speed={10} />
            </span>
            <span className="text-white/40">
              → <Typewriter text="current direction" delay={160} speed={5} />
            </span>
            <span className="text-accent">
              <Typewriter text="logs" delay={200} speed={10} />
            </span>
            <span className="text-white/40">
              → <Typewriter text="recent activity" delay={210} speed={5} />
            </span>
            <span className="text-accent">
              <Typewriter text="thought" delay={250} speed={10} />
            </span>
            <span className="text-white/40">
              → <Typewriter text="system reflection" delay={260} speed={5} />
            </span>
            <span className="text-accent">
              <Typewriter text="clear" delay={300} speed={10} />
            </span>
            <span className="text-white/40">
              → <Typewriter text="clear terminal" delay={310} speed={5} />
            </span>
          </div>,
        ]);
        break;
      case "whoami":
        addResponse([
          <div key="whoami" className="flex flex-col gap-1">
            <span className="font-bold text-accent">
              <Typewriter
                text={`${ABOUT_ME.name.split(" ")[0].toLowerCase()}@workspace`}
                speed={5}
              />
            </span>
            <span className="text-white/70">
              <Typewriter text={ABOUT_ME.title} delay={50} speed={5} />
            </span>
            <span className="italic text-white/50">
              <Typewriter
                text={ABOUT_ME.description[0]}
                delay={100}
                speed={5}
              />
            </span>
          </div>,
          "",
        ]);
        break;
      case "status":
        addResponse([
          <div key="status" className="flex flex-col gap-1">
            <div>
              <span className="text-accent font-bold">SYSTEM:</span>{" "}
              <span className="text-green-400 font-medium">
                <Typewriter text="ONLINE" delay={50} speed={10} />
              </span>
            </div>
            <div>
              <span className="text-accent font-bold">WORKFLOW:</span>{" "}
              <span className="text-yellow-400 font-medium">
                <Typewriter text="ACTIVE" delay={100} speed={10} />
              </span>
            </div>
            <div>
              <span className="text-accent font-bold">STATE:</span>{" "}
              <span className="text-accent-secondary font-medium">
                <Typewriter text="STABLE" delay={150} speed={10} />
              </span>
            </div>
          </div>,
        ]);
        break;
      case "focus":
        addResponse([
          <div key="focus" className="flex flex-col gap-1">
            <span className="mb-2 text-white/40 underline decoration-accent/30 underline-offset-4 font-bold">
              <Typewriter text="current focus:" speed={5} />
            </span>
            <span className="flex items-center gap-2">
              <span className="text-accent font-bold">→</span>{" "}
              <Typewriter
                text="developing secure authentication flows"
                delay={50}
                speed={5}
              />
            </span>
            <span className="flex items-center gap-2">
              <span className="text-accent font-bold">→</span>{" "}
              <Typewriter
                text="crafting robust RESTful APIs"
                delay={100}
                speed={5}
              />
            </span>
            <span className="flex items-center gap-2">
              <span className="text-accent font-bold">→</span>{" "}
              <Typewriter
                text="designing scalable backend architectures"
                delay={150}
                speed={5}
              />
            </span>
          </div>,
        ]);
        break;
      case "logs":
        addResponse([
          <div key="logs" className="flex flex-col gap-1 font-mono text-xs">
            <span className="flex gap-2">
              <span className="text-accent font-bold">[INFO]</span>{" "}
              <span className="text-white/60">
                <Typewriter
                  text="optimizing API performance and security"
                  delay={0}
                  speed={5}
                />
              </span>
            </span>
            <span className="flex gap-2">
              <span className="text-accent font-bold">[INFO]</span>{" "}
              <span className="text-white/60">
                <Typewriter
                  text="integrating relational and NoSQL databases"
                  delay={50}
                  speed={5}
                />
              </span>
            </span>
            <span className="flex gap-2">
              <span className="text-accent font-bold">[INFO]</span>{" "}
              <span className="text-white/60">
                <Typewriter
                  text="implementing caching with Redis"
                  delay={100}
                  speed={5}
                />
              </span>
            </span>
          </div>,
        ]);
        break;
      case "thought":
        addResponse([
          <span key="thought" className="italic text-emerald-400">
            <Typewriter
              text="• clean code is the foundation of reliability"
              speed={15}
            />
          </span>,
        ]);
        break;
      case "sudo":
        addResponse([
          <div key="sudo" className="flex flex-col text-red-500 font-bold">
            <span>
              <Typewriter text="permission denied." speed={20} />
            </span>
            <span className="text-white/40 font-normal">
              <Typewriter text="focus over shortcuts." delay={200} speed={20} />
            </span>
          </div>,
        ]);
        break;
      case "clear":
        setHistory([]);
        break;
      default:
        if (clean !== "")
          addResponse([
            `Command not found: ${clean}. Type 'help' for options.`,
          ]);
        break;
    }
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCommand(input);
  };

  const getLevelColor = (level?: string) => {
    switch (level) {
      case "info":
        return "text-accent-secondary";
      case "warning":
        return "text-yellow-400";
      case "success":
        return "text-green-400";
      case "error":
        return "text-red-400";
      case "system":
        return "text-accent";
      default:
        return "text-white/40";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full font-mono text-xs leading-relaxed sm:text-sm"
    >
      <div className="absolute -inset-0.5 rounded-xl bg-accent/20 opacity-20 blur-lg" />
        <div
          ref={containerRef}
          onClick={handleContainerClick}
          className="relative flex h-[350px] cursor-text flex-col overflow-hidden rounded-2xl border-2 border-accent/30 bg-background/60 backdrop-blur-xl shadow-2xl transition-all hover:border-accent/50 sm:h-[420px]"
        >
          <div className="flex h-12 shrink-0 select-none items-center justify-between border-b border-border/50 bg-muted/40 px-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-2 text-[10px] font-medium tracking-wider text-muted-foreground/70">
            <span className="text-accent font-bold">›_</span>
            <span>shasbin:~/welcome</span>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 text-[10px] font-medium tracking-wide text-accent shadow-[0_0_10px_rgba(var(--accent),0.1)]">
            <Keyboard className="h-3 w-3 shrink-0" />
            <span className="hidden sm:inline">Interactive Terminal</span>
            <span className="sm:hidden">Type</span>
          </span>
        </div>
        <div
          ref={scrollRef}
          className="relative flex-1 overflow-auto p-5 scroll-smooth sm:p-7 scrollbar-hide"
        >
          <pre className="mb-6 self-start whitespace-pre font-mono text-[6px] font-bold leading-[1.1] text-[#ff2cf1] selection:bg-transparent sm:mb-8 sm:text-[11px] drop-shadow-[0_0_15px_rgba(255,44,241,0.5)]">
            {ASCII_ART}
          </pre>
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {history.map((log) => (
                <motion.div
                  key={log.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex w-full flex-row items-baseline gap-2 font-medium leading-tight text-foreground/90 wrap-break-word whitespace-pre-wrap"
                >
                  {!log.isCommand && (
                    <>
                      {log.timestamp && (
                        <span className="shrink-0 select-none text-muted-foreground/40">
                          [{log.timestamp}]
                        </span>
                      )}
                      {log.level && (
                        <span
                          className={`shrink-0 min-w-[75px] select-none ${getLevelColor(log.level)}`}
                        >
                          [{log.level}]
                        </span>
                      )}
                    </>
                  )}
                  <span
                    className={
                      log.isCommand ? "text-foreground font-bold" : log.color || "text-foreground/90"
                    }
                  >
                    {log.message}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
            {!isBooting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="group relative flex items-center gap-2 pb-1 pt-2"
              >
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="shrink-0 text-accent font-bold"
                >
                  ➜
                </motion.span>
                <span className="shrink-0 whitespace-nowrap font-bold">
                  <span className="text-[#ff2cf1]">shasbin</span>
                  <span className="text-muted-foreground/30">:</span>
                  <span className="text-purple-600 dark:text-purple-400">~</span>
                  <span className="text-[#ff2cf1]">$</span>
                  <span className="text-muted-foreground/20"> </span>
                </span>
                <div className="relative min-w-0 flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full border-none bg-transparent font-mono text-sm text-foreground outline-none caret-[#ff2cf1] placeholder:text-muted-foreground/20"
                    autoComplete="off"
                    spellCheck={false}
                    placeholder={placeholderText}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
        <div className="flex h-10 shrink-0 items-center justify-between border-t border-border/50 bg-muted/40 px-4 font-mono text-[10px] text-muted-foreground/60">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 line-clamp-1">
              <Disc className={`h-3 w-3 ${isBooting ? "animate-spin" : ""}`} />
              <span className="uppercase tracking-widest whitespace-nowrap">Status: {isBooting ? "Booting" : "Ready"}</span>
            </div>
            <div className="hidden items-center gap-1.5 sm:flex">
              <Cpu className="h-3 w-3" />
              <span className="uppercase tracking-widest">Mem: 8KB</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Wifi className="h-3 w-3 text-green-500/80" />
            <span className="uppercase tracking-widest">Online</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
