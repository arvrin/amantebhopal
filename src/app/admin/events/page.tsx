'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PartyPopper, Calendar, Users, Phone, Mail, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/admin/events');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch data');
      }

      setEvents(result.data || []);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to load events');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEvents = events.filter(event =>
    event['Name']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event['Event Type']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event['Phone']?.includes(searchTerm)
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amante-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="mb-8">
        <h1 className="font-heading text-4xl text-white mb-2">Private Events</h1>
        <p className="text-white/60">Manage all private event bookings</p>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search by name, event type, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amante-pink focus:border-amante-pink"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <p className="text-white/60 text-sm mb-1">Total Events</p>
          <p className="text-white text-2xl font-bold">{events.length}</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <p className="text-white/60 text-sm mb-1">This Month</p>
          <p className="text-white text-2xl font-bold">
            {events.filter(e => e['Event Date']?.startsWith(new Date().toISOString().slice(0, 7))).length}
          </p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <p className="text-white/60 text-sm mb-1">Upcoming</p>
          <p className="text-white text-2xl font-bold">
            {events.filter(e => e['Event Date'] >= new Date().toISOString().split('T')[0]).length}
          </p>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h2 className="font-heading text-xl text-white mb-4 flex items-center gap-2">
          <PartyPopper className="w-5 h-5 text-amante-pink" />
          All Events
        </h2>

        {filteredEvents.length === 0 ? (
          <p className="text-white/60 text-center py-8">No events found</p>
        ) : (
          <div className="space-y-3">
            {filteredEvents.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-white font-semibold text-lg">{event['Event Type']}</p>
                        <p className="text-white/80 text-sm mt-1">{event['Name']}</p>
                      </div>
                      <span className="px-3 py-1 bg-[#8B1538]/20 text-amante-pink text-xs rounded-full whitespace-nowrap">
                        {event['Space Preference']}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-3">
                      <span className="flex items-center gap-1 text-white/60 text-sm">
                        <Calendar className="w-4 h-4" />
                        {event['Event Date']}
                      </span>
                      <span className="flex items-center gap-1 text-white/60 text-sm">
                        <Users className="w-4 h-4" />
                        {event['Expected Guests']} guests
                      </span>
                      <span className="flex items-center gap-1 text-white/60 text-sm">
                        <Phone className="w-4 h-4" />
                        {event['Phone']}
                      </span>
                      {event['Email'] && (
                        <span className="flex items-center gap-1 text-white/60 text-sm">
                          <Mail className="w-4 h-4" />
                          {event['Email']}
                        </span>
                      )}
                    </div>
                    {event['Event Requirements'] && (
                      <p className="text-white/60 text-sm mt-3">
                        <span className="text-white/80 font-medium">Requirements:</span> {event['Event Requirements']}
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
