
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageToggle: React.FC = () => {
  const [lang, setLang] = useState<'EN' | 'KR'>('EN');

  const toggleLanguage = () => {
    setLang(prev => (prev === 'EN' ? 'KR' : 'EN'));
    // Translation logic could be implemented here using context or i18n
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleLanguage}
        className="w-16 h-16 bg-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all border-none cursor-pointer overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={lang}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-[#EDEBE4] font-extrabold text-xl tracking-tight"
          >
            {lang}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default LanguageToggle;
