/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { aboutContentEn } from '../content/about.en';
import { aboutContentKo } from '../content/about.ko';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
};

const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 }
  }
};

// Blind-style line reveal (each line masked + slides up)
const blindGroupVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09 }
  }
};

const blindGroupDelayedVariants = {
  hidden: {},
  visible: {
    // after hero lines finish (~1.0s), add a slight delay
    transition: { delayChildren: 0.65, staggerChildren: 0.09 }
  }
};

const blindLineVariants = {
  hidden: { y: '120%' },
  visible: {
    y: '0%',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
};

const riseVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65 }
  }
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

interface BlindLineProps {
  children: React.ReactNode;
}

const BlindLine: React.FC<BlindLineProps> = ({ children }) => (
  <span className="block overflow-hidden">
    <motion.span className="block will-change-transform" variants={blindLineVariants}>
      {children}
    </motion.span>
  </span>
);

const About: React.FC = () => {
  const { language } = useLanguage();
  const content = language === 'en' ? aboutContentEn : aboutContentKo;

  // Connector: left red circle center -> each pill left edge (px-accurate)
  const connectorHostRef = useRef<HTMLDivElement | null>(null);
  const leftCircleRef = useRef<HTMLDivElement | null>(null);
  const rightCircleRef = useRef<HTMLDivElement | null>(null);
  const pillarRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [connectorBox, setConnectorBox] = useState<{ w: number; h: number }>({ w: 1, h: 1 });
  const [connectorLines, setConnectorLines] = useState<Array<{ x1: number; y1: number; x2: number; y2: number }>>([]);

  // Scroll progress bar
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start start', 'end end'] });
  const progressX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });

  const splitTwoLines = (v: string) => {
    const [a, b] = v.split('\n');
    return { a: a ?? '', b: b ?? '' };
  };

  useEffect(() => {
    const host = connectorHostRef.current;
    if (!host) return;

    let raf = 0;
    const measure = () => {
      cancelAnimationFrame(raf);
      raf = window.requestAnimationFrame(() => {
        const hostEl = connectorHostRef.current;
        const circleEl = leftCircleRef.current;
        const rightEl = rightCircleRef.current;
        if (!hostEl || !circleEl || !rightEl) return;

        const hostRect = hostEl.getBoundingClientRect();
        const circleRect = circleEl.getBoundingClientRect();
        const rightRect = rightEl.getBoundingClientRect();

        const w = Math.max(1, Math.round(hostRect.width));
        const h = Math.max(1, Math.round(hostRect.height));
        setConnectorBox({ w, h });

        const start = {
          x: circleRect.left + circleRect.width / 2 - hostRect.left,
          y: circleRect.top + circleRect.height / 2 - hostRect.top
        };
        const rightStart = {
          x: rightRect.left + rightRect.width / 2 - hostRect.left,
          y: rightRect.top + rightRect.height / 2 - hostRect.top
        };

        const next: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
        pillarRefs.current.forEach((pill) => {
          if (!pill) return;
          const r = pill.getBoundingClientRect();
          const end = {
            x: r.left - hostRect.left,
            y: r.top + r.height / 2 - hostRect.top
          };
          next.push({ x1: start.x, y1: start.y, x2: end.x, y2: end.y });

          const rightEnd = {
            x: r.right - hostRect.left,
            y: r.top + r.height / 2 - hostRect.top
          };
          next.push({ x1: rightStart.x, y1: rightStart.y, x2: rightEnd.x, y2: rightEnd.y });
        });
        setConnectorLines(next);
      });
    };

    measure();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => measure());
      ro.observe(host);
    }
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
      ro?.disconnect();
    };
  }, [language, content.structureSection?.lanes.length]);

  return (
    <div className="bg-white" ref={scrollRef}>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[90] h-0.5 bg-black/10">
        <motion.div className="h-full bg-black origin-left" style={{ scaleX: progressX }} />
      </div>

      {/* Article Header */}
      <header className="bg-white px-6 pt-12 pb-28 md:pt-18 md:pb-40 max-w-7xl mx-auto relative">
        {content.topPrelude ? (
          <motion.div
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16 md:mb-20"
          >
            <div className="space-y-10">
              {/* Large text block (headline + 2 lines) */}
              <motion.div variants={blindGroupVariants} className="space-y-4 mt-8 md:mt-12">
                <h2 className={`text-3xl md:text-5xl font-extrabold tracking-tight text-black ${language === 'ko' ? 'break-keep' : ''}`}>
                  <BlindLine>
                    {language === 'ko' && content.topPrelude.introTitle.endsWith('는') ? (
                      <>
                        {content.topPrelude.introTitle.slice(0, -1)}
                        <span className="font-semibold">{content.topPrelude.introTitle.slice(-1)}</span>
                      </>
                    ) : (
                      content.topPrelude.introTitle
                    )}
                  </BlindLine>
                </h2>
                {content.topPrelude.introLines.slice(0, 2).map((line, i) => (
                  <p
                    key={`big-${i}`}
                    className={`text-3xl md:text-5xl font-semibold text-black leading-[1.1] tracking-tight ${language === 'ko' ? 'break-keep' : ''}`}
                  >
                    <BlindLine>{line}</BlindLine>
                  </p>
                ))}
              </motion.div>

              {/* Small text block (remaining lines) */}
              <motion.div variants={blindGroupDelayedVariants} className="pt-10 md:pt-12">
                {(() => {
                  const lines = content.topPrelude.introLines.slice(2);
                  const first = lines.slice(0, 2);
                  const last = lines[2];
                  return (
                    <>
                      {first.length ? (
                        <div className={`text-xl md:text-2xl font-semibold text-black/70 leading-[1.25] tracking-normal ${language === 'ko' ? 'break-keep' : ''}`}>
                          {first.map((l, i) => (
                            <BlindLine key={`small-first-${i}`}>{l}</BlindLine>
                          ))}
                        </div>
                      ) : null}

                      {last ? (
                        <div className={`mt-6 text-xl md:text-2xl font-semibold text-black/70 leading-[1.25] tracking-normal ${language === 'ko' ? 'break-keep' : ''}`}>
                          <BlindLine>{last}</BlindLine>
                        </div>
                      ) : null}
                    </>
                  );
                })()}
              </motion.div>
            </div>
          </motion.div>
        ) : null}

        {/* Subtle scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-black/20"
          />
          <p className="text-xs font-medium text-black/30 tracking-wider">SCROLL</p>
        </motion.div>

      </header>

      {/* Section 2: sample-a/App.tsx style (hub + pillars) */}
      {content.structureSection ? (
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="bg-white text-black pt-12 pb-20 md:pt-16 md:pb-24"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-10 md:mb-14">
              <motion.h2
                variants={riseVariants}
                className={`text-2xl md:text-3xl font-semibold text-black/80 tracking-normal text-left max-w-5xl ${
                  language === 'ko' ? 'break-keep' : ''
                }`}
                style={{ lineHeight: 1.34 }}
              >
                {(() => {
                  const lines = content.structureSection.title.split('\n');
                  return lines.map((line, i) => {
                    const isFirst = i === 0;
                    const startsWithBrand = isFirst && language === 'ko' && line.startsWith('KOLLAB KOREA');
                    if (!startsWithBrand) {
                      return (
                        <span key={i}>
                          {line}
                          {i < lines.length - 1 ? <br /> : null}
                        </span>
                      );
                    }

                    const rest = line.replace(/^KOLLAB KOREA/, '');
                    return (
                      <span key={i}>
                        <span className="font-extrabold">KOLLAB KOREA</span>
                        {rest}
                        {i < lines.length - 1 ? <br /> : null}
                      </span>
                    );
                  });
                })()}
              </motion.h2>
            </div>

            <div
              ref={connectorHostRef}
              className="relative w-full flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-10 lg:gap-4 overflow-hidden py-8"
            >
              {/* Connector lines (left circle center -> each pill left edge) - Desktop only */}
              <motion.div variants={scaleInVariants} className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
                <svg
                  viewBox={`0 0 ${connectorBox.w} ${connectorBox.h}`}
                  preserveAspectRatio="none"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {connectorLines.map((l, i) => (
                    <line
                      key={i}
                      x1={l.x1}
                      y1={l.y1}
                      x2={l.x2}
                      y2={l.y2}
                      stroke="#dc0000"
                      strokeWidth="1"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      opacity="0.55"
                    />
                  ))}
                </svg>
              </motion.div>

              {/* Mobile Flow Arrows - Seoul to LA */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 lg:hidden"
              >
                {/* Arrow 1 - Top */}
                <motion.div
                  animate={{ y: [0, 8, 0], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0 }}
                  className="mb-2"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4L10 16M10 16L6 12M10 16L14 12" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.25"/>
                  </svg>
                </motion.div>
                
                {/* Arrow 2 - Middle */}
                <motion.div
                  animate={{ y: [0, 8, 0], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="mb-2"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4L10 16M10 16L6 12M10 16L14 12" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.25"/>
                  </svg>
                </motion.div>
                
                {/* Arrow 3 - Bottom */}
                <motion.div
                  animate={{ y: [0, 8, 0], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4L10 16M10 16L6 12M10 16L14 12" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.25"/>
                  </svg>
                </motion.div>
              </motion.div>

              {/* Left Hub (빨간색 원 - 모바일에서 상단) */}
              <motion.div variants={scaleInVariants} className="z-20 order-1">
                {(() => {
                  const { a, b } = splitTwoLines(content.structureSection.leftNode.subtitle);
                  return (
                    <div
                      ref={leftCircleRef}
                      className="relative flex items-center justify-center w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-kollab-red border border-kollab-red"
                    >
                      <div className="text-center z-10 px-4">
                        <div className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-1">
                          {content.structureSection.leftNode.title}
                        </div>
                        <div className={`text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white leading-tight ${language === 'ko' ? 'break-keep' : ''}`}>
                          {a}
                          <br />
                          {b}
                        </div>
                      </div>
                      <div className="absolute inset-2 rounded-full border border-white/35 pointer-events-none" />
                    </div>
                  );
                })()}
              </motion.div>

              {/* Central Pillars (모바일에서 중간) */}
              <div className="flex flex-col items-center gap-3 md:gap-4 z-20 w-full lg:flex-1 order-2">
                {content.structureSection.lanes.map((lane, idx) => {
                  const [rawTitle, rawDesc] = lane.text.split('|').map((s) => s.trim());
                  const title = rawDesc ? rawTitle : lane.text;
                  const description = rawDesc ?? '';
                  return (
                    <motion.div
                      key={idx}
                      variants={scaleInVariants}
                      className="bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full flex flex-col md:flex-row items-center justify-center gap-2 md:gap-5 w-full max-w-3xl border border-kollab-red"
                      ref={(el) => {
                        pillarRefs.current[idx] = el;
                      }}
                    >
                      <span className="font-bold whitespace-nowrap text-sm sm:text-base md:text-lg border-b md:border-b-0 md:border-r border-black/20 pb-1 md:pb-0 md:pr-5">
                        {title}
                      </span>
                      {description ? (
                        <span className={`text-xs sm:text-sm md:text-base font-medium opacity-95 text-center ${language === 'ko' ? 'break-keep' : ''}`}>
                          {description}
                        </span>
                      ) : null}
                    </motion.div>
                  );
                })}
              </div>

              {/* Right Hub (검은색 원 - 모바일에서 하단) */}
              <motion.div variants={scaleInVariants} className="z-20 order-3">
                {(() => {
                  const { a, b } = splitTwoLines(content.structureSection.rightNode.subtitle);
                  return (
                    <div
                      ref={rightCircleRef}
                      className="relative flex items-center justify-center w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full bg-black border border-black"
                    >
                      <div className="text-center z-10 px-4">
                        <div className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-1">
                          {content.structureSection.rightNode.title}
                        </div>
                        <div className={`text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white leading-tight ${language === 'ko' ? 'break-keep' : ''}`}>
                          {a}
                          <br />
                          {b}
                        </div>
                      </div>
                      <div className="absolute inset-2 rounded-full border border-white/20 pointer-events-none" />
                    </div>
                  );
                })()}
              </motion.div>
            </div>
          </div>
        </motion.section>
      ) : null}

      {/* Section 3: READY TO GO GLOBAL? (moved from Contact) */}
      {content.readyBanner ? (
        <section className="relative py-16 md:py-20 min-h-[360px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,white_1px,transparent_1px)] [background-size:20px_20px]" />
          </div>
          <motion.div
            variants={blindGroupVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            className="relative z-10 text-center text-[#EDEBE4] space-y-6 px-6 max-w-5xl mx-auto"
          >
            <h2 className="text-5xl md:text-7xl font-extrabold leading-[0.95] tracking-tight">
              {content.readyBanner.title.split('\n').map((line, i) => (
                <BlindLine key={`ready-title-${i}`}>{line}</BlindLine>
              ))}
            </h2>
            <p className={`text-lg md:text-xl font-semibold text-[#EDEBE4]/85 tracking-normal ${language === 'ko' ? 'break-keep' : ''}`}>
              <BlindLine>{content.readyBanner.line}</BlindLine>
            </p>
          </motion.div>
        </section>
      ) : null}
    </div>
  );
};

export default About;