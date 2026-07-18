import { useState, useEffect } from 'react';
import { Phone, MessageSquare, MapPin, Calendar, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

interface FloatingCTAsProps {
  onBookClick: () => void;
}

export default function FloatingCTAs({ onBookClick }: FloatingCTAsProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatPhoneNumberForCall = (num: string) => `tel:${num}`;
  const formatWhatsAppLink = (num: string) => `https://wa.me/${num}?text=Hi%20Venu,%20I%20need%20assistance%20with%20my%20car.%20Please%20help.`;

  return (
    <>
      {/* Bottom Sticky Action Dock (Highly optimized for Mobile touch layout) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md bg-white/95 border border-zinc-200/80 backdrop-blur-md rounded-sm p-2.5 shadow-2xl flex items-center justify-between gap-1.5 animate-slideUp">
        {/* Call Now Trigger */}
        <a
          href={formatPhoneNumberForCall(BUSINESS_INFO.contacts[0].number)}
          className="flex-1 bg-[#E31E24] hover:bg-red-700 text-white rounded-sm py-3 px-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
        >
          <Phone className="w-4.5 h-4.5 text-white" />
          <span className="font-sans leading-none">Call Now</span>
        </a>

        {/* WhatsApp Inquiry */}
        <a
          href={formatWhatsAppLink(BUSINESS_INFO.whatsappNumber)}
          target="_blank"
          rel="noreferrer"
          className="flex-1 bg-[#25D366] hover:bg-green-600 text-white rounded-sm py-3 px-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
        >
          <MessageSquare className="w-4.5 h-4.5 fill-white text-[#25D366]" />
          <span className="font-sans leading-none">WhatsApp</span>
        </a>

        {/* Location Navigation */}
        <a
          href={BUSINESS_INFO.googleMapsUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-800 rounded-sm py-3 px-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
        >
          <MapPin className="w-4.5 h-4.5 text-[#E31E24]" />
          <span className="font-sans leading-none text-zinc-700">Location</span>
        </a>

        {/* Fast Booking CTA */}
        <button
          onClick={onBookClick}
          className="flex-1 bg-[#FFD700] hover:bg-[#FFC700] text-black rounded-sm py-3 px-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer"
        >
          <Calendar className="w-4.5 h-4.5 text-black" />
          <span className="font-sans leading-none">Book Slot</span>
        </button>
      </div>

      {/* Floating Back to Top button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-4 sm:right-6 z-40 bg-white/90 border border-zinc-200/80 text-zinc-600 hover:text-red-600 hover:border-red-600/30 p-3 rounded-sm shadow-xl hover:scale-110 transition-all cursor-pointer"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}
