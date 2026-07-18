import { useState } from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, Disc } from 'lucide-react';
import { BRANDS, TYRE_BRANDS } from '../data';
import { TranslationSet } from '../translations';

interface BrandsProps {
  t: TranslationSet;
}

export default function Brands({ t }: BrandsProps) {
  const [filter, setFilter] = useState<'all' | 'premium' | 'mainstream'>('all');

  const filteredBrands = BRANDS.filter(brand => {
    if (filter === 'premium') return brand.isPremium;
    if (filter === 'mainstream') return !brand.isPremium;
    return true;
  });

  // Dynamic Tyre Logo Renderer (Beautiful, high contrast responsive SVG vectors)
  const renderTyreLogo = (name: string) => {
    const formattedName = name.toLowerCase();
    switch (formattedName) {
      case 'continental':
        return (
          <svg viewBox="0 0 200 50" className="w-full h-11" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="50" fill="#111111" rx="4" stroke="#FF9000" strokeWidth="1" />
            <circle cx="28" cy="25" r="12" fill="none" stroke="#FF9000" strokeWidth="2" />
            {/* Minimal running horse path */}
            <path d="M22,27 C23,26 25,21 31,23 C30,21 33,18 33,16 C31,18 29,19 27,19 C25,19 23,22 22,27 Z" fill="#FF9000" />
            <text x="48" y="32" fill="#FF9000" fontFamily="sans-serif" fontWeight="900" fontSize="16" fontStyle="italic" letterSpacing="0.5">Continental</text>
          </svg>
        );
      case 'yokohama':
        return (
          <svg viewBox="0 0 200 50" className="w-full h-11" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="50" fill="#111111" rx="4" stroke="#E31E24" strokeWidth="1" />
            <path d="M15,14 L24,25 L24,36 L30,36 L30,25 L39,14 L32,14 L27,21 L22,14 Z" fill="#E31E24" />
            <path d="M41,14 L41,36" stroke="#E31E24" strokeWidth="2" strokeDasharray="2,2" />
            <text x="48" y="31" fill="white" fontFamily="sans-serif" fontWeight="900" fontSize="16" fontStyle="italic" letterSpacing="0.5">YOKOHAMA</text>
          </svg>
        );
      case 'mrf':
        return (
          <svg viewBox="0 0 200 50" className="w-full h-11" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="50" fill="#111111" rx="4" stroke="#E31E24" strokeWidth="1" />
            <text x="15" y="35" fill="#E31E24" fontFamily="sans-serif" fontWeight="950" fontSize="30" fontStyle="italic" letterSpacing="-1">MRF</text>
            <rect x="110" y="24" width="75" height="3" fill="#FFD700" />
            <text x="110" y="19" fill="#FFD700" fontFamily="sans-serif" fontWeight="bold" fontSize="8" letterSpacing="1">TYRES</text>
          </svg>
        );
      case 'jk tyre':
      case 'jk':
        return (
          <svg viewBox="0 0 200 50" className="w-full h-11" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="50" fill="#111111" rx="4" stroke="#FFD700" strokeWidth="1" />
            <path d="M15,14 L15,36 L21,36 L21,27 L27,36 L34,36 L27,24 L33,14 L26,14 L21,22 L21,14 Z" fill="#FFD700" />
            <path d="M37,14 L37,36 L43,36 L43,27 L49,36 L56,36 L49,24 L55,14 L48,14 L43,22 L43,14 Z" fill="#005CA9" />
            <text x="62" y="32" fill="white" fontFamily="sans-serif" fontWeight="900" fontSize="18" fontStyle="italic" letterSpacing="0.5">JK TYRE</text>
          </svg>
        );
      case 'ceat':
        return (
          <svg viewBox="0 0 200 50" className="w-full h-11" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="50" fill="#111111" rx="4" stroke="#005CA9" strokeWidth="1" />
            <text x="20" y="34" fill="#005CA9" fontFamily="sans-serif" fontWeight="900" fontSize="26" letterSpacing="2">CEAT</text>
            <text x="110" y="30" fill="white" fontFamily="sans-serif" fontWeight="bold" fontSize="9" letterSpacing="0.5">BORN TOUGH</text>
          </svg>
        );
      case 'apollo':
        return (
          <svg viewBox="0 0 200 50" className="w-full h-11" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="50" fill="#111111" rx="4" stroke="#9E1B80" strokeWidth="1" />
            <circle cx="28" cy="25" r="10" fill="none" stroke="#9E1B80" strokeWidth="3" />
            <circle cx="36" cy="25" r="5" fill="#9E1B80" />
            <text x="54" y="32" fill="white" fontFamily="sans-serif" fontWeight="900" fontSize="18" letterSpacing="1">apollo</text>
          </svg>
        );
      case 'bridgestone':
        return (
          <svg viewBox="0 0 200 50" className="w-full h-11" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="50" fill="#111111" rx="4" stroke="#E31E24" strokeWidth="1" />
            <path d="M15,15 L28,15 C31,15 33,16 33,19 C33,21 31,22.5 29,23 C31.5,23.5 34,25 34,28.5 C34,31.5 31,33 28,33 L15,33 Z" fill="#E31E24" />
            <circle cx="21" cy="19" r="2.5" fill="black" />
            <circle cx="21" cy="28" r="2.5" fill="black" />
            <text x="40" y="31" fill="white" fontFamily="sans-serif" fontWeight="900" fontSize="13" letterSpacing="0.5">BRIDGESTONE</text>
          </svg>
        );
      case 'goodyear':
        return (
          <svg viewBox="0 0 200 50" className="w-full h-11" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="50" fill="#111111" rx="4" stroke="#FFD700" strokeWidth="1" />
            <path d="M92,14 C92,14 87,19 90,25 C93,30 98,27 98,27" stroke="#FFD700" strokeWidth="2" fill="none" />
            <text x="12" y="31" fill="#005CA9" fontFamily="sans-serif" fontWeight="900" fontSize="14" fontStyle="italic">GOOD</text>
            <text x="105" y="31" fill="#005CA9" fontFamily="sans-serif" fontWeight="900" fontSize="14" fontStyle="italic">YEAR</text>
          </svg>
        );
      case 'michelin':
        return (
          <svg viewBox="0 0 200 50" className="w-full h-11" xmlns="http://www.w3.org/2000/svg">
            <rect width="200" height="50" fill="#111111" rx="4" stroke="#005CA9" strokeWidth="1" />
            <rect x="15" y="16" width="22" height="18" fill="#005CA9" rx="1" />
            <rect x="18" y="19" width="16" height="12" fill="#FFD700" rx="1" />
            <text x="48" y="32" fill="#005CA9" fontFamily="sans-serif" fontWeight="900" fontSize="16" fontStyle="italic" letterSpacing="1">MICHELIN</text>
          </svg>
        );
      default:
        return (
          <div className="bg-zinc-950 text-zinc-300 rounded-sm font-black italic tracking-widest text-xs py-3.5 border border-zinc-800 text-center uppercase">
            {name}
          </div>
        );
    }
  };

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <section id="brands" className="py-20 sm:py-28 bg-transparent border-t border-b border-zinc-200/80 text-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* CAR BRANDS HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center space-x-1.5 bg-red-600/10 border border-zinc-200 px-4 py-1.5 rounded-sm text-red-600 font-mono text-[10px] font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>OEM / OES Specifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 uppercase italic font-display">
            {t.brandsTitle}
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            {t.brandsSubtitle}
          </p>

          {/* Quick Filter Controls */}
          <div className="flex items-center justify-center space-x-3 pt-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-sm text-xs font-black uppercase tracking-wider border transition-all duration-150 cursor-pointer ${
                filter === 'all'
                  ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/10'
                  : 'bg-white/80 border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              {t.allBrands}
            </button>
            <button
              onClick={() => setFilter('premium')}
              className={`px-4 py-2 rounded-sm text-xs font-black uppercase tracking-wider border transition-all duration-150 cursor-pointer ${
                filter === 'premium'
                  ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/10'
                  : 'bg-white/80 border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              {t.luxuryOnly}
            </button>
            <button
              onClick={() => setFilter('mainstream')}
              className={`px-4 py-2 rounded-sm text-xs font-black uppercase tracking-wider border transition-all duration-150 cursor-pointer ${
                filter === 'mainstream'
                  ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/10'
                  : 'bg-white/80 border-zinc-200 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
              }`}
            >
              {t.mainstream}
            </button>
          </div>
        </div>

        {/* Brands Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-24"
        >
          {filteredBrands.map((brand) => (
            <motion.div
              key={brand.name}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.1 } }}
              className={`relative bg-white/80 backdrop-blur-md border p-5 rounded-sm flex flex-col items-center justify-center h-28 text-center transition-all group overflow-hidden ${
                brand.isPremium
                  ? 'border-red-650/30 hover:border-red-600/65 shadow-md hover:shadow-lg'
                  : 'border-zinc-200/85 hover:border-zinc-300 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Corner accent line */}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-200 scale-x-0 group-hover:scale-x-100 ${
                  brand.isPremium ? 'bg-red-600' : 'bg-amber-500'
                }`}
              />

              <span className="font-sans font-black text-zinc-800 text-sm tracking-tight sm:text-base select-none group-hover:text-red-600 transition-colors uppercase italic">
                {brand.name}
              </span>

              {brand.isPremium && (
                <div className="absolute bottom-2.5 right-2.5 bg-red-600/10 border border-red-500/30 rounded-sm px-1.5 py-0.5 flex items-center gap-0.5 text-[8px] text-red-600 uppercase tracking-widest font-bold">
                  <Sparkles className="w-2.5 h-2.5 text-amber-500 fill-amber-500 shrink-0" />
                  Luxury
                </div>
              )}
            </motion.div>
          ))}

          {/* Plus card */}
          <div className="bg-zinc-100/50 border border-dashed border-zinc-300 p-5 rounded-sm flex flex-col items-center justify-center h-28 text-center">
            <span className="text-red-600 font-mono text-xs font-bold uppercase tracking-widest">
              & Many More
            </span>
            <span className="text-zinc-600 text-[10px] mt-1 font-medium leading-normal uppercase">
              Any Make or Model Served
            </span>
          </div>
        </motion.div>

        {/* ==================== TYRES DISPLAY HUB ==================== */}
        <div className="border-t border-zinc-200/80 pt-16 mt-12">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
            <div className="inline-flex items-center space-x-1.5 bg-red-650/10 border border-zinc-200 px-4 py-1.5 rounded-sm text-red-600 font-mono text-[10px] font-bold uppercase tracking-wider">
              <Disc className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Full Tyre & Wheel Care Portal</span>
            </div>
            <h2 id="tyre-brands-title" className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 uppercase italic font-display">
              {t.tyresTitle}
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              {t.tyresSubtitle}
            </p>
          </div>

          {/* Tyre Brands Grid with High Quality SVG Logos */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {TYRE_BRANDS.map((tyre) => (
              <motion.div
                key={tyre.name}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.1 } }}
                className="bg-white/80 backdrop-blur-md border border-zinc-200/80 hover:border-zinc-300 hover:shadow-md p-6 rounded-sm flex flex-col justify-between h-36 transition-all group relative overflow-hidden"
              >
                {/* Visual branding container */}
                <div className="flex-1 flex items-center justify-center">
                  {renderTyreLogo(tyre.name)}
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-zinc-100">
                  <span className="text-xs font-mono font-bold tracking-widest text-zinc-500 uppercase">
                    {tyre.name} Radial
                  </span>
                  <span className="text-[9px] text-[#E31E24] bg-red-600/10 border border-red-600/20 px-1.5 py-0.5 rounded-sm uppercase tracking-widest font-bold">
                    Official Dealer
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
