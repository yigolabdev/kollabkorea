
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const SPACE_STRUCTURE = [
  {
    type: "Premium",
    title: "Flagship-level visibility and storytelling.",
    desc: "브랜드 스토리를 집중적으로 보여주는 플래그십 포지션",
    points: ["Highest Traffic Zone", "Custom Build-outs", "Interactive Media Support"]
  },
  {
    type: "Standard",
    title: "Sales-driven testing and customer interaction.",
    desc: "판매 및 고객 반응 테스트 중심 공간",
    points: ["Optimized Retail Flow", "Direct Sales Support", "Core Inventory Placement"]
  },
  {
    type: "Basic",
    title: "Entry-level offline validation.",
    desc: "오프라인 검증을 시작하는 브랜드를 위한 구조",
    points: ["Shared Display Spaces", "Lean Operations", "Market Test Focused"]
  }
];

const FLOW = [
  {
    step: "01",
    title: "Korea Pop-up Validation",
    desc: "Test brand response in the Korean market.",
    kor: "한국 시장에서 브랜드 반응 검증"
  },
  {
    step: "02",
    title: "Curation & Performance Review",
    desc: "Evaluate brand readiness and scalability.",
    kor: "성과 및 확장 가능성 평가"
  },
  {
    step: "03",
    title: "U.S. Pop-up Opportunity",
    desc: "Selected brands may access curated U.S. pop-ups.",
    kor: "선별 브랜드에 한해 미국 팝업 기회 제공"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const Platform: React.FC = () => {
  return (
    <div className="bg-[#EDEBE4] pb-0">
      {/* Header */}
      <section className="pt-0 pb-24 px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="border-l-[16px] border-black pl-10 md:pl-16"
        >
          <h1 className="text-5xl md:text-8xl font-extrabold text-black leading-[0.95] mb-10 uppercase tracking-normal">PLATFORM</h1>
          {/* Hero interior image inserted between title and copy */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="my-8 w-full overflow-hidden"
          >
            <div className="aspect-[21/9] bg-black/5">
              <img 
                src="/assets/photos/shoots/design_guide03.png"
                alt="KOLLAB Interior Concept"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 items-start">
            <p className="text-xl md:text-3xl font-semibold text-black/60 leading-tight tracking-[0.08em] uppercase">
              KOLLAB is a structured offline platform<br />
              designed to validate brands in Korea<br />
              and selectively connect them<br />
              to pop-up opportunities<br />
              in the United States.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Space Structure - separated on black background */}
      <section className="py-24 px-6 bg-black text-[#EDEBE4]">
        <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl font-extrabold text-[#EDEBE4] uppercase mb-2 tracking-wide">Space Structure</h2>
          <p className="text-xl font-semibold text-[#EDEBE4]/80 uppercase tracking-wide">Flexible spaces based on brand goals</p>
          <p className="text-base font-medium text-[#EDEBE4]/70 tracking-wide">브랜드 목표에 맞춘 유연한 공간 구조</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {SPACE_STRUCTURE.map((space, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="p-10 bg-white flex flex-col transition-all duration-300"
            >
              <span className="text-sm font-extrabold text-[#EDEBE4] bg-black px-4 py-2 w-fit mb-6 uppercase tracking-[0.12em]">{space.type}</span>
              <h3 className="text-3xl font-extrabold text-black uppercase mb-4 leading-tight tracking-wide">{space.title}</h3>
              <p className="text-base font-medium text-black/70 mb-8 tracking-wide">{space.desc}</p>
              <ul className="mt-auto space-y-3">
                {space.points.map((p, pi) => (
                  <li key={pi} className="text-sm font-extrabold text-[#1A1A1A] uppercase border-l-2 border-black pl-3 tracking-wide">{p}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        </div>
      </section>

      {/* Flow Section - default background color */}
      <section className="py-32 bg-[#EDEBE4] text-black px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center"
          >
            <h2 className="text-6xl md:text-8xl font-extrabold uppercase mb-4 tracking-wide">Korea → U.S. Flow</h2>
            <p className="text-2xl font-semibold text-black/80 uppercase tracking-wide">From local validation to global experience</p>
            <p className="text-lg font-medium text-black/60 tracking-wide">한국 검증 → 글로벌 확장</p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-12"
          >
            {FLOW.map((f, i) => (
              <motion.div 
                key={i} 
                variants={itemVariants}
                className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 group"
              >
                <div className="text-7xl md:text-9xl font-extrabold text-black/30 group-hover:text-black transition-colors duration-500 tracking-tight w-[72px] md:w-[128px] text-right leading-none shrink-0">
                  {f.step}
                </div>
                <div className="flex-1 text-center md:text-left md:pl-1">
                  <h4 className="text-3xl md:text-5xl font-extrabold uppercase mb-2 tracking-wide text-black">{f.title}</h4>
                  <p className="text-xl font-semibold mb-1 text-black/90 uppercase tracking-wide">{f.desc}</p>
                  <p className="text-lg font-medium text-black/70 tracking-wide">{f.kor}</p>
                </div>
                {i < FLOW.length - 1 && (
                  <div className="md:hidden">
                    <ArrowDown className="w-12 h-12 text-black/30 animate-bounce" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-24 p-12 border-2 border-black/10 text-center text-black"
          >
            <p className="text-base font-semibold uppercase tracking-[0.22em] mb-4">Participation Notice</p>
            <p className="text-lg text-black/80 max-w-2xl mx-auto tracking-wide">
              U.S. pop-up participation is subject to internal review and partner approval. 
              미국 팝업은 내부 심사 및 파트너 승인에 따라 진행됩니다.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Platform;
