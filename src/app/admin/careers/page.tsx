'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Mail, Phone, Calendar, FileText, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function CareersPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch('/api/admin/careers');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch data');
      }

      setApplications(result.data || []);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to load applications');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredApplications = applications.filter(app =>
    app['Full Name']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app['Position']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app['Email']?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amante-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="mb-8">
        <h1 className="font-heading text-4xl text-white mb-2">Career Applications</h1>
        <p className="text-white/60">Manage all job applications</p>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search by name, position, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amante-pink focus:border-amante-pink"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <p className="text-white/60 text-sm mb-1">Total Applications</p>
          <p className="text-white text-2xl font-bold">{applications.length}</p>
        </div>
        {['Chef', 'Server', 'Manager', 'Other'].map(pos => (
          <div key={pos} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
            <p className="text-white/60 text-sm mb-1">{pos}</p>
            <p className="text-white text-2xl font-bold">
              {applications.filter(app => app['Position']?.includes(pos) || (pos === 'Other' && !['Chef', 'Server', 'Manager'].some(p => app['Position']?.includes(p)))).length}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h2 className="font-heading text-xl text-white mb-4 flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-amante-pink" />
          All Applications
        </h2>

        {filteredApplications.length === 0 ? (
          <p className="text-white/60 text-center py-8">No applications found</p>
        ) : (
          <div className="space-y-3">
            {filteredApplications.map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-white font-semibold text-lg">{app['Full Name']}</p>
                        <p className="text-amante-pink text-sm mt-1">{app['Position']}</p>
                      </div>
                      <span className="px-3 py-1 bg-[#8B1538]/20 text-amante-pink text-xs rounded-full">
                        {app['Experience Years']}y exp
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                      <span className="flex items-center gap-2 text-white/60 text-sm">
                        <Mail className="w-4 h-4" />
                        {app['Email']}
                      </span>
                      <span className="flex items-center gap-2 text-white/60 text-sm">
                        <Phone className="w-4 h-4" />
                        {app['Phone']}
                      </span>
                    </div>

                    {app['Cover Letter'] && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <p className="text-white/80 text-xs font-medium mb-1">Cover Letter:</p>
                        <p className="text-white/60 text-sm line-clamp-3">{app['Cover Letter']}</p>
                      </div>
                    )}

                    {app['Resume URL'] && (
                      <div className="mt-3">
                        <a
                          href={app['Resume URL']}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-amante-pink hover:text-amante-pink/80 text-sm transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                          View Resume
                        </a>
                      </div>
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
