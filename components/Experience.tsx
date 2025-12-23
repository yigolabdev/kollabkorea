
import React from 'react';
import { useLanguage } from '../LanguageContext';

const Experience: React.FC = () => {
  const { t } = useLanguage();

  const topImages = [
    "https://images.unsplash.com/photo-1556228448-59b04958c54b?auto=format&fit=crop&q=80&w=1200", // Stylish storefront
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200", // Interior retail
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1200"  // Modern boutique
  ];

  const bottomImages = [
    "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=800", // Beauty product display
    "https://images.unsplash.com/photo-1522338221030-42102726ec37?auto=format&fit=crop&q=80&w=800", // Skincare testing
    "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800", // Aesthetic interior
    "https://images.unsplash.com/photo-1512496011931-a2c3882b4421?auto=format&fit=crop&q=80&w=800"  // Premium cosmetic
  ];

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-32 text-center">
        <h2 className="text-xs font-black tracking-[0.5em] kollab-red mb-6 uppercase">{t('experience.sub')}</h2>
        <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">{t('experience.title')}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 px-1 bg-white">
        {topImages.map((img, idx) => (
          <div key={idx} className="aspect-[4/3] overflow-hidden bg-zinc-200">
            <img 
              src={img} 
              alt={`Experience Top ${idx}`} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 hover:scale-100"
            />
          </div>
        ))}
      </div>

      <div className="relative bg-black py-32 md:py-48 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-20 pointer-events-none"
             style={{ 
               backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 0.5px, transparent 0)',
               backgroundSize: '32px 32px'
             }}></div>
        <h2 className="relative z-10 text-7xl md:text-[180px] font-black tracking-[0.3em] text-white uppercase opacity-80 leading-none select-none">
          KOLLAB
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 px-1 pb-1 bg-white">
        {bottomImages.map((img, idx) => (
          <div key={idx} className="aspect-[3/4] overflow-hidden bg-zinc-100">
            <img 
              src={img} 
              alt={`Experience Bottom ${idx}`} 
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000 grayscale hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
