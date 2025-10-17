'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Heart, ArrowDown } from 'lucide-react';

export default function HeroSection() {
  // 🎯 LOGO SIZE CONTROLLER - Change these values to make logo bigger/smaller
  const LOGO_SIZE = {
    mobile: '85vw',    // 85% of screen width on mobile (change this!)
    desktop: '60vw',   // 60% of screen width on desktop (change this!)
    maxWidth: '800px', // Maximum logo width (change this!)
    minWidth: '280px'  // Minimum logo width (change this!)
  };

  const scrollToForm = () => {
    document.querySelector('#lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSpaces = () => {
    document.querySelector('#spaces')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen bg-amante-red flex items-center justify-center px-4 relative overflow-hidden">
      {/* Subtle Brand Elements */}
      <div className="absolute inset-0 opacity-10">
        <Heart className="absolute top-20 left-20 w-12 h-12 text-amante-pink-light" />
        <Heart className="absolute bottom-32 right-16 w-8 h-8 text-amante-pink-light" />
        <Heart className="absolute top-1/3 right-1/4 w-10 h-10 text-amante-pink-light" />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
        
        {/* Logo - Massive & Dominant */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Image
            src="/assets/logos/With Tagline/SVG/Pink Logo_Tagline.svg"
            alt="Amante - Where love, happiness, and celebrations belong together"
            width={1200}
            height={540}
            className="mx-auto scale-110"
            priority
            style={{ 
              width: `clamp(${LOGO_SIZE.minWidth}, ${LOGO_SIZE.desktop}, ${LOGO_SIZE.maxWidth})`,
              height: 'auto',
            }}
            sizes={`(max-width: 768px) ${LOGO_SIZE.mobile}, ${LOGO_SIZE.desktop}`}
          />
        </motion.div>

        {/* Refined Coming Soon Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <span className="bg-white text-amante-red px-8 py-3 rounded-full font-avenir-bold text-xl shadow-2xl border-2 border-amante-pink-light/30 inline-flex items-center gap-3">
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-amante-red"
              >
                ♦
              </motion.span>
              Coming Soon
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="text-amante-red"
              >
                ♦
              </motion.span>
            </span>
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-110 -z-10"></div>
          </div>
        </motion.div>

        {/* Perfectly Centered Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center justify-center mb-10"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-laginchy-bold text-white leading-tight text-center font-bold">
            {/* Mobile: Two lines */}
            <div className="block lg:hidden">
              <div className="mb-2">Eat • Sip</div>
              <div>Dance • Celebrate</div>
            </div>
            {/* Desktop/Web: Single line */}
            <div className="hidden lg:block">
              Eat • Sip • Dance • Celebrate
            </div>
          </h1>
        </motion.div>

        {/* Simplified Subtitle - Since tagline is in logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col items-center justify-center mb-12 max-w-4xl mx-auto"
        >
          <p className="text-xl md:text-2xl lg:text-3xl text-center leading-relaxed font-medium">
            <span className="text-amante-pink-light font-avenir-bold">
              Bhopal&apos;s First Multi-Concept Destination
            </span>
          </p>
        </motion.div>

        {/* Clickable Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center mb-14"
        >
          <motion.a
            href="https://maps.app.goo.gl/r4rCJLWvvevjJZL77"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-white/25 transition-all duration-300 border border-white/20 hover:border-white/40 cursor-pointer group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-amante-pink-light group-hover:text-amante-pink transition-colors"
            >
              <MapPin className="w-6 h-6" />
            </motion.div>
            <span className="font-avenir font-medium text-lg group-hover:text-white transition-colors">
              1, Mahendra Business Square, Bhopal
            </span>
            <motion.span
              className="text-amante-pink-light text-sm opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ x: -10 }}
              whileHover={{ x: 0 }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Refined Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.button
            onClick={scrollToForm}
            className="relative bg-white text-amante-red px-10 py-5 rounded-2xl font-avenir-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden group border-2 border-transparent hover:border-amante-pink-light/30 w-full sm:w-auto"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Button background animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-amante-pink-light/10 to-amante-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <Heart className="w-6 h-6 fill-current" />
            </motion.div>
            <span className="relative z-10">Join the Celebration List</span>
          </motion.button>
          
          <motion.button
            onClick={scrollToSpaces}
            className="relative border-3 border-white/80 text-white px-10 py-5 rounded-2xl font-avenir-bold text-xl hover:bg-white/15 hover:border-white transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-sm group w-full sm:w-auto"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            style={{ borderWidth: '3px' }}
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="text-amante-pink-light text-lg group-hover:text-white transition-colors"
            >
              ♦
            </motion.span>
            <span>Explore 6 Spaces</span>
            <motion.span
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="text-amante-pink-light text-lg group-hover:text-white transition-colors"
            >
              ♦
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Clean Scroll Prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col items-center cursor-pointer group mt-4"
          onClick={scrollToSpaces}
        >
          <motion.span
            className="font-avenir font-medium text-white/80 text-sm mb-4 tracking-widest uppercase group-hover:text-amante-pink-light transition-colors duration-300"
            whileHover={{ y: -1 }}
          >
            Discover More
          </motion.span>
          
          {/* Simple animated arrow */}
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/60 group-hover:text-amante-pink-light transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}