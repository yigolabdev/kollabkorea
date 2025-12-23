import React, { useEffect, useRef, useState } from 'react';
import { Zap, Star, Check } from 'lucide-react';
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
      <div className={`mb-16 flex items-start justify-between transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div>
          <h2 className="logo-font text-5xl md:text-7xl leading-[0.9] tracking-tighter text-black mb-3">
            CHOOSE YOUR <span className="text-[#dc0000]">PERFECT ZONE</span>
          </h2>
          <p className="text-base md:text-lg font-bold tracking-tight text-black/60 uppercase">
            {t('platform.subtitle')}
          </p>
        </div>
        <div className="hidden md:block">
          <div className="px-4 py-2 border-2 border-black text-black text-[10px] font-black tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-all cursor-pointer">
            ZONE PACKAGES
          </div>
        </div>
      </div>

      {/* Zone Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier: any, idx: number) => (
          <div 
            key={tier.id} 
            className={`relative flex flex-col bg-white text-black border-2 border-black/10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: `${idx * 150}ms` }}
          >
            {/* Popular Badge */}
            {tier.popular && (
              <div className="absolute -top-0 left-0 right-0 z-20">
                <div className="bg-[#dc0000] text-white text-[10px] font-black tracking-[0.3em] uppercase py-2 text-center flex items-center justify-center space-x-2">
                  <span>%</span>
                  <span>MOST POPULAR</span>
                  <span>%</span>
                </div>
              </div>
            )}
            
            <div className={`p-8 flex flex-col h-full ${tier.popular ? 'pt-14' : ''}`}>
              {/* Icon */}
              <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center mb-6">
                {tier.id === 'premium' ? (
                  <Star size={24} fill="white" className="text-white" />
                ) : tier.id === 'standard' ? (
                  <Zap size={24} className="text-white" />
                ) : (
                  <Zap size={24} className="text-white" />
                )}
              </div>

              {/* Type Label */}
              <span className={`text-[10px] font-black tracking-[0.3em] uppercase mb-2 ${
                tier.popular ? 'text-[#dc0000]' : 'text-black/50'
              }`}>
                {tier.type}
              </span>

              {/* Zone Name */}
              <h3 className="logo-font text-3xl tracking-tighter uppercase leading-none mb-3 text-black">
                {tier.name}
              </h3>

              {/* Description */}
              <p className="text-xs font-bold mb-6 text-black/60">
                {tier.sub}
              </p>

              {/* Capacity & Duration */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-[9px] font-black tracking-wider uppercase block mb-1 text-black/40">
                    {tier.id === 'premium' ? 'Exclusive' : 'Capacity'}
                  </span>
                  <span className="text-lg font-black text-black">
                    {tier.id === 'basic' ? '20 Brands' : tier.id === 'premium' ? '4 Brands Only' : '6 Brands'}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] font-black tracking-wider uppercase block mb-1 text-black/40">
                    {tier.id === 'premium' ? 'Contract' : 'Duration'}
                  </span>
                  <span className="text-lg font-black text-black">
                    {tier.id === 'basic' ? '2주 단위' : '1~3개월'}
                  </span>
                </div>
              </div>

              {/* Features List */}
              <div className="flex-grow space-y-3 mb-6">
                {tier.features.map((feature: any, idx: number) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} className="text-white" strokeWidth={3} />
                    </div>
                    <span className="text-xs font-bold leading-tight text-black/80">
                      {typeof feature === 'string' ? feature : feature.t}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Divider */}
              <div className="pt-4 border-t border-black/10">
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* All Include Section - Compact Bottom */}
      <div className={`mt-12 pt-8 border-t border-black/10 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          <span className="text-xs font-black tracking-[0.3em] uppercase text-black/40">
            {t('platform.everyPackage')} {t('platform.includes')}
          </span>
          {allInclude.map((item: any, idx: number) => (
            <div key={idx} className="flex items-center space-x-2">
              <Check size={14} className="text-[#dc0000]" strokeWidth={3} />
              <span className="text-sm font-bold text-black/70">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Platform;
