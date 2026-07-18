import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, X, ZoomIn, Info, ShieldCheck } from 'lucide-react';

import heroImg from '../assets/images/neelkanth_hero_1783763725601.jpg';
import diagImg from '../assets/images/neelkanth_diag_1783763740753.jpg';
import alignImg from '../assets/images/neelkanth_align_1783763756556.jpg';
import detailImg from '../assets/images/neelkanth_booth_1783763769705.jpg';

const IMAGES = [
  {
    id: "g1",
    url: heroImg,
    title: "Multi Brand Workshop",
    description: "Our state-of-the-art multi-brand workshop with modern heavy-duty lifts, pneumatic tools, and professional service layout in Hyderabad."
  },
  {
    id: "g2",
    url: diagImg,
    title: "Advanced Engine Diagnostics",
    description: "Expert computer-assisted system scanning and electronic engine diagnostics to resolve complex electrical bugs quickly."
  },
  {
    id: "g3",
    url: alignImg,
    title: "Precise 3D Wheel Alignment",
    description: "Computerized wheel balancing and 3D laser-guided alignment ensuring smooth driving, long tread wear, and better mileage."
  },
  {
    id: "g4",
    url: detailImg,
    title: "Factory Paint Finish Booth",
    description: "Dust-free climate-controlled paint booth providing spotless panel repairs and complete vehicle painting with digital color match."
  }
];

export default function Gallery() {
  const [activeImgIdx, setActiveImgIdx] = useState<number | null>(null);

  const handlePrev = () => {
    if (activeImgIdx === null) return;
    setActiveImgIdx((activeImgIdx - 1 + IMAGES.length) % IMAGES.length);
  };

  const handleNext = () => {
    if (activeImgIdx === null) return;
    setActiveImgIdx((activeImgIdx + 1) % IMAGES.length);
  };

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-transparent text-zinc-800 relative">
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-red-650/5 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-red-600 font-black font-mono tracking-widest text-[10px] uppercase block">
            VISIT OUR WORKSHOP
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight uppercase italic font-display">
            Our Premium Facilities
          </h2>
          <p className="text-zinc-650 text-sm leading-relaxed">
            Take a virtual tour of Neelkanth Motors. We take immense pride in maintaining a clean, professional, and state-of-the-art repair environment.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {IMAGES.map((img, idx) => (
            <div
              key={img.id}
              onClick={() => setActiveImgIdx(idx)}
              className="group relative bg-white border border-zinc-200/80 rounded-sm overflow-hidden shadow-sm hover:shadow-md cursor-pointer h-72 sm:h-80 md:h-96"
            >
              {/* Image */}
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* High-quality, realistic, authorized plaque of NEELKANTH MOTORS mounted on the back-wall of the photo */}
              <div className="absolute top-[18%] left-1/2 -translate-x-1/2 pointer-events-none select-none z-10 w-[75%] max-w-[280px] flex flex-col items-center">
                <div className="relative w-full bg-zinc-950/90 border border-zinc-700/80 px-4 py-3 rounded-sm shadow-[0_12px_32px_rgba(0,0,0,0.9)] flex flex-col items-center justify-center text-center">
                  {/* Metal corner rivets */}
                  <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-zinc-600 shadow-inner" />
                  <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-zinc-600 shadow-inner" />
                  <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-zinc-600 shadow-inner" />
                  <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-zinc-600 shadow-inner" />
                  
                  <span className="text-[7px] font-extrabold tracking-[0.35em] text-zinc-500 font-mono mb-1 uppercase block">
                    FACILITY AUTHORIZED
                  </span>
                  <span 
                    className="text-[11px] sm:text-xs font-black font-sans text-white uppercase tracking-[0.2em] block"
                    style={{ textShadow: '0 0 10px rgba(239,68,68,0.95), 0 0 20px rgba(239,68,68,0.4)' }}
                  >
                    NEELKANTH MOTORS
                  </span>
                  <span className="text-[7px] font-extrabold tracking-[0.15em] text-red-500 font-mono mt-1 uppercase block">
                    HYDERABAD
                  </span>
                </div>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* View Overlay Button */}
              <div className="absolute top-4 right-4 bg-black/75 border border-white/10 p-2.5 rounded-sm text-yellow-400 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 flex items-center justify-center">
                <ZoomIn className="w-5 h-5" />
              </div>

              {/* Floating Caption text */}
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2 text-left">
                <div className="flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping" />
                  <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight uppercase italic font-display group-hover:text-yellow-400 transition-colors">
                    {img.title}
                  </h3>
                </div>
                <p className="text-xs text-zinc-300 font-medium leading-relaxed line-clamp-2">
                  {img.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal with AnimatePresence */}
      <AnimatePresence>
        {activeImgIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveImgIdx(null)}
              className="absolute top-6 right-6 p-2 rounded-sm bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:bg-red-600 cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Main content container */}
            <div className="max-w-5xl w-full flex flex-col items-center space-y-4">
              {/* Active Image Frame */}
              <div className="relative w-full aspect-video rounded-sm overflow-hidden border border-white/10 shadow-2xl bg-black">
                <img
                  src={IMAGES[activeImgIdx].url}
                  alt={IMAGES[activeImgIdx].title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />

                {/* High-quality, realistic, authorized plaque of NEELKANTH MOTORS mounted on the back-wall of the photo inside lightbox */}
                <div className="absolute top-[15%] left-1/2 -translate-x-1/2 pointer-events-none select-none z-10 w-[60%] max-w-[340px] flex flex-col items-center">
                  <div className="relative w-full bg-zinc-950/95 border border-zinc-600/80 px-6 py-4 rounded-sm shadow-[0_16px_40px_rgba(0,0,0,0.95)] flex flex-col items-center justify-center text-center">
                    {/* Metal corner rivets */}
                    <div className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-zinc-600 shadow-inner" />
                    <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-zinc-600 shadow-inner" />
                    <div className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-zinc-600 shadow-inner" />
                    <div className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-zinc-600 shadow-inner" />
                    
                    <span className="text-[8px] font-extrabold tracking-[0.4em] text-zinc-500 font-mono mb-1.5 uppercase block">
                      FACILITY AUTHORIZED
                    </span>
                    <span 
                      className="text-xs sm:text-sm md:text-base font-black font-sans text-white uppercase tracking-[0.25em] block"
                      style={{ textShadow: '0 0 12px rgba(239,68,68,0.95), 0 0 24px rgba(239,68,68,0.5)' }}
                    >
                      NEELKANTH MOTORS
                    </span>
                    <span className="text-[8px] font-extrabold tracking-[0.2em] text-red-500 font-mono mt-1.5 uppercase block">
                      HYDERABAD
                    </span>
                  </div>
                </div>

                {/* Left Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-950/80 border border-white/10 text-white hover:bg-zinc-900 transition-colors cursor-pointer text-lg font-bold"
                >
                  &larr;
                </button>

                {/* Right Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-950/80 border border-white/10 text-white hover:bg-zinc-900 transition-colors cursor-pointer text-lg font-bold"
                >
                  &rarr;
                </button>
              </div>

              {/* Captions Detail Panel */}
              <div className="w-full bg-zinc-900 border border-white/10 p-6 rounded-sm text-left space-y-2">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-yellow-400" />
                  <h4 className="text-xl font-black text-white uppercase italic font-display">{IMAGES[activeImgIdx].title}</h4>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                  {IMAGES[activeImgIdx].description}
                </p>
                <div className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-wider pt-2 border-t border-white/5">
                  Neelkanth Motors Hyderabad &bull; Official Facility View
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
