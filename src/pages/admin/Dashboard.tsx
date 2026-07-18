import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useOffer } from '../../hooks/useOffer';
import OffersAdmin from './Offers';
import { Booking } from '../../types';
import { 
  BarChart, Users, ClipboardList, LogOut, ArrowLeft, 
  Settings, Award, Lock, ShieldAlert, Sparkles, AlertTriangle,
  Search, Phone, Car, Calendar, Check, X, Trash2
} from 'lucide-react';

interface DashboardProps {
  onClose: () => void;
}

export default function AdminDashboard({ onClose }: DashboardProps) {
  const { logout, isAdmin } = useAuth();
  const { offers } = useOffer();
  const [activeTab, setActiveTab] = useState<'leads' | 'offers'>('leads');

  // Bookings State
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'>('all');

  // Load bookings from local storage
  const loadBookings = () => {
    const data = localStorage.getItem('neelakanta_bookings') || localStorage.getItem('neelkanth_bookings');
    if (data) {
      try {
        setBookings(JSON.parse(data));
      } catch (e) {
        console.error("Error reading bookings in admin dashboard", e);
      }
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // Sync / Listen to local storage changes to keep it in sync live
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'neelakanta_bookings' || e.key === 'neelkanth_bookings') {
        loadBookings();
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Update Status
  const handleUpdateStatus = (id: string, newStatus: Booking['status']) => {
    const updated = bookings.map(b => {
      if (b.id === id) {
        return { ...b, status: newStatus };
      }
      return b;
    });
    localStorage.setItem('neelakanta_bookings', JSON.stringify(updated));
    localStorage.setItem('neelkanth_bookings', JSON.stringify(updated)); // sync both keys
    setBookings(updated);
    
    // Dispatch storage event manually for same-tab reactive updates in other components
    window.dispatchEvent(new Event('storage'));
  };

  // Delete booking
  const handleDeleteBooking = (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this service booking record?")) {
      const updated = bookings.filter(b => b.id !== id);
      localStorage.setItem('neelakanta_bookings', JSON.stringify(updated));
      localStorage.setItem('neelkanth_bookings', JSON.stringify(updated)); // sync both keys
      setBookings(updated);
      
      // Dispatch storage event manually for same-tab reactive updates in other components
      window.dispatchEvent(new Event('storage'));
    }
  };

  // Compute dynamic stats from current state
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'Pending').length,
    completed: bookings.filter(b => b.status === 'Completed').length,
  };

  // Filter Bookings
  const filteredBookings = bookings.filter(b => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = b.customerName.toLowerCase().includes(term) ||
                          b.phone.includes(term) ||
                          b.vehicleBrand.toLowerCase().includes(term) ||
                          b.vehicleModel.toLowerCase().includes(term) ||
                          b.id.toLowerCase().includes(term) ||
                          b.serviceName.toLowerCase().includes(term);

    const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-4">
        <div className="bg-zinc-900 border border-white/10 p-8 rounded-sm text-center max-w-sm space-y-4">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto animate-bounce" />
          <h2 className="text-xl font-black uppercase font-display italic">Access Restricted</h2>
          <p className="text-xs text-zinc-400 font-mono">
            This workspace contains Venu's secure admin panels. Unauthorized attempts are blocked.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-2.5 rounded-sm text-xs uppercase font-mono tracking-widest cursor-pointer"
          >
            Return to Website
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-left animate-fadeIn">
      {/* Background radial lights */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-650/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Top bar header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-mono">
                SECURE COMMAND CONSOLE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2 uppercase italic font-display">
              Neelakanta Motors CRM <Award className="w-6 h-6 text-yellow-400 animate-pulse" />
            </h1>
            <p className="text-zinc-500 text-xs">
              System Operator: <strong className="text-zinc-300">Venu Workshop Manager</strong> &bull; Hyderabad Headquarters
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={logout}
              className="bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white px-4 py-2.5 rounded-sm text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout Admin</span>
            </button>
            <button
              onClick={onClose}
              className="bg-red-600 hover:bg-red-750 text-white font-black px-4 py-2.5 rounded-sm text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-red-650/20"
            >
              Close Console
            </button>
          </div>
        </div>

        {/* Dashboard statistics panel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-zinc-900 border border-white/10 p-5 rounded-sm">
            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest font-mono">Total leads</span>
            <div className="text-2xl font-black font-mono mt-1 text-white">{stats.total}</div>
          </div>
          <div className="bg-zinc-900 border border-white/10 p-5 rounded-sm">
            <span className="text-yellow-400 text-[10px] font-bold uppercase tracking-widest font-mono">Pending Review</span>
            <div className="text-2xl font-black font-mono mt-1 text-yellow-400">{stats.pending}</div>
          </div>
          <div className="bg-zinc-900 border border-white/10 p-5 rounded-sm">
            <span className="text-green-400 text-[10px] font-bold uppercase tracking-widest font-mono">Completed Jobs</span>
            <div className="text-2xl font-black font-mono mt-1 text-green-400">{stats.completed}</div>
          </div>
          <div className="bg-zinc-900 border border-white/10 p-5 rounded-sm">
            <span className="text-purple-400 text-[10px] font-bold uppercase tracking-widest font-mono">Live Promotions</span>
            <div className="text-2xl font-black font-mono mt-1 text-purple-400">{offers.length}</div>
          </div>
        </div>

        {/* Navigation Selector */}
        <div className="flex border-b border-white/10 pt-2 gap-4">
          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-4 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'leads'
                ? 'border-red-600 text-white font-black'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            💼 Leads Management ({filteredBookings.length})
          </button>
          <button
            onClick={() => setActiveTab('offers')}
            className={`pb-4 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
              activeTab === 'offers'
                ? 'border-yellow-400 text-yellow-400 font-black'
                : 'border-transparent text-zinc-500 hover:text-zinc-300'
            }`}
          >
            🎉 Bumper Offer Panel
          </button>
        </div>

        {/* Tab contents */}
        {activeTab === 'offers' ? (
          <OffersAdmin />
        ) : (
          <div className="space-y-6">
            
            {/* Filters & Search Toolbar */}
            <div className="bg-zinc-900 border border-white/10 p-4 rounded-sm flex flex-col md:flex-row gap-4 items-center justify-between shadow-lg">
              {/* Search Input */}
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by ID, name, mobile, car model, service..."
                  className="w-full bg-zinc-950 border border-white/5 text-white rounded-sm py-2.5 pl-11 pr-4 text-xs focus:outline-none focus:border-red-600 transition-all placeholder:text-zinc-600"
                />
              </div>

              {/* Status Segment Filter */}
              <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto scrollbar-none">
                {(['all', 'Pending', 'Confirmed', 'Completed', 'Cancelled'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-sm text-[10px] font-bold font-mono uppercase tracking-wider border transition-all whitespace-nowrap cursor-pointer ${
                      statusFilter === status
                        ? 'bg-red-600 border-red-600 text-white font-extrabold'
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
                      <th className="py-4 px-6 text-left">ID & Date</th>
                      <th className="py-4 px-6 text-left">Customer Details</th>
                      <th className="py-4 px-6 text-left">Car & Requested Service</th>
                      <th className="py-4 px-6 text-left">Preferred Date & Notes</th>
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
                            {new Date(bk.createdAt || Date.now()).toLocaleDateString()}
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
                            <span className="text-zinc-600 block mt-1 italic text-[11px]">No notes left.</span>
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
                                onClick={() => handleUpdateStatus(bk.id, 'Confirmed')}
                                className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded-sm border border-blue-500/10 transition-colors cursor-pointer"
                                title="Confirm Appointment"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}

                            {/* Complete job button */}
                            {bk.status === 'Confirmed' && (
                              <button
                                onClick={() => handleUpdateStatus(bk.id, 'Completed')}
                                className="bg-green-600 hover:bg-green-700 text-white p-1.5 rounded-sm border border-green-500/10 transition-colors cursor-pointer"
                                title="Complete Servicing"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}

                            {/* Cancel button */}
                            {(bk.status === 'Pending' || bk.status === 'Confirmed') && (
                              <button
                                onClick={() => handleUpdateStatus(bk.id, 'Cancelled')}
                                className="bg-zinc-800 hover:bg-zinc-750 text-zinc-400 hover:text-red-500 p-1.5 rounded-sm border border-white/5 transition-colors cursor-pointer"
                                title="Cancel Ticket"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}

                            {/* Delete from CRM database */}
                            <button
                              onClick={() => handleDeleteBooking(bk.id)}
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
                          No service bookings found matching the filter or search criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
