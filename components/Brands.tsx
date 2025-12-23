
import React from 'react';
import { useLanguage } from '../LanguageContext';
import { CheckCircle2 } from 'lucide-react';

const Brands: React.FC = () => {
  const { t } = useLanguage();
  const qualifications = t('brands.qualifications') || [];

  return (
    <div className="max-w-7xl mx-auto py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
        <div className="space-y-8">
          <div>
            <h2 className="text-xs font-bold tracking-[0.5em] text-white/40 mb-4 uppercase">
              {t('brands.sub')}
            </h2>
            <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
              {t('brands.title')}
            </h3>
          </div>
          <p className="text-xl text-white/60 leading-relaxed font-medium max-w-lg">
            {t('brands.desc')}
          </p>
          <div className="pt-12 border-t border-white/10">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-[1px] bg-kollab-red"></div>
              <span className="text-[10px] font-black tracking-widest uppercase text-white/40">
                {t('brands.selectiveTitle')}
              </span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed uppercase tracking-wide">
              {t('brands.selectiveDesc')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {qualifications.map((item: any, idx: number) => (
            <div key={idx} className="bg-zinc-950 p-10 space-y-6 group hover:bg-zinc-900 transition-colors">
              <div className="text-kollab-red">
                <CheckCircle2 size={32} strokeWidth={1.5} />
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-black uppercase tracking-tighter">{item.title}</h4>
                <p className="text-xs text-white/40 leading-relaxed uppercase tracking-wider font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-32 pt-20 border-t border-white/10 flex flex-col items-center">
        <h4 className="text-3xl md:text-5xl font-black tracking-tighter text-center max-w-3xl mb-12 uppercase leading-none">
          {t('brands.ready')}
        </h4>
        <a 
          href="#contact"
          className="px-16 py-6 bg-white text-black hover:bg-kollab-red hover:text-white transition-all font-black tracking-[0.3em] text-xs uppercase"
        >
          {t('brands.cta')}
        </a>
      </div>
    </div>
  );
};

export default Brands;
