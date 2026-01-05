import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Problem: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 1,
        pin: true,
      }
    });

    // Phase 1: Zoom into text
    tl.to(textRef.current, {
      scale: 1.5,
      opacity: 0,
      filter: 'blur(20px)',
      duration: 1
    });

    // Phase 2: Red Overlay & New Truth
    tl.to(overlayRef.current, {
      opacity: 1,
      duration: 0.5
    }, "-=0.5");
    
    tl.fromTo(".truth-text", 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1 },
      "-=0.2"
    );

  }, []);

  return (
    <section ref={sectionRef} className="h-screen bg-black text-white overflow-hidden relative flex items-center justify-center">
      
      {/* Initial State */}
      <div ref={textRef} className="text-center z-10 px-4">
        <h2 className="font-display text-[10vw] font-bold uppercase leading-none tracking-tighter">
          YOU ARE <br/>
          <span className="text-gray-500">COMFORTABLE</span>
        </h2>
      </div>

      {/* Revealed State */}
      <div ref={overlayRef} className="absolute inset-0 bg-brand-red flex flex-col items-center justify-center z-20 opacity-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply"></div>
        
        <div className="container mx-auto px-4 text-center">
          <h2 className="truth-text font-display text-[12vw] text-black font-bold uppercase leading-[0.85] tracking-tighter mb-8">
            THAT IS <br/> THE PROBLEM
          </h2>
          <p className="truth-text font-sans text-xl md:text-3xl text-black font-medium max-w-2xl mx-auto border-l-4 border-black pl-6 text-left">
            Comfort is a slow death. You need an environment that challenges your very existence.
          </p>
        </div>
      </div>
    </section>
  );
};