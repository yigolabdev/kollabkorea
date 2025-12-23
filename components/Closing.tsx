
import React from 'react';
import { useLanguage } from '../LanguageContext';

const Closing: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative py-48 md:py-64 bg-zinc-100 flex items-center justify-center overflow-hidden">
      {/* Background Watermark Logo */}
      <div className="absolute inset-0 opacity-5 select-none pointer-events-none">
        <div className="logo-font text-[25vw] leading-[0.7] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <span>KOL</span>
          <span>LAB</span>
        </div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-8xl logo-font leading-[1.05] text-black tracking-tighter">
          {t('home.closing')}
        </h2>
        <div className="mt-20 flex justify-center">
          <div className="w-32 h-2 bg-kollab-red"></div>
        </div>
      </div>
    </div>
  );
};

export default Closing;
