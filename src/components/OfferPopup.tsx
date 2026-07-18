import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Phone, MapPin, Clock, Flame, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useOffer } from '../hooks/useOffer';
import bumperImg from '../assets/images/neelkanth_hero_1783763725601.jpg';

const PHONE_NUMBER = "+919963004478";
const MAPS_URL = "https://share.google/Eb9hZf8VUOwKefX2c";

export default function OfferPopup() {
  const { activeOffer, config, loading } = useOffer();
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // 1. Check visibility rules and localStorage based on popupBehavior config
  useEffect(() => {
    if (loading || !activeOffer) return;

    const checkPopupEligibility = () => {
      const now = Date.now();
      const lastShown = localStorage.getItem('neelakanta_bumper_popup_shown') || localStorage.getItem('neelkanth_bumper_popup_shown');
      
      if (config.popupBehavior === 'once_24h' && lastShown) {
        const timePassed = now - parseInt(lastShown, 10);
        if (timePassed < 24 * 60 * 60 * 1000) {
          // Already shown in last 24h
          setIsOpen(false);
          return;
        }
      }
      
      // If we made it here, show the popup!
      setIsOpen(true);
      localStorage.setItem('neelakanta_bumper_popup_shown', now.toString());

      // Trigger high-quality celebratory confetti bursts!
      setTimeout(() => {
        const duration = 2 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 99999 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
      }, 500);
    };

    checkPopupEligibility();
  }, [activeOffer, config, loading]);

  // 2. Real-time expiry countdown timer calculation
  useEffect(() => {
    if (!activeOffer || !activeOffer.endDate) return;

    const calculateTimeLeft = () => {
      const targetDate = new Date(`${activeOffer.endDate}T23:59:59`);
      const difference = targetDate.getTime() - Date.now();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [activeOffer]);

  if (loading || !activeOffer || !isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsOpen(false);
          }
        }}
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4 overflow-y-auto bg-black/85"
        style={{
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)'
        }}
      >
        {/* Modal content container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 25 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[400px] bg-white border border-zinc-200 rounded-sm overflow-hidden shadow-2xl z-50 font-sans my-6"
        >
          {/* Flame / Sparkle top-line accent */}
          <div className="h-1 bg-gradient-to-r from-red-600 via-yellow-400 to-red-600 w-full" />

          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 z-20 p-1.5 bg-white/90 hover:bg-red-50 text-zinc-700 hover:text-red-600 rounded-sm border border-zinc-200 transition-all cursor-pointer shadow-md"
            title="Close offer popup"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {/* Banner Image / Fallback Container */}
          <div className="relative h-36 w-full bg-zinc-50 overflow-hidden">
            {activeOffer.isBumper || activeOffer.id === "OFF-BUMP-01" ? (
              <img
                src={activeOffer.image && activeOffer.image.startsWith('data:image') ? activeOffer.image : bumperImg}
                alt={activeOffer.title}
                className="w-full h-full object-cover"
              />
            ) : activeOffer.image ? (
              <img
                src={activeOffer.image}
                alt={activeOffer.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-red-50 to-zinc-100 flex items-center justify-center">
                <Award className="w-12 h-12 text-red-600 animate-pulse" />
              </div>
            )}
            
            {/* Dark gradient overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

            {/* Float Badges */}
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
              <span className="flex items-center gap-1 bg-red-600 text-white font-black text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-sm shadow-md">
                <Flame className="w-2.5 h-2.5 text-yellow-300 animate-bounce" />
                <span>Limited Time</span>
              </span>
              <span className="bg-yellow-400 text-black font-black text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-sm shadow-md font-mono">
                BUMPER SPECIAL
              </span>
            </div>
          </div>

          {/* Offer Contents */}
          <div className="p-4 sm:p-5 space-y-4 text-left">
            
            {/* Header announcement */}
            <div className="space-y-0.5">
              <span className="text-red-600 font-mono text-[9px] font-black uppercase tracking-[0.2em] block">
                🎉 EXCLUSIVE WORKSHOP OFFER 🎉
              </span>
              <h2 className="text-lg font-black text-zinc-900 uppercase italic tracking-tight font-display leading-snug">
                {activeOffer.title}
              </h2>
            </div>

            {/* Offer price block */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-sm p-3 flex items-center justify-between gap-3">
              <div>
                <span className="text-zinc-500 font-mono text-[8px] uppercase font-bold block">SPECIAL BENEFIT PRICE</span>
                <span className="text-2xl font-black font-mono text-red-600 tracking-tighter block">{activeOffer.price}</span>
              </div>
              <div className="bg-green-50 border border-green-200 px-2 py-1 rounded-sm">
                <span className="text-green-700 font-mono text-[10px] font-black uppercase tracking-wider">SAVE MASSIVE</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-zinc-600 text-xs leading-relaxed font-sans font-medium">
              {activeOffer.description}
            </p>

            {/* Countdown Expiry Box */}
            <div className="bg-red-50/40 border border-dashed border-red-500/25 p-3 rounded-sm space-y-2">
              <div className="flex items-center gap-1.5 text-red-600 font-mono text-[9px] font-bold uppercase tracking-wider">
                <Clock className="w-3 h-3 animate-spin-slow" />
                <span>OFFER EXPIRES IN</span>
              </div>
              
              <div className="grid grid-cols-4 gap-1.5 text-center font-mono">
                <div className="bg-white p-1.5 border border-zinc-200 rounded-sm">
                  <span className="text-base font-black text-zinc-900 block">{timeLeft.days}</span>
                  <span className="text-[7px] text-zinc-500 uppercase font-bold tracking-widest block">DAYS</span>
                </div>
                <div className="bg-white p-1.5 border border-zinc-200 rounded-sm">
                  <span className="text-base font-black text-zinc-900 block">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[7px] text-zinc-500 uppercase font-bold tracking-widest block">HOURS</span>
                </div>
                <div className="bg-white p-1.5 border border-zinc-200 rounded-sm">
                  <span className="text-base font-black text-zinc-900 block">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[7px] text-zinc-500 uppercase font-bold tracking-widest block">MINS</span>
                </div>
                <div className="bg-white p-1.5 border border-zinc-200 rounded-sm text-red-600">
                  <span className="text-base font-black block animate-pulse">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[7px] text-zinc-500 uppercase font-bold tracking-widest block">SECS</span>
                </div>
              </div>
            </div>

            {/* Call to Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="bg-zinc-900 hover:bg-zinc-800 border border-transparent text-white font-mono text-[10px] font-bold uppercase tracking-wider py-2.5 px-3 rounded-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
              >
                <Phone className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                <span>Call Workshop</span>
              </a>

              <a
                href={activeOffer.mapsLink || MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E31E24] hover:bg-red-700 text-white font-mono text-[10px] font-black uppercase tracking-widest py-2.5 px-3 rounded-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-red-650/15"
              >
                <MapPin className="w-3.5 h-3.5 text-yellow-400" />
                <span>Visit Workshop</span>
              </a>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
