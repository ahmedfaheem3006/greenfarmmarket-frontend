import React, { useRef, useState } from 'react';

export interface BorderGlowProps {
  children: React.ReactNode;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number | string;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const BorderGlow: React.FC<BorderGlowProps> = ({
  children,
  edgeSensitivity = 30,
  glowColor,
  backgroundColor,
  borderRadius = 24,
  glowRadius = 45,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = ['#00C896', '#25D5AB', '#6EE7B7'],
  className = '',
  style = {},
  onClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const radiusNum = typeof borderRadius === 'number' ? borderRadius : parseInt(borderRadius as string, 10) || 24;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPosition({ x, y });
    setIsHovered(true);
    setOpacity(glowIntensity);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOpacity(0);
  };

  const primaryGlowColor = colors[1] || colors[0] || '#25D5AB';
  const secondaryGlowColor = colors[0] || '#00C896';
  const accentGlowColor = colors[2] || colors[1] || '#6EE7B7';

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`group relative p-[1.5px] transition-all duration-300 ${className}`}
      style={{
        borderRadius: `${radiusNum}px`,
        ...style,
      }}
    >
      {/* 1. Base Ambient Border with soft outline */}
      <div
        className="absolute inset-0 transition-all duration-500 pointer-events-none"
        style={{
          borderRadius: `${radiusNum}px`,
          background: animated
            ? `conic-gradient(from 0deg, ${colors.join(', ')}, ${colors[0]})`
            : undefined,
          opacity: animated ? 0.75 : isHovered ? 0.35 : 0.18,
          border: `1px solid ${primaryGlowColor}33`,
        }}
      />

      {/* 2. Interactive Cursor Tracking Radial Glow on Border */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-200 ease-out"
        style={{
          borderRadius: `${radiusNum}px`,
          opacity: isHovered ? opacity : animated ? 0.7 : 0,
          background: isHovered
            ? `radial-gradient(${glowRadius * 4.5}px circle at ${position.x}px ${position.y}px, ${primaryGlowColor} 0%, ${secondaryGlowColor} 35%, ${accentGlowColor} 60%, transparent 85%)`
            : undefined,
        }}
      />

      {/* 3. Outer Ambient Edge Flare / Neon Diffusion */}
      <div
        className="absolute -inset-[1.5px] pointer-events-none transition-opacity duration-300 blur-[8px]"
        style={{
          borderRadius: `${radiusNum + 2}px`,
          opacity: isHovered ? glowIntensity * 0.55 : animated ? 0.35 : 0,
          background: isHovered
            ? `radial-gradient(${glowRadius * 3.5}px circle at ${position.x}px ${position.y}px, ${primaryGlowColor} 0%, ${secondaryGlowColor} 50%, transparent 80%)`
            : undefined,
        }}
      />

      {/* 4. Main Card Content Wrapper (Dark & Light Mode Adaptive) */}
      <div
        className={`relative w-full h-full overflow-hidden transition-all duration-300 ${
          !backgroundColor ? 'bg-white dark:bg-[#0a120e]' : ''
        }`}
        style={{
          borderRadius: `${radiusNum - 1.5}px`,
          backgroundColor: backgroundColor || undefined,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;
