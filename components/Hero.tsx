
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface HeroProps {
  onApplyClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onApplyClick }) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 bg-black text-white overflow-hidden">
      {/* Background visual elements */}
      <div className="absolute inset-0 bg-[#000000]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#dc0000]/5 rounded-full blur-[160px] -z-0 animate-pulse"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{ 
        backgroundImage: 'linear-gradient(rgba(220,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(220,0,0,0.3) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
        <div className="flex flex-col items-center space-y-16">
          
          {/* Main Title - WHERE SEOUL MEETS LA */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <h1 className="logo-font text-5xl md:text-[100px] lg:text-[120px] leading-[0.9] tracking-[-0.04em] text-white mb-6">
              WHERE <span className="text-[#dc0000]">SEOUL</span><br />
              MEETS <span className="text-[#dc0000]">LA</span>
            </h1>
          </div>
          
          {/* Subtitle */}
          <div className={`space-y-6 max-w-4xl transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-2xl md:text-3xl font-black tracking-tight text-white/90 uppercase leading-tight">
              {t('hero.subtitle')}
            </p>
            <div className="flex items-center justify-center space-x-6">
              <div className="h-[1px] w-16 bg-[#dc0000]"></div>
              <p className="text-base md:text-lg font-bold tracking-wide text-white/60 uppercase">
                {t('hero.desc')}
              </p>
              <div className="h-[1px] w-16 bg-[#dc0000]"></div>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className={`flex items-center justify-center pt-8 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button 
              onClick={onApplyClick}
              className="px-20 py-7 bg-[#dc0000] text-white font-black tracking-[0.3em] uppercase flex items-center group hover:bg-white hover:text-black hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-[0_0_50px_rgba(220,0,0,0.5)] relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></span>
              <span className="relative z-10">{t('hero.cta')}</span>
              <ArrowRight className="ml-4 group-hover:translate-x-2 transition-transform relative z-10" size={20} />
            </button>
          </div>

          {/* Location Tags */}
          <div className={`flex items-center justify-center space-x-12 pt-12 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center space-x-3 group cursor-default">
              <div className="w-2 h-2 bg-[#dc0000] group-hover:scale-150 transition-transform"></div>
              <span className="text-sm font-black tracking-[0.3em] text-white/40 group-hover:text-white/70 transition-colors uppercase">SEOUL</span>
            </div>
            <div className="w-[1px] h-8 bg-white/20"></div>
            <div className="flex items-center space-x-3 group cursor-default">
              <div className="w-2 h-2 bg-[#dc0000] group-hover:scale-150 transition-transform"></div>
              <span className="text-sm font-black tracking-[0.3em] text-white/40 group-hover:text-white/70 transition-colors uppercase">LOS ANGELES</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative vertical line */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-20 animate-bounce">
        <div className="w-[1px] h-24 bg-[#ffffff]"></div>
      </div>
    </div>
  );
};

export default Hero;
