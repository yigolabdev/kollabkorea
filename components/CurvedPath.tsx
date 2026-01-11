/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

/**
 * CurvedPath Component
 * KOLLAB Red를 활용한 아크형 패스 애니메이션
 * Seoul × LA 여정을 시각화하는 곡선 연결선
 * 완벽한 대칭: 시작점과 끝점의 Y 좌표 동일 (40)
 * 콘텐츠와 Y축 겹침: 곡선이 5개 콘텐츠의 아이콘 중심을 관통
 * 굴곡 증가: Control Point Y=10 (더 큰 아치)
 */
const CurvedPath: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="glow-kollab-red" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          {/* 이동 점 글로우 효과 */}
          <filter id="particle-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* 
           완벽한 대칭 곡선 - 아이콘 중심을 관통:
           곡선이 콘텐츠의 Y축과 완전히 겹침
           Start: (10, 40) - 첫 번째 노드 아이콘 중심 (top: 40%)
           Control: (50, 10) - 중앙 정점 (더 큰 굴곡)
           End: (90, 40) - 다섯 번째 노드 아이콘 중심 (top: 40%)
        */}
        
        {/* Glow Layer - KOLLAB Red */}
        <path
          d="M 10,40 Q 50,10 90,40"
          fill="none"
          stroke="#dc0000"
          strokeWidth="0.8"
          strokeLinecap="round"
          className="opacity-20"
          filter="url(#glow-kollab-red)"
          vectorEffect="non-scaling-stroke"
        />

        {/* Animated Dashed Line - KOLLAB Red */}
        <path
          d="M 10,40 Q 50,10 90,40"
          fill="none"
          stroke="#dc0000" 
          strokeWidth="0.3"
          strokeLinecap="round"
          strokeDasharray="1.2 1.2"
          className="opacity-100"
          vectorEffect="non-scaling-stroke"
        >
          <animate 
             attributeName="stroke-dashoffset" 
             from="20" 
             to="0" 
             dur="20s" 
             repeatCount="indefinite" 
             calcMode="linear"
          />
        </path>
        
        {/* Solid Core Line - Darker KOLLAB Red */}
        <path
          d="M 10,40 Q 50,10 90,40"
          fill="none"
          stroke="#b80000"
          strokeWidth="0.15"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* Moving Particle - KOLLAB Red (원형 유지) */}
        <circle 
          r="0.8" 
          fill="#dc0000"
          filter="url(#particle-glow)"
          className="opacity-90"
          vectorEffect="non-scaling-stroke"
        >
          <animateMotion 
            dur="7s" 
            begin="0s" 
            repeatCount="indefinite" 
            path="M 10,40 Q 50,10 90,40" 
          />
        </circle>
        
        {/* Additional Particle for better visibility (원형 유지) */}
        <circle 
          r="0.45" 
          fill="#ffffff"
          className="opacity-80"
          vectorEffect="non-scaling-stroke"
        >
          <animateMotion 
            dur="7s" 
            begin="0s" 
            repeatCount="indefinite" 
            path="M 10,40 Q 50,10 90,40" 
          />
        </circle>
      </svg>
    </div>
  );
};

export default CurvedPath;

