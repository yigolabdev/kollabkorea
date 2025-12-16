import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { MoodBoard } from './components/MoodBoard';
import { Partners } from './components/Partners';
import { Benefits } from './components/Benefits';
import { Zones } from './components/Zones';
import { Footer } from './components/Footer';
import { ApplyModal } from './components/ApplyModal';
import { ApplyCTA } from './components/ApplyCTA';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    // Changed: Removed h-screen, overflow-y-scroll, snap-y, snap-mandatory
    // Added: min-h-screen to ensure full height background
    <div className="w-full min-h-screen bg-black text-white selection:bg-kollab-red selection:text-white">
      <Navbar />
      
      {/* 1. Hero: Brand Impact & Hook */}
      <Hero onApplyClick={openModal} />
      
      {/* 2. About: Context & Location Trust */}
      <About />
      
      {/* 3. Benefits: Value Proposition (Why join?) */}
      <Benefits />
      
      {/* 4. Zones: Product Placement Visualization (Where?) */}
      <Zones />
      
      {/* 5. MoodBoard: Aesthetic Alignment (Does it fit?) */}
      <MoodBoard />
      
      {/* 6. Partners: Scarcity & Criteria */}
      <Partners />

      {/* 7. Apply CTA: Final Call to Action */}
      <ApplyCTA onApplyClick={openModal} />
      
      {/* 8. Contact */}
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