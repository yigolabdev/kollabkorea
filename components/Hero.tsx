import React, { useEffect, useState, useMemo } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { useMousePosition } from '../hooks';
import { PARALLAX_STRENGTH } from '../constants';
import { Button } from './ui/Button';

interface HeroProps {
  onApplyClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onApplyClick }) => {
  const [mounted, setMounted] = useState(false);
  const mousePosition = useMousePosition(true); // normalized position

  useEffect(() => {
    setMounted(true);
  }, []);

  // Parallax offset calculation (moves opposite to mouse)
  const parallaxStyle = useMemo(
    () => ({
      transform: `translate(${mousePosition.x * -PARALLAX_STRENGTH}px, ${mousePosition.y * -PARALLAX_STRENGTH}px)`,
      transition: 'transform 0.1s ease-out',
    }),
    [mousePosition.x, mousePosition.y]
  );

  const spotlightStyle = useMemo(
    () => ({
      background: `radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, rgba(220, 0, 0, 0.12) 0%, transparent 40%)`,
      opacity: mounted ? 1 : 0,
    }),
    [mousePosition.x, mousePosition.y, mounted]
  );

  return (
    <section 
      className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-kollab-black border-b border-zinc-800 pt-20"
      aria-label="메인 히어로 섹션"
    >
      {/* Dynamic Background Area */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* 1. Spotlight Gradient following mouse */}
        <div 
          className="absolute inset-0 transition-opacity duration-1000 ease-out"
          style={spotlightStyle}
          aria-hidden="true"
        />

        {/* 2. Scaffolding Grid with Parallax */}
        <div className="absolute inset-0 opacity-20" style={parallaxStyle}>
           <div className="absolute left-1/4 h-[120%] -top-[10%] w-[1px] bg-zinc-700/80"></div>
           <div className="absolute right-1/4 h-[120%] -top-[10%] w-[1px] bg-zinc-700/80"></div>
           <div className="absolute top-1/4 w-[120%] -left-[10%] h-[1px] bg-zinc-700/80"></div>
           <div className="absolute bottom-1/4 w-[120%] -left-[10%] h-[1px] bg-zinc-700/80"></div>
           
           {/* Decorative Diagonal Lines for Industrial Vibe */}
           <div className="absolute top-0 right-0 w-[500px] h-full border-l border-zinc-800/30 -skew-x-12 transform translate-x-20"></div>
        </div>
      </div>

      <div className="z-10 text-center px-4 max-w-6xl w-full">
        {/* Top Tagline - Fades down */}
        <div className={`mb-8 flex justify-center transition-all duration-1000 ease-out transform ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
            <div className="border border-kollab-red text-kollab-red px-6 py-2 text-sm font-bold tracking-[0.3em] uppercase bg-black/50 backdrop-blur-sm relative overflow-hidden group">
              <span className="relative z-10">Seoul × Los Angeles</span>
              {/* Subtle sweep effect on hover */}
              <div className="absolute inset-0 bg-kollab-red/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </div>
        </div>
        
        {/* Main Slogan - Reveal Animation */}
        <h1 className="flex flex-col items-center justify-center font-black tracking-tighter text-white mb-8 leading-none">
          <div className="overflow-hidden">
            <span className={`block transition-transform duration-1000 delay-300 ease-out text-[8vw] md:text-[6rem] lg:text-[7rem] whitespace-nowrap ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-[100%] opacity-0'}`}>
              WHERE SEOUL
            </span>
          </div>
          <div className="overflow-hidden">
             <span className={`block text-kollab-red transition-transform duration-1000 delay-500 ease-out text-[8vw] md:text-[6rem] lg:text-[7rem] ${mounted ? 'translate-y-0 opacity-100' : '-translate-y-[100%] opacity-0'}`}>
              MEETS LA
            </span>
          </div>
        </h1>
        
        {/* Mission Statement - Fade Up */}
        <h2 className={`text-zinc-300 font-medium text-lg md:text-3xl mb-12 max-w-4xl mx-auto leading-relaxed break-keep transition-all duration-1000 delay-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          KOLLAB는 <span className="text-white font-bold">K-브랜드의 미국 시장 진출</span>을 <br className="hidden md:block" />
          가장 전략적으로 시작할 수 있는 <span className="text-white font-bold border-b-2 border-kollab-red pb-1 inline-block hover:text-kollab-red transition-colors duration-300 cursor-default">첫 단계</span>입니다.
        </h2>
        
        {/* Buttons - Fade Up Last */}
        <div className={`flex flex-col md:flex-row gap-0 md:gap-6 justify-center items-center w-full max-w-md mx-auto md:max-w-none transition-all duration-1000 delay-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Button
            onClick={onApplyClick}
            variant="primary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            aria-label="입점 신청하기"
          >
            Apply Now
          </Button>
          
          <a 
            href="#about"
            className="group w-full md:w-auto mt-4 md:mt-0 border-2 border-white text-white px-12 py-5 text-lg font-bold hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest relative overflow-hidden inline-flex items-center justify-center"
            aria-label="KOLLAB 소개 보기"
          >
            <span className="relative z-10">Discover</span>
          </a>
        </div>
      </div>

      {/* Scaffolding Decoration Bottom */}
      <div 
        className={`absolute bottom-0 left-0 w-full h-24 border-t border-zinc-800 flex justify-between items-end p-6 z-10 transition-opacity duration-1000 delay-[1500ms] ${mounted ? 'opacity-100' : 'opacity-0'}`}
        aria-hidden="true"
      >
         <span className="text-zinc-600 text-xs font-mono">BX DESIGN SYSTEM v2.0</span>
         <ArrowDown size={24} className="text-kollab-red animate-bounce" aria-label="아래로 스크롤" />
         <span className="text-zinc-600 text-xs font-mono">SCROLL DOWN</span>
      </div>
    </section>
  );
};