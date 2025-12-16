import React from 'react';

export const MoodBoard: React.FC = () => {
  const moodImages = [
    { src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=600&auto=format&fit=crop", alt: "K-Beauty Products", span: "row-span-2", label: "K-BEAUTY" },
    { src: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=600&auto=format&fit=crop", alt: "Skincare Texture", span: "row-span-1", label: "TEXTURE" },
    { src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop", alt: "Beauty Store", span: "row-span-2", label: "DISPLAY" },
    { src: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=600&auto=format&fit=crop", alt: "Cosmetics", span: "row-span-1", label: "PRODUCTS" },
    { src: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop", alt: "Beauty Essence", span: "row-span-1", label: "ESSENCE" },
    { src: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?q=80&w=600&auto=format&fit=crop", alt: "Makeup Collection", span: "row-span-2", label: "MAKEUP" },
    { src: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=600&auto=format&fit=crop", alt: "Skincare Bottle", span: "row-span-1", label: "CARE" },
    { src: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=600&auto=format&fit=crop", alt: "Premium Beauty", span: "row-span-2", label: "PREMIUM" },
    { src: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=600&auto=format&fit=crop", alt: "Beauty Details", span: "row-span-1", label: "DETAIL" },
    { src: "https://images.unsplash.com/photo-1487260211189-670c54da558d?q=80&w=600&auto=format&fit=crop", alt: "Beauty Studio", span: "row-span-2", label: "STUDIO" },
    { src: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=600&auto=format&fit=crop", alt: "Cosmetic Art", span: "row-span-1", label: "ART" },
    { src: "https://images.unsplash.com/photo-1505944357793-0e7a46a30b2b?q=80&w=600&auto=format&fit=crop", alt: "Beauty Palette", span: "row-span-1", label: "PALETTE" },
  ];

  return (
    <section id="mood" className="w-full flex flex-col justify-center bg-black px-6 py-16 md:py-20 relative overflow-hidden">
      <div className="container mx-auto flex flex-col">
        
        {/* Header */}
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

        {/* Masonry Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-[150px] gap-2 md:gap-3">
          {moodImages.map((image, index) => (
            <div 
              key={index}
              className={`relative group overflow-hidden border border-zinc-800 hover:border-kollab-red transition-all duration-300 ${image.span}`}
            >
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 text-[9px] text-white font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {image.label}
              </div>
            </div>
          ))}
        </div>

        {/* Text Block - Add visual break */}
        <div className="mt-8 bg-zinc-900 border border-zinc-800 p-6 md:p-8 text-center hover:bg-kollab-red/10 transition-colors duration-500">
          <p className="text-zinc-500 font-mono text-xs md:text-sm leading-loose">
            Raw Materials meets <span className="text-white font-bold text-base md:text-lg">High Technology</span>
          </p>
        </div>

      </div>
    </section>
  );
};