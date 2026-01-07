/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StageData } from '../types';

interface StageCardProps {
  data: StageData;
  isEven: boolean;
}

/**
 * StageCard Component
 * KOLLAB 브랜드 디자인 시스템 적용
 * - 컬러: KOLLAB Black/Red
 * - 타이포그래피: Inter (Black/Semi-Bold)
 * - 애니메이션: 300ms (FAST)
 * - 정렬: 아이콘(이모티콘) 중심 기준
 */
const StageCard: React.FC<StageCardProps> = ({ data }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`
        relative group flex flex-col items-center text-center
        transition-all duration-300 ease-out z-10
        ${isHovered ? 'scale-105 z-50' : 'scale-100'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon Section - KOLLAB Black Round Box (곡선 위 앵커 포인트) */}
      <div className="relative">
        <div className={`
          relative z-10 p-5 rounded-2xl bg-kollab-black shadow-2xl text-white
          border border-zinc-800 hover:border-kollab-red transition-colors duration-300
        `}>
          <data.Icon size={28} strokeWidth={1.5} />
          
          {/* Subtle gloss effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-50 pointer-events-none" />
        </div>
        
        {/* Shadow/Glow behind icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-kollab-black/30 blur-xl rounded-full -z-10" />
        
        {/* Connection Anchor (The dot on the line) - KOLLAB Red */}
        <div className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-kollab-red border-2 border-white shadow-md
          transition-all duration-300 group-hover:scale-150 group-hover:bg-kollab-black pointer-events-none
        `} />
      </div>

      {/* Content - KOLLAB Typography (아이콘 아래로 배치) */}
      <div className={`
        relative flex flex-col items-center mt-8
        transition-all duration-300
        ${isHovered ? '-translate-y-1' : ''}
      `}>
        {/* Thin line connecting icon to content */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[1px] h-8 bg-gradient-to-b from-kollab-red/50 to-transparent -z-10" />

        {/* Title - Inter Black */}
        <h3 className="text-lg md:text-xl font-black text-kollab-black leading-tight tracking-tight drop-shadow-sm break-keep">
          {data.title}
        </h3>
        
        {/* Subtitle - Inter Bold + KOLLAB Red */}
        <p className="text-[10px] md:text-xs font-bold tracking-[0.15em] text-kollab-red uppercase mt-1 mb-2">
          {data.subtitle}
        </p>

        {/* Divider */}
        <div className="w-8 h-0.5 bg-kollab-black/10 my-1 group-hover:w-16 group-hover:bg-kollab-red transition-all duration-500" />

        {/* Description - Inter Semi-Bold */}
        <ul className="space-y-1 mt-2">
          {data.description.map((item, idx) => (
            <li key={idx} className="text-xs md:text-sm font-semibold text-zinc-700/90 whitespace-nowrap break-keep">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StageCard;

