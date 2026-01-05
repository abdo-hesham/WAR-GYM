import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'whatsapp' | 'outline';
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-display font-bold uppercase tracking-widest transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group overflow-hidden";
  
  const variants = {
    primary: "bg-white text-black hover:bg-brand-red hover:text-white py-4 px-10 text-lg md:text-xl",
    secondary: "bg-brand-red text-white hover:bg-white hover:text-black py-4 px-10 text-lg md:text-xl",
    whatsapp: "bg-[#25D366] text-black hover:bg-white py-3 px-6 text-base font-sans rounded-full",
    outline: "bg-transparent text-white border border-white/30 hover:border-white hover:bg-white hover:text-black py-4 px-10 text-lg md:text-xl"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-3">
        {variant === 'whatsapp' && <MessageCircle size={20} />}
        {children}
        {variant !== 'whatsapp' && (
          <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform duration-300" />
        )}
      </span>
    </button>
  );
};