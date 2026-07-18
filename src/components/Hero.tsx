import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Phone, MessageSquare, Calendar, ShieldCheck, Star, Users, 
  ChevronLeft, ChevronRight 
} from 'lucide-react';
import { BUSINESS_INFO } from '../data';
import { TranslationSet } from '../translations';

interface HeroProps {
  onBookClick: () => void;
  t: TranslationSet;
}

const SLIDER_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=1600",
    alt: "Professional Car Servicing"
  },
  {
    url: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=1600",
    alt: "Expert Engine Repair"
  },
  {
    url: "https://images.unsplash.com/photo-1625047509168-a402d1f44c02?auto=format&fit=crop&q=80&w=1600",
    alt: "Computerized 3D Wheel Alignment"
  },
  {
    url: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&q=80&w=1600",
    alt: "High-Pressure Car Washing & Detailing"
  },
  {
    url: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&q=80&w=1600",
    alt: "Automated Car Diagnostics"
  },
  {
    url: "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=1600",
    alt: "Professional Mechanics Working"
  },
  {
    url: "https://images.unsplash.com/photo-1617886322168-72b886573c3c?auto=format&fit=crop&q=80&w=1600",
    alt: "Modern Automotive Workshop Interior"
  },
  {
    url: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&q=80&w=1600",
    alt: "Delighted Customer Receiving Serviced Car"
  }
];

export default function Hero({ onBookClick, t }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Swipe gesture tracking
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const formatPhoneNumberForCall = (num: string) => `tel:${num}`;
  const formatWhatsAppLink = (num: string) =>
    `https://wa.me/${num}?text=Hi%20Venu,%20I'm%20looking%20to%20book%20a%20service%20for%20my%20car%20at%20Neelkanth%20Motors.`;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDER_IMAGES.length) % SLIDER_IMAGES.length);
  }, []);

  // Slide timer effect
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 4500); // Auto-slide every 4.5 seconds
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, handleNext]);

  // Touch handlers for swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image Slider with Cross-Fade */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {SLIDER_IMAGES.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover object-center transform transition-transform duration-[4500ms] ease-out brightness-[0.45] contrast-[1.05]"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}

        {/* Dynamic Dark Gradient Overlays for High Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/30 md:from-black/90 md:via-black/75 md:to-black/45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(227,30,36,0.12)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-15 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />
      </div>

      {/* Slider Left/Right Arrows (Visible on Hover and Mobile Tap) */}
      <div className="absolute inset-y-0 left-4 z-20 flex items-center">
        <button
          onClick={handlePrev}
          className="p-2 sm:p-3 rounded-full bg-black/40 hover:bg-red-600/90 text-white hover:text-white border border-white/10 hover:border-red-600/30 transition-all cursor-pointer backdrop-blur-sm group shadow-lg"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      <div className="absolute inset-y-0 right-4 z-20 flex items-center">
        <button
          onClick={handleNext}
          className="p-2 sm:p-3 rounded-full bg-black/40 hover:bg-red-600/90 text-white hover:text-white border border-white/10 hover:border-red-600/30 transition-all cursor-pointer backdrop-blur-sm group shadow-lg"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Navigation Indicators / Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-25 flex items-center gap-2 sm:gap-2.5">
        {SLIDER_IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 h-1.5 sm:h-2 rounded-full cursor-pointer ${
              index === currentIndex 
                ? 'w-6 sm:w-8 bg-[#FFD700]' 
                : 'w-1.5 sm:w-2 bg-white/45 hover:bg-white/85'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-8 space-y-8 text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center space-x-3 bg-red-600/10 border border-white/10 px-4 py-2 rounded-sm">
              <span className="w-12 h-[2px] bg-[#FFD700]"></span>
              <span className="text-[#FFD700] text-xs font-bold tracking-widest uppercase font-display">
                {t.heroExperience}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase italic tracking-tighter leading-[0.95] text-white font-display">
              {t.heroTitle}
            </h1>

            {/* Sub-heading */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl font-medium leading-relaxed font-sans">
              {t.heroSubtitle}
            </p>

            {/* Highlighted Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg pt-2">
              <div className="flex items-center space-x-3 text-zinc-300">
                <div className="bg-zinc-900 border border-white/10 p-2 rounded-sm text-[#FFD700]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-200">100% Genuine Spare Parts</span>
              </div>
              <div className="flex items-center space-x-3 text-zinc-300">
                <div className="bg-zinc-900 border border-white/10 p-2 rounded-sm text-[#E31E24]">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-200 font-sans">Same-Day Periodic Service</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 max-w-md sm:max-w-xl">
              <button
                onClick={onBookClick}
                className="flex-1 bg-[#E31E24] hover:bg-red-700 active:bg-red-800 text-white font-black uppercase rounded-sm py-4 text-xs tracking-wider transition-all duration-155 flex items-center justify-center space-x-2 shadow-xl shadow-red-600/20 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#FFD700]" />
                <span>{t.heroCTA}</span>
              </button>

              <a
                href={formatPhoneNumberForCall(BUSINESS_INFO.contacts[0].number)}
                className="flex-1 bg-white text-black hover:bg-zinc-200 active:bg-zinc-300 font-black uppercase rounded-sm py-4 text-xs tracking-wider transition-all duration-155 flex items-center justify-center space-x-2 text-center"
              >
                <Phone className="w-4 h-4 text-[#E31E24]" />
                <span className="font-mono">Call {BUSINESS_INFO.contacts[0].number}</span>
              </a>

              <a
                href={formatWhatsAppLink(BUSINESS_INFO.whatsappNumber)}
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] hover:opacity-90 active:opacity-100 text-white font-black uppercase rounded-sm py-4 px-6 text-xs tracking-wider transition-all duration-155 flex items-center justify-center space-x-2 text-center"
              >
                <MessageSquare className="w-4 h-4 fill-white text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Side Glassmorphism Cards Container (Quick Stats Overview) */}
          <div className="lg:col-span-4 lg:pl-4">
            <div className="bg-zinc-950/90 border border-white/15 rounded-sm p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              {/* Corner decorative light */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-red-600/20 blur-2xl rounded-full" />
              <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-yellow-400/10 blur-2xl rounded-full" />

              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 border-b border-white/10 pb-3 font-mono">
                Workshop Highlights
              </h3>

              <div className="space-y-5 text-left">
                {/* Stat 1 */}
                <div className="flex items-start space-x-4">
                  <div className="bg-red-600/10 p-2.5 rounded-sm border border-red-600/20 text-red-500">
                    <Star className="w-5 h-5 fill-red-500" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white font-mono uppercase italic">15+ Years</div>
                    <div className="text-xs text-zinc-400 font-medium">Experienced Automobile Servicing</div>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-400/10 p-2.5 rounded-sm border border-yellow-400/20 text-yellow-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white font-mono uppercase italic">10,000+</div>
                    <div className="text-xs text-zinc-400 font-medium font-sans">Happy Car Owners Served</div>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="flex items-start space-x-4">
                  <div className="bg-zinc-900 p-2.5 rounded-sm border border-white/5 text-green-400">
                    <span className="font-bold text-lg font-mono">4.9★</span>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white font-mono uppercase italic">Top Rated</div>
                    <div className="text-xs text-zinc-400 font-medium font-sans">Denting, Painting & Brakes Specialist</div>
                  </div>
                </div>
              </div>

              {/* Live Info bar */}
              <div className="bg-zinc-900/60 rounded-sm p-3.5 border border-white/5 flex items-center justify-between text-xs font-semibold font-mono text-zinc-400">
                <span>📍 HYDERABAD</span>
                <span className="text-green-400 flex items-center gap-1.5 uppercase">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                  Open Now
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
