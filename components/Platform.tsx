
import React from 'react';
import { Zap, Star, Info, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Platform: React.FC = () => {
  const { t } = useLanguage();
  const tiers = t('platform.tiers') || [];
  const allInclude = t('platform.allInclude') || [];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header - Strictly aligned with BX hierarchical typography */}
      <div className="flex flex-col md:flex-row items-baseline justify-between gap-6 mb-24 border-b border-black pb-12">
        <div className="max-w-2xl">
          <h2 className="logo-font text-5xl md:text-8xl leading-[0.85] tracking-tighter mb-6">
            CHOOSE YOUR <span className="kollab-red">ZONE.</span>
          </h2>
          <p className="text-xl md:text-2xl font-bold tracking-tight text-black/60 uppercase">
            {t('platform.subtitle')}
          </p>
        </div>
        <div className="hidden md:block">
          <span className="text-[10px] font-black tracking-[0.5em] uppercase opacity-40">
            {t('platform.selective')}
          </span>
        </div>
      </div>

      {/* Grid - Simplified card design following minimal aesthetic */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {tiers.map((tier: any) => (
          <div 
            key={tier.id} 
            className="group relative flex flex-col h-full bg-white transition-all duration-700 hover:-translate-y-2 border border-black/5"
          >
            {/* Subtle Metallic Silver touch for hover */}
            <div className="absolute inset-0 bg-[#c0c0c0] opacity-0 group-hover:opacity-[0.05] transition-opacity duration-700"></div>
            
            <div className="p-10 md:p-14 flex flex-col h-full relative z-10">
              {/* Header */}
              <div className="flex justify-between items-start mb-16">
                <div>
                  <span className={`text-[10px] font-black tracking-[0.3em] uppercase mb-3 block ${tier.popular ? 'text-kollab-red' : 'opacity-30'}`}>
                    {tier.type}
                  </span>
                  <h3 className="logo-font text-3xl md:text-4xl tracking-tighter uppercase leading-none">{tier.name}</h3>
                </div>
                <div className={`transition-all duration-700 ${tier.popular ? 'text-kollab-red' : 'text-black/10'}`}>
                   {tier.id === 'premium' ? <Star size={28} fill="currentColor" /> : <Zap size={28} />}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs font-black uppercase tracking-widest text-black/40 mb-10 pb-10 border-b border-black/5 leading-relaxed">
                {tier.sub}
              </p>

              {/* Features - Clean & Spaced */}
              <div className="flex-grow space-y-6 mb-8">
                {tier.features.map((feature: any, idx: number) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className={`w-1 h-1 mt-1.5 shrink-0 ${tier.popular ? 'bg-kollab-red' : 'bg-black/20'}`} />
                    <span className="text-[11px] font-bold tracking-tight uppercase leading-snug text-black/80">
                      {typeof feature === 'string' ? feature : feature.t}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="pt-8 mt-auto flex items-center justify-center opacity-0 group-hover:opacity-10 transition-opacity">
                <div className="w-full h-[1px] bg-black"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inclusions - Consistent Grid Styling */}
      <div className="mt-48 pt-24 border-t border-black">
        <h3 className="logo-font text-4xl md:text-6xl uppercase leading-none mb-16 text-center">
          {t('platform.everyPackage')} <span className="opacity-20 text-black">{t('platform.includes')}</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 border border-black/10">
          {allInclude.map((item: any, idx: number) => (
            <div key={idx} className="bg-white p-12 md:p-16 flex flex-col items-center text-center space-y-8 hover:bg-zinc-50 transition-all group duration-500">
              <div className="w-20 h-20 rounded-full border border-black/5 flex items-center justify-center group-hover:border-kollab-red group-hover:bg-kollab-red group-hover:text-white transition-all duration-500">
                <ArrowUpRight size={24} className="opacity-30 group-hover:opacity-100" />
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-black uppercase tracking-tighter">{item.title}</h4>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest leading-relaxed max-w-[220px] mx-auto">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex items-center justify-center space-x-4 opacity-30">
          <Info size={14} />
          <span className="text-[9px] font-black tracking-[0.2em] uppercase">{t('platform.disclaimer').split('\n')[0]}</span>
        </div>
      </div>
    </div>
  );
};

export default Platform;
