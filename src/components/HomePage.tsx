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

        /* Prevent any scroll on the homepage */
        html, body {
          overflow: hidden;
          overscroll-behavior: none;
        }

        .scrolling-text {
          animation: scroll-left 60s linear infinite;
        }

        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {/* Using dvh for proper mobile viewport, with vh fallback */}
      <div className="h-[100dvh] w-screen overflow-hidden bg-black" style={{ height: '100dvh' }}>
        {/* Header */}
        <HeaderGlobal onReservationClick={() => setIsReservationModalOpen(true)} />

        {/* Main Content - Full Screen with Hero Carousel */}
        <div className="relative h-full w-full group">
          {/* Hero Carousel */}
          <HeroCarousel
            autoRotateInterval={8000}
            onReservationModalOpen={() => setIsReservationModalOpen(true)}
          />

          {/* Enhanced Scrolling Text Strip - Fluid positioning */}
          <div
            className="absolute left-0 right-0 overflow-hidden z-10"
            style={{ bottom: 'clamp(5rem, 12vh, 8rem)' }}
          >
            {/* Edge fade gradients - fluid width */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-black/80 to-transparent z-10 pointer-events-none"
              style={{ width: 'clamp(3rem, 8vw, 8rem)' }}
            />
            <div
              className="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none"
              style={{ width: 'clamp(3rem, 8vw, 8rem)' }}
            />

            {/* Strip background - deeper burgundy, fluid padding */}
            <div
              className="relative bg-gradient-to-r from-[#6B0F28]/95 via-[#5A0D20]/98 to-[#6B0F28]/95 backdrop-blur-lg"
              style={{ padding: 'clamp(0.625rem, 1.5vh, 1rem) 0' }}
            >
              {/* Top subtle line */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              {/* Bottom subtle line */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="scrolling-text whitespace-nowrap">
                {[...stripItems, ...stripItems].map((item, idx) => (
                  <span key={idx}>
                    <span
                      className="inline-block text-white/90 font-serif uppercase"
                      style={{
                        fontSize: 'clamp(0.7rem, 0.5vw + 0.5rem, 1rem)',
                        letterSpacing: 'clamp(0.15em, 0.2vw + 0.1em, 0.3em)',
                        margin: '0 clamp(1rem, 1vw + 0.5rem, 2rem)',
                      }}
                    >
                      {item}
                    </span>
                    <span className="inline-block mx-2 text-[#C4707E]">&#9830;</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Social Icons - Fluid sizing and positioning */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="absolute left-0 right-0 z-50 flex flex-col items-center pointer-events-auto"
            style={{
              bottom: 'clamp(0.5rem, 2vh, 1.25rem)',
              gap: 'clamp(0.375rem, 1vh, 0.75rem)',
            }}
          >
            {/* Social Icons Row - Fluid sizing */}
            <div
              className="flex items-center justify-center"
              style={{ gap: 'clamp(0.75rem, 1vw + 0.5rem, 1.25rem)' }}
            >
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
                  className="flex-shrink-0 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40 group aspect-square pointer-events-auto"
                  style={{
                    width: 'clamp(2.5rem, 2vw + 2rem, 3rem)',
                    height: 'clamp(2.5rem, 2vw + 2rem, 3rem)',
                    pointerEvents: 'auto',
                    cursor: 'pointer',
                  }}
                >
                  <Icon
                    className="text-white group-hover:text-white transition-colors"
                    style={{
                      width: 'clamp(1rem, 0.5vw + 0.75rem, 1.25rem)',
                      height: 'clamp(1rem, 0.5vw + 0.75rem, 1.25rem)',
                    }}
                  />
                </a>
              ))}
            </div>
            {/* Powered by - Fluid font size */}
            <a
              href="https://restronaut.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white/80 transition-colors pointer-events-auto"
              style={{
                fontSize: 'clamp(0.625rem, 0.3vw + 0.5rem, 0.75rem)',
                pointerEvents: 'auto',
                cursor: 'pointer',
              }}
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
