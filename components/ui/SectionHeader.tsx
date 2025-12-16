import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  accentWord?: string;
  tag?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  description,
  accentWord,
  tag,
  align = 'left',
  className = '',
}) => {
  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  };

  // accentWord가 있으면 title에서 해당 단어를 강조
  const renderTitle = () => {
    if (!accentWord) return title;
    
    const parts = title.split(accentWord);
    return (
      <>
        {parts[0]}
        <span className="text-kollab-red">{accentWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={`flex flex-col ${alignStyles[align]} ${className}`}>
      {tag && (
        <span className="text-kollab-red font-bold tracking-widest mb-4 text-sm md:text-base uppercase">
          {tag}
        </span>
      )}
      <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-none mb-6">
        {renderTitle()}
      </h2>
      {subtitle && (
        <p className="text-xl md:text-2xl font-bold text-zinc-400 mb-4">
          {subtitle}
        </p>
      )}
      {description && (
        <p className="text-base md:text-lg text-zinc-500 max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

