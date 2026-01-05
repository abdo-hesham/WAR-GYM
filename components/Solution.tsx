import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Solution: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=400%", // Extended scroll distance for pacing
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        }
      });

      // SCENE 1 -> SCENE 2 (Wipe Up)
      tl.fromTo(".scene-2", 
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.5, ease: "power2.inOut" }
      )
      .fromTo(".scene-2-img", { scale: 1.2 }, { scale: 1, duration: 1.5 }, "<")
      .fromTo(".scene-2-text", { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.5");

      // SCENE 2 -> SCENE 3 (Circular Reveal)
      tl.fromTo(".scene-3",
        { clipPath: "circle(0% at 50% 50%)" },
        { clipPath: "circle(100% at 50% 50%)", duration: 1.5, ease: "power2.inOut" }
      )
      .fromTo(".scene-3-img", { scale: 1.1 }, { scale: 1, duration: 1.5 }, "<")
      .fromTo(".scene-3-text", { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 1 }, "-=0.8");

      // SCENE 3 -> SCENE 4 (Fade In)
      tl.fromTo(".scene-4",
        { opacity: 0 },
        { opacity: 1, duration: 1.5, ease: "power1.inOut" }
      )
      .fromTo(".scene-4-img", { scale: 1.2 }, { scale: 1, duration: 1.5 }, "<")
      .fromTo(".scene-4-text", { letterSpacing: "1em", opacity: 0 }, { letterSpacing: "0.05em", opacity: 1, duration: 1.5 }, "<");

    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="bg-black text-white relative">
      <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
        
        {/* --- SCENE 1: ENTRY --- */}
        <div className="scene-1 absolute inset-0 z-10 w-full h-full bg-black">
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <img 
                src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1600&auto=format&fit=crop"
                alt="Gym Entry"
                className="scene-1-img w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                <p className="text-brand-red font-mono text-xs md:text-sm uppercase tracking-[0.3em] mb-6">Facility Tour</p>
                <h2 className="font-display text-[12vw] md:text-[7vw] font-bold text-white leading-[0.9] tracking-tighter uppercase text-shadow-xl">
                    Step Inside<br/>The Arena
                </h2>
            </div>
        </div>

        {/* --- SCENE 2: EQUIPMENT --- */}
        <div className="scene-2 absolute inset-0 z-20 w-full h-full bg-brand-dark">
             <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10"></div>
             <img 
                src="https://images.unsplash.com/photo-1637666062717-1c6bcfa4a4df?q=80&w=1600&auto=format&fit=crop"
                alt="Equipment Details"
                className="scene-2-img w-full h-full object-cover"
            />
            <div className="scene-2-text absolute bottom-12 left-6 md:bottom-32 md:left-24 z-20 max-w-xl">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-[2px] bg-brand-red"></div>
                    <span className="font-mono text-white/60 uppercase tracking-widest text-xs md:text-sm">Hardware</span>
                 </div>
                 <h2 className="font-display text-6xl md:text-8xl text-white font-bold uppercase leading-[0.85] tracking-tight mb-6">
                    Iron<br/>Arsenal
                 </h2>
                 <p className="font-sans text-gray-400 text-lg md:text-xl font-light max-w-md border-l border-white/20 pl-6">
                    Hammer Strength & Eleiko plate-loaded machinery. No plastic. No gimmicks. Just heavy metal.
                 </p>
            </div>
        </div>

        {/* --- SCENE 3: ZONES --- */}
        <div className="scene-3 absolute inset-0 z-30 w-full h-full bg-zinc-900">
             <div className="absolute inset-0 bg-black/60 z-10"></div>
             <img 
                src="https://images.unsplash.com/photo-1517964603305-11c0f6f66012?q=80&w=1600&auto=format&fit=crop"
                alt="Performance Zone"
                className="scene-3-img w-full h-full object-cover filter grayscale contrast-125"
            />
            <div className="scene-3-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center w-full px-4">
                 <h2 className="font-display text-[15vw] md:text-[10vw] font-bold text-transparent stroke-text leading-none uppercase opacity-90 tracking-tighter">
                    Combat<br/>Ready
                 </h2>
                 <div className="inline-block bg-brand-red px-6 py-2 mt-8 transform -rotate-2">
                    <span className="font-display text-black font-bold text-xl md:text-2xl uppercase tracking-widest">
                        Performance Zones
                    </span>
                 </div>
            </div>
        </div>

        {/* --- SCENE 4: ATMOSPHERE --- */}
        <div className="scene-4 absolute inset-0 z-40 w-full h-full bg-black">
             <div className="absolute inset-0 bg-gradient-to-t from-brand-red/30 to-black z-10"></div>
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-10"></div>
             <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop"
                alt="Atmosphere"
                className="scene-4-img w-full h-full object-cover opacity-50 mix-blend-luminosity"
            />
            <div className="scene-4-text absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
                 <h2 className="font-display text-5xl md:text-7xl text-white font-bold uppercase tracking-widest text-center mb-4">
                    Built for <span className="text-brand-red">War</span>
                 </h2>
                 <p className="font-mono text-gray-400 text-xs md:text-sm uppercase tracking-[0.5em]">No Compromise</p>
            </div>
        </div>

        {/* HUD Elements */}
        <div className="absolute top-8 right-8 z-50 flex gap-2">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white/20 rounded-full"></div>
            <div className="w-1 h-1 bg-white/20 rounded-full"></div>
            <div className="w-1 h-1 bg-white/20 rounded-full"></div>
        </div>

        <div className="absolute bottom-8 right-8 z-50 mix-blend-difference hidden md:block">
            <span className="font-mono text-xs text-white uppercase tracking-widest">Scroll to Explore</span>
        </div>

        <style>{`
            .stroke-text {
                -webkit-text-stroke: 2px white;
            }
            @media (max-width: 768px) {
                .stroke-text {
                    -webkit-text-stroke: 1px white;
                }
            }
            .text-shadow-xl {
                text-shadow: 0 10px 30px rgba(0,0,0,0.5);
            }
        `}</style>

      </section>
    </div>
  );
};