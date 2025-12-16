import React from 'react';

export const MoodBoard: React.FC = () => {
  return (
    // Compact padding for better viewport usage
    <section id="mood" className="w-full flex flex-col justify-center bg-black px-6 py-16 md:py-20 relative overflow-hidden">
      <div className="container mx-auto flex flex-col">
        {/* Header - Reduced sizes */}
        <div className="mb-8 border-b border-white/20 pb-6 shrink-0 flex flex-col md:flex-row justify-between items-end">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none">
              Beauty <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-white">Mood</span>
            </h2>
            <p className="mt-3 text-xs md:text-sm font-medium text-zinc-400 tracking-wide max-w-xl">
              Futuristic Beauty & Raw Industrial Aesthetics.
            </p>
          </div>
          <div className="text-right hidden md:block mt-3 md:mt-0">
            <span className="text-[10px] text-zinc-500 border border-zinc-700 px-2 py-1 uppercase tracking-widest">Curated by KOLLAB</span>
          </div>
        </div>

        {/* Compact Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 min-h-[500px]">
          
          {/* Column 1: Main Feature Image - Compact */}
          <div className="col-span-2 md:col-span-1 h-[300px] md:h-auto relative group overflow-hidden border border-zinc-800 rounded-sm">
             <img 
               src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800&auto=format&fit=crop" 
               alt="Futuristic Model" 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
             <div className="absolute bottom-5 left-5">
                <p className="text-kollab-red font-bold text-[10px] tracking-widest mb-1">KEY VISUAL</p>
                <h3 className="text-white text-xl md:text-3xl font-black uppercase leading-none">Bold &<br/>Minimal</h3>
             </div>
          </div>
          
          {/* Column 2: Textures & Details - Compact */}
          <div className="col-span-1 flex flex-col gap-3 md:gap-4">
             {/* Top: Texture */}
             <div className="h-1/2 min-h-[200px] relative group overflow-hidden border border-zinc-800 rounded-sm">
                <img 
                  src="https://images.unsplash.com/photo-1556228720-198751642f4b?q=80&w=600&auto=format&fit=crop" 
                  alt="Cream Texture" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-3 right-3 bg-black/50 px-2 py-1 text-[10px] text-white backdrop-blur-sm">TEXTURE</div>
             </div>
             {/* Bottom: Typography/Statement */}
             <div className="h-1/2 min-h-[200px] bg-zinc-900 border border-zinc-800 flex items-center justify-center p-5 group hover:bg-kollab-red transition-colors duration-500 rounded-sm">
                <p className="text-zinc-500 group-hover:text-white text-center font-mono text-xs md:text-sm leading-loose transition-colors">
                   Raw Materials<br/>
                   meets<br/>
                   <span className="text-white group-hover:text-black font-bold text-base md:text-lg mt-1 block">High Technology</span>
                </p>
             </div>
          </div>

          {/* Column 3: Space & Product - Compact */}
          <div className="col-span-1 flex flex-col gap-3 md:gap-4">
              {/* Top: Space */}
              <div className="h-2/3 min-h-[280px] relative group overflow-hidden border border-zinc-800 rounded-sm">
                 <img 
                   src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop" 
                   alt="Industrial Space" 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                 />
                 <div className="absolute bottom-3 left-3 bg-black/50 px-2 py-1 text-[10px] text-white backdrop-blur-sm">SPACE</div>
              </div>
              {/* Bottom: Product Focus */}
              <div className="h-1/3 min-h-[140px] relative group overflow-hidden border border-zinc-800 rounded-sm">
                 <img 
                   src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=600&auto=format&fit=crop" 
                   alt="Product Display" 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                 />
              </div>
          </div>

        </div>
      </div>
    </section>
  );
};