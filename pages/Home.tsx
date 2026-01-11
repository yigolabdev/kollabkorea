/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { homeContentEn } from '../content/home.en';
import { homeContentKo } from '../content/home.ko';
import ImageSlider from '../components/ImageSlider';
import { hasKorean } from '../utils/text';
import type { PageProps } from '../types';

const Home: React.FC<PageProps> = ({ onNavigate, onHeaderVisibilityChange }) => {
  const { language, t } = useLanguage();
  const content = language === 'en' ? homeContentEn : homeContentKo;
  const lastVisibilityState = useRef<boolean>(false);
  const vhRef = useRef(window.innerHeight);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const heroDeckHasKo = hasKorean(content.hero.deck);
  
  // Viewport height 업데이트
  useEffect(() => {
    const updateVh = () => { vhRef.current = window.innerHeight; };
    window.addEventListener('resize', updateVh);
    return () => window.removeEventListener('resize', updateVh);
  }, []);

  // 헤더 가시성 제어
  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        const vh = vhRef.current;
        const scrollPos = window.scrollY;
        const shouldShow = scrollPos > vh * 0.4;
        
        if (lastVisibilityState.current !== shouldShow) {
          lastVisibilityState.current = shouldShow;
          onHeaderVisibilityChange?.(shouldShow);
        }
      });
    };

    onHeaderVisibilityChange?.(false);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onHeaderVisibilityChange]);

  return (
    <>
      {/* HERO SECTION - 배경 비디오 */}
      <section
        id="hero-section"
        ref={heroRef}
        className="relative overflow-hidden bg-white z-0 min-h-[80vh] md:min-h-[88vh] flex items-center"
        aria-label="KOLLAB hero section"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover -z-10"
          aria-hidden="true"
        >
          <source src="/assets/mega-node-network-earth.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-white/60 -z-10" />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="z-10 max-w-6xl w-full mx-auto px-6 text-center flex flex-col items-center py-20 md:py-24 -mt-28 md:-mt-40"
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05, ease: 'easeOut' }}
            className="bg-black text-[#EDEBE4] px-2 py-0.5 font-semibold tracking-[0.42em] uppercase text-sm mb-4 md:mb-6"
          >
            {content.badge}
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
            className="font-brand text-[7vw] md:text-[5.5vw] leading-[1.1] font-extrabold tracking-tight text-kollab-red mb-4 uppercase"
          >
            {content.hero.title.split('\n').map((l, i) => (<span key={i}>{l}{i === 0 ? <br /> : null}</span>))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15, ease: 'easeOut' }}
            className={`text-[3.6vw] md:text-[2vw] font-semibold text-kollab-red opacity-80 whitespace-nowrap ${
              heroDeckHasKo ? 'tracking-[0.008em] break-keep' : 'tracking-[0.015em]'
            }`}
          >
            {content.hero.deck}
          </motion.p>
        </motion.div>
      </section>

      {/* IMAGE SLIDER - LA 팝업 이미지 */}
      <ImageSlider />

      {/* INTRO SECTION - 일반 스크롤 */}
      <section
        id="intro-section"
        className="relative overflow-hidden bg-black min-h-[100vh] mt-[100px] flex items-center justify-center"
      >
        {/* 배경 이미지 */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          aria-hidden="true"
        >
          <div
            className="w-full h-full opacity-40"
            style={{
              backgroundImage: 'url(/assets/images/hero/kollab-hero-bg-02.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          {/* 어두운 오버레이 */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* 메인 콘텐츠 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-4xl mx-auto text-center px-6 py-16 md:py-24"
        >
          <div className="space-y-6">
            <p 
              className={`text-2xl md:text-4xl font-semibold leading-tight tracking-normal text-white ${language === 'ko' ? 'break-keep' : ''}`}
            >
              {content.intro.lines.map((l, i) => (<span key={i}>{l}<br /></span>))}
            </p>
            <p 
              className={`text-2xl md:text-3xl font-bold leading-[1.4] text-white/85 ${language === 'ko' ? 'tracking-[0.015em] break-keep' : 'tracking-[0.025em]'}`}
            >
              {content.intro.deck.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < content.intro.deck.split('\n').length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-6 mt-16 md:mt-20">
            <motion.button 
              onClick={() => onNavigate('CONTACT')}
              className="px-14 py-6 text-base font-extrabold tracking-[0.22em] bg-kollab-red text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: '#ffffff',
                color: '#000000',
                transition: { duration: 0.3 }
              }}
            >
              {language === 'ko' ? 'APPLY NOW' : t('cta.apply')}
            </motion.button>
            
            <motion.button 
              onClick={() => onNavigate('ABOUT')}
              className="px-14 py-6 text-base font-extrabold tracking-[0.22em] bg-white text-black border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'transparent',
                color: '#ffffff',
                borderColor: '#ffffff',
                transition: { duration: 0.3 }
              }}
            >
              {language === 'ko' ? 'LEARN MORE' : 'LEARN MORE'}
            </motion.button>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Home;
