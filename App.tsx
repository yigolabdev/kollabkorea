import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Partners } from './components/Partners';
import { Benefits } from './components/Benefits';
import { Zones } from './components/Zones';
import { Brands } from './components/Brands';
import { MoodBoard } from './components/MoodBoard';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { ApplyCTA } from './components/ApplyCTA';
import { Footer } from './components/Footer';
import { ApplyModal } from './components/ApplyModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    // Optimized page flow with logical progression
    <div className="w-full min-h-screen bg-black text-white selection:bg-kollab-red selection:text-white">
      <Navbar />
      
      {/* 1. Hero: First Impression - "Ready to go global?" */}
      <Hero onApplyClick={openModal} />
      
      {/* 2. About: Who We Are - Seoul × LA Connection */}
      <About />
      
      {/* 3. Partners: Why Choose Us - Selection Criteria */}
      <Partners />
      
      {/* 4. Benefits: What You Get - 6 Key Benefits */}
      <Benefits />
      
      {/* 5. Zones: Where You'll Be - Zone Map Visualization */}
      <Zones />
      
      {/* 6. Brands: Who's Joining - Brand Showcase */}
      <Brands />
      
      {/* 7. MoodBoard: What It Looks Like - K-Beauty Aesthetic */}
      <MoodBoard />
      
      {/* 8. Pricing: How Much - Package Information */}
      <Pricing />
      
      {/* 9. FAQ: Common Questions - Frequently Asked */}
      <FAQ />

      {/* 10. Apply CTA: Take Action - Final Call to Action */}
      <ApplyCTA onApplyClick={openModal} />
      
      {/* 11. Contact: Get in Touch */}
      <Footer />
      
      <ApplyModal isOpen={isModalOpen} onClose={closeModal} />
      
      {/* Sticky CTA for Mobile */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white/90 backdrop-blur border-t border-gray-200 md:hidden z-40">
        <button 
          onClick={openModal}
          className="w-full bg-red-600 text-white font-bold py-3 rounded shadow-lg"
        >
          입점 신청하기 (Apply Now)
        </button>
      </div>
    </div>
  );
}

export default App;