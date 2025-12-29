
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatIsKollab from './components/WhatIsKollab';
import Features from './components/Features';
import About from './components/About';
import Platform from './components/Platform';
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
          <section id="home">
            <Hero onApplyClick={openModal} />
          </section>

          {/* What is KOLLAB - Introduction */}
          <section id="what-is-kollab" className="py-20 md:py-32 px-6 md:px-12 bg-white">
            <WhatIsKollab />
          </section>

          {/* Features - Why Choose KOLLAB */}
          <section id="features" className="py-20 md:py-32 px-6 md:px-12 bg-zinc-50 border-y border-black/5">
            <Features />
          </section>
          
          {/* About - Company Overview */}
          <section id="about" className="py-20 md:py-32 px-6 md:px-12 bg-white">
            <About />
          </section>

          {/* Brands - Who Can Join */}
          <section id="brands" className="py-20 md:py-32 px-6 md:px-12 bg-black text-white">
            <Brands />
          </section>
          
          {/* Platform - Zone Selection (moved after Brands) */}
          <section id="platform" className="py-20 md:py-32 px-6 md:px-12 bg-[#e4e0db] industrial-mesh">
            <Platform />
          </section>
          
          {/* FAQ - Frequently Asked Questions */}
          <section id="faq" className="py-20 md:py-32 px-6 md:px-12 bg-white border-t border-black/5">
            <FAQ />
          </section>

          {/* Contact - Get in Touch */}
          <section id="contact" className="py-20 md:py-32 px-6 md:px-12 bg-[#e4e0db]">
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
