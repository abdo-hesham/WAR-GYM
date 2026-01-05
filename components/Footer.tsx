import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Facebook, Youtube, MessageCircle, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Custom TikTok Icon (Simple path approximation for consistent stroke style)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: TikTokIcon, href: '#', label: 'TikTok' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Twitter, href: '#', label: 'X (Twitter)' },
  { icon: MessageCircle, href: 'https://wa.me/?text=Hello', label: 'WhatsApp', isSpecial: true },
];

export const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 90%", // Start animation just before full view
                toggleActions: "play none none reverse"
            }
        });

        // 1. Cinematic Line Draw
        tl.fromTo(lineRef.current, 
            { scaleX: 0 }, 
            { scaleX: 1, duration: 1.5, ease: "expo.out" }
        );

        // 2. Content Fade Up
        tl.fromTo(contentRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
            "-=1.2"
        );
        
        // 3. Stagger Icons
        tl.from(".social-icon-item", {
            y: 20,
            opacity: 0,
            scale: 0.8,
            stagger: 0.05,
            duration: 0.6,
            ease: "back.out(1.7)"
        }, "-=0.8");

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-black text-white relative pt-24 pb-12 overflow-hidden z-20">
        {/* Cinematic Top Line */}
        <div ref={lineRef} className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-red to-transparent opacity-60 origin-center"></div>

        {/* Background Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-50 pointer-events-none"></div>

        <div ref={contentRef} className="container mx-auto px-4 flex flex-col items-center relative z-10">
            
            {/* Brand Identity */}
            <div className="mb-16 text-center">
                <h2 className="font-display text-5xl md:text-8xl font-bold uppercase tracking-tighter mb-4 text-white drop-shadow-2xl">
                    WAR <span className="text-brand-red">GYM</span>
                </h2>
                <div className="flex items-center justify-center gap-4 opacity-60">
                    <div className="h-[1px] w-8 bg-brand-red"></div>
                    <p className="font-mono text-xs md:text-sm text-gray-400 uppercase tracking-[0.4em]">
                        Forging Elite Fitness
                    </p>
                    <div className="h-[1px] w-8 bg-brand-red"></div>
                </div>
            </div>

            {/* Social Icons Grid */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-20 max-w-3xl">
                {socialLinks.map((link, i) => (
                    <a 
                        key={i} 
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon-item group relative flex items-center justify-center p-2"
                        aria-label={link.label}
                    >
                        {/* Glow Effect on Hover */}
                        <div className="absolute inset-0 bg-brand-red blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full scale-150 pointer-events-none"></div>
                        
                        {/* Icon Container */}
                        <div className={`
                            relative z-10 w-12 h-12 md:w-14 md:h-14 
                            flex items-center justify-center rounded-full 
                            border border-white/10 bg-zinc-900/80 backdrop-blur-md 
                            transition-all duration-300 
                            group-hover:border-brand-red group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-[0_0_20px_rgba(255,31,31,0.2)]
                            ${link.isSpecial ? 'border-brand-red/30' : ''}
                        `}>
                            <link.icon 
                                className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 ${link.isSpecial ? 'text-brand-red' : 'text-gray-400 group-hover:text-white'}`} 
                                strokeWidth={1.5}
                            />
                        </div>
                        
                        {/* Tooltip (Simple) */}
                        <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] font-mono uppercase tracking-widest text-gray-500 pointer-events-none">
                            {link.label}
                        </span>
                    </a>
                ))}
            </div>

            {/* Bottom Meta & Links */}
            <div className="flex flex-col md:flex-row items-center justify-between w-full border-t border-white/5 pt-8 text-[10px] md:text-xs font-mono text-gray-600 uppercase tracking-widest">
                <p className="mb-4 md:mb-0">© {new Date().getFullYear()} WAR GYM Operations. All Rights Reserved.</p>
                <div className="flex flex-wrap justify-center gap-8">
                    <a href="#" className="hover:text-brand-red transition-colors">Privacy Protocol</a>
                    <a href="#" className="hover:text-brand-red transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-brand-red transition-colors">Contact Command</a>
                </div>
            </div>
        </div>
    </footer>
  );
};