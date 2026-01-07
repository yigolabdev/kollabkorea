/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

/**
 * Background Component
 * KOLLAB 브랜드 디자인 시스템 적용 - 베이지/실버 기반 그라데이션
 */
const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 bg-kollab-beige">
      {/* Mesh Gradients - KOLLAB 디자인 시스템 컬러 활용 */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-kollab-red/20 rounded-full blur-[120px] animate-pulse" 
      />
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-kollab-silver/40 rounded-full blur-[120px] animate-pulse" 
        style={{ animationDelay: '2s' }} 
      />
      <div 
        className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-zinc-300/30 rounded-full blur-[100px] animate-pulse" 
        style={{ animationDelay: '4s' }} 
      />
      
      {/* Noise Texture for density */}
      <div 
        className="absolute inset-0 opacity-[0.4]" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")` 
        }} 
      />
    </div>
  );
};

export default Background;

