import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from './ui/Button';

export const FinalCTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.to(".bg-pulse", {
      opacity: 0.3,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <section className="min-h-screen bg-brand-red relative flex items-center justify-center overflow-hidden">
      {/* Background Pulse */}
      <div className="bg-pulse absolute inset-0 bg-red-600 mix-blend-overlay opacity-20"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply"></div>
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="overflow-hidden mb-8">
           <h2 className="font-display text-[15vw] leading-[0.8] font-bold uppercase text-black tracking-tighter mix-blend-multiply opacity-50 select-none">
             NOW
           </h2>
        </div>

        <div className="relative -mt-[10vw] md:-mt-[12vw] z-20">
          <h2 className="font-display text-5xl md:text-8xl font-bold uppercase text-white mb-8 drop-shadow-xl">
            Tomorrow Never Comes
          </h2>
          <div className="flex justify-center scale-125 origin-center">
            <Button 
              variant="primary" 
              className="!bg-black !text-white hover:!bg-white hover:!text-black border-2 border-black"
              onClick={() => window.open('https://wa.me/?text=Im%20ready%20to%20join%20WAR%20GYM', '_blank')}
            >
              Start The War
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};