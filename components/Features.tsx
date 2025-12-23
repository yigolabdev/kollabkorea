
import React from 'react';
import { Globe, ShieldCheck, Layout, Zap } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Features: React.FC = () => {
  const { t } = useLanguage();
  const reasons = t('home.reasons') || [];

  const icons = [
    <Globe size={32} strokeWidth={1.5} />,
    <ShieldCheck size={32} strokeWidth={1.5} />,
    <Layout size={32} strokeWidth={1.5} />,
    <Zap size={32} strokeWidth={1.5} />
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-24 text-center md:text-left">
        <h2 className="text-xs font-black tracking-[0.5em] kollab-red mb-6 uppercase tracking-[0.8em]">
          {t('home.advantages')}
        </h2>
        <h3 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
          {t('home.whyTitle')?.split('choose')[0]}<br /><span className="opacity-20">CHOOSE KOLLAB</span>
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/5 border border-black/5">
        {reasons.map((reason: any, idx: number) => (
          <div key={idx} className="bg-white p-12 flex flex-col items-start group hover:bg-black transition-all duration-700 h-full">
            <div className="mb-12 p-5 bg-zinc-50 group-hover:bg-zinc-800 group-hover:text-white transition-all duration-500 rounded-full border border-black/5">
              {icons[idx]}
            </div>
            <h4 className="text-2xl font-black tracking-tighter mb-6 group-hover:text-white transition-colors uppercase leading-none">
              {reason.title}
            </h4>
            <p className="text-sm text-gray-400 group-hover:text-zinc-500 leading-relaxed font-medium transition-colors uppercase tracking-wide">
              {reason.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
