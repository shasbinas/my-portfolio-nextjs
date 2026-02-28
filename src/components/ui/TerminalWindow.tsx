"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Terminal, Cpu, Wifi, Disc, Keyboard } from "lucide-react";

const ASCII_ART = `
███████╗██╗  ██╗ █████╗ ███████╗██████╗ ██╗███╗   ██╗
██╔════╝██║  ██║██╔══██╗██╔════╝██╔══██╗██║████╗  ██║
███████╗███████║███████║███████╗██████╔╝██║██╔██╗ ██║
╚════██║██╔══██║██╔══██║╚════██║██╔══██╗██║██║╚██╗██║
███████║██║  ██║██║  ██║███████║██████╔╝██║██║ ╚████║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═════╝ ╚═╝╚═╝  ╚═══╝
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
      color: "text-muted-foreground",
    }));
    setHistory((prev) => [...prev, ...newLogs]);
  };

  const handleCommand = (cmd: string) => {
    const clean = cmd.trim().toLowerCase();
    setHistory((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        message: (
          <span className="flex items-center gap-2">
            <span className="text-accent">➜</span>
            <span className="text-foreground">{cmd}</span>
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
            <span className="text-muted-foreground">
              → <Typewriter text="system identity" delay={60} speed={5} />
            </span>
            <span className="text-accent">
              <Typewriter text="status" delay={100} speed={10} />
            </span>
            <span className="text-muted-foreground">
              → <Typewriter text="runtime state" delay={110} speed={5} />
            </span>
            <span className="text-accent">
              <Typewriter text="focus" delay={150} speed={10} />
            </span>
            <span className="text-muted-foreground">
              → <Typewriter text="current direction" delay={160} speed={5} />
            </span>
            <span className="text-accent">
              <Typewriter text="logs" delay={200} speed={10} />
            </span>
            <span className="text-muted-foreground">
              → <Typewriter text="recent activity" delay={210} speed={5} />
            </span>
            <span className="text-accent">
              <Typewriter text="thought" delay={250} speed={10} />
            </span>
            <span className="text-muted-foreground">
              → <Typewriter text="system reflection" delay={260} speed={5} />
            </span>
            <span className="text-accent">
              <Typewriter text="clear" delay={300} speed={10} />
            </span>
            <span className="text-muted-foreground">
              → <Typewriter text="clear terminal" delay={310} speed={5} />
            </span>
          </div>,
        ]);
        break;
      case "whoami":
        addResponse([
          <div key="whoami" className="flex flex-col gap-1">
            <span className="font-bold text-foreground">
              <Typewriter text="Shasbin@workspace" speed={5} />
            </span>
            <span className="text-muted-foreground">
              <Typewriter
                text="Full Stack Developer specializing in Node.js, Express, and Database Architectures"
                delay={50}
                speed={5}
              />
            </span>
            <span className="italic text-muted-foreground/80">
              <Typewriter
                text="building reliable, scalable, and secure server-side applications"
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
              <span className="text-accent">SYSTEM:</span>{" "}
              <span className="text-green-500">
                <Typewriter text="ONLINE" delay={50} speed={10} />
              </span>
            </div>
            <div>
              <span className="text-accent">WORKFLOW:</span>{" "}
              <span className="text-yellow-500">
                <Typewriter text="ACTIVE" delay={100} speed={10} />
              </span>
            </div>
            <div>
              <span className="text-accent">STATE:</span>{" "}
              <span className="text-purple-500">
                <Typewriter text="STABLE" delay={150} speed={10} />
              </span>
            </div>
          </div>,
        ]);
        break;
      case "focus":
        addResponse([
          <div key="focus" className="flex flex-col gap-1">
            <span className="mb-2 text-muted-foreground underline decoration-accent/30 underline-offset-4">
              <Typewriter text="current focus:" speed={5} />
            </span>
            <span className="flex items-center gap-2">
              <span className="text-accent">→</span>{" "}
              <Typewriter
                text="developing secure authentication flows"
                delay={50}
                speed={5}
              />
            </span>
            <span className="flex items-center gap-2">
              <span className="text-accent">→</span>{" "}
              <Typewriter
                text="crafting robust RESTful APIs"
                delay={100}
                speed={5}
              />
            </span>
            <span className="flex items-center gap-2">
              <span className="text-accent">→</span>{" "}
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
              <span className="text-accent">[INFO]</span>{" "}
              <span className="text-muted-foreground">
                <Typewriter
                  text="optimizing API performance and security"
                  delay={0}
                  speed={5}
                />
              </span>
            </span>
            <span className="flex gap-2">
              <span className="text-accent">[INFO]</span>{" "}
              <span className="text-muted-foreground">
                <Typewriter
                  text="integrating relational and NoSQL databases"
                  delay={50}
                  speed={5}
                />
              </span>
            </span>
            <span className="flex gap-2">
              <span className="text-accent">[INFO]</span>{" "}
              <span className="text-muted-foreground">
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
          <div key="sudo" className="flex flex-col text-red-500">
            <span>
              <Typewriter text="permission denied." speed={20} />
            </span>
            <span className="text-muted-foreground">
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
        return "text-yellow-500";
      case "success":
        return "text-green-500";
      case "error":
        return "text-red-500";
      case "system":
        return "text-accent";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full h-full min-h-[400px] flex flex-col font-mono text-xs leading-relaxed sm:text-sm"
    >
      <div className="absolute -inset-1 rounded-xl bg-linear-to-b from-accent/20 to-accent-secondary/20 opacity-20 blur-xl" />
      <div
        ref={containerRef}
        onClick={handleContainerClick}
        className="relative flex flex-1 h-full min-h-[400px] cursor-text flex-col overflow-hidden rounded-lg border border-border/50 bg-background/95 shadow-2xl backdrop-blur-xl transition-shadow hover:border-accent/40"
      >
        <div className="flex h-8 shrink-0 select-none items-center justify-between border-b border-border/50 bg-muted/30 px-4">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-2 text-[10px] font-medium tracking-wider text-muted-foreground opacity-60">
            <Terminal className="h-3 w-3" />
            <span>shasbin:~/welcome</span>
          </div>
          <span className="flex shrink-0 items-center gap-1.5 rounded-md border border-accent/30 bg-accent/10 px-2 py-0.5 text-[9px] font-medium tracking-wide text-accent sm:text-[10px]">
            <Keyboard className="h-3 w-3 shrink-0" />
            <span className="hidden sm:inline">Interactive Terminal</span>
            <span className="sm:hidden">Type</span>
          </span>
        </div>
        <div
          ref={scrollRef}
          className="relative flex-1 min-h-[300px] overflow-auto p-4 scroll-smooth sm:p-6"
        >
          <pre className="mb-4 self-start whitespace-pre font-mono text-[5px] font-bold leading-[1.1] text-transparent selection:bg-transparent sm:mb-6 sm:text-[10px] bg-linear-to-b from-accent to-accent-secondary bg-clip-text">
            {ASCII_ART}
          </pre>
          <div className="space-y-1.5">
            <AnimatePresence mode="popLayout">
              {history.map((log) => (
                <motion.div
                  key={log.id}
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex w-full flex-row items-baseline gap-2 font-medium leading-tight text-muted-foreground wrap-break-word whitespace-pre-wrap"
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
                          className={`shrink-0 min-w-14 select-none ${getLevelColor(log.level)}`}
                        >
                          [{log.level}]
                        </span>
                      )}
                    </>
                  )}
                  <span
                    className={
                      log.isCommand ? "" : log.color || "text-foreground/90"
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
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -inset-x-2 inset-y-0 -z-10 rounded bg-accent/5"
                />
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="shrink-0 text-accent-secondary"
                >
                  ➜
                </motion.span>
                <span className="shrink-0 whitespace-nowrap">
                  <span className="hidden text-accent sm:inline">shasbin</span>
                  <span className="hidden text-muted-foreground sm:inline">
                    :
                  </span>
                  <span className="hidden text-accent-secondary sm:inline">
                    ~
                  </span>
                  <span className="text-muted-foreground">$</span>
                  <span className="text-muted-foreground"> </span>
                </span>
                <div className="relative min-w-0 flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full border-none bg-transparent font-mono text-sm text-foreground outline-none caret-accent placeholder:text-accent/30"
                    autoComplete="off"
                    spellCheck={false}
                    placeholder={placeholderText}
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
        <div className="flex h-7 shrink-0 items-center justify-between border-t border-border/50 bg-muted/20 px-3 font-mono text-[9px] text-muted-foreground sm:text-[10px]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Disc className={`h-3 w-3 ${isBooting ? "animate-spin" : ""}`} />
              <span>STATUS: READY</span>
            </div>
            <div className="hidden items-center gap-1.5 sm:flex">
              <Cpu className="h-3 w-3" />
              <span>MEM: {history.length * 2}KB</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-accent">
            <Wifi className="h-3 w-3" />
            <span>ONLINE</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
