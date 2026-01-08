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
        relative group text-center
        transition-all duration-300 ease-out
        ${isHovered ? 'scale-105' : 'scale-100'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        // 아이콘을 절대 기준점으로 설정
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* Icon Section - KOLLAB Black Round Box (곡선 위 - z-30) */}
      {/* 이 아이콘이 정확히 곡선 위에 위치하도록 부모의 translate(-50%, -50%)가 적용됨 */}
      <div className="relative z-30" style={{ flexShrink: 0 }}>
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
      </div>

      {/* Content - KOLLAB Typography (곡선 아래 - z-10) */}
      <div className={`
        relative flex flex-col items-center mt-8 z-10
        transition-all duration-300
        ${isHovered ? '-translate-y-1' : ''}
      `}>
        {/* Thin line connecting icon to content */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[1px] h-8 bg-gradient-to-b from-kollab-red/50 to-transparent -z-10" />

        {/* Title - Inter Black */}
        <h3 className="text-lg md:text-xl font-black text-kollab-black leading-tight tracking-tight drop-shadow-sm whitespace-nowrap">
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

