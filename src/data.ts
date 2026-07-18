import { Service, Brand, TyreBrand, Testimonial, FAQItem } from './types';

export const BUSINESS_INFO = {
  name: "NEELAKANTA MOTORS",
  owner: "Venu",
  tagline: "Multi Brand Car Service Center",
  experience: "15+ Years",
  address: "Plot No. 42, Workshop Main Road, Automotive Zone, Hyderabad, Telangana",
  googleMapsUrl: "https://maps.app.goo.gl/ri1oeNeHuzKyDcbFA",
  contacts: [
    { number: "9963004478", label: "Primary Contact" },
    { number: "8309960893", label: "Alternative Contact" }
  ],
  whatsappNumber: "919963004478" // International format for WhatsApp links
};

export const BRANDS: Brand[] = [
  { name: "Maruti Suzuki", isPremium: false },
  { name: "Hyundai", isPremium: false },
  { name: "Tata", isPremium: false },
  { name: "Honda", isPremium: false },
  { name: "Toyota", isPremium: false },
  { name: "Volkswagen", isPremium: false },
  { name: "Skoda", isPremium: false },
  { name: "Kia", isPremium: false },
  { name: "MG", isPremium: false },
  { name: "Mahindra", isPremium: false },
  { name: "Renault", isPremium: false },
  { name: "Nissan", isPremium: false },
  { name: "Ford", isPremium: false },
  { name: "Chevrolet", isPremium: false },
  { name: "BMW", isPremium: true },
  { name: "Audi", isPremium: true },
  { name: "Mercedes-Benz", isPremium: true }
];

export const TYRE_BRANDS: TyreBrand[] = [
  { name: "Continental" },
  { name: "Yokohama" },
  { name: "MRF" },
  { name: "CEAT" },
  { name: "Apollo" },
  { name: "JK Tyre" },
  { name: "Bridgestone" },
  { name: "Goodyear" },
  { name: "Michelin" }
];

export const SERVICES: Service[] = [
  {
    id: "general-service",
    title: "General Car Service",
    icon: "Wrench",
    price: "₹3499 Starting",
    category: "mechanical",
    description: "Keep your engine running smoothly with our periodic general car servicing.",
    includes: [
      "Engine Oil Change",
      "Oil Filter Replacement",
      "Air Filter Cleaning/Replacement",
      "Comprehensive 40-Point Inspection",
      "Coolant & Brake Fluid Top-up",
      "Battery & Alternator Inspection",
      "Brake Inspection & Cleaning"
    ]
  },
  {
    id: "brake-service",
    title: "Brake Service",
    icon: "ShieldAlert",
    price: "Price on Inspection",
    category: "mechanical",
    description: "Comprehensive brake servicing ensuring responsive and safe stopping power.",
    includes: [
      "Brake Pads Fitting",
      "Brake Shoes Inspection",
      "Brake Oil Top-up & Bleeding",
      "Brake Disc Grinding/Replacement",
      "Caliper Pin Greasing"
    ]
  },
  {
    id: "wheel-alignment",
    title: "Wheel Alignment",
    icon: "Compass",
    price: "₹450 – ₹800",
    category: "wheel",
    description: "Eliminate steering vibrations, pull issues, and ensure long tyre tread life.",
    includes: [
      "Computerized 3D Wheel Alignment",
      "Precision Wheel Balancing",
      "Tyre Rotation according to pattern",
      "Suspension Play Inspection",
      "Tyre Tread Wear Assessment",
      "Steering Center Alignment"
    ]
  },
  {
    id: "denting-painting",
    title: "Denting & Welding",
    icon: "Flame",
    price: "Price After Inspection",
    category: "body",
    description: "Erase structural impacts, scratches, or frame twists with our dent and welding works.",
    includes: [
      "Professional Dent Pulling & Removal",
      "Precision Panel Realignment",
      "Gas & Arc Welding Repairs",
      "Anti-Rust Primer Coat Preparation",
      "Custom Sheet Metal Fabrications"
    ]
  },
  {
    id: "car-painting",
    title: "Premium Car Painting",
    icon: "Brush",
    price: "Starting from ₹3500",
    category: "body",
    description: "Luxury factory-finish panel painting and full body painting with computerized paint matching.",
    includes: [
      "Premium DuPont/Standox Paint",
      "Dust-free Spray Paint Booth Finish",
      "Multi-stage Scratch Repair",
      "Digital computerized Color Matching",
      "Ultra-glossy Scratch-Resistant Clear Coat"
    ]
  },
  {
    id: "alloy-wheel-repair",
    title: "Alloy Wheel Rim Repair",
    icon: "Disc3",
    price: "Starting ₹3000",
    category: "wheel",
    description: "Premium alloy rim straightening and aesthetic face restoration.",
    includes: [
      "Bent Rim Straightening",
      "Alloy Wheel Crack Repairs",
      "Scuff & Curb Rash Removal",
      "Wheel Face Respraying & Powder Coating",
      "High-speed Radial Runout Correction"
    ]
  },
  {
    id: "lights-electrical",
    title: "Lights & Electrical",
    icon: "Zap",
    price: "Price on Inspection",
    category: "electrical",
    description: "Modern car diagnostics, wiring issues, starter repairs, and bulb upgrades.",
    includes: [
      "Headlight Bulb Upgrades & Replacements",
      "Fog Lamp installations",
      "Wiring Harness Fault Diagnosis",
      "Power Window & Horn Repairs",
      "Fuse Box and Relay Replacements"
    ]
  },
  {
    id: "breakdown-assistance",
    title: "Breakdown Assistance",
    icon: "Truck",
    price: "₹300 Starting",
    category: "convenience",
    description: "Stuck on the road? Rapid roadside emergency assistance and towing services.",
    includes: [
      "24/7 Roadside Assistance Within Hyderabad",
      "Emergency Battery Jump Start",
      "On-site Puncture Repair & Spare Fitting",
      "Fuel Delivery Assistance",
      "Towing Coordinator Support"
    ]
  },
  {
    id: "pickup-drop",
    title: "Pick-up & Drop Service",
    icon: "MapPin",
    price: "Doorstep Pickup & Delivery",
    category: "convenience",
    description: "Get your car serviced without putting your life or work on hold.",
    includes: [
      "Hassle-free Doorstep Pickup",
      "Safe, Tracked Contactless Delivery",
      "Insured and Certified Drivers",
      "Complete Digital Updates"
    ]
  },
  {
    id: "puncture-repair",
    title: "Puncture Repair",
    icon: "CircleAlert",
    price: "₹150 – ₹200",
    category: "wheel",
    description: "Fast tubeless puncture fixes, valve checks, and premium tyre sealant options.",
    includes: [
      "Tubeless Puncture Plugging",
      "Tyre Valve Core & Valve Replacements",
      "Airtight Sealant & Patch Repairs",
      "Wheel Pressure Balance Checks"
    ]
  },
  {
    id: "wiper-replacement",
    title: "Wiper Blade Replacement",
    icon: "Eye",
    price: "Starting from ₹299",
    category: "convenience",
    description: "High-performance frameless wipers ensuring perfect visibility in monsoon rains.",
    includes: [
      "High-Quality Silencer Carbon Wipers",
      "Front windshield wiper set",
      "Rear windshield wiper set (if applicable)",
      "Wiper Washer Fluid Top-up included"
    ]
  },
  {
    id: "seat-covers",
    title: "Premium Seat Covers",
    icon: "Armchair",
    category: "interior",
    price: "Price After Inspection",
    description: "Custom tailored seat layouts made from premium fabrics and leatherette.",
    includes: [
      "Premium Nappa & PU Leather Options",
      "Breathable Multi-layer Fabrics",
      "OEM-grade Custom Snug Fitting",
      "Wide choice of Colors & Stitch Patterns"
    ]
  },
  {
    id: "floor-mats",
    title: "Custom Floor Mats",
    icon: "Grid",
    category: "interior",
    price: "Price on Selection",
    description: "Heavy-duty custom fit mats to keep your car floor pristine and dry.",
    includes: [
      "Premium 3D & 5D Tailored Mats",
      "Luxury 7D Double-Layer Grass Mats",
      "All-weather Waterproof Rubber Mats",
      "Custom Car Model Matching Profiles"
    ]
  }
];

export const WHY_CHOOSE_US = [
  {
    title: "15+ Years Experience",
    description: "Servicing Hyderabad's car owners since 2011 with deep technical and model expertise.",
    icon: "Calendar"
  },
  {
    title: "Expert Mechanics",
    description: "Highly trained team who diagnose complex engine, electrical, and suspension bugs cleanly.",
    icon: "Award"
  },
  {
    title: "Affordable Pricing",
    description: "Up to 40% cheaper than authorized showrooms with absolute transparency and zero hidden fees.",
    icon: "Coins"
  },
  {
    title: "Genuine Parts",
    description: "We use exclusively OEM or OES-certified components ensuring safety and mechanical warranty.",
    icon: "CheckCircle2"
  },
  {
    title: "Quick Delivery",
    description: "Most periodic services and minor electrical repairs completed and returned on the same day.",
    icon: "Clock"
  },
  {
    title: "Modern Equipment",
    description: "State-of-the-art OBD scanners, automatic tire aligners, and paint booths.",
    icon: "Laptop"
  },
  {
    title: "Pickup & Drop",
    description: "Sit back and relax. We collect your vehicle from your home/office and return it polished.",
    icon: "Car"
  },
  {
    title: "Roadside Assistance",
    description: "Emergency breakdown, jump start, flat tire help, and towing support inside Hyderabad.",
    icon: "Truck"
  },
  {
    title: "Customer Satisfaction",
    description: "Our #1 metric is our long-term client relationships and hundreds of 5-star local referrals.",
    icon: "Smile"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Siddarth Kasuba",
    carModel: "Hyundai Creta",
    rating: 5,
    comment: "Neelakanta Motors did a phenomenal job! My Creta had a weird suspension noise that showrooms couldn't fix. Venu's team diagnosed and resolved it in a single day at a highly reasonable price. Excellent service!",
    date: "June 20, 2026"
  },
  {
    id: "t2",
    name: "Kiran Kumar",
    carModel: "Maruti Swift",
    rating: 5,
    comment: "Affordable prices and highly professional staff. The general service is very detailed, they even clean the spark plugs and throttle body which authorized dealers usually skip. Recommended for all car owners.",
    date: "May 14, 2026"
  },
  {
    id: "t3",
    name: "Dr. Ananya Reddy",
    carModel: "Honda City",
    rating: 5,
    comment: "I used their doorstep pickup and drop service. The booking process was super smooth, they updated me via WhatsApp with pictures of the parts changed, and delivered the car neatly polished. Highly reliable!",
    date: "April 02, 2026"
  },
  {
    id: "t4",
    name: "Ramesh Naidu",
    carModel: "Mahindra XUV700",
    rating: 5,
    comment: "Excellent bodywork painting. Got a deep bumper scrape fixed here; the color matching with the original black paint is 100% seamless and flawless. Saved a lot of insurance hassle.",
    date: "March 18, 2026"
  }
];

export const FAQS: FAQItem[] = [
  {
    category: "General Service",
    question: "How long does a general servicing take?",
    answer: "A standard periodic general service takes around 3 to 5 hours. This includes oil change, oil filter replacement, air filter cleaning, fluid top-ups, detailed brakes check, and washing. If additional suspension or major mechanical works are needed, it may take longer, which we will pre-advise you."
  },
  {
    category: "Convenience",
    question: "Do you provide pickup and drop?",
    answer: "Yes, we provide convenient doorstep pick-up and drop-off services across Hyderabad. You can book an appointment online or call us, and our representative will collect your car, bring it to our workshop, get it serviced, and safely deliver it back to your location."
  },
  {
    category: "Accident & Repairs",
    question: "Do you repair accident vehicles and do denting/painting?",
    answer: "Yes, we possess full accident body repair facilities, including computerized dent pullers, gas/welding sets, and a professional dust-free paint booth. We perform panel-by-panel painting as well as complete car restorations to factory finishes."
  },
  {
    category: "Parts & Warranty",
    question: "Do you use genuine spare parts?",
    answer: "Absolutely. We only use OES (Original Equipment Supplier) or OEM (Original Equipment Manufacturer) spare parts for all brand lines (Maruti Suzuki, Hyundai, BMW, Honda, etc.). This ensures your vehicle safety, mileage, and parts warranty are completely protected."
  },
  {
    category: "Emergency Support",
    question: "Do you provide emergency breakdown support?",
    answer: "Yes, we provide emergency roadside assistance including battery jump-starts, tire puncture fixes, and towing coordination for flatbeds or standard hydraulic tow trucks inside our operational radius. Call Venu directly at 9963004478 or 8309960893."
  }
];

export const GALLERY_IMAGES = [
  {
    id: "g1",
    url: "/src/assets/images/workshop_hero_1783442580576.jpg",
    title: "Multi Brand Workshop",
    description: "Our state-of-the-art multi-brand workshop with modern lifts and equipment."
  },
  {
    id: "g2",
    url: "/src/assets/images/workshop_diagnostics_1783442609580.jpg",
    title: "Advanced OBD Diagnostics",
    description: "Expert engine fault diagnostics using advanced electronic scanning computers."
  },
  {
    id: "g3",
    url: "/src/assets/images/workshop_alignment_1783442622902.jpg",
    title: "Computerized Wheel Alignment",
    description: "Precise 3D wheel aligning and balancing for smooth driving and long tire life."
  },
  {
    id: "g4",
    url: "/src/assets/images/workshop_detailing_1783442639981.jpg",
    title: "Factory Paint Finish",
    description: "Dust-free paint booth panel repairs and full body painting with digital color-matching."
  }
];
