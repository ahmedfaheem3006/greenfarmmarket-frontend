import React from 'react';
import { motion } from 'framer-motion';

export const SpiderwebMeshAnimation: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none opacity-70 dark:opacity-80"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 650"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Subtle Dot Grid Matrix */}
          <pattern id="spider-dot-grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" className="fill-slate-400/30 dark:fill-emerald-400/20" />
          </pattern>

          {/* Gradients for 5 Primary Glowing Web Cables */}
          <linearGradient id="web-grad-emerald" x1="0%" y1="50%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.15" />
          </linearGradient>

          <linearGradient id="web-grad-sky" x1="0%" y1="50%" x2="100%" y2="25%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.15" />
          </linearGradient>

          <linearGradient id="web-grad-amber" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.15" />
          </linearGradient>

          <linearGradient id="web-grad-rose" x1="0%" y1="50%" x2="100%" y2="75%">
            <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.15" />
          </linearGradient>

          <linearGradient id="web-grad-purple" x1="0%" y1="50%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.15" />
          </linearGradient>

          {/* Radial Mesh Gradient Origin */}
          <radialGradient id="mesh-center-glow" cx="50" cy="325" r="320" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.28" />
            <stop offset="60%" stopColor="#38BDF8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Background Dot Grid */}
        <rect width="100%" height="100%" fill="url(#spider-dot-grid)" />

        {/* Ambient Center Glow */}
        <circle cx="50" cy="325" r="300" fill="url(#mesh-center-glow)" />

        {/* ========================================================================= */}
        {/* 2. EXACTLY 5 CONCENTRIC SPIDERWEB ARCS (5 شبكات عنكبوتية دائرية متداخلة) */}
        {/* ========================================================================= */}

        {/* Ring 1 - Innermost (الأولى) */}
        <path
          id="web-arc-1"
          d="M 50 210 Q 140 325 50 440"
          className="stroke-emerald-500/35 dark:stroke-emerald-400/40"
          strokeWidth="1.4"
          strokeDasharray="4 3"
          fill="none"
        />

        {/* Ring 2 - Mid-Inner (الثانية) */}
        <path
          id="web-arc-2"
          d="M 50 155 Q 230 325 50 495"
          className="stroke-sky-500/35 dark:stroke-sky-400/40"
          strokeWidth="1.4"
          strokeDasharray="4 4"
          fill="none"
        />

        {/* Ring 3 - Center (الثالثة) */}
        <path
          id="web-arc-3"
          d="M 50 100 Q 320 325 50 550"
          className="stroke-amber-500/30 dark:stroke-amber-400/35"
          strokeWidth="1.4"
          strokeDasharray="5 4"
          fill="none"
        />

        {/* Ring 4 - Mid-Outer (الرابعة) */}
        <path
          id="web-arc-4"
          d="M 50 45 Q 410 325 50 605"
          className="stroke-rose-500/30 dark:stroke-rose-400/35"
          strokeWidth="1.4"
          strokeDasharray="5 5"
          fill="none"
        />

        {/* Ring 5 - Outermost (الخامسة) */}
        <path
          id="web-arc-5"
          d="M 110 5 Q 510 325 110 645"
          className="stroke-purple-500/30 dark:stroke-purple-400/35"
          strokeWidth="1.4"
          strokeDasharray="6 5"
          fill="none"
        />

        {/* 3. Spiderweb Cross-Connecting Radial Filaments */}
        <line x1="140" y1="120" x2="230" y2="210" className="stroke-emerald-500/25 dark:stroke-emerald-400/30" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="230" y1="210" x2="320" y2="325" className="stroke-sky-500/25 dark:stroke-sky-400/30" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="320" y1="325" x2="230" y2="440" className="stroke-rose-500/25 dark:stroke-rose-400/30" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="230" y1="440" x2="140" y2="530" className="stroke-purple-500/25 dark:stroke-purple-400/30" strokeWidth="1" strokeDasharray="3 3" />

        {/* ========================================================================= */}
        {/* 4. THE 5 PRIMARY RADIATING TENDRIL CABLES TO THE 5 CARDS */}
        {/* ========================================================================= */}
        
        {/* Cable 1 -> Gate 1 (Top / Marketplace) */}
        <path
          id="web-line-1"
          d="M 50 325 C 220 325 380 90 950 65"
          stroke="url(#web-grad-emerald)"
          strokeWidth="2.2"
          fill="none"
        />

        {/* Cable 2 -> Gate 2 (Upper Middle / Transport) */}
        <path
          id="web-line-2"
          d="M 50 325 C 260 325 440 210 950 195"
          stroke="url(#web-grad-sky)"
          strokeWidth="2.2"
          fill="none"
        />

        {/* Cable 3 -> Gate 3 (Center / Jobs) */}
        <path
          id="web-line-3"
          d="M 50 325 C 320 325 500 325 950 325"
          stroke="url(#web-grad-amber)"
          strokeWidth="2.2"
          fill="none"
        />

        {/* Cable 4 -> Gate 4 (Lower Middle / AI Doctor) */}
        <path
          id="web-line-4"
          d="M 50 325 C 260 325 440 440 950 455"
          stroke="url(#web-grad-rose)"
          strokeWidth="2.2"
          fill="none"
        />

        {/* Cable 5 -> Gate 5 (Bottom / News & Ticker) */}
        <path
          id="web-line-5"
          d="M 50 325 C 220 325 380 560 950 585"
          stroke="url(#web-grad-purple)"
          strokeWidth="2.2"
          fill="none"
        />

        {/* ========================================================================= */}
        {/* 5. ANIMATED GLOWING PHOTONS ON 5 PRIMARY CABLES */}
        {/* ========================================================================= */}

        {/* Photon 1: Emerald (Gate 1) */}
        <g>
          <animateMotion
            path="M 50 325 C 220 325 380 90 950 65"
            dur="3.6s"
            repeatCount="indefinite"
          />
          <circle cx="0" cy="0" r="5" className="fill-emerald-500 stroke-white dark:stroke-slate-900" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="9" className="fill-emerald-400/30" />
        </g>

        {/* Photon 2: Sky Blue (Gate 2) */}
        <g>
          <animateMotion
            path="M 50 325 C 260 325 440 210 950 195"
            dur="4.2s"
            repeatCount="indefinite"
            begin="0.7s"
          />
          <circle cx="0" cy="0" r="5" className="fill-sky-500 stroke-white dark:stroke-slate-900" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="9" className="fill-sky-400/30" />
        </g>

        {/* Photon 3: Amber (Gate 3) */}
        <g>
          <animateMotion
            path="M 50 325 C 320 325 500 325 950 325"
            dur="3.8s"
            repeatCount="indefinite"
            begin="1.4s"
          />
          <circle cx="0" cy="0" r="5" className="fill-amber-500 stroke-white dark:stroke-slate-900" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="9" className="fill-amber-400/30" />
        </g>

        {/* Photon 4: Rose (Gate 4) */}
        <g>
          <animateMotion
            path="M 50 325 C 260 325 440 440 950 455"
            dur="4.0s"
            repeatCount="indefinite"
            begin="0.4s"
          />
          <circle cx="0" cy="0" r="5" className="fill-rose-500 stroke-white dark:stroke-slate-900" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="9" className="fill-rose-400/30" />
        </g>

        {/* Photon 5: Purple (Gate 5) */}
        <g>
          <animateMotion
            path="M 50 325 C 220 325 380 560 950 585"
            dur="4.5s"
            repeatCount="indefinite"
            begin="1.1s"
          />
          <circle cx="0" cy="0" r="5" className="fill-purple-500 stroke-white dark:stroke-slate-900" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="9" className="fill-purple-400/30" />
        </g>

        {/* ========================================================================= */}
        {/* 6. ANIMATED PHOTONS ON THE 5 CONCENTRIC ARCS */}
        {/* ========================================================================= */}

        {/* Photon on Arc 1 */}
        <g>
          <animateMotion
            path="M 50 210 Q 140 325 50 440"
            dur="4.5s"
            repeatCount="indefinite"
            begin="0.1s"
          />
          <circle cx="0" cy="0" r="3.5" className="fill-emerald-400 stroke-white dark:stroke-slate-900" strokeWidth="1" />
        </g>

        {/* Photon on Arc 2 */}
        <g>
          <animateMotion
            path="M 50 155 Q 230 325 50 495"
            dur="5.2s"
            repeatCount="indefinite"
            begin="1.0s"
          />
          <circle cx="0" cy="0" r="3.5" className="fill-sky-400 stroke-white dark:stroke-slate-900" strokeWidth="1" />
        </g>

        {/* Photon on Arc 3 */}
        <g>
          <animateMotion
            path="M 50 550 Q 320 325 50 100"
            dur="5.8s"
            repeatCount="indefinite"
            begin="2.0s"
          />
          <circle cx="0" cy="0" r="3.5" className="fill-amber-400 stroke-white dark:stroke-slate-900" strokeWidth="1" />
        </g>

        {/* Photon on Arc 4 */}
        <g>
          <animateMotion
            path="M 50 45 Q 410 325 50 605"
            dur="6.5s"
            repeatCount="indefinite"
            begin="0.5s"
          />
          <circle cx="0" cy="0" r="3.5" className="fill-rose-400 stroke-white dark:stroke-slate-900" strokeWidth="1" />
        </g>

        {/* Photon on Arc 5 */}
        <g>
          <animateMotion
            path="M 110 645 Q 510 325 110 5"
            dur="7.0s"
            repeatCount="indefinite"
            begin="1.5s"
          />
          <circle cx="0" cy="0" r="3.5" className="fill-purple-400 stroke-white dark:stroke-slate-900" strokeWidth="1" />
        </g>

        {/* ========================================================================= */}
        {/* 7. CENTRAL COMMAND HUB (PULSING MULTI-RING EMITTER) */}
        {/* ========================================================================= */}
        <g transform="translate(50, 325)">
          {/* Ring 1 */}
          <motion.circle
            cx="0"
            cy="0"
            r="18"
            className="stroke-emerald-500/70 dark:stroke-emerald-400/85"
            strokeWidth="1.6"
            fill="none"
            animate={{ scale: [1, 2.5, 1], opacity: [0.85, 0, 0.85] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Ring 2 */}
          <motion.circle
            cx="0"
            cy="0"
            r="11"
            className="stroke-sky-500/70 dark:stroke-sky-400/85"
            strokeWidth="1.6"
            fill="none"
            animate={{ scale: [1, 1.9, 1], opacity: [0.9, 0.1, 0.9] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          />

          {/* Core Central Node */}
          <circle cx="0" cy="0" r="6.5" className="fill-emerald-500 shadow-md stroke-white dark:stroke-slate-900" strokeWidth="2" />
        </g>

        {/* Intersecting Node Pins along the 5 Arcs */}
        <circle cx="140" cy="210" r="3" className="fill-emerald-400/80" />
        <circle cx="230" cy="210" r="3.5" className="fill-sky-400/80" />
        <circle cx="320" cy="325" r="4.5" className="fill-amber-400/80" />
        <circle cx="230" cy="440" r="3.5" className="fill-rose-400/80" />
        <line x1="140" y1="440" x2="140" y2="440" />
        <circle cx="140" cy="440" r="3" className="fill-purple-400/80" />
      </svg>
    </div>
  );
};
