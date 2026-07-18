import { Phone, MessageSquare, MapPin, Clock, ExternalLink, Calendar, UserCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

interface ContactProps {
  onBookClick: () => void;
}

export default function Contact({ onBookClick }: ContactProps) {
  const formatPhoneNumberForCall = (num: string) => `tel:${num}`;
  const formatWhatsAppLink = (num: string) => `https://wa.me/${num}?text=Hi%20Venu,%20I'm%20inquiring%20about%20a%20car%20service%20for%20my%20vehicle%20at%20Neelkanth%20Motors.`;

  return (
    <section id="contact" className="py-20 sm:py-28 bg-transparent border-t border-zinc-200/80 text-zinc-800 relative">
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-red-650/5 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-red-600 font-black font-mono tracking-widest text-[10px] uppercase block">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight uppercase italic font-display">
            Contact Neelkanth Motors
          </h2>
          <p className="text-zinc-650 text-sm leading-relaxed">
            Ready to book or need emergency roadside assistance? Reach out to Venu or drive straight to our service bay using the map locator.
          </p>
        </div>

        {/* Contact Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-stretch">
          {/* Left Column: Direct info cards */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            {/* Business Card Info */}
            <div className="bg-white/80 backdrop-blur-md border border-zinc-200/80 p-6 sm:p-8 rounded-sm space-y-6 text-left shadow-sm">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-2xl font-black tracking-tight text-zinc-900 uppercase italic font-display">{BUSINESS_INFO.name}</h3>
                <span className="text-red-600 font-mono text-[10px] font-bold uppercase tracking-widest block mt-1">
                  {BUSINESS_INFO.tagline}
                </span>
              </div>

              {/* Specific info lines */}
              <div className="space-y-4 text-sm font-sans">
                {/* Owner Info */}
                <div className="flex items-start space-x-3 text-zinc-700">
                  <UserCheck className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-500 text-[10px] uppercase font-mono tracking-wider font-bold block">Owner</span>
                    <span className="font-semibold text-zinc-900">{BUSINESS_INFO.owner}</span>
                  </div>
                </div>

                {/* Direct address */}
                <div className="flex items-start space-x-3 text-zinc-700">
                  <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-500 text-[10px] uppercase font-mono tracking-wider font-bold block">Workshop Address</span>
                    <p className="leading-relaxed font-medium text-zinc-900">{BUSINESS_INFO.address}</p>
                  </div>
                </div>

                {/* Operating hours */}
                <div className="flex items-start space-x-3 text-zinc-700">
                  <Clock className="w-5 h-5 text-zinc-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-zinc-500 text-[10px] uppercase font-mono tracking-wider font-bold block">Business Hours</span>
                    <span className="font-semibold text-zinc-900">Open Daily: 8:00 AM – 8:30 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calling & Quick Dial Card */}
            <div className="bg-white/80 backdrop-blur-md border border-zinc-200/80 p-6 sm:p-8 rounded-sm space-y-4 text-left shadow-sm">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
                Direct Contact Lines
              </h4>

              <div className="space-y-3 font-mono">
                {BUSINESS_INFO.contacts.map((contact, idx) => (
                  <a
                    key={idx}
                    href={formatPhoneNumberForCall(contact.number)}
                    className="flex items-center justify-between p-3.5 rounded-sm bg-zinc-50 border border-zinc-205 hover:border-red-600/40 text-zinc-850 transition-all group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-600/10 p-2 rounded-sm border border-red-600/20 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 block leading-tight font-sans font-bold uppercase">{contact.label}</span>
                        <span className="font-bold text-sm tracking-wide text-zinc-900">{contact.number}</span>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold text-red-600 hover:underline flex items-center gap-0.5">
                      Call <ExternalLink className="w-3 h-3" />
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interaction, maps, booking hooks */}
          <div className="lg:col-span-7 bg-white/80 backdrop-blur-md border border-zinc-200/80 p-6 sm:p-8 rounded-sm flex flex-col justify-between text-left shadow-sm">
            {/* Embedded Google Map mockup with absolute coordinate triggers */}
            <div className="space-y-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
                  Location Map
                </span>
                <a
                  href={BUSINESS_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-red-650 hover:text-red-800 flex items-center space-x-1 font-bold underline"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Styled Mock map canvas */}
              <div className="relative w-full rounded-sm overflow-hidden border border-zinc-200 h-52 sm:h-64 md:h-72 bg-zinc-50 flex items-center justify-center">
                {/* Radial visual grid dots */}
                <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }} />
                
                {/* Visual road lines representation */}
                <div className="absolute h-1 bg-zinc-200 w-full top-1/2 transform -rotate-12" />
                <div className="absolute w-1 bg-zinc-200 h-full left-1/3 transform rotate-6" />
                <div className="absolute w-1 bg-zinc-200 h-full left-2/3 transform -rotate-12" />

                {/* Animated active beacon for Neelkanth Motors */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="bg-red-600 text-white p-3 rounded-full shadow-2xl relative border border-white/20 animate-bounce">
                    <MapPin className="w-6 h-6 fill-white" />
                    <span className="absolute inset-0 bg-red-600 rounded-full animate-ping scale-150 opacity-25" />
                  </div>
                  <div className="mt-2 bg-white border border-zinc-200 px-3 py-1.5 rounded-sm text-xs font-black text-zinc-900 text-center shadow-lg tracking-tight uppercase">
                    NEELKANTH MOTORS
                    <span className="block text-[8px] text-red-600 uppercase tracking-widest font-mono">Venu (Owner)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Map & Message Action grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-6 mt-6 border-t border-zinc-100">
              <a
                href={BUSINESS_INFO.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-[#FFD700] hover:bg-[#FFC700] text-black font-black py-3.5 rounded-sm text-center text-xs uppercase tracking-widest transition-all duration-150 flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
              >
                <MapPin className="w-4 h-4 fill-black text-black shrink-0" />
                <span>Navigate to Shop</span>
              </a>

              <button
                onClick={onBookClick}
                className="bg-[#E31E24] hover:bg-red-700 active:bg-red-800 text-white font-black py-3.5 rounded-sm text-center text-xs uppercase tracking-widest transition-all duration-150 flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-white shrink-0" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
