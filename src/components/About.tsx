import { Shield, Clock, Award, CheckCircle2, UserCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data';
import { TranslationSet } from '../translations';

interface AboutProps {
  t: TranslationSet;
}

export default function About({ t }: AboutProps) {
  const points = [
    "Over 15 Years of Trusted Servicing Experience",
    "Expert Technicians Trained in Multi-Brand Diagnostics",
    "Genuine OEM / OES Approved Spare Parts Guarantee",
    "Advanced Modern Computerized Diagnostics & Equipment",
    "Affordable & Highly Transparent Upfront Quotes",
    "Quick Same-Day Services for Periodic Maintenance"
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-transparent text-zinc-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-red-650/5 blur-3xl rounded-full" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-amber-500/5 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          
          {/* Left Column: Visual Bento Layout */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              {/* Box 1 */}
              <div className="bg-white/80 backdrop-blur-md border border-zinc-200/80 p-6 rounded-sm flex flex-col justify-between shadow-md hover:border-red-600/30 hover:shadow-lg transition-all text-left">
                <div className="bg-red-600/10 p-2.5 rounded-sm border border-red-600/20 text-red-600 w-fit mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-3xl font-black font-mono text-zinc-900">15+</span>
                  <p className="text-xs text-zinc-500 mt-1 font-semibold uppercase tracking-wider">Years Experience</p>
                </div>
              </div>

              {/* Box 2 */}
              <div className="bg-white/80 backdrop-blur-md border border-zinc-200/80 p-6 rounded-sm flex flex-col justify-between shadow-md hover:border-amber-550/30 hover:shadow-lg transition-all text-left">
                <div className="bg-amber-500/10 p-2.5 rounded-sm border border-amber-500/20 text-amber-600 w-fit mb-4">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-3xl font-black font-mono text-zinc-900">Venu</span>
                  <p className="text-xs text-zinc-500 mt-1 font-semibold uppercase tracking-wider">Owner-Led Care</p>
                </div>
              </div>

              {/* Box 3 */}
              <div className="bg-white/80 backdrop-blur-md border border-zinc-200/80 p-6 rounded-sm flex flex-col justify-between shadow-md hover:border-green-500/30 hover:shadow-lg transition-all col-span-2 text-left">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-500/10 p-2.5 rounded-sm border border-green-500/20 text-green-600 shrink-0">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-zinc-900 block uppercase tracking-widest">Quality Assured</span>
                    <p className="text-xs text-zinc-600 mt-1.5 leading-relaxed">
                      Every car undergoes strict quality assurance checklists led by our master technicians before delivery.
                    </p>
                  </div>
                </div>
              </div>

              {/* Box 4 */}
              <div className="bg-white/80 backdrop-blur-md border border-zinc-200/80 p-6 rounded-sm flex items-center justify-between col-span-2 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-center space-x-3">
                  <Clock className="text-red-600 w-5 h-5 shrink-0" />
                  <span className="text-xs text-zinc-700 font-bold uppercase tracking-widest">Fast Turnaround Priority</span>
                </div>
                <span className="text-[10px] bg-red-600/10 border border-red-600/30 text-red-600 font-black uppercase tracking-widest px-2.5 py-1 rounded-sm">
                  Same-Day
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 text-left">
            <div className="space-y-2">
              <span className="text-red-600 font-black font-mono tracking-widest text-xs uppercase block">
                {t.aboutTitle}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight leading-tight uppercase italic font-display">
                {t.aboutSubtitle}
              </h2>
            </div>

            <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-normal">
              {t.aboutText1}
            </p>

            <p className="text-sm sm:text-base text-zinc-500 leading-relaxed font-normal">
              {t.aboutText2}
            </p>

            <div className="pt-4 border-t border-zinc-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {points.map((point, index) => (
                  <div key={index} className="flex items-start space-x-2.5 text-zinc-600">
                    <CheckCircle2 className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
