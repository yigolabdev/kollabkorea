import React from 'react';

export const About: React.FC = () => {
  return (
    // Changed: Removed h-screen, snap-start. Added min-h-screen, py-32 (large padding)
    <section id="about" className="min-h-screen w-full flex flex-col justify-center items-center bg-kollab-beige text-black relative overflow-hidden px-6 py-32 md:py-40">
      {/* Decorative Line mimicking construction */}
      <div className="absolute top-0 left-10 md:left-20 w-[1px] h-full bg-zinc-300/50"></div>
      <div className="absolute top-0 right-10 md:right-20 w-[1px] h-full bg-zinc-300/50"></div>

      <div className="container mx-auto relative z-10 flex flex-col justify-center">
        
        {/* Intro - Black text on Beige */}
        <div className="max-w-5xl mx-auto mb-20 md:mb-24 w-full">
          <span className="block text-kollab-red font-bold tracking-widest mb-4 text-sm md:text-base">OUR LOCATIONS</span>
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 md:mb-12 text-black uppercase tracking-tighter leading-[0.9]">
            Seoul <span className="text-zinc-400">&</span><br/>
            Los Angeles
          </h2>
          <p className="text-lg md:text-2xl lg:text-3xl text-zinc-700 font-medium leading-relaxed max-w-3xl border-l-4 border-kollab-red pl-8">
            인더스트리얼한 성수동의 무드와 LA의 자유로운 감성이 만나는 곳.<br/>
            KOLLAB Korea가 두 도시를 연결합니다.
          </p>
        </div>

        {/* Locations Grid - Adjusted Height for Natural Flow */}
        <div id="locations" className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-black min-h-[600px]">
          
          {/* Seoul Card */}
          <div className="group relative bg-white border-b lg:border-b-0 lg:border-r border-black p-8 md:p-16 hover:bg-zinc-50 transition-colors duration-500 flex flex-col justify-between overflow-hidden min-h-[400px]">
            <div className="flex justify-between items-start z-10 relative mb-20">
                <h3 className="text-4xl md:text-6xl font-black text-black tracking-tighter">SEOUL</h3>
                <span className="bg-kollab-red text-white text-xs md:text-sm font-bold px-4 py-1.5 uppercase">Current</span>
            </div>
            
            {/* Background Image Absolute */}
            <div className="absolute inset-0 z-0">
               <img 
                src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=800&auto=format&fit=crop" 
                alt="Seongsu Interior" 
                className="w-full h-full object-cover grayscale opacity-20 group-hover:opacity-40 transition-all duration-700 scale-100 group-hover:scale-105"
              />
            </div>

            <div className="space-y-4 font-mono text-sm md:text-base border-t border-black pt-8 z-10 relative">
               <div className="flex justify-between">
                  <span className="text-zinc-500">LOCATION</span>
                  <span className="font-bold">SEONGSU-DONG, SEOUL</span>
               </div>
               <div className="flex justify-between">
                  <span className="text-zinc-500">TYPE</span>
                  <span className="font-bold">POP-UP & EXHIBITION</span>
               </div>
               <div className="flex justify-between">
                  <span className="text-zinc-500">STATUS</span>
                  <span className="font-bold text-kollab-red">OPEN (10:00 - 20:00)</span>
               </div>
            </div>
          </div>

          {/* LA Card */}
          <div className="group relative bg-kollab-black text-white p-8 md:p-16 hover:bg-zinc-900 transition-colors duration-500 flex flex-col justify-between overflow-hidden min-h-[400px]">
             <div className="flex justify-between items-start z-10 relative mb-20">
                <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter">LA</h3>
                <span className="bg-white text-black text-xs md:text-sm font-bold px-4 py-1.5 uppercase">Coming Soon</span>
            </div>
            
            {/* Background Image Absolute */}
            <div className="absolute inset-0 z-0">
               <img 
                  src="https://images.unsplash.com/photo-1560362614-89027598847b?q=80&w=800&auto=format&fit=crop" 
                  alt="LA Interior" 
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-all duration-700 scale-100 group-hover:scale-105"
                />
            </div>

            <div className="space-y-4 font-mono text-sm md:text-base border-t border-zinc-700 pt-8 z-10 relative">
               <div className="flex justify-between">
                  <span className="text-zinc-500">LOCATION</span>
                  <span className="font-bold">DOWNTOWN, LOS ANGELES</span>
               </div>
               <div className="flex justify-between">
                  <span className="text-zinc-500">TYPE</span>
                  <span className="font-bold">GLOBAL FLAGSHIP STORE</span>
               </div>
               <div className="flex justify-between">
                  <span className="text-zinc-500">OPENING</span>
                  <span className="font-bold text-kollab-red">AUGUST 2025</span>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};