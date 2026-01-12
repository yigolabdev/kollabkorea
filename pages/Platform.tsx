/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  const journeyWrapRef = useRef<HTMLDivElement | null>(null);
  const [journeyAnchorPx, setJourneyAnchorPx] = useState<Array<{ x: number; y: number }>>([]);
  
  // Convert content roadmap to StageData format
  const ROADMAP_DATA: StageData[] = content.roadmap.map((stage) => ({
    ...stage,
    Icon: iconMap[stage.icon as keyof typeof iconMap],
    position: { top: 60 } // Default position, will be overridden by curveYPositions
  }));
  
  // strict(noUncheckedIndexedAccess) 대응: roadmap은 5단계로 고정이므로 non-null assertion으로 타입만 확정
  const getStage = (index: number): StageData => ROADMAP_DATA[index]!;
  // 점(원형)과 아이콘 박스(검정 사각) 사이 간격: "진짜 4px"을 보장하기 위해 SVG의 실제 렌더 좌표를 기준으로 계산
  const DOT_TO_ICON_GAP_PX = 50;

  // CurvedPath.tsx와 동일한 2차 베지어(Q) 라인/점 정의 (SVG viewBox 좌표)
  const journeyCurve = useMemo(() => {
    const P0 = { x: 10, y: 35 };
    const P1 = { x: 50, y: 25 };
    const P2 = { x: 90, y: 35 };
    const pointAtT = (t: number) => {
      const mt = 1 - t;
      const x = mt * mt * P0.x + 2 * mt * t * P1.x + t * t * P2.x;
      const y = mt * mt * P0.y + 2 * mt * t * P1.y + t * t * P2.y;
      return { x, y };
    };
    const T = [0, 0.25, 0.5, 0.75, 1] as const;
    return { pointAtT, T };
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SVG의 실제 렌더 좌표(CTM)를 사용해 5개 점의 픽셀 좌표를 계산 → 아이콘을 점 바로 아래(4px)에 배치
  useEffect(() => {
    const compute = () => {
      const wrapEl = journeyWrapRef.current;
      if (!wrapEl) return;

      const svgEl = wrapEl.querySelector('svg[data-journey-svg="true"]') as SVGSVGElement | null;
      if (!svgEl) return;

      const ctm = svgEl.getScreenCTM();
      if (!ctm) return;

      const wrapRect = wrapEl.getBoundingClientRect();
      const next: Array<{ x: number; y: number }> = [];

      journeyCurve.T.forEach((t) => {
        const { x, y } = journeyCurve.pointAtT(t);
        const p = svgEl.createSVGPoint();
        p.x = x;
        p.y = y;
        const sp = p.matrixTransform(ctm);
        next.push({ x: sp.x - wrapRect.left, y: sp.y - wrapRect.top });
      });

      setJourneyAnchorPx(next);
    };

    const raf = window.requestAnimationFrame(compute);
    window.addEventListener('resize', compute);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', compute);
    };
  }, [journeyCurve]);

  return (
    <div className="bg-white">
      {/* Hero Section - KOLLAB SEONGSU */}
      <section className="relative min-h-[80vh] md:min-h-[88vh] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/assets/images/hero/platform_hero3.png"
            alt="KOLLAB Seongsu Space"
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Hero Text */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
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
          <div ref={journeyWrapRef} className="hidden md:block relative w-full h-[450px] px-8">
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
                left: journeyAnchorPx[0]?.x != null ? `${journeyAnchorPx[0].x}px` : '10%',
                top: journeyAnchorPx[0]?.y != null ? `${journeyAnchorPx[0].y + DOT_TO_ICON_GAP_PX}px` : '35%',
                transform: 'translateX(-50%)',
                opacity: mounted ? 1 : 0 
              }}
            >
              <StageCard data={getStage(0)} isEven={false} />
          </div>

            {/* Node 2 - 콘텐츠 제작 */}
            <div 
              className="absolute transition-all duration-700 delay-[200ms] hover:z-50 z-10"
              style={{ 
                left: journeyAnchorPx[1]?.x != null ? `${journeyAnchorPx[1].x}px` : '30%',
                top: journeyAnchorPx[1]?.y != null ? `${journeyAnchorPx[1].y + DOT_TO_ICON_GAP_PX}px` : '31.25%',
                transform: 'translateX(-50%)',
                opacity: mounted ? 1 : 0 
              }}
            >
              <StageCard data={getStage(1)} isEven={true} />
            </div>

            {/* Node 3 (Peak) - 인플루언서 마케팅 */}
            <div 
              className="absolute transition-all duration-700 delay-[400ms] hover:z-50 z-10"
              style={{ 
                left: journeyAnchorPx[2]?.x != null ? `${journeyAnchorPx[2].x}px` : '50%',
                top: journeyAnchorPx[2]?.y != null ? `${journeyAnchorPx[2].y + DOT_TO_ICON_GAP_PX}px` : '30%',
                transform: 'translateX(-50%)',
                opacity: mounted ? 1 : 0 
              }}
            >
              <StageCard data={getStage(2)} isEven={false} />
                      </div>

            {/* Node 4 - PR */}
            <div 
              className="absolute transition-all duration-700 delay-[600ms] hover:z-50 z-10"
              style={{ 
                left: journeyAnchorPx[3]?.x != null ? `${journeyAnchorPx[3].x}px` : '70%',
                top: journeyAnchorPx[3]?.y != null ? `${journeyAnchorPx[3].y + DOT_TO_ICON_GAP_PX}px` : '31.25%',
                transform: 'translateX(-50%)',
                opacity: mounted ? 1 : 0 
              }}
            >
              <StageCard data={getStage(3)} isEven={true} />
                    </div>

            {/* Node 5 - 미국 수출 연결 기회 (Node 1과 정확히 동일한 높이) */}
            <div 
              className="absolute transition-all duration-700 delay-[800ms] hover:z-50 z-10"
              style={{ 
                left: journeyAnchorPx[4]?.x != null ? `${journeyAnchorPx[4].x}px` : '90%',
                top: journeyAnchorPx[4]?.y != null ? `${journeyAnchorPx[4].y + DOT_TO_ICON_GAP_PX}px` : '35%',
                transform: 'translateX(-50%)',
                opacity: mounted ? 1 : 0 
              }}
                        >
              <StageCard data={getStage(4)} isEven={false} />
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
