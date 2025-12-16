import React from 'react';

export const About: React.FC = () => {
  return (
    // Compact padding and spacing for better viewport usage
    <section id="about" className="w-full flex flex-col justify-center items-center bg-kollab-beige text-black relative overflow-hidden px-6 py-16 md:py-20">
      {/* Decorative Line mimicking construction */}
      <div className="absolute top-0 left-10 md:left-20 w-[1px] h-full bg-zinc-300/50"></div>
      <div className="absolute top-0 right-10 md:right-20 w-[1px] h-full bg-zinc-300/50"></div>

      <div className="container mx-auto relative z-10 flex flex-col justify-center">
        
        {/* Intro - Compact text sizes */}
        <div className="max-w-5xl mx-auto mb-12 md:mb-16 w-full">
          <span className="block text-kollab-red font-bold tracking-widest mb-3 text-xs md:text-sm">OUR LOCATIONS</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 text-black uppercase tracking-tighter leading-[0.9]">
            Seoul <span className="text-zinc-400">&</span><br/>
            Los Angeles
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-zinc-700 font-medium leading-relaxed max-w-3xl border-l-4 border-kollab-red pl-6">
            인더스트리얼한 성수동의 무드와 LA의 자유로운 감성이 만나는 곳.<br/>
            KOLLAB Korea가 두 도시를 연결합니다.
          </p>
        </div>

        {/* Locations Grid - Reduced height */}
        <div id="locations" className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-black min-h-[400px]">
          
          {/* Seoul Card */}
          <div className="group relative bg-white border-b lg:border-b-0 lg:border-r border-black p-6 md:p-10 hover:bg-zinc-50 transition-colors duration-500 flex flex-col justify-between overflow-hidden min-h-[280px]">
            <div className="flex justify-between items-start z-10 relative mb-12">
                <div>
                  <h3 className="text-3xl md:text-4xl font-black text-black tracking-tighter">SEOUL</h3>
                  <p className="text-sm md:text-base font-bold text-zinc-600 mt-1">SEONGSU-DONG</p>
                </div>
                <span className="bg-kollab-red text-white text-xs font-bold px-3 py-1 uppercase">Current</span>
            </div>
            
            {/* Background Image Absolute */}
            <div className="absolute inset-0 z-0">
               <img 
                src="https://images.unsplash.com/photo-1538641139447-6249c394d1c6?q=80&w=1200&auto=format&fit=crop" 
                alt="Seoul Seongsu-dong Sophisticated Street" 
                className="w-full h-full object-cover grayscale opacity-20 group-hover:opacity-40 transition-all duration-700 scale-100 group-hover:scale-105"
              />
            </div>

            <div className="space-y-3 font-mono text-xs md:text-sm border-t border-black pt-6 z-10 relative">
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
          <div className="group relative bg-kollab-black text-white p-6 md:p-10 hover:bg-zinc-900 transition-colors duration-500 flex flex-col justify-between overflow-hidden min-h-[280px]">
             <div className="flex justify-between items-start z-10 relative mb-12">
                <div>
                  <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter">LOS ANGELES</h3>
                  <p className="text-sm md:text-base font-bold text-zinc-400 mt-1">DOWNTOWN LA</p>
                </div>
                <span className="bg-white text-black text-xs font-bold px-3 py-1 uppercase">Coming Soon</span>
            </div>
            
            {/* Background Image Absolute */}
            <div className="absolute inset-0 z-0">
               <img 
                  src="https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=1200&auto=format&fit=crop" 
                  alt="Los Angeles Iconic Cityscape with Palm Trees" 
                  className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-all duration-700 scale-100 group-hover:scale-105"
                />
            </div>

            <div className="space-y-3 font-mono text-xs md:text-sm border-t border-zinc-700 pt-6 z-10 relative">
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