'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
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
  Heart,
  PartyPopper,
  Mic2,
  UtensilsCrossed,
  Cake,
  Flame,
  Star,
  MessageCircle
} from 'lucide-react';
import Button from '@/components/ui/Button';

// NYE 2026 Featured Event
const featuredEvent = {
  id: 'nye-2026',
  title: "New Year's Eve 2026",
  date: '2025-12-31',
  time: '7:30 PM onwards',
  space: 'All Spaces',
  category: 'all',
  description: "Ring in New Year 2026 at Bhopal's most luxurious celebration destination, with a premium, high-energy and elegant New Year's Eve experience. Celebrate the countdown in style with curated music, gourmet dining, vibrant crowd and unforgettable vibes. This is not just a party – it's Bhopal's Grandest New Year Celebration.",
  features: [
    { icon: Music, text: 'Live DJ Night & Rockstar Live Band' },
    { icon: Mic2, text: 'Bollywood & Ghazal Musical Evening' },
    { icon: UtensilsCrossed, text: 'Lavish Gala Dinner Buffet' },
    { icon: Wine, text: 'Unlimited Food & Unlimited Drinks' },
    { icon: Cake, text: 'New Year Cake Cutting Ceremony' },
    { icon: Flame, text: 'Grand Midnight Fireworks' },
    { icon: Star, text: 'Luxury Ambience & Premium Hospitality' }
  ],
  packages: [
    { name: 'Couple', price: '₹8,000' },
    { name: 'Group of 4', price: '₹15,000' }
  ],
  image: '/images/events/nye-2026.jpg',
  whatsappNumber: '919770650078'
};

// Regular recurring events
const regularEvents = [
  {
    id: 1,
    title: 'Live Music Nights',
    schedule: 'Every Thursday & Friday',
    time: '8:00 PM - 11:00 PM',
    space: 'Intimate Lounge',
    icon: Music,
    description: 'Every Thursday and Friday evening, our lounge and rooftop spaces host talented musicians performing acoustic sets, soulful covers, and original compositions. Enjoy exceptional cuisine and craft cocktails while live music sets the perfect backdrop for conversation and connection.',
    price: 'No cover charge'
  },
  {
    id: 2,
    title: 'Sunday Brunch',
    schedule: 'Every Sunday',
    time: '11:00 AM - 4:00 PM',
    space: 'Rooftop Restaurant',
    icon: Utensils,
    description: "Bhopal's most indulgent Sunday brunch happens at our rooftop restaurant. Unlimited buffet featuring international breakfast favorites, Indian classics, live cooking stations, unlimited selected beverages, and panoramic city views. A weekly tradition for hundreds of happy guests.",
    price: '₹1,499 per person'
  },
  {
    id: 3,
    title: 'Happy Hour',
    schedule: 'Monday - Friday',
    time: '5:00 PM - 8:00 PM',
    space: 'Intimate Lounge',
    icon: Wine,
    description: 'Weekday afternoons deserve celebration. Join us for special pricing on selected cocktails, beers, wines, and spirits, plus discounted appetizers perfect for sharing. Whether unwinding after work or warming up for the evening ahead, our lounge provides the perfect setting.',
    price: 'Special pricing'
  },
  {
    id: 4,
    title: 'Ladies Night',
    schedule: 'Every Wednesday',
    time: '7:00 PM onwards',
    space: 'Lounge & Rooftop',
    icon: Heart,
    description: 'Every Wednesday, we celebrate the women who make Bhopal extraordinary. Enjoy complimentary selected cocktails, special menu pricing, and vibrant atmosphere designed for connection and celebration. Bring your friends, make new ones, and discover why Wednesday has become the week\'s most anticipated evening.',
    price: 'Complimentary cocktails'
  }
];

export default function EventsPage() {
  const whatsappLink = `https://wa.me/${featuredEvent.whatsappNumber}?text=${encodeURIComponent("Hi! I'd like to book for the New Year's Eve 2026 celebration at Amante.")}`;

  return (
    <div className="bg-white">

      {/* Hero Section - NYE 2026 Featured Event */}
      <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-black via-[#1a0a0a] to-black">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#4a1515_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,#2a1a00_0%,transparent_40%)]" />
          {/* Animated sparkles effect */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <div className="absolute top-40 right-20 w-1 h-1 bg-yellow-300 rounded-full animate-pulse delay-100" />
            <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse delay-200" />
            <div className="absolute top-32 right-1/3 w-1 h-1 bg-yellow-200 rounded-full animate-pulse delay-300" />
            <div className="absolute bottom-40 left-20 w-2 h-2 bg-amber-300 rounded-full animate-pulse delay-150" />
            <div className="absolute bottom-60 right-10 w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-250" />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 md:py-12">
          {/* Header Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 rounded-full">
              <PartyPopper className="w-5 h-5 text-amber-400" />
              <span className="text-amber-300 font-semibold text-sm uppercase tracking-wider">Featured Event</span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Event Poster */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-[3/4] max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden shadow-2xl shadow-amber-500/20">
                <Image
                  src={featuredEvent.image}
                  alt="New Year's Eve 2026 at Amante"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Glow effect */}
                <div className="absolute inset-0 ring-2 ring-amber-500/30 rounded-2xl" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-500/30 to-transparent rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-red-500/20 to-transparent rounded-full blur-2xl" />
            </motion.div>

            {/* Event Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center lg:text-left"
            >
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 mb-4">
                New Year's Eve 2026
              </h1>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-6">
                <div className="flex items-center gap-2 text-amber-300">
                  <Calendar className="w-5 h-5" />
                  <span className="font-body">31st December 2025</span>
                </div>
                <div className="flex items-center gap-2 text-amber-300">
                  <Clock className="w-5 h-5" />
                  <span className="font-body">{featuredEvent.time}</span>
                </div>
                <div className="flex items-center gap-2 text-amber-300">
                  <MapPin className="w-5 h-5" />
                  <span className="font-body">{featuredEvent.space}</span>
                </div>
              </div>

              <p className="font-body text-lg text-gray-300 mb-8 leading-relaxed">
                {featuredEvent.description}
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {featuredEvent.features.map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10"
                    >
                      <FeatureIcon className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <span className="font-body text-sm text-gray-200">{feature.text}</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Pricing Cards */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                {featuredEvent.packages.map((pkg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    className="bg-gradient-to-br from-amber-500/20 to-yellow-600/10 border border-amber-500/40 rounded-xl px-6 py-4 text-center min-w-[140px]"
                  >
                    <p className="font-body text-amber-200 text-sm mb-1">{pkg.name}</p>
                    <p className="font-heading text-2xl text-white">{pkg.price}</p>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span className="text-lg">Book on WhatsApp</span>
                </a>
                <p className="text-gray-400 text-sm mt-3">
                  Limited seats available. Book your celebration now!
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <a href="#regular-events" className="flex flex-col items-center text-amber-300/60 hover:text-amber-300 transition-colors">
              <span className="text-xs mb-2 uppercase tracking-wider">More Events</span>
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Regular Events Section */}
      <section id="regular-events" className="py-20 lg:py-32 px-4 bg-amante-cream">
        <div className="max-w-standard mx-auto">
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
            {regularEvents.map((event, index) => {
              const EventIcon = event.icon;
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="w-16 h-16 bg-amante-red/10 rounded-full flex items-center justify-center mb-6">
                    <EventIcon className="w-8 h-8 text-amante-red" />
                  </div>
                  <h3 className="font-heading text-2xl text-amante-red mb-4">
                    {event.title}
                  </h3>
                  <p className="font-body text-amante-charcoal mb-4">
                    {event.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-amante-red mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {event.schedule}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-amante-grey-light">
                    <span className="font-body text-sm text-amante-grey">{event.space}</span>
                    <span className="font-body font-semibold text-amante-red">{event.price}</span>
                  </div>
                </motion.div>
              );
            })}
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
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
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
