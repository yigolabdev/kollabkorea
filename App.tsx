
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatIsKollab from './components/WhatIsKollab';
import Features from './components/Features';
import About from './components/About';
import Brands from './components/Brands';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FAQ from './components/FAQ';
import ApplyModal from './components/ApplyModal';
import { LanguageProvider } from './LanguageContext';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = 'home';
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.pageYOffset >= sectionTop - 150) {
          current = section.getAttribute('id') || 'home';
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <LanguageProvider>
      <div className="relative overflow-x-hidden selection:bg-red-600 selection:text-white bg-[#e4e0db]">
        <Navbar activeSection={activeSection} onApplyClick={openModal} />
        
        <main>
          <section id="home" className="sticky top-0 h-screen" style={{ zIndex: 1 }}>
            <Hero onApplyClick={openModal} />
          </section>

          {/* What is KOLLAB - Introduction */}
          <section id="what-is-kollab" className="relative py-20 md:py-32 px-6 md:px-12 bg-white" style={{ zIndex: 10 }}>
            <WhatIsKollab />
          </section>

          {/* Features - Why Choose KOLLAB */}
          <section id="features" className="relative py-20 md:py-32 px-6 md:px-12 bg-zinc-50 border-y border-black/5" style={{ zIndex: 10 }}>
            <Features />
          </section>
          
          {/* About - Company Overview */}
          <section id="about" className="relative py-20 md:py-32 px-6 md:px-12 bg-white" style={{ zIndex: 10 }}>
            <About />
          </section>

          {/* Brands - Who Can Join */}
          <section id="brands" className="relative py-20 md:py-32 px-6 md:px-12 bg-black text-white" style={{ zIndex: 10 }}>
            <Brands />
          </section>
          
          {/* FAQ - Frequently Asked Questions */}
          <section id="faq" className="relative py-20 md:py-32 px-6 md:px-12 bg-white border-t border-black/5" style={{ zIndex: 10 }}>
            <FAQ />
          </section>

          {/* Contact - Get in Touch */}
          <section id="contact" className="relative py-20 md:py-32 px-6 md:px-12 bg-[#e4e0db]" style={{ zIndex: 10 }}>
            <Contact onApplyClick={openModal} />
          </section>
        </main>

        <Footer />

        {/* Apply Modal */}
        <ApplyModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </LanguageProvider>
  );
};

export default App;
