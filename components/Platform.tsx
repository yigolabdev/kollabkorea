import React, { useEffect, useRef, useState } from 'react';
import { Zap, Star, Info, ArrowUpRight, Check } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Platform: React.FC = () => {
  const { t } = useLanguage();
  const tiers = t('platform.tiers') || [];
  const allInclude = t('platform.allInclude') || [];
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
      {/* Header */}
      <div className={`mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-8">
          <h2 className="logo-font text-5xl md:text-8xl leading-[0.85] tracking-tighter text-black">
            CHOOSE YOUR <span className="text-[#dc0000]">ZONE.</span>
          </h2>
          <p className="text-xl md:text-2xl font-bold tracking-tight text-black/60 uppercase mt-4">
            {t('platform.subtitle')}
          </p>
        </div>

        {/* All Include - Compact Version at Top */}
        <div className="mt-12 pt-8 border-t border-black/10">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Check size={16} className="text-[#dc0000]" />
            <span className="text-xs font-black tracking-[0.3em] uppercase text-black/50">
              {t('platform.everyPackage')} {t('platform.includes')}
            </span>
            <Check size={16} className="text-[#dc0000]" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 max-w-5xl mx-auto">
            {allInclude.map((item: any, idx: number) => (
              <div 
                key={idx} 
                className="flex items-center space-x-3 group cursor-default"
              >
                <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-black/30 group-hover:border-[#dc0000] group-hover:bg-[#dc0000] group-hover:text-white transition-all duration-300">
                  <ArrowUpRight size={14} className="opacity-60 group-hover:opacity-100" />
                </div>
                <span className="text-sm font-bold uppercase tracking-tight text-black/70 group-hover:text-black transition-colors">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Zone Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier: any, idx: number) => (
          <div 
            key={tier.id} 
            className={`group relative flex flex-col bg-white transition-all duration-700 hover:-translate-y-4 hover:scale-[1.02] border-2 ${
              tier.popular ? 'border-[#dc0000]' : 'border-black/10'
            } shadow-lg hover:shadow-2xl cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${idx * 150}ms` }}
          >
            {/* Popular Badge */}
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                <div className="px-6 py-2 bg-[#dc0000] text-white text-[10px] font-black tracking-[0.3em] uppercase shadow-lg">
                  POPULAR
                </div>
              </div>
            )}

            {/* Subtle Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#c0c0c0]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="p-8 md:p-10 flex flex-col h-full relative z-10">
              {/* Header */}
              <div className="flex justify-between items-start mb-12">
                <div className="flex-1">
                  <span className={`text-[9px] font-black tracking-[0.4em] uppercase mb-2 block transition-all ${
                    tier.popular ? 'text-[#dc0000]' : 'text-black/30 group-hover:text-[#dc0000]'
                  }`}>
                    {tier.type}
                  </span>
                  <h3 className="logo-font text-2xl md:text-3xl tracking-tighter uppercase leading-none text-black group-hover:text-[#dc0000] transition-colors">
                    {tier.name}
                  </h3>
                </div>
                <div className={`transition-all duration-700 group-hover:scale-125 group-hover:rotate-12 ${
                  tier.popular ? 'text-[#dc0000]' : 'text-black/10 group-hover:text-[#dc0000]'
                }`}>
                   {tier.id === 'premium' ? <Star size={24} fill="currentColor" /> : <Zap size={24} />}
                </div>
              </div>

              {/* Description */}
              <p className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-8 pb-8 border-b border-black/5 leading-relaxed group-hover:text-black/60 transition-colors">
                {tier.sub}
              </p>

              {/* Features */}
              <div className="flex-grow space-y-4">
                {tier.features.map((feature: any, idx: number) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className={`w-1 h-1 mt-1.5 shrink-0 rounded-full transition-all ${
                      tier.popular ? 'bg-[#dc0000]' : 'bg-black/20 group-hover:bg-[#dc0000]'
                    }`} />
                    <span className="text-[11px] font-bold tracking-tight uppercase leading-snug text-black/80 group-hover:text-black transition-colors">
                      {typeof feature === 'string' ? feature : feature.t}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Hover Bottom Line */}
              <div className="pt-6 mt-6 flex items-center justify-center opacity-0 group-hover:opacity-20 transition-opacity border-t border-black/0 group-hover:border-black/10">
                <ArrowUpRight size={16} className="text-black" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Note - Compact */}
      <div className={`mt-12 flex items-center justify-center space-x-3 opacity-30 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-30' : 'opacity-0'}`}>
        <Info size={12} className="text-black" />
        <span className="text-[9px] font-black tracking-[0.2em] uppercase text-black">
          {t('platform.disclaimer').split('\n')[0]}
        </span>
      </div>
    </div>
  );
};

export default Platform;
