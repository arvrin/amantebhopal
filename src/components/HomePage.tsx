'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import HeaderGlobal from './layout/HeaderGlobal';
import ReservationModal from './ReservationModal';
import HeroCarousel from './HeroCarousel';

export default function HomePage() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      {/* Header */}
      <HeaderGlobal onReservationClick={() => setIsReservationModalOpen(true)} />

      {/* Main Content - Full Screen with Hero Carousel */}
      <div className="relative h-full w-full group">
        {/* Hero Carousel */}
        <HeroCarousel
          autoRotateInterval={8000}
          onReservationModalOpen={() => setIsReservationModalOpen(true)}
        />

        {/* Scrolling Text Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-20 xs:bottom-24 sm:bottom-28 md:bottom-32 left-0 right-0 overflow-hidden py-2.5 xs:py-3 sm:py-3.5 bg-gradient-to-r from-[#8B1538]/90 via-[#7A1230]/90 to-[#6B0F28]/90 backdrop-blur-lg shadow-2xl z-10"
        >
          <div className="scrolling-text whitespace-nowrap text-white text-xs xs:text-sm sm:text-base md:text-lg font-serif tracking-[0.15em] xs:tracking-[0.25em] sm:tracking-[0.35em] uppercase">
                <span className="inline-block mx-8">Restaurant</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Café</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Bakery</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Lounge</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Club</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Rooftop</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Bar</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Private Dining</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Cocktails</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Coffee</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Celebrations</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Love</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Music</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Dancing</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Nightlife</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Events</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Bhopal</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Restaurant</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Café</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Bakery</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Lounge</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Club</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Rooftop</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Bar</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Private Dining</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Cocktails</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Coffee</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Celebrations</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Love</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Music</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Dancing</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Nightlife</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Events</span>
                <span className="inline-block mx-2">♦</span>
                <span className="inline-block mx-8">Bhopal</span>
          </div>
        </motion.div>

        {/* Bottom Social Media Icons and Powered by Restronaut */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-2 xs:bottom-3 sm:bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 z-10"
        >
              <div className="flex items-center justify-center gap-2 xs:gap-3 sm:gap-6">
                <a
                  href="https://www.instagram.com/cafe_amante_india/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
                >
                  <Instagram className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 text-white" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61566920782703"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
                >
                  <Facebook className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 text-white" />
                </a>
                <a
                  href="https://youtube.com/@amantecafe?si=7LP7pNC2dhorzCX_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
                >
                  <Youtube className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 text-white" />
                </a>

                {/* Separator */}
                <div className="h-6 xs:h-8 w-0.5 bg-white/30 mx-2 xs:mx-3"></div>

                {/* Powered by Restronaut */}
                <a
                  href="https://restronaut.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] xs:text-xs sm:text-sm text-white/70 hover:text-white/95 transition-colors duration-300"
                >
                  Powered by <span className="font-bold">Restronaut</span>
                </a>
          </div>
        </motion.div>

        {/* Decorative Elements - Hidden on mobile */}
        <div className="hidden sm:block absolute top-1/4 left-10 w-32 h-32 bg-amante-pink/10 rounded-full blur-3xl z-0" />
        <div className="hidden sm:block absolute bottom-1/4 right-10 w-40 h-40 bg-amante-red/10 rounded-full blur-3xl z-0" />
      </div>

      {/* Reservation Modal */}
      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
      />
    </div>
  );
}
