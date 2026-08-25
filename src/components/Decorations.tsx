import React from 'react';
import { motion } from 'motion/react';

export function HandprintSVG({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      style={style}
      fill="currentColor"
    >
      <path d="M48,90 C35,88 28,75 25,60 C25,55 20,40 22,35 C24,30 28,32 30,38 C32,45 35,50 35,50 C35,50 30,30 32,25 C34,20 38,22 40,28 C42,35 45,45 45,45 C45,45 42,22 46,18 C50,14 54,16 54,23 C54,32 55,44 55,44 C55,44 58,25 63,22 C67,19 70,22 68,28 C66,35 62,45 62,45 C62,45 74,38 78,42 C82,46 78,55 72,55 C65,55 58,58 55,60 C55,75 58,89 48,90 Z" />
    </svg>
  );
}

export function ButterflySVG({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      style={{ ...style, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }}
    >
      <path d="M50 20 Q55 10 65 15 Q75 20 65 40 Q75 45 80 60 Q85 75 60 70 Q55 60 50 50 Q45 60 40 70 Q15 75 20 60 Q25 45 35 40 Q25 20 35 15 Q45 10 50 20 Z" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
      <path d="M50 20 L50 80" stroke="currentColor" strokeWidth="3" />
      <path d="M50 20 Q42 5 35 10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M50 20 Q58 5 65 10" stroke="currentColor" strokeWidth="1.5" />
      
      {/* Decorative inner handprints for wings */}
      <path d="M55,40 C52,38 52,30 55,25 C58,22 62,25 60,30 C60,30 65,22 70,25 C75,28 70,35 68,38 C68,38 75,32 80,38 C83,42 75,48 70,48 C70,48 78,50 78,55 C78,60 68,58 65,55 C65,55 65,65 60,65 C55,65 55,58 58,50 C58,50 52,55 50,50 Z" 
        fill="currentColor" fillOpacity="0.1" stroke="none" />
      <path d="M45,40 C48,38 48,30 45,25 C42,22 38,25 40,30 C40,30 35,22 30,25 C25,28 30,35 32,38 C32,38 25,32 20,38 C17,42 25,48 30,48 C30,48 22,50 22,55 C22,60 32,58 35,55 C35,55 35,65 40,65 C45,65 45,58 42,50 C42,50 48,55 50,50 Z" 
        fill="currentColor" fillOpacity="0.1" stroke="none" />
    </svg>
  );
}

export function AnimatedWatercolorButterfly({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <motion.svg 
      viewBox="0 0 100 100" 
      className={className} 
      style={{ ...style, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }}
      animate={{ y: [0, -15, 0], rotate: [0, 2, -2, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Right Wing */}
      <motion.g 
        style={{ transformOrigin: '50px 50px' }}
        animate={{ scaleX: [1, 0.3, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M50 20 Q55 10 65 15 Q75 20 65 40 Q75 45 80 60 Q85 75 60 70 Q55 60 50 50 Z" 
          stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" 
          fill="var(--gold)" fillOpacity="0.15" />
        <path d="M55,40 C52,38 52,30 55,25 C58,22 62,25 60,30 C60,30 65,22 70,25 C75,28 70,35 68,38 C68,38 75,32 80,38 C83,42 75,48 70,48 C70,48 78,50 78,55 C78,60 68,58 65,55 C65,55 65,65 60,65 C55,65 55,58 58,50 C58,50 52,55 50,50 Z" 
          fill="var(--gold)" fillOpacity="0.3" stroke="none" />
      </motion.g>

      {/* Left Wing */}
      <motion.g 
        style={{ transformOrigin: '50px 50px' }}
        animate={{ scaleX: [1, 0.3, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
      >
        <path d="M50 50 Q45 60 40 70 Q15 75 20 60 Q25 45 35 40 Q25 20 35 15 Q45 10 50 20 Z" 
          stroke="currentColor" strokeWidth="1" strokeDasharray="4 2" 
          fill="var(--bloom)" fillOpacity="0.15" />
        <path d="M45,40 C48,38 48,30 45,25 C42,22 38,25 40,30 C40,30 35,22 30,25 C25,28 30,35 32,38 C32,38 25,32 20,38 C17,42 25,48 30,48 C30,48 22,50 22,55 C22,60 32,58 35,55 C35,55 35,65 40,65 C45,65 45,58 42,50 C42,50 48,55 50,50 Z" 
          fill="var(--bloom)" fillOpacity="0.3" stroke="none" />
      </motion.g>

      {/* Body & Antennae */}
      <path d="M50 20 L50 80" stroke="currentColor" strokeWidth="2.5" />
      <path d="M50 20 Q42 5 35 10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M50 20 Q58 5 65 10" stroke="currentColor" strokeWidth="1.5" />
    </motion.svg>
  );
}
