import React from 'react';
import { 
  Calendar, Award, Coins, CheckCircle2, Clock, 
  Laptop, Car, Truck, Smile, ShieldCheck 
} from 'lucide-react';
import { WHY_CHOOSE_US } from '../data';

const IconMap: Record<string, React.ComponentType<any>> = {
  Calendar,
  Award,
  Coins,
  CheckCircle2,
  Clock,
  Laptop,
  Car,
  Truck,
  Smile
};

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-20 sm:py-28 bg-transparent text-zinc-800 relative">
      {/* Decorative ambient lights */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-500/5 blur-3xl rounded-full" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-red-650/5 blur-3xl rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-red-600 font-black font-mono tracking-widest text-[10px] uppercase block">
            WHY NEELKANTH MOTORS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight uppercase italic font-display">
            The Multi-Brand Specialists You Can Count On
          </h2>
          <p className="text-zinc-650 text-sm leading-relaxed">
            We deliver dealership-grade workmanship at transparent, highly competitive rates. See why hundreds of vehicle owners in Hyderabad choose us.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 text-left">
          {WHY_CHOOSE_US.map((item, index) => {
            const IconComp = IconMap[item.icon] || ShieldCheck;
            return (
              <div
                key={index}
                className="group relative bg-white/80 backdrop-blur-md border border-zinc-200/80 hover:border-red-600/30 p-6 rounded-sm shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                {/* Accent border on hover */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-all duration-300" />

                <div className="space-y-4">
                  {/* Icon */}
                  <div className="bg-red-600/10 group-hover:bg-red-600 group-hover:text-white p-3 rounded-sm border border-red-600/20 text-red-600 w-fit transition-all duration-300">
                    <IconComp className="w-6 h-6" />
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-zinc-900 tracking-tight group-hover:text-red-600 transition-colors uppercase italic font-display">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
