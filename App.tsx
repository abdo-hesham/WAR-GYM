import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Problem } from './components/Problem';
import { Solution } from './components/Solution';
import { Transformation } from './components/Transformation';
import { Offer } from './components/Offer';
import { HowItWorks } from './components/HowItWorks';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { StickyCTA } from './components/StickyCTA';
import { Loader } from './components/Loader';

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if visited before to potentially skip loader (optional logic)
    // const hasVisited = localStorage.getItem('hasVisited');
    // if (hasVisited) setLoading(false);
    
    // Global scroll animations setup
    if (!loading) {
      gsap.utils.toArray('[data-speed]').forEach((el: any) => {
        gsap.to(el, {
          y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 0
          }
        });
      });
    }
  }, [loading]);

  return (
    <div className="bg-brand-dark min-h-screen text-white font-sans selection:bg-brand-red selection:text-white relative">
      {loading && <Loader onComplete={() => setLoading(false)} />}
      
      {/* Cinematic Grain Overlay */}
      <div className="noise-overlay"></div>
      
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Problem />
        <Solution />
        <Transformation />
        <Offer />
        <HowItWorks />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
      <StickyCTA />
    </div>
  );
};

export default App;