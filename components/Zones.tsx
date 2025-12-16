import React from 'react';
import { ZONES } from '../constants';

export const Zones: React.FC = () => {
  return (
    // Changed: Removed h-screen, snap-start. Added py-32
    <section id="zones" className="min-h-screen w-full flex flex-col justify-center bg-kollab-black text-white px-6 py-32 md:py-40">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 md:gap-24">
        
        {/* Info Side */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tight mb-12 leading-none">
            Zone <span className="text-kollab-red">Map</span>
          </h2>
          
          <div className="space-y-8">
            {ZONES.map((zone, index) => (
              <div key={index} className="border-l-4 border-zinc-700 pl-8 py-2 hover:border-kollab-red transition-colors group cursor-pointer">
                <div className="flex items-center mb-3">
                  <h3 className="text-2xl md:text-3xl font-black text-white uppercase mr-4 group-hover:text-kollab-red transition-colors">
                    {zone.name}
                  </h3>
                  <span className={`text-xs md:text-sm text-white px-3 py-1 font-bold rounded ${zone.color === 'bg-red-600' ? 'bg-kollab-red' : 'bg-zinc-700'}`}>
                    {zone.count} Brands
                  </span>
                </div>
                <ul className="space-y-1">
                  {zone.features.map((feature, fIdx) => (
                    <li key={fIdx} className="text-zinc-400 font-medium text-sm md:text-base">
                      - {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-6 bg-zinc-900 border border-zinc-800 hidden md:block">
              <h4 className="font-bold text-base md:text-lg mb-2 text-white flex items-center">
                  <span className="w-2 h-2 bg-kollab-red rounded-full mr-3"></span>
                  입점 문의 팁
              </h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                  <strong>PREMIUM ZONE</strong>은 가장 먼저 마감되는 구역입니다. 
                  빠른 신청을 권장드립니다.
              </p>
          </div>
        </div>

        {/* Visual Map Side (Dark Theme) */}
        <div className="w-full lg:w-7/12 aspect-square md:aspect-[4/3] max-h-[800px]">
          <div className="bg-zinc-900 p-6 md:p-12 border border-zinc-700 flex flex-col gap-6 shadow-2xl relative h-full rounded-sm">
              {/* Grid Pattern overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

              {/* 1. Warehouse (Top) */}
              <div className="w-full h-20 bg-zinc-800 border-2 border-dashed border-zinc-600 flex items-center justify-center relative z-10 shrink-0">
                  <span className="font-black text-lg md:text-2xl text-zinc-500 tracking-widest">WAREHOUSE</span>
              </div>

              {/* Main Store Area */}
              <div className="flex flex-1 gap-4 md:gap-8 relative z-10 min-h-0">
                  
                  {/* Left Wall */}
                  <div className="w-12 md:w-20 bg-zinc-800 border border-zinc-700 flex items-center justify-center shadow-sm">
                      <span className="[writing-mode:vertical-rl] rotate-180 font-bold text-zinc-500 text-xs md:text-lg tracking-widest whitespace-nowrap py-4">
                        WALL SHELF
                      </span>
                  </div>

                  {/* Center Floor */}
                  <div className="flex-1 flex flex-col gap-4 md:gap-8 overflow-hidden">
                      
                      {/* Counter Area */}
                      <div className="flex justify-center shrink-0">
                           <div className="px-10 py-4 bg-blue-900 text-white border border-white/20 shadow-md transform hover:scale-105 transition-transform">
                              <span className="font-black text-sm md:text-xl">COUNTER</span>
                          </div>
                      </div>

                      {/* Standard Zones */}
                      <div className="grid grid-cols-3 gap-4 shrink-0">
                          {[1, 2, 3].map((i) => (
                              <div key={i} className="aspect-square bg-zinc-800 border border-zinc-600 flex flex-col items-center justify-center shadow-sm hover:bg-zinc-700 transition-colors">
                                  <span className="font-bold text-zinc-300 text-sm md:text-lg">STD</span>
                                  <span className="text-xs text-zinc-500">Zone {i}</span>
                              </div>
                          ))}
                      </div>

                      {/* Photo Zone - Flexible */}
                      <div className="py-4 bg-indigo-900 text-white border border-indigo-500/30 flex items-center justify-center shadow-md hover:bg-indigo-800 transition-colors shrink-0">
                          <span className="font-black text-sm md:text-xl tracking-widest">PHOTO ZONE</span>
                      </div>

                      {/* Premium Zones - Flexible fill */}
                      <div className="grid grid-cols-2 gap-4 md:gap-8 flex-1 min-h-0">
                           <div className="bg-red-900/40 border-2 border-kollab-red flex flex-col items-center justify-center relative shadow-sm hover:bg-kollab-red/20 transition-all">
                              <span className="font-black text-kollab-red text-base md:text-2xl">PREMIUM A</span>
                          </div>
                           <div className="bg-red-900/40 border-2 border-kollab-red flex flex-col items-center justify-center relative shadow-sm hover:bg-kollab-red/20 transition-all">
                              <span className="font-black text-kollab-red text-base md:text-2xl">PREMIUM B</span>
                          </div>
                      </div>
                  </div>

                  {/* Right Wall */}
                  <div className="w-12 md:w-20 bg-zinc-800 border border-zinc-700 flex items-center justify-center shadow-sm">
                      <span className="[writing-mode:vertical-rl] rotate-180 font-bold text-zinc-500 text-xs md:text-lg tracking-widest whitespace-nowrap py-4">
                        WALL SHELF
                      </span>
                  </div>
              </div>

              {/* Entrance (Bottom) */}
              <div className="flex justify-center mt-auto relative z-10 shrink-0">
                  <div className="w-2/3 py-3 bg-zinc-800 text-white border-2 border-zinc-600 rounded-b-lg text-center shadow-md hover:bg-zinc-700 transition-colors">
                      <span className="font-black text-lg md:text-2xl">ENTRANCE</span>
                  </div>
              </div>

          </div>
        </div>

      </div>
    </section>
  );
};