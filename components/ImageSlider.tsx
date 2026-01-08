/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * ImageSlider Component
 * 좌에서 우로 자동으로 흐르는 이미지 슬라이드
 * LA 팝업 이미지를 무한 반복 표시
 * 모바일: portrait, PC: landscape
 */

const LA_POPUP_LANDSCAPE = [
  '/assets/photos/la-popup/landscape/kollab-la-popup-landscape-01.jpeg',
  '/assets/photos/la-popup/landscape/kollab-la-popup-landscape-02.jpeg',
  '/assets/photos/la-popup/landscape/kollab-la-popup-landscape-03.jpeg',
  '/assets/photos/la-popup/landscape/kollab-la-popup-landscape-04.jpeg',
  '/assets/photos/la-popup/landscape/kollab-la-popup-landscape-05.jpeg',
  '/assets/photos/la-popup/landscape/kollab-la-popup-landscape-06.jpeg',
  '/assets/photos/la-popup/landscape/kollab-la-popup-landscape-07.jpeg',
  '/assets/photos/la-popup/landscape/kollab-la-popup-landscape-08.jpeg',
];

const LA_POPUP_PORTRAIT = [
  '/assets/photos/la-popup/portrait/kollab-la-popup-portrait-01.jpeg',
  '/assets/photos/la-popup/portrait/kollab-la-popup-portrait-02.jpeg',
  '/assets/photos/la-popup/portrait/kollab-la-popup-portrait-03.jpeg',
  '/assets/photos/la-popup/portrait/kollab-la-popup-portrait-04.jpeg',
  '/assets/photos/la-popup/portrait/kollab-la-popup-portrait-05.jpeg',
  '/assets/photos/la-popup/portrait/kollab-la-popup-portrait-06.jpeg',
  '/assets/photos/la-popup/portrait/kollab-la-popup-portrait-07.jpeg',
];

const ImageSlider: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 모바일: portrait, PC: landscape
  const images = isMobile ? LA_POPUP_PORTRAIT : LA_POPUP_LANDSCAPE;
  
  // 이미지를 20번 복제하여 검정 배경이 절대 안 보이도록 완벽한 무한 루프
  const duplicatedImages = Array(20).fill(images).flat();

  return (
    <section 
      className="w-full overflow-hidden bg-white py-48 md:py-64"
    >
      <div className="relative h-[35.7vh] md:h-[40.95vh]">
        {/* 슬라이드 컨테이너 */}
        <motion.div
          className="flex absolute left-0 top-0 h-full gap-4"
          animate={{
            x: [0, -100 * images.length + '%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 1200, // 1200초 (20분) - 기존 1680초에서 약 28% 빠르게
              ease: 'linear',
            },
          }}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={`slide-${index}`}
              className="flex-shrink-0 h-full px-2"
            >
              <img
                src={src}
                alt={`KOLLAB LA popup moment ${(index % images.length) + 1}`}
                className="w-auto h-full rounded-2xl shadow-lg object-cover"
                loading={index < 6 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </motion.div>

        {/* 좌측 그라데이션 오버레이 */}
        <div 
          className="absolute left-0 top-0 h-full w-32 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))'
          }}
        />
        
        {/* 우측 그라데이션 오버레이 */}
        <div 
          className="absolute right-0 top-0 h-full w-32 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))'
          }}
        />
      </div>
    </section>
  );
};

export default ImageSlider;

