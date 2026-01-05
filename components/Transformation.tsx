import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const cases = [
  { 
    name: "MIKE T.", 
    result: "REBUILT", 
    stats: "-24 LBS", 
    time: "12 WEEKS",
    quote: "I didn't just lose weight. I found a new purpose. The discipline I learned here saved my marriage and my career.",
    img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    name: "SARAH J.", 
    result: "WEAPONIZED", 
    stats: "-14% BF", 
    time: "16 WEEKS",
    quote: "They told me I couldn't lift heavy. WAR GYM proved them wrong. Stronger at 35 than I was at 20.",
    img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1200&auto=format&fit=crop" 
  },
  { 
    name: "DAVID B.", 
    result: "ARMORED", 
    stats: "+18 LBS", 
    time: "20 WEEKS",
    quote: "Weakness is a choice. I chose to kill it. This isn't just a gym, it's a forge.",
    img: "https://images.unsplash.com/photo-1611672585731-fa1060a80930?q=80&w=1200&auto=format&fit=crop" 
  },
];

export const Transformation: React.FC = () => {
  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <section className="py-24 bg-black relative">
      <div className="container mx-auto px-4 mb-20">
        <div className="flex flex-col items-center text-center">
          <span className="text-brand-red font-mono text-sm uppercase tracking-[0.2em] mb-4">Real Results // Real People</span>
          <h2 className="font-display text-6xl md:text-9xl font-bold uppercase text-white leading-[0.85]">
            Proof of <span className="text-brand-red">War</span>
          </h2>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl pb-24">
        {cases.map((item, i) => (
          <div 
            key={i} 
            className="trans-card sticky top-24 w-full mb-12 last:mb-0"
          >
            <div className="relative w-full aspect-[4/6] md:aspect-[21/9] bg-zinc-900 border border-zinc-800 overflow-hidden group shadow-2xl">
              
              {/* Image Background */}
              <div className="absolute inset-0 z-0">
                 <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover filter grayscale contrast-125 brightness-50 md:brightness-75 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-[50%] group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/80 to-transparent opacity-90 md:opacity-100"></div>
              </div>

              {/* Content Grid */}
              <div className="relative h-full p-6 md:p-12 flex flex-col justify-between z-10">
                
                {/* Top Row */}
                <div className="flex justify-between items-start border-b border-white/20 pb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                       <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></div>
                       <span className="font-mono text-xs text-brand-red uppercase tracking-widest">Subject {i+1}</span>
                    </div>
                    <h3 className="font-display text-4xl md:text-5xl font-bold text-white uppercase tracking-tight">{item.name}</h3>
                  </div>
                  <div className="text-right hidden md:block">
                     <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-1">Timeframe</span>
                     <span className="font-display text-2xl text-white uppercase">{item.time}</span>
                  </div>
                </div>

                {/* Middle (Quote) */}
                <div className="max-w-xl py-8 md:py-0">
                  <Quote className="text-brand-red mb-4 opacity-80" size={32} />
                  <p className="font-sans text-lg md:text-2xl text-gray-200 italic font-light leading-relaxed">
                    "{item.quote}"
                  </p>
                </div>

                {/* Bottom Row (Stats) */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mt-auto gap-6 md:gap-0">
                   <div>
                      <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-2">Outcome</span>
                      <div className="font-display text-5xl md:text-8xl font-bold text-white leading-none tracking-tighter text-transparent stroke-text-white transition-all duration-500">
                        {item.result}
                      </div>
                   </div>
                   
                   <div className="flex items-center gap-4 w-full md:w-auto">
                     <div className="md:hidden">
                        <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-1">Time</span>
                        <span className="font-display text-xl text-white uppercase">{item.time}</span>
                     </div>
                     <div className="bg-brand-red p-4 md:p-6 text-center ml-auto min-w-[140px] transform group-hover:-translate-y-2 transition-transform duration-300">
                        <span className="block font-display text-4xl md:text-5xl font-bold text-black leading-none mb-1">{item.stats}</span>
                        <span className="font-mono text-[10px] md:text-xs text-black uppercase font-bold tracking-widest">Delta</span>
                     </div>
                   </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
      
      <style>{`
        .stroke-text-white {
          -webkit-text-stroke: 1px rgba(255,255,255,0.6);
        }
        .group:hover .stroke-text-white {
           -webkit-text-stroke: 0px;
           color: white;
        }
        @media (max-width: 768px) {
           .stroke-text-white {
             -webkit-text-stroke: 0px;
             color: white;
           }
        }
      `}</style>
    </section>
  );
};