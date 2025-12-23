
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface HeroProps {
  onApplyClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onApplyClick }) => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    // Mouse parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 bg-black text-white overflow-hidden">
      {/* Animated Background Layers */}
      <div className="absolute inset-0 bg-[#000000]"></div>
      
      {/* Multiple Gradient Orbs with different animations */}
      <div 
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#dc0000]/10 rounded-full blur-[120px] animate-pulse"
        style={{ 
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      ></div>
      <div 
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#dc0000]/8 rounded-full blur-[100px]"
        style={{ 
          animation: 'float 8s ease-in-out infinite',
          transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      ></div>
      
      {/* Animated Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'linear-gradient(rgba(220,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(220,0,0,0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite'
        }}
      ></div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#dc0000] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.3
            }}
          ></div>
        ))}
      </div>

      {/* Spotlight Effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x}% ${50 + mousePosition.y}%, rgba(220,0,0,0.1) 0%, transparent 50%)`
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto w-full relative z-10 text-center">
        <div className="flex flex-col items-center space-y-16">
          
          {/* Main Title with Gradient Text Effect */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <h1 className="logo-font text-5xl md:text-[100px] lg:text-[120px] leading-[0.9] tracking-[-0.04em] mb-6 relative">
              <span className="relative inline-block">
                WHERE{' '}
                <span className="text-[#dc0000] relative inline-block hover:scale-105 transition-transform duration-300">
                  SEOUL
                  {/* Shine effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine"></span>
                </span>
              </span>
              <br />
              <span className="relative inline-block">
                MEETS{' '}
                <span className="text-[#dc0000] relative inline-block hover:scale-105 transition-transform duration-300">
                  LA
                  {/* Shine effect */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine" style={{ animationDelay: '0.5s' }}></span>
                </span>
              </span>
            </h1>
          </div>
          
          {/* Subtitle with typing effect appearance */}
          <div className={`space-y-6 max-w-4xl transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-2xl md:text-3xl font-black tracking-tight text-white/90 uppercase leading-tight">
              {t('hero.subtitle')}
            </p>
            <div className="flex items-center justify-center space-x-6">
              <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-[#dc0000] animate-expand-width"></div>
              <p className="text-base md:text-lg font-bold tracking-wide text-white/60 uppercase">
                {t('hero.desc')}
              </p>
              <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-[#dc0000] animate-expand-width"></div>
            </div>
          </div>
          
          {/* CTA Button with Enhanced Effects */}
          <div className={`flex items-center justify-center pt-8 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button 
              onClick={onApplyClick}
              className="relative px-20 py-7 bg-[#dc0000] text-white font-black tracking-[0.3em] uppercase flex items-center group overflow-hidden transition-all duration-500 shadow-2xl hover:shadow-[0_0_50px_rgba(220,0,0,0.6)] hover:scale-105"
            >
              {/* Animated background layers */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500"></span>
              
              {/* Pulse ring effect */}
              <span className="absolute inset-0 border-2 border-white/30 scale-100 group-hover:scale-110 opacity-100 group-hover:opacity-0 transition-all duration-500"></span>
              
              <span className="relative z-10">{t('hero.cta')}</span>
              <ArrowRight className="ml-4 relative z-10 group-hover:translate-x-2 transition-transform" size={20} />
            </button>
          </div>

          {/* Location Tags with Pulse Effect */}
          <div className={`flex items-center justify-center space-x-12 pt-12 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center space-x-3 group cursor-default">
              <div className="relative">
                <div className="w-2 h-2 bg-[#dc0000] group-hover:scale-150 transition-transform rounded-full"></div>
                <div className="absolute inset-0 w-2 h-2 bg-[#dc0000] rounded-full animate-ping opacity-75"></div>
              </div>
              <span className="text-sm font-black tracking-[0.3em] text-white/40 group-hover:text-white/70 transition-colors uppercase">SEOUL</span>
            </div>
            <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
            <div className="flex items-center space-x-3 group cursor-default">
              <div className="relative">
                <div className="w-2 h-2 bg-[#dc0000] group-hover:scale-150 transition-transform rounded-full"></div>
                <div className="absolute inset-0 w-2 h-2 bg-[#dc0000] rounded-full animate-ping opacity-75" style={{ animationDelay: '0.5s' }}></div>
              </div>
              <span className="text-sm font-black tracking-[0.3em] text-white/40 group-hover:text-white/70 transition-colors uppercase">LOS ANGELES</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Elements - No Bounce */}
      <div className="absolute bottom-12 left-0 right-0 flex items-center justify-center space-x-2 opacity-20">
        <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
        <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
        }
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(300%) skewX(-12deg); }
        }
        @keyframes expand-width {
          0% { width: 0; }
          100% { width: 4rem; }
        }
        .animate-shine {
          animation: shine 3s ease-in-out infinite;
        }
        .animate-expand-width {
          animation: expand-width 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Hero;
