'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, PartyPopper, MessageSquare, Briefcase, TrendingUp, Clock, MapPin, Star, Phone, Mail } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface DashboardData {
  kpis: {
    todayReservations: number;
    upcomingEvents: number;
    totalFeedback: number;
    totalApplications: number;
    totalReservations: number;
    totalEvents: number;
    totalContact: number;
    averageRating: string;
  };
  todayReservations: any[];
  todayEvents: any[];
  upcomingReservations: any[];
  upcomingEvents: any[];
  recentFeedback: any[];
  recentCareers: any[];
  recentContact: any[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch data');
      }

      setData(result.data);
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amante-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-white/60">Failed to load dashboard</p>
      </div>
    );
  }

  const kpiCards = [
    {
      icon: Calendar,
      label: "Today's Reservations",
      value: data.kpis.todayReservations,
      subtitle: `${data.kpis.totalReservations} total`,
      color: 'from-[#8B1538]/20 to-[#6B0F28]/20',
      iconColor: 'text-amante-pink',
    },
    {
      icon: PartyPopper,
      label: 'Upcoming Events (7d)',
      value: data.kpis.upcomingEvents,
      subtitle: `${data.kpis.totalEvents} total`,
      color: 'from-[#8B1538]/20 to-[#6B0F28]/20',
      iconColor: 'text-amante-pink',
    },
    {
      icon: MessageSquare,
      label: 'Customer Feedback',
      value: `${data.kpis.averageRating}★`,
      subtitle: `${data.kpis.totalFeedback} reviews`,
      color: 'from-[#8B1538]/20 to-[#6B0F28]/20',
      iconColor: 'text-amante-pink',
    },
    {
      icon: Briefcase,
      label: 'Career Applications',
      value: data.kpis.totalApplications,
      subtitle: `${data.recentCareers.length} recent`,
      color: 'from-[#8B1538]/20 to-[#6B0F28]/20',
      iconColor: 'text-amante-pink',
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-heading text-4xl text-white mb-2">Business Snapshot</h1>
        <p className="text-white/60">Real-time overview of your operations</p>
      </div>

      {/* Overall Statistics Summary */}
      <div className="bg-gradient-to-br from-[#8B1538]/10 to-[#6B0F28]/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
        <h2 className="font-heading text-xl text-white mb-4">All-Time Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <p className="text-white/60 text-sm mb-1">Total Reservations</p>
            <p className="text-white text-2xl font-bold">{data.kpis.totalReservations}</p>
          </div>
          <div className="text-center">
            <p className="text-white/60 text-sm mb-1">Total Events</p>
            <p className="text-white text-2xl font-bold">{data.kpis.totalEvents}</p>
          </div>
          <div className="text-center">
            <p className="text-white/60 text-sm mb-1">Total Feedback</p>
            <p className="text-white text-2xl font-bold">{data.kpis.totalFeedback}</p>
          </div>
          <div className="text-center">
            <p className="text-white/60 text-sm mb-1">Applications</p>
            <p className="text-white text-2xl font-bold">{data.kpis.totalApplications}</p>
          </div>
          <div className="text-center">
            <p className="text-white/60 text-sm mb-1">Contact Inquiries</p>
            <p className="text-white text-2xl font-bold">{data.kpis.totalContact}</p>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`bg-gradient-to-br ${card.color} backdrop-blur-xl border border-white/10 rounded-2xl p-6`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 bg-white/10 rounded-xl ${card.iconColor}`}>
                <card.icon className="w-6 h-6" />
              </div>
              <TrendingUp className="w-4 h-4 text-white/40" />
            </div>
            <p className="text-white/70 text-sm mb-1">{card.label}</p>
            <p className="text-white text-3xl font-bold mb-1">{card.value}</p>
            <p className="text-white/50 text-xs">{card.subtitle}</p>
          </motion.div>
        ))}
      </div>

      {/* Today's Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Today's Reservations */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h2 className="font-heading text-xl text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amante-pink" />
            Today's Reservations
          </h2>
          <div className="space-y-3">
            {data.todayReservations.length === 0 ? (
              <p className="text-white/60 text-sm">No reservations today</p>
            ) : (
              data.todayReservations.map((res, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-white font-semibold">{res['Name']}</p>
                      <p className="text-white/60 text-sm flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {res['Time']} • {res['Guests']} guests
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-[#8B1538]/20 text-amante-pink text-xs rounded-full">
                      {res['Space Preference']}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {res['Phone']}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Today's Events */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h2 className="font-heading text-xl text-white mb-4 flex items-center gap-2">
            <PartyPopper className="w-5 h-5 text-amante-pink" />
            Today's Events
          </h2>
          <div className="space-y-3">
            {data.todayEvents.length === 0 ? (
              <p className="text-white/60 text-sm">No events today</p>
            ) : (
              data.todayEvents.map((event, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-white font-semibold">{event['Event Type']}</p>
                      <p className="text-white/60 text-sm flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {event['Expected Guests']} guests
                      </p>
                    </div>
                    <span className="px-2 py-1 bg-[#8B1538]/20 text-amante-pink text-xs rounded-full">
                      {event['Space Preference']}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm">{event['Name']}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Recent Feedback & Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Feedback */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h2 className="font-heading text-xl text-white mb-4 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amante-pink" />
            Recent Feedback
          </h2>
          <div className="space-y-3">
            {data.recentFeedback.slice(0, 5).map((feedback, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-4 h-4 ${
                          idx < parseInt(feedback['Overall Rating'])
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-white/20'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-white/60">{feedback['Visit Date']}</span>
                </div>
                <p className="text-white text-sm mb-1">{feedback['Space Visited']}</p>
                <p className="text-white/60 text-xs line-clamp-2">{feedback['What You Loved']}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h2 className="font-heading text-xl text-white mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-amante-pink" />
            Recent Applications
          </h2>
          <div className="space-y-3">
            {data.recentCareers.slice(0, 5).map((app, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-white font-semibold">{app['Full Name']}</p>
                    <p className="text-white/60 text-sm">{app['Position']}</p>
                  </div>
                  <span className="px-2 py-1 bg-[#8B1538]/20 text-amante-pink text-xs rounded-full">
                    {app['Experience Years']}y exp
                  </span>
                </div>
                <p className="text-white/60 text-sm flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {app['Email']}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
