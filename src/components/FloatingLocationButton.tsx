import React from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

const FM_MOTORS_MAPS_URL = "https://share.google/WmOfflixz5citPXAx";

export default function FloatingLocationButton() {
  return (
    <div id="floating-maps-bubble" className="fixed bottom-24 sm:bottom-28 right-4 sm:right-6 z-50 select-none">
      <motion.a
        href={FM_MOTORS_MAPS_URL}
        target="_blank"
        rel="noopener noreferrer"
        title="Visit FM Motors on Google Maps"
        // Attention-grabbing float and subtle scale animation
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 12px 30px rgba(227, 30, 36, 0.3)",
        }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-4 py-2.5 bg-zinc-950 text-white rounded-full border border-red-500/30 shadow-[0_8px_24px_rgba(227,30,36,0.25)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500/50 relative"
      >
        {/* Animated outer beacon ring */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        
        {/* Map pin icon */}
        <MapPin className="w-4 h-4 text-yellow-400 shrink-0" strokeWidth={2.5} />
        
        {/* Exact requested text with high contrast */}
        <span className="font-mono text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest leading-none">
          My Another Shop <span className="text-[#E31E24] font-black italic">FM Motors</span>
        </span>
      </motion.a>
    </div>
  );
}
