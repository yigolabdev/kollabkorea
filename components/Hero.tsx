
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface HeroProps {
  onApplyClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onApplyClick }) => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12 lg:px-20 pt-20 bg-white text-black overflow-hidden">
      {/* Yellow accent block - top left */}
      <div className="absolute top-0 left-0 w-full h-32 bg-[#FFD700] -z-10"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ 
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="max-w-5xl mx-auto w-full relative z-10">
        <div className="flex flex-col space-y-12">
          
          {/* Main Headline */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="font-black text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-black break-keep">
              {language === 'ko' ? (
                <>
                  From Korea to the U.S. — <br className="hidden md:block" />
                  Where Brands Meet <br className="hidden md:block" />
                  Physical Experience
                </>
              ) : (
                <>
                  From Korea to the U.S. — <br className="hidden md:block" />
                  Where Brands Meet <br className="hidden md:block" />
                  Physical Experience
                </>
              )}
            </h1>
          </div>
          
          {/* Divider */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}>
            <div className="h-[2px] w-24 bg-black"></div>
          </div>

          {/* Description - English */}
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed text-black/80 break-keep max-w-3xl">
              A curated offline retail platform<br />
              that connects brands from the Korean market<br />
              to real-world pop-up experiences in the United States.
            </p>
          </div>

          {/* Description - Korean */}
          <div className={`transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-base md:text-lg lg:text-xl font-semibold leading-relaxed text-black/70 break-keep">
              한국에서 브랜드를 알리고,<br />
              미국 팝업으로 확장할 수 있는 실질적인 오프라인 플랫폼
            </p>
          </div>

          {/* CTA Button */}
          <div className={`flex items-start pt-8 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button 
              onClick={onApplyClick}
              className="px-12 py-5 bg-black text-white font-black text-sm tracking-[0.2em] uppercase flex items-center group hover:bg-[#dc0000] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span className="relative z-10">APPLY NOW</span>
              <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform relative z-10" size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black/20 to-transparent"></div>
    </div>
  );
};

export default Hero;
