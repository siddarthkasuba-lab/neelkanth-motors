import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQS } from '../data';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-transparent text-zinc-800 relative">
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-red-650/5 blur-3xl rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <span className="text-red-600 font-black font-mono tracking-widest text-[10px] uppercase block">
            QUESTIONS & ANSWERS
          </span>
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight uppercase italic font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-650 text-sm leading-relaxed">
            Have questions about repair timelines, tow trucks, or OES specifications? Check our clear explanations below.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4 text-left">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white/80 backdrop-blur-md border border-zinc-200/80 hover:border-red-600/30 rounded-sm overflow-hidden transition-all duration-200 shadow-sm"
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center space-x-3.5">
                    <HelpCircle className={`w-5 h-5 shrink-0 transition-colors ${isOpen ? 'text-red-600' : 'text-zinc-500'}`} />
                    <span className="text-sm sm:text-base font-bold text-zinc-900 tracking-tight text-left">
                      {faq.question}
                    </span>
                  </div>
                  <div>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-red-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-zinc-500 shrink-0" />
                    )}
                  </div>
                </button>

                {/* Content Drawer */}
                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 text-zinc-600 text-xs sm:text-sm leading-relaxed border-t border-zinc-100 pt-4 font-normal animate-slideDown">
                    <p>{faq.answer}</p>
                    <div className="text-[10px] text-zinc-500 font-mono mt-3 uppercase tracking-wider font-bold">
                      Category: {faq.category}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
