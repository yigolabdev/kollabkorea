/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

/**
 * CurvedPath Component
 * KOLLAB Red를 활용한 연결선(데스크탑)
 * Seoul × LA 여정을 시각화하는 단순 라인(효과/애니메이션 제거)
 */
const CurvedPath: React.FC = () => {
  // Single source of truth for the journey line geometry (SVG viewBox coords)
  // - 직선은 quadratic control point를 선 위로 두면 동일하게 표현 가능
  // - 이후 곡선으로 바뀌더라도 아래 P0/P1/P2만 바꾸면 라인이 함께 변경됨
  const P0 = { x: 10, y: 35 };
  const P1 = { x: 50, y: 25 };
  const P2 = { x: 90, y: 35 };

  const bezierPoint = (t: number) => {
    const mt = 1 - t;
    const x = mt * mt * P0.x + 2 * mt * t * P1.x + t * t * P2.x;
    const y = mt * mt * P0.y + 2 * mt * t * P1.y + t * t * P2.y;
    return { x, y };
  };

  const POINT_T = [0, 0.25, 0.5, 0.75, 1] as const;
  const LINE_D = `M ${P0.x},${P0.y} Q ${P1.x},${P1.y} ${P2.x},${P2.y}`;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 hidden md:block">
      <svg
        data-journey-svg="true"
        className="w-full h-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* 
           직선 연결선:
           Start: (10, 35)
           End: (90, 35)
        */}
        
        {/* Simple Line (no effects) */}
        <path
          d={LINE_D}
          fill="none"
          stroke="#dc0000"
          strokeWidth="1"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* Solid red dots on the line (left→right). Always stays on the curve/line */}
        {POINT_T.map((t, idx) => {
          const { x, y } = bezierPoint(t);
          return (
            <circle
              key={`anchor-${idx}`}
              cx={x}
              cy={y}
              r="0.7"
              fill="#dc0000"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default CurvedPath;

