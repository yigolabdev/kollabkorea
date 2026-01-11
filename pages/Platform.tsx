/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Store, Video, Users, Megaphone, Plane } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import { platformContentEn } from '../content/platform.en';
import { platformContentKo } from '../content/platform.ko';
import StageCard from '../components/StageCard';
import CurvedPath from '../components/CurvedPath';
import { containerVariants, itemVariants } from '../utils/animations';
import type { StageData } from '../types';

// Icon mapping
const iconMap = {
  Store,
  Video,
  Users,
  Megaphone,
  Plane
};

const Platform: React.FC = () => {
  const { language } = useLanguage();
  const content = language === 'ko' ? platformContentKo : platformContentEn;
  const [mounted, setMounted] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  
  // Convert content roadmap to StageData format
  const ROADMAP_DATA: StageData[] = content.roadmap.map((stage) => ({
    ...stage,
    Icon: iconMap[stage.icon as keyof typeof iconMap],
    position: { top: 60 } // Default position, will be overridden by curveYPositions
  }));
  
  // SVG 곡선의 정확한 Y좌표 (2차 베지어 곡선 계산)
  // 새로운 곡선: M 10,40 Q 50,10 90,40
  // viewBox: 0 0 100 50 (비율 2:1로 원형에 가깝게)
  const curveYPositions = {
    node1: '40%',    // X=10%, t=0 - baseline
    node2: '26.25%', // X=30%, t=0.25 - 대칭!
    node3: '20%',    // X=50%, t=0.5 - 정점
    node4: '26.25%', // X=70%, t=0.75 - 대칭!
    node5: '43%'     // X=90%, t=1 - baseline (조정됨)
  };

  useEffect(() => {
    setMounted(true);
    
    // 최상단으로 즉시 이동
    window.scrollTo({ top: 0, behavior: 'auto' });
    
    // 1단계: 헤더 즉시 숨김
    setHideHeader(true);
    
    // 2단계: 350ms 후 스크롤 애니메이션 시작 (헤더 완전히 사라진 후)
    setTimeout(() => {
      const targetScroll = 150;
      const duration = 1000; // 1초 (부드럽지만 빠르게)
      const startTime = performance.now();
      
      // Ease-in-out cubic - 매우 부드러운 가속/감속
      const easeInOutCubic = (t: number) => 
        t < 0.5 
          ? 4 * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
      
      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeInOutCubic(progress);
        
        window.scrollTo({
          top: targetScroll * easedProgress,
          behavior: 'auto'
        });
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };
      
      // 스크롤 애니메이션 시작
      requestAnimationFrame(animateScroll);
    }, 350); // 50ms → 350ms (헤더 완전히 사라진 후 + 여유)
    
    // 클린업 함수
    return () => {
      setHideHeader(false);
    };
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section - KOLLAB SEONGSU */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/assets/images/hero/platform_Hero2.png"
            alt="KOLLAB Seongsu Space"
            className="w-full h-full object-cover"
          />
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Hero Text */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center px-6"
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-none uppercase">
              KOLLAB<br />SEONGSU
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Seongsu-dong Introduction Section */}
      <section className="bg-white py-20 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Titles */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-16"
          >
            {/* Main Title */}
            <div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase mb-8">
                SEONGSU-DONG
              </h2>
              <div className="space-y-2 text-base md:text-lg font-medium">
                <p>Industrial Heritage</p>
                <p>Creative Transformation</p>
                <p>Pop-up Culture Hub</p>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-sm font-black tracking-[0.15em] uppercase mb-4">
                POP-UP LOCATION
              </h3>
              <p className="text-base md:text-lg font-medium">
                Seongsu-dong, Seoul
              </p>
            </div>
          </motion.div>

          {/* Right Column - Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <p className="text-xl md:text-2xl font-semibold text-black leading-relaxed break-keep">
              {language === 'ko'
                ? '성수동은 서울의 산업적 기반 위에서 창의적인 문화가 가장 빠르게 재구성되고 있는 지역입니다.'
                : 'Seongsu-dong is a district where creative culture is being reconstructed most rapidly on Seoul\'s industrial foundation.'}
            </p>

            <p className="text-base md:text-lg text-black/80 leading-relaxed break-keep">
              {language === 'ko'
                ? '과거 공장과 창고가 밀집했던 이곳은 이제 브랜드, 크리에이터, 소비자가 자연스럽게 교차하는 도시형 실험 공간으로 확장되었습니다.'
                : 'What was once densely packed with factories and warehouses has now expanded into an urban experimental space where brands, creators, and consumers naturally intersect.'}
            </p>

            <p className="text-base md:text-lg text-black/80 leading-relaxed break-keep">
              <span className="font-bold">KOLLAB KOREA</span>
              {language === 'ko'
                ? '의 성수 팝업은 이러한 성수동의 맥락 위에서 진행됩니다.'
                : '\'s Seongsu pop-up takes place within this context of Seongsu-dong.'}
            </p>

            <p className="text-base md:text-lg text-black/80 leading-relaxed break-keep">
              {language === 'ko'
                ? '일시적인 전시가 아닌, 브랜드가 실제 고객과 오프라인에서 만나고 글로벌 확장을 앞두고 시장 반응을 검증하는 자리.'
                : 'Not a temporary exhibition, but a place where brands meet real customers offline and verify market response ahead of global expansion.'}
            </p>

            <p className="text-base md:text-lg text-black/80 leading-relaxed break-keep">
              {language === 'ko'
                ? '성수라는 장소성과 KOLLAB의 큐레이션이 결합된 이 팝업은 브랜드가 다음 단계로 나아가기 전 가장 현실적인 접점을 제공합니다.'
                : 'This pop-up, combining the sense of place of Seongsu with KOLLAB\'s curation, provides the most realistic touchpoint for brands before moving to the next stage.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Journey Section */}
      <section className="bg-white py-20 md:py-32 px-6 max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-black tracking-tight leading-tight mb-6 break-keep">
            {language === 'ko'
              ? 'KOLLAB의 브랜드 여정'
              : 'KOLLAB Brand Journey'}
          </h2>
          <p className="text-lg md:text-xl text-black/70 font-semibold max-w-3xl mx-auto break-keep">
            {language === 'ko'
              ? '성수에서 시작해 LA로, 브랜드의 글로벌 확장을 위한 5단계 프로세스'
              : 'From Seongsu to LA, a 5-step process for global brand expansion'}
          </p>
        </motion.div>

        {/* Roadmap Visualization - Arc Design */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="py-4 md:py-6 relative bg-gradient-to-b from-white via-zinc-50/30 to-white rounded-2xl"
        >
          {/* Desktop View: The Arc */}
          <div className="hidden md:block relative w-full h-[450px] px-8">
            
            {/* SVG Connector Layer */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <CurvedPath />
            </div>

            {/* 
              Cards positioned absolutely based on the curve geometry.
              
              ✨ 핵심: SVG 2차 베지어 곡선의 정확한 좌표 사용
              - 새로운 곡선: M 10,40 Q 50,10 90,40
              - viewBox: 0 0 100 50 (비율 2:1 - 원형에 가깝게)
              - 각 X 좌표에서 곡선 공식으로 정확한 Y값 계산
              - Node 1 & 5: 40% (시작/끝 - 동일한 baseline)
              - Node 2 & 4: 26.25% (대칭 - 동일 높이)
              - Node 3: 20% (정점)
              
              Transform: translate(-50%, -50%) - 아이콘 중심을 곡선 좌표에 정렬
            */}
            
            {/* Node 1 - 브랜드 액티베이션 */}
            <div 
              className="absolute transition-all duration-700 delay-[0ms] hover:z-50 z-10"
              style={{ 
                left: '10%',
                top: curveYPositions.node1,
                transform: 'translate(-50%, -50%)',
                opacity: mounted ? 1 : 0 
              }}
            >
              <StageCard data={ROADMAP_DATA[0]} isEven={false} />
          </div>

            {/* Node 2 - 콘텐츠 제작 */}
            <div 
              className="absolute transition-all duration-700 delay-[200ms] hover:z-50 z-10"
              style={{ 
                left: '30%',
                top: curveYPositions.node2,
                transform: 'translate(-50%, -50%)',
                opacity: mounted ? 1 : 0 
              }}
            >
              <StageCard data={ROADMAP_DATA[1]} isEven={true} />
            </div>

            {/* Node 3 (Peak) - 인플루언서 마케팅 */}
            <div 
              className="absolute transition-all duration-700 delay-[400ms] hover:z-50 z-10"
              style={{ 
                left: '50%',
                top: curveYPositions.node3,
                transform: 'translate(-50%, -50%)',
                opacity: mounted ? 1 : 0 
              }}
            >
              <StageCard data={ROADMAP_DATA[2]} isEven={false} />
                      </div>

            {/* Node 4 - PR */}
            <div 
              className="absolute transition-all duration-700 delay-[600ms] hover:z-50 z-10"
              style={{ 
                left: '70%',
                top: curveYPositions.node4,
                transform: 'translate(-50%, -50%)',
                opacity: mounted ? 1 : 0 
              }}
            >
              <StageCard data={ROADMAP_DATA[3]} isEven={true} />
                    </div>

            {/* Node 5 - 미국 수출 연결 기회 (Node 1과 정확히 동일한 높이) */}
            <div 
              className="absolute transition-all duration-700 delay-[800ms] hover:z-50 z-10"
              style={{ 
                left: '90%',
                top: curveYPositions.node5,
                transform: 'translate(-50%, -50%)',
                opacity: mounted ? 1 : 0 
              }}
                        >
              <StageCard data={ROADMAP_DATA[4]} isEven={false} />
            </div>
          </div>

          {/* Mobile View: Vertical Timeline */}
          <div className="md:hidden flex flex-col items-center space-y-12 w-full mt-10">
            {ROADMAP_DATA.map((stage, index) => (
              <motion.div 
                key={stage.id} 
                variants={itemVariants}
                className="relative w-full flex justify-center"
              >
                {/* Vertical Connecting Line */}
                {index !== ROADMAP_DATA.length - 1 && (
                  <div className="absolute h-full w-[2px] bg-kollab-red/20 left-1/2 top-1/2 -z-10" />
                )}
                <StageCard data={stage} isEven={index % 2 === 0} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Participation Notice */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 md:mt-6 p-12 border-2 border-kollab-black text-center max-w-4xl mx-auto bg-white"
        >
          <p className="text-base font-black tracking-[0.22em] mb-4 uppercase">
            PARTICIPATION NOTICE
          </p>
          <p className="text-lg font-semibold opacity-80 max-w-2xl mx-auto tracking-wide">
            {content.sections[1]?.notice?.[language] || (language === 'ko' 
              ? '미국 팝업은 내부 심사 및 파트너 승인에 따라 진행됩니다.'
              : 'U.S. pop-up participation is subject to internal review and partner approval.'
            )}
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default Platform;
