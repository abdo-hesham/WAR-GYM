import React, { useEffect, useState, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import gsap from 'gsap';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const pulseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Continuous subtle pulse animation
    gsap.to(pulseRef.current, {
      scale: 1.2,
      opacity: 0,
      duration: 1.5,
      repeat: -1,
      ease: "power1.out"
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-brand-dark/90 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="font-display font-bold text-2xl md:text-3xl tracking-tighter uppercase select-none cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          WAR <span className="text-brand-red">GYM</span>
        </div>

        {/* WhatsApp Icon CTA */}
        <div className="relative group cursor-pointer" onClick={() => window.open('https://wa.me/?text=I%20want%20to%20join%20WAR%20GYM', '_blank')}>
          {/* Pulse Ring */}
          <div ref={pulseRef} className="absolute inset-0 bg-white/20 rounded-full z-0"></div>
          
          {/* Icon Container */}
          <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[#25D366] group-hover:border-[#25D366] group-hover:scale-110">
            <MessageCircle className="text-white w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>
      </div>
    </nav>
  );
};