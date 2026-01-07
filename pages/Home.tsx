
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { homeContentEn } from '../content/home.en';
import { homeContentKo } from '../content/home.ko';

interface HomeProps {
  onNavigate: (page: string) => void;
  onHeaderVisibilityChange: (isVisible: boolean) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate, onHeaderVisibilityChange }) => {
  const { language, t } = useLanguage();
  const content = language === 'en' ? homeContentEn : homeContentKo;
  const lastVisibilityState = useRef<boolean>(false);
  const vhRef = useRef(window.innerHeight);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  
  // Spline 로딩 상태
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Intro section depth effect
  const introRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: introScroll } = useScroll({ target: introRef, offset: ["start 100%", "end start"] });
  const introBgY = useTransform(introScroll, [0, 1], [-200, 150]);
  const introBgScale = useTransform(introScroll, [0, 1], [1.08, 1.0]);
  const introTextY = useTransform(introScroll, [0, 1], [120, -150]);
  const introTextScale = useTransform(introScroll, [0, 1], [0.96, 1.03]);
  const introOverlayOpacity = useTransform(introScroll, [0, 1], [0.4, 0]);
  const heroDeckHasKo = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(content.hero.deck);
  
  useEffect(() => {
    const updateVh = () => { vhRef.current = window.innerHeight; };
    window.addEventListener('resize', updateVh);
    return () => window.removeEventListener('resize', updateVh);
  }, []);

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        const vh = vhRef.current;
        const scrollPos = window.scrollY;
        // 헤더 가시성 제어: 스크롤이 일정 수준 내려가면 내비바 표시
        const shouldShow = scrollPos > vh * 0.4;
        
        if (lastVisibilityState.current !== shouldShow) {
          lastVisibilityState.current = shouldShow;
          onHeaderVisibilityChange(shouldShow);
        }
      });
    };

    onHeaderVisibilityChange(false);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onHeaderVisibilityChange]);

  return (
    <>
      {/* SECTION 1: HERO - Spline 3D Background */}
      <section
        id="hero-section"
        ref={heroRef}
        className="relative overflow-hidden bg-white z-0 min-h-[80vh] md:min-h-[88vh] flex items-center"
        aria-label="KOLLAB hero section"
      >
        {/* Spline 3D Background (데스크톱만) */}
        {!isMobile && (
          <div className="absolute inset-0 w-full h-full -z-10">
            <Spline 
              scene="https://prod.spline.design/l7eYiLV0MdhAFxRp/scene.splinecode"
              onLoad={() => setSplineLoaded(true)}
              className="w-full h-full"
              style={{ 
                opacity: splineLoaded ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out'
              }}
            />
            {/* 로딩 상태 */}
            {!splineLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-white">
                <div className="text-kollab-red text-xl font-bold animate-pulse">
                  Loading...
                </div>
              </div>
            )}
          </div>
        )}

        {/* Hero Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="z-10 max-w-6xl w-full mx-auto px-6 text-center flex flex-col items-center py-20 md:py-24 -mt-28 md:-mt-40"
        >
          <div className="bg-black text-[#EDEBE4] px-2 py-0.5 font-semibold tracking-[0.42em] uppercase text-sm mb-4 md:mb-6">
            {content.badge}
          </div>
          <h1 className="font-brand text-[7vw] md:text-[5.5vw] leading-[1.1] font-extrabold tracking-tight text-kollab-red mb-4 uppercase">
            {content.hero.title.split('\n').map((l, i) => (<span key={i}>{l}{i === 0 ? <br /> : null}</span>))}
          </h1>
          <p
            className={`text-[3.6vw] md:text-[2vw] font-semibold text-kollab-red opacity-70 whitespace-nowrap ${
              heroDeckHasKo ? 'tracking-[0.008em] break-keep' : 'tracking-[0.015em]'
            }`}
          >
            {content.hero.deck}
          </p>
        </motion.div>
      </section>

      {/* SECTION 1.5: FULL IMAGE */}
      <section className="relative w-full bg-black">
        <div className="w-full mx-auto overflow-hidden flex items-center justify-center">
          <img
            src="/assets/photos/shoots/shoot01.png"
            alt="KOLLAB event & pop-up moments"
            className="w-full h-[68vh] md:h-[78vh] object-cover md:object-contain"
            loading="lazy"
          />
        </div>
      </section>

      {/* SECTION 2: INTRO - Static Background */}
      <section
        id="intro-section"
        ref={introRef}
        className="relative overflow-hidden snap-section z-10 bg-white min-h-[60vh] md:min-h-[70vh]"
      >
        {/* Background image tiled horizontally */}
        <motion.div 
          className="absolute inset-0 -z-10 pointer-events-none will-change-transform"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: introBgY, scale: introBgScale }}
        >
          <div
            className="w-full h-full bg-repeat-x bg-bottom"
            style={{
              backgroundImage: 'url(/assets/images/hero/kollab-hero-bg-02.png)',
              backgroundSize: 'auto 100%',
              backgroundPosition: 'center bottom'
            }}
          />
          <motion.div
            className="absolute inset-0 bg-white"
            style={{ opacity: introOverlayOpacity }}
          />
        </motion.div>
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto text-center px-6 py-16 md:py-24 space-y-16 will-change-transform"
          style={{ y: introTextY, scale: introTextScale }}
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
            }} 
            className="space-y-6"
          >
            <p className={`text-2xl md:text-4xl font-semibold text-black leading-tight tracking-normal ${language === 'ko' ? 'break-keep' : ''}`}>
              {content.intro.lines.map((l, i) => (<span key={i}>{l}<br /></span>))}
            </p>
            <motion.p 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`text-2xl md:text-3xl font-bold text-black/85 leading-[1.4] ${language === 'ko' ? 'tracking-[0.015em] break-keep' : 'tracking-[0.025em]'}`}
            >
              {content.intro.deck.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < content.intro.deck.split('\n').length - 1 ? <br /> : null}
                </span>
              ))}
            </motion.p>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
            }} 
            className="flex flex-col md:flex-row justify-center gap-6"
          >
            <button 
              onClick={() => onNavigate('CONTACT')}
              className="bg-black text-[#EDEBE4] px-14 py-6 text-base font-extrabold tracking-[0.22em] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:bg-kollab-red hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              {language === 'ko' ? 'APPLY NOW' : t('cta.apply')}
            </button>
          </motion.div>
        </motion.div>
      </section>

    </>
  );
};

export default Home;
