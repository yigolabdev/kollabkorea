/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
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

const About: React.FC = () => {
  return (
    <div className="bg-[#EDEBE4]">
      {/* Hero Header - Text Centered */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 max-w-7xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-8xl font-extrabold text-black leading-[0.95] mb-10 uppercase tracking-normal"
        >
          Born in Los Angeles.<br />Operated in Korea.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl md:text-3xl font-semibold text-black/60 uppercase tracking-[0.08em]"
        >
          Where Global Ambition Meets Local Expertise
        </motion.p>
      </section>

      {/* Gallery Section - Moved here from bottom */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-black/10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {[1,2,3,4,5,6].map(i => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="aspect-square bg-black/5 border border-black/10 flex items-center justify-center grayscale overflow-hidden group cursor-crosshair"
            >
              <span className="text-sm font-semibold text-black/30 uppercase tracking-tight group-hover:text-black transition-colors">KOLLAB_LA_IMG_00{i}</span>
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Intro Grid */}
      <section className="py-32 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-extrabold text-black uppercase tracking-tight">KOLLAB<br />SEOUL & LA</h2>
            <p className="text-2xl md:text-3xl font-semibold leading-tight text-black/60 uppercase tracking-[0.08em]">
              KOLLAB is an LA-born, experience-driven curation retail platform.
            </p>
            <p className="text-xl font-medium text-black/70 tracking-wide break-keep">
              KOLLAB은 LA에서 시작된<br />경험 중심의 큐레이션 리테일 플랫폼입니다.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-6 text-xl font-medium leading-relaxed text-black/70 tracking-wide">
            <p className="uppercase">
              KOLLAB KOREA OPERATES AS THE OFFICIAL<br />
              AND EXCLUSIVE PARTNER IN KOREA<br />
              CONNECTING THE KOREAN MARKET<br />
              WITH CURATED POP-UP OPPORTUNITIES<br />
              IN THE UNITED STATES.
            </p>
            <p className="text-black/70 break-keep">
              KOLLAB KOREA는 한국 시장에서 브랜드를 선별·운영하고<br />
              검증된 브랜드를 미국 팝업 기회로 연결하는 역할을 합니다.
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="aspect-square bg-black/5 overflow-hidden"
        >
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1000&auto=format&fit=crop" alt="KOLLAB Retail Concept" className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-700" />
        </motion.div>
      </section>

      {/* What We Do */}
      <section className="py-24 bg-white px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto text-center space-y-8"
        >
          <h2 className="text-6xl md:text-8xl font-extrabold text-black uppercase tracking-normal">What We Do</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <p className="text-3xl font-semibold text-black/60 uppercase tracking-[0.08em]">
              We build an offline pathway from Korea to the U.S.
            </p>
            <p className="text-2xl font-medium text-black/60 tracking-wide break-keep">
              우리는 한국에서 미국으로 이어지는 오프라인 경로를 만듭니다.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Philosophy & Role */}
      <section className="py-32 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-12 bg-[#EDEBE4] hover:translate-x-2 hover:translate-y-2 transition-all"
        >
          <h3 className="text-3xl font-extrabold text-black uppercase mb-8 underline underline-offset-8 tracking-wide">Our Philosophy</h3>
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-xl font-semibold text-black/70 uppercase tracking-wide">
                Rather than offering consulting or one-time promotions, KOLLAB provides a structured platform where brands can test, grow, and expand through real retail experience.
              </p>
              <p className="text-lg font-medium text-black/70 tracking-wide break-keep">
                KOLLAB은 컨설팅이나 일회성 홍보를 제공하지 않습니다. 실제 리테일 환경에서 브랜드가 검증 → 성장 → 확장할 수 있는 구조를 제공합니다.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="p-12 bg-black text-[#EDEBE4] hover:translate-x-2 hover:translate-y-2 transition-all"
        >
          <h3 className="text-3xl font-extrabold uppercase mb-8 underline underline-offset-8 text-[#EDEBE4] tracking-wide">Our Role</h3>
          <div className="space-y-12">
            <div className="space-y-4">
              <p className="text-5xl font-extrabold uppercase leading-none tracking-tight">KOLLAB is not an agency.<br />KOLLAB is a platform.</p>
            </div>
            <div className="space-y-6">
              <p className="text-xl font-semibold uppercase tracking-wide">
                We curate brands, operate spaces, and create opportunities for physical growth across markets.
              </p>
              <p className="text-lg font-medium opacity-80 tracking-wide break-keep">
                우리는 브랜드를 선별하고, 공간을 운영하며, 시장을 넘나드는 오프라인 성장 기회를 만듭니다.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;