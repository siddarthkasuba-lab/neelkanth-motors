import { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Brands from './components/Brands';
import Services from './components/Services';
import BookingForm from './components/BookingForm';
import Gallery from './components/Gallery';
import WhyChooseUs from './components/WhyChooseUs';
import Reviews from './components/Reviews';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import FloatingCTAs from './components/FloatingCTAs';
import OwnerDashboard from './components/OwnerDashboard';
import OffersPage from './components/OffersPage';
import FloatingLocationButton from './components/FloatingLocationButton';
import OfferPopup from './components/OfferPopup';
import { BUSINESS_INFO } from './data';
import { Language, TRANSLATIONS } from './translations';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [activePage, setActivePage] = useState<'home' | 'user-portal' | 'admin-portal' | 'offers'>('home');
  const [language, setLanguage] = useState<Language>('english');
  const [showPromoBanner, setShowPromoBanner] = useState(true);

  // Grab active translation dictionary
  const t = TRANSLATIONS[language];

  // Hook to handle prefilling a service from any CTA click on the page
  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    // Smooth scroll to booking container
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Trigger booking scroll without a specific service id prefilled
  const handleBookClick = () => {
    setActivePage('home');
    setSelectedServiceId(null);
    setTimeout(() => {
      const el = document.getElementById('booking');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#f8fafc] text-zinc-800 font-sans selection:bg-red-600 selection:text-white overflow-x-hidden antialiased scroll-smooth relative">
      
      {/* Hyper-Realistic Studio Ambient Backdrop */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Realistic Workshop Detailing & Service Bays Photographic Layer */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.04]"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1617886322168-72b886573c3c?auto=format&fit=crop&q=80&w=1920')",
            filter: "brightness(0.95) contrast(1) grayscale(1) blur(1px)" 
          }} 
        />

        {/* High-Performance Industrial Detailing Grid & Metal Mesh */}
        <div className="absolute inset-0 bg-metal-mesh opacity-[0.35]" />
        
        {/* Subtle performance carbon-fiber mesh mix-blend overlay */}
        <div className="absolute inset-0 bg-carbon-fiber opacity-[0.05] mix-blend-overlay" />
        
        {/* Volumetric alignment laser lines and engineering grid */}
        <div className="absolute inset-0 perspective-grid opacity-[0.1]" />
        
        {/* Red & Gold High-End Showroom Spotlights & Light Cones */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] neon-glow-red rounded-full transform -translate-x-1/2 -translate-y-1/3" />
        <div className="absolute top-1/4 right-1/4 w-[800px] h-[800px] neon-glow-gold rounded-full transform translate-x-1/3 -translate-y-1/4" />
        <div className="absolute top-2/3 left-1/4 w-[700px] h-[700px] neon-glow-blue rounded-full transform -translate-x-1/4" />
        <div className="absolute bottom-20 right-1/4 w-[800px] h-[800px] neon-glow-red rounded-full transform translate-x-1/4" />
      </div>
      {/* Sticky top-level header containing both Promo Banner and Navbar */}
      <div className="sticky top-0 z-50 w-full flex flex-col">
        {showPromoBanner && (
          <div className="bg-gradient-to-r from-red-700 via-amber-600 to-yellow-500 text-black py-2.5 px-4 relative z-[60] flex items-center justify-between shadow-md border-b border-yellow-400/20 w-full">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-2 md:gap-6 text-center text-xs md:text-sm font-bold w-full justify-center">
              <span className="flex items-center gap-1.5 bg-black text-yellow-400 text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 rounded-sm shadow-sm animate-pulse">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                HOT DEAL
              </span>
              <p className="text-black font-black uppercase tracking-tight text-center">
                🎉 <span className="bg-black/10 px-1 py-0.5 rounded text-red-950 font-black">5% CASH BONUS</span> FOR REFERRALS!
              </p>
              <button
                onClick={() => setActivePage('offers')}
                className="bg-black hover:bg-zinc-900 text-yellow-400 hover:text-white px-4 py-1.5 rounded-sm text-[11px] font-black uppercase tracking-widest transition-all duration-150 flex items-center gap-1 cursor-pointer shadow-lg active:scale-95"
              >
                <span>CLAIM NOW</span>
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              </button>
            </div>
            <button
              onClick={() => setShowPromoBanner(false)}
              className="text-black/85 hover:text-black absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-black/10 rounded-sm transition-all cursor-pointer"
              title="Dismiss Offer Banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <Navbar 
          onBookClick={handleBookClick} 
          activePage={activePage}
          onPageChange={setActivePage}
          currentLanguage={language}
          onLanguageChange={setLanguage}
          t={t}
        />
      </div>

      {/* Dynamic View Route */}
      {activePage === 'offers' ? (
        <OffersPage 
          onClose={() => setActivePage('home')}
          onBookClick={handleBookClick}
          currentLanguage={language}
          t={t}
        />
      ) : activePage === 'user-portal' ? (
        <OwnerDashboard 
          onClose={() => setActivePage('home')} 
          t={t} 
          currentLanguage={language} 
          initialTab="user"
        />
      ) : activePage === 'admin-portal' ? (
        <OwnerDashboard 
          onClose={() => setActivePage('home')} 
          t={t} 
          currentLanguage={language} 
          initialTab="admin"
        />
      ) : (
        /* CORE USER EXPERIENCE WEBSITE */
        <>
          {/* Hero Banner Section */}
          <Hero onBookClick={handleBookClick} t={t} />

          {/* About us Narrative */}
          <About t={t} />

          {/* Interactive Multi-Brand logos/cards */}
          <Brands t={t} />

          {/* Service Grid catalog */}
          <Services onSelectService={handleSelectService} />

          {/* Why Choose Us checklist */}
          <WhyChooseUs />

          {/* Interactive Image Gallery */}
          <Gallery />

          {/* Testimonial slider / reviews */}
          <Reviews />

          {/* Booking scheduling form */}
          <BookingForm 
            selectedServiceId={selectedServiceId} 
            resetSelectedService={() => setSelectedServiceId(null)}
            t={t}
          />

          {/* Frequently Asked Questions */}
          <FAQ />

          {/* Contact Details & map coordinates */}
          <Contact onBookClick={handleBookClick} />
        </>
      )}

      {/* Footer block */}
      <footer className="bg-zinc-950 text-zinc-400 py-12 px-4 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          {/* Branding column */}
          <div>
            <div className="text-white font-black tracking-tight text-xl font-mono flex items-center justify-center md:justify-start gap-2 uppercase italic font-display">
              <span className="bg-red-600 text-yellow-400 px-2 py-1 rounded-sm font-black text-xs">NM</span>
              {BUSINESS_INFO.name}
            </div>
            <p className="text-zinc-500 text-[10px] mt-2 uppercase tracking-widest font-mono font-bold">
              {BUSINESS_INFO.tagline}
            </p>
            <p className="text-zinc-600 text-xs mt-1 leading-relaxed max-w-sm font-sans">
              Professional mechanical, denting, painting, tire alignment and electrical services with 15+ years of trusted experience in Hyderabad.
            </p>
          </div>

          {/* Owner and contact quick lines */}
          <div className="text-center text-zinc-400">
            <span className="text-zinc-500 text-[10px] uppercase font-mono tracking-wider font-bold block mb-1">Workshop Manager</span>
            <span className="text-white font-black text-sm block uppercase italic font-display">{BUSINESS_INFO.owner} (Venu)</span>
            <span className="text-zinc-500 text-xs font-mono block mt-2">📞 +91 {BUSINESS_INFO.contacts[0].number}</span>
            <span className="text-zinc-500 text-xs font-mono block">📞 +91 {BUSINESS_INFO.contacts[1].number}</span>
          </div>

          {/* Legal copyrights */}
          <div className="text-center md:text-right font-sans text-xs text-zinc-600 space-y-1">
            <span className="block text-zinc-500 font-bold uppercase tracking-widest text-[10px] font-mono">NEELAKANTA MOTORS HYDERABAD</span>
            <span className="block text-zinc-500 text-xs">Professional Automobile Workshop</span>
            <span className="block mt-4 text-[10px] font-mono">© 2026 All Rights Reserved &bull; Hyderabad, India</span>
          </div>
        </div>
      </footer>

      {/* Touch-safe sticky Floating quick action button docks */}
      <FloatingCTAs onBookClick={handleBookClick} />

      {/* NEW BUMPER POPUPS & FLOATING BUTTONS */}
      <FloatingLocationButton />
      <OfferPopup />
    </div>
  );
}
