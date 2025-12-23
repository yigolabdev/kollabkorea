import React, { useEffect, useRef, useState } from 'react';
import { Globe, ShieldCheck, Layout, Zap } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Features: React.FC = () => {
  const { t } = useLanguage();
  const reasons = t('home.reasons') || [];
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const icons = [
    <Globe size={32} strokeWidth={1.5} />,
    <ShieldCheck size={32} strokeWidth={1.5} />,
    <Layout size={32} strokeWidth={1.5} />,
    <Zap size={32} strokeWidth={1.5} />
  ];

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
      <div className={`mb-16 text-center md:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-xs font-black tracking-[0.5em] text-[#dc0000] mb-4 uppercase">
          {t('home.advantages')}
        </h2>
        <h3 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-black">
          {t('home.whyTitle')?.split('choose')[0]}<br />
          <span className="text-black opacity-20">CHOOSE KOLLAB</span>
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/5 border border-black/5">
        {reasons.map((reason: any, idx: number) => (
          <div 
            key={idx} 
            className={`bg-white p-10 flex flex-col items-start group hover:bg-black hover:-translate-y-2 transition-all duration-700 h-full ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${idx * 150}ms` }}
          >
            <div className="mb-10 p-5 bg-zinc-50 group-hover:bg-zinc-800 text-black group-hover:text-white group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 rounded-full border border-black/5">
              {icons[idx]}
            </div>
            <h4 className="text-2xl font-black tracking-tighter mb-5 text-black group-hover:text-white transition-colors uppercase leading-none">
              {reason.title}
            </h4>
            <p className="text-sm text-gray-500 group-hover:text-zinc-400 leading-relaxed font-semibold transition-colors uppercase tracking-wide">
              {reason.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
