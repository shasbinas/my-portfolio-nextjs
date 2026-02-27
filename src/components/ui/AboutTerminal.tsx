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
      className="flex h-[350px] w-full flex-col overflow-hidden rounded-2xl border-2 border-accent/20 bg-background/50 backdrop-blur-md shadow-xl transition-all hover:border-accent/40 sm:h-[420px]"
    >
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-border/50 bg-muted/40 px-4">
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
