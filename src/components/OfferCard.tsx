import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Tag, Copy, Check, MapPin, Calendar, ClipboardCheck } from 'lucide-react';
import { Offer } from '../services/offerService';

interface OfferCardProps {
  offer: Offer;
  onBookClick?: () => void;
  isAdminView?: boolean;
  onDeleteClick?: () => void;
}

export default function OfferCard({ offer, onBookClick, isAdminView = false, onDeleteClick }: OfferCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    const promoCode = offer.id.slice(0, 8); // fallback or promo code
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const today = new Date().toISOString().split('T')[0];
  const isExpired = offer.endDate && offer.endDate < today;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`bg-white border rounded-sm overflow-hidden flex flex-col justify-between text-left relative h-full group shadow-xs ${
        offer.isBumper
          ? 'border-red-600/40 hover:border-red-650/80 shadow-md shadow-red-500/5'
          : 'border-zinc-200/80 hover:border-red-600/30'
      }`}
    >
      {/* Top visual / badge */}
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className={`px-2 py-0.5 rounded-sm text-[8px] font-mono font-black uppercase tracking-wider border ${
            offer.isBumper
              ? 'bg-red-50 border-red-200 text-red-650'
              : 'bg-zinc-100 border-zinc-200 text-zinc-700'
          }`}>
            {offer.isBumper ? '★ BUMPER OFFER' : 'WORKSHOP DEAL'}
          </span>

          <div className="flex items-center gap-1">
            {offer.enabled ? (
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="Active" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-zinc-400" title="Disabled" />
            )}
            <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase tracking-widest">
              {offer.enabled ? 'Live' : 'Off'}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h4 className="text-sm sm:text-base font-black text-zinc-900 uppercase italic tracking-tight font-display leading-snug group-hover:text-red-650 transition-colors">
            {offer.title}
          </h4>
          <p className="text-[11px] text-zinc-500 font-mono font-bold uppercase tracking-widest flex items-center gap-1">
            <Tag className="w-3 h-3 text-red-600" />
            <span className="text-zinc-600">PRICE: <strong className="text-zinc-900 font-extrabold font-mono">{offer.price}</strong></span>
          </p>
        </div>

        {/* Description */}
        <p className="text-zinc-650 text-xs font-sans leading-relaxed line-clamp-3">
          {offer.description}
        </p>
      </div>

      {/* Footer / Meta specs */}
      <div className="p-5 pt-0 bg-zinc-50/50 border-t border-zinc-150 space-y-4">
        {/* Date block */}
        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 pt-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
            <span>Ends: {offer.endDate || 'No limit'}</span>
          </div>
          {isExpired && (
            <span className="text-red-600 font-black uppercase tracking-widest">Expired</span>
          )}
        </div>

        {/* Action button triggers */}
        {!isAdminView && (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleCopyCode}
              className={`py-2 px-3 rounded-sm text-[10px] font-mono uppercase font-black tracking-wider border flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                copied
                  ? 'bg-green-600 border-green-500 text-white'
                  : 'bg-zinc-100 border-zinc-200 text-zinc-650 hover:text-zinc-900 hover:bg-zinc-200 hover:border-zinc-300'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
              <span>{copied ? 'Copied' : 'Get Code'}</span>
            </button>

            {onBookClick ? (
              <button
                onClick={onBookClick}
                className="bg-[#E31E24] hover:bg-red-700 text-white font-mono text-[10px] font-black uppercase tracking-widest py-2 px-3 rounded-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <ClipboardCheck className="w-3.5 h-3.5" />
                <span>Book Slot</span>
              </button>
            ) : offer.mapsLink ? (
              <a
                href={offer.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-900 hover:bg-black text-white font-mono text-[10px] font-black uppercase tracking-widest py-2 px-3 rounded-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs text-center"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Locate NM</span>
              </a>
            ) : null}
          </div>
        )}

        {isAdminView && onDeleteClick && (
          <button
            onClick={onDeleteClick}
            className="w-full bg-red-50 hover:bg-red-100 border border-red-200 text-red-650 font-mono text-[10px] font-bold uppercase tracking-wider py-2 rounded-sm transition-all cursor-pointer"
          >
            Delete Offer Record
          </button>
        )}
      </div>
    </motion.div>
  );
}
