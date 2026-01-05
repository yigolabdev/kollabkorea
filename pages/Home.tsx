
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Globe, ShieldCheck, ShoppingBag, BarChart3 } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
  onHeaderVisibilityChange: (isVisible: boolean) => void;
}

const WHY_KOLLAB = [
  {
    icon: <Globe className="w-10 h-10" />,
    title: "Korea-to-U.S. Expansion Path",
    desc: "Build offline presence in Korea and scale into U.S. pop-ups.",
    kor: "한국에서 검증된 브랜드를 미국 팝업으로 연결",
    img: "https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?q=80&w=1200&auto=format&fit=crop"
  },
  {
    icon: <ShieldCheck className="w-10 h-10" />,
    title: "Offline Validation",
    desc: "Test your brand with real customers before global expansion.",
    kor: "글로벌 확장 전, 실제 고객 반응 검증",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop"
  },
  {
    icon: <ShoppingBag className="w-10 h-10" />,
    title: "Curated Environment",
    desc: "Operate within a selective, brand-aligned retail space.",
    kor: "선별된 브랜드만 운영되는 큐레이션 환경",
    img: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800&auto=format&fit=crop"
  },
  {
    icon: <BarChart3 className="w-10 h-10" />,
    title: "Content-Driven Growth",
    desc: "Generate authentic content through real-world interaction.",
    kor: "실제 경험을 기반으로 한 콘텐츠 확장",
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop"
  }
];

const Home: React.FC<HomeProps> = ({ onNavigate, onHeaderVisibilityChange }) => {
  const lastVisibilityState = useRef<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const vhRef = useRef(window.innerHeight);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  // Intro section depth effect
  const introRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: introScroll } = useScroll({ target: introRef, offset: ["start 80%", "end start"] });
  const introBgY = useTransform(introScroll, [0, 1], [-60, 40]);
  const introBgScale = useTransform(introScroll, [0, 1], [1.08, 1.0]);
  const introTextY = useTransform(introScroll, [0, 1], [30, -30]);
  const introTextScale = useTransform(introScroll, [0, 1], [0.98, 1.02]);
  const introOverlayOpacity = useTransform(introScroll, [0, 1], [0.18, 0.08]);
  
  useEffect(() => {
    const updateVh = () => { vhRef.current = window.innerHeight; };
    window.addEventListener('resize', updateVh);
    return () => window.removeEventListener('resize', updateVh);
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
      {/* SECTION 1: HERO - 일반 스크롤 섹션으로 유지 */}
      <section
        id="hero-section"
        ref={heroRef}
        className="relative overflow-hidden snap-section bg-[#EDEBE4] z-0"
        aria-label="KOLLAB hero section"
      >
        {/* No background media in hero per request */}
        <motion.div 
          initial={{ opacity: 0, y: 40, scale: 1.05 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="z-10 max-w-6xl w-full mx-auto px-4 text-center flex flex-col items-center -mt-[224px] md:-mt-[256px]"
        >
          <div className="bg-black text-[#EDEBE4] px-2 py-0.5 font-semibold tracking-[0.42em] uppercase text-sm mb-12">SEOUL × LOS ANGELES</div>
          <h1 className="text-[7vw] md:text-[5.5vw] leading-[1.1] font-extrabold tracking-normal text-black uppercase -mt-6 md:-mt-8 mb-4">
            From Korea<br />to the U.S.
          </h1>
          <p className="text-[3.6vw] md:text-[2vw] font-bold text-black/60 uppercase tracking-tight whitespace-nowrap">
            Where Brands Meet Physical Experience
          </p>
        </motion.div>
      </section>

      {/* SECTION 2: INTRO - Static Background */}
      <section
        id="intro-section"
        ref={introRef}
        className="relative overflow-hidden snap-section z-10 bg-[#EDEBE4] min-h-[60vh] md:min-h-[70vh]"
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
            className="absolute inset-0 bg-[#EDEBE4]"
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
            <p className="text-2xl md:text-4xl font-semibold text-black leading-tight uppercase tracking-wide">
              A CURATED OFFLINE RETAIL PLATFORM<br />
              THAT CONNECTS BRANDS FROM KOREA<br />
              TO REAL-WORLD POP-UP EXPERIENCES<br />
              IN THE UNITED STATES.
            </p>
            <p className="text-xl md:text-2xl font-medium text-black/70 tracking-wide">
              한국에서 브랜드를 알리고, 미국 팝업으로 확장할 수 있는 실질적인 오프라인 플랫폼
            </p>
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
              className="bg-black text-[#EDEBE4] px-14 py-6 text-base font-extrabold uppercase tracking-[0.22em] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              APPLY NOW
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* NEW SECTION: PLATFORM DESCRIPTION */}
      <section className="py-32 md:py-48 px-6 bg-black text-[#EDEBE4] relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto text-center"
        >
          <div className="space-y-10 md:space-y-16">
            <p className="text-2xl md:text-4xl lg:text-5xl font-extrabold uppercase leading-[1.1] tracking-tight">
              KOLLAB is not just a pop-up space.<br />
              It is a cross-border retail<br />
              platform designed to help brands<br />
              build offline presence in Korea<br />
              and expand into curated pop-up<br />
              opportunities in the U.S.
            </p>
            <div className="h-px w-24 bg-[#EDEBE4]/30 mx-auto" />
            <p className="text-xl md:text-3xl lg:text-4xl font-bold tracking-wide leading-relaxed">
              KOLLAB은 단순한 팝업 공간이 아닙니다.<br className="hidden md:block" />
              한국 오프라인 리테일을 시작으로<br className="hidden md:block" />
              미국 팝업까지 연결되는 크로스보더 브랜드 플랫폼입니다.
            </p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 3+: CONTENT AREA (FREE SCROLL) */}
      <div id="free-scroll-start" className="free-scroll-section relative z-20 bg-[#EDEBE4]">
        <section className="min-h-screen flex items-center py-32 px-6">
          <div className="max-w-7xl mx-auto w-full relative">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-20 text-center"
            >
              <h2 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-black uppercase mb-4 tracking-normal whitespace-nowrap">Why brands choose KOLLAB</h2>
            </motion.div>
            
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute -right-[8%] top-0 bottom-0 w-[55%] hidden lg:block pointer-events-none -z-10">
                <AnimatePresence mode="wait">
                  {hoveredIndex !== null && (
                    <motion.div
                      key={hoveredIndex}
                      initial={{ opacity: 0, scale: 0.95, x: 20 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 1.05, x: 20 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full h-full flex items-center justify-center p-0"
                    >
                      <img 
                        src={WHY_KOLLAB[hoveredIndex].img} 
                        alt="" 
                        className="max-h-[90%] w-auto object-contain border-2 border-black/5 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <motion.div 
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="flex flex-col gap-10"
              >
                {WHY_KOLLAB.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                    }}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="flex flex-col items-center md:items-start text-center md:text-left group cursor-default relative"
                  >
                    <div className="flex-1 flex flex-col items-center md:items-start relative z-10">
                      <h3 className="text-3xl md:text-4xl font-extrabold text-black uppercase mb-1 leading-tight tracking-wide transition-all duration-300 group-hover:bg-[#B92622] group-hover:text-[#EDEBE4] px-1 w-fit">
                        {item.title}
                      </h3>
                      <p className="text-lg md:text-xl font-semibold text-[#1A1A1A] mb-1 uppercase tracking-wide transition-all duration-300 group-hover:bg-[#B92622] group-hover:text-[#EDEBE4] px-1 w-fit">
                        {item.desc}
                      </p>
                      <p className="text-lg md:text-xl font-medium text-black/70 tracking-wide transition-all duration-300 group-hover:bg-[#B92622] group-hover:text-[#EDEBE4] px-1 w-fit">
                        {item.kor}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
