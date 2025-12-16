import React from 'react';
import { BENEFITS } from '../constants';
import { ArrowUpRight } from 'lucide-react';

export const Benefits: React.FC = () => {
  return (
    // Compact padding for better viewport usage
    <section id="benefits" className="w-full flex flex-col justify-center bg-kollab-silver text-black px-6 py-16 md:py-20">
      <div className="container mx-auto flex flex-col">
        
        {/* Header - Reduced sizes */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-black pb-6 shrink-0">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-black leading-none">
              Partnership<br/>
              <span className="text-white text-stroke-black">Benefits</span>
            </h2>
          </div>
          <div className="text-right mt-6 md:mt-0">
            <p className="font-bold text-sm md:text-base mb-1">성공적인 미국 진출을 위한</p>
            <p className="text-kollab-red font-black text-lg md:text-xl">KOLLAB만의 독점적인 혜택</p>
          </div>
        </div>

        {/* Grid - Compact cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {BENEFITS.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white/50 p-6 md:p-7 border border-zinc-300 hover:bg-white hover:border-kollab-red transition-all duration-300 group flex flex-col justify-between min-h-[220px] shadow-sm hover:shadow-xl"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                    <div className="text-kollab-red opacity-80 group-hover:opacity-100 transition-opacity p-2 bg-white rounded-full border border-zinc-100">
                        <benefit.icon size={24} strokeWidth={1.5} />
                    </div>
                    <span className="font-mono text-xs text-zinc-400 group-hover:text-black font-bold">0{index + 1}</span>
                </div>
                <h3 className="text-lg md:text-xl font-black mb-3 leading-tight">{benefit.title}</h3>
              </div>
              
              <ul className="space-y-2 border-t border-zinc-300 pt-4 group-hover:border-kollab-red transition-colors">
                {benefit.items.map((item, idx) => (
                  <li key={idx} className="flex items-start text-zinc-700 text-xs md:text-sm font-medium">
                    <ArrowUpRight size={14} className="mr-2 mt-0.5 text-kollab-red shrink-0" />
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