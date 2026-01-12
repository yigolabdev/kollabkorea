/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
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
  const sliderTriggerMarkerRef = useRef<HTMLDivElement | null>(null);
  const bgToneRafRef = useRef<number | null>(null);
  const [isGrayBg, setIsGrayBg] = useState(false);
  const curatedSectionRef = useRef<HTMLElement | null>(null);
  const curatedBgRef = useRef<HTMLDivElement | null>(null);
  const curatedBgRafRef = useRef<number | null>(null);
  const curatedBgLastYPxRef = useRef<number>(Number.NaN);
  const heroDeckHasKo = hasKorean(content.hero.deck);

  const CURATED_BG_MOTION = {
    // 기존 “공간감” 구조 복구: 스크롤에 따라 배경이 아래로 이동
    // (보이는 레이아웃은 유지하고 background-position만 변경)
    // baseOffsetYPx: 초기 배경 위치를 위로 당기는 값(음수일수록 위로)
    baseOffsetYPx: -60,
    maxTranslateYPx: 160,
  } as const;
  
  // Viewport height 업데이트
  useEffect(() => {
    const updateVh = () => { vhRef.current = window.innerHeight; };
    window.addEventListener('resize', updateVh);
    return () => window.removeEventListener('resize', updateVh);
  }, []);

  // 인덱스 하단 다크 배경 전환 (white ↔ zinc-700)
  // - 트리거: ImageSlider 섹션 내부 마커(25% 지점, 모바일은 상단)
  // - 전환: fixed 배경 레이어 opacity cross-fade (1000ms)
  useEffect(() => {
    const markerEl = sliderTriggerMarkerRef.current;
    if (!markerEl) return;

    const apply = () => {
      bgToneRafRef.current = null;
      const rect = markerEl.getBoundingClientRect();
      const shouldGray = rect.top <= 0;
      setIsGrayBg((prev) => (prev === shouldGray ? prev : shouldGray));
    };

    const schedule = () => {
      if (bgToneRafRef.current != null) return;
      bgToneRafRef.current = window.requestAnimationFrame(apply);
    };

    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      if (bgToneRafRef.current != null) window.cancelAnimationFrame(bgToneRafRef.current);
      bgToneRafRef.current = null;
      window.removeEventListener('scroll', schedule as EventListener);
      window.removeEventListener('resize', schedule as EventListener);
    };
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

  // A CURATED 공간감: 섹션 스크롤 진행도에 따라 배경 이미지를 "아래로" 이동
  // - 요소 자체를 translate하면 gap/패턴 노출 위험이 커서, background-position만 안전하게 조정
  // - prefers-reduced-motion에서는 이동 0px
  useEffect(() => {
    const sectionEl = curatedSectionRef.current;
    const bgEl = curatedBgRef.current;
    if (!sectionEl || !bgEl) return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    const isMobile = window.matchMedia?.('(max-width: 767px)')?.matches ?? false;
    const bgPosX = isMobile ? '15%' : '50%';
    if (prefersReducedMotion) {
      bgEl.style.backgroundPosition = `${bgPosX} calc(50% + ${CURATED_BG_MOTION.baseOffsetYPx}px)`;
      return;
    }

    const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

    const apply = () => {
      curatedBgRafRef.current = null;

      const rect = sectionEl.getBoundingClientRect();
      const vh = window.innerHeight || vhRef.current || 0;

      // progress: 섹션 top이 뷰포트 bottom에 닿는 순간 0 → 섹션이 완전히 지나가면 1
      const start = vh;
      const end = -rect.height;
      const denom = start - end || 1;
      const progress = clamp01((start - rect.top) / denom);

      const yPx = Math.round(CURATED_BG_MOTION.baseOffsetYPx + progress * CURATED_BG_MOTION.maxTranslateYPx);
      if (curatedBgLastYPxRef.current === yPx) return;
      curatedBgLastYPxRef.current = yPx;

      // 기존 기본값(center center)을 유지하되 Y만 px로 이동
      bgEl.style.backgroundPosition = `${bgPosX} calc(50% + ${yPx}px)`;
    };

    const schedule = () => {
      if (curatedBgRafRef.current != null) return;
      curatedBgRafRef.current = window.requestAnimationFrame(apply);
    };

    // 초기 1회 적용
    schedule();

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      if (curatedBgRafRef.current != null) window.cancelAnimationFrame(curatedBgRafRef.current);
      curatedBgRafRef.current = null;
      window.removeEventListener('scroll', schedule as EventListener);
      window.removeEventListener('resize', schedule as EventListener);
    };
  }, []);

  return (
    <div className="relative">
      {/* Global background tone (fixed) — opacity cross-fade */}
      <div aria-hidden className="fixed inset-0 pointer-events-none" style={{ zIndex: -20 }}>
        <div
          className="absolute inset-0 bg-white transition-opacity duration-1000 ease-in-out"
          style={{ opacity: isGrayBg ? 0 : 1 }}
        />
        <div
          className="absolute inset-0 bg-zinc-700 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: isGrayBg ? 1 : 0 }}
        />
      </div>

      {/* HERO SECTION - 배경 비디오 */}
      <section
        id="hero-section"
        ref={heroRef}
        className="relative overflow-hidden z-0 min-h-[80vh] md:min-h-[88vh] flex items-center bg-white"
        aria-label="KOLLAB hero section"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover -z-20"
          aria-hidden="true"
        >
          <source src="/assets/mega-node-network-earth.mp4" type="video/mp4" />
        </video>

        {/* Hero tone overlay - 항상 밝은 오버레이 */}
        <div className="absolute inset-0 -z-10 bg-white/60" />
        
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
      <ImageSlider triggerMarkerRef={sliderTriggerMarkerRef} />

      {/* Spacer between ImageSlider ↔ A CURATED (VISUAL_BASELINE.md) */}
      {/* - mobile: 200px, desktop: 350px */}
      {/* - background tone should follow the global (fixed) bg cross-fade */}
      <div aria-hidden className="h-[200px] md:h-[350px] bg-transparent" />

      {/* INTRO SECTION - 일반 스크롤 */}
      <section
        id="intro-section"
        ref={curatedSectionRef as unknown as React.RefObject<HTMLElement>}
        className={`relative overflow-hidden min-h-[100vh] flex items-center justify-center pt-[100px] md:pt-0 ${
          isGrayBg ? 'bg-zinc-700' : 'bg-black'
        }`}
      >
        {/* 배경 이미지 */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          aria-hidden="true"
        >
          <div
            className="w-full h-full"
            ref={curatedBgRef}
            style={{
              backgroundImage:
                'url(https://s3.ap-northeast-2.amazonaws.com/kollabkorea.com/assets/images/hero/kollab-hero-bg-01.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat'
            }}
          />

          {/* A CURATED overlay:
              - before dark trigger: solid white (100%)
              - after dark trigger: overlay fades out (reveals the image directly) */}
          <div
            className="absolute inset-0 bg-white transition-opacity duration-1000 ease-in-out"
            style={{ opacity: isGrayBg ? 0 : 1 }}
          />
        </div>

        {/* 메인 콘텐츠 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-4xl mx-auto text-left md:text-center px-6 py-0"
        >
          <div className="space-y-20 md:space-y-16">
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

          <div className="flex flex-col md:flex-row justify-center gap-6 mt-36 md:mt-32">
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
    </div>
  );
};

export default Home;
