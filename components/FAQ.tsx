import React, { useState, useRef, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    id: '01',
    q: "Is this gym beginner friendly?",
    a: "We demand effort, not experience. Our community respects anyone willing to do the work. The coaches will ensure your form is perfect before you load the bar."
  },
  {
    id: '02',
    q: "Do I need to sign a contract?",
    a: "We offer flexible monthly memberships for freedom, and committed term options for value. The 7-Day War Pass carries no obligation."
  },
  {
    id: '03',
    q: "What are the operating hours?",
    a: "War never sleeps. Members have 24/7 keycard access to the facility. Staffed coaching hours are 6am - 9pm weekdays."
  },
  {
    id: '04',
    q: "Is Personal Training included?",
    a: "The 7-Day Pass includes a tactical assessment and one intro session. Dedicated 1-on-1 coaching packages are available for those who need a commander."
  }
];

interface FAQItemProps {
  item: { id: string; q: string; a: string };
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ item, isOpen, onClick, index }) => {
  const answerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      gsap.to(answerRef.current, {
        height: "auto",
        opacity: 1,
        marginBottom: 24,
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.to(containerRef.current, {
        backgroundColor: "rgba(255, 31, 31, 0.03)",
        borderColor: "#FF1F1F",
        duration: 0.3
      });
    } else {
      gsap.to(answerRef.current, {
        height: 0,
        opacity: 0,
        marginBottom: 0,
        duration: 0.3,
        ease: "power2.in"
      });
      gsap.to(containerRef.current, {
        backgroundColor: "transparent",
        borderColor: "rgba(255, 255, 255, 0.1)",
        duration: 0.3
      });
    }
  }, [isOpen]);

  return (
    <div 
      ref={containerRef}
      className="border-b border-white/10 group transition-colors duration-300"
    >
      <button 
        onClick={onClick}
        className="w-full py-8 flex items-center justify-between text-left focus:outline-none"
      >
        <div className="flex items-center gap-4 md:gap-8">
          <span className={`font-mono text-xs md:text-sm tracking-widest transition-colors duration-300 ${isOpen ? 'text-brand-red' : 'text-zinc-600'}`}>
            {item.id}
          </span>
          <h3 className={`font-display text-lg md:text-3xl font-bold uppercase tracking-wide transition-colors duration-300 ${isOpen ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
            {item.q}
          </h3>
        </div>
        
        <div className="relative pl-4">
          <div className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
             {isOpen ? <X className="text-brand-red w-6 h-6" /> : <Plus className="text-gray-500 group-hover:text-white transition-colors w-6 h-6" />}
          </div>
        </div>
      </button>

      <div 
        ref={answerRef} 
        className="h-0 opacity-0 overflow-hidden"
      >
        <div className="pl-10 md:pl-16 pr-4 max-w-3xl">
          <p className="font-sans text-gray-400 text-base md:text-xl leading-relaxed border-l-2 border-brand-red pl-6">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
};

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const titleRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        }
      });

      if (listRef.current) {
        gsap.from(listRef.current.children, {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 85%",
          }
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 bg-black relative z-10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-zinc-900 to-transparent skew-x-12 pointer-events-none opacity-50"></div>
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        
        {/* Header */}
        <div ref={titleRef} className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <div className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse"></div>
               <span className="font-mono text-xs text-brand-red uppercase tracking-widest">Intel</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-bold uppercase text-white leading-[0.9]">
              Tactical <br/><span className="text-zinc-600">Briefing</span>
            </h2>
          </div>
          <p className="font-sans text-gray-400 max-w-xs text-sm md:text-base border-l border-white/20 pl-4 hidden md:block">
            Answers to common objections. <br/>
            Read carefully. Then execute.
          </p>
        </div>

        {/* List */}
        <div ref={listRef} className="border-t border-white/10">
          {faqs.map((item, i) => (
            <FAQItem 
              key={i} 
              index={i}
              item={item} 
              isOpen={openIndex === i} 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* Mobile bottom hint */}
         <div className="mt-8 md:hidden text-center opacity-50">
           <p className="font-mono text-xs text-gray-500 uppercase">Tap questions to expand</p>
         </div>

      </div>
    </section>
  );
};