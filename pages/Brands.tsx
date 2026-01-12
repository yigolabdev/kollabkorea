
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { brandsContentEn } from '../content/brands.en';
import { brandsContentKo } from '../content/brands.ko';
import { containerVariants, itemVariants } from '../utils/animations';
import { highlightBrandName } from '../utils/text';
import type { BrandPartner } from '../types';

interface BrandsProps {
  navigateTo: (page: string) => void;
}

const renderBrandNameBold = (text: string): React.ReactNode => {
  const parts = highlightBrandName(text);
  return parts.map((part, i) => {
    if (part.bold) {
      return (
        <span key={`brand-${i}`} className="font-extrabold">
          {part.text}
        </span>
      );
    }
    return <React.Fragment key={`text-${i}`}>{part.text}</React.Fragment>;
  });
};

const Brands: React.FC<BrandsProps> = ({ navigateTo }) => {
  const { language } = useLanguage();
  const content = language === 'ko' ? brandsContentKo : brandsContentEn;
  const marqueeDurationSec = 80;

  // 퍼센트 기반 이동은 뷰포트/갭/이미지 로딩에 따라 루프가 끊겨 보일 수 있어,
  // 실제 트랙 폭(px)을 측정해서 정확히 1사이클만큼 이동하는 방식으로 고정.
  const firstRowTrackRef = useRef<HTMLDivElement | null>(null);
  const secondRowTrackRef = useRef<HTMLDivElement | null>(null);
  const [firstCyclePx, setFirstCyclePx] = useState<number>(0);
  const [secondCyclePx, setSecondCyclePx] = useState<number>(0);
  
  // LA Partner logos - 40개 이미지
  const laPartners: BrandPartner[] = Array.from({ length: 40 }, (_, i) => ({
    logo: `/BrandLogo/la-popup-logo${String(i + 1).padStart(2, '0')}.png`,
    name: `Brand ${i + 1}`
  }));
  
  // 첫 번째 줄: 20개 (좌로 이동)
  const firstRow = laPartners.slice(0, 20);
  // 두 번째 줄: 20개를 역순으로 (logo40→logo21 순서, 우로 이동)
  const secondRow = [...laPartners.slice(20, 40)].reverse();
  
  // 무한 루프를 위해 각 줄을 3번 복제 (완벽한 공백 제거)
  const firstRowDuplicated = [...firstRow, ...firstRow, ...firstRow];
  const secondRowDuplicated = [...secondRow, ...secondRow, ...secondRow];

  // 1사이클(px) 측정: 3번 복제했으므로 scrollWidth / 3
  useEffect(() => {
    const measure = () => {
      const firstEl = firstRowTrackRef.current;
      const secondEl = secondRowTrackRef.current;
      if (firstEl) setFirstCyclePx(firstEl.scrollWidth / 3);
      if (secondEl) setSecondCyclePx(secondEl.scrollWidth / 3);
    };

    // 이미지 로딩 이후 폭이 바뀔 수 있어 1회 지연 측정
    const t = window.setTimeout(measure, 0);
    window.addEventListener('resize', measure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('resize', measure);
    };
  }, [firstRowDuplicated.length, secondRowDuplicated.length]);
  
  
  return (
    <div className="px-6 max-w-7xl mx-auto pt-12 md:pt-18 pb-24">
      {/* Hero title block (centered text + full-width line aligned to grid edges) */}
      <div className="bg-white text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block text-left text-3xl md:text-6xl font-bold text-black leading-[0.95] tracking-normal"
        >
          {content.hero.titleLines[0]}<br />{content.hero.titleLines[1]}
        </motion.h2>
        <div className="mt-12 h-px w-full bg-black" />
      </div>

      {/* Hero deck (below the line, centered above the grid) */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className={`mt-12 md:mt-16 mb-8 md:mb-10 text-center text-xl md:text-3xl font-semibold text-black ${
          language === 'ko' ? 'tracking-[0.01em] break-keep' : 'tracking-[0.02em]'
        }`}
      >
        {renderBrandNameBold(content.hero.deck)}
      </motion.p>

      {/* CTA Text - 입점 유도 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-12 md:mt-16 mb-8 md:mb-12 text-center"
      >
        <p className={`text-base md:text-xl font-semibold text-black/70 leading-relaxed ${language === 'ko' ? 'break-keep' : ''}`}>
          {language === 'ko' 
            ? 'Seoul에서 시작해 LA로, 당신의 브랜드를 글로벌 무대로 연결합니다.'
            : 'From Seoul to LA, connecting your brand to the global stage.'}
        </p>
        <motion.button
          onClick={() => navigateTo('CONTACT')}
          className="mt-6 px-10 py-3 text-sm font-extrabold tracking-[0.2em] bg-transparent text-black border-2 border-black/20 hover:border-black hover:bg-black hover:text-white transition-all duration-300"
        >
          {language === 'ko' ? 'APPLY NOW' : 'APPLY NOW'}
        </motion.button>
      </motion.div>

      {/* KOLLAB KOREA partners - Coming Soon Grid */}
      <div>
        {/* Grid Container with Text Overlay */}
        <div className="relative">
          {/* Grid as background */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-4 md:grid-cols-8 gap-px bg-black/10 border border-black/10"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={`korea-soon-${i}`}
                variants={itemVariants}
                className="aspect-square bg-[#EDEBE4] flex items-center justify-center relative"
              >
                {/* Very subtle dashed border inside each cell */}
                <div className="absolute inset-4 border border-dashed border-black/10" />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Opening Soon text overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-2xl md:text-4xl font-extrabold text-black/40 tracking-tight uppercase text-center px-4">
              Your Brand Here
            </p>
          </div>
        </div>
      </div>

      {/* KOLLAB LA partners (with infinite scroll animation) */}
      <div className="mt-24 md:mt-32">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className={`mb-10 md:mb-12 text-center text-xl md:text-3xl font-semibold text-black ${
            language === 'ko' ? 'tracking-[0.01em] break-keep' : 'tracking-[0.02em]'
          }`}
        >
          {renderBrandNameBold(language === 'ko' ? 'KOLLAB LA 협력사' : content.laPartnersTitle || 'KOLLAB LA Partners')}
        </motion.p>

        {/* 첫 번째 줄: 좌 → 우 */}
        <div 
          className="relative overflow-hidden mb-2"
        >
          <motion.div
            className="flex gap-2"
            ref={firstRowTrackRef}
            animate={firstCyclePx > 0 ? { x: [0, -firstCyclePx] } : { x: 0 }}
            transition={{
              x: {
                duration: marqueeDurationSec,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear',
              },
            }}
          >
            {firstRowDuplicated.map((item, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 w-[150px] h-[150px] md:w-[180px] md:h-[180px] bg-white flex items-center justify-center"
              >
                <img 
                  src={item.logo} 
                  alt={item.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>
            ))}
          </motion.div>
          
          {/* 좌측 그라데이션 */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          
          {/* 우측 그라데이션 */}
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>

        {/* 두 번째 줄: 우 → 좌 */}
        <div 
          className="relative overflow-hidden"
        >
          <motion.div
            className="flex gap-2"
            ref={secondRowTrackRef}
            animate={secondCyclePx > 0 ? { x: [-secondCyclePx, 0] } : { x: 0 }}
            transition={{
              x: {
                duration: marqueeDurationSec,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear',
              },
            }}
          >
            {secondRowDuplicated.map((item, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 w-[150px] h-[150px] md:w-[180px] md:h-[180px] bg-white flex items-center justify-center"
              >
                <img 
                  src={item.logo} 
                  alt={item.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>
            ))}
          </motion.div>
          
          {/* 좌측 그라데이션 */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          
          {/* 우측 그라데이션 */}
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
        </div>
      </div>

    </div>
  );
};

export default Brands;
