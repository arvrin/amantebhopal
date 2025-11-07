'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Phone, MapPin, Users, Search, Filter } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch('/api/admin/reservations');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch data');
      }

      setReservations(result.data || []);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to load reservations');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredReservations = reservations.filter(res =>
    res['Name']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res['Phone']?.includes(searchTerm) ||
    res['Space Preference']?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amante-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading reservations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-4xl text-white mb-2">Reservations</h1>
        <p className="text-white/60">Manage all table reservations</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search by name, phone, or space..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amante-pink focus:border-amante-pink"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <p className="text-white/60 text-sm mb-1">Total Reservations</p>
          <p className="text-white text-2xl font-bold">{reservations.length}</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <p className="text-white/60 text-sm mb-1">Today</p>
          <p className="text-white text-2xl font-bold">
            {reservations.filter(r => r['Date'] === new Date().toISOString().split('T')[0]).length}
          </p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <p className="text-white/60 text-sm mb-1">Upcoming</p>
          <p className="text-white text-2xl font-bold">
            {reservations.filter(r => r['Date'] > new Date().toISOString().split('T')[0]).length}
          </p>
        </div>
      </div>

      {/* Reservations List */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h2 className="font-heading text-xl text-white mb-4">All Reservations</h2>

        {filteredReservations.length === 0 ? (
          <p className="text-white/60 text-center py-8">No reservations found</p>
        ) : (
          <div className="space-y-3">
            {filteredReservations.map((res, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-white font-semibold text-lg">{res['Name']}</p>
                        <div className="flex flex-wrap gap-3 mt-2">
                          <span className="flex items-center gap-1 text-white/60 text-sm">
                            <Calendar className="w-4 h-4" />
                            {res['Date']}
                          </span>
                          <span className="flex items-center gap-1 text-white/60 text-sm">
                            <Clock className="w-4 h-4" />
                            {res['Time']}
                          </span>
                          <span className="flex items-center gap-1 text-white/60 text-sm">
                            <Users className="w-4 h-4" />
                            {res['Guests']} guests
                          </span>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-[#8B1538]/20 text-amante-pink text-xs rounded-full whitespace-nowrap">
                        {res['Space Preference']}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-3">
                      <span className="flex items-center gap-1 text-white/60 text-sm">
                        <Phone className="w-4 h-4" />
                        {res['Phone']}
                      </span>
                      {res['Email'] && (
                        <span className="text-white/60 text-sm">{res['Email']}</span>
                      )}
                    </div>
                    {res['Special Requests'] && (
                      <p className="text-white/60 text-sm mt-2">
                        <span className="text-white/80 font-medium">Note:</span> {res['Special Requests']}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
