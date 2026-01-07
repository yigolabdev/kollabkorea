/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { contactContentEn } from '../content/contact.en';
import { contactContentKo } from '../content/contact.ko';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const content = language === 'en' ? contactContentEn : contactContentKo;
  return (
    <div className="bg-white">
      {/* Intro Banner */}
      <section className="bg-white pt-12 md:pt-18 pb-24 px-6 max-w-7xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-6xl font-bold text-black leading-[0.95] mb-6 tracking-normal"
        >
          {content.hero.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`max-w-3xl mx-auto text-xl md:text-2xl font-semibold text-black/70 leading-[1.25] tracking-normal ${
            language === 'ko' ? 'break-keep' : ''
          }`}
        >
          {content.hero.deck}
        </motion.p>

        {/* Tier cards (STANDARD / PREMIUM / BASIC) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mt-14 md:mt-16 text-left w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-white p-0.5">
            {content.spaceStructure.tiers.map((tier, idx) => {
              const isPremium = tier.accent === 'premium';
              const lines = language === 'ko' ? tier.linesKo : tier.linesEn;
              const firstLine = lines[0];
              const rest = lines.slice(1);
              const tierLabel = tier.name ? tier.name.toLowerCase().replace(/^\w/, (c) => c.toUpperCase()) : '';
              return (
                <motion.div
                  key={`${tier.name}-${idx}`}
                  variants={itemVariants}
                  className={`group relative bg-[#f5f5f5] p-8 md:p-10 w-full transition-colors duration-300 ${
                    isPremium ? 'hover:bg-kollab-red' : 'hover:bg-black'
                  }`}
                >
                  <div className="absolute left-8 top-6 md:left-10 md:top-7 space-y-1">
                    <div
                      className={`text-4xl md:text-5xl font-thin leading-none tracking-tight transition-colors duration-300 ${
                        isPremium ? 'text-kollab-red' : 'text-black'
                      } group-hover:text-white`}
                    >
                      {tierLabel}
                    </div>

                    {firstLine ? (
                      <p
                        className={`text-xl md:text-2xl font-semibold text-black leading-[1.05] tracking-normal transition-colors duration-300 group-hover:text-white ${
                          language === 'ko' ? 'break-keep' : ''
                        }`}
                      >
                        {firstLine}
                      </p>
                    ) : null}
                  </div>

                  <div className="pt-20 md:pt-24">

                    {rest.length ? (
                      <div
                        className={`mt-3 space-y-2 text-lg md:text-xl font-medium text-black leading-relaxed tracking-normal transition-colors duration-300 group-hover:text-white ${
                          language === 'ko' ? 'break-keep' : ''
                        }`}
                      >
                        {rest.map((l, i) => (
                          <p key={i} className="whitespace-pre-line">
                            {l}
                          </p>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Scroll Indicator - About 스타일 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 1 }}
          className="mt-16 md:mt-20 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-12 bg-black/20"
          />
          <p className="text-xs font-medium text-black/30 tracking-wider">SCROLL</p>
        </motion.div>
      </section>

      {/* Apply Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24"
      >
        <div className="flex flex-col h-full">
          <motion.div variants={itemVariants} className="pt-16">
            <p
              className={`text-xl md:text-2xl font-semibold tracking-normal text-black/80 ${
                language === 'ko' ? 'break-keep' : ''
              }`}
              style={{ lineHeight: 1.34 }}
            >
              {content.applyLeft.copy.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < content.applyLeft.copy.split('\n').length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-16 lg:mt-20 space-y-10"
            style={{ fontFamily: '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, sans-serif' }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight">{content.contactInfo.title}</h2>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-bold text-black tracking-[0.12em] mb-2">{content.contactInfo.emailLabel}</p>
                <a href={`mailto:${content.contactInfo.email}`} className="text-3xl font-bold text-black hover:underline underline-offset-8 tracking-wide">
                  {content.contactInfo.email}
                </a>
              </div>
              <div>
                <p className="text-sm font-bold text-black tracking-[0.12em] mb-2">{content.contactInfo.instagramLabel}</p>
                <a href={content.contactInfo.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-3xl font-bold text-black hover:underline underline-offset-8 tracking-wide">
                  {content.contactInfo.instagram}
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Form */}
        <motion.div variants={itemVariants} className="bg-[#f5f5f5] p-10 md:p-12 border-2 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl md:text-4xl font-extrabold text-black mb-8 tracking-tight">{content.form.title}</h3>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-extrabold text-black tracking-[0.12em]">{content.form.fields.brandName}</label>
              <input type="text" className="w-full border-b-2 border-black/20 py-2.5 focus:outline-none focus:border-black text-lg font-semibold tracking-normal bg-transparent" placeholder="Kollab Beauty" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-extrabold text-black tracking-[0.12em]">{content.form.fields.contactPerson}</label>
                <input type="text" className="w-full border-b-2 border-black/20 py-2.5 focus:outline-none focus:border-black text-lg font-semibold tracking-normal bg-transparent" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-extrabold text-black tracking-[0.12em]">{content.form.fields.phone}</label>
                <input type="tel" className="w-full border-b-2 border-black/20 py-2.5 focus:outline-none focus:border-black text-lg font-semibold tracking-normal bg-transparent" placeholder="010-0000-0000" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-extrabold text-black tracking-[0.12em]">{content.form.fields.email}</label>
                <input type="email" className="w-full border-b-2 border-black/20 py-2.5 focus:outline-none focus:border-black text-lg font-semibold tracking-normal bg-transparent" placeholder="brand@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-extrabold text-black tracking-[0.12em]">{content.form.fields.category}</label>
                <select className="w-full border-b-2 border-black/20 py-2.5 focus:outline-none focus:border-black text-lg font-semibold bg-transparent tracking-normal">
                  <option>Beauty</option>
                  <option>Fashion</option>
                  <option>Goods</option>
                  <option>F&B</option>
                  <option>Life</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-extrabold text-black tracking-[0.12em]">{content.form.fields.website}</label>
              <input type="text" className="w-full border-b-2 border-black/20 py-2.5 focus:outline-none focus:border-black text-lg font-semibold tracking-normal bg-transparent" placeholder="https://..." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-extrabold text-black tracking-[0.12em]">{content.form.fields.message}</label>
              <textarea
                rows={3}
                className="w-full border-b-2 border-black/20 py-2.5 focus:outline-none focus:border-black text-lg font-medium tracking-normal bg-transparent resize-none"
                placeholder={language === 'ko' ? '브랜드를 간단히 소개해 주세요' : 'Brief intro...'}
              />
            </div>
            <button className="w-full bg-black text-[#EDEBE4] py-6 text-xl md:text-2xl font-extrabold tracking-[0.42em] hover:bg-[#1A1A1A] transition-all">{content.form.submit}</button>
          </form>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default Contact;