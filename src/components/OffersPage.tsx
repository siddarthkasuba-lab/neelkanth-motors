import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gift, Tag, Copy, Check, Share2, Sparkles, AlertTriangle, 
  ArrowLeft, Megaphone, Percent, UserPlus, Phone, HelpCircle, 
  MessageSquare, Calendar, Award 
} from 'lucide-react';
import { Language, TranslationSet } from '../translations';
import { useOffer } from '../hooks/useOffer';

export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  code: string;
  isBumper: boolean;
  expiryDate: string;
  badge: string;
  createdAt: string;
}

interface OffersPageProps {
  onClose: () => void;
  onBookClick: () => void;
  currentLanguage: Language;
  t: TranslationSet;
}

export default function OffersPage({ onClose, onBookClick, currentLanguage, t }: OffersPageProps) {
  const { offers: dbOffers } = useOffer();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  // Referral inputs
  const [referrerName, setReferrerName] = useState('');
  const [referrerPhone, setReferrerPhone] = useState('');
  const [generatedReferral, setGeneratedReferral] = useState<string | null>(null);
  const [referralCopied, setReferralCopied] = useState(false);

  // Map dbOffers to local interface format for back-compat
  const offers: Offer[] = dbOffers.map((off) => ({
    id: off.id,
    title: off.title,
    description: off.description,
    discount: off.price,
    code: off.id.slice(0, 8).toUpperCase(),
    isBumper: off.isBumper,
    expiryDate: off.endDate || 'No Limit',
    badge: off.isBumper ? 'BUMPER SPECIAL' : 'BODY & PAINT',
    createdAt: off.createdAt
  }));

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleGenerateReferral = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = referrerPhone.replace(/\D/g, '');
    if (!referrerName.trim() || cleanPhone.length < 10) {
      alert("Please provide a valid name and 10-digit phone number.");
      return;
    }
    const shortName = referrerName.trim().toUpperCase().slice(0, 4).replace(/\s+/g, '');
    const code = `REF-${shortName}-${cleanPhone.slice(-4)}`;
    setGeneratedReferral(code);
    setReferralCopied(false);

    // Persist to neelakanta_referrals database so Admin can track & be notified
    const existingStr = localStorage.getItem('neelakanta_referrals') || localStorage.getItem('neelkanth_referrals');
    const existing = existingStr ? JSON.parse(existingStr) : [];
    
    // Check if code already exists for this number to avoid duplication
    if (!existing.some((r: any) => r.code === code)) {
      const newReferral = {
        id: `REF-${Math.floor(1000 + Math.random() * 9000)}`,
        referrerName: referrerName.trim(),
        referrerPhone: cleanPhone,
        code: code,
        createdAt: new Date().toISOString()
      };
      existing.unshift(newReferral);
      localStorage.setItem('neelakanta_referrals', JSON.stringify(existing));

      // Append to the admin notifications center
      const newAlert = {
        id: "ALT-" + Math.floor(100000 + Math.random() * 900000),
        type: 'referral',
        title: 'New Referral Registered',
        message: `Customer ${referrerName.trim()} (+91 ${cleanPhone}) generated referral code: ${code}.`,
        timestamp: new Date().toISOString(),
        isRead: false,
        metadata: {
          referrerName: referrerName.trim(),
          referrerPhone: cleanPhone,
          code: code
        }
      };
      const alertsStr = localStorage.getItem('neelakanta_notifications') || localStorage.getItem('neelkanth_notifications');
      const alertsList = alertsStr ? JSON.parse(alertsStr) : [];
      alertsList.unshift(newAlert);
      localStorage.setItem('neelakanta_notifications', JSON.stringify(alertsList));
    }
  };

  const handleCopyReferral = () => {
    if (!generatedReferral) return;
    const shareText = `Hey! I recommend Neelakanta Motors Hyderabad (Venu's multi-brand car workshop) for all car mechanical repairs, denting, and painting. Use my referral code: *${generatedReferral}* to get a FLAT 5% Discount on your first service invoice! Book online here: ${window.location.origin}`;
    navigator.clipboard.writeText(shareText);
    setReferralCopied(true);
    setTimeout(() => setReferralCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    if (!generatedReferral) return;
    const shareText = `Hey! I recommend Neelakanta Motors Hyderabad (Venu's multi-brand car workshop) for all car mechanical repairs, denting, and painting. Use my referral code: *${generatedReferral}* to get a FLAT 5% Discount on your first service invoice! Book online here: ${window.location.origin}`;
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };

  const bumperOffer = offers.find(o => o.isBumper);
  const regularOffers = offers.filter(o => !o.isBumper);

  // Localization
  const localizedTexts = {
    english: {
      title: "Exclusive Workshop Offers",
      subtitle: "Neelakanta Deals & Venu's Mega Promotions",
      back: "Back to website",
      bumperTitle: "🔥 SPECIAL BUMPER DISCOUNTS",
      regularTitle: "⚡ LIVE WORKSHOP PROMOTIONS",
      referTitle: "👥 SHARE & EARN: 5% REFERRAL PROGRAM",
      referDesc: "Refer your friends to Neelakanta Motors. When they complete their first servicing, they get an immediate flat 5% off, and you earn 5% cashback or credit on your next billing!",
      copy: "Copy Code",
      copied: "Copied!",
      expire: "Expires:",
      useCode: "USE PROMO CODE:",
      referButton: "Generate Referral Code",
      referName: "Your Full Name",
      referMobile: "Your Registered 10-Digit Mobile",
      referPlaceholder: "Siddarth Kasuba",
      referCardTitle: "Your Unique Referral Invite",
      referCardDesc: "Copy and share this invite with friends on WhatsApp or social media!",
      bookingCTA: "Apply Coupon & Book Now"
    },
    hindi: {
      title: "विशेष वर्कशॉप ऑफर्स",
      subtitle: "नीलकंठ डील्स और वेणु के मेगा प्रमोशन",
      back: "वेबसाइट पर वापस",
      bumperTitle: "🔥 विशेष बंपर डिस्काउंट",
      regularTitle: "⚡ लाइव गैरेज डील्स",
      referTitle: "👥 साझा करें और कमाएं: 5% रेफरल प्रोग्राम",
      referDesc: "अपने दोस्तों को नीलकंठ मोटर्स रेफर करें। जब वे अपनी पहली कार सर्विसिंग कराते हैं, तो उन्हें तुरंत 5% की छूट मिलेगी, और आपको अपने अगले बिल पर 5% कैशबैक या क्रेडिट मिलेगा!",
      copy: "कोड कॉपी करें",
      copied: "कॉपी हो गया!",
      expire: "समाप्ति तिथि:",
      useCode: "प्रोमो कोड उपयोग करें:",
      referButton: "रेफरल कोड बनाएं",
      referName: "आपका पूरा नाम",
      referMobile: "आपका 10-अंकीय मोबाइल नंबर",
      referPlaceholder: "सिद्धार्थ कसुबा",
      referCardTitle: "आपका विशिष्ट रेफरल आमंत्रण",
      referCardDesc: "इसे कॉपी करें और व्हाट्सएप या सोशल मीडिया पर दोस्तों के साथ साझा करें!",
      bookingCTA: "कूपन लागू करें और बुक करें"
    },
    telugu: {
      title: "ప్రత్యేక వర్క్‌షాప్ ఆఫర్లు",
      subtitle: "నీలకంఠ డీల్స్ & వేణు మాస్టర్ ప్రమోషన్స్",
      back: "వెబ్‌సైట్‌కి తిరిగి వెళ్ళు",
      bumperTitle: "🔥 స్పెషల్ బంపర్ డిస్కౌంట్లు",
      regularTitle: "⚡ లైవ్ వర్క్‌షాప్ ఆఫర్లు",
      referTitle: "👥 షేర్ & ఎర్న్: 5% రెఫరల్ ప్రోగ్రామ్",
      referDesc: "మీ స్నేహితులను నీలకంఠ మోటార్స్‌కు సూచించండి. వారు తమ మొదటి సర్వీసింగ్ పూర్తి చేసినప్పుడు, వారికి వెంటనే 5% డిస్కౌంట్ లభిస్తుంది, మరియు మీ తదుపరి బిల్‌పై మీకు 5% క్యాష్‌బ్యాక్ లేదా క్రెడిట్ లభిస్తుంది!",
      copy: "కోడ్ కాపీ చేయి",
      copied: "కాపీ చేయబడింది!",
      expire: "ముగింపు తేదీ:",
      useCode: "ప్రోమో కోడ్ ఉపయోగించండి:",
      referButton: "రెఫరల్ కోడ్ సృష్టించండి",
      referName: "మీ పూర్తి పేరు",
      referMobile: "మీ 10-అంకెల మొబైల్ నెంబర్",
      referPlaceholder: "సిద్ధార్థ్ కసుబా",
      referCardTitle: "మీ ప్రత్యేక రెఫరల్ ఆహ్వానం",
      referCardDesc: "దీన్ని కాపీ చేసి వాట్సాప్ లేదా సోషల్ మీడియాలో స్నేహితులతో పంచుకోండి!",
      bookingCTA: "కూపన్ వర్తింపజేసి ఇప్పుడే బుక్ చేయండి"
    }
  };

  const localT = localizedTexts[currentLanguage] || localizedTexts.english;

  return (
    <section className="min-h-screen py-10 px-4 md:px-8 bg-zinc-950 text-white relative z-10 font-sans max-w-7xl mx-auto animate-fadeIn text-left">
      
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-white/10 pb-6 mb-8 gap-4">
        <div>
          <button 
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors bg-zinc-900 border border-white/5 py-1.5 px-3 rounded-sm cursor-pointer mb-3 w-fit"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-red-500" />
            <span>{localT.back}</span>
          </button>
          
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase">
              ACTIVATE PREMIUM DISCOUNTS
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight italic font-display text-white mt-1">
            {localT.title}
          </h1>
          <p className="text-zinc-400 text-sm font-sans mt-1">
            {localT.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-red-600/10 border border-red-500/20 py-2 px-4 rounded-sm text-center">
            <span className="text-red-500 font-mono font-black text-sm block">5% CREDIT</span>
            <span className="text-[8px] uppercase tracking-widest text-zinc-500 font-bold block mt-0.5">Referral Bonus</span>
          </div>
          <button
            onClick={onBookClick}
            className="bg-[#E31E24] hover:bg-red-700 active:bg-red-800 text-white font-black px-5 py-3 rounded-sm text-xs uppercase tracking-widest transition-all shadow-lg shadow-red-600/25 cursor-pointer"
          >
            {t.bookService}
          </button>
        </div>
      </div>

      {/* 2. BUMPER OFFER SECTION */}
      {bumperOffer && (
        <div className="mb-10 space-y-4">
          <h2 className="text-sm font-mono font-bold tracking-widest text-yellow-400 uppercase flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-spin-slow" />
            <span>{localT.bumperTitle}</span>
          </h2>
          
          <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/20 border-2 border-yellow-500/30 rounded-lg p-6 md:p-8 relative overflow-hidden shadow-2xl">
            {/* Metallic Glow Accents */}
            <div className="absolute right-0 top-0 w-48 h-48 bg-yellow-500/5 rounded-full blur-3xl" />
            <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-red-600/5 rounded-full blur-3xl" />
            
            {/* Stamp Badge */}
            <div className="absolute top-4 right-4 bg-yellow-500 text-black font-black font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
              <Award className="w-3 h-3 text-black animate-pulse" />
              <span>{bumperOffer.badge}</span>
            </div>

            <div className="max-w-4xl space-y-4 relative z-10">
              <div className="space-y-1">
                <span className="bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 px-2.5 py-0.5 rounded-sm text-[10px] font-bold font-mono uppercase tracking-wider inline-block">
                  Limited Bumper Pack
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white uppercase italic tracking-tight font-display">
                  {bumperOffer.title}
                </h3>
              </div>

              <p className="text-zinc-300 text-xs md:text-sm leading-relaxed font-sans max-w-3xl">
                {bumperOffer.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {/* Price block */}
                <div className="bg-zinc-950 border border-white/5 p-3 rounded-sm text-left">
                  <span className="text-zinc-500 text-[9px] font-bold uppercase block tracking-wider font-mono">DISCOUNT SCHEME</span>
                  <span className="text-yellow-400 font-mono font-black text-lg block tracking-tight mt-0.5">
                    {bumperOffer.discount}
                  </span>
                </div>

                {/* Expiry block */}
                <div className="bg-zinc-950 border border-white/5 p-3 rounded-sm text-left font-mono">
                  <span className="text-zinc-500 text-[9px] font-bold uppercase block tracking-wider">EXPIRY DATE</span>
                  <span className="text-zinc-300 font-bold text-xs flex items-center gap-1.5 mt-1.5">
                    <Calendar className="w-3.5 h-3.5 text-red-500" />
                    <span>{bumperOffer.expiryDate}</span>
                  </span>
                </div>

                {/* Code Copy block */}
                <div className="bg-zinc-950 border border-white/5 p-3 rounded-sm flex items-center justify-between">
                  <div>
                    <span className="text-zinc-500 text-[9px] font-bold uppercase block tracking-wider font-mono">PROMO CODE</span>
                    <span className="text-white font-mono font-bold text-sm tracking-widest uppercase block mt-0.5">
                      {bumperOffer.code}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(bumperOffer.code)}
                    className="p-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-sm transition-all cursor-pointer flex items-center gap-1"
                    title="Copy Promo Code"
                  >
                    {copiedCode === bumperOffer.code ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black uppercase font-mono">{localT.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black uppercase font-mono">{localT.copy}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    handleCopyCode(bumperOffer.code);
                    onBookClick();
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-black px-6 py-3 rounded-sm text-xs uppercase tracking-widest transition-all shadow-md flex items-center gap-2 cursor-pointer font-mono"
                >
                  <span>{localT.bookingCTA}</span>
                  <span>➔</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. OTHER ACTIVE DEALS */}
      <div className="mb-12 space-y-4">
        <h2 className="text-sm font-mono font-bold tracking-widest text-red-500 uppercase flex items-center gap-1.5">
          <Megaphone className="w-4 h-4 text-red-500 animate-pulse" />
          <span>{localT.regularTitle}</span>
        </h2>

        {regularOffers.length === 0 ? (
          <div className="bg-zinc-900 border border-dashed border-white/5 p-6 rounded-sm text-center text-zinc-500 font-mono text-xs italic">
            No regular promotions active at the moment. Please check back later.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regularOffers.map((off) => (
              <div 
                key={off.id} 
                className="bg-zinc-900/60 border border-white/10 rounded-sm p-5 space-y-4 hover:border-white/20 transition-all shadow relative overflow-hidden"
              >
                {/* Tag banner */}
                <div className="absolute top-3 right-3 bg-red-600/10 border border-red-500/20 text-red-400 px-2 py-0.5 rounded-sm font-mono text-[9px] uppercase font-bold tracking-wider">
                  {off.badge}
                </div>

                <div className="space-y-1 text-left">
                  <h3 className="text-md font-black text-white uppercase italic font-display max-w-[80%]">
                    {off.title}
                  </h3>
                  <p className="text-zinc-400 text-xs font-sans leading-relaxed">
                    {off.description}
                  </p>
                </div>

                <div className="bg-zinc-950 border border-white/5 p-3 rounded-sm grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-zinc-500 text-[8px] uppercase tracking-wider block">BENEFIT</span>
                    <span className="text-[#FFD700] font-black text-xs block truncate">{off.discount}</span>
                  </div>
                  <div>
                    <span className="text-zinc-500 text-[8px] uppercase tracking-wider block">EXPIRY</span>
                    <span className="text-zinc-400 font-bold block text-[10px]">{off.expiryDate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1">
                    <span className="text-zinc-500 font-mono text-[9px] font-bold uppercase">{localT.useCode}</span>
                    <span className="bg-zinc-950 text-white font-mono font-bold text-xs py-1 px-2.5 rounded-sm border border-white/5">
                      {off.code}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopyCode(off.code)}
                      className="p-2 bg-zinc-950 hover:bg-zinc-900 border border-white/5 hover:border-white/10 text-zinc-300 rounded-sm transition-all cursor-pointer flex items-center gap-1 text-[10px] font-mono uppercase font-black"
                    >
                      {copiedCode === off.code ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-500" />
                          <span>{localT.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{localT.copy}</span>
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={() => {
                        handleCopyCode(off.code);
                        onBookClick();
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-3.5 py-2 rounded-sm text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. REFERRAL PROGRAM SECTION */}
      <div className="space-y-4">
        <h2 className="text-sm font-mono font-bold tracking-widest text-green-500 uppercase flex items-center gap-1.5">
          <UserPlus className="w-4 h-4 text-green-400" />
          <span>{localT.referTitle}</span>
        </h2>

        <div className="bg-zinc-900 border border-white/10 rounded-sm p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start shadow-xl text-left">
          
          {/* Referral explanation block (Left 7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="bg-green-600/10 border border-green-500/20 text-green-400 px-2.5 py-0.5 rounded-sm text-[10px] font-mono font-black uppercase tracking-wider inline-block">
                Double Benefit Scheme
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white uppercase italic tracking-tight font-display">
                YOU REFER, YOU BOTH SAVE 5%!
              </h3>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-sans">
                {localT.referDesc}
              </p>
            </div>

            {/* Step badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="bg-zinc-950 p-4 border border-white/5 rounded-sm space-y-1">
                <span className="text-red-500 font-black text-sm block">01. CREATE</span>
                <span className="text-zinc-300 text-[11px] block leading-relaxed">Enter your name & phone to generate a personalized coupon.</span>
              </div>
              <div className="bg-zinc-950 p-4 border border-white/5 rounded-sm space-y-1">
                <span className="text-yellow-400 font-black text-sm block">02. SHARE</span>
                <span className="text-zinc-300 text-[11px] block leading-relaxed">Send the generated invitation code to friends via WhatsApp.</span>
              </div>
              <div className="bg-zinc-950 p-4 border border-white/5 rounded-sm space-y-1">
                <span className="text-green-500 font-black text-sm block">03. REWARD</span>
                <span className="text-zinc-300 text-[11px] block leading-relaxed">They get 5% discount; you get 5% cashback or garage credit.</span>
              </div>
            </div>

            {/* Refer Form */}
            <form onSubmit={handleGenerateReferral} className="bg-zinc-950 border border-white/5 p-5 rounded-sm space-y-4 max-w-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase text-zinc-400 tracking-wider">
                    {localT.referName}
                  </label>
                  <input
                    type="text"
                    required
                    value={referrerName}
                    onChange={(e) => setReferrerName(e.target.value)}
                    placeholder={localT.referPlaceholder}
                    className="w-full bg-zinc-900 border border-white/10 rounded-sm py-2 px-3 text-xs focus:outline-none focus:border-green-500 transition-all text-white placeholder:text-zinc-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase text-zinc-400 tracking-wider">
                    {localT.referMobile}
                  </label>
                  <input
                    type="tel"
                    required
                    value={referrerPhone}
                    onChange={(e) => setReferrerPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="9963004478"
                    className="w-full bg-zinc-900 border border-white/10 rounded-sm py-2 px-3 text-xs font-mono focus:outline-none focus:border-green-500 transition-all text-white placeholder:text-zinc-600"
                    maxLength={10}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-2.5 rounded-sm text-xs uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center gap-1.5 font-mono shadow-md shadow-green-600/10"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{localT.referButton}</span>
              </button>
            </form>
          </div>

          {/* Dynamic Generated referral card (Right 5 Columns) */}
          <div className="lg:col-span-5 w-full">
            <AnimatePresence mode="wait">
              {generatedReferral ? (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-gradient-to-br from-zinc-950 to-zinc-900 border-2 border-green-500/30 rounded-lg p-5 space-y-5 text-left shadow-2xl relative"
                >
                  {/* Decorative badge */}
                  <div className="absolute -top-3 right-4 bg-green-500 text-black font-black font-mono text-[8px] uppercase tracking-widest px-3 py-1 rounded-sm shadow">
                    VERIFIED COUPON
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-mono font-bold text-green-400 uppercase tracking-widest">
                      {localT.referCardTitle}
                    </h4>
                    <p className="text-[10px] text-zinc-500 leading-normal">
                      {localT.referCardDesc}
                    </p>
                  </div>

                  {/* Coupon card UI mockup */}
                  <div className="bg-zinc-900 border border-dashed border-green-500/20 rounded-md p-4 space-y-4 text-center">
                    <span className="text-[9px] font-mono text-zinc-500 block uppercase font-bold tracking-widest">
                      NEELAKANTA REFERRAL DOCK
                    </span>
                    <div className="text-xl font-mono font-black text-white uppercase tracking-widest border border-white/10 bg-black/40 py-2.5 rounded-md">
                      {generatedReferral}
                    </div>
                    <span className="text-[10px] text-green-400 font-mono block font-bold uppercase tracking-wider">
                      ★ FLAT 5% FIRST INVOICE DISCOUNT ★
                    </span>
                  </div>

                  {/* Share actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleCopyReferral}
                      className="bg-zinc-900 hover:bg-zinc-850 text-zinc-200 border border-white/10 hover:border-white/20 py-2.5 rounded-sm text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {referralCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-500" />
                          <span>{localT.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Invite</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleShareWhatsApp}
                      className="bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-white" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-zinc-950 border border-dashed border-white/5 rounded-lg p-10 text-center text-zinc-600 font-mono text-xs space-y-3 h-full flex flex-col items-center justify-center min-h-[300px]">
                  <Gift className="w-10 h-10 text-zinc-800 animate-bounce" />
                  <p className="max-w-xs leading-relaxed uppercase tracking-wider text-[10px]">
                    No referral code created yet. Submit your name and phone in the form to generate your flat 5% shareable discount ticket.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

    </section>
  );
}
