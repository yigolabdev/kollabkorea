import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../LanguageContext';
import { CheckCircle2 } from 'lucide-react';

const Brands: React.FC = () => {
  const { t } = useLanguage();
  const qualifications = t('brands.qualifications') || [];
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
    <div ref={sectionRef} className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
          <div>
            <h2 className="text-xs font-bold tracking-[0.5em] text-white/50 mb-3 uppercase">
              {t('brands.sub')}
            </h2>
            <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-white">
              {t('brands.title')}
            </h3>
          </div>
          <p className="text-xl text-white/70 leading-relaxed font-medium max-w-lg">
            {t('brands.desc')}
          </p>
          <div className="pt-8 border-t border-white/10">
            <div className="flex items-center space-x-4 mb-6 group">
              <div className="w-12 h-[1px] bg-[#dc0000] group-hover:w-24 transition-all duration-500"></div>
              <span className="text-[10px] font-black tracking-widest uppercase text-white/50 group-hover:text-white/70 transition-colors">
                {t('brands.selectiveTitle')}
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed uppercase tracking-wide font-medium">
              {t('brands.selectiveDesc')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {qualifications.map((item: any, idx: number) => (
            <div 
              key={idx} 
              className={`bg-zinc-950 p-8 space-y-5 group hover:bg-zinc-900 hover:-translate-y-1 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${idx * 150}ms` }}
            >
              <div className="text-[#dc0000] group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <CheckCircle2 size={32} strokeWidth={1.5} />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-black uppercase tracking-tighter text-white group-hover:text-[#dc0000] transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-white/50 leading-relaxed uppercase tracking-wider font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
