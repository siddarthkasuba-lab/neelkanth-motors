import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Tag, FileText, Image as ImageIcon, MapPin, Calendar, 
  ToggleLeft, ToggleRight, Save, Trash2, Search, Filter, 
  Sparkles, CheckCircle, AlertCircle, HelpCircle, ArrowLeft,
  Settings, Clock, Compass
} from 'lucide-react';
import { useOffer } from '../../hooks/useOffer';
import { createOrUpdateOffer, deleteOffer, Offer } from '../../services/offerService';
import OfferCard from '../../components/OfferCard';

export default function OffersAdmin() {
  const { offers, config, loading, refresh, updateConfig } = useOffer();

  // Active form states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [mapsLink, setMapsLink] = useState('https://share.google/Eb9hZf8VUOwKefX2c');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [isBumper, setIsBumper] = useState(false);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'enabled' | 'disabled'>('all');

  // UI state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  // Custom confirmation modal state
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const customConfirm = (title: string, message: string, onConfirm: () => void) => {
    setConfirmModal({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setConfirmModal(null);
      }
    });
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger Toast Notification
  const triggerToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Pre-fill form for editing
  const handleEdit = (offer: Offer) => {
    setEditingId(offer.id);
    setTitle(offer.title);
    setDescription(offer.description);
    setPrice(offer.price);
    setImage(offer.image);
    setMapsLink(offer.mapsLink);
    setStartDate(offer.startDate || '');
    setEndDate(offer.endDate || '');
    setEnabled(offer.enabled);
    setIsBumper(offer.isBumper);
    
    // Scroll form into view if mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
    triggerToast("Loaded offer details into workspace.");
  };

  // Reset form
  const handleResetForm = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setPrice('');
    setImage('');
    setMapsLink('https://share.google/Eb9hZf8VUOwKefX2c');
    setStartDate('');
    setEndDate('');
    setEnabled(true);
    setIsBumper(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Client-side image compression with Canvas
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        // Set maximum width / height
        const MAX_WIDTH = 600;
        const MAX_HEIGHT = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Compress to low-size jpeg (0.7 quality)
          const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setImage(dataUrl);
          triggerToast("Image uploaded and compressed successfully (saved ~60%).");
        }
        setIsCompressing(false);
      };
    };
    reader.readAsDataURL(file);
  };

  // Save / Update Offer
  const handleSaveOffer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !price.trim()) {
      triggerToast("Please fill in the required fields (Title, Description, Price).", 'error');
      return;
    }

    try {
      const offerPayload = {
        title: title.trim(),
        description: description.trim(),
        price: price.trim(),
        image,
        mapsLink: mapsLink.trim(),
        enabled,
        startDate: startDate || new Date().toISOString().split('T')[0],
        endDate: endDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
        isBumper,
      };

      if (editingId) {
        await createOrUpdateOffer({ ...offerPayload, id: editingId });
        triggerToast("Offer updated successfully!");
      } else {
        await createOrUpdateOffer(offerPayload);
        triggerToast("New offer added successfully!");
      }

      handleResetForm();
      refresh();
    } catch (err) {
      console.error("Save offer failed", err);
      triggerToast("Failed to save offer record.", 'error');
    }
  };

  // Delete Offer
  const handleDeleteOffer = async (id: string) => {
    customConfirm(
      "Confirm Deletion",
      "Are you sure you want to permanently delete this offer? This cannot be undone.",
      async () => {
        try {
          await deleteOffer(id);
          triggerToast("Offer deleted successfully.");
          if (editingId === id) handleResetForm();
          refresh();
        } catch (err) {
          console.error("Delete offer failed", err);
          triggerToast("Failed to delete offer.", 'error');
        }
      }
    );
  };

  // Filter existing list
  const filteredOffers = offers.filter((off) => {
    const matchesSearch = off.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          off.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'enabled' && off.enabled) || 
                          (statusFilter === 'disabled' && !off.enabled);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 animate-fadeIn text-left text-zinc-800 max-w-7xl mx-auto">
      
      {/* Toast Alert Box */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-6 right-6 z-50 flex items-center gap-2.5 px-4.5 py-3 rounded-sm border shadow-2xl font-mono text-xs ${
              toast.type === 'success'
                ? 'bg-white border-green-500/30 text-green-700 shadow-green-500/5'
                : 'bg-white border-red-500/30 text-red-700 shadow-red-500/5'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle className="w-4 h-4 shrink-0 text-green-650" /> : <AlertCircle className="w-4 h-4 shrink-0 text-red-650" />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Config Segment */}
      <div className="bg-white/80 backdrop-blur-md border border-zinc-200/80 rounded-sm p-6 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
          <div>
            <h2 className="text-md font-black uppercase tracking-wider font-mono text-red-650 flex items-center gap-2">
              <Settings className="w-4 h-4 animate-spin-slow text-red-650" />
              <span>Global Pop-Up Display Config</span>
            </h2>
            <p className="text-[10px] text-zinc-500 font-sans leading-normal mt-0.5 uppercase tracking-wide">
              Configure how often the bumper popup is shown to individual visitors
            </p>
          </div>

          <div className="flex items-center gap-3 bg-zinc-100 border border-zinc-200 rounded-sm p-1">
            <button
              onClick={() => updateConfig({ popupBehavior: 'always' })}
              className={`px-3 py-1.5 rounded-sm text-[10px] font-mono uppercase font-black tracking-wider transition-all cursor-pointer ${
                config.popupBehavior === 'always'
                  ? 'bg-red-600 text-white font-extrabold'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              Always Show
            </button>
            <button
              onClick={() => updateConfig({ popupBehavior: 'once_24h' })}
              className={`px-3 py-1.5 rounded-sm text-[10px] font-mono uppercase font-black tracking-wider transition-all cursor-pointer ${
                config.popupBehavior === 'once_24h'
                  ? 'bg-red-600 text-white font-extrabold'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              Once/24 Hours
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono text-zinc-600">
          <div className="flex items-start gap-2 bg-zinc-50 p-3 rounded-sm border border-zinc-200">
            <Clock className="w-4 h-4 text-red-600 mt-0.5 shrink-0" />
            <div>
              <span className="text-[9px] text-zinc-550 font-bold uppercase block">Current Active Mode</span>
              <span className="text-zinc-900 font-bold">{config.popupBehavior === 'always' ? 'Always on Every Refresh' : 'Once Per 24 Hours'}</span>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-zinc-50 p-3 rounded-sm border border-zinc-200">
            <Compass className="w-4 h-4 text-red-650 mt-0.5 shrink-0" />
            <div>
              <span className="text-[9px] text-zinc-550 font-bold uppercase block">Tethered Google Maps</span>
              <span className="text-zinc-800 break-all leading-normal text-[10px]">share.google/Eb9hZf8...</span>
            </div>
          </div>
          <div className="flex items-start gap-2 bg-zinc-50 p-3 rounded-sm border border-zinc-200">
            <Sparkles className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
            <div>
              <span className="text-[9px] text-zinc-550 font-bold uppercase block">Auto-Sync Engine</span>
              <span className="text-zinc-900 font-bold">Active & Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Workspace split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form Section (5 columns) */}
        <div className="lg:col-span-5 bg-white/80 backdrop-blur-md border border-zinc-200/80 rounded-sm p-6 space-y-6 shadow-sm">
          <div className="border-b border-zinc-200 pb-3">
            <h2 className="text-lg font-black text-zinc-900 uppercase italic tracking-tight font-display flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-650" />
              <span>{editingId ? "Modify Existing Promotion" : "Form: New Workshop Promotion"}</span>
            </h2>
            <p className="text-[10px] text-zinc-500 font-mono uppercase mt-1">
              {editingId ? `Editing ID: ${editingId}` : "Create custom pop-ups and badges"}
            </p>
          </div>

          <form onSubmit={handleSaveOffer} className="space-y-4 text-xs">
            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-550 font-mono block">
                Offer Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. MONSOON BRAKE CHECK & alignment"
                className="w-full bg-zinc-50 border border-zinc-200 rounded-sm py-2 px-3 text-zinc-900 focus:outline-none focus:border-red-600 focus:bg-white transition-all font-sans"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-550 font-mono block">
                Offer Description *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Details of the work included, mechanical spares, AC checkups, oil etc."
                className="w-full bg-zinc-50 border border-zinc-200 rounded-sm py-2 px-3 text-zinc-900 focus:outline-none focus:border-red-600 focus:bg-white transition-all font-sans leading-normal"
              />
            </div>

            {/* Price & Maps Link */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-550 font-mono block">
                  Offer Price / Discount *
                </label>
                <input
                  type="text"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. ₹2,499 or FLAT 50% OFF"
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-sm py-2 px-3 text-zinc-900 focus:outline-none focus:border-red-600 focus:bg-white transition-all font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-550 font-mono block">
                  Google Maps Link
                </label>
                <input
                  type="url"
                  value={mapsLink}
                  onChange={(e) => setMapsLink(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-sm py-2 px-3 text-zinc-900 focus:outline-none focus:border-red-600 focus:bg-white transition-all font-mono text-[11px]"
                />
              </div>
            </div>

            {/* Start Date & End Date */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-550 font-mono block">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-sm py-2 px-3 text-zinc-900 focus:outline-none focus:border-red-600 focus:bg-white transition-all font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-550 font-mono block">
                  End Date / Expiry
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-sm py-2 px-3 text-zinc-900 focus:outline-none focus:border-red-600 focus:bg-white transition-all font-mono"
                />
              </div>
            </div>            {/* Image Upload Input */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-550 font-mono block">
                Offer Image / Banner
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isCompressing}
                  className="bg-zinc-100 border border-zinc-200 hover:border-zinc-300 text-zinc-700 py-2.5 px-4 rounded-sm font-mono font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
                >
                  <ImageIcon className="w-4 h-4 text-zinc-500" />
                  <span>{isCompressing ? 'Compressing...' : 'Upload Image'}</span>
                </button>
                <span className="text-[10px] text-zinc-500 truncate leading-none">
                  {image ? 'Image ready (compressed base64)' : 'No custom banner selected.'}
                </span>
              </div>
              {image && (
                <div className="relative mt-2 w-full h-24 bg-zinc-50 rounded-sm overflow-hidden border border-zinc-200">
                  <img src={image} alt="Form preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImage('')}
                    className="absolute top-1 right-1 p-1 rounded bg-black/80 hover:bg-red-650 text-white border border-zinc-200 transition-all"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            {/* Config Toggles */}
            <div className="grid grid-cols-2 gap-4 bg-zinc-50 p-3 rounded-sm border border-zinc-200 font-mono select-none">
              {/* Enabled toggle */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="enabledCheckbox"
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                  className="w-4 h-4 rounded text-red-650 accent-red-600 cursor-pointer"
                />
                <label htmlFor="enabledCheckbox" className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 cursor-pointer">
                  Enable Offer
                </label>
              </div>

              {/* Bumper toggle */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="bumperCheckbox"
                  checked={isBumper}
                  onChange={(e) => setIsBumper(e.target.checked)}
                  className="w-4 h-4 rounded text-red-655 accent-red-655 cursor-pointer"
                />
                <label htmlFor="bumperCheckbox" className="text-[10px] font-bold uppercase tracking-wider text-red-655 cursor-pointer">
                  Mark Bumper
                </label>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <button
                type="button"
                onClick={handleResetForm}
                className="bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-650 hover:text-zinc-800 py-3 rounded-sm text-[10px] font-bold font-mono uppercase tracking-widest transition-colors cursor-pointer text-center"
              >
                Clear Form
              </button>
              <button
                type="submit"
                className="col-span-2 bg-[#E31E24] hover:bg-red-700 text-white font-black py-3 rounded-sm text-[10px] font-mono uppercase tracking-widest transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{editingId ? "Save Changes" : "Publish Offer"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Listing & Live Preview (7 columns) */}
        <div className="lg:col-span-7 bg-white/80 backdrop-blur-md border border-zinc-200/80 rounded-sm p-6 space-y-6 shadow-sm">
          <div className="border-b border-zinc-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-zinc-900 uppercase italic tracking-tight font-display">
                Current Promotions Ledger ({filteredOffers.length})
              </h2>
              <p className="text-[10px] text-zinc-500 font-mono uppercase mt-1">
                Verify dates and toggle statuses instantly
              </p>
            </div>

            {/* Filtering tools */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search ledger..."
                  className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-sm py-1.5 pl-8 pr-3 text-[10px] focus:outline-none focus:border-red-600 focus:bg-white placeholder:text-zinc-450 font-mono"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e: any) => setStatusFilter(e.target.value)}
                className="bg-zinc-50 border border-zinc-200 text-zinc-700 rounded-sm p-1.5 text-[10px] focus:outline-none focus:border-red-600 font-mono"
              >
                <option value="all">All Status</option>
                <option value="enabled">Active</option>
                <option value="disabled">Paused</option>
              </select>
            </div>
          </div>

          {/* Grid display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[580px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredOffers.map((off) => (
              <div key={off.id} className="relative group">
                {/* Admin-only Overlay control buttons inside card */}
                <div className="absolute top-2.5 right-2.5 z-10 flex gap-1 items-center bg-white/90 backdrop-blur-sm rounded-sm p-1 border border-zinc-200 shadow-sm">
                  <button
                    onClick={() => handleEdit(off)}
                    className="p-1.5 hover:bg-zinc-100 text-zinc-700 hover:text-zinc-900 rounded transition-colors text-[10px] font-bold font-mono"
                    title="Edit Record"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteOffer(off.id)}
                    className="p-1.5 hover:bg-red-50 text-red-600 hover:text-red-700 rounded transition-colors"
                    title="Delete Record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <OfferCard offer={off} isAdminView={true} />
              </div>
            ))}

            {filteredOffers.length === 0 && (
              <div className="col-span-2 text-center py-20 text-zinc-500 font-mono italic bg-zinc-50 border border-dashed border-zinc-200 rounded-sm">
                No matching promotions found in database.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Custom Confirmation Modal Overlay */}
      {confirmModal && confirmModal.isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-fadeIn">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setConfirmModal(null)}
          />
          {/* Modal Container */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-6 max-w-sm w-full relative z-10 text-left shadow-2xl">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <AlertCircle className="w-6 h-6 shrink-0 text-red-600" />
              <h3 className="text-sm font-black uppercase tracking-wider font-mono text-zinc-900">
                {confirmModal.title}
              </h3>
            </div>
            <p className="text-xs text-zinc-600 leading-relaxed font-sans mb-6">
              {confirmModal.message}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setConfirmModal(null)}
                className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-250 text-zinc-600 hover:text-zinc-800 font-bold text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmModal.onConfirm}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer shadow-lg shadow-red-600/10"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
