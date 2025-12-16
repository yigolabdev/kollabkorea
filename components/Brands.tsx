import React from 'react';

export const Brands: React.FC = () => {
  const brands = [
    {
      name: "Premium Skincare",
      category: "Skincare",
      image: "https://images.unsplash.com/photo-1556229010-aa1e77a40f34?q=80&w=600&auto=format&fit=crop",
      zone: "Premium"
    },
    {
      name: "Clean Beauty",
      category: "Makeup",
      image: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=600&auto=format&fit=crop",
      zone: "Standard"
    },
    {
      name: "Natural Care",
      category: "Skincare",
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
      zone: "Premium"
    },
    {
      name: "K-Glow",
      category: "Makeup",
      image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=600&auto=format&fit=crop",
      zone: "Standard"
    },
    {
      name: "Seoul Essence",
      category: "Skincare",
      image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop",
      zone: "Basic"
    },
    {
      name: "Urban Beauty",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=600&auto=format&fit=crop",
      zone: "Basic"
    }
  ];

  return (
    <section id="brands" className="w-full flex flex-col justify-center bg-zinc-900 text-white px-6 py-16 md:py-20">
      <div className="container mx-auto flex flex-col">
        
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-[2px] bg-kollab-red"></div>
            <span className="text-kollab-red font-bold tracking-widest text-xs uppercase">Featured Brands</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-none mb-4">
            Meet Our <span className="text-kollab-red">Brands</span>
          </h2>
          <p className="text-sm md:text-base text-zinc-400 max-w-2xl">
            엄선된 K-브랜드들이 KOLLAB SEOUL에서 만나는 글로벌 기회
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {brands.map((brand, index) => (
            <div 
              key={index}
              className="group relative bg-black border border-zinc-800 hover:border-kollab-red transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="aspect-square overflow-hidden relative">
                <img 
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                />
                {/* Zone Badge */}
                <div className={`absolute top-3 right-3 px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
                  brand.zone === 'Premium' ? 'bg-kollab-red text-white' :
                  brand.zone === 'Standard' ? 'bg-zinc-700 text-white' :
                  'bg-zinc-800 text-zinc-400'
                }`}>
                  {brand.zone}
                </div>
              </div>
              
              {/* Info */}
              <div className="p-4 md:p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base md:text-lg font-black text-white group-hover:text-kollab-red transition-colors">
                    {brand.name}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-zinc-500 uppercase tracking-wider">{brand.category}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-zinc-400 text-sm md:text-base mb-4">
            당신의 브랜드도 이곳에서 만나보세요
          </p>
          <div className="inline-flex items-center gap-2 text-kollab-red font-bold text-xs md:text-sm uppercase tracking-widest hover:gap-4 transition-all">
            <span>Apply Now</span>
            <span>→</span>
          </div>
        </div>

      </div>
    </section>
  );
};

