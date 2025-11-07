'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageSquare, Calendar, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ContactPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/admin/contact');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch data');
      }

      setInquiries(result.data || []);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to load contact inquiries');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredInquiries = inquiries.filter(inq =>
    inq['Name']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq['Email']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inq['Subject']?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amante-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading inquiries...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="mb-8">
        <h1 className="font-heading text-4xl text-white mb-2">Contact Inquiries</h1>
        <p className="text-white/60">View all customer inquiries</p>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search by name, email, or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amante-pink focus:border-amante-pink"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <p className="text-white/60 text-sm mb-1">Total Inquiries</p>
          <p className="text-white text-2xl font-bold">{inquiries.length}</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <p className="text-white/60 text-sm mb-1">This Week</p>
          <p className="text-white text-2xl font-bold">
            {inquiries.filter(inq => {
              const date = new Date(inq['Timestamp'] || inq['Date']);
              const weekAgo = new Date();
              weekAgo.setDate(weekAgo.getDate() - 7);
              return date >= weekAgo;
            }).length}
          </p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <p className="text-white/60 text-sm mb-1">Today</p>
          <p className="text-white text-2xl font-bold">
            {inquiries.filter(inq => {
              const date = new Date(inq['Timestamp'] || inq['Date']);
              const today = new Date();
              return date.toDateString() === today.toDateString();
            }).length}
          </p>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h2 className="font-heading text-xl text-white mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-amante-pink" />
          All Inquiries
        </h2>

        {filteredInquiries.length === 0 ? (
          <p className="text-white/60 text-center py-8">No inquiries found</p>
        ) : (
          <div className="space-y-3">
            {filteredInquiries.map((inq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-white font-semibold text-lg">{inq['Name']}</p>
                      <p className="text-amante-pink text-sm mt-1">{inq['Subject']}</p>
                    </div>
                    <span className="text-xs text-white/60">
                      {inq['Timestamp'] || inq['Date']}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <span className="flex items-center gap-2 text-white/60 text-sm">
                      <Mail className="w-4 h-4" />
                      {inq['Email']}
                    </span>
                    {inq['Phone'] && (
                      <span className="flex items-center gap-2 text-white/60 text-sm">
                        <Phone className="w-4 h-4" />
                        {inq['Phone']}
                      </span>
                    )}
                  </div>

                  {inq['Message'] && (
                    <div className="mt-2 pt-3 border-t border-white/10">
                      <p className="text-white/80 text-xs font-medium mb-1">Message:</p>
                      <p className="text-white/70 text-sm">{inq['Message']}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
