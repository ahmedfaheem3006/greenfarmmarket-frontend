import React from 'react';
import { Badge } from './Badge';

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlightText?: string;
  description?: string;
  centered?: boolean;
  badgeVariant?: 'green' | 'red' | 'blue' | 'amber' | 'neutral';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  highlightText,
  description,
  centered = true,
  badgeVariant = 'green',
  className = '',
}) => {
  return (
    <div className={`space-y-3 max-w-3xl ${centered ? 'mx-auto text-center' : 'text-right'} ${className}`}>
      {eyebrow && (
        <div className={`flex ${centered ? 'justify-center' : 'justify-start'} mb-3`}>
          <Badge variant={badgeVariant}>{eyebrow}</Badge>
        </div>
      )}
      <div className="w-full">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-relaxed sm:leading-[1.4] py-1 text-gradient-rgb">
          {title}{' '}
          {highlightText && (
            <span>
              {highlightText}
            </span>
          )}
        </h2>
      </div>
      {description && (
        <p className="text-text-secondary text-sm md:text-base leading-[1.85] max-w-2xl mx-auto font-medium mt-3">
          {description}
        </p>
      )}
    </div>
  );
};
