import React, { useState } from 'react';
import { StageData } from '../types';

interface StageCardProps {
  data: StageData;
  isEven: boolean;
}

const StageCard: React.FC<StageCardProps> = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`
        relative group flex flex-col items-center text-center
        transition-all duration-500 ease-out z-10
        ${isHovered ? 'scale-105 z-50' : 'scale-100'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 
         Structure:
         1. Icon Box (Black, rounded)
         2. Spacer Line (Connects Icon to Anchor)
         3. Text Content (Floating below or around)
      */}

      {/* Icon Section - Black Round Box */}
      <div className="relative mb-3">
        <div className={`
          relative z-10 p-5 rounded-2xl bg-black shadow-2xl text-white
          border border-neutral-800
        `}>
          <data.Icon size={28} strokeWidth={1.5} />
          
          {/* Subtle gloss effect on the black button */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-50 pointer-events-none" />
        </div>
        
        {/* Shadow/Glow behind icon - Static now */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-black/30 blur-xl rounded-full -z-10" />
      </div>

      {/* Content - Floating Text */}
      <div className={`
        relative flex flex-col items-center
        transition-all duration-300
        ${isHovered ? '-translate-y-1' : ''}
      `}>
        <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight tracking-tight drop-shadow-sm">
          {data.title}
        </h3>
        <p className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-red-600 uppercase mt-1 mb-2">
          {data.subtitle}
        </p>

        {/* Divider */}
        <div className="w-8 h-0.5 bg-black/10 my-1 group-hover:w-16 transition-all duration-500" />

        <ul className="space-y-1 mt-2">
          {data.description.map((item, idx) => (
            <li key={idx} className="text-xs md:text-sm font-medium text-slate-600/90 whitespace-nowrap">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Connection Anchor (The dot on the line) */}
      <div className={`
        absolute -bottom-8 w-3 h-3 rounded-full bg-red-600 border-2 border-white shadow-md
        transition-all duration-300 group-hover:scale-150 group-hover:bg-black
      `} />
      
      {/* Thin line connecting content to the curve anchor */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[1px] h-8 bg-gradient-to-b from-transparent to-red-400/50 -z-10" />
    </div>
  );
};

export default StageCard;