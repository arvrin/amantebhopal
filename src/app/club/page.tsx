'use client';

import { motion } from 'framer-motion';
import { Music, Zap, Sparkles, Users, Shield, Calendar, Clock, Gift, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import HeaderGlobal from '@/components/layout/HeaderGlobal';
import Footer from '@/components/layout/Footer';
import ReservationModal from '@/components/ReservationModal';

export default function ClubPage() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  const features = [
    {
      icon: Music,
      title: "World-Class DJs",
      description: "Top DJs spinning electronic, Bollywood, and commercial hits. Regular guest DJ performances and special theme nights throughout the year.",
    },
    {
      icon: Zap,
      title: "Premium Sound",
      description: "State-of-the-art sound system and dynamic lighting design create immersive experiences that transform the dance floor into pure energy.",
    },
    {
      icon: Sparkles,
      title: "VIP Service",
      description: "Exclusive VIP table service with premium bottle selections, dedicated servers, and prime positioning for the ultimate club experience.",
    },
    {
      icon: Users,
      title: "Spacious Floor",
      description: "Large dance floor designed for maximum energy and movement. Room to dance, connect, and celebrate all night long.",
    },
    {
      icon: Shield,
      title: "Safe Environment",
      description: "Professional security team ensuring a safe, welcoming atmosphere where everyone can enjoy themselves with complete peace of mind.",
    },
    {
      icon: Calendar,
      title: "Theme Nights",
      description: "Special theme nights, guest DJ performances, and exclusive events throughout the month. Follow us for the latest lineup.",
    },
  ];

  const highlights = [
    "State-of-the-art sound system and dynamic lighting creating immersive experiences",
    "Top DJs spinning electronic dance music, Bollywood hits, and commercial favorites",
    "VIP table service with premium bottle selections and dedicated attention",
    "Spacious dance floor designed for maximum energy and movement",
    "Professional security team ensuring safe, welcoming environment for all guests",
    "Special theme nights and guest DJ performances throughout the month",
    "Open Thursday through Saturday nights from 9 PM to 2 AM",
    "Premium bottle menu featuring top vodka, whisky, and champagne selections",
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <HeaderGlobal />

      {/* Hero Section with Elegant Gradient Header */}
      <div className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/club/club-hero.jpg"
            alt="Amante Premier Club"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 py-20 sm:py-24 md:py-32">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-4 sm:mb-6"
              >
                <span className="inline-block px-4 sm:px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-amante-pink text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] border border-white/20">
                  Where Bhopal Comes Alive After Dark
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-heading text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-4 sm:mb-6 tracking-tight leading-tight"
              >
                Premier
                <br />
                <span className="text-amante-pink">Club</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
              >
                The heartbeat of Bhopal's nightlife. World-class DJs, electric atmosphere, and unforgettable nights where the city comes to dance.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsReservationModalOpen(true)}
                  className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-gradient-to-br from-[#8B1538] to-[#6B0F28] hover:from-[#6B0F28] hover:to-[#8B1538] text-white font-bold text-base md:text-lg rounded-full transition-all duration-300 shadow-lg shadow-[#8B1538]/30"
                >
                  Reserve VIP Table
                </motion.button>
                <Link href="/menu" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold text-base md:text-lg rounded-full transition-all duration-300 border-2 border-white/30"
                  >
                    View Menu
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/60 flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronRight className="w-5 h-5 rotate-90" />
          </motion.div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="bg-amante-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
          {/* Intro Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 sm:mb-20 md:mb-24"
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-amante-red mb-6 sm:mb-8">
              The Pulse of Bhopal's Nightlife
            </h2>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl text-amante-charcoal max-w-4xl leading-relaxed">
              <p>
                When the sun goes down and the city's energy rises, our club becomes the heartbeat of Bhopal's nightlife. World-class DJs, cutting-edge systems, and electric atmosphere create unforgettable nights.
              </p>
              <p>
                This isn't just dancing—it's an experience crafted by world-class DJs, cutting-edge sound and lighting systems, and an atmosphere that's electric from the first beat to the last call. Our spacious dance floor pulses with energy while VIP sections offer the perfect vantage point for those who like to see and be seen.
              </p>
              <p>
                From Thursday through Saturday, we transform into the destination where Bhopal's young professionals, celebration seekers, and music lovers come to let loose, make memories, and dance like tomorrow doesn't exist.
              </p>
            </div>
          </motion.div>

          {/* Gallery Images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-16 sm:mb-20 md:mb-24"
          >
            <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden">
              <Image
                src="/images/club/club-lights.jpg"
                alt="Club Lights"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden">
              <Image
                src="/images/club/club-vip.jpg"
                alt="Club VIP"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 sm:mb-20 md:mb-24"
          >
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-amante-red mb-8 sm:mb-12 text-center">
              Experience the Difference
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-amante-red mb-4" />
                    <h3 className="font-heading text-lg sm:text-xl text-amante-charcoal mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-amante-grey leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-white to-amante-pink/5 p-6 sm:p-8 md:p-12 rounded-2xl shadow-md mb-16 sm:mb-20 md:mb-24"
          >
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-amante-red mb-6 sm:mb-8">
              Club Highlights
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Music className="w-5 h-5 sm:w-6 sm:h-6 text-amante-red flex-shrink-0 mt-1" />
                  <span className="text-sm sm:text-base text-amante-charcoal leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16"
          >
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition-shadow">
              <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-amante-red mx-auto mb-4" />
              <h3 className="font-heading text-lg sm:text-xl text-amante-charcoal mb-2">Timing</h3>
              <p className="text-sm sm:text-base text-amante-grey">9:00 PM - 2:00 AM (Thu-Sat)</p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition-shadow">
              <Users className="w-10 h-10 sm:w-12 sm:h-12 text-amante-red mx-auto mb-4" />
              <h3 className="font-heading text-lg sm:text-xl text-amante-charcoal mb-2">Capacity</h3>
              <p className="text-sm sm:text-base text-amante-grey">Up to 200 guests</p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition-shadow">
              <Gift className="w-10 h-10 sm:w-12 sm:h-12 text-amante-red mx-auto mb-4" />
              <h3 className="font-heading text-lg sm:text-xl text-amante-charcoal mb-2">Price Range</h3>
              <p className="text-sm sm:text-base text-amante-grey">₹₹₹</p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsReservationModalOpen(true)}
              className="px-8 sm:px-10 md:px-12 py-4 sm:py-5 bg-gradient-to-br from-[#8B1538] to-[#6B0F28] hover:from-[#6B0F28] hover:to-[#8B1538] text-white font-bold text-base sm:text-lg md:text-xl rounded-full transition-all duration-300 shadow-xl shadow-amante-red/30"
            >
              Reserve VIP Table
            </motion.button>
          </motion.div>
        </div>
      </div>

      <Footer />

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
      />
    </div>
  );
}
