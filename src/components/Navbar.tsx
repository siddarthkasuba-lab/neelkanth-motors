import React, { useState } from 'react';
import { Menu, X, Phone, MessageSquare, Settings, Award, Globe, ClipboardList, LogOut } from 'lucide-react';
import { BUSINESS_INFO } from '../data';
import { Language, TranslationSet } from '../translations';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onBookClick: () => void;
  activePage: 'home' | 'user-portal' | 'admin-portal' | 'offers';
  onPageChange: (page: 'home' | 'user-portal' | 'admin-portal' | 'offers') => void;
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  t: TranslationSet;
}

export default function Navbar({
  onBookClick,
  activePage,
  onPageChange,
  currentLanguage,
  onLanguageChange,
  t,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin, isUser, logout } = useAuth();

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (activePage !== 'home') {
      e.preventDefault();
      onPageChange('home');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleMobileNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setIsOpen(false);
    if (activePage !== 'home') {
      e.preventDefault();
      onPageChange('home');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const formatPhoneNumberForCall = (num: string) => `tel:${num}`;
  const formatWhatsAppLink = (num: string) =>
    `https://wa.me/${num}?text=Hi%20Neelakanta%20Motors,%20I%20want%20to%20inquire%20about%20car%20servicing.`;

  return (
    <nav className="sticky top-0 z-50 bg-white/85 border-b border-zinc-200/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-10 h-10 bg-[#E31E24] rounded-sm flex items-center justify-center font-black text-white italic text-xl shadow-lg shadow-red-650/10">
              NM
            </div>
            <div>
              <div className="text-zinc-900 font-black tracking-tighter text-lg sm:text-xl font-sans uppercase italic flex items-center gap-1.5">
                NEELAKANTA <span className="text-[#E31E24]">MOTORS</span>
                <Award className="w-4 h-4 text-amber-500 animate-pulse" />
              </div>
              <div className="text-zinc-400 font-mono text-[9px] tracking-widest uppercase font-bold leading-none">
                {BUSINESS_INFO.tagline}
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <a 
              href="#about" 
              onClick={(e) => handleNavLinkClick(e, 'about')}
              className="text-zinc-600 hover:text-red-600 font-semibold text-xs uppercase tracking-widest transition-colors duration-150"
            >
              {t.about}
            </a>
            <a 
              href="#brands" 
              onClick={(e) => handleNavLinkClick(e, 'brands')}
              className="text-zinc-600 hover:text-red-600 font-semibold text-xs uppercase tracking-widest transition-colors duration-150"
            >
              {t.brands}
            </a>
            <a 
              href="#services" 
              onClick={(e) => handleNavLinkClick(e, 'services')}
              className="text-zinc-600 hover:text-red-600 font-semibold text-xs uppercase tracking-widest transition-colors duration-150"
            >
              {t.services}
            </a>
            <a 
              href="#why-choose-us" 
              onClick={(e) => handleNavLinkClick(e, 'why-choose-us')}
              className="text-zinc-600 hover:text-red-600 font-semibold text-xs uppercase tracking-widest transition-colors duration-150"
            >
              {t.whyUs}
            </a>
            <a 
              href="#gallery" 
              onClick={(e) => handleNavLinkClick(e, 'gallery')}
              className="text-zinc-600 hover:text-red-600 font-semibold text-xs uppercase tracking-widest transition-colors duration-150"
            >
              {t.gallery}
            </a>
            <a 
              href="#reviews" 
              onClick={(e) => handleNavLinkClick(e, 'reviews')}
              className="text-zinc-600 hover:text-red-600 font-semibold text-xs uppercase tracking-widest transition-colors duration-150"
            >
              {t.reviews}
            </a>
            <a 
              href="#faq" 
              onClick={(e) => handleNavLinkClick(e, 'faq')}
              className="text-zinc-600 hover:text-red-600 font-semibold text-xs uppercase tracking-widest transition-colors duration-150"
            >
              {t.faq}
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleNavLinkClick(e, 'contact')}
              className="text-zinc-600 hover:text-red-600 font-semibold text-xs uppercase tracking-widest transition-colors duration-150"
            >
              {t.contact}
            </a>
            <button 
              onClick={() => onPageChange('offers')}
              className={`font-black text-xs uppercase tracking-widest transition-all duration-150 cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-sm border ${
                activePage === 'offers' 
                  ? 'bg-[#E31E24] border-[#E31E24] text-white shadow-md font-black' 
                  : 'bg-red-500/10 border-red-500/30 text-red-600 hover:bg-red-600 hover:text-white shadow-[0_0_12px_rgba(227,30,36,0.1)] font-bold'
              }`}
            >
              <span>🎉 Offers</span>
              <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded-sm font-bold tracking-widest ${
                activePage === 'offers' ? 'bg-black text-[#FFD700]' : 'bg-red-600 text-white'
              }`}>50% OFF</span>
            </button>
          </div>

          {/* Desktop Controls & CTA */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            
            {/* Elegant Language Option Segment Controls beside settings button */}
            <div className="flex items-center space-x-1 bg-zinc-100 border border-zinc-200 rounded-sm p-0.5">
              <div className="p-1 text-zinc-400 hover:text-zinc-600" title="Select Language / भाषा चुनें / భాషను ఎంచుకోండి">
                <Globe className="w-3.5 h-3.5 text-zinc-400" />
              </div>
              <button
                onClick={() => onLanguageChange('english')}
                className={`px-2 py-1 text-[10px] font-black uppercase rounded-sm transition-all ${
                  currentLanguage === 'english'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                onClick={() => onLanguageChange('hindi')}
                className={`px-2 py-1 text-[10px] font-black uppercase rounded-sm transition-all ${
                  currentLanguage === 'hindi'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200'
                }`}
                title="हिंदी"
              >
                हिंदी
              </button>
              <button
                onClick={() => onLanguageChange('telugu')}
                className={`px-2 py-1 text-[10px] font-black uppercase rounded-sm transition-all ${
                  currentLanguage === 'telugu'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200'
                }`}
                title="తెలుగు"
              >
                తెలుగు
              </button>
            </div>

            {/* Logout button beside language selector */}
            {(isAdmin || isUser) && (
              <button
                onClick={async () => {
                  await logout();
                  onPageChange('home');
                }}
                className="px-3 py-1.5 rounded-sm bg-red-600 hover:bg-red-700 border border-red-500 text-white font-black text-[10px] uppercase font-mono tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                title="Logout / लॉगआउट / లాగ్ అవుట్"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>LOGOUT</span>
              </button>
            )}

            {/* Track Booking Button (User Page) */}
            <button
              onClick={() => onPageChange('user-portal')}
              className={`p-2.5 rounded-sm border text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                activePage === 'user-portal'
                  ? 'bg-red-600/10 border-red-600/50 text-red-500'
                  : 'bg-zinc-100 border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300'
              }`}
              title="Track Your Car Booking & Live Status"
            >
              <ClipboardList className="w-3.5 h-3.5 text-red-500" />
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest">
                {currentLanguage === 'hindi' ? 'बुकिंग ट्रैक' : currentLanguage === 'telugu' ? 'బుకింగ్ ట్రాక్' : 'Track Booking'}
              </span>
            </button>

            {/* Venu CRM Button (Admin Page) */}
            <button
              onClick={() => onPageChange('admin-portal')}
              className={`p-2.5 rounded-sm border text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                activePage === 'admin-portal'
                  ? 'bg-[#E31E24]/20 border-[#E31E24]/50 text-[#E31E24]'
                  : 'bg-zinc-100 border-zinc-200 text-[#E31E24]/95 hover:text-[#E31E24] hover:border-[#E31E24]/40'
              }`}
              title="Access Owner CRM Workflows"
            >
              <Settings className="w-3.5 h-3.5 text-[#E31E24]" />
              <span className="font-mono text-[10px] uppercase font-bold tracking-widest">
                {currentLanguage === 'hindi' ? 'मालिक लॉगिन' : currentLanguage === 'telugu' ? 'ఓనర్ లాగిన్' : 'Owner CRM'}
              </span>
            </button>

            {/* Quick dial */}
            <a
              href={formatPhoneNumberForCall(BUSINESS_INFO.contacts[0].number)}
              className="text-zinc-800 hover:text-red-500 flex items-center space-x-1 text-sm font-semibold transition-colors font-mono"
            >
              <Phone className="w-4 h-4 text-[#E31E24]" />
              <span className="text-xs">{BUSINESS_INFO.contacts[0].number}</span>
            </a>

            <button
              onClick={onBookClick}
              className="bg-[#E31E24] hover:bg-red-700 active:bg-red-800 text-white px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-red-600/25 shrink-0"
            >
              {t.bookService}
            </button>
          </div>

          {/* Mobile Menu Button & Toggles */}
          <div className="flex items-center space-x-2 lg:hidden">
            
            {/* Quick Language Cycle button on Mobile */}
            <button
              onClick={() => {
                const nextLangMap: Record<Language, Language> = {
                  english: 'hindi',
                  hindi: 'telugu',
                  telugu: 'english'
                };
                onLanguageChange(nextLangMap[currentLanguage]);
              }}
              className="p-2 rounded-sm bg-zinc-100 border border-zinc-200 text-red-600 font-mono text-[10px] font-bold flex items-center gap-1"
              title="Cycle Language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>
                {currentLanguage === 'english' ? 'EN' : currentLanguage === 'hindi' ? 'हिं' : 'తె'}
              </span>
            </button>

            {/* Mobile quick logout */}
            {(isAdmin || isUser) && (
              <button
                onClick={async () => {
                  await logout();
                  onPageChange('home');
                }}
                className="px-2 py-1 rounded-sm bg-red-600 border border-red-500 text-white font-black text-[9px] uppercase font-mono tracking-wider transition-all flex items-center gap-1 shrink-0 animate-pulse"
                title="Logout"
              >
                <LogOut className="w-3 h-3" />
                <span>LOGOUT</span>
              </button>
            )}

            <button
              onClick={() => onPageChange(activePage === 'user-portal' ? 'home' : 'user-portal')}
              className={`p-2 rounded-sm border text-xs flex items-center gap-1 transition-all ${
                activePage === 'user-portal'
                  ? 'bg-[#E31E24]/20 border-[#E31E24] text-[#E31E24]'
                  : 'bg-zinc-100 border-zinc-200 text-zinc-600'
              }`}
              title="Track Booking"
            >
              <ClipboardList className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-sm bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-zinc-900 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 border-b border-zinc-200 py-4 px-4 space-y-4 shadow-2xl animate-fadeIn backdrop-blur-md">
          
          {/* Mobile Language Picker Selector Segment */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-sm p-2">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 font-mono flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>Select Language / भाषा / భాష</span>
              </p>
              {(isAdmin || isUser) && (
                <button
                  onClick={async () => {
                    await logout();
                    setIsOpen(false);
                    onPageChange('home');
                  }}
                  className="flex items-center gap-1 px-1.5 py-0.5 rounded-sm bg-red-600/20 border border-red-500/30 text-red-500 text-[9px] font-black uppercase font-mono tracking-wider transition-all"
                  title="Logout"
                >
                  <LogOut className="w-2.5 h-2.5" />
                  <span>LOGOUT</span>
                </button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => {
                  onLanguageChange('english');
                  setIsOpen(false);
                }}
                className={`py-2 text-xs font-black uppercase rounded-sm transition-all text-center ${
                  currentLanguage === 'english'
                    ? 'bg-red-600 text-white'
                    : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200'
                }`}
              >
                English
              </button>
              <button
                onClick={() => {
                  onLanguageChange('hindi');
                  setIsOpen(false);
                }}
                className={`py-2 text-xs font-black uppercase rounded-sm transition-all text-center ${
                  currentLanguage === 'hindi'
                    ? 'bg-red-600 text-white'
                    : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => {
                  onLanguageChange('telugu');
                  setIsOpen(false);
                }}
                className={`py-2 text-xs font-black uppercase rounded-sm transition-all text-center ${
                  currentLanguage === 'telugu'
                    ? 'bg-red-600 text-white'
                    : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200'
                }`}
              >
                తెలుగు
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            <a
              href="#about"
              onClick={(e) => handleMobileNavLinkClick(e, 'about')}
              className="px-3 py-2 rounded-md text-zinc-600 hover:text-red-600 hover:bg-zinc-50 text-sm font-medium transition-colors"
            >
              {t.about}
            </a>
            <a
              href="#brands"
              onClick={(e) => handleMobileNavLinkClick(e, 'brands')}
              className="px-3 py-2 rounded-md text-zinc-600 hover:text-red-600 hover:bg-zinc-50 text-sm font-medium transition-colors"
            >
              {t.brands}
            </a>
            <a
              href="#services"
              onClick={(e) => handleMobileNavLinkClick(e, 'services')}
              className="px-3 py-2 rounded-md text-zinc-600 hover:text-red-600 hover:bg-zinc-50 text-sm font-medium transition-colors"
            >
              {t.services}
            </a>
            <a
              href="#why-choose-us"
              onClick={(e) => handleMobileNavLinkClick(e, 'why-choose-us')}
              className="px-3 py-2 rounded-md text-zinc-600 hover:text-red-600 hover:bg-zinc-50 text-sm font-medium transition-colors"
            >
              {t.whyUs}
            </a>
            <a
              href="#gallery"
              onClick={(e) => handleMobileNavLinkClick(e, 'gallery')}
              className="px-3 py-2 rounded-md text-zinc-600 hover:text-red-600 hover:bg-zinc-50 text-sm font-medium transition-colors"
            >
              {t.gallery}
            </a>
            <a
              href="#reviews"
              onClick={(e) => handleMobileNavLinkClick(e, 'reviews')}
              className="px-3 py-2 rounded-md text-zinc-600 hover:text-red-600 hover:bg-zinc-50 text-sm font-medium transition-colors"
            >
              {t.reviews}
            </a>
            <a
              href="#faq"
              onClick={(e) => handleMobileNavLinkClick(e, 'faq')}
              className="px-3 py-2 rounded-md text-zinc-600 hover:text-red-600 hover:bg-zinc-50 text-sm font-medium transition-colors"
            >
              {t.faq}
            </a>
            <a
              href="#contact"
              onClick={(e) => handleMobileNavLinkClick(e, 'contact')}
              className="px-3 py-2 rounded-md text-zinc-600 hover:text-red-600 hover:bg-zinc-50 text-sm font-medium transition-colors"
            >
              {t.contact}
            </a>
            <button
              onClick={() => {
                setIsOpen(false);
                onPageChange('offers');
              }}
              className={`px-4 py-2.5 rounded-sm text-sm font-bold transition-all text-left flex items-center justify-between cursor-pointer border ${
                activePage === 'offers' 
                  ? 'bg-red-600 border-red-600 text-white font-black' 
                  : 'bg-red-500/10 border-red-500/30 text-red-650 hover:bg-red-50'
              }`}
            >
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-xs font-mono">🎉 Special Offers & Referrals</span>
              <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                activePage === 'offers' ? 'bg-[#FFD700] text-black font-black' : 'bg-red-600 text-white'
              }`}>50% OFF</span>
            </button>
          </div>

          <div className="pt-4 border-t border-zinc-200 flex flex-col space-y-3">
            {/* Direct Page Links on Mobile */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onPageChange('user-portal');
                }}
                className={`border rounded-lg py-2.5 px-3 flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                  activePage === 'user-portal'
                    ? 'bg-red-600 border-red-500 text-white'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-700 hover:text-zinc-900'
                }`}
              >
                <ClipboardList className="w-4 h-4 text-red-500 animate-pulse" />
                <span>Track Booking</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  onPageChange('admin-portal');
                }}
                className={`border rounded-lg py-2.5 px-3 flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                  activePage === 'admin-portal'
                    ? 'bg-red-600 border-red-600 text-white font-black'
                    : 'bg-zinc-50 border-zinc-200 text-[#E31E24] hover:bg-zinc-100'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Owner CRM</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={formatPhoneNumberForCall(BUSINESS_INFO.contacts[0].number)}
                className="bg-zinc-50 border border-zinc-200 text-zinc-800 rounded-lg py-2.5 px-3 flex items-center justify-center gap-1.5 text-sm font-semibold font-mono"
              >
                <Phone className="w-4 h-4 text-red-500" />
                <span>Call</span>
              </a>
              <a
                href={formatWhatsAppLink(BUSINESS_INFO.whatsappNumber)}
                target="_blank"
                rel="noreferrer"
                className="bg-green-600/10 border border-green-500/30 text-green-650 rounded-lg py-2.5 px-3 flex items-center justify-center gap-1.5 text-sm font-semibold"
              >
                <MessageSquare className="w-4 h-4 text-green-650" />
                <span>WhatsApp</span>
              </a>
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                onBookClick();
              }}
              className="w-full bg-[#E31E24] hover:bg-red-700 text-white py-3 rounded-lg text-base font-bold tracking-wide transition-colors shadow-lg shadow-red-600/20"
            >
              {t.bookService}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
