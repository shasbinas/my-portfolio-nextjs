'use client';

import { motion } from 'framer-motion';
import { Dancing_Script } from 'next/font/google';

// Font configuration
const dancingScript = Dancing_Script({ 
  subsets: ['latin'],
  weight: ['400', '700'] 
});

interface Props {
  onComplete?: () => void;
  className?: string; // Adding className support while we're at it for flexibility
}

export default function HandwritingAnimation({ onComplete, className }: Props) {
  return (
    <div className={`h-screen w-full flex items-center justify-center bg-transparent ${className || ''}`}>
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 600 200"
        className="w-full max-w-5xl h-auto"
      >
        <defs>
          <clipPath id="text-reveal">
            <motion.rect
              x="0"
              y="0"
              height="100%"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.8, ease: "easeInOut" }}
            />
          </clipPath>
        </defs>
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className={`${dancingScript.className} text-[#4facfe] font-bold`}
          fontSize="90" 
          stroke="#4facfe"
          fill="#4facfe"
          strokeWidth="2"
          clipPath="url(#text-reveal)"
          initial={{ fillOpacity: 0 }}
          animate={{ fillOpacity: 1 }}
          transition={{ duration: 0.8, delay: 2.8, ease: "easeOut" }} // Fade in after write-off (2.8s)
          onAnimationComplete={() => onComplete?.()}
        >
          Shasbin AS
        </motion.text>
      </motion.svg>
    </div>
  );
}
