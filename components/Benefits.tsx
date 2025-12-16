import React from 'react';
import { BENEFITS } from '../constants';
import { ArrowUpRight } from 'lucide-react';

export const Benefits: React.FC = () => {
  return (
    // Changed: Removed h-screen, snap-start. Added min-h-screen, py-32
    <section id="benefits" className="min-h-screen w-full flex flex-col justify-center bg-kollab-silver text-black px-6 py-32 md:py-40">
      <div className="container mx-auto flex flex-col">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-black pb-8 shrink-0">
          <div>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-black leading-none">
              Partnership<br/>
              <span className="text-white text-stroke-black">Benefits</span>
            </h2>
          </div>
          <div className="text-right mt-8 md:mt-0">
            <p className="font-bold text-base md:text-lg mb-2">성공적인 미국 진출을 위한</p>
            <p className="text-kollab-red font-black text-2xl md:text-3xl">KOLLAB만의 독점적인 혜택</p>
          </div>
        </div>

        {/* Grid - Adjusted for natural flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {BENEFITS.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white/50 p-8 md:p-10 border border-zinc-300 hover:bg-white hover:border-kollab-red transition-all duration-300 group flex flex-col justify-between min-h-[300px] shadow-sm hover:shadow-xl"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                    <div className="text-kollab-red opacity-80 group-hover:opacity-100 transition-opacity p-3 bg-white rounded-full border border-zinc-100">
                        <benefit.icon size={32} strokeWidth={1.5} />
                    </div>
                    <span className="font-mono text-sm text-zinc-400 group-hover:text-black font-bold">0{index + 1}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black mb-4 leading-tight">{benefit.title}</h3>
              </div>
              
              <ul className="space-y-3 border-t border-zinc-300 pt-6 group-hover:border-kollab-red transition-colors">
                {benefit.items.map((item, idx) => (
                  <li key={idx} className="flex items-start text-zinc-700 text-sm md:text-base font-medium">
                    <ArrowUpRight size={18} className="mr-2 mt-0.5 text-kollab-red shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};