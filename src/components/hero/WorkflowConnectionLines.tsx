import React from 'react';
import { motion } from 'framer-motion';

export const WorkflowConnectionLines: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none opacity-70"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 600 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="dot-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" className="fill-slate-300/40 dark:fill-emerald-800/30" />
          </pattern>
        </defs>

        {/* Background Dot Grid */}
        <rect width="100%" height="100%" fill="url(#dot-grid)" />

        {/* Radiating Curved Lines originating from Left Center (text side) to Right Cards */}

        {/* Line 1 -> Card 1 (Top) */}
        <path
          d="M 0 250 C 150 250 250 80 500 70"
          className="stroke-emerald-400/40 dark:stroke-emerald-500/50"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Line 2 -> Card 2 (Upper Middle) */}
        <path
          d="M 0 250 C 180 250 280 180 500 170"
          className="stroke-rose-400/40 dark:stroke-rose-500/50"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Line 3 -> Card 3 (Lower Middle) */}
        <path
          d="M 0 250 C 180 250 280 320 500 270"
          className="stroke-sky-400/40 dark:stroke-sky-500/50"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Line 4 -> Card 4 (Bottom) */}
        <path
          d="M 0 250 C 150 250 250 420 500 380"
          className="stroke-emerald-400/40 dark:stroke-emerald-500/50"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Animated Glowing Circles Traveling Along Radiating Paths */}
        <g>
          <animateMotion
            path="M 0 250 C 150 250 250 80 500 70"
            dur="4.5s"
            repeatCount="indefinite"
          />
          <circle cx="0" cy="0" r="4" className="fill-emerald-500 stroke-white dark:stroke-slate-900" strokeWidth="1.5" />
        </g>

        <g>
          <animateMotion
            path="M 0 250 C 180 250 280 180 500 170"
            dur="5.2s"
            repeatCount="indefinite"
            begin="1s"
          />
          <circle cx="0" cy="0" r="4" className="fill-rose-500 stroke-white dark:stroke-slate-900" strokeWidth="1.5" />
        </g>

        <g>
          <animateMotion
            path="M 0 250 C 180 250 280 320 500 270"
            dur="4.8s"
            repeatCount="indefinite"
            begin="0.5s"
          />
          <circle cx="0" cy="0" r="4" className="fill-sky-500 stroke-white dark:stroke-slate-900" strokeWidth="1.5" />
        </g>

        <g>
          <animateMotion
            path="M 0 250 C 150 250 250 420 500 380"
            dur="5.5s"
            repeatCount="indefinite"
            begin="1.5s"
          />
          <circle cx="0" cy="0" r="4" className="fill-emerald-500 stroke-white dark:stroke-slate-900" strokeWidth="1.5" />
        </g>

        {/* Central Origin Node Pulse */}
        <g transform="translate(10, 250)">
          <motion.circle
            cx="0"
            cy="0"
            r="6"
            className="stroke-emerald-500/80 dark:stroke-emerald-400"
            strokeWidth="1.5"
            fill="none"
            animate={{ scale: [1, 2, 1], opacity: [0.8, 0, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <circle cx="0" cy="0" r="3.5" className="fill-emerald-500" />
        </g>
      </svg>
    </div>
  );
};
