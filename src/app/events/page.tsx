'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import TransparentHeader from '@/components/layout/TransparentHeader';
import Footer from '@/components/layout/Footer';
import {
  Calendar,
  Music,
  Coffee,
  Utensils,
  Wine,
  Sparkles,
  Clock,
  MapPin,
  Users,
  ChevronDown,
  Filter,
  Heart
} from 'lucide-react';
import Button from '@/components/ui/Button';

// Placeholder event data
const upcomingEvents = [
  {
    id: 1,
    title: 'Live Music Night',
    date: '2025-10-30',
    time: '8:00 PM - 11:00 PM',
    space: 'Intimate Lounge',
    category: 'lounge',
    description: 'Join us for an evening of soulful acoustic performances featuring talented local musicians. Enjoy exceptional cuisine and craft cocktails while live music sets the perfect backdrop.',
    capacity: '50 guests',
    price: 'No cover charge',
    recurring: 'Every Thursday & Friday'
  },
  {
    id: 2,
    title: 'Sunday Brunch Extravaganza',
    date: '2025-11-03',
    time: '11:00 AM - 4:00 PM',
    space: 'Rooftop Restaurant',
    category: 'restaurant',
    description: 'Bhopal\'s most indulgent Sunday brunch with unlimited buffet featuring international breakfast favorites, Indian classics, live cooking stations, and panoramic city views.',
    capacity: '100 guests',
    price: '₹1,499 per person',
    recurring: 'Every Sunday'
  },
  {
    id: 3,
    title: 'Happy Hour',
    date: '2025-10-28',
    time: '5:00 PM - 8:00 PM',
    space: 'Intimate Lounge',
    category: 'lounge',
    description: 'Unwind after work with special pricing on selected cocktails, beers, wines, and spirits, plus discounted appetizers perfect for sharing.',
    capacity: 'Walk-ins welcome',
    price: 'Special pricing',
    recurring: 'Monday - Friday'
  },
  {
    id: 4,
    title: 'Ladies Night',
    date: '2025-10-30',
    time: '7:00 PM onwards',
    space: 'Lounge & Rooftop',
    category: 'lounge',
    description: 'Celebrating the women who make Bhopal extraordinary. Enjoy complimentary selected cocktails, special menu pricing, and vibrant atmosphere designed for connection.',
    capacity: '80 guests',
    price: 'Complimentary cocktails',
    recurring: 'Every Wednesday'
  },
  {
    id: 5,
    title: 'Weekend DJ Night',
    date: '2025-11-02',
    time: '9:00 PM - 2:00 AM',
    space: 'Premier Club',
    category: 'club',
    description: 'Experience Bhopal\'s most vibrant nightlife with world-class DJs spinning electronic, Bollywood, and commercial hits. VIP table service available.',
    capacity: '200 guests',
    price: 'Cover charge applies',
    recurring: 'Friday & Saturday'
  },
  {
    id: 6,
    title: 'Coffee Tasting Workshop',
    date: '2025-11-05',
    time: '10:00 AM - 12:00 PM',
    space: 'Café & Bakery',
    category: 'cafe',
    description: 'Learn about single-origin beans, brewing methods, and tasting techniques from our certified baristas. Includes tasting of 5 specialty coffees and fresh pastries.',
    capacity: '20 guests',
    price: '₹699 per person',
    recurring: 'First Saturday monthly'
  }
];

const pastEvents = [
  {
    id: 101,
    title: 'Diwali Celebration',
    date: '2025-10-20',
    space: 'All Spaces',
    category: 'all',
    description: 'A spectacular celebration of lights featuring traditional cuisine, special performances, and festive ambiance across all our spaces.'
  },
  {
    id: 102,
    title: 'Wine Pairing Dinner',
    date: '2025-10-15',
    space: 'Private Dining',
    category: 'private-dining',
    description: 'An exclusive five-course dinner with carefully selected wine pairings, guided by our sommelier.'
  },
  {
    id: 103,
    title: 'Guest Chef Series: Italian Night',
    date: '2025-10-10',
    space: 'Rooftop Restaurant',
    category: 'restaurant',
    description: 'Celebrity chef collaboration bringing authentic Italian flavors with a special tasting menu.'
  }
];

export default function EventsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Events', icon: Sparkles },
    { id: 'cafe', label: 'Café', icon: Coffee },
    { id: 'restaurant', label: 'Restaurant', icon: Utensils },
    { id: 'lounge', label: 'Lounge', icon: Wine },
    { id: 'club', label: 'Club', icon: Music }
  ];

  const filteredEvents = selectedFilter === 'all'
    ? upcomingEvents
    : upcomingEvents.filter(event => event.category === selectedFilter);

  return (
    <div className="bg-white">
      <TransparentHeader />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/events/event-1.jpg"
            alt="Events at Amante"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Sophisticated Brand Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-br from-amante-red/15 via-transparent to-amante-pink/10" />
          {/* Vignette effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_100%)] opacity-40" />
        </div>

        <div className="relative h-full flex items-center justify-center px-6">
          <div className="text-center max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight">
                Upcoming Events
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-body text-xl md:text-2xl text-amante-pink-light max-w-3xl mx-auto"
            >
              Amante comes alive with regular events designed to elevate your week and create reasons to celebrate. From live music to indulgent brunches, there's always something special happening.
            </motion.p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-amante-pink/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-amante-red/10 rounded-full blur-3xl" />

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <a href="#events" className="flex flex-col items-center text-white/80 hover:text-white transition-colors">
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </a>
        </motion.div>
      </section>

      {/* Filter Section */}
      <section id="events" className="py-12 px-4 bg-amante-cream border-b border-amante-grey-light">
        <div className="max-w-standard mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-amante-red" />
              <h3 className="font-heading text-xl text-amante-red">Filter by Space</h3>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {filters.map((filter) => {
                const FilterIcon = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-body font-semibold transition-all ${
                      selectedFilter === filter.id
                        ? 'bg-amante-red text-white shadow-lg'
                        : 'bg-white text-amante-charcoal hover:bg-amante-pink-light'
                    }`}
                  >
                    <FilterIcon className="w-5 h-5" />
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Grid */}
      <section className="py-20 lg:py-32 px-4 bg-white">
        <div className="max-w-standard mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-5xl text-amante-red mb-4">
              Upcoming Events
            </h2>
            <p className="font-body text-lg text-amante-charcoal">
              {selectedFilter === 'all'
                ? 'Discover all the exciting experiences happening at Amante'
                : `Events at our ${filters.find(f => f.id === selectedFilter)?.label}`
              }
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white border border-amante-grey-light rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Event Header with gradient */}
                <div className="h-32 bg-gradient-to-br from-amante-pink-light to-amante-pink flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <div style={{
                      backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
                      backgroundSize: '30px 30px'
                    }} className="absolute inset-0" />
                  </div>
                  <Calendar className="w-16 h-16 text-amante-red/40 relative z-10" />
                </div>

                <div className="p-6">
                  {/* Event Badge */}
                  <div className="inline-block px-3 py-1 bg-amante-red/10 text-amante-red rounded-full text-sm font-semibold mb-4">
                    {event.space}
                  </div>

                  <h3 className="font-heading text-2xl text-amante-red mb-3">
                    {event.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-amante-charcoal">
                      <Calendar className="w-4 h-4 text-amante-red" />
                      <span className="font-body text-sm">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-amante-charcoal">
                      <Clock className="w-4 h-4 text-amante-red" />
                      <span className="font-body text-sm">{event.time}</span>
                    </div>

                    <div className="flex items-center gap-2 text-amante-charcoal">
                      <Users className="w-4 h-4 text-amante-red" />
                      <span className="font-body text-sm">{event.capacity}</span>
                    </div>
                  </div>

                  <p className="font-body text-amante-charcoal mb-4 line-clamp-3">
                    {event.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-amante-grey-light">
                    <span className="font-body font-semibold text-amante-red">
                      {event.price}
                    </span>
                    {event.recurring && (
                      <span className="font-body text-xs text-amante-grey bg-amante-cream px-2 py-1 rounded">
                        {event.recurring}
                      </span>
                    )}
                  </div>

                  <div className="mt-4">
                    <Link href="/reservations">
                      <Button variant="primary" size="sm" className="w-full">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Calendar className="w-16 h-16 text-amante-grey mx-auto mb-4" />
              <p className="font-body text-lg text-amante-grey">
                No events found for this filter. Check back soon!
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Regular Events Highlights */}
      <section className="relative py-20 lg:py-32 px-4 bg-amante-cream overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/images/events/event-2.jpg"
            alt="Events Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-standard mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-5xl text-amante-red mb-6">
              Regular Experiences
            </h2>
            <p className="font-body text-lg text-amante-charcoal max-w-3xl mx-auto">
              Weekly events that have become traditions for our guests
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-md"
            >
              <div className="w-16 h-16 bg-amante-red/10 rounded-full flex items-center justify-center mb-6">
                <Music className="w-8 h-8 text-amante-red" />
              </div>
              <h3 className="font-heading text-2xl text-amante-red mb-4">
                Live Music Nights
              </h3>
              <p className="font-body text-amante-charcoal mb-4">
                Every Thursday and Friday evening, our lounge and rooftop spaces host talented musicians performing acoustic sets, soulful covers, and original compositions. Enjoy exceptional cuisine and craft cocktails while live music sets the perfect backdrop for conversation and connection.
              </p>
              <div className="flex items-center gap-4 text-sm font-semibold text-amante-red">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Thu & Fri
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  8:00 PM - 11:00 PM
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-md"
            >
              <div className="w-16 h-16 bg-amante-red/10 rounded-full flex items-center justify-center mb-6">
                <Utensils className="w-8 h-8 text-amante-red" />
              </div>
              <h3 className="font-heading text-2xl text-amante-red mb-4">
                Sunday Brunch
              </h3>
              <p className="font-body text-amante-charcoal mb-4">
                Bhopal's most indulgent Sunday brunch happens at our rooftop restaurant. Unlimited buffet featuring international breakfast favorites, Indian classics, live cooking stations, unlimited selected beverages, and panoramic city views. A weekly tradition for hundreds of happy guests.
              </p>
              <div className="flex items-center gap-4 text-sm font-semibold text-amante-red">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Every Sunday
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  11:00 AM - 4:00 PM
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-md"
            >
              <div className="w-16 h-16 bg-amante-red/10 rounded-full flex items-center justify-center mb-6">
                <Wine className="w-8 h-8 text-amante-red" />
              </div>
              <h3 className="font-heading text-2xl text-amante-red mb-4">
                Happy Hour
              </h3>
              <p className="font-body text-amante-charcoal mb-4">
                Weekday afternoons deserve celebration. Join us for special pricing on selected cocktails, beers, wines, and spirits, plus discounted appetizers perfect for sharing. Whether unwinding after work or warming up for the evening ahead, our lounge provides the perfect setting.
              </p>
              <div className="flex items-center gap-4 text-sm font-semibold text-amante-red">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Mon - Fri
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  5:00 PM - 8:00 PM
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-md"
            >
              <div className="w-16 h-16 bg-amante-red/10 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-amante-red" />
              </div>
              <h3 className="font-heading text-2xl text-amante-red mb-4">
                Ladies Night
              </h3>
              <p className="font-body text-amante-charcoal mb-4">
                Every Wednesday, we celebrate the women who make Bhopal extraordinary. Enjoy complimentary selected cocktails, special menu pricing, and vibrant atmosphere designed for connection and celebration. Bring your friends, make new ones, and discover why Wednesday has become the week's most anticipated evening.
              </p>
              <div className="flex items-center gap-4 text-sm font-semibold text-amante-red">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Every Wednesday
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  7:00 PM onwards
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 lg:py-32 px-4 bg-white">
        <div className="max-w-standard mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-5xl text-amante-red mb-6">
              Past Celebrations
            </h2>
            <p className="font-body text-lg text-amante-charcoal">
              Memorable moments we've created together
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-amante-cream rounded-xl p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-amante-red" />
                  <span className="font-body text-sm text-amante-grey">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <h3 className="font-heading text-xl text-amante-red mb-2">
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-amante-grey" />
                  <span className="font-body text-sm text-amante-grey">{event.space}</span>
                </div>
                <p className="font-body text-sm text-amante-charcoal">
                  {event.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Host Your Event CTA */}
      <section className="py-20 lg:py-32 px-4 bg-gradient-to-br from-amante-red via-amante-red-dark to-amante-charcoal text-white">
        <div className="max-w-narrow mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-amante-pink-light" />
            <h2 className="font-heading text-3xl md:text-4xl mb-6">
              Host Your Own Event
            </h2>
            <p className="font-body text-lg md:text-xl text-amante-pink-light mb-10">
              Beyond our regular programming, Amante's versatile spaces provide the perfect backdrop for your private celebrations. From intimate dinners to grand weddings, we bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/private-events">
                <Button variant="primary" size="lg">
                  Explore Private Events
                </Button>
              </Link>
              <Link href="/banquets">
                <Button variant="outline" size="lg">
                  View Banquet Options
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
