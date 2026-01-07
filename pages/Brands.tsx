
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { brandsContentEn } from '../content/brands.en';
import { brandsContentKo } from '../content/brands.ko';

const getContent = (lang: 'en' | 'ko') => (lang === 'en' ? brandsContentEn : brandsContentKo);

interface BrandsProps {
  navigateTo: (page: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
};

const renderBrandNameBold = (text: string) => {
  const parts = text.split(/(KOLLAB KOREA|KOLLAB LA)/g);
  return parts.map((part, i) => {
    if (part === 'KOLLAB KOREA' || part === 'KOLLAB LA') {
      return (
        <span key={`brand-${i}`} className="font-extrabold">
          {part}
        </span>
      );
    }
    return <React.Fragment key={`text-${i}`}>{part}</React.Fragment>;
  });
};

const Brands: React.FC<BrandsProps> = ({ navigateTo }) => {
  const { language } = useLanguage();
  const content = getContent(language);
  
  // LA Partner logos with brand names
  const laPartners = [
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
  
  // Fill remaining slots with TBD
  const laGridItems = Array.from({ length: 40 }, (_, i) => {
    if (i < laPartners.length) {
      return laPartners[i];
    }
    return null;
  });
  
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

      {/* KOLLAB KOREA partners - Coming Soon Grid */}
      <div className="mt-12 md:mt-16 relative">
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
            Opening Soon
          </p>
        </div>
      </div>

      {/* KOLLAB LA partners (with logos) */}
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-4 md:grid-cols-8 gap-px bg-black/20 border border-black/20"
        >
          {laGridItems.map((item, i: number) => (
            <motion.div
              key={`la-${i}`}
              variants={itemVariants}
              className="aspect-square bg-[#EDEBE4] flex items-center justify-center group transition-colors duration-300 cursor-pointer relative overflow-hidden hover:bg-white"
            >
              {item ? (
                <>
                  {/* Logo (default state) - no padding */}
                  <img 
                    src={item.logo} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0 absolute inset-0"
                  />
                  {/* Brand name (on hover) - gray text on white */}
                  <span className="font-extrabold text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.15em] text-center text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10 break-keep px-2">
                    {item.name}
                  </span>
                  <div className="absolute inset-0 border-4 border-kollab-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </>
              ) : (
                <>
                  {/* TBD slot */}
                  <span className="font-extrabold text-sm md:text-lg lg:text-xl tracking-[0.22em] text-center text-black group-hover:text-zinc-600 transition-colors duration-300 relative z-10">
                    TBD
                  </span>
                  <div className="absolute inset-0 border-4 border-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

    </div>
  );
};

export default Brands;
