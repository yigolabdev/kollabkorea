
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../LanguageContext';
import { faqContentEn } from '../content/faq.en';
import { faqContentKo } from '../content/faq.ko';

const getContent = (lang: 'en' | 'ko') => (lang === 'en' ? faqContentEn : faqContentKo);

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

const FAQ: React.FC = () => {
  const { language } = useLanguage();
  const content = getContent(language);
  return (
    <div className="bg-white pt-12 md:pt-18 pb-24 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-6xl font-bold mb-24 text-center text-black tracking-normal leading-[0.95]">{content.heroTitle}</h1>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="space-y-16"
      >
        {content.items.map((item, i) => (
          <motion.div key={i} variants={itemVariants} className="border-b-2 border-black/10 pb-16">
            <h4 className={`text-2xl md:text-3xl font-semibold mb-8 text-black leading-tight tracking-normal ${language === 'ko' ? 'break-keep' : ''}`}>
              Q{i + 1}. {item.q}
            </h4>
            <p
              className={`text-[#1A1A1A] leading-relaxed text-lg md:text-xl font-medium tracking-normal whitespace-pre-line ${
                language === 'ko' ? 'break-keep' : ''
              }`}
            >
              {item.a}
            </p>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="mt-24 p-12 border-2 border-black text-center">
        <p className="text-base font-semibold tracking-[0.22em] mb-4">
          {content.bottom.lead}
        </p>
        <p className="text-lg opacity-80 max-w-2xl mx-auto tracking-wide">
          {content.bottom.more}
        </p>
        <p className={`text-lg opacity-80 max-w-2xl mx-auto tracking-wide ${language === 'ko' ? 'break-keep' : ''}`}>
          {content.bottom.koLine} <a href="mailto:INFO@KOLLAB-LA.COM" className="underline underline-offset-8">직접 문의해 주세요.</a>
        </p>
      </div>
    </div>
  );
};

export default FAQ;
