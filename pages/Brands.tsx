
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';

const BRANDS = ['MUZMAK', 'ARENCIA', 'TBD', 'TBD', 'TBD', 'TBD', 'TBD', 'TBD', 'TBD', 'TBD'];

interface BrandsProps {
  navigateTo: (page: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
};

const Brands: React.FC<BrandsProps> = ({ navigateTo }) => {
  return (
    <div className="px-6 max-w-7xl mx-auto pt-0 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10 text-left border-b-4 border-black pb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-8xl font-extrabold text-black leading-[0.95] uppercase tracking-normal"
        >
          THE<br />BRANDS
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-md text-xl md:text-3xl font-semibold text-black/60 uppercase tracking-[0.08em]"
        >
          Curating the finest Korean labels ready for the global stage. From K-beauty to streetwear.
        </motion.p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-px bg-black/20 border border-black/20"
      >
        {BRANDS.map((brand, i) => (
          <motion.div 
            key={i} 
            variants={itemVariants}
            whileHover={{ backgroundColor: '#000000', color: '#EDEBE4' }}
            className="aspect-square bg-[#EDEBE4] flex items-center justify-center p-8 group transition-colors duration-300 cursor-pointer relative overflow-hidden"
          >
            <span className="font-extrabold text-xl tracking-[0.22em] uppercase text-center relative z-10">{brand}</span>
            <div className="absolute inset-0 border-4 border-black opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-16 text-left">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-12 bg-white"
        >
           <h4 className="font-extrabold mb-8 text-3xl text-black uppercase border-b-2 border-black pb-4 tracking-wide">OCTOBER POP-UP</h4>
           <div className="space-y-6">
             <div className="flex flex-col">
               <span className="text-sm font-extrabold text-black/50 tracking-[0.12em] uppercase mb-1">PERIOD</span>
               <span className="text-2xl font-extrabold text-black tracking-wide">10/17 - 10/26 (10 DAYS)</span>
             </div>
             <div className="flex flex-col">
               <span className="text-sm font-extrabold text-black/50 tracking-[0.12em] uppercase mb-1">FOCUS</span>
               <span className="text-2xl font-extrabold text-black tracking-wide">K-BEAUTY, FASHION, GOODS</span>
             </div>
           </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-12 bg-black text-[#EDEBE4]"
        >
           <h4 className="font-extrabold mb-8 text-3xl uppercase border-b-2 border-[#EDEBE4]/30 pb-4 tracking-wide">BRAND BENEFITS</h4>
           <ul className="space-y-6 text-xl font-extrabold tracking-[0.05em] uppercase">
             <li className="flex items-center gap-4">
               <span className="w-2 h-2 bg-[#EDEBE4] rounded-full"></span>
               FULL OPERATION MANAGEMENT
             </li>
             <li className="flex items-center gap-4">
               <span className="w-2 h-2 bg-[#EDEBE4] rounded-full"></span>
               MEDIA CONTENT PRODUCTION
             </li>
             <li className="flex items-center gap-4">
               <span className="w-2 h-2 bg-[#EDEBE4] rounded-full"></span>
               INFLUENCER PR & EXPOSURE
             </li>
           </ul>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-32 text-center"
      >
        <button 
          onClick={() => navigateTo('CONTACT')}
          className="inline-block border-b-4 border-black text-5xl font-extrabold text-black uppercase hover:opacity-50 transition-all pb-2 tracking-wide"
        >
          WANT TO BE NEXT? APPLY NOW
        </button>
      </motion.div>
    </div>
  );
};

export default Brands;
