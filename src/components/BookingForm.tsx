import React, { useState, useEffect } from 'react';
import { Calendar, Phone, Car, HelpCircle, CheckCircle2, MessageSquare, ArrowRight, ShieldCheck, Copy, Clock } from 'lucide-react';
import { BRANDS, SERVICES, BUSINESS_INFO } from '../data';
import { Booking } from '../types';
import { TranslationSet } from '../translations';

interface BookingFormProps {
  selectedServiceId: string | null;
  onBookingSubmitted?: (booking: Booking) => void;
  resetSelectedService: () => void;
  t: TranslationSet;
}

export default function BookingForm({ selectedServiceId, onBookingSubmitted, resetSelectedService, t }: BookingFormProps) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [vehicleBrand, setVehicleBrand] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<Booking | null>(null);
  const [copied, setCopied] = useState(false);

  // Sync prop selectedServiceId to local state
  useEffect(() => {
    if (selectedServiceId) {
      setServiceId(selectedServiceId);
      const el = document.getElementById('booking');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [selectedServiceId]);

  // Set min date to today's date
  const getMinDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!customerName.trim()) newErrors.customerName = "Full name is required.";
    
    const phoneClean = phone.replace(/[^0-9]/g, '');
    if (!phoneClean) {
      newErrors.phone = "Phone number is required.";
    } else if (phoneClean.length < 10) {
      newErrors.phone = "Please enter a valid 10-digit mobile number.";
    }

    if (!vehicleBrand) newErrors.vehicleBrand = "Please select your car brand.";
    if (!vehicleModel.trim()) newErrors.vehicleModel = "Please specify the car model.";
    if (!serviceId) newErrors.serviceId = "Please select the service required.";
    if (!preferredDate) newErrors.preferredDate = "Please choose a preferred date.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const selectedService = SERVICES.find(s => s.id === serviceId);
      const newBooking: Booking = {
        id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName: customerName.trim(),
        phone: phone.trim(),
        vehicleBrand,
        vehicleModel: vehicleModel.trim(),
        serviceId,
        serviceName: selectedService ? selectedService.title : "General Diagnostics",
        preferredDate,
        message: message.trim(),
        status: 'Pending',
        createdAt: new Date().toISOString()
      };

      const existingStr = localStorage.getItem('neelakanta_bookings') || localStorage.getItem('neelkanth_bookings');
      const existing: Booking[] = existingStr ? JSON.parse(existingStr) : [];
      existing.unshift(newBooking);
      localStorage.setItem('neelakanta_bookings', JSON.stringify(existing));

      // Append to the admin notifications center
      const newAlert = {
        id: "ALT-" + Math.floor(100000 + Math.random() * 900000),
        type: 'booking',
        title: 'New Booking Submitted',
        message: `Customer ${newBooking.customerName} requested ${newBooking.serviceName} for their ${newBooking.vehicleBrand} ${newBooking.vehicleModel}.`,
        timestamp: new Date().toISOString(),
        isRead: false,
        metadata: {
          customerName: newBooking.customerName,
          phone: newBooking.phone,
          vehicleBrand: newBooking.vehicleBrand,
          vehicleModel: newBooking.vehicleModel,
          serviceName: newBooking.serviceName
        }
      };
      const alertsStr = localStorage.getItem('neelakanta_notifications') || localStorage.getItem('neelkanth_notifications');
      const alertsList = alertsStr ? JSON.parse(alertsStr) : [];
      alertsList.unshift(newAlert);
      localStorage.setItem('neelakanta_notifications', JSON.stringify(alertsList));

      setSubmittedBooking(newBooking);
      setIsSubmitting(false);
      resetSelectedService();

      if (onBookingSubmitted) {
        onBookingSubmitted(newBooking);
      }
    }, 1200);
  };

  const resetForm = () => {
    setCustomerName('');
    setPhone('');
    setVehicleBrand('');
    setVehicleModel('');
    setServiceId('');
    setPreferredDate('');
    setMessage('');
    setSubmittedBooking(null);
    setErrors({});
  };

  const getReceiptText = () => {
    if (!submittedBooking) return '';
    return `*NEELKANTH MOTORS - APPOINTMENT TICKET*
----------------------------------------
🎟️ *Ticket ID:* ${submittedBooking.id}
👤 *Customer:* ${submittedBooking.customerName}
📞 *Phone:* ${submittedBooking.phone}
🚗 *Vehicle:* ${submittedBooking.vehicleBrand} ${submittedBooking.vehicleModel}
🛠️ *Service:* ${submittedBooking.serviceName}
📅 *Preferred Date:* ${submittedBooking.preferredDate}
💬 *Message:* ${submittedBooking.message || 'N/A'}
----------------------------------------
*Venu (Owner)* will review and confirm this booking via Call/WhatsApp shortly!`;
  };

  const handleCopy = () => {
    const text = getReceiptText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWhatsApp = () => {
    const text = getReceiptText();
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  return (
    <section id="booking" className="py-20 sm:py-28 bg-transparent text-zinc-800 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-650/5 blur-3xl rounded-full" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {!submittedBooking ? (
          <div className="bg-white/80 backdrop-blur-md border border-zinc-200/80 rounded-sm p-6 sm:p-10 shadow-sm hover:shadow-md transition-all">
            {/* Header */}
            <div className="text-center max-w-xl mx-auto space-y-3 mb-10">
              <span className="text-red-600 font-black font-mono tracking-widest text-[10px] uppercase block">
                {t.bookService}
              </span>
              <h2 className="text-3xl font-black text-zinc-900 tracking-tight uppercase italic font-display">
                {t.bookingTitle}
              </h2>
              <p className="text-zinc-650 text-sm leading-relaxed">
                {t.bookingSubtitle}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Customer Name */}
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-550 font-mono block">
                    {t.fullName}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className={`w-full bg-zinc-50 border rounded-sm py-3 px-4 text-sm text-zinc-900 focus:outline-none focus:ring-1 transition-all ${
                        errors.customerName ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 focus:border-red-600 focus:ring-red-600 focus:bg-white'
                      }`}
                    />
                  </div>
                  {errors.customerName && <p className="text-xs text-red-500 font-medium font-mono">{errors.customerName}</p>}
                </div>

                {/* Phone Number */}
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-550 font-mono block">
                    {t.mobileNumber}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500 font-mono">+91</span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                      maxLength={10}
                      placeholder="99630 04478"
                      className={`w-full bg-zinc-50 border rounded-sm py-3 pl-14 pr-4 text-sm text-zinc-900 focus:outline-none focus:ring-1 transition-all font-mono ${
                        errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 focus:border-red-600 focus:ring-red-600 focus:bg-white'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-500 font-medium font-mono">{errors.phone}</p>}
                </div>

                {/* Vehicle Brand */}
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-550 font-mono block">
                    {t.selectBrand}
                  </label>
                  <select
                    required
                    value={vehicleBrand}
                    onChange={(e) => setThemeBrand(e.target.value)}
                    className={`w-full bg-zinc-50 border border-zinc-200 rounded-sm py-3 px-4 text-sm text-zinc-900 focus:outline-none focus:ring-1 transition-all ${
                      errors.vehicleBrand ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 focus:border-red-600 focus:ring-red-600 focus:bg-white'
                    }`}
                  >
                    <option value="" className="text-zinc-500">-- {t.selectBrand} --</option>
                    {BRANDS.map(brand => (
                      <option key={brand.name} value={brand.name} className="text-zinc-900">
                        {brand.name} {brand.isPremium ? '(Luxury)' : ''}
                      </option>
                    ))}
                    <option value="Other" className="text-zinc-900">Other Make / Custom</option>
                  </select>
                  {errors.vehicleBrand && <p className="text-xs text-red-500 font-medium font-mono">{errors.vehicleBrand}</p>}
                </div>

                {/* Vehicle Model */}
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-550 font-mono block">
                    {t.carModel}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      placeholder="e.g. Swift VXI / Creta SX"
                      className={`w-full bg-zinc-50 border rounded-sm py-3 px-4 text-sm text-zinc-900 focus:outline-none focus:ring-1 transition-all ${
                        errors.vehicleModel ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 focus:border-red-600 focus:ring-red-600 focus:bg-white'
                      }`}
                    />
                  </div>
                  {errors.vehicleModel && <p className="text-xs text-red-500 font-medium font-mono">{errors.vehicleModel}</p>}
                </div>

                {/* Service Required */}
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-550 font-mono block">
                    {t.selectService}
                  </label>
                  <select
                    required
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className={`w-full bg-zinc-50 border border-zinc-200 rounded-sm py-3 px-4 text-sm text-zinc-900 focus:outline-none focus:ring-1 transition-all ${
                      errors.serviceId ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 focus:border-red-600 focus:ring-red-600 focus:bg-white'
                    }`}
                  >
                    <option value="" className="text-zinc-500">-- {t.selectService} --</option>
                    {SERVICES.map(service => (
                      <option key={service.id} value={service.id} className="text-zinc-900">
                        {service.title === "Wheel Alignment & Balancing" ? "Wheel Alignment" : service.title} ({service.price})
                      </option>
                    ))}
                    <option value="custom" className="text-zinc-900">Other Mechanical / Custom Work</option>
                  </select>
                  {errors.serviceId && <p className="text-xs text-red-500 font-medium font-mono">{errors.serviceId}</p>}
                </div>

                {/* Preferred Date */}
                <div className="space-y-1 text-left">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-550 font-mono block">
                    {t.preferredDate}
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    min={getMinDate()}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className={`w-full bg-zinc-50 border border-zinc-200 rounded-sm py-3 px-4 text-sm text-zinc-900 focus:outline-none focus:ring-1 transition-all font-mono ${
                      errors.preferredDate ? 'border-red-500 focus:ring-red-500' : 'border-zinc-200 focus:border-red-600 focus:ring-red-600 focus:bg-white'
                    }`}
                  />
                  {errors.preferredDate && <p className="text-xs text-red-500 font-medium font-mono">{errors.preferredDate}</p>}
                </div>
              </div>

              {/* Message / Requirements */}
              <div className="space-y-1 text-left">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-550 font-mono block">
                  {t.notes}
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="e.g. suspension squeak, oil level drop, check painting details..."
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-sm py-3 px-4 text-sm text-zinc-900 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all placeholder:text-zinc-400"
                />
              </div>

              {/* Secure Info Note */}
              <div className="flex items-start space-x-2.5 bg-zinc-50 p-3 rounded-sm border border-zinc-200 text-zinc-600 text-xs text-left shadow-sm">
                <ShieldCheck className="w-4.5 h-4.5 text-green-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Your appointment slot is immediately locked. We will never share your phone number. Standard 100% genuine spare parts guarantee applies to all works.
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#E31E24] hover:bg-red-700 active:bg-red-800 disabled:bg-zinc-200 disabled:text-zinc-400 text-white font-black py-4 rounded-sm text-xs uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Reserving Slot...</span>
                  </>
                ) : (
                  <>
                    <span>{t.submitBooking}</span>
                    <ArrowRight className="w-5 h-5 text-white" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* SUCCESS SCREEN (Appointment Ticket) */
          <div className="bg-white/95 border border-zinc-200/80 rounded-sm p-6 sm:p-10 shadow-xl max-w-xl mx-auto space-y-6 text-center animate-scaleIn">
            <div className="mx-auto w-16 h-16 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center text-green-600">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 uppercase italic font-display">Booking Requested!</h3>
              <p className="text-zinc-650 text-sm max-w-sm mx-auto">
                Your service slot has been securely booked under ticket ID <strong className="text-zinc-900 font-mono">{submittedBooking.id}</strong>.
              </p>
            </div>

            {/* Ticket detail receipt card */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-sm p-5 text-left font-sans space-y-3 relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 bg-red-600 text-[10px] font-black uppercase tracking-wider font-mono px-3 py-1 rounded-bl-sm text-white">
                Ticket Issued
              </div>

              <div className="text-xs font-mono text-zinc-500 border-b border-zinc-200 pb-2 mb-2 flex items-center justify-between">
                <span>NEELKANTH MOTORS HYDERABAD</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-red-600" /> Pending Confirmation</span>
              </div>

              <div className="grid grid-cols-2 gap-y-3.5 gap-x-2 text-sm">
                <div>
                  <span className="text-[10px] text-zinc-500 font-semibold block uppercase tracking-wider font-mono">Ticket ID</span>
                  <span className="text-zinc-900 font-mono font-bold">{submittedBooking.id}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 font-semibold block uppercase tracking-wider font-mono">Customer</span>
                  <span className="text-zinc-900 font-bold">{submittedBooking.customerName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 font-semibold block uppercase tracking-wider font-mono">Car Info</span>
                  <span className="text-zinc-900 font-bold">{submittedBooking.vehicleBrand} {submittedBooking.vehicleModel}</span>
                </div>
                <div>
                  <span className="text-[10px] text-zinc-500 font-semibold block uppercase tracking-wider font-mono">Date Chosen</span>
                  <span className="text-zinc-900 font-mono font-bold">{submittedBooking.preferredDate}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-zinc-500 font-semibold block uppercase tracking-wider font-mono">Service Requested</span>
                  <span className="text-red-600 font-black font-sans uppercase italic text-xs tracking-wide">{submittedBooking.serviceName}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions for Confirmation */}
            <div className="space-y-3 pt-2">
              <p className="text-xs text-zinc-550 leading-normal max-w-xs mx-auto">
                To guarantee priority pickup or immediate scheduling confirmation, you can instantly text this ticket to Venu via WhatsApp.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleSendWhatsApp}
                  className="bg-[#25D366] hover:bg-green-600 active:bg-green-700 text-white font-bold py-3 px-4 rounded-sm text-sm transition-colors flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-white text-[#25D366]" />
                  <span>Send Ticket to Venu</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="bg-zinc-100 hover:bg-zinc-200 text-zinc-850 font-bold py-3 px-4 rounded-sm text-sm transition-colors flex items-center justify-center space-x-2 border border-zinc-200 cursor-pointer"
                >
                  <Copy className="w-4 h-4 text-zinc-700" />
                  <span>{copied ? 'Copied Receipt!' : 'Copy Receipt Info'}</span>
                </button>
              </div>

              <button
                onClick={resetForm}
                className="text-xs text-zinc-500 font-mono uppercase tracking-wider hover:text-red-650 underline pt-4 cursor-pointer"
              >
                Book Another Car
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );

  // Helper local function to handle brand selection safely
  function setThemeBrand(val: string) {
    setVehicleBrand(val);
  }
}
