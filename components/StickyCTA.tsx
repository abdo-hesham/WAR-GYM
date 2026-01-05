import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';

export const StickyCTA: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (600px)
      if (window.scrollY > 600) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 p-4 md:hidden animate-slide-up">
      <button 
        onClick={() => window.open('https://wa.me/?text=Tell%20me%20more%20about%20WAR%20GYM', '_blank')}
        className="w-full bg-[#25D366] text-white font-bold py-4 rounded-full shadow-2xl flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-colors"
      >
        <MessageCircle size={24} />
        Chat on WhatsApp
      </button>
    </div>
  );
};