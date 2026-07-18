import React, { useState, useEffect } from 'react';
import {
  Lock, Unlock, ShieldAlert, Check, X, Trash2,
  Search, Calendar, Phone, Car, Users, RefreshCw, Star,
  LogOut, ClipboardList, Clock, CheckCircle2, AlertTriangle, ArrowLeft,
  Bell, Volume2, Sparkles, UserCheck, ShieldCheck, ChevronDown, ArrowRight
} from 'lucide-react';
import { Booking } from '../types';
import { SERVICES, BUSINESS_INFO } from '../data';
import { Language, TranslationSet } from '../translations';
import { useAuth } from '../context/AuthContext';
import OffersAdmin from '../pages/admin/Offers';

interface OwnerDashboardProps {
  onClose: () => void;
  t: TranslationSet;
  currentLanguage: Language;
  initialTab?: 'user' | 'admin';
}

type AuthType = 'user' | 'admin';

export default function OwnerDashboard({ onClose, t, currentLanguage, initialTab }: OwnerDashboardProps) {
  // Login Type Selection state
  const [activeTab, setActiveTab] = useState<AuthType>(initialTab || 'user');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const { 
    isAdmin: isAdminAuthenticated, 
    isUser: isUserAuthenticated, 
    userPhone: loggedInUserPhone, 
    loginAdmin, 
    loginUser, 
    logout 
  } = useAuth();

  // Admin Authentication State
  const [passcode, setPasscode] = useState('');
  const [adminError, setAdminError] = useState('');

  // User Authentication State
  const [userPhone, setUserPhone] = useState('');
  const [userError, setUserError] = useState('');

  // Admin passcode change states
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    const savedPass = localStorage.getItem('neelakanta_admin_passcode') || localStorage.getItem('neelkanth_admin_passcode') || '9963';
    
    if (currentPass !== savedPass) {
      setPasswordError('The current password you entered is incorrect.');
      return;
    }

    if (newPass.length < 4) {
      setPasswordError('New passcode must be at least 4 characters/digits long.');
      return;
    }

    if (newPass !== confirmPass) {
      setPasswordError('New passcode and confirmation passcode do not match.');
      return;
    }

    localStorage.setItem('neelakanta_admin_passcode', newPass);
    setPasswordSuccess('Admin passcode successfully updated! Use your new passcode for future logins.');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  // General Booking Data
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Load bookings database
  const loadBookings = () => {
    let existingStr = localStorage.getItem('neelakanta_bookings');
    if (!existingStr) {
      existingStr = localStorage.getItem('neelkanth_bookings');
    }
    let existing: Booking[] = existingStr ? JSON.parse(existingStr) : [];

    // Check if we've already initialized the data seed once
    const isSeeded = localStorage.getItem('neelakanta_bookings_seeded') === 'true';

    // Seed realistic initial mock bookings ONLY on very first load to prevent deleted items from coming back
    if (!isSeeded && existing.length === 0) {
      const mockBookings: Booking[] = [
        {
          id: "BK-8834",
          customerName: "Siddarth Kasuba",
          phone: "9963004478",
          vehicleBrand: "Hyundai",
          vehicleModel: "Creta SX",
          serviceId: "general-service",
          serviceName: "General Car Service",
          preferredDate: "2026-07-10",
          message: "Periodic 40,000km service. Also check front suspension squeak sound on speed bumps.",
          status: "Confirmed",
          createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
        },
        {
          id: "BK-4211",
          customerName: "Ramesh Naidu",
          phone: "8309960893",
          vehicleBrand: "Mahindra",
          vehicleModel: "XUV700",
          serviceId: "car-painting",
          serviceName: "Premium Car Painting",
          preferredDate: "2026-07-12",
          message: "Left rear door scraped. Need complete panel repaint and computerized color match.",
          status: "Pending",
          createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
        },
        {
          id: "BK-1980",
          customerName: "Dr. Ananya Reddy",
          phone: "9848012345",
          vehicleBrand: "Honda",
          vehicleModel: "City",
          serviceId: "wheel-alignment",
          serviceName: "Wheel Alignment",
          preferredDate: "2026-07-09",
          message: "Steering pulls slightly to the left at high speeds. Wheel alignment and dynamic balance required.",
          status: "Completed",
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
        }
      ];
      localStorage.setItem('neelakanta_bookings', JSON.stringify(mockBookings));
      localStorage.setItem('neelkanth_bookings', JSON.stringify(mockBookings));
      localStorage.setItem('neelakanta_bookings_seeded', 'true');
      existing = mockBookings;
    } else if (!isSeeded && existing.length > 0) {
      // If there's already data from a previous session, mark as seeded to prevent future auto-reseeding if everything is deleted
      localStorage.setItem('neelakanta_bookings_seeded', 'true');
    }
    setBookings(existing);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // Admin Authentication Handler
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPass = passcode.trim().toLowerCase();
    const savedPass = localStorage.getItem('neelakanta_admin_passcode') || localStorage.getItem('neelkanth_admin_passcode') || '9963';
    // Venu Passcode: dynamic + developer backdoors
    if (cleanPass === savedPass || cleanPass === 'venu' || cleanPass === '1234') {
      await loginAdmin(cleanPass);
      setAdminError('');
    } else {
      setAdminError(currentLanguage === 'hindi' ? 'गलत पासकोड।' : 'Incorrect passcode.');
    }
  };

  // User Authentication Handler
  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = userPhone.replace(/\s+/g, '').trim();
    if (cleanPhone.length < 10) {
      setUserError(currentLanguage === 'hindi' ? 'कृपया वैध 10-अंकीय मोबाइल नंबर दर्ज करें।' : 'Please enter a valid 10-digit mobile number.');
      return;
    }

    await loginUser(cleanPhone);
    setUserError('');
  };

  const bypassAdminLogin = async () => {
    const savedPass = localStorage.getItem('neelakanta_admin_passcode') || localStorage.getItem('neelkanth_admin_passcode') || '9963';
    await loginAdmin(savedPass);
    setAdminError('');
  };

  const handleLogout = async () => {
    await logout();
    setPasscode('');
    setUserPhone('');
  };

  // Update Booking Status (CRM Admin capability)
  const updateStatus = (id: string, newStatus: Booking['status']) => {
    const updated = bookings.map(b => {
      if (b.id === id) {
        return { ...b, status: newStatus };
      }
      return b;
    });
    localStorage.setItem('neelakanta_bookings', JSON.stringify(updated));
    localStorage.setItem('neelkanth_bookings', JSON.stringify(updated));
    setBookings(updated);
    window.dispatchEvent(new Event('storage'));
  };

  // Delete Booking (CRM Admin capability)
  const deleteBooking = (id: string) => {
    const confirmMessage = currentLanguage === 'hindi' 
      ? "क्या आप निश्चित रूप से इस बुकिंग रिकॉर्ड को हटाना चाहते हैं?" 
      : "Are you sure you want to delete this booking record from CRM?";
    if (window.confirm(confirmMessage)) {
      const filtered = bookings.filter(b => b.id !== id);
      localStorage.setItem('neelakanta_bookings', JSON.stringify(filtered));
      localStorage.setItem('neelkanth_bookings', JSON.stringify(filtered));
      setBookings(filtered);
      window.dispatchEvent(new Event('storage'));
    }
  };

  // Reset Seeding (CRM Admin capability)
  const handleResetData = () => {
    localStorage.removeItem('neelakanta_bookings');
    localStorage.removeItem('neelkanth_bookings');
    localStorage.removeItem('neelakanta_bookings_seeded');
    loadBookings();
  };

  // --- Alerts & Notifications CRM Logic ---
  const [adminActiveSection, setAdminActiveSection] = useState<'bookings' | 'offers' | 'alerts' | 'password'>('bookings');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [liveToasts, setLiveToasts] = useState<any[]>([]);
  const [referrals, setReferrals] = useState<any[]>([]);
  const [isMuted, setIsMuted] = useState(false);

  // Synthesize a high-quality workshop alert chime
  const playNotificationSound = () => {
    if (isMuted) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const audioCtx = new AudioContextClass();
      
      // Chime note 1 (E6)
      const osc1 = audioCtx.createOscillator();
      const gain1 = audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1318.51, audioCtx.currentTime); // E6
      gain1.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      osc1.connect(gain1);
      gain1.connect(audioCtx.destination);
      osc1.start();
      osc1.stop(audioCtx.currentTime + 0.15);

      // Chime note 2 (A6) with slight offset
      setTimeout(() => {
        const osc2 = audioCtx.createOscillator();
        const gain2 = audioCtx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1760.00, audioCtx.currentTime); // A6
        gain2.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
        osc2.connect(gain2);
        gain2.connect(audioCtx.destination);
        osc2.start();
        osc2.stop(audioCtx.currentTime + 0.25);
      }, 70);
    } catch (e) {
      console.log("Audio feedback skipped or blocked:", e);
    }
  };

  const loadNotificationsAndReferrals = () => {
    const existingStr = localStorage.getItem('neelakanta_notifications') || localStorage.getItem('neelkanth_notifications');
    let existingAlerts = existingStr ? JSON.parse(existingStr) : [];

    const existingRefStr = localStorage.getItem('neelakanta_referrals') || localStorage.getItem('neelkanth_referrals');
    let existingRefs = existingRefStr ? JSON.parse(existingRefStr) : [];

    // Seed default notifications and referrals if completely empty
    if (existingAlerts.length === 0) {
      existingAlerts = [
        {
          id: "ALT-948121",
          type: "referral",
          title: "New Referral Registered",
          message: "Customer Siddarth Kasuba (+91 9963004478) generated referral code REF-SIDD-4478.",
          timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString(),
          isRead: false,
          metadata: { referrerName: "Siddarth Kasuba", referrerPhone: "9963004478", code: "REF-SIDD-4478" }
        },
        {
          id: "ALT-482103",
          type: "booking",
          title: "New Booking Submitted",
          message: "Customer Ramesh Naidu requested Premium Car Painting for Mahindra XUV700.",
          timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
          isRead: true,
          metadata: { customerName: "Ramesh Naidu", vehicleBrand: "Mahindra", vehicleModel: "XUV700", serviceName: "Premium Car Painting" }
        }
      ];
      localStorage.setItem('neelakanta_notifications', JSON.stringify(existingAlerts));
    }

    if (existingRefs.length === 0) {
      existingRefs = [
        {
          id: "REF-1002",
          referrerName: "Siddarth Kasuba",
          referrerPhone: "9963004478",
          code: "REF-SIDD-4478",
          createdAt: new Date(Date.now() - 3600000 * 1.5).toISOString()
        }
      ];
      localStorage.setItem('neelakanta_referrals', JSON.stringify(existingRefs));
    }

    setNotifications(existingAlerts);
    setReferrals(existingRefs);
  };

  // Helper to trigger alert programmatically
  const triggerAlert = (type: 'booking' | 'referral', details: any) => {
    const newAlert = {
      id: "ALT-" + Math.floor(100000 + Math.random() * 900000),
      type,
      title: type === 'booking' ? 'New Booking Submitted' : 'New Referral Registered',
      message: type === 'booking'
        ? `Customer ${details.customerName} requested ${details.serviceName} for their ${details.vehicleBrand} ${details.vehicleModel}.`
        : `Customer ${details.referrerName} (+91 ${details.referrerPhone}) generated referral code: ${details.code}.`,
      timestamp: new Date().toISOString(),
      isRead: false,
      metadata: details
    };

    const stored = localStorage.getItem('neelakanta_notifications') || localStorage.getItem('neelkanth_notifications');
    const alertsList = stored ? JSON.parse(stored) : [];
    alertsList.unshift(newAlert);
    localStorage.setItem('neelakanta_notifications', JSON.stringify(alertsList));
    setNotifications(alertsList);

    // Show live toast banner at the top/side
    setLiveToasts(prev => [newAlert, ...prev]);
    playNotificationSound();

    // Auto dismiss toast after 6 seconds
    setTimeout(() => {
      setLiveToasts(prev => prev.filter(t => t.id !== newAlert.id));
    }, 6000);
  };

  const handleMarkAllRead = () => {
    const updated = notifications.map(n => ({ ...n, isRead: true }));
    localStorage.setItem('neelakanta_notifications', JSON.stringify(updated));
    setNotifications(updated);
  };

  const handleClearNotifications = () => {
    localStorage.setItem('neelakanta_notifications', JSON.stringify([]));
    setNotifications([]);
  };

  // Live Simulation Actions
  const handleSimulateBooking = () => {
    const names = ["Vijay Prasad", "Sunita Rao", "Karan Johar", "Rahul Dravid", "Meera Sen", "Vikram Rathore"];
    const phones = ["9849012345", "9123456789", "8309012456", "7702213456", "9948834012", "9440123456"];
    const brands = ["Hyundai", "Suzuki", "Kia", "Honda", "BMW", "Toyota"];
    const models = ["i20 Asta", "Swift Dzire", "Seltos GTX", "Civic", "3-Series", "Fortuner"];
    const index = Math.floor(Math.random() * names.length);
    const serviceIndex = Math.floor(Math.random() * SERVICES.length);

    const randomBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: names[index],
      phone: phones[index],
      vehicleBrand: brands[index],
      vehicleModel: models[index],
      serviceId: SERVICES[serviceIndex].id,
      serviceName: SERVICES[serviceIndex].title,
      preferredDate: "2026-07-15",
      message: "Please run diagnostic scanning. Check AC filter.",
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    // Save mock booking to list
    const storedBookings = localStorage.getItem('neelakanta_bookings') || localStorage.getItem('neelkanth_bookings');
    const bList = storedBookings ? JSON.parse(storedBookings) : [];
    bList.unshift(randomBooking);
    localStorage.setItem('neelakanta_bookings', JSON.stringify(bList));
    localStorage.setItem('neelkanth_bookings', JSON.stringify(bList));
    setBookings(bList);
    window.dispatchEvent(new Event('storage'));

    // Trigger notification
    triggerAlert('booking', randomBooking);
  };

  const handleSimulateReferral = () => {
    const names = ["Harsha Vardhan", "Nikhil Kumar", "Divya Teja", "Priya Nair", "Suresh G", "Kiran Shah"];
    const phones = ["9988776655", "8877665544", "7766554433", "9012345678", "9876543210", "9900112233"];
    const index = Math.floor(Math.random() * names.length);
    const code = `REF-${names[index].toUpperCase().slice(0, 4)}-${phones[index].slice(-4)}`;

    const randomReferral = {
      id: `REF-${Math.floor(1000 + Math.random() * 9000)}`,
      referrerName: names[index],
      referrerPhone: phones[index],
      code,
      createdAt: new Date().toISOString()
    };

    // Save mock referral to list
    const storedReferrals = localStorage.getItem('neelakanta_referrals') || localStorage.getItem('neelkanth_referrals');
    const rList = storedReferrals ? JSON.parse(storedReferrals) : [];
    rList.unshift(randomReferral);
    localStorage.setItem('neelakanta_referrals', JSON.stringify(rList));
    setReferrals(rList);

    // Trigger notification
    triggerAlert('referral', randomReferral);
  };

  // Sync listener to monitor localStorage updates across tabs or pages in real time
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if ((e.key === 'neelakanta_bookings' || e.key === 'neelkanth_bookings') && e.newValue) {
        try {
          const newList = JSON.parse(e.newValue);
          const oldList = e.oldValue ? JSON.parse(e.oldValue) : [];
          
          // Always keep the list of bookings in state in sync (for updates, deletions, or additions)
          setBookings(newList);

          if (newList.length > oldList.length) {
            // New booking added! Trigger alert
            const addedItem = newList[0];
            triggerAlert('booking', addedItem);
          }
        } catch (err) {
          console.error("Error reading updated bookings storage", err);
        }
      }
      if ((e.key === 'neelakanta_referrals' || e.key === 'neelkanth_referrals') && e.newValue) {
        try {
          const newList = JSON.parse(e.newValue);
          const oldList = e.oldValue ? JSON.parse(e.oldValue) : [];
          if (newList.length > oldList.length) {
            // New referral generated! Trigger alert
            const addedItem = newList[0];
            triggerAlert('referral', addedItem);
            setReferrals(newList);
          }
        } catch (err) {
          console.error("Error reading updated referrals storage", err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [bookings, referrals]);

  useEffect(() => {
    loadNotificationsAndReferrals();
  }, []);

  const [offers, setOffers] = useState<any[]>([]);

  // Create offer form states
  const [newOfferTitle, setNewOfferTitle] = useState('');
  const [newOfferDesc, setNewOfferDesc] = useState('');
  const [newOfferDiscount, setNewOfferDiscount] = useState('');
  const [newOfferCode, setNewOfferCode] = useState('');
  const [newOfferExpiry, setNewOfferExpiry] = useState('');
  const [newOfferBadge, setNewOfferBadge] = useState('');
  const [newOfferIsBumper, setNewOfferIsBumper] = useState(false);

  // Load offers from localStorage
  const loadOffers = () => {
    const existingStr = localStorage.getItem('neelakanta_offers') || localStorage.getItem('neelkanth_offers');
    let existing = existingStr ? JSON.parse(existingStr) : [];
    
    // Seed default offers if empty
    if (existing.length === 0) {
      existing = [
        {
          id: "OFF-BUMP-01",
          title: "NEELAKANTA MEGA BUMPER FESTIVAL PACK",
          description: "Our supreme bumper deal! Complete multi-point mechanical diagnostic review, computerized 3D wheel alignment, high-pressure foam wash, liquid wax polish, engine oil level correction, AC service, and full interior dashboard dresser treatment.",
          discount: "FLAT 50% OFF (Only ₹2,499)",
          code: "BUMPER50",
          isBumper: true,
          expiryDate: new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0], // 60 days duration
          badge: "BUMPER SPECIAL",
          createdAt: new Date().toISOString()
        },
        {
          id: "OFF-SHINE-20",
          title: "Ceramic Paint Protection & Detailing",
          description: "Dual-layer hydrophobic ceramic coat application. Prevents scratches, UV fading, and provides deep mirror gloss glaze. Comes with an official 1-year workshop warranty sheet signed by Venu.",
          discount: "20% FLAT DISCOUNT",
          code: "SHINE20",
          isBumper: false,
          expiryDate: "2026-07-31",
          badge: "BODY & PAINT",
          createdAt: new Date().toISOString()
        },
        {
          id: "OFF-WHEEL-10",
          title: "Laser Alignment & Dynamic balancing",
          description: "Get pristine high-speed stability and prolong tire life. Includes computerized laser calibration, dynamic rim weight balancing, suspension health check, and tire pressure adjustment.",
          discount: "FREE WHEEL BALANCING & WEIGHTS",
          code: "ALIGNFREE",
          isBumper: false,
          expiryDate: "2026-07-25",
          badge: "WHEEL & TYRES",
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('neelakanta_offers', JSON.stringify(existing));
    } else {
      // Map any outdated brand names in existing loaded defaults
      existing = existing.map((o: any) => {
        if (o.title === "NEELKANTH MEGA BUMPER FESTIVAL PACK" || o.title === "NEELAKANTA MEGA BUMPER FESTIVAL PACK") {
          const targetExp = new Date(new Date(o.createdAt || Date.now()).getTime() + 60 * 86400000).toISOString().split('T')[0];
          return { 
            ...o, 
            title: "NEELAKANTA MEGA BUMPER FESTIVAL PACK",
            expiryDate: targetExp
          };
        }
        return o;
      });
    }
    setOffers(existing);
  };

  useEffect(() => {
    loadOffers();
  }, []);

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOfferTitle.trim() || !newOfferDesc.trim() || !newOfferDiscount.trim() || !newOfferCode.trim()) {
      alert("Please fill out all required fields.");
      return;
    }

    const newOffer = {
      id: "OFF-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      title: newOfferTitle.trim(),
      description: newOfferDesc.trim(),
      discount: newOfferDiscount.trim(),
      code: newOfferCode.trim().toUpperCase(),
      isBumper: newOfferIsBumper,
      expiryDate: newOfferExpiry || "2026-12-31",
      badge: newOfferBadge.trim().toUpperCase() || "PROMO",
      createdAt: new Date().toISOString()
    };

    let updatedOffers = [...offers];
    if (newOfferIsBumper) {
      // If setting this one as bumper, un-bumper the others
      updatedOffers = updatedOffers.map(o => ({ ...o, isBumper: false }));
    }
    updatedOffers.push(newOffer);

    localStorage.setItem('neelakanta_offers', JSON.stringify(updatedOffers));
    setOffers(updatedOffers);

    // Reset form
    setNewOfferTitle('');
    setNewOfferDesc('');
    setNewOfferDiscount('');
    setNewOfferCode('');
    setNewOfferExpiry('');
    setNewOfferBadge('');
    setNewOfferIsBumper(false);
  };

  const handleDeleteOffer = (id: string) => {
    if (!window.confirm("Are you sure you want to delete this offer?")) {
      return;
    }
    const updated = offers.filter(o => o.id !== id);
    localStorage.setItem('neelakanta_offers', JSON.stringify(updated));
    setOffers(updated);
  };

  // Filter Bookings for Admin view
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.phone.includes(searchTerm) ||
                          b.vehicleBrand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.vehicleModel.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter Bookings for Logged-In User
  const userBookings = bookings.filter(b => b.phone.replace(/\s+/g, '').includes(loggedInUserPhone));

  // Stats Counters
  const totalCount = bookings.length;
  const pendingCount = bookings.filter(b => b.status === 'Pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;
  const completedCount = bookings.filter(b => b.status === 'Completed').length;

  return (
    <section className="min-h-screen bg-zinc-950 text-white flex flex-col pt-10 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/5 blur-3xl rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/5 blur-3xl rounded-full" />
      
      {/* Laser-style bright red diagonal neon glowing accents */}
      <div className="absolute left-[-50px] top-[15%] w-1.5 h-64 bg-red-600 rotate-[35deg] blur-[1px] shadow-[0_0_20px_#e31e24] opacity-75 hidden md:block" />
      <div className="absolute right-[-50px] top-[25%] w-1.5 h-64 bg-red-600 -rotate-[35deg] blur-[1px] shadow-[0_0_20px_#e31e24] opacity-75 hidden md:block" />
      <div className="absolute left-[-20px] top-[10%] w-1 h-32 bg-red-600 rotate-[40deg] blur-[2px] shadow-[0_0_12px_#e31e24] opacity-50 block md:hidden" />
      <div className="absolute right-[-20px] top-[20%] w-1 h-32 bg-red-600 -rotate-[40deg] blur-[2px] shadow-[0_0_12px_#e31e24] opacity-50 block md:hidden" />

      {/* 1. DUAL LOGIN AUTH GATE SCREEN */}
      {(activeTab === 'user' && !isUserAuthenticated) || (activeTab === 'admin' && !isAdminAuthenticated) ? (
        activeTab === 'user' ? (
          /* DEDICATED USER LOGIN PAGE */
          <div className="flex-1 flex flex-col items-center justify-center relative z-10 py-6 max-w-xl w-full mx-auto animate-fadeIn">
            {/* Top right staff toggle switch */}
            <div className="absolute top-0 right-0 z-20">
              <button
                onClick={() => setActiveTab('admin')}
                className="px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-[11px] font-bold text-yellow-400 hover:text-yellow-300 hover:border-yellow-400/30 transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Staff CRM Panel</span> ➔
              </button>
            </div>

            {/* Logo & Brand Section */}
            <div className="flex flex-col items-center justify-center text-center pb-2 pt-6 w-full">
              {/* Premium geometric stylized Monogram */}
              <div className="flex items-center justify-center mb-1">
                <svg className="h-16 w-auto filter drop-shadow-[0_0_20px_rgba(227,30,36,0.25)] select-none" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Stylized White N */}
                  <path d="M38 45 V15 L46 11 V41 Z" fill="white" />
                  <path d="M46 11 L62 29 L55 33 L39 15 Z" fill="white" />
                  {/* Stylized Red M */}
                  <path d="M58 17 L72 33 L65 37 L51 21 Z" fill="#E31E24" />
                  <path d="M72 33 L86 11 L93 15 L79 37 Z" fill="#E31E24" />
                  <path d="M86 11 L93 15 V45 L86 41 Z" fill="#E31E24" />
                </svg>
              </div>

              {/* NEELAKANTA Heading */}
              <h1 className="text-white font-extrabold tracking-[0.16em] text-2xl sm:text-3xl font-sans uppercase">
                NEELAKANTA
              </h1>

              {/* MOTORS sub-heading with double line divider */}
              <div className="flex items-center justify-center gap-3.5 w-full mt-1.5 px-6">
                <div className="h-[1.5px] flex-1 max-w-[60px] bg-[#E31E24]" />
                <span className="text-[#E31E24] font-extrabold tracking-[0.25em] text-xs sm:text-sm">MOTORS</span>
                <div className="h-[1.5px] flex-1 max-w-[60px] bg-[#E31E24]" />
              </div>
            </div>

            {/* Sleek Premium Car Silhouette */}
            <div className="w-full max-w-[340px] sm:max-w-[400px] mx-auto -mt-2 -mb-2 relative">
              <svg className="w-full h-auto mx-auto select-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]" viewBox="0 0 400 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Ground reflection & shadows */}
                <ellipse cx="200" cy="164" rx="150" ry="10" fill="rgba(0,0,0,0.9)" filter="blur(6px)" />
                <ellipse cx="100" cy="161" rx="35" ry="3" fill="rgba(0,0,0,0.6)" filter="blur(3px)" />
                <ellipse cx="300" cy="161" rx="35" ry="3" fill="rgba(0,0,0,0.6)" filter="blur(3px)" />

                {/* Car body silhouette front view */}
                {/* Roof and windshield */}
                <path d="M145 45 C155 35, 175 30, 200 30 C225 30, 245 35, 255 45 C270 58, 285 75, 292 88 C295 93, 290 94, 285 94 C260 94, 140 94, 115 94 C110 94, 105 93, 108 88 C115 75, 130 58, 145 45 Z" fill="#08080a" stroke="#1c1c22" strokeWidth="1" />
                {/* Windshield glass highlight / reflection */}
                <path d="M152 48 C162 40, 180 36, 200 36 C220 36, 238 40, 248 48 C260 59, 272 74, 278 84 C255 86, 145 86, 122 84 C128 74, 140 59, 152 48 Z" fill="url(#windshield-grad)" opacity="0.15" />

                {/* Side mirrors */}
                <path d="M102 86 C90 85, 75 88, 70 93 C68 95, 70 98, 78 98 C88 98, 98 94, 104 90 Z" fill="#08080a" stroke="#1c1c22" strokeWidth="1" />
                <path d="M298 86 C310 85, 325 88, 330 93 C332 95, 330 98, 322 98 C312 98, 302 94, 296 90 Z" fill="#08080a" stroke="#1c1c22" strokeWidth="1" />

                {/* Main Bonnet / Hood */}
                <path d="M102 92 C120 92, 280 92, 298 92 C312 92, 328 100, 338 112 C345 120, 348 128, 346 134 C342 144, 325 146, 310 148 C280 151, 120 151, 90 148 C75 146, 58 144, 54 134 C52 128, 55 120, 62 112 C72 100, 88 92, 102 92 Z" fill="#0c0c0f" stroke="#22222a" strokeWidth="1.2" />

                {/* Bonnet Crease Lines */}
                <path d="M155 92 C165 110, 172 125, 174 132" stroke="#1c1c22" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M245 92 C235 110, 228 125, 226 132" stroke="#1c1c22" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M125 92 C135 112, 142 128, 145 136" stroke="#16161c" strokeWidth="1" strokeLinecap="round" />
                <path d="M275 92 C265 112, 258 128, 255 136" stroke="#16161c" strokeWidth="1" strokeLinecap="round" />

                {/* Singleframe Grille */}
                <path d="M160 128 C175 127, 225 127, 240 128 C248 128, 252 135, 248 152 C245 162, 235 166, 200 166 C165 166, 155 162, 152 152 C148 135, 152 128, 160 128 Z" fill="#050507" stroke="#181822" strokeWidth="1.5" />
                {/* Grille Mesh/Slats */}
                <line x1="158" y1="135" x2="242" y2="135" stroke="#121218" strokeWidth="1" />
                <line x1="154" y1="142" x2="246" y2="142" stroke="#121218" strokeWidth="1" />
                <line x1="151" y1="149" x2="249" y2="149" stroke="#121218" strokeWidth="1" />
                <line x1="152" y1="156" x2="248" y2="156" stroke="#121218" strokeWidth="1" />

                {/* Sleek Headlights with white/blue neon glow */}
                {/* Left Headlight */}
                <path d="M85 112 C100 114, 122 119, 145 127 C135 129, 110 127, 95 122 C88 119, 83 115, 85 112 Z" fill="#0a0a0f" stroke="#22222b" strokeWidth="1" />
                <path d="M88 113.5 C102 115.5, 122 120.5, 142 126" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" filter="url(#headlight-glow)" />
                <path d="M88 113.5 C102 115.5, 122 120.5, 142 126" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />

                {/* Right Headlight */}
                <path d="M315 112 C300 114, 278 119, 255 127 C265 129, 290 127, 305 122 C312 119, 317 115, 315 112 Z" fill="#0a0a0f" stroke="#22222b" strokeWidth="1" />
                <path d="M312 113.5 C298 115.5, 278 120.5, 258 126" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" filter="url(#headlight-glow)" />
                <path d="M312 113.5 C298 115.5, 278 120.5, 258 126" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />

                {/* Grille Rings / Emblem */}
                <circle cx="191" cy="136" r="4.5" stroke="#1c1c24" strokeWidth="1" fill="none" />
                <circle cx="197" cy="136" r="4.5" stroke="#1c1c24" strokeWidth="1" fill="none" />
                <circle cx="203" cy="136" r="4.5" stroke="#1c1c24" strokeWidth="1" fill="none" />
                <circle cx="209" cy="136" r="4.5" stroke="#1c1c24" strokeWidth="1" fill="none" />

                {/* Lower air intakes */}
                <path d="M68 132 C78 132, 95 135, 110 144 C100 154, 85 158, 72 154 C65 152, 64 140, 68 132 Z" fill="#050507" stroke="#16161f" strokeWidth="1" />
                <path d="M72 135 C82 136, 92 142, 102 148" stroke="#121218" strokeWidth="1.5" />
                <path d="M332 132 C322 132, 305 135, 290 144 C300 154, 315 158, 328 154 C335 152, 336 140, 332 132 Z" fill="#050507" stroke="#16161f" strokeWidth="1" />
                <path d="M328 135 C318 136, 308 142, 298 148" stroke="#121218" strokeWidth="1.5" />

                {/* Ground splitter */}
                <path d="M85 156 C120 159, 280 159, 315 156 C325 156, 330 160, 315 162 C280 164, 120 164, 85 162 C70 160, 75 156, 85 156 Z" fill="#14141a" />

                <defs>
                  <linearGradient id="windshield-grad" x1="200" y1="30" x2="200" y2="94" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>

                  <filter id="headlight-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3.5" result="blur1" />
                    <feGaussianBlur stdDeviation="7" result="blur2" />
                    <feMerge>
                      <feMergeNode in="blur2" />
                      <feMergeNode in="blur1" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>

            {/* Bottom Sheet White Card */}
            <div className="bg-white rounded-[32px] p-6 sm:p-8 text-zinc-900 shadow-2xl w-full max-w-[390px] mx-auto relative z-10 border border-zinc-100">
              <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 font-sans">
                  Welcome Back
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">
                  Login to continue
                </p>
              </div>

              <form onSubmit={handleUserLogin} className="space-y-5">
                {/* Custom Phone wrapper */}
                <div className="flex items-center bg-white border border-zinc-200 rounded-2xl overflow-hidden focus-within:border-zinc-400 focus-within:ring-4 focus-within:ring-zinc-100 transition-all">
                  
                  {/* Country dial code box */}
                  <div className="flex items-center gap-1.5 px-4 py-3.5 bg-zinc-50/50 cursor-pointer hover:bg-zinc-100/50 transition-colors select-none shrink-0">
                    <span className="text-sm font-extrabold text-zinc-800 tracking-tight">+91</span>
                    <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                  </div>
                  
                  {/* Thin vertical separator */}
                  <div className="w-[1px] h-7 bg-zinc-200" />

                  {/* Input entry with phone icon */}
                  <div className="flex-1 flex items-center gap-2 px-3">
                    <Phone className="w-4 h-4 text-zinc-400 shrink-0" />
                    <input
                      type="tel"
                      required
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="Enter your phone number"
                      className="w-full bg-transparent border-none py-3 px-1 text-sm sm:text-base font-semibold text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-0"
                      maxLength={10}
                    />
                  </div>
                </div>

                {userError && (
                  <p className="text-xs text-red-600 font-semibold text-center font-mono">
                    {userError}
                  </p>
                )}

                {/* Continue button styling with inline arrow right */}
                <button
                  type="submit"
                  className="w-full bg-[#E31E24] hover:bg-red-700 active:scale-[0.99] text-white font-bold py-4 px-6 rounded-2xl text-sm sm:text-base transition-all duration-150 cursor-pointer flex items-center justify-between shadow-lg shadow-red-600/10 hover:shadow-red-600/20"
                >
                  <span className="mx-auto pl-4">Continue</span>
                  <ArrowRight className="w-5 h-5 shrink-0" />
                </button>
              </form>

              {/* Secure footer badge */}
              <div className="mt-6 pt-1 flex items-center justify-center gap-1.5 text-zinc-500">
                <ShieldCheck className="w-4.5 h-4.5 text-[#E31E24] shrink-0" />
                <span className="text-[11px] sm:text-xs font-semibold tracking-tight text-zinc-500">
                  Your data is safe and secure with us
                </span>
              </div>
            </div>

          </div>
        ) : (
          /* DEDICATED ADMIN LOGIN PAGE WITH SAME VISUAL STYLE */
          <div className="flex-1 flex flex-col items-center justify-center relative z-10 py-6 max-w-xl w-full mx-auto animate-fadeIn">
            {/* Top right customer toggle switch */}
            <div className="absolute top-0 right-0 z-20">
              <button
                onClick={() => setActiveTab('user')}
                className="px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-[11px] font-bold text-red-400 hover:text-red-300 hover:border-red-400/30 transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Customer Tracking</span> ➔
              </button>
            </div>

            {/* Logo & Brand Section */}
            <div className="flex flex-col items-center justify-center text-center pb-2 pt-6 w-full">
              {/* Premium geometric stylized Monogram */}
              <div className="flex items-center justify-center mb-1">
                <svg className="h-16 w-auto filter drop-shadow-[0_0_20px_rgba(227,30,36,0.25)] select-none" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Stylized White N */}
                  <path d="M38 45 V15 L46 11 V41 Z" fill="white" />
                  <path d="M46 11 L62 29 L55 33 L39 15 Z" fill="white" />
                  {/* Stylized Red M */}
                  <path d="M58 17 L72 33 L65 37 L51 21 Z" fill="#E31E24" />
                  <path d="M72 33 L86 11 L93 15 L79 37 Z" fill="#E31E24" />
                  <path d="M86 11 L93 15 V45 L86 41 Z" fill="#E31E24" />
                </svg>
              </div>

              {/* NEELAKANTA Heading */}
              <h1 className="text-white font-extrabold tracking-[0.16em] text-2xl sm:text-3xl font-sans uppercase">
                NEELAKANTA
              </h1>

              {/* MOTORS sub-heading with double line divider */}
              <div className="flex items-center justify-center gap-3.5 w-full mt-1.5 px-6">
                <div className="h-[1.5px] flex-1 max-w-[60px] bg-[#E31E24]" />
                <span className="text-[#E31E24] font-extrabold tracking-[0.25em] text-xs sm:text-sm">MOTORS</span>
                <div className="h-[1.5px] flex-1 max-w-[60px] bg-[#E31E24]" />
              </div>
            </div>

            {/* Sleek Premium Car Silhouette */}
            <div className="w-full max-w-[340px] sm:max-w-[400px] mx-auto -mt-2 -mb-2 relative">
              <svg className="w-full h-auto mx-auto select-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.7)]" viewBox="0 0 400 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Ground reflection & shadows */}
                <ellipse cx="200" cy="164" rx="150" ry="10" fill="rgba(0,0,0,0.9)" filter="blur(6px)" />
                <ellipse cx="100" cy="161" rx="35" ry="3" fill="rgba(0,0,0,0.6)" filter="blur(3px)" />
                <ellipse cx="300" cy="161" rx="35" ry="3" fill="rgba(0,0,0,0.6)" filter="blur(3px)" />

                {/* Car body silhouette front view */}
                <path d="M145 45 C155 35, 175 30, 200 30 C225 30, 245 35, 255 45 C270 58, 285 75, 292 88 C295 93, 290 94, 285 94 C260 94, 140 94, 115 94 C110 94, 105 93, 108 88 C115 75, 130 58, 145 45 Z" fill="#08080a" stroke="#1c1c22" strokeWidth="1" />
                <path d="M152 48 C162 40, 180 36, 200 36 C220 36, 238 40, 248 48 C260 59, 272 74, 278 84 C255 86, 145 86, 122 84 C128 74, 140 59, 152 48 Z" fill="url(#windshield-grad)" opacity="0.15" />

                {/* Side mirrors */}
                <path d="M102 86 C90 85, 75 88, 70 93 C68 95, 70 98, 78 98 C88 98, 98 94, 104 90 Z" fill="#08080a" stroke="#1c1c22" strokeWidth="1" />
                <path d="M298 86 C310 85, 325 88, 330 93 C332 95, 330 98, 322 98 C312 98, 302 94, 296 90 Z" fill="#08080a" stroke="#1c1c22" strokeWidth="1" />

                {/* Main Bonnet / Hood */}
                <path d="M102 92 C120 92, 280 92, 298 92 C312 92, 328 100, 338 112 C345 120, 348 128, 346 134 C342 144, 325 146, 310 148 C280 151, 120 151, 90 148 C75 146, 58 144, 54 134 C52 128, 55 120, 62 112 C72 100, 88 92, 102 92 Z" fill="#0c0c0f" stroke="#22222a" strokeWidth="1.2" />

                {/* Bonnet Crease Lines */}
                <path d="M155 92 C165 110, 172 125, 174 132" stroke="#1c1c22" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M245 92 C235 110, 228 125, 226 132" stroke="#1c1c22" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M125 92 C135 112, 142 128, 145 136" stroke="#16161c" strokeWidth="1" strokeLinecap="round" />
                <path d="M275 92 C265 112, 258 128, 255 136" stroke="#16161c" strokeWidth="1" strokeLinecap="round" />

                {/* Singleframe Grille */}
                <path d="M160 128 C175 127, 225 127, 240 128 C248 128, 252 135, 248 152 C245 162, 235 166, 200 166 C165 166, 155 162, 152 152 C148 135, 152 128, 160 128 Z" fill="#050507" stroke="#181822" strokeWidth="1.5" />
                <line x1="158" y1="135" x2="242" y2="135" stroke="#121218" strokeWidth="1" />
                <line x1="154" y1="142" x2="246" y2="142" stroke="#121218" strokeWidth="1" />
                <line x1="151" y1="149" x2="249" y2="149" stroke="#121218" strokeWidth="1" />
                <line x1="152" y1="156" x2="248" y2="156" stroke="#121218" strokeWidth="1" />

                {/* Sleek Headlights */}
                <path d="M85 112 C100 114, 122 119, 145 127 C135 129, 110 127, 95 122 C88 119, 83 115, 85 112 Z" fill="#0a0a0f" stroke="#22222b" strokeWidth="1" />
                <path d="M88 113.5 C102 115.5, 122 120.5, 142 126" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" filter="url(#headlight-glow)" />
                <path d="M88 113.5 C102 115.5, 122 120.5, 142 126" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />

                <path d="M315 112 C300 114, 278 119, 255 127 C265 129, 290 127, 305 122 C312 119, 317 115, 315 112 Z" fill="#0a0a0f" stroke="#22222b" strokeWidth="1" />
                <path d="M312 113.5 C298 115.5, 278 120.5, 258 126" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" filter="url(#headlight-glow)" />
                <path d="M312 113.5 C298 115.5, 278 120.5, 258 126" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" />

                {/* Emblem */}
                <circle cx="191" cy="136" r="4.5" stroke="#1c1c24" strokeWidth="1" fill="none" />
                <circle cx="197" cy="136" r="4.5" stroke="#1c1c24" strokeWidth="1" fill="none" />
                <circle cx="203" cy="136" r="4.5" stroke="#1c1c24" strokeWidth="1" fill="none" />
                <circle cx="209" cy="136" r="4.5" stroke="#1c1c24" strokeWidth="1" fill="none" />

                {/* Intakes */}
                <path d="M68 132 C78 132, 95 135, 110 144 C100 154, 85 158, 72 154 C65 152, 64 140, 68 132 Z" fill="#050507" stroke="#16161f" strokeWidth="1" />
                <path d="M72 135 C82 136, 92 142, 102 148" stroke="#121218" strokeWidth="1.5" />
                <path d="M332 132 C322 132, 305 135, 290 144 C300 154, 315 158, 328 154 C335 152, 336 140, 332 132 Z" fill="#050507" stroke="#16161f" strokeWidth="1" />
                <path d="M328 135 C318 136, 308 142, 298 148" stroke="#121218" strokeWidth="1.5" />

                {/* Ground splitter */}
                <path d="M85 156 C120 159, 280 159, 315 156 C325 156, 330 160, 315 162 C280 164, 120 164, 85 162 C70 160, 75 156, 85 156 Z" fill="#14141a" />

                <defs>
                  <linearGradient id="windshield-grad" x1="200" y1="30" x2="200" y2="94" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>

                  <filter id="headlight-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3.5" result="blur1" />
                    <feGaussianBlur stdDeviation="7" result="blur2" />
                    <feMerge>
                      <feMergeNode in="blur2" />
                      <feMergeNode in="blur1" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </div>

            {/* Bottom Sheet White Card */}
            <div className="bg-white rounded-[32px] p-6 sm:p-8 text-zinc-900 shadow-2xl w-full max-w-[390px] mx-auto relative z-10 border border-zinc-100">
              <div className="text-center mb-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-950 font-sans">
                  Staff CRM Panel
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">
                  Enter passcode to continue
                </p>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-5">
                {/* Custom Passcode wrapper */}
                <div className="flex items-center bg-white border border-zinc-200 rounded-2xl overflow-hidden focus-within:border-zinc-400 focus-within:ring-4 focus-within:ring-zinc-100 transition-all">
                  
                  {/* Lock icon box */}
                  <div className="flex items-center gap-1.5 px-4 py-3.5 bg-zinc-50/50 select-none shrink-0">
                    <Lock className="w-4 h-4 text-zinc-400 shrink-0" />
                  </div>
                  
                  {/* Thin vertical separator */}
                  <div className="w-[1px] h-7 bg-zinc-200" />

                  {/* Input entry */}
                  <div className="flex-1 flex items-center gap-2 px-3">
                    <input
                      type="password"
                      required
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="Enter 4-digit passcode"
                      className="w-full bg-transparent border-none py-3 px-1 text-sm sm:text-base font-semibold text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-0 tracking-widest text-center"
                    />
                  </div>
                </div>

                {adminError && (
                  <p className="text-xs text-red-600 font-semibold text-center font-mono">
                    {adminError}
                  </p>
                )}

                {/* Continue button styling with inline arrow right */}
                <button
                  type="submit"
                  className="w-full bg-[#E31E24] hover:bg-red-700 active:scale-[0.99] text-white font-bold py-4 px-6 rounded-2xl text-sm sm:text-base transition-all duration-150 cursor-pointer flex items-center justify-between shadow-lg shadow-red-600/10 hover:shadow-red-600/20"
                >
                  <span className="mx-auto pl-4">Authenticate</span>
                  <ArrowRight className="w-5 h-5 shrink-0" />
                </button>
              </form>

              {/* Secure footer badge */}
              <div className="mt-6 pt-1 flex items-center justify-center gap-1.5 text-zinc-500">
                <ShieldCheck className="w-4.5 h-4.5 text-[#E31E24] shrink-0" />
                <span className="text-[11px] sm:text-xs font-semibold tracking-tight text-zinc-500">
                  Authorized staff access only
                </span>
              </div>
            </div>

            {/* Sub-card bypass assist pill */}
            <div className="mt-4 text-center z-10 relative">
              <button
                type="button"
                onClick={bypassAdminLogin}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-zinc-900/60 border border-white/10 hover:border-white/20 hover:bg-zinc-900 text-zinc-400 hover:text-white rounded-full text-[10px] sm:text-xs transition-all cursor-pointer font-mono"
              >
                <span>⚡ Demo Access:</span>
                <span className="font-bold text-yellow-400">Bypass passcode</span>
              </button>
            </div>
          </div>
        )
      ) : activeTab === 'user' ? (
        
        // ==================== 2. CUSTOMER COMPREHENSIVE VIEW ====================
        <div className="max-w-4xl mx-auto w-full space-y-8 relative z-10 text-left">
          
          {/* User Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-mono">
                  CUSTOMER SERVICE TICKET PORTAL
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2 uppercase italic font-display mt-1">
                Welcome Back <span className="text-yellow-400 font-mono">+{loggedInUserPhone}</span>
              </h1>
              <p className="text-zinc-400 text-xs mt-1">
                Real-time tracking of active vehicle diagnostics, scheduled repair bays, and service logs.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLogout}
                className="bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/20 text-zinc-300 px-4 py-2.5 rounded-sm text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t.logoutButton}</span>
              </button>
              <button
                onClick={onClose}
                className="bg-red-600 hover:bg-red-700 text-white font-black px-4 py-2.5 rounded-sm text-xs uppercase tracking-widest transition-colors cursor-pointer"
              >
                {t.aboutTitle === TRANSLATIONS.hindi.aboutTitle ? 'वेबसाइट' : 'Return'}
              </button>
            </div>
          </div>

          {/* User Active Tickets Grid */}
          <div className="space-y-6">
            <h3 className="text-lg font-black uppercase tracking-wider text-white italic font-display border-l-4 border-red-600 pl-3">
              {t.yourActiveTickets} ({userBookings.length})
            </h3>

            {userBookings.length === 0 ? (
              <div className="bg-zinc-900 border border-dashed border-white/10 p-10 text-center rounded-sm space-y-4">
                <AlertTriangle className="w-10 h-10 text-yellow-400 mx-auto animate-bounce" />
                <p className="text-sm font-medium text-zinc-300 font-mono">
                  {t.noBookingsFound}
                </p>
                <button
                  onClick={onClose}
                  className="bg-red-600 hover:bg-red-700 text-white font-black px-5 py-2.5 rounded-sm text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-red-600/10"
                >
                  {t.heroCTA}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {userBookings.map((bk) => {
                  // Determine progress stage index
                  let currentStep = 0;
                  if (bk.status === 'Confirmed') currentStep = 2;
                  if (bk.status === 'Completed') currentStep = 3;
                  if (bk.status === 'Cancelled') currentStep = -1;

                  return (
                    <div key={bk.id} className="bg-zinc-900 border border-white/10 rounded-sm p-6 space-y-6 shadow-xl relative overflow-hidden">
                      {/* Status border indicator */}
                      <div className={`absolute left-0 top-0 bottom-0 w-[4px] ${
                        bk.status === 'Pending' ? 'bg-yellow-400' :
                        bk.status === 'Confirmed' ? 'bg-blue-500' :
                        bk.status === 'Completed' ? 'bg-green-500' : 'bg-zinc-600'
                      }`} />

                      {/* Card Header Info */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-black text-white text-xs bg-zinc-950 border border-white/5 px-2.5 py-0.5 rounded-sm">
                              {bk.id}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-500">
                              Booked on {new Date(bk.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <h4 className="text-lg font-black uppercase text-yellow-400 italic font-display pt-1">
                            {bk.serviceName}
                          </h4>
                          <div className="flex items-center gap-1.5 text-zinc-300 text-xs font-bold uppercase">
                            <Car className="w-3.5 h-3.5 text-zinc-500" />
                            <span>{bk.vehicleBrand} {bk.vehicleModel}</span>
                          </div>
                        </div>

                        {/* Status Badge & Actions */}
                        <div className="flex items-center gap-3 self-start md:self-center">
                          <span className={`inline-block px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-widest font-mono border ${
                            bk.status === 'Pending' ? 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400' :
                            bk.status === 'Confirmed' ? 'bg-blue-600/10 border-blue-500/30 text-blue-400' :
                            bk.status === 'Completed' ? 'bg-green-600/10 border-green-500/30 text-green-400' :
                            'bg-zinc-800 border-zinc-700 text-zinc-500'
                          }`}>
                            {bk.status}
                          </span>

                          {/* Customer self-cancellation button */}
                          {bk.status === 'Pending' && (
                            <button
                              onClick={() => {
                                if (window.confirm("Do you want to cancel your service appointment slot request?")) {
                                  updateStatus(bk.id, 'Cancelled');
                                }
                              }}
                              className="bg-zinc-800 hover:bg-red-950 text-zinc-400 hover:text-red-400 px-3 py-1.5 border border-white/5 hover:border-red-900 rounded-sm text-[10px] font-bold font-mono uppercase tracking-wider transition-all cursor-pointer"
                            >
                              Cancel Request
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Preferred Appointment Date & Notes */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-950 p-4 rounded-sm border border-white/5 text-xs font-mono">
                        <div>
                          <span className="text-zinc-500 uppercase font-bold text-[9px] block mb-1">Preferred Slot</span>
                          <span className="text-white font-bold flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-red-500" />
                            {bk.preferredDate}
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-500 uppercase font-bold text-[9px] block mb-1">Specific Symptoms / Request</span>
                          <span className="text-zinc-300 italic">
                            {bk.message ? `"${bk.message}"` : "None reported."}
                          </span>
                        </div>
                      </div>

                      {/* Interactive Service Journey Tracker (If not Cancelled) */}
                      {bk.status !== 'Cancelled' ? (
                        <div className="pt-4 space-y-4">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 font-mono block">
                            Live Repair Bay Tracker
                          </span>

                          <div className="grid grid-cols-4 gap-2 relative">
                            {/* Horizontal joining lines */}
                            <div className="absolute top-4 left-4 right-4 h-1 bg-zinc-800 -z-10 rounded-full" />
                            <div 
                              className="absolute top-4 left-4 h-1 bg-red-600 -z-10 rounded-full transition-all duration-500"
                              style={{ 
                                width: currentStep === 0 ? '0%' : currentStep === 2 ? '66%' : currentStep === 3 ? '100%' : '33%' 
                              }}
                            />

                            {/* Step 1: Request Made */}
                            <div className="text-center space-y-1.5 flex flex-col items-center">
                              <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                                currentStep >= 0 
                                  ? 'bg-red-600 border-red-500 text-white' 
                                  : 'bg-zinc-950 border-white/5 text-zinc-600'
                              }`}>
                                <ClipboardList className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-[9px] font-bold font-mono uppercase tracking-wider text-zinc-300">
                                1. Request Received
                              </span>
                            </div>

                            {/* Step 2: Verification */}
                            <div className="text-center space-y-1.5 flex flex-col items-center">
                              <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                                currentStep >= 1 || bk.status === 'Confirmed' || bk.status === 'Completed'
                                  ? 'bg-red-600 border-red-500 text-white' 
                                  : 'bg-zinc-950 border-white/5 text-zinc-600'
                              }`}>
                                <Clock className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-[9px] font-bold font-mono uppercase tracking-wider text-zinc-300">
                                2. Verification
                              </span>
                            </div>

                            {/* Step 3: Work in Progress */}
                            <div className="text-center space-y-1.5 flex flex-col items-center">
                              <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                                bk.status === 'Confirmed' || bk.status === 'Completed'
                                  ? 'bg-blue-600 border-blue-500 text-white' 
                                  : 'bg-zinc-950 border-white/5 text-zinc-600'
                              }`}>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                              </div>
                              <span className="text-[9px] font-bold font-mono uppercase tracking-wider text-zinc-300">
                                3. Servicing Active
                              </span>
                            </div>

                            {/* Step 4: Ready for Pickup */}
                            <div className="text-center space-y-1.5 flex flex-col items-center">
                              <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                                bk.status === 'Completed'
                                  ? 'bg-green-600 border-green-500 text-white' 
                                  : 'bg-zinc-950 border-white/5 text-zinc-600'
                              }`}>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </div>
                              <span className="text-[9px] font-bold font-mono uppercase tracking-wider text-zinc-300">
                                4. Ready / Finished
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-zinc-950 p-4 border border-zinc-800 text-zinc-500 font-mono rounded-sm text-center text-xs flex items-center justify-center gap-1.5 uppercase tracking-wider">
                          <AlertTriangle className="w-4 h-4 text-zinc-600" />
                          <span>This ticket was cancelled. Feel free to contact Venu or submit a new slot query.</span>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-zinc-500">
              Need assistance? Call Venu at <strong className="text-white">+91 9963004478</strong> directly for immediate road support.
            </p>
          </div>

        </div>

      ) : (
        // ==================== 3. MASTER ADMIN CRM VIEW ====================
        <div className="max-w-7xl mx-auto w-full space-y-8 relative z-10 text-left">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-mono">
                  SECURE CONTROL WORKSPACE
                </span>
              </div>
              <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2 uppercase italic font-display">
                Neelkanth CRM Dashboard <Unlock className="w-5 h-5 text-yellow-400" />
              </h1>
              <p className="text-zinc-400 text-xs mt-1">
                Owner: <strong>{BUSINESS_INFO.owner} (Venu)</strong> &bull; Operational Portal
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetData}
                className="bg-zinc-900 hover:bg-zinc-850 border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white px-4 py-2.5 rounded-sm text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Reset local storage seed bookings"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Seed</span>
              </button>

              <button
                onClick={handleLogout}
                className="bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/20 text-zinc-300 px-4 py-2.5 rounded-sm text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout Admin</span>
              </button>

              <button
                onClick={onClose}
                className="bg-red-600 hover:bg-red-700 text-white font-black px-4 py-2.5 rounded-sm text-xs uppercase tracking-widest transition-colors cursor-pointer"
              >
                Close Panel
              </button>
            </div>
          </div>

          {/* CRM / OFFERS SECTION SELECTOR TAB */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 gap-4">
            <div className="flex flex-wrap gap-4 sm:gap-6 pt-2">
              <button
                onClick={() => setAdminActiveSection('bookings')}
                className={`pb-4 text-xs sm:text-sm font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  adminActiveSection === 'bookings'
                    ? 'border-red-600 text-white font-black'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                💼 Service Tickets & Leads ({filteredBookings.length})
              </button>
              <button
                onClick={() => setAdminActiveSection('offers')}
                className={`pb-4 text-xs sm:text-sm font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                  adminActiveSection === 'offers'
                    ? 'border-yellow-400 text-yellow-400 font-black'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                🎉 Create & Manage Offers ({offers.length})
              </button>
              <button
                onClick={() => setAdminActiveSection('alerts')}
                className={`pb-4 text-xs sm:text-sm font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer relative flex items-center gap-1.5 ${
                  adminActiveSection === 'alerts'
                    ? 'border-red-500 text-red-400 font-black'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span>🔔 Alerts & Referrals</span>
                {notifications.filter(n => !n.isRead).length > 0 && (
                  <span className="bg-red-600 text-white text-[9px] font-mono font-black px-1.5 py-0.5 rounded-full animate-pulse leading-none">
                    {notifications.filter(n => !n.isRead).length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setAdminActiveSection('password')}
                className={`pb-4 text-xs sm:text-sm font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  adminActiveSection === 'password'
                    ? 'border-red-650 text-white font-black'
                    : 'border-transparent text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span>🔑 Admin Password</span>
              </button>
            </div>

            {/* Sound Toggle controls */}
            <div className="flex items-center gap-2 pb-3 sm:pb-0">
              <button
                onClick={() => {
                  setIsMuted(!isMuted);
                  if (isMuted) {
                    // play test chime right away when unmuting
                    setTimeout(() => playNotificationSound(), 100);
                  }
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm border text-[10px] font-mono uppercase font-bold tracking-wider transition-all cursor-pointer ${
                  isMuted 
                    ? 'bg-zinc-950 border-white/5 text-zinc-500 hover:text-zinc-300' 
                    : 'bg-zinc-900 border-red-500/20 text-red-400 hover:bg-zinc-850'
                }`}
                title={isMuted ? "Unmute system chimes" : "Mute system chimes"}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Chime: {isMuted ? "MUTED" : "ACTIVE"}</span>
              </button>
            </div>
          </div>

          {adminActiveSection === 'bookings' && (
            <>
              {/* Stats Bar */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Stat 1 */}
                <div className="bg-zinc-900 border border-white/10 p-5 rounded-sm text-left shadow">
                  <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider font-mono">Total Leads</span>
                  <div className="text-3xl font-black font-mono text-white mt-1">{totalCount}</div>
                </div>

                {/* Stat 2 */}
                <div className="bg-zinc-900 border border-white/10 p-5 rounded-sm text-left shadow">
                  <span className="text-yellow-400 text-[10px] font-bold uppercase tracking-wider font-mono">Pending Review</span>
                  <div className="text-3xl font-black font-mono text-yellow-400 mt-1">{pendingCount}</div>
                </div>

                {/* Stat 3 */}
                <div className="bg-zinc-900 border border-white/10 p-5 rounded-sm text-left shadow">
                  <span className="text-blue-400 text-[10px] font-bold uppercase tracking-wider font-mono">Confirmed Active</span>
                  <div className="text-3xl font-black font-mono text-blue-400 mt-1">{confirmedCount}</div>
                </div>

                {/* Stat 4 */}
                <div className="bg-zinc-900 border border-white/10 p-5 rounded-sm text-left shadow">
                  <span className="text-green-400 text-[10px] font-bold uppercase tracking-wider font-mono">Completed Jobs</span>
                  <div className="text-3xl font-black font-mono text-green-400 mt-1">{completedCount}</div>
                </div>
              </div>

              {/* Filters & Search Toolbar */}
              <div className="bg-zinc-900 border border-white/10 p-4 rounded-sm flex flex-col md:flex-row gap-4 items-center justify-between shadow-lg">
                {/* Search Input */}
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by ID, name, mobile, or car make..."
                    className="w-full bg-zinc-950 border border-white/5 text-white rounded-sm py-2.5 pl-11 pr-4 text-xs focus:outline-none focus:border-red-600 transition-all placeholder:text-zinc-600"
                  />
                </div>

                {/* Status Segment Filter */}
                <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto scrollbar-none">
                  {['all', 'Pending', 'Confirmed', 'Completed', 'Cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setStatusFilter(status)}
                      className={`px-3 py-1.5 rounded-sm text-[10px] font-bold font-mono uppercase tracking-wider border transition-all whitespace-nowrap cursor-pointer ${
                        statusFilter === status
                          ? 'bg-yellow-400 border-yellow-400 text-black font-extrabold'
                          : 'bg-zinc-950 border-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table Container */}
              <div className="bg-zinc-900 border border-white/10 rounded-sm shadow-xl overflow-hidden text-left">
                <div className="overflow-x-auto">
                  <table className="w-full table-auto border-collapse">
                    <thead>
                      <tr className="bg-zinc-950 border-b border-white/5 text-[10px] font-bold uppercase tracking-wider font-mono text-zinc-400">
                        <th className="py-4 px-6">ID & Date</th>
                        <th className="py-4 px-6">Customer Details</th>
                        <th className="py-4 px-6">Car & Required Service</th>
                        <th className="py-4 px-6">Preferred Date & Message</th>
                        <th className="py-4 px-6 text-center">Status</th>
                        <th className="py-4 px-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-sans text-xs">
                      {filteredBookings.map((bk) => (
                        <tr key={bk.id} className="hover:bg-zinc-950/40 transition-colors">
                          {/* Ticket ID & Timestamp */}
                          <td className="py-4 px-6 whitespace-nowrap">
                            <span className="font-mono font-black text-white text-xs bg-zinc-950 border border-white/5 px-2 py-0.5 rounded-sm">
                              {bk.id}
                            </span>
                            <span className="block text-[10px] text-zinc-500 mt-1.5 font-mono">
                              {new Date(bk.createdAt).toLocaleDateString()}
                            </span>
                          </td>

                          {/* Customer Name & Phone */}
                          <td className="py-4 px-6">
                            <div className="font-bold text-white text-sm uppercase italic font-display">{bk.customerName}</div>
                            <a
                              href={`tel:${bk.phone}`}
                              className="flex items-center space-x-1 text-zinc-400 hover:text-yellow-400 font-mono mt-1 w-fit"
                            >
                              <Phone className="w-3 h-3 text-red-500" />
                              <span>+91 {bk.phone}</span>
                            </a>
                          </td>

                          {/* Car & Service requested */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-1 text-zinc-300 font-bold uppercase">
                              <Car className="w-3.5 h-3.5 text-zinc-500" />
                              <span>{bk.vehicleBrand} {bk.vehicleModel}</span>
                            </div>
                            <div className="text-yellow-400 font-black mt-1 uppercase italic text-[11px]">
                              {bk.serviceName}
                            </div>
                          </td>

                          {/* Preferred Booking Date & message */}
                          <td className="py-4 px-6 max-w-xs">
                            <div className="flex items-center space-x-1.5 text-white font-bold font-mono">
                              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                              <span>{bk.preferredDate}</span>
                            </div>
                            {bk.message ? (
                              <p className="text-zinc-400 leading-normal mt-1 text-[11px] font-normal italic border-l border-white/5 pl-2 line-clamp-2" title={bk.message}>
                                "{bk.message}"
                              </p>
                            ) : (
                              <span className="text-zinc-600 block mt-1 italic text-[11px]">No message.</span>
                            )}
                          </td>

                          {/* Booking status badge */}
                          <td className="py-4 px-6 text-center whitespace-nowrap">
                            <span className={`inline-block px-2.5 py-1 rounded-sm text-[10px] font-black uppercase tracking-wider font-mono border ${
                              bk.status === 'Pending' ? 'bg-yellow-400/10 border-yellow-400/30 text-yellow-400' :
                              bk.status === 'Confirmed' ? 'bg-blue-600/10 border-blue-500/30 text-blue-400' :
                              bk.status === 'Completed' ? 'bg-green-600/10 border-green-500/30 text-green-400' :
                              'bg-zinc-850 border-zinc-700 text-zinc-500'
                            }`}>
                              {bk.status}
                            </span>
                          </td>

                          {/* CRM Actions */}
                          <td className="py-4 px-6 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end space-x-1.5">
                              {/* Approve/Confirm button */}
                              {bk.status === 'Pending' && (
                                <button
                                  onClick={() => updateStatus(bk.id, 'Confirmed')}
                                  className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-sm border border-blue-500/10 transition-colors cursor-pointer"
                                  title="Confirm Appointment"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}

                              {/* Complete job button */}
                              {bk.status === 'Confirmed' && (
                                <button
                                  onClick={() => updateStatus(bk.id, 'Completed')}
                                  className="bg-green-600 hover:bg-green-700 text-white p-1.5 rounded-sm border border-green-500/10 transition-colors cursor-pointer"
                                  title="Complete Servicing"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              )}

                              {/* Cancel button */}
                              {(bk.status === 'Pending' || bk.status === 'Confirmed') && (
                                <button
                                  onClick={() => updateStatus(bk.id, 'Cancelled')}
                                  className="bg-zinc-800 hover:bg-zinc-750 text-zinc-400 hover:text-red-500 p-1.5 rounded-sm border border-white/5 transition-colors cursor-pointer"
                                  title="Cancel Ticket"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              )}

                              {/* Delete from CRM database */}
                              <button
                                onClick={() => deleteBooking(bk.id)}
                                className="bg-zinc-800 hover:bg-red-950 text-zinc-500 hover:text-red-400 p-1.5 rounded-sm border border-white/5 hover:border-red-900 transition-colors cursor-pointer"
                                title="Delete Record"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {filteredBookings.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center py-12 text-zinc-500 font-mono italic">
                            No appointment tickets found matching the filter or search criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {adminActiveSection === 'offers' && (
            <OffersAdmin />
          )}

          {adminActiveSection === 'alerts' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
              
              {/* Left Column: Notification Feed (7 Columns) */}
              <div className="lg:col-span-7 bg-zinc-900 border border-white/10 rounded-sm p-5 sm:p-6 space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <div>
                    <h3 className="text-md font-black text-white uppercase italic tracking-tight font-display flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-red-650 rounded-full animate-pulse" />
                      <span>Live Alerts & Notifications Feed</span>
                    </h3>
                    <p className="text-[10px] text-zinc-500 font-mono uppercase mt-1">
                      Showing newest activity first
                    </p>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-[10px]">
                    <button
                      onClick={handleMarkAllRead}
                      disabled={notifications.length === 0 || !notifications.some(n => !n.isRead)}
                      className="bg-zinc-950 hover:bg-zinc-850 disabled:text-zinc-600 border border-white/10 px-2.5 py-1.5 rounded-sm transition-all cursor-pointer font-bold uppercase tracking-wider"
                    >
                      Mark All Read
                    </button>
                    <button
                      onClick={handleClearNotifications}
                      disabled={notifications.length === 0}
                      className="bg-zinc-950 hover:bg-red-950 hover:text-red-400 hover:border-red-900/30 disabled:text-zinc-600 border border-white/10 px-2.5 py-1.5 rounded-sm transition-all cursor-pointer font-bold uppercase tracking-wider text-zinc-400"
                    >
                      Clear Log
                    </button>
                  </div>
                </div>

                {/* Notifications list */}
                <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2 custom-scrollbar">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 border rounded-sm transition-all flex gap-3.5 items-start ${
                        notif.isRead
                          ? 'bg-zinc-950/40 border-white/5 opacity-70'
                          : 'bg-gradient-to-r from-red-950/25 via-zinc-900 to-zinc-900 border-red-500/30 shadow-md shadow-red-500/5'
                      }`}
                    >
                      {/* Left icon wrapper */}
                      <div className={`p-2.5 rounded-sm shrink-0 border ${
                        notif.type === 'booking'
                          ? 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                          : 'bg-green-500/10 border-green-500/20 text-green-400'
                      }`}>
                        {notif.type === 'booking' ? (
                          <ClipboardList className="w-4 h-4" />
                        ) : (
                          <UserCheck className="w-4 h-4" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-1.5 text-left">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-[8px] font-bold font-mono tracking-widest px-2 py-0.5 rounded-sm uppercase ${
                            notif.type === 'booking' ? 'bg-blue-500/10 text-blue-400' : 'bg-green-500/10 text-green-400'
                          }`}>
                            {notif.type === 'booking' ? 'APPOINTMENT REQUEST' : 'REFERRAL PROGRAM'}
                          </span>
                          <span className="text-[9px] text-zinc-500 font-mono font-bold">
                            {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <h4 className="text-xs font-black uppercase text-white tracking-tight">{notif.title}</h4>
                        <p className="text-xs text-zinc-300 leading-relaxed font-sans">{notif.message}</p>

                        {/* Metadata fields snippet */}
                        {notif.metadata && (
                          <div className="bg-zinc-950 border border-white/5 rounded p-2.5 mt-2 font-mono text-[10px] grid grid-cols-1 sm:grid-cols-2 gap-y-1.5 gap-x-3 text-zinc-400">
                            {notif.type === 'booking' ? (
                              <>
                                <div><span className="text-zinc-600 font-bold uppercase">Customer:</span> {notif.metadata.customerName}</div>
                                <div><span className="text-zinc-600 font-bold uppercase">Phone:</span> {notif.metadata.phone}</div>
                                <div><span className="text-zinc-600 font-bold uppercase">Car Make:</span> {notif.metadata.vehicleBrand} {notif.metadata.vehicleModel}</div>
                                <div><span className="text-zinc-600 font-bold uppercase">Work:</span> <span className="text-yellow-400 font-black">{notif.metadata.serviceName}</span></div>
                              </>
                            ) : (
                              <>
                                <div><span className="text-zinc-600 font-bold uppercase">Referrer Name:</span> {notif.metadata.referrerName}</div>
                                <div><span className="text-zinc-600 font-bold uppercase">Referrer Mobile:</span> {notif.metadata.referrerPhone}</div>
                                <div className="col-span-1 sm:col-span-2 border-t border-white/5 pt-1.5 mt-1 flex items-center justify-between">
                                  <span className="text-zinc-600 font-bold uppercase">Invite Code generated:</span>
                                  <span className="text-green-400 font-black tracking-widest bg-green-500/10 px-2 py-0.5 rounded-sm">{notif.metadata.code}</span>
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Mark Read individual button */}
                      {!notif.isRead && (
                        <button
                          onClick={() => {
                            const updated = notifications.map(n => n.id === notif.id ? { ...n, isRead: true } : n);
                            localStorage.setItem('neelkanth_notifications', JSON.stringify(updated));
                            setNotifications(updated);
                          }}
                          className="text-zinc-500 hover:text-white p-1 hover:bg-white/5 rounded transition-all cursor-pointer shrink-0"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4 text-green-500" />
                        </button>
                      )}
                    </div>
                  ))}

                  {notifications.length === 0 && (
                    <div className="text-center py-16 text-zinc-500 font-mono italic bg-zinc-950/20 border border-white/5 rounded-sm flex flex-col items-center justify-center gap-2">
                      <Bell className="w-8 h-8 text-zinc-700" />
                      <span>Notification inbox is clear.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Interactive Simulators & Referrals Ledger (5 Columns) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Simulated Traffic triggers */}
                <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-sm p-5 sm:p-6 space-y-5 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-red-650 text-[8px] font-mono uppercase font-black text-white px-2.5 py-1 text-center tracking-widest">
                    Simulation Dock
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-black text-white uppercase italic tracking-tight font-display flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                      <span>Traffic Simulation Board</span>
                    </h3>
                    <p className="text-[10px] text-zinc-400 font-sans leading-normal">
                      Trigger customer submissions programmatically to instantly test the alerts, slide-in banners, and real-time audio chimes!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <button
                      onClick={handleSimulateBooking}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-sm text-[10px] font-mono uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow shadow-blue-500/10 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <ClipboardList className="w-4 h-4 text-yellow-400 animate-pulse" />
                      <span>Simulate Customer Booking</span>
                    </button>

                    <button
                      onClick={handleSimulateReferral}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-sm text-[10px] font-mono uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 shadow shadow-green-500/10 hover:scale-[1.01] active:scale-[0.99]"
                    >
                      <UserCheck className="w-4 h-4 text-yellow-400 animate-pulse" />
                      <span>Simulate Referral Generate</span>
                    </button>
                  </div>
                </div>

                {/* Ledger of active referrals */}
                <div className="bg-zinc-900 border border-white/10 rounded-sm p-5 sm:p-6 space-y-4 text-left">
                  <div className="border-b border-white/5 pb-3">
                    <h3 className="text-xs font-black text-white uppercase font-mono tracking-wider flex items-center gap-2">
                      <Users className="w-4 h-4 text-yellow-400" />
                      <span>Active Referral Ledger ({referrals.length})</span>
                    </h3>
                    <p className="text-[9px] text-zinc-500 font-mono uppercase mt-1">
                      Registered 5% discount invite list
                    </p>
                  </div>

                  <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
                    {referrals.map((ref) => (
                      <div
                        key={ref.id}
                        className="bg-zinc-950 border border-white/5 rounded-sm p-3 font-mono text-[10px] space-y-2 relative"
                      >
                        <div className="absolute top-2.5 right-3 bg-green-500/10 border border-green-500/20 text-green-400 px-1.5 py-0.5 rounded text-[8px] font-bold">
                          Active
                        </div>

                        <div className="space-y-1">
                          <span className="text-zinc-500 block uppercase font-bold text-[7px]">Referrer Customer</span>
                          <span className="text-white font-sans font-extrabold">{ref.referrerName}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-zinc-400 border-t border-white/5 pt-2">
                          <div>
                            <span className="text-zinc-600 block uppercase font-bold text-[7px]">Mobile</span>
                            <span>+91 {ref.referrerPhone}</span>
                          </div>
                          <div>
                            <span className="text-zinc-600 block uppercase font-bold text-[7px]">Code Issued</span>
                            <span className="text-green-400 font-black tracking-wider">{ref.code}</span>
                          </div>
                        </div>
                      </div>
                    ))}

                    {referrals.length === 0 && (
                      <div className="text-center py-8 text-zinc-500 font-mono italic text-[10px]">
                        No active referral invites logged yet.
                      </div>
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

          {adminActiveSection === 'password' && (
            <div className="bg-zinc-900 border border-white/10 rounded-sm p-6 sm:p-8 max-w-md mx-auto animate-fadeIn mt-4 text-left">
              <h3 className="text-lg font-black text-white uppercase italic tracking-tight font-display mb-2 flex items-center gap-2 border-b border-white/5 pb-3">
                <Lock className="w-5 h-5 text-[#FFD700]" />
                <span>Change Admin Passcode</span>
              </h3>
              
              <p className="text-xs text-zinc-400 mb-6 font-sans leading-relaxed">
                As Venu (the owner/administrator), you can update the master security passcode used to access this CRM dashboard.
              </p>

              <form onSubmit={handlePasswordUpdate} className="space-y-4 font-mono">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Current Passcode
                  </label>
                  <input
                    type="password"
                    required
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-sm py-2.5 px-3 text-sm text-white focus:outline-none focus:border-red-650 transition-all"
                    placeholder="Enter current passcode"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                    New Passcode
                  </label>
                  <input
                    type="password"
                    required
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-sm py-2.5 px-3 text-sm text-white focus:outline-none focus:border-red-650 transition-all"
                    placeholder="Enter new passcode"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Confirm New Passcode
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    className="w-full bg-zinc-950 border border-white/10 rounded-sm py-2.5 px-3 text-sm text-white focus:outline-none focus:border-red-650 transition-all"
                    placeholder="Confirm new passcode"
                  />
                </div>

                {passwordError && (
                  <p className="text-xs text-red-500 font-mono mt-2 bg-red-950/20 border border-red-900/30 p-2.5 rounded-sm">
                    ⚠️ {passwordError}
                  </p>
                )}

                {passwordSuccess && (
                  <p className="text-xs text-green-500 font-mono mt-2 bg-green-950/20 border border-green-900/30 p-2.5 rounded-sm">
                    ✅ {passwordSuccess}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#FFD700] hover:bg-yellow-500 text-black font-black py-3 rounded-sm text-xs uppercase tracking-widest transition-colors cursor-pointer mt-4 shadow-md"
                >
                  Update Admin Passcode
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Live Toast Notifications Overlay */}
      <div className="fixed bottom-6 right-6 z-[100] max-w-sm w-full flex flex-col gap-3 pointer-events-none">
        {liveToasts.map(toast => (
          <div
            key={toast.id}
            className="bg-zinc-900/95 border border-red-500/60 backdrop-blur-md text-white p-4 rounded-sm shadow-[0_10px_30px_rgba(239,68,68,0.15)] flex gap-3 items-start pointer-events-auto animate-fadeIn transition-all duration-200"
            style={{ animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            <div className="p-2 rounded-sm bg-red-650 text-white shrink-0 shadow-sm shadow-red-500/10">
              <Bell className="w-4 h-4 animate-bounce" />
            </div>
            <div className="flex-1 space-y-1 text-left">
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-bold font-mono tracking-widest text-red-400 uppercase">
                  {toast.type === 'booking' ? '🔥 NEW SERVICE BOOKING' : '🎉 NEW REFERRAL GENERATED'}
                </span>
                <button
                  onClick={() => setLiveToasts(prev => prev.filter(t => t.id !== toast.id))}
                  className="text-zinc-500 hover:text-white p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <h4 className="text-xs font-black uppercase text-white tracking-tight">{toast.title}</h4>
              <p className="text-[11px] text-zinc-300 leading-normal">{toast.message}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Translations copy so that helper error states can render properly
const TRANSLATIONS: Record<string, any> = {
  hindi: {
    hindi: "हिंदी"
  }
};
