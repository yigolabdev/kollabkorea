
import React from 'react';
import { useLanguage } from '../LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto space-y-40">
      {/* Top Section - Aligned with the 'Modern, Elegant, Minimal' directive */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        <div>
          <h2 className="logo-font text-5xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.85] uppercase text-black">
            {t('about.title')}
          </h2>
          <div className="space-y-8 text-gray-700 leading-relaxed max-w-lg">
            <p className="text-2xl font-black text-black uppercase tracking-tight leading-tight">{t('about.p1')}</p>
            <p className="font-bold text-black/40 uppercase tracking-wide text-sm leading-relaxed">{t('about.p2')}</p>
            <div className="pt-10 border-t border-black/10 flex items-center space-x-16">
              <div className="group cursor-default">
                <span className="block text-3xl font-black tracking-tighter group-hover:text-kollab-red transition-colors">LA</span>
                <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-black">{t('about.origin')}</span>
              </div>
              <div className="group cursor-default">
                <span className="block text-3xl font-black tracking-tighter group-hover:text-kollab-red transition-colors">SEOUL</span>
                <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-black">{t('about.operation')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[16/9] bg-[#c0c0c0] overflow-hidden group border border-black/5 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1556228448-59b04958c54b?auto=format&fit=crop&q=80&w=1200" 
              alt="KOLLAB Space" 
              className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"
            />
          </div>
        </div>
      </div>

      {/* Role and Philosophy Grid - Color System Integration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10 border border-black/10">
        <div className="bg-white p-14 md:p-28 flex flex-col justify-center min-h-[600px] hover:bg-zinc-50 transition-colors">
          <h3 className="text-[10px] font-black tracking-[0.5em] kollab-red uppercase mb-10">{t('about.philosophy.title')}</h3>
          <p className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-10 uppercase">
            {t('about.philosophy.text')}
          </p>
          <p className="text-black/50 font-bold leading-relaxed text-lg uppercase tracking-tight">
            {t('about.philosophy.desc')}
          </p>
        </div>
        <div className="bg-black text-white p-14 md:p-28 flex flex-col justify-center min-h-[600px] group">
          <h3 className="text-[10px] font-black tracking-[0.5em] opacity-40 uppercase mb-10">{t('about.role.title')}</h3>
          <p className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-10 uppercase group-hover:text-kollab-red transition-colors">
            {t('about.role.text')}
          </p>
          <p className="text-white/40 font-bold leading-relaxed text-lg uppercase tracking-tight">
            {t('about.role.desc')}
          </p>
        </div>
      </div>

      {/* Large Statement - Visibility Focus */}
      <div className="text-center py-48 md:py-64 bg-white border-y border-black/5">
        <h3 className="text-[10px] font-black tracking-[0.6em] kollab-red uppercase mb-12">{t('about.whatWeDo.title')}</h3>
        <p className="text-5xl md:text-[100px] font-black tracking-[-0.05em] uppercase max-w-6xl mx-auto leading-[0.8] text-black">
          {t('about.whatWeDo.desc')}
        </p>
      </div>
    </div>
  );
};

// Fixed: Added missing default export
export default About;
