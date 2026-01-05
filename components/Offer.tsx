import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './ui/Button';

gsap.registerPlugin(ScrollTrigger);

export const Offer: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaButtonContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline that triggers when the section enters the viewport
      // REMOVED: pin: true (to ensure content is never locked or hidden)
      // REMOVED: scrub (to ensure immediate playback for instant visibility)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%", // Trigger early as it comes into view
          toggleActions: "play none none reverse",
        }
      });

      // 1. Title Reveal (Immediate Visibility Rule applied)
      // FROM opacity: 1 ensures it is never hidden. We only animate position/scale.
      tl.from(titleRef.current, {
        y: 30,
        opacity: 1, // FORCE VISIBILITY
        duration: 0.6,
        ease: "power2.out",
        clearProps: "transform" // Clean up transform to prevent blurriness
      });

      // 2. Card Reveal
      tl.from(cardRef.current, {
        scale: 0.95,
        y: 30,
        opacity: 1, // FORCE VISIBILITY
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.4");

      // 3. Features Reveal
      tl.from(featuresRef.current, {
        y: 15,
        opacity: 1, // FORCE VISIBILITY
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.6");

      // 4. CTA Reveal
      tl.from(ctaRef.current, {
        scale: 0.95,
        y: 10,
        opacity: 1, // FORCE VISIBILITY
        duration: 0.4,
        ease: "back.out(1.5)"
      }, "-=0.3");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCtaClick = () => {
    if (ctaButtonContainerRef.current) {
      gsap.to(ctaButtonContainerRef.current, {
        scale: 0.92,
        duration: 0.1,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          window.open('https://wa.me/?text=I%20want%20the%207-Day%20WAR%20Pass', '_blank');
        }
      });
    }
  };

  return (
    <section ref={sectionRef} className="min-h-screen bg-brand-dark relative flex flex-col items-center justify-center overflow-hidden text-white py-20 z-20">
      
      <style>{`
        @keyframes pulse-urgent {
          0%, 100% { opacity: 0.6; transform: scale(1); filter: blur(8px); }
          50% { opacity: 1; transform: scale(1.05); filter: blur(12px); }
        }
        .animate-pulse-urgent {
          animation: pulse-urgent 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .group:hover .animate-pulse-urgent {
          animation-duration: 0.8s;
          opacity: 1;
        }
        .text-shadow-red {
            text-shadow: 0 0 30px rgba(255, 31, 31, 0.6);
        }
        .perspective-1000 {
            perspective: 1000px;
        }
      `}</style>

      {/* Cinematic Background Gradient - Low Z to stay behind */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-red/15 via-black to-black opacity-100 pointer-events-none z-0"></div>
      
      {/* Background Poster Text - Very subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 opacity-[0.05] select-none pointer-events-none">
         <h1 className="font-display text-[25vw] leading-none font-bold uppercase tracking-tighter text-white">
            INITIATION
         </h1>
      </div>

      {/* Main Content Container - High Z for visibility */}
      <div ref={contentRef} className="relative z-30 flex flex-col items-center w-full max-w-4xl px-4">
        
        {/* SECTION TITLE - Explicit opacity-100 and clean transform */}
        <div ref={titleRef} className="text-center mb-8 md:mb-14 relative z-30 opacity-100 transform-none">
           <h2 className="font-display text-6xl md:text-9xl font-bold uppercase leading-[0.9] tracking-tight text-white mb-4 drop-shadow-2xl">
             The 7-Day <br/> <span className="text-brand-red text-shadow-red">War Pass</span>
           </h2>
           <div className="flex items-center justify-center gap-4 opacity-90">
             <div className="h-[1px] w-8 md:w-12 bg-brand-red"></div>
             <p className="font-mono text-gray-200 tracking-[0.2em] uppercase text-xs md:text-sm font-semibold">
               Prove Your Worth
             </p>
             <div className="h-[1px] w-8 md:w-12 bg-brand-red"></div>
           </div>
        </div>

        {/* THE CARD VISUAL - Explicit opacity-100 */}
        <div className="perspective-1000 mb-10 md:mb-14 relative z-20 opacity-100">
            <div 
              ref={cardRef} 
              className="relative w-[320px] h-[210px] md:w-[600px] md:h-[360px] bg-gradient-to-br from-zinc-900 to-black border border-brand-red/30 rounded-2xl shadow-[0_20px_60px_-10px_rgba(255,31,31,0.15)] flex flex-col justify-between p-6 md:p-10 group transition-all duration-500 hover:border-brand-red/60 hover:shadow-[0_20px_80px_-10px_rgba(255,31,31,0.3)]"
            >
                {/* Tactical Corner Marks */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-brand-red/50 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-red/50 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-brand-red/50 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-brand-red/50 rounded-br-lg"></div>

                {/* Card Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-brand-red blur-[100px] opacity-10 rounded-full group-hover:opacity-20 transition-opacity duration-500"></div>

                {/* Card Top */}
                <div className="flex justify-between items-start relative z-10">
                    <div>
                         <div className="flex items-center gap-2 mb-1">
                             <div className="w-1.5 h-1.5 bg-brand-red animate-pulse"></div>
                             <span className="font-mono text-[10px] text-brand-red uppercase tracking-widest">Active Status</span>
                         </div>
                         <div className="font-display text-xl md:text-2xl text-white font-bold tracking-wide">WAR GYM ACCESS</div>
                    </div>
                    <div className="opacity-50">
                         {/* Barcode Lines */}
                         <div className="flex gap-[2px] h-6 items-end">
                            {[...Array(12)].map((_,i) => (
                                <div key={i} className="bg-white w-[2px]" style={{height: Math.random() * 100 + '%'}}></div>
                            ))}
                         </div>
                    </div>
                </div>

                {/* Card Center (Price) */}
                <div className="text-center relative z-10 my-auto">
                    <div className="flex items-start justify-center leading-none">
                        <span className="font-display text-3xl md:text-4xl font-bold text-brand-red mt-2 md:mt-4 mr-2">$</span>
                        <span className="font-display text-[6rem] md:text-[9rem] font-bold text-white tracking-tighter drop-shadow-2xl">29</span>
                    </div>
                </div>

                {/* Card Bottom */}
                <div className="flex justify-between items-end relative z-10">
                    <div className="text-[10px] md:text-xs font-mono text-gray-500 uppercase leading-relaxed">
                        Class: Civilian<br/>
                        Duration: 168 Hours
                    </div>
                    <div className="bg-white/5 backdrop-blur-md px-4 py-2 border border-white/10 rounded">
                        <span className="font-mono text-xs md:text-sm text-white uppercase tracking-widest font-bold">Priority Entry</span>
                    </div>
                </div>
            </div>
        </div>

        {/* VALUE POINTS - Explicit opacity-100 */}
        <div ref={featuresRef} className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-3 md:gap-12 mb-10 md:mb-12 relative z-20 opacity-100">
            {["7 Days Unlimited", "Full Facility Access", "No Commitment", "Coach Intro"].map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-brand-red rotate-45"></div>
                    <span className="font-mono text-xs md:text-sm text-gray-300 uppercase tracking-widest">{feat}</span>
                </div>
            ))}
        </div>

        {/* CTA - High Visibility */}
        <div ref={ctaRef} className="relative group cursor-pointer z-30 opacity-100" onClick={handleCtaClick}>
             {/* Enhanced Pulse Effect */}
             <div className="absolute inset-0 bg-brand-red rounded-full animate-pulse-urgent pointer-events-none"></div>
             
             <div ref={ctaButtonContainerRef} className="relative z-10">
                <Button 
                    variant="secondary" 
                    className="w-full md:w-auto min-w-[300px] border-2 border-brand-red hover:border-white transition-all shadow-xl pointer-events-none"
                    tabIndex={-1}
                >
                    Start The War Pass
                </Button>
             </div>
            
            <p className="text-center mt-4 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
                Offer ends when capacity is reached
            </p>
        </div>

      </div>
    </section>
  );
};