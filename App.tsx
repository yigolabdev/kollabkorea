
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import About from './components/About';
import Platform from './components/Platform';
import Brands from './components/Brands';
import Closing from './components/Closing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FAQ from './components/FAQ';
import { LanguageProvider } from './LanguageContext';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');

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
        <Navbar activeSection={activeSection} />
        
        <main>
          <section id="home">
            <Hero />
          </section>

          {/* Increased padding for better visibility height (py-32 to py-48) */}
          <section id="features" className="py-32 md:py-48 px-6 md:px-12 bg-white">
            <Features />
          </section>
          
          <section id="about" className="py-32 md:py-48 px-6 md:px-12 bg-zinc-50 border-y border-black/5">
            <About />
          </section>
          
          <section id="platform" className="py-32 md:py-48 px-6 md:px-12 bg-[#e4e0db] industrial-mesh">
            <Platform />
          </section>

          <section id="brands" className="py-32 md:py-48 px-6 md:px-12 bg-black text-white">
            <Brands />
          </section>

          <Closing />
          
          <section id="faq" className="py-32 md:py-48 px-6 md:px-12 bg-white border-t border-black/5">
            <FAQ />
          </section>

          <section id="contact" className="py-32 md:py-48 px-6 md:px-12 bg-[#e4e0db]">
            <Contact />
          </section>
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;
