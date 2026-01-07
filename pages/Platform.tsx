/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { ROADMAP_DATA } from '../constants';
import StageCard from '../components/StageCard';
import CurvedPath from '../components/CurvedPath';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const Platform: React.FC = () => {
  const { language } = useLanguage();
  const [mounted, setMounted] = useState(false);
  
  // 첫 번째 노드의 기준 높이 (아이콘 중심 기준)
  const baseIconTop = '59%';

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-white">
      <section className="bg-white pt-16 md:pt-24 pb-24 px-6 max-w-7xl mx-auto">
        <img
          src="/assets/photos/shoots/design_guide02.png"
          alt="Platform design guide"
          className="w-full h-auto object-contain"
          loading="lazy"
        />

        {/* Roadmap Visualization - Arc Design */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 md:mt-16 py-16 md:py-20 relative bg-gradient-to-b from-white via-zinc-50/30 to-white rounded-2xl"
        >
          {/* Desktop View: The Arc */}
          <div className="hidden md:block relative w-full h-[600px] px-8">
            
            {/* SVG Connector Layer */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <CurvedPath />
            </div>

            {/* 
              Cards positioned absolutely based on the curve geometry.
              아이콘(이모티콘) 중심을 곡선 위에 정렬
              
              첫 번째(브랜드 액티베이션)와 다섯 번째(미국 수출)는 동일한 높이
              - baseIconTop: 59% (첫 번째 기준)
              - 다섯 번째도 동일한 baseIconTop 사용
              
              Transform: translate(-50%, -50%) - 아이콘 중심을 곡선 좌표에 정렬
            */}
            
            {/* Node 1 - 브랜드 액티베이션 (기준점 - 59%) */}
            <div 
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 delay-[0ms] hover:z-50"
              style={{ 
                left: '10%',
                top: baseIconTop,
                opacity: mounted ? 1 : 0 
              }}
            >
              <StageCard data={ROADMAP_DATA[0]} isEven={false} />
            </div>

            {/* Node 2 - 콘텐츠 제작 */}
            <div 
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 delay-[200ms] hover:z-50"
              style={{ 
                left: '30%',
                top: '49%',
                opacity: mounted ? 1 : 0 
              }}
            >
              <StageCard data={ROADMAP_DATA[1]} isEven={true} />
            </div>

            {/* Node 3 (Peak) - 인플루언서 마케팅 */}
            <div 
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 delay-[400ms] hover:z-50"
              style={{ 
                left: '50%',
                top: '45%',
                opacity: mounted ? 1 : 0 
              }}
            >
              <StageCard data={ROADMAP_DATA[2]} isEven={false} />
            </div>

            {/* Node 4 - PR */}
            <div 
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 delay-[600ms] hover:z-50"
              style={{ 
                left: '70%',
                top: '49%',
                opacity: mounted ? 1 : 0 
              }}
            >
              <StageCard data={ROADMAP_DATA[3]} isEven={true} />
            </div>

            {/* Node 5 - 미국 수출 연결 기회 (Node 1과 동일한 높이 - 59%) */}
            <div 
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 delay-[800ms] hover:z-50"
              style={{ 
                left: '90%',
                top: baseIconTop,
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
          className="mt-6 md:mt-8 p-12 border-2 border-kollab-black text-center max-w-4xl mx-auto bg-white"
        >
          <p className="text-base font-black tracking-[0.22em] mb-4 uppercase">
            PARTICIPATION NOTICE
          </p>
          <p className="text-lg font-semibold opacity-80 max-w-2xl mx-auto tracking-wide">
            {language === 'ko' 
              ? '미국 팝업은 내부 심사 및 파트너 승인에 따라 진행됩니다.'
              : 'U.S. pop-up participation is subject to internal review and partner approval.'
            }
          </p>
        </motion.div>
      </section>
    </div>
  );
};

export default Platform;
