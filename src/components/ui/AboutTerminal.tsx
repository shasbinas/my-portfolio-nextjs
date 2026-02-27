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
      className="flex h-[350px] w-full flex-col overflow-hidden rounded-xl border border-white/10 bg-[#161122] shadow-2xl transition-shadow hover:border-accent/30 sm:h-[420px]"
    >
      <div className="flex h-10 shrink-0 items-center bg-white/5 px-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="ml-4 font-mono text-[10px] text-white/40 tracking-wider">shasbin.bio</span>
      </div>
      <div className="flex min-h-0 flex-1 flex-col p-5 font-mono text-sm leading-relaxed sm:p-7">
        <div className="shrink-0 text-accent font-bold">$ cat about.txt</div>
        <div className="mt-4 min-h-0 flex-1 overflow-y-auto text-white/80 selection:bg-accent/30">
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
