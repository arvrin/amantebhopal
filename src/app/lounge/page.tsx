'use client';

import { motion } from 'framer-motion';
import { Martini, Sofa, Sparkles, Music, Clock, Users, Gift, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import HeaderGlobal from '@/components/layout/HeaderGlobal';
import Footer from '@/components/layout/Footer';
import ReservationModal from '@/components/ReservationModal';

export default function LoungePage() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  const features = [
    {
      icon: Martini,
      title: "Expert Mixology",
      description: "Craft cocktails created by expert mixologists using premium spirits, fresh ingredients, and innovative techniques. Classic and signature options.",
    },
    {
      icon: Sparkles,
      title: "Premium Spirits",
      description: "Extensive collection featuring rare whiskeys, premium vodkas, aged rums, and specialty spirits. Curated for the discerning palate.",
    },
    {
      icon: Sofa,
      title: "Plush Seating",
      description: "Deep leather chairs and comfortable seating designed for extended conversations and relaxation. Sophisticated comfort in every corner.",
    },
    {
      icon: Music,
      title: "Live Acoustic",
      description: "Live acoustic performances on Thursday and Friday evenings featuring talented local musicians and soulful original compositions.",
    },
    {
      icon: Clock,
      title: "Happy Hour",
      description: "Daily happy hour specials from 5 PM to 8 PM featuring discounted cocktails, beers, wines, and appetizers perfect for unwinding.",
    },
    {
      icon: Users,
      title: "Social Atmosphere",
      description: "Welcoming environment perfect for after-work drinks, catching up with friends, or making new connections in sophisticated surroundings.",
    },
  ];

  const highlights = [
    "Expert mixologists creating both classic cocktails and innovative signature creations",
    "Extensive spirits collection featuring rare whiskeys and premium international labels",
    "Signature 'Bhopal Sunset' cocktail featuring locally-inspired botanical ingredients",
    "Elevated small plates menu including truffle fries and butter chicken sliders",
    "Live acoustic performances every Thursday and Friday evening from 8-11 PM",
    "Sophisticated ambiance with plush seating and warm, inviting lighting",
    "Daily Happy Hour from 5-8 PM with special pricing on drinks and appetizers",
    "Thoughtfully curated playlists creating perfect backdrop for conversation",
  ];

  return (
    <div className="min-h-screen bg-black">
      <HeaderGlobal />

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/lounge/lounge-hero.jpg"
            alt="Amante Intimate Lounge"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 py-20 sm:py-24 md:py-32">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-4 sm:mb-6"
              >
                <span className="inline-block px-4 sm:px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-amante-pink text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] border border-white/20">
                  Premium Cocktail Experience
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-heading text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-4 sm:mb-6 tracking-tight leading-tight"
              >
                Intimate
                <br />
                <span className="text-amante-pink">Lounge</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
              >
                Where Conversations Flow and Time Slows Down. Craft cocktails, live music, and sophisticated ambiance.
              </motion.p>

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
                  Reserve Lounge Seating
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
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 sm:mb-20 md:mb-24"
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-[#8B1538] to-amante-pink bg-clip-text text-transparent mb-6 sm:mb-8">
              Your Sophisticated Escape
            </h2>
            <div className="space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl text-white/90 max-w-4xl leading-relaxed">
              <p>
                Step into our lounge and feel the day's stress melt away. Bhopal's sophisticated living room—a space designed for those who appreciate quality without pretense. Premium cocktails, elevated small plates, and timeless ambiance.
              </p>
              <p>
                This is Bhopal's sophisticated living room—a space designed for those who appreciate quality without pretense. Sink into deep leather seating as soft lighting sets the mood and carefully curated playlists provide the perfect backdrop to conversation.
              </p>
              <p>
                Our mixologists craft cocktails that are equal parts art and science, while our small plates menu offers elevated comfort food perfect for sharing. Whether you're catching up with old friends, making new ones, or enjoying quiet contemplation with a premium whisky, the lounge welcomes you like you've been coming here for years.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-16 sm:mb-20 md:mb-24"
          >
            <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden">
              <Image
                src="/images/lounge/lounge-seating.jpg"
                alt="Lounge Seating"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden">
              <Image
                src="/images/lounge/lounge-bar.jpg"
                alt="Lounge Bar"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 sm:mb-20 md:mb-24"
          >
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-[#8B1538] to-amante-pink bg-clip-text text-transparent mb-8 sm:mb-12 text-center">
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
                    className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
                  >
                    <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-amante-pink mb-4" />
                    <h3 className="font-heading text-lg sm:text-xl text-white/90 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm p-6 sm:p-8 md:p-12 rounded-2xl shadow-md mb-16 sm:mb-20 md:mb-24"
          >
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl bg-gradient-to-r from-[#8B1538] to-amante-pink bg-clip-text text-transparent mb-6 sm:mb-8">
              Lounge Highlights
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {highlights.map((highlight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Martini className="w-5 h-5 sm:w-6 sm:h-6 text-amante-pink flex-shrink-0 mt-1" />
                  <span className="text-sm sm:text-base text-white/90 leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 rounded-2xl shadow-md text-center hover:shadow-xl hover:bg-white/10 transition-all">
              <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-amante-pink mx-auto mb-4" />
              <h3 className="font-heading text-lg sm:text-xl text-white/90 mb-2">Timing</h3>
              <p className="text-sm sm:text-base text-white/70">5:00 PM - 1:00 AM Daily</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 rounded-2xl shadow-md text-center hover:shadow-xl hover:bg-white/10 transition-all">
              <Users className="w-10 h-10 sm:w-12 sm:h-12 text-amante-pink mx-auto mb-4" />
              <h3 className="font-heading text-lg sm:text-xl text-white/90 mb-2">Capacity</h3>
              <p className="text-sm sm:text-base text-white/70">Up to 80 guests</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 rounded-2xl shadow-md text-center hover:shadow-xl hover:bg-white/10 transition-all">
              <Gift className="w-10 h-10 sm:w-12 sm:h-12 text-amante-pink mx-auto mb-4" />
              <h3 className="font-heading text-lg sm:text-xl text-white/90 mb-2">Price Range</h3>
              <p className="text-sm sm:text-base text-white/70">₹₹₹</p>
            </div>
          </motion.div>

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
              Reserve Lounge Seating
            </motion.button>
          </motion.div>
        </div>
      </div>

      <Footer />

      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
      />
    </div>
  );
}
