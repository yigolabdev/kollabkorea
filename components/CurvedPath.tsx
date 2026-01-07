/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

/**
 * CurvedPath Component
 * KOLLAB Red를 활용한 아크형 패스 애니메이션
 * Seoul × LA 여정을 시각화하는 곡선 연결선
 * 완벽한 대칭: 시작점과 끝점의 Y 좌표 동일 (59)
 */
const CurvedPath: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none -z-0 hidden md:block">
      <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
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
           완벽한 대칭 곡선:
           Start: (10, 59) - 첫 번째 노드
           Control: (50, 20) - 중앙 정점
           End: (90, 59) - 다섯 번째 노드 (첫 번째와 동일한 Y 좌표)
        */}
        
        {/* Glow Layer - KOLLAB Red */}
        <path
          d="M 10,59 Q 50,20 90,59"
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
          d="M 10,59 Q 50,20 90,59"
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
          d="M 10,59 Q 50,20 90,59"
          fill="none"
          stroke="#b80000"
          strokeWidth="0.15"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* Moving Particle - KOLLAB Red (동그란 점) */}
        <circle 
          r="0.6" 
          fill="#dc0000"
          filter="url(#particle-glow)"
          className="opacity-90"
        >
          <animateMotion 
            dur="5s" 
            begin="0s" 
            repeatCount="indefinite" 
            path="M 10,59 Q 50,20 90,59" 
          />
        </circle>
        
        {/* Additional Particle for better visibility */}
        <circle 
          r="0.35" 
          fill="#ffffff"
          className="opacity-80"
        >
          <animateMotion 
            dur="5s" 
            begin="0s" 
            repeatCount="indefinite" 
            path="M 10,59 Q 50,20 90,59" 
          />
        </circle>
      </svg>
    </div>
  );
};

export default CurvedPath;

