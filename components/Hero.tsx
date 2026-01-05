import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from './ui/Button';
import { RevealText } from './ui/RevealText';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 2.5 }); // Wait for loader to finish approx

    // Opening Scene Sequence
    tl.to(imgRef.current, {
      scale: 1.1,
      opacity: 0.5,
      filter: 'blur(0px)',
      duration: 2,
      ease: 'power2.out'
    }, 0);

    // Animate content in sequence
    tl.fromTo(".hero-sub", 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
      0.8
    );
    
    tl.fromTo(".hero-cta", 
      { y: 20, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
      1.2
    );

    // Parallax effect on scroll
    gsap.to(imgRef.current, {
      yPercent: 30,
      scale: 1.2,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen min-h-[800px] flex flex-col justify-center items-center overflow-hidden bg-brand-dark">
      
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-brand-dark z-10"></div>
        <div className="absolute inset-0 bg-black/30 z-10"></div> {/* Extra dimming for text contrast */}
        <img 
          ref={imgRef}
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" 
          alt="Atmosphere" 
          className="w-full h-full object-cover object-center scale-125 opacity-0 blur-md"
        />
      </div>

      {/* Hero Content */}
      <div ref={contentRef} className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center">
        
        {/* 1. Headline - Clear & Transformational */}
        <div className="mb-6 overflow-visible mix-blend-screen">
          <RevealText 
            className="font-display text-[12vw] md:text-[9vw] leading-[0.85] font-bold uppercase tracking-tighter text-white" 
            delay={3} // Sync with loader
          >
            BUILD REAL POWER
          </RevealText>
        </div>

        {/* 2. Subheadline - Value & Outcome */}
        <div className="hero-sub overflow-hidden max-w-2xl mx-auto mb-10 opacity-0">
          <p className="font-sans text-gray-200 text-lg md:text-2xl font-light leading-relaxed">
            Stop exercising. Start training. <br className="hidden md:block" />
            Join the only facility dedicated to your complete physical evolution.
          </p>
        </div>

        {/* 3. Primary CTA - High Contrast */}
        <div className="hero-cta opacity-0">
          <Button 
            onClick={() => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' })}
            className="shadow-[0_0_40px_rgba(255,31,31,0.4)] hover:shadow-[0_0_60px_rgba(255,31,31,0.6)]"
          >
            Start Your Transformation
          </Button>
          
          <p className="mt-4 text-xs font-mono text-gray-500 uppercase tracking-widest">
            Limited spots available for this cycle
          </p>
        </div>
      </div>
    </section>
  );
};