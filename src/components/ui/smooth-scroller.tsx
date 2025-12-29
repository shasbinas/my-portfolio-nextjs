"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroller() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // Stronger smoothing effect
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.1, // slightly reduced from 2.0 to prevent "jumpy/hang" feel while keeping it responsive
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
