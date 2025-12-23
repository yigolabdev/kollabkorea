
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 bg-black text-white overflow-hidden">
      {/* Background visual elements following the Metallic Silver and Red palette */}
      <div className="absolute inset-0 bg-[#000000]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#dc0000]/5 rounded-full blur-[160px] -z-0"></div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
        <div className="flex flex-col items-center space-y-12">
          {/* Slogan - Correct Hierarchical placement from Design System */}
          <div className="space-y-1">
            <h2 className="slogan-font text-3xl md:text-5xl tracking-[-0.03em] leading-tight text-white">
              {t('hero.title1')}
            </h2>
            <h2 className="slogan-font text-3xl md:text-5xl tracking-[-0.03em] leading-tight kollab-red">
              {t('hero.title2')}
            </h2>
          </div>
          
          {/* Main Logo Font Scale */}
          <h1 className="logo-font text-8xl md:text-[220px] leading-[0.8] tracking-[-0.08em] text-white">
            KOLLAB
          </h1>
          
          <div className="space-y-4 pt-4">
            <p className="text-lg md:text-xl font-black tracking-[0.1em] text-white/40 uppercase">
              {t('home.tagline')}
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6 pt-16">
            <button className="px-16 py-7 bg-kollab-red text-white font-black tracking-[0.3em] uppercase flex items-center group hover:bg-white hover:text-black transition-all shadow-2xl">
              {t('hero.cta')}
              <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform" size={20} />
            </button>
            <button className="px-16 py-7 border border-white/20 text-white font-black tracking-[0.3em] uppercase hover:bg-white/10 transition-all">
              {t('hero.discover')}
            </button>
          </div>
        </div>
      </div>

      {/* Decorative vertical line from Design System rhythm */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-20">
        <div className="w-[1px] h-24 bg-[#ffffff]"></div>
      </div>
    </div>
  );
};

export default Hero;
