
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import Spline from '@splinetool/react-spline';

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
    <div className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12 lg:px-20 pt-20 text-white overflow-hidden bg-black">
      {/* Spline 3D Interactive Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        <Spline
          scene="https://prod.spline.design/v9KY2a3oVA7NOMb0/scene.splinecode"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" style={{ zIndex: 1 }}></div>
      
      <div className="max-w-5xl mx-auto w-full relative" style={{ zIndex: 10 }}>
        <div className="flex flex-col space-y-12">
          
          {/* Main Headline */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="font-black text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight text-white break-keep" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)' }}>
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
            <div className="h-[2px] w-24 bg-white" style={{ boxShadow: '0 2px 10px rgba(255,255,255,0.5)' }}></div>
          </div>

          {/* Description - English */}
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-lg md:text-xl lg:text-2xl font-medium leading-relaxed text-white/95 break-keep max-w-3xl" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.8), 0 1px 5px rgba(0,0,0,0.5)' }}>
              A curated offline retail platform<br />
              that connects brands from the Korean market<br />
              to real-world pop-up experiences in the United States.
            </p>
          </div>

          {/* Description - Korean */}
          <div className={`transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-base md:text-lg lg:text-xl font-semibold leading-relaxed text-white/90 break-keep" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.7), 0 1px 4px rgba(0,0,0,0.5)' }}>
              한국에서 브랜드를 알리고,<br />
              미국 팝업으로 확장할 수 있는 실질적인 오프라인 플랫폼
            </p>
          </div>

          {/* CTA Button */}
          <div className={`flex items-start pt-8 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button 
              onClick={onApplyClick}
              className="px-12 py-5 bg-white text-black font-black text-sm tracking-[0.2em] uppercase flex items-center group hover:bg-[#dc0000] hover:text-white transition-all duration-300 shadow-2xl hover:shadow-[0_0_30px_rgba(220,0,0,0.6)] hover:scale-105"
            >
              <span className="relative z-10">APPLY NOW</span>
              <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform relative z-10" size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" style={{ zIndex: 2 }}></div>
    </div>
  );
};

export default Hero;
