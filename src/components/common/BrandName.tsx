import React from 'react';

interface BrandNameProps {
  lang?: 'ar' | 'en' | 'both';
  className?: string;
}

export const BrandName: React.FC<BrandNameProps> = ({ lang = 'ar', className = '' }) => {
  if (lang === 'en') {
    return (
      <span className={`inline-flex items-center gap-1.5 font-black ${className}`} dir="ltr">
        <span className="text-brand-green">Green</span>
        <span className="text-brand-red">Farm</span>
        <span className="text-brand-blue">Market</span>
      </span>
    );
  }

  if (lang === 'both') {
    return (
      <span className={`inline-flex flex-wrap items-center gap-1.5 font-black ${className}`}>
        <span className="text-brand-green">جرين</span>
        <span className="text-brand-red">فارم</span>
        <span className="text-brand-blue">ماركت</span>
        <span className="text-text-secondary font-normal mx-1">|</span>
        <span className="inline-flex items-center gap-1" dir="ltr">
          <span className="text-brand-green">Green</span>
          <span className="text-brand-red">Farm</span>
          <span className="text-brand-blue">Market</span>
        </span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 font-black ${className}`}>
      <span className="text-brand-green">جرين</span>
      <span className="text-brand-red">فارم</span>
      <span className="text-brand-blue">ماركت</span>
    </span>
  );
};
