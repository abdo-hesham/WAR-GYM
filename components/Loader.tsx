import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LoaderProps {
  onComplete: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (containerRef.current) {
          containerRef.current.style.display = 'none';
        }
        onComplete();
      }
    });

    const counter = { val: 0 };

    // Initial State
    gsap.set(textRef.current, { y: 20, opacity: 0 });
    gsap.set(lineRef.current, { scaleX: 0 });

    // 1. Reveal Brand
    tl.to(textRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    })
    // 2. Load Progress
    .to(counter, {
      val: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.innerText = Math.floor(counter.val).toString().padStart(2, '0');
        }
      }
    }, "-=0.5")
    // 3. Red Line Expansion
    .to(lineRef.current, {
      scaleX: 1,
      duration: 1.5,
      ease: "expo.inOut"
    }, "<")
    // 4. Exit Transition (Slide Up / Curtain Reveal)
    .to(textRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in"
    })
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut" // Smooth, dramatic exit
    }, "-=0.2");

  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Brand Name */}
        <div ref={textRef} className="font-display font-bold text-6xl md:text-8xl tracking-tighter uppercase mb-2">
          WAR <span className="text-brand-red">GYM</span>
        </div>

        {/* Decorative Line */}
        <div ref={lineRef} className="w-64 h-[2px] bg-brand-red mb-6 origin-left"></div>

        {/* Counter */}
        <div className="overflow-hidden h-12">
          <div ref={counterRef} className="font-mono text-xl md:text-2xl text-gray-500 font-bold">
            00
          </div>
        </div>
      </div>
    </div>
  );
};