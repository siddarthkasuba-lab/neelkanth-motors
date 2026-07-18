import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, ShieldAlert, Compass, Flame, Brush, Disc3, 
  Zap, Truck, MapPin, CircleAlert, Eye, Armchair, Grid, 
  Search, Check, ArrowRight, Star
} from 'lucide-react';
import { SERVICES } from '../data';
import { Service } from '../types';

// Map string representation to icon components
const IconMap: Record<string, React.ComponentType<any>> = {
  Wrench,
  ShieldAlert,
  Compass,
  Flame,
  Brush,
  Disc3,
  Zap,
  Truck,
  MapPin,
  CircleAlert,
  Eye,
  Armchair,
  Grid
};

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
}

export default function Services({ onSelectService }: ServicesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedService, setExpandedService] = useState<string | null>(null);

  // Filter categories
  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'mechanical', label: 'Mechanical' },
    { id: 'wheel', label: 'Wheel & Tyres' },
    { id: 'body', label: 'Denting & Painting' },
    { id: 'electrical', label: 'Electrical' },
    { id: 'interior', label: 'Interior Works' },
    { id: 'convenience', label: 'Convenience' }
  ];

  const filteredServices = SERVICES.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          service.includes.some(item => item.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="services" className="py-20 sm:py-28 bg-transparent text-zinc-800 relative">
      {/* Visual background accents */}
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-red-650/5 blur-3xl rounded-full" />
      <div className="absolute bottom-1/3 right-0 w-72 h-72 bg-amber-500/5 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-red-600 font-black font-mono tracking-widest text-[10px] uppercase block">
            OUR CAR SERVICES
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight uppercase italic font-display">
            Comprehensive Workshop Services
          </h2>
          <p className="text-zinc-650 text-sm leading-relaxed">
            From basic oil changes to computerized wheel alignments, alloy straightening, and factory dent-paint finishes, we maintain professional standards with high-grade spare parts.
          </p>
        </div>

        {/* Filters and Search Bar Container */}
        <div className="bg-white/80 backdrop-blur-md border border-zinc-200/80 p-4 sm:p-6 rounded-sm mb-12 shadow-md space-y-5">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search services (e.g. brakes, oil, painting)..."
                className="w-full bg-zinc-50 border border-zinc-200 text-zinc-800 rounded-sm py-3 pl-11 pr-4 text-xs font-mono focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder:text-zinc-400"
              />
            </div>

            {/* Total count badge */}
            <div className="text-xs font-mono font-bold text-zinc-500">
              Showing <span className="text-red-600 font-black">{filteredServices.length}</span> of {SERVICES.length} Services
            </div>
          </div>

          {/* Categories Horizontal Scroll */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none border-t border-zinc-100 pt-4 scroll-smooth">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-150 border cursor-pointer ${
                  activeCategory === category.id
                    ? 'bg-red-600 border-red-600 text-white shadow-lg shadow-red-600/10'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid with Animations */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => {
              const IconComp = IconMap[service.icon] || Wrench;
              const isExpanded = expandedService === service.id;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  key={service.id}
                  className="bg-white/80 backdrop-blur-md border border-zinc-200/80 hover:border-red-600/30 rounded-sm overflow-hidden shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-350 group flex flex-col justify-between"
                >
                  <div className="p-6 space-y-4">
                    {/* Icon & Category Indicator */}
                    <div className="flex items-center justify-between">
                      <div className="bg-red-600/10 p-3 rounded-sm border border-red-600/20 text-red-600 group-hover:scale-110 transition-transform duration-200">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-500 bg-zinc-100 border border-zinc-200/50 px-2.5 py-1 rounded-sm">
                        {service.category}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-lg font-bold text-zinc-900 tracking-tight uppercase italic font-display group-hover:text-red-600 transition-colors">
                        {service.title}
                      </h3>
                      {service.description && (
                        <p className="text-sm text-zinc-600 mt-2 line-clamp-2 leading-relaxed">
                          {service.description}
                        </p>
                      )}
                    </div>

                    {/* Pricing Block */}
                    <div className="bg-zinc-50 rounded-sm p-3 border border-zinc-100 flex items-center justify-between">
                      <span className="text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-wider">Estimated Price:</span>
                      <span className="text-xs font-black text-red-600 font-mono bg-red-600/10 border border-red-600/20 px-2.5 py-1 rounded-sm">
                        {service.price}
                      </span>
                    </div>

                    {/* Service Inclusions (Expandable/Visible) */}
                    <div className="space-y-2 pt-2 border-t border-zinc-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-800 font-mono uppercase tracking-wider">Service Includes:</span>
                        <button
                          onClick={() => setExpandedService(isExpanded ? null : service.id)}
                          className="text-[10px] uppercase font-bold text-zinc-500 hover:text-red-600 transition-colors"
                        >
                          {isExpanded ? 'Hide Details' : 'Show All'}
                        </button>
                      </div>

                      {/* Display first 3 inclusions always, and expand the rest */}
                      <ul className="space-y-1.5 pt-1">
                        {service.includes.slice(0, isExpanded ? undefined : 3).map((item, index) => (
                          <li key={index} className="flex items-start space-x-2 text-xs text-zinc-600">
                            <Check className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{item}</span>
                          </li>
                        ))}
                        {!isExpanded && service.includes.length > 3 && (
                          <li className="text-[10px] text-zinc-500 font-mono pl-5 italic">
                            + {service.includes.length - 3} more items included.
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="p-6 bg-zinc-50/50 border-t border-zinc-150 flex items-center justify-between">
                    <button
                      onClick={() => onSelectService(service.id)}
                      className="w-full bg-zinc-100 hover:bg-red-600 hover:text-white border border-zinc-200 hover:border-red-600 text-zinc-700 rounded-sm py-3 px-4 font-black uppercase text-xs tracking-widest transition-all duration-150 flex items-center justify-center gap-2 group/btn"
                    >
                      <span>Book Service</span>
                      <ArrowRight className="w-4 h-4 text-zinc-500 group-hover/btn:translate-x-1 group-hover/btn:text-white transition-all" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-white/80 border border-zinc-200 rounded-sm max-w-lg mx-auto">
            <p className="text-zinc-500 text-sm mb-4">No services match your active filters or query.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
              className="text-red-600 font-mono text-xs font-bold uppercase tracking-wider underline hover:text-red-800"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
