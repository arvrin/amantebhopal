'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import HeaderGlobal from './layout/HeaderGlobal';

const heroImages = ['/hero1.jpeg', '/hero2.jpg'];

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 6000); // Change image every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      {/* Header */}
      <HeaderGlobal />

      {/* Main Content - Full Screen */}
      <div className="relative h-full w-full">
        {/* Background Images with Crossfade */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <motion.div
              key={image}
              initial={{ opacity: index === 0 ? 1 : 0 }}
              animate={{ opacity: currentImageIndex === index ? 1 : 0 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <Image
                src={image}
                alt="Amante Restaurant"
                fill
                className="object-cover opacity-60 grayscale-[30%] brightness-75"
                priority={index === 0}
              />
            </motion.div>
          ))}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/50" />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center px-5 sm:px-6 md:px-8">
          <div className="text-center max-w-xl sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl w-full">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="font-heading text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white mb-3 xs:mb-4 sm:mb-6 tracking-tight leading-tight px-2">
                Where Love<br />
                <span className="text-amante-pink">Meets</span> Flavor
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-body text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-amante-pink-light mb-6 xs:mb-8 sm:mb-12 max-w-3xl mx-auto px-6 sm:px-4"
            >
              Bhopal's First Multi-Concept Destination
              <br className="hidden sm:block" />
              <span className="sm:hidden"> - </span>
              Six Unique Spaces. Infinite Possibilities.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
            >
              <Link href="/reservations" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-br from-[#8B1538] to-[#6B0F28] hover:from-[#6B0F28] hover:to-[#8B1538] text-white font-bold text-lg sm:text-xl rounded-full transition-all duration-300 shadow-lg shadow-[#8B1538]/30"
                >
                  Reserve Your Table
                </motion.button>
              </Link>
              <Link href="/menu" className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold text-lg sm:text-xl rounded-full transition-all duration-300 border-2 border-white/30"
                >
                  Explore Menu
                </motion.button>
              </Link>
            </motion.div>

            {/* Scrolling Text Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="absolute bottom-20 xs:bottom-24 sm:bottom-28 md:bottom-32 left-0 right-0 overflow-hidden py-2.5 xs:py-3 sm:py-3.5 bg-gradient-to-r from-[#8B1538]/90 via-[#7A1230]/90 to-[#6B0F28]/90 backdrop-blur-lg shadow-2xl"
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
                <span className="inline-block mx-8">Banquets</span>
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
                <span className="inline-block mx-8">Banquets</span>
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
              className="absolute bottom-2 xs:bottom-3 sm:bottom-4 md:bottom-5 left-1/2 -translate-x-1/2"
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
                  href="https://www.facebook.com/cafeamante"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 xs:w-12 xs:h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
                >
                  <Facebook className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 text-white" />
                </a>
                <a
                  href="https://www.youtube.com/@cafeamante"
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
          </div>
        </div>

        {/* Decorative Elements - Hidden on mobile */}
        <div className="hidden sm:block absolute top-1/4 left-10 w-32 h-32 bg-amante-pink/10 rounded-full blur-3xl" />
        <div className="hidden sm:block absolute bottom-1/4 right-10 w-40 h-40 bg-amante-red/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
