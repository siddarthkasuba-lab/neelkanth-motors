import { Star, MessageSquare } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-transparent text-zinc-800 relative">
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-red-650/5 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-red-600 font-black font-mono tracking-widest text-[10px] uppercase block">
            CUSTOMER VOICE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight uppercase italic font-display">
            5-Star Testimonials
          </h2>
          <p className="text-zinc-650 text-sm leading-relaxed">
            Read what car owners across Hyderabad have to say about our mechanics, pricing transparency, and fast delivery.
          </p>
        </div>

        {/* Reviews Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-white/80 backdrop-blur-md border border-zinc-200/80 hover:border-red-600/30 p-6 sm:p-8 rounded-sm shadow-sm hover:shadow-md transition-all flex flex-col justify-between text-left space-y-6 relative overflow-hidden"
            >
              {/* Corner decorative speech mark */}
              <div className="absolute right-6 top-6 text-zinc-100 font-serif text-8xl font-black select-none pointer-events-none opacity-80 leading-none">
                ”
              </div>

              <div className="space-y-4">
                {/* Star rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                  ))}
                </div>

                {/* Comment text */}
                <p className="text-zinc-700 text-sm sm:text-base leading-relaxed italic font-normal relative z-10">
                  "{review.comment}"
                </p>
              </div>

              {/* Reviewer Meta bar */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-zinc-900 tracking-tight uppercase italic font-display">{review.name}</h4>
                  <div className="flex items-center space-x-1.5 text-[11px] font-mono font-bold text-zinc-600 uppercase">
                    <span>🚗 {review.carModel}</span>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-zinc-550 font-medium">{review.date}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Verification indicator */}
        <div className="mt-12 inline-flex items-center space-x-2 bg-white/80 border border-zinc-200 px-4 py-2.5 rounded-sm text-xs text-zinc-600 shadow-sm font-semibold font-mono">
          <MessageSquare className="w-4 h-4 text-green-600 shrink-0" />
          <span>All testimonials are verified & shared by our long-term clients in Hyderabad.</span>
        </div>
      </div>
    </section>
  );
}
