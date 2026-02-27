"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { ABOUT_ME } from "../constants/data";

const DEFAULT_ABOUT_TEXT = ABOUT_ME.description.join(" ");

const COMMAND_DELAY_MS = 600;

interface AboutTerminalProps {
  fullText?: string;
  typingSpeed?: number;
  isInView?: boolean;
}

export function AboutTerminal({
  fullText = DEFAULT_ABOUT_TEXT,
  typingSpeed = 15,
  isInView = true,
}: AboutTerminalProps) {
  const [typedText, setTypedText] = useState("");
  const [commandExecuted, setCommandExecuted] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => setCommandExecuted(true), COMMAND_DELAY_MS);
    return () => clearTimeout(t);
  }, [isInView]);

  useEffect(() => {
    if (!commandExecuted) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);
    return () => clearInterval(interval);
  }, [commandExecuted, fullText, typingSpeed]);

  const isTyping = commandExecuted && typedText.length < fullText.length;
  const isComplete = commandExecuted && typedText.length >= fullText.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[hsl(var(--border)/0.5)] bg-[hsl(var(--muted)/0.55)] backdrop-blur-xl shadow-2xl transition-all">
        <div className="flex h-12 shrink-0 select-none items-center justify-between border-b border-[hsl(var(--border)/0.5)] bg-[hsl(var(--muted)/0.7)] px-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <span className="ml-4 font-mono text-xs text-muted-foreground/70 tracking-wider">shasbin.bio</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col p-5 font-mono text-sm leading-relaxed sm:p-7">
        <div className="shrink-0 text-accent font-bold">$ cat about.txt</div>
        <div className="mt-4 min-h-0 flex-1 overflow-y-auto text-foreground/90 selection:bg-accent/30 scrollbar-hide">
          {commandExecuted && typedText.length > 0 ? typedText : "\u00A0"}
          {isTyping && <span className="animate-pulse text-accent">_</span>}
          {isComplete && (
            <span className="ml-1 animate-pulse text-accent">█</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
