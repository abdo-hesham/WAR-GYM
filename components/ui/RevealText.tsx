import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
  threshold?: number;
  type?: 'chars' | 'words' | 'lines';
}

export const RevealText: React.FC<RevealTextProps> = ({ 
  children, 
  className = "", 
  delay = 0,
  threshold = 0.5,
  type = 'words'
}) => {
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!elRef.current) return;

    const words = elRef.current.querySelectorAll('.reveal-word');
    
    gsap.fromTo(words, 
      { 
        y: 200, 
        scale: 6, // Massive initial scale for "in your face" effect
        opacity: 0,
        rotateX: -80, // Heavy perspective tilt
        rotate: -25, // Angled entry
        transformOrigin: "50% 50% -100px", // 3D origin adjustment
        filter: 'blur(25px)'
      },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        rotateX: 0,
        rotate: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        stagger: 0.15, // Slower stagger for weight
        delay: delay,
        ease: "power4.out", // Heavy impact landing
        scrollTrigger: {
          trigger: elRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [delay]);

  const words = children.split(' ');

  return (
    <span ref={elRef} className={`inline-block perspective-text ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden py-6 px-2 -mx-2 align-bottom perspective-[1000px]">
          <span className="reveal-word inline-block transform-gpu will-change-transform">
            {word}&nbsp;
          </span>
        </span>
      ))}
    </span>
  );
};