/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { contactContentEn } from '../content/contact.en';
import { contactContentKo } from '../content/contact.ko';
import ScrollIndicator from '../components/ScrollIndicator';
import { containerVariants, itemVariants } from '../utils/animations';

const Space: React.FC = () => {
  const { language } = useLanguage();
  const content = language === 'en' ? contactContentEn : contactContentKo;

  return (
    <div className="bg-white">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[80vh] md:min-h-[88vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/images/hero/Contact_bg.png" 
            alt="Space Structure Hero Background"
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight leading-[0.95] mb-6"
          >
            SPACE STRUCTURE
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className={`text-xl md:text-2xl lg:text-3xl font-semibold text-white/90 leading-relaxed ${
              language === 'ko' ? 'break-keep' : ''
            }`}
          >
            {language === 'ko' ? '브랜드 목표에 맞춘 유연한 공간 구조' : 'Flexible spaces based on brand goals'}
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <ScrollIndicator className="absolute bottom-8 left-1/2 -translate-x-1/2" delay={1.2} />
      </section>

      {/* Tier Cards Section */}
      <section className="bg-zinc-50 pt-16 md:pt-24 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-12 md:mb-16 text-center"
          >
            <h2 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tight whitespace-pre-line">
              {language === 'ko' ? 'PARTNERSHIP PLANS' : 'PARTNERSHIP PLANS'}
            </h2>
          </motion.div>

          {/* Desktop: Premium Table Design */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="hidden md:block"
          >
            <div className="bg-white shadow-2xl overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="w-[16%] py-8 px-6 bg-black border border-zinc-800">
                      <div className="text-sm font-black uppercase tracking-[0.15em] text-white text-center">
                        {language === 'ko' ? '구분' : 'Category'}
                      </div>
                    </th>
                    {content.spaceStructure.tiers.map((tier, idx) => {
                      const isPremium = tier.accent === 'premium';
                      return (
                        <th
                          key={`header-${tier.name}-${idx}`}
                          className={`text-center py-8 px-6 relative border ${
                            isPremium 
                              ? 'bg-kollab-red border-kollab-red' 
                              : 'bg-black border-zinc-800'
                          }`}
                        >
                          <div className="text-white text-3xl md:text-4xl font-black uppercase tracking-tight">
                            {tier.name}
                          </div>
                          {tier.subtitle && (
                            <div className="text-white/80 text-sm font-semibold mt-2">
                              {tier.subtitle}
                            </div>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {content.spaceStructure.rowLabels?.map((label, rowIdx) => {
                    const lines = content.spaceStructure.tiers.map((tier) =>
                      (language === 'ko' ? tier.linesKo : tier.linesEn)[rowIdx] || ''
                    );
                    return (
                      <tr key={`row-${rowIdx}`} className="group hover:bg-zinc-50/50 transition-all duration-200">
                        <td className="py-7 px-6 text-sm font-black uppercase tracking-[0.1em] text-black bg-zinc-100 border border-zinc-300 align-middle text-center whitespace-pre-line">
                          {label}
                        </td>
                        {content.spaceStructure.tiers.map((tier, colIdx) => {
                          const lineText = lines[colIdx];
                          const isPremium = tier.accent === 'premium';
                          const isDash = lineText === '-';
                          const isO = lineText === 'O';
                          const isX = lineText === 'X';
                          return (
                            <td
                              key={`cell-${tier.name}-${rowIdx}-${colIdx}`}
                              className={`py-7 px-6 text-center align-middle border ${
                                isPremium 
                                  ? 'bg-red-50 border-red-200' 
                                  : 'bg-white border-zinc-300'
                              }`}
                            >
                              {isDash ? (
                                <div className="text-zinc-300 text-xl font-black">✕</div>
                              ) : isO ? (
                                <div className="text-green-600 text-2xl font-black">●</div>
                              ) : isX ? (
                                <div className="text-zinc-300 text-xl font-black">✕</div>
                              ) : (
                                <div className={`text-base font-bold leading-relaxed ${
                                  language === 'ko' ? 'break-keep' : ''
                                } ${
                                  isPremium 
                                    ? 'text-kollab-red' 
                                    : 'text-black'
                                }`}>
                                  {lineText}
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Mobile: Modern Card Layout */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="md:hidden space-y-6"
          >
            {content.spaceStructure.tiers.map((tier, idx) => {
              const lines = language === 'ko' ? tier.linesKo : tier.linesEn;
              const isPremium = tier.accent === 'premium';
              return (
                <motion.div
                  key={`mobile-${tier.name}-${idx}`}
                  variants={itemVariants}
                  className={`relative overflow-hidden bg-white ${
                    isPremium 
                      ? 'shadow-2xl border-4 border-kollab-red' 
                      : 'shadow-lg border-2 border-zinc-300'
                  }`}
                >
                  {/* Header */}
                  <div className={`py-6 px-6 ${
                    isPremium ? 'bg-kollab-red' : 'bg-black'
                  }`}>
                    <h3 className="text-white text-3xl font-black uppercase tracking-tight text-center">
                      {tier.name}
                    </h3>
                    {tier.subtitle && (
                      <p className="text-white/80 text-sm font-semibold mt-2 text-center">
                        {tier.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Content Table */}
                  <div className="divide-y divide-zinc-200">
                    {content.spaceStructure.rowLabels?.map((label, lineIdx) => {
                      const lineText = lines[lineIdx];
                      const isDash = lineText === '-';
                      const isO = lineText === 'O';
                      const isX = lineText === 'X';
                      return (
                        <div key={`mobile-line-${lineIdx}`} className={`flex items-center py-4 px-6 ${
                          isPremium ? 'bg-red-50/30' : 'bg-white'
                        }`}>
                          <div className="font-black text-xs uppercase tracking-wider text-zinc-500 w-[100px] flex-shrink-0 whitespace-pre-line leading-tight">
                            {label}
                          </div>
                          <div className="flex-1 text-right">
                            {isDash ? (
                              <span className="text-zinc-300 text-lg font-black">✕</span>
                            ) : isO ? (
                              <span className="text-green-600 text-xl font-black">●</span>
                            ) : isX ? (
                              <span className="text-zinc-300 text-lg font-black">✕</span>
                            ) : (
                              <span className={`text-sm font-bold ${
                                language === 'ko' ? 'break-keep' : ''
                              } ${isPremium ? 'text-kollab-red' : 'text-black'}`}>
                                {lineText}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Additional Information Section */}
          {content.spaceStructure.additionalInfo && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="mt-12 md:mt-16"
            >
              <div className="bg-white p-8 md:p-12 shadow-lg">
                <h3 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight mb-8">
                  {language === 'ko' ? content.spaceStructure.additionalInfo.titleKo : content.spaceStructure.additionalInfo.titleEn}
                </h3>
                <div className="space-y-4">
                  {(language === 'ko' ? content.spaceStructure.additionalInfo.stepsKo : content.spaceStructure.additionalInfo.stepsEn).map((step, idx) => (
                    <div key={`step-${idx}`} className="flex items-start gap-4">
                      <div className={`text-lg font-bold leading-relaxed ${language === 'ko' ? 'break-keep' : ''} text-black`}>
                        {step}
                      </div>
                    </div>
                  ))}
                </div>
                <div className={`mt-8 pt-6 border-t-2 border-zinc-200 text-sm font-semibold text-black/70 ${language === 'ko' ? 'break-keep' : ''}`}>
                  {language === 'ko' ? content.spaceStructure.additionalInfo.noteKo : content.spaceStructure.additionalInfo.noteEn}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Space;
