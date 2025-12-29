'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HandwritingAnimation from './HandwritingAnimation';

export default function IntroAnimation() {
  const [show, setShow] = useState(true);

  // Optional: Check session storage so it doesn't show on every reload
  // For now, we'll let it show every time as per "Splash Screen" request usually implies.
  // To enable one-time-per-session, uncomment below:
  /*
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setShow(false);
    }
  }, []);
  */

  const handleComplete = () => {
    // Wait a brief moment after text fills before fading out
    setTimeout(() => {
      setShow(false);
      // sessionStorage.setItem('hasSeenIntro', 'true');
    }, 1000); 
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2e1065]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <HandwritingAnimation onComplete={handleComplete} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
