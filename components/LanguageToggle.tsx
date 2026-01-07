
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const current = language === 'en' ? 'EN' : 'KR';
  const nextLabel = language === 'en' ? 'KR' : 'EN';
  const toggleLanguage = () => setLanguage(language === 'en' ? 'ko' : 'en');

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleLanguage}
        aria-pressed={language === 'ko'}
        aria-label={language === 'en' ? 'Switch to Korean' : '영어로 전환'}
        className="w-16 h-16 bg-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all border-none cursor-pointer overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={current}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[#EDEBE4] font-extrabold text-xl tracking-tight"
          >
            {nextLabel}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default LanguageToggle;
