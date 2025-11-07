'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, Calendar, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await fetch('/api/admin/feedback');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch data');
      }

      setFeedback(result.data || []);
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to load feedback');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredFeedback = feedback.filter(fb =>
    fb['Space Visited']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fb['What You Loved']?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    fb['Suggestions']?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const averageRating = feedback.length > 0
    ? (feedback.reduce((sum, fb) => sum + parseInt(fb['Overall Rating'] || 0), 0) / feedback.length).toFixed(1)
    : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amante-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading feedback...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="mb-8">
        <h1 className="font-heading text-4xl text-white mb-2">Customer Feedback</h1>
        <p className="text-white/60">View all customer reviews and suggestions</p>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search feedback..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-amante-pink focus:border-amante-pink"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <p className="text-white/60 text-sm mb-1">Total Reviews</p>
          <p className="text-white text-2xl font-bold">{feedback.length}</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <p className="text-white/60 text-sm mb-1">Average Rating</p>
          <p className="text-white text-2xl font-bold flex items-center gap-2">
            {averageRating} <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          </p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <p className="text-white/60 text-sm mb-1">5-Star Reviews</p>
          <p className="text-white text-2xl font-bold">
            {feedback.filter(fb => fb['Overall Rating'] === '5').length}
          </p>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h2 className="font-heading text-xl text-white mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-amante-pink" />
          All Feedback
        </h2>

        {filteredFeedback.length === 0 ? (
          <p className="text-white/60 text-center py-8">No feedback found</p>
        ) : (
          <div className="space-y-3">
            {filteredFeedback.map((fb, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < parseInt(fb['Overall Rating'])
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-white/20'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 bg-[#8B1538]/20 text-amante-pink text-xs rounded-full">
                      {fb['Space Visited']}
                    </span>
                    <span className="text-xs text-white/60 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {fb['Visit Date']}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-white/80 text-xs font-medium mb-1">What they loved:</p>
                    <p className="text-white text-sm">{fb['What You Loved']}</p>
                  </div>

                  {fb['Suggestions'] && (
                    <div>
                      <p className="text-white/80 text-xs font-medium mb-1">Suggestions:</p>
                      <p className="text-white/60 text-sm">{fb['Suggestions']}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10">
                    <div>
                      <p className="text-white/60 text-xs">Food</p>
                      <p className="text-white text-sm font-semibold">{fb['Food Quality']}/5</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs">Service</p>
                      <p className="text-white text-sm font-semibold">{fb['Service Quality']}/5</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-xs">Ambiance</p>
                      <p className="text-white text-sm font-semibold">{fb['Ambiance']}/5</p>
                    </div>
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
