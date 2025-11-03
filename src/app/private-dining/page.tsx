'use client';

import { motion } from 'framer-motion';
import { Lock, Users, ChefHat, Presentation, Wine, Sparkles, Clock, Gift, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import HeaderGlobal from '@/components/layout/HeaderGlobal';
import Footer from '@/components/layout/Footer';
import ReservationModal from '@/components/ReservationModal';

export default function PrivateDiningPage() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  const features = [
    {
      icon: Lock,
      title: "Complete Privacy",
      description: "Multiple private rooms with separate entrance options ensuring complete privacy and exclusivity for your important gatherings.",
    },
    {
      icon: ChefHat,
      title: "Custom Menus",
      description: "Work with our executive chef to create personalized menus reflecting your preferences, dietary requirements, and the occasion you're celebrating.",
    },
    {
      icon: Users,
      title: "Dedicated Service",
      description: "Service staff assigned exclusively to your event, providing attentive, personalized hospitality throughout your entire celebration.",
    },
    {
      icon: Presentation,
      title: "AV Equipment",
      description: "Advanced audio-visual equipment perfect for business presentations, video tributes, or entertainment during your private event.",
    },
    {
      icon: Wine,
      title: "Sommelier Service",
      description: "Expert sommelier-guided wine pairings available to complement your customized menu and enhance the dining experience.",
    },
    {
      icon: Sparkles,
      title: "Custom Desserts",
      description: "Dedicated pastry team creates custom desserts and celebration cakes tailored to your milestone moments and preferences.",
    },
  ];

  const highlights = [
    "Multiple private rooms accommodating 10-50 guests each with flexible configurations",
    "Completely customizable menus crafted by executive chef for your preferences",
    "Dedicated service staff assigned exclusively to your event for personalized attention",
    "Advanced AV equipment for presentations, entertainment, and video tributes",
    "Complete privacy with separate entrance options and discrete service",
    "Sommelier-guided wine pairings available to complement your custom menu",
    "Custom desserts and celebration cakes from dedicated pastry team",
    "Perfect for milestone celebrations, business dinners, and intimate wedding receptions",
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
            src="/images/private-dining/private-dining-hero.jpg"
            alt="Amante Private Dining"
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
                  Exclusive Spaces for Important Moments
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-heading text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-4 sm:mb-6 tracking-tight leading-tight"
              >
                Private
                <br />
                <span className="text-amante-pink">Dining</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
              >
                Intimate excellence, exclusively yours. Personalized menus, dedicated service, and complete privacy for occasions that matter.
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
                  Reserve Private Dining
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
              Intimate Excellence, Exclusively Yours
            </h2>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl text-amante-charcoal max-w-4xl leading-relaxed">
              <p>
                Some moments deserve intimacy and exclusivity. Our private dining spaces offer the perfect setting for occasions that matter—personalized menus, dedicated service, and complete privacy.
              </p>
              <p>
                Our private dining rooms offer intimate settings for gatherings ranging from 10 to 50 guests, combining the exclusivity you need with access to Amante's full culinary excellence. Whether hosting a family milestone celebration, confidential business dinner, or intimate wedding reception, you'll enjoy dedicated service, customizable menus, and spaces designed to make your guests feel special.
              </p>
              <p>
                Our events team works closely with you to understand your vision, then executes flawlessly—from customized table settings to personalized menus and seamless service that anticipates every need before you voice it.
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
                src="/images/private-dining/private-dining-room.jpg"
                alt="Private Dining Room"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden">
              <Image
                src="/images/private-dining/private-dining-table.jpg"
                alt="Private Dining Table"
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
              Private Dining Highlights
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-amante-red flex-shrink-0 mt-1" />
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
              <p className="text-sm sm:text-base text-amante-grey">Available by Reservation</p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition-shadow">
              <Users className="w-10 h-10 sm:w-12 sm:h-12 text-amante-red mx-auto mb-4" />
              <h3 className="font-heading text-lg sm:text-xl text-amante-charcoal mb-2">Capacity</h3>
              <p className="text-sm sm:text-base text-amante-grey">10-50 guests per room</p>
            </div>
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md text-center hover:shadow-xl transition-shadow">
              <Gift className="w-10 h-10 sm:w-12 sm:h-12 text-amante-red mx-auto mb-4" />
              <h3 className="font-heading text-lg sm:text-xl text-amante-charcoal mb-2">Price Range</h3>
              <p className="text-sm sm:text-base text-amante-grey">₹₹₹₹</p>
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
              Request Proposal
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
