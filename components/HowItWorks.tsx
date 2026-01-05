import React from 'react';

const steps = [
  {
    num: "01",
    title: "Claim Offer",
    text: "Click the button to secure your 7-Day pass via WhatsApp. Our team will book your slot instantly."
  },
  {
    num: "02",
    title: "The Assessment",
    text: "Meet with a lead coach. We analyze your body composition and define your 90-day goals."
  },
  {
    num: "03",
    title: "Execute",
    text: "Start training with a structured plan. No guessing. Just showing up and doing the work."
  }
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-brand-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-brand-red font-bold uppercase tracking-widest mb-2">The Process</p>
          <h2 className="font-display text-4xl font-bold uppercase text-white">Simple Path to Power</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-zinc-800 -z-0"></div>

          {steps.map((step, i) => (
            <div key={i} className="relative z-10 bg-brand-dark md:bg-transparent pt-4 md:pt-0">
              <div className="w-24 h-24 bg-brand-dark border-2 border-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="font-display text-4xl font-bold text-brand-red">{step.num}</span>
              </div>
              <div className="text-center px-4">
                <h3 className="font-display text-2xl font-bold uppercase mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};