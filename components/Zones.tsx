import React, { useState } from 'react';
import { ZONES } from '../constants';

export const Zones: React.FC = () => {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  return (
    // Compact padding for better viewport usage
    <section id="zones" className="w-full flex flex-col justify-center bg-kollab-black text-white px-6 py-16 md:py-20">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8 md:gap-12">
        
        {/* Info Side - Reduced text sizes */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight mb-8 leading-none">
            Zone <span className="text-kollab-red">Map</span>
          </h2>
          
          <div className="space-y-5">
            {ZONES.map((zone, index) => (
              <div 
                key={index} 
                className="border-l-4 border-zinc-700 pl-6 py-2 hover:border-kollab-red transition-colors group cursor-pointer"
                onMouseEnter={() => setHoveredZone(zone.name)}
                onMouseLeave={() => setHoveredZone(null)}
              >
                <div className="flex items-center mb-2">
                  <h3 className="text-lg md:text-xl font-black text-white uppercase mr-3 group-hover:text-kollab-red transition-colors">
                    {zone.name}
                  </h3>
                  <span className={`text-xs text-white px-2 py-0.5 font-bold rounded ${zone.color === 'bg-red-600' ? 'bg-kollab-red' : 'bg-zinc-700'}`}>
                    {zone.count} Brands
                  </span>
                </div>
                <ul className="space-y-1">
                  {zone.features.map((feature, fIdx) => (
                    <li key={fIdx} className="text-zinc-400 font-medium text-xs md:text-sm">
                      - {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-5 bg-zinc-900 border border-zinc-800 hidden md:block">
              <h4 className="font-bold text-sm md:text-base mb-1.5 text-white flex items-center">
                  <span className="w-2 h-2 bg-kollab-red rounded-full mr-2"></span>
                  입점 문의 팁
              </h4>
              <p className="text-zinc-400 text-xs leading-relaxed">
                  <strong>PREMIUM ZONE</strong>은 가장 먼저 마감되는 구역입니다. 
                  빠른 신청을 권장드립니다.
              </p>
          </div>
        </div>

        {/* Visual Map Side - Reduced size */}
        <div className="w-full lg:w-7/12 aspect-square md:aspect-[4/3] max-h-[600px]">
          <div className="bg-zinc-900 p-4 md:p-8 border border-zinc-700 flex flex-col gap-4 shadow-2xl relative h-full rounded-sm">
              {/* Grid Pattern overlay */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

              {/* 1. Warehouse (Top) */}
              <div className="w-full h-14 bg-zinc-800 border-2 border-dashed border-zinc-600 flex items-center justify-center relative z-10 shrink-0">
                  <span className="font-black text-sm md:text-lg text-zinc-500 tracking-widest">WAREHOUSE</span>
              </div>

              {/* Main Store Area */}
              <div className="flex flex-1 gap-3 md:gap-5 relative z-10 min-h-0">
                  
                  {/* Left Wall */}
                  <div className={`w-10 md:w-14 border flex items-center justify-center shadow-sm transition-all duration-500 ${
                    hoveredZone === 'BASIC ZONE' 
                      ? 'bg-zinc-600 border-kollab-red scale-105 shadow-lg shadow-kollab-red/50' 
                      : 'bg-zinc-800 border-zinc-700'
                  }`}>
                      <span className={`[writing-mode:vertical-rl] rotate-180 font-bold text-[10px] md:text-sm tracking-widest whitespace-nowrap py-3 transition-colors ${
                        hoveredZone === 'BASIC ZONE' ? 'text-white' : 'text-zinc-500'
                      }`}>
                        WALL SHELF
                      </span>
                  </div>

                  {/* Center Floor */}
                  <div className="flex-1 flex flex-col gap-3 md:gap-5 overflow-hidden">
                      
                      {/* Counter Area */}
                      <div className="flex justify-center shrink-0">
                           <div className="px-6 py-2 bg-blue-900 text-white border border-white/20 shadow-md transform hover:scale-105 transition-transform">
                              <span className="font-black text-xs md:text-base">COUNTER</span>
                          </div>
                      </div>

                      {/* Standard Zones */}
                      <div className="grid grid-cols-3 gap-2 md:gap-3 shrink-0">
                          {[1, 2, 3].map((i) => (
                              <div key={i} className={`aspect-square border flex flex-col items-center justify-center shadow-sm transition-all duration-500 ${
                                hoveredZone === 'STANDARD ZONE'
                                  ? 'bg-zinc-600 border-kollab-red scale-105 shadow-lg shadow-kollab-red/50'
                                  : 'bg-zinc-800 border-zinc-600 hover:bg-zinc-700'
                              }`}>
                                  <span className={`font-bold text-[10px] md:text-sm transition-colors ${
                                    hoveredZone === 'STANDARD ZONE' ? 'text-white' : 'text-zinc-300'
                                  }`}>STD</span>
                                  <span className={`text-[8px] md:text-xs transition-colors ${
                                    hoveredZone === 'STANDARD ZONE' ? 'text-zinc-200' : 'text-zinc-500'
                                  }`}>Zone {i}</span>
                              </div>
                          ))}
                      </div>

                      {/* Photo Zone - Flexible */}
                      <div className="py-2 bg-indigo-900 text-white border border-indigo-500/30 flex items-center justify-center shadow-md hover:bg-indigo-800 transition-colors shrink-0">
                          <span className="font-black text-xs md:text-base tracking-widest">PHOTO ZONE</span>
                      </div>

                      {/* Premium Zones - Flexible fill */}
                      <div className="grid grid-cols-2 gap-2 md:gap-4 flex-1 min-h-0">
                           <div className={`border-2 flex flex-col items-center justify-center relative shadow-sm transition-all duration-500 ${
                             hoveredZone === 'PREMIUM ZONE'
                               ? 'bg-kollab-red border-white scale-105 shadow-2xl shadow-kollab-red/70'
                               : 'bg-red-900/40 border-kollab-red hover:bg-kollab-red/20'
                           }`}>
                              <span className={`font-black text-xs md:text-lg transition-all ${
                                hoveredZone === 'PREMIUM ZONE' ? 'text-white scale-110' : 'text-kollab-red'
                              }`}>PREMIUM A</span>
                          </div>
                           <div className={`border-2 flex flex-col items-center justify-center relative shadow-sm transition-all duration-500 ${
                             hoveredZone === 'PREMIUM ZONE'
                               ? 'bg-kollab-red border-white scale-105 shadow-2xl shadow-kollab-red/70'
                               : 'bg-red-900/40 border-kollab-red hover:bg-kollab-red/20'
                           }`}>
                              <span className={`font-black text-xs md:text-lg transition-all ${
                                hoveredZone === 'PREMIUM ZONE' ? 'text-white scale-110' : 'text-kollab-red'
                              }`}>PREMIUM B</span>
                          </div>
                      </div>
                  </div>

                  {/* Right Wall */}
                  <div className={`w-10 md:w-14 border flex items-center justify-center shadow-sm transition-all duration-500 ${
                    hoveredZone === 'BASIC ZONE' 
                      ? 'bg-zinc-600 border-kollab-red scale-105 shadow-lg shadow-kollab-red/50' 
                      : 'bg-zinc-800 border-zinc-700'
                  }`}>
                      <span className={`[writing-mode:vertical-rl] rotate-180 font-bold text-[10px] md:text-sm tracking-widest whitespace-nowrap py-3 transition-colors ${
                        hoveredZone === 'BASIC ZONE' ? 'text-white' : 'text-zinc-500'
                      }`}>
                        WALL SHELF
                      </span>
                  </div>
              </div>

              {/* Entrance (Bottom) */}
              <div className="flex justify-center mt-auto relative z-10 shrink-0">
                  <div className="w-2/3 py-2 bg-zinc-800 text-white border-2 border-zinc-600 rounded-b-lg text-center shadow-md hover:bg-zinc-700 transition-colors">
                      <span className="font-black text-sm md:text-lg">ENTRANCE</span>
                  </div>
              </div>

          </div>
        </div>

      </div>
    </section>
  );
};