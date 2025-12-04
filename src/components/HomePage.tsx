'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import HeaderGlobal from './layout/HeaderGlobal';
import ReservationModal from './ReservationModal';
import HeroCarousel from './HeroCarousel';

// Scrolling strip items
const stripItems = [
  'Restaurant', 'Cafe', 'Bakery', 'Lounge', 'Club', 'Rooftop', 'Bar',
  'Private Dining', 'Cocktails', 'Coffee', 'Celebrations', 'Love',
  'Music', 'Dancing', 'Nightlife', 'Events', 'Bhopal'
];

export default function HomePage() {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  return (
    <>
      {/* Google Fonts - Cormorant Garamond for elegant typography */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap');

        .scrolling-text {
          animation: scroll-left 60s linear infinite;
        }

        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

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

          {/* Enhanced Scrolling Text Strip */}
          <div className="absolute bottom-24 sm:bottom-28 md:bottom-32 left-0 right-0 overflow-hidden z-10">
            {/* Edge fade gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-black/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none" />

            {/* Strip background - deeper burgundy */}
            <div className="relative py-3 sm:py-4 bg-gradient-to-r from-[#6B0F28]/95 via-[#5A0D20]/98 to-[#6B0F28]/95 backdrop-blur-lg">
              {/* Top subtle line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              {/* Bottom subtle line */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="scrolling-text whitespace-nowrap">
                {[...stripItems, ...stripItems].map((item, idx) => (
                  <span key={idx}>
                    <span className="inline-block mx-6 sm:mx-8 text-white/90 text-xs sm:text-sm md:text-base font-serif tracking-[0.2em] sm:tracking-[0.3em] uppercase">
                      {item}
                    </span>
                    <span className="inline-block mx-2 text-[#C4707E]">&#9830;</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Social Icons - Stacked for proper centering */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute bottom-3 sm:bottom-5 left-0 right-0 z-10 flex flex-col items-center gap-2 sm:gap-3"
          >
            {/* Social Icons Row - Perfectly Centered */}
            <div className="flex items-center justify-center gap-4 sm:gap-5">
              {[
                { icon: Instagram, href: 'https://www.instagram.com/cafe_amante_india/' },
                { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61566920782703' },
                { icon: Youtube, href: 'https://youtube.com/@amantecafe?si=7LP7pNC2dhorzCX_' },
              ].map(({ icon: Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 group aspect-square"
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
            {/* Powered by - Below social icons, also centered */}
            <a
              href="https://restronaut.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] sm:text-xs text-white/50 hover:text-white/80 transition-colors"
            >
              Powered by <span className="font-semibold">Restronaut</span>
            </a>
          </motion.div>
        </div>

        {/* Reservation Modal */}
        <ReservationModal
          isOpen={isReservationModalOpen}
          onClose={() => setIsReservationModalOpen(false)}
        />
      </div>
    </>
  );
}
