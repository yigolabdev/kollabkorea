import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="max-w-7xl mx-auto space-y-24">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <h2 className="logo-font text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[0.9] uppercase text-black">
            {t('about.title')}
          </h2>
          <div className="space-y-6 text-gray-700 leading-relaxed max-w-lg">
            <p className="text-xl font-black text-black uppercase tracking-tight leading-tight">
              {t('about.p1')}
            </p>
            <p className="font-bold text-black/50 uppercase tracking-wide text-sm leading-relaxed">
              {t('about.p2')}
            </p>
            <div className="pt-8 border-t border-black/10 flex items-center space-x-16">
              <div className="group cursor-default hover:scale-110 transition-transform duration-300">
                <span className="block text-3xl font-black tracking-tighter text-black group-hover:text-[#dc0000] transition-colors">
                  LA
                </span>
                <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-black text-black">
                  {t('about.origin')}
                </span>
              </div>
              <div className="group cursor-default hover:scale-110 transition-transform duration-300">
                <span className="block text-3xl font-black tracking-tighter text-black group-hover:text-[#dc0000] transition-colors">
                  SEOUL
                </span>
                <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-black text-black">
                  {t('about.operation')}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          <div className="aspect-[16/9] bg-[#c0c0c0] overflow-hidden group border border-black/5 shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-700">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200" 
              alt="KOLLAB Store Interior" 
              className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"
            />
          </div>
        </div>
      </div>

      {/* Role and Philosophy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10 border border-black/10">
        <div className={`bg-white p-12 md:p-20 flex flex-col justify-center min-h-[500px] hover:bg-zinc-50 transition-all duration-700 relative overflow-hidden group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '500ms' }}>
          {/* Background Image */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
            <img 
              src="https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=800" 
              alt="Beauty Products" 
              className="w-full h-full object-cover grayscale"
            />
          </div>
          <div className="relative z-10">
            <h3 className="text-[10px] font-black tracking-[0.5em] text-[#dc0000] uppercase mb-8 group-hover:tracking-[0.7em] transition-all">
              {t('about.philosophy.title')}
            </h3>
            <p className="text-3xl md:text-5xl font-black tracking-tighter leading-[0.9] mb-8 uppercase text-black group-hover:text-[#dc0000] transition-colors">
              {t('about.philosophy.text')}
            </p>
            <p className="text-black/50 font-bold leading-relaxed text-base uppercase tracking-tight">
              {t('about.philosophy.desc')}
            </p>
          </div>
        </div>
        <div className={`bg-black text-white p-12 md:p-20 flex flex-col justify-center min-h-[500px] group relative overflow-hidden hover:bg-zinc-900 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '700ms' }}>
          {/* Background Image */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
            <img 
              src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&q=80&w=800" 
              alt="Modern Retail Space" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <h3 className="text-[10px] font-black tracking-[0.5em] text-white/40 uppercase mb-8 group-hover:tracking-[0.7em] transition-all">
              {t('about.role.title')}
            </h3>
            <p className="text-3xl md:text-5xl font-black tracking-tighter leading-[0.9] mb-8 uppercase text-white group-hover:text-[#dc0000] transition-colors">
              {t('about.role.text')}
            </p>
            <p className="text-white/40 font-bold leading-relaxed text-base uppercase tracking-tight">
              {t('about.role.desc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
