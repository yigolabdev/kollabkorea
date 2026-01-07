import React from 'react';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 bg-[#f4f2ed]">
      {/* Mesh Gradients - Adjusted colors slightly to play nice with red/black theme */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-200/40 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/40 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-gray-200/30 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '4s' }} />
      
      {/* Noise Texture for density */}
      <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")` }} />
    </div>
  );
};

export default Background;