import React from 'react';

export const MoodBoard: React.FC = () => {
  return (
    // Changed: Removed h-screen, snap-start. Added py-32
    <section id="mood" className="min-h-screen w-full flex flex-col justify-center bg-black px-6 py-32 md:py-40 relative overflow-hidden">
      <div className="container mx-auto flex flex-col">
        {/* Header - Compact */}
        <div className="mb-12 border-b border-white/20 pb-8 shrink-0 flex flex-col md:flex-row justify-between items-end">
          <div>
            <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tight leading-none">
              Beauty <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-white">Mood</span>
            </h2>
            <p className="mt-4 text-sm md:text-xl font-medium text-zinc-400 tracking-wide max-w-xl">
              Futuristic Beauty & Raw Industrial Aesthetics.
            </p>
          </div>
          <div className="text-right hidden md:block mt-4 md:mt-0">
            <span className="text-xs text-zinc-500 border border-zinc-700 px-3 py-1.5 uppercase tracking-widest">Curated by KOLLAB</span>
          </div>
        </div>

        {/* Stable Grid Layout - Fixed min-heights */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 min-h-[800px]">
          
          {/* Column 1: Main Feature Image */}
          <div className="col-span-2 md:col-span-1 h-[400px] md:h-auto relative group overflow-hidden border border-zinc-800 rounded-sm">
             <img 
               src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800&auto=format&fit=crop" 
               alt="Futuristic Model" 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
             <div className="absolute bottom-8 left-8">
                <p className="text-kollab-red font-bold text-xs tracking-widest mb-2">KEY VISUAL</p>
                <h3 className="text-white text-3xl md:text-5xl font-black uppercase leading-none">Bold &<br/>Minimal</h3>
             </div>
          </div>
          
          {/* Column 2: Textures & Details */}
          <div className="col-span-1 flex flex-col gap-4 md:gap-6">
             {/* Top: Texture */}
             <div className="h-1/2 min-h-[300px] relative group overflow-hidden border border-zinc-800 rounded-sm">
                <img 
                  src="https://images.unsplash.com/photo-1556228720-198751642f4b?q=80&w=600&auto=format&fit=crop" 
                  alt="Cream Texture" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">TEXTURE</div>
             </div>
             {/* Bottom: Typography/Statement */}
             <div className="h-1/2 min-h-[300px] bg-zinc-900 border border-zinc-800 flex items-center justify-center p-8 group hover:bg-kollab-red transition-colors duration-500 rounded-sm">
                <p className="text-zinc-500 group-hover:text-white text-center font-mono text-sm md:text-base leading-loose transition-colors">
                   Raw Materials<br/>
                   meets<br/>
                   <span className="text-white group-hover:text-black font-bold text-xl md:text-2xl mt-2 block">High Technology</span>
                </p>
             </div>
          </div>

          {/* Column 3: Space & Product */}
          <div className="col-span-1 flex flex-col gap-4 md:gap-6">
              {/* Top: Space */}
              <div className="h-2/3 min-h-[400px] relative group overflow-hidden border border-zinc-800 rounded-sm">
                 <img 
                   src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop" 
                   alt="Industrial Space" 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                 />
                 <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 text-xs text-white backdrop-blur-sm">SPACE</div>
              </div>
              {/* Bottom: Product Focus */}
              <div className="h-1/3 min-h-[200px] relative group overflow-hidden border border-zinc-800 rounded-sm">
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