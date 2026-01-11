
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
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
  
  // LA Partner logos with brand names
  const laPartners: BrandPartner[] = [
    { logo: '/assets/brands/la/LA01.png', name: 'OLIVE YOUNG' },
    { logo: '/assets/brands/la/LA02.png', name: 'Arencia' },
    { logo: '/assets/brands/la/LA03.png', name: 'MUZIGAE MANSION' },
    { logo: '/assets/brands/la/LA04.png', name: 'MUZMAK' },
    { logo: '/assets/brands/la/LA05.png', name: 'SELF BEAUTY' },
    { logo: '/assets/brands/la/LA06.png', name: 'DIFFER & DEEPER' },
    { logo: '/assets/brands/la/LA07.png', name: 'A mar da' },
    { logo: '/assets/brands/la/LA08.png', name: 'SAMPAR paris' },
    { logo: '/assets/brands/la/LA09.png', name: 'VANILLA TASTE' },
    { logo: '/assets/brands/la/LA10.png', name: 'shaishaishai' }
  ];
  
  // TBD 항목 생성
  const tbdItem: BrandPartner = { logo: null, name: 'TBD' };
  
  // 40개 브랜드 배열 (10개 실제 브랜드 + 30개 TBD)
  const allBrands = [
    ...laPartners,
    ...Array.from({ length: 30 }, () => tbdItem)
  ];
  
  // 첫 번째 줄: 20개 (좌 → 우)
  const firstRow = allBrands.slice(0, 20);
  // 두 번째 줄: 20개 (우 → 좌)
  const secondRow = allBrands.slice(20, 40);
  
  // 무한 루프를 위해 각 줄을 3번 복제
  const firstRowDuplicated = [...firstRow, ...firstRow, ...firstRow];
  const secondRowDuplicated = [...secondRow, ...secondRow, ...secondRow];
  
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
          <p className="text-2xl md:text-4xl font-extrabold text-black/40 tracking-tight uppercase">
            Your Brand Here
          </p>
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
          {renderBrandNameBold(language === 'ko' ? 'KOLLAB LA 협력사' : 'KOLLAB LA Partners')}
        </motion.p>

        {/* 첫 번째 줄: 좌 → 우 */}
        <div className="relative overflow-hidden mb-2">
          <motion.div
            className="flex gap-2"
            animate={{
              x: [0, -100 / 3 + '%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 33.6,
                ease: 'linear',
              },
            }}
          >
            {firstRowDuplicated.map((item, index) => (
              <div
                key={`row1-${index}`}
                className="flex-shrink-0 w-[150px] h-[150px] md:w-[180px] md:h-[180px] bg-[#EDEBE4] flex items-center justify-center group transition-colors duration-300 cursor-pointer relative overflow-hidden hover:bg-white border border-black/10"
              >
                {item.logo ? (
                  <>
                    {/* Logo (default state) */}
                    <img 
                      src={item.logo} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0 absolute inset-0"
                    />
                    {/* Brand name (on hover) */}
                    <span className="font-extrabold text-xs sm:text-sm md:text-base tracking-[0.15em] text-center text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10 break-keep px-2">
                      {item.name}
                    </span>
                  </>
                ) : (
                  <>
                    {/* TBD slot */}
                    <span className="font-extrabold text-sm md:text-lg tracking-[0.22em] text-center text-black/60 group-hover:text-zinc-600 transition-colors duration-300 relative z-10">
                      {item.name}
                    </span>
                  </>
                )}
              </div>
            ))}
          </motion.div>
        </div>

        {/* 두 번째 줄: 우 → 좌 */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-2"
            animate={{
              x: [-100 / 3 + '%', 0],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 33.6,
                ease: 'linear',
              },
            }}
          >
            {secondRowDuplicated.map((item, index) => (
              <div
                key={`row2-${index}`}
                className="flex-shrink-0 w-[150px] h-[150px] md:w-[180px] md:h-[180px] bg-[#EDEBE4] flex items-center justify-center group transition-colors duration-300 cursor-pointer relative overflow-hidden hover:bg-white border border-black/10"
              >
                {item.logo ? (
                  <>
                    {/* Logo (default state) */}
                    <img 
                      src={item.logo} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0 absolute inset-0"
                    />
                    {/* Brand name (on hover) */}
                    <span className="font-extrabold text-xs sm:text-sm md:text-base tracking-[0.15em] text-center text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10 break-keep px-2">
                      {item.name}
                    </span>
                  </>
                ) : (
                  <>
                    {/* TBD slot */}
                    <span className="font-extrabold text-sm md:text-lg tracking-[0.22em] text-center text-black/60 group-hover:text-zinc-600 transition-colors duration-300 relative z-10">
                      {item.name}
                    </span>
                  </>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

    </div>
  );
};

export default Brands;
