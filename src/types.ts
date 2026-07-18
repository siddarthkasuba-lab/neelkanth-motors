export interface Service {
  id: string;
  title: string;
  icon: string; // lucide icon name
  price: string;
  includes: string[];
  category: 'mechanical' | 'electrical' | 'wheel' | 'body' | 'convenience' | 'interior';
  description?: string;
}

export interface Brand {
  name: string;
  logo?: string;
  isPremium?: boolean;
}

export interface TyreBrand {
  name: string;
  country?: string;
  logoUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  carModel: string;
  rating: number;
  comment: string;
  date: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  vehicleBrand: string;
  vehicleModel: string;
  serviceId: string;
  serviceName: string;
  preferredDate: string;
  message: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}
