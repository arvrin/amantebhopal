'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Heart, Coffee, Utensils, Music, Calendar, Clock, MapPin, Instagram, Facebook, Twitter, Wine, Star, Sparkles } from 'lucide-react';
import InteractiveTimeline from './InteractiveTimeline';
import LeadCaptureForm from './LeadCaptureForm';
import CountdownTimer from './CountdownTimer';
import SocialShare from './SocialShare';

export default function ComingSoon() {
  const [mounted, setMounted] = useState(false);
  const [activeSpace, setActiveSpace] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="coming-soon-bg min-h-screen overflow-x-hidden">
      {/* Agency-Level Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Sophisticated Background System */}
        <div className="absolute inset-0">
          {/* Premium Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-amante-red via-amante-red-dark to-amante-red"></div>
          
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amante-pink/20 to-transparent transform rotate-12"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amante-pink/10 to-transparent transform -rotate-12"></div>
          </div>

          {/* Refined Floating Elements */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`diamond-${i}`}
                className="absolute text-amante-pink/20 text-lg select-none pointer-events-none"
                style={{
                  top: `${15 + (i * 12)}%`,
                  left: `${8 + (i % 3) * 35}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 180, 360],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeInOut"
                }}
              >
                ♦
              </motion.div>
            ))}
            
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`heart-${i}`}
                className="absolute text-amante-pink-light/15 select-none pointer-events-none"
                style={{
                  top: `${25 + (i * 20)}%`,
                  right: `${10 + (i % 2) * 20}%`,
                }}
                animate={{
                  scale: [0.8, 1.1, 0.8],
                  x: [-5, 5, -5],
                  opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay: i * 1.5,
                  ease: "easeInOut"
                }}
              >
                <Heart className="w-3 h-3 fill-current" />
              </motion.div>
            ))}
          </div>

          {/* Vignette Effect */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-amante-red-dark/30"></div>
        </div>

        {/* Main Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            
            {/* Enhanced Logo Presentation - Agency Standard */}
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
              className="mb-12 lg:mb-16"
            >
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative inline-block group"
              >
                {/* Premium Background for Logo */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-3xl scale-110 opacity-90 shadow-2xl"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl scale-105 shadow-inner"></div>
                
                <div className="relative z-10 p-8 mobile-logo">
                  <Image
                    src="/assets/logos/Primary Logo/SVG/Pink Logo.svg"
                    alt="Amante - Bhopal's Premier Celebration Destination"
                    width={700}
                    height={315}
                    className="w-full max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto drop-shadow-2xl mobile-logo"
                    priority
                    style={{
                      filter: 'drop-shadow(0 8px 25px rgba(0,0,0,0.15)) brightness(1.1) contrast(1.1)'
                    }}
                  />
                </div>
                
                {/* Enhanced Glow Effect */}
                <motion.div 
                  className="absolute inset-0 bg-amante-pink-light/20 blur-3xl scale-125 rounded-full"
                  animate={{ 
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1.2, 1.3, 1.2]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Enhanced Coming Soon Banner - Agency Standard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-12"
            >
              <span className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-xl border-2 border-white/30 text-white px-8 py-4 rounded-full font-avenir-bold text-xl shadow-2xl hover:bg-white/30 transition-all duration-300 mobile-banner">
                <motion.span 
                  className="text-amante-pink-light text-2xl"
                  animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  ♦
                </motion.span>
                Coming Soon
                <motion.span 
                  className="text-amante-pink-light text-2xl"
                  animate={{ rotate: [360, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  ♦
                </motion.span>
              </span>
            </motion.div>

            {/* Enhanced Typography Hierarchy - Agency Standard */}
            <div className="mb-12 lg:mb-16">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-laginchy-bold leading-[0.85] mb-8 text-white drop-shadow-2xl mobile-title"
                style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3), 0 0 40px rgba(255,255,255,0.1)' }}
              >
                <span className="relative inline-block text-white">
                  Eat
                  <motion.span 
                    className="absolute -top-1 -right-2 text-lg lg:text-xl text-amante-pink/70"
                    animate={{ 
                      scale: [1, 1.15, 1],
                      rotate: [0, 15, 0] 
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      delay: 0,
                      ease: "easeInOut"
                    }}
                  >
                    ♦
                  </motion.span>
                </span>
                
                <motion.span 
                  className="mx-2 md:mx-3 lg:mx-4 text-amante-pink/60"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  •
                </motion.span>
                
                <span className="relative inline-block text-amante-pink-light drop-shadow-lg">
                  Sip
                  <motion.div
                    className="absolute -top-0.5 -right-1.5"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, -10, 0]
                    }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity,
                      delay: 0.8,
                      ease: "easeInOut"
                    }}
                  >
                    <Heart className="w-3 h-3 lg:w-4 lg:h-4 fill-current text-amante-pink/70" />
                  </motion.div>
                </span>
                
                <br className="block" />
                
                <span className="relative inline-block text-white">
                  Dance
                  <motion.span 
                    className="absolute -top-1 -right-2 text-lg lg:text-xl text-amante-pink/70"
                    animate={{ 
                      scale: [1, 1.15, 1],
                      rotate: [0, -15, 0] 
                    }}
                    transition={{ 
                      duration: 3.5, 
                      repeat: Infinity,
                      delay: 1.5,
                      ease: "easeInOut"
                    }}
                  >
                    ♦
                  </motion.span>
                </span>
                
                <motion.span 
                  className="mx-2 md:mx-3 lg:mx-4 text-amante-pink/60"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  •
                </motion.span>
                
                <span className="relative inline-block text-amante-pink-light drop-shadow-lg">
                  Celebrate
                  <motion.div
                    className="absolute -top-0.5 -right-1.5"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, 0]
                    }}
                    transition={{ 
                      duration: 2.8, 
                      repeat: Infinity,
                      delay: 2.2,
                      ease: "easeInOut"
                    }}
                  >
                    <Heart className="w-3 h-3 lg:w-4 lg:h-4 fill-current text-amante-pink/70" />
                  </motion.div>
                </span>
              </motion.h1>

              {/* Enhanced Subtitle - High Contrast */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="max-w-5xl mx-auto"
              >
                <p className="text-xl md:text-2xl lg:text-3xl font-avenir text-white leading-relaxed tracking-wide drop-shadow-lg mobile-subtitle">
                  <span className="text-amante-pink-light font-avenir-bold bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm">Bhopal&apos;s First Multi-Concept</span>
                  <br className="block mt-3" />
                  <span className="text-white/95">Destination of Love & Celebration</span>
                </p>
              </motion.div>
            </div>

            {/* Enhanced Location Badge - Agency Standard */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mb-16 lg:mb-20"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -4 }}
                className="inline-flex items-center gap-4 bg-white/15 backdrop-blur-xl border-2 border-white/25 text-white px-8 py-4 lg:px-10 lg:py-5 rounded-2xl font-avenir-bold text-lg shadow-2xl relative overflow-hidden group mobile-location"
              >
                {/* Enhanced Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10"
                  animate={{ x: [-100, 100] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                
                <motion.span 
                  className="text-amante-pink-light text-xl z-10"
                  animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  ♦
                </motion.span>
                <MapPin className="w-6 h-6 z-10 text-amante-pink-light" />
                <span className="text-lg z-10 drop-shadow-md">1, Mahendra Business Square, Bawdiya Kalan, Bhopal</span>
                <motion.span 
                  className="text-amante-pink-light text-xl z-10"
                  animate={{ rotate: [360, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  ♦
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Primary CTA Section - Agency Standard */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 mobile-cta-stack"
            >
              {/* Primary CTA */}
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const leadSection = document.querySelector('section:nth-of-type(4)');
                  leadSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative bg-white text-amante-red px-10 py-5 rounded-2xl font-avenir-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden group min-w-[280px] cursor-pointer mobile-cta-button"
              >
                {/* Button Background Animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-amante-pink-light/20 to-amante-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 15, 0]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                  >
                    <Heart className="w-6 h-6 fill-current" />
                  </motion.div>
                  <span>Join the Celebration List</span>
                </div>
                
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 opacity-0"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
              </motion.button>

              {/* Secondary CTA */}
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const spacesSection = document.querySelector('section:nth-of-type(3)');
                  spacesSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative bg-transparent border-2 border-white text-white px-8 py-5 rounded-2xl font-avenir-bold text-lg shadow-xl hover:bg-white/10 transition-all duration-300 overflow-hidden group min-w-[220px] cursor-pointer mobile-cta-button"
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <Calendar className="w-5 h-5" />
                  <span>Explore Spaces</span>
                </div>
              </motion.button>
            </motion.div>

            {/* Social Proof Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-wrap justify-center gap-8 text-white/80 text-sm mobile-social-proof"
            >
              <div className="flex items-center gap-2">
                <motion.span 
                  className="text-amante-pink-light text-lg"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  ⭐
                </motion.span>
                <span className="font-avenir">847+ Early Birds</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.span 
                  className="text-amante-pink-light text-lg"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  📍
                </motion.span>
                <span className="font-avenir">Prime MP Nagar Location</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.span 
                  className="text-amante-pink-light text-lg"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  🎉
                </motion.span>
                <span className="font-avenir">Opening March 2025</span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Enhanced Scroll Indicator - Agency Standard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 lg:bottom-12 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div 
            className="flex flex-col items-center text-white/90 group cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => {
              const nextSection = document.querySelector('section:nth-of-type(2)');
              nextSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className="text-center mb-4 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20">
              <span className="font-avenir-bold text-sm tracking-wider uppercase text-white group-hover:text-amante-pink-light transition-colors block">
                6 Unique Spaces
              </span>
              <span className="font-avenir text-xs text-white/80 group-hover:text-amante-pink-light transition-colors">
                Discover Your Perfect Moment
              </span>
            </div>
            <div className="flex flex-col items-center">
              <motion.div 
                className="w-6 h-12 border-2 border-white/60 rounded-full flex justify-center relative group-hover:border-amante-pink-light transition-colors bg-white/5 backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div 
                  className="w-1.5 h-3 bg-white/60 rounded-full mt-2 group-hover:bg-amante-pink-light transition-colors"
                  animate={{ y: [0, 16, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>
              <motion.div
                className="mt-3 bg-white/10 rounded-full p-2 backdrop-blur-sm"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-4 h-4 fill-current text-white/60 group-hover:text-amante-pink-light transition-colors" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Interactive Timeline Section - Enhanced with Red Theme */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Red Background with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-amante-red via-amante-red-dark to-amante-red opacity-95"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`timeline-diamond-${i}`}
              className="absolute text-amante-pink/20 text-2xl select-none pointer-events-none"
              style={{
                top: `${20 + (i * 15)}%`,
                left: `${15 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [-8, 8, -8],
                rotate: [0, 90, 180, 270, 360],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 12 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 1.2,
                ease: "easeInOut"
              }}
            >
              ♦
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="text-center mb-20"
          >
            {/* Brand Decoration Above Title */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <div className="w-20 h-px bg-amante-pink/60"></div>
              <Heart className="w-6 h-6 text-amante-pink fill-current" />
              <div className="w-20 h-px bg-amante-pink/60"></div>
            </motion.div>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-laginchy-bold text-amante-pink-light leading-none mb-8">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="block"
              >
                Choose Your
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="block text-amante-pink relative"
              >
                Perfect Moment
                <motion.span 
                  className="absolute -top-2 -right-6 text-2xl text-amante-pink-light/70"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 15, 0] 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ♦
                </motion.span>
              </motion.span>
            </h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl md:text-2xl font-avenir text-amante-pink-light/90 max-w-4xl mx-auto leading-relaxed tracking-wide"
            >
              From sunrise coffee rituals to moonlit celebrations,
              <br className="hidden sm:block" />
              <span className="text-amante-pink font-avenir-bold"> discover how every hour at Amante tells your story.</span>
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <InteractiveTimeline activeSpace={activeSpace} setActiveSpace={setActiveSpace} />
          </motion.div>
        </div>
      </section>

      {/* Progress & Social Proof Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-white via-amante-pink-light/20 to-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 text-6xl text-amante-red transform rotate-12">♦</div>
          <div className="absolute bottom-10 left-10 text-6xl text-amante-red transform -rotate-12">♦</div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-baskerville text-amante-red mb-6">
              Building Dreams in MP Nagar
            </h2>
            <p className="text-xl font-avenir text-gray-700 max-w-3xl mx-auto">
              Watch as Bhopal's most anticipated destination takes shape. Every brick, every detail, 
              crafted with love for your perfect celebrations.
            </p>
          </motion.div>

          {/* Progress Updates Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Construction Progress */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-baskerville text-amante-red">Construction Progress</h3>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-avenir font-semibold">
                  On Schedule
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-avenir text-gray-700">Foundation & Structure</span>
                  <span className="font-avenir font-semibold text-green-600">100%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-full"></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-avenir text-gray-700">Interior Design</span>
                  <span className="font-avenir font-semibold text-amante-red">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-amante-red h-2 rounded-full w-[85%]"></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-avenir text-gray-700">Kitchen & Equipment</span>
                  <span className="font-avenir font-semibold text-blue-600">70%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-[70%]"></div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-avenir text-gray-700">Final Touches</span>
                  <span className="font-avenir font-semibold text-yellow-600">40%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full w-[40%]"></div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amante-pink-light/50 rounded-lg">
                <p className="font-avenir text-sm text-gray-700 text-center">
                  <strong className="text-amante-red">Latest Update:</strong> Premium Italian marble installed in the lobby. 
                  Rooftop dining area nearing completion with stunning city views! 🌟
                </p>
              </div>
            </motion.div>

            {/* Community & Social Proof */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-baskerville text-amante-red mb-6">Community Buzz</h3>

              {/* Social Proof Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-amante-pink-light/30 rounded-lg">
                  <div className="text-3xl font-baskerville text-amante-red font-bold">847+</div>
                  <div className="text-sm font-avenir text-gray-600">Early Birds</div>
                </div>
                <div className="text-center p-4 bg-amante-pink-light/30 rounded-lg">
                  <div className="text-3xl font-baskerville text-amante-red font-bold">2.1K+</div>
                  <div className="text-sm font-avenir text-gray-600">Instagram Followers</div>
                </div>
                <div className="text-center p-4 bg-amante-pink-light/30 rounded-lg">
                  <div className="text-3xl font-baskerville text-amante-red font-bold">15+</div>
                  <div className="text-sm font-avenir text-gray-600">Media Features</div>
                </div>
                <div className="text-center p-4 bg-amante-pink-light/30 rounded-lg">
                  <div className="text-3xl font-baskerville text-amante-red font-bold">50+</div>
                  <div className="text-sm font-avenir text-gray-600">Event Bookings</div>
                </div>
              </div>

              {/* Enhanced Local Press Mentions */}
              <div className="space-y-5 relative z-10">
                <h4 className="font-laginchy-bold text-amante-red text-2xl mb-6">In the News</h4>
                
                {[
                  { quote: "Bhopal's Most Anticipated Multi-Concept Destination", source: "Dainik Bhaskar", icon: "📰" },
                  { quote: "Revolutionary Dining Experience Coming to MP", source: "Times of India", icon: "🎆" },
                  { quote: "Game-Changer for Bhopal's Nightlife Scene", source: "Free Press Journal", icon: "🎉" }
                ].map((news, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="p-5 bg-gradient-to-r from-amante-pink-light/20 to-white rounded-2xl border-l-4 border-amante-red shadow-lg group cursor-pointer overflow-hidden relative"
                  >
                    <motion.div
                      className="absolute inset-0 bg-amante-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                    <div className="flex items-start gap-4 relative z-10">
                      <motion.span 
                        className="text-2xl mt-1"
                        animate={{ 
                          rotate: [0, 15, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          delay: index * 0.5,
                          ease: "easeInOut"
                        }}
                      >
                        {news.icon}
                      </motion.span>
                      <div className="flex-1">
                        <p className="font-avenir text-gray-700 leading-relaxed">
                          <span className="font-avenir-bold text-amante-red text-lg">"{news.quote}"</span>
                          <br />
                          <span className="text-gray-500 font-avenir text-sm mt-1 block">- {news.source}</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Premium Location Context */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99], delay: 0.4 }}
            className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-12 shadow-2xl text-center border border-amante-pink/20 hover:shadow-amante-red/20 transition-all duration-500 overflow-hidden group"
            whileHover={{ y: -8, scale: 1.01 }}
          >
            {/* Premium Background Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-amante-pink-light/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={false}
            />
            
            {/* Central Brand Decoration */}
            <motion.div 
              className="absolute top-8 left-1/2 transform -translate-x-1/2"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <div className="text-amante-red/20 text-4xl">♦</div>
            </motion.div>

            <div className="relative z-10 pt-8">
              <motion.h3 
                className="text-4xl md:text-5xl font-laginchy-bold text-amante-red mb-8 leading-tight"
                animate={{ scale: [1, 1.01, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="block">Prime Location</span>
                <span className="text-amante-red-dark">in the Heart of Bhopal</span>
              </motion.h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                {[
                  { icon: MapPin, text: 'Mahendra Business Square', emoji: '🏢', color: 'from-blue-100 to-blue-50' },
                  { icon: Clock, text: '5 min from DB City Mall', emoji: '🛍️', color: 'from-green-100 to-green-50' },
                  { icon: Heart, text: 'Premium Neighborhood', emoji: '🏡', color: 'from-purple-100 to-purple-50' }
                ].map((item, index) => (
                  <motion.div 
                    key={item.text}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className={`p-6 bg-gradient-to-br ${item.color} rounded-2xl shadow-lg border border-amante-pink/20 group/item cursor-pointer relative overflow-hidden`}
                  >
                    <motion.div
                      className="absolute inset-0 bg-amante-red/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />
                    <div className="relative z-10">
                      <motion.div 
                        className="text-3xl mb-3"
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity,
                          delay: index * 0.7,
                          ease: "easeInOut"
                        }}
                      >
                        {item.emoji}
                      </motion.div>
                      <item.icon className="w-6 h-6 text-amante-red mx-auto mb-3" />
                      <span className="font-avenir-bold text-gray-700 text-lg leading-tight block">
                        {item.text}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.p 
                className="font-avenir text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <span className="text-amante-red font-avenir-bold">Strategically located in Bhopal&apos;s most vibrant area,</span>
                {" Amante is easily accessible from all major landmarks. "}
                <br className="hidden sm:block" />
                Walking distance from corporate hubs, shopping centers, and the city&apos;s cultural heart.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Spaces Preview Grid - Agency Typography */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Sophisticated Background System */}
        <div className="absolute inset-0">
          {/* Primary Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white via-amante-pink-light/20 to-white"></div>
          
          {/* Brand Pattern Overlay */}
          <div className="absolute inset-0 opacity-3">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`spaces-diamond-${i}`}
                className="absolute text-amante-red text-5xl select-none pointer-events-none"
                style={{
                  top: `${15 + (i * 12)}%`,
                  left: `${8 + (i % 4) * 22}%`,
                  transform: `rotate(${i * 45}deg)`,
                }}
                animate={{
                  rotate: [i * 45, (i * 45) + 360],
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.02, 0.05, 0.02]
                }}
                transition={{
                  duration: 15 + Math.random() * 5,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeInOut"
                }}
              >
                ♦
              </motion.div>
            ))}
          </div>

          {/* Texture Overlay */}
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-amante-red/2 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="text-center mb-24"
          >
            {/* Refined Brand Decoration */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center justify-center gap-6 mb-12"
            >
              <div className="w-24 h-px bg-gradient-to-r from-transparent to-amante-red"></div>
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360] 
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-amante-red text-2xl"
              >
                ♦
              </motion.div>
              <Heart className="w-7 h-7 text-amante-red fill-current" />
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [360, 180, 0] 
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-amante-red text-2xl"
              >
                ♦
              </motion.div>
              <div className="w-24 h-px bg-gradient-to-l from-transparent to-amante-red"></div>
            </motion.div>

            {/* Masterful Typography Treatment */}
            <div className="space-y-8">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-5xl md:text-7xl lg:text-8xl font-laginchy-bold text-amante-red leading-none"
              >
                <span className="block mb-2">Six Distinct</span>
                <span className="relative inline-block text-amante-red-dark">
                  Experiences
                  <motion.span 
                    className="absolute -top-3 -right-8 text-3xl text-amante-red/60"
                    animate={{ 
                      scale: [1, 1.15, 1],
                      rotate: [0, 25, 0] 
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    ♦
                  </motion.span>
                </span>
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="max-w-5xl mx-auto space-y-4"
              >
                <p className="text-2xl md:text-3xl font-avenir text-gray-700 leading-relaxed">
                  <span className="text-amante-red font-avenir-bold">Each space at Amante</span> tells its own story,
                </p>
                <p className="text-xl md:text-2xl font-avenir text-gray-600 leading-relaxed tracking-wide">
                  meticulously designed to capture every mood, every celebration,
                  <br className="hidden md:block" />
                  <span className="text-amante-red font-avenir-bold"> every perfect moment in your life.</span>
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Grid with Varying Sizes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
            {[
              { 
                name: 'Café & Bakery', 
                icon: Coffee, 
                customIcon: '☕',
                description: 'Bhopal\'s first French-style patisserie', 
                details: 'Single-origin beans • Artisan croissants • Instagram-worthy presentations',
                size: 'standard',
                capacity: '80 seats',
                highlight: 'Opens 7 AM daily'
              },
              { 
                name: 'Rooftop Restro', 
                icon: Utensils, 
                customIcon: '🌟',
                description: 'MP\'s highest dining with 360° city panorama', 
                details: 'Bhopal skyline views • Chef\'s signature thalis • Perfect for proposals',
                size: 'large',
                capacity: '120 seats',
                highlight: 'Sunset specials'
              },
              { 
                name: 'Intimate Lounge', 
                icon: Wine, 
                customIcon: '🥂',
                description: 'Award-winning mixology in cozy sophistication', 
                details: 'Craft cocktails • Private booths • Live acoustic nights',
                size: 'standard',
                capacity: '60 seats',
                highlight: 'Happy hours 6-8 PM'
              },
              { 
                name: 'Premier Club', 
                icon: Music, 
                customIcon: '💃',
                description: 'Bhopal\'s most exclusive nightlife destination', 
                details: 'International DJs • VIP bottle service • Premium sound system',
                size: 'large',
                capacity: '200 capacity',
                highlight: 'Celebrity DJ nights'
              },
              { 
                name: 'Private Dining', 
                icon: Heart, 
                customIcon: '💎',
                description: 'Exclusive chef\'s table experiences', 
                details: 'Personal chef service • Wine pairings • Intimate celebrations',
                size: 'standard',
                capacity: '12-24 guests',
                highlight: 'By reservation only'
              },
              { 
                name: 'Grand Banquets', 
                icon: Sparkles, 
                customIcon: '🏰',
                description: 'Where Bhopal\'s grandest celebrations unfold', 
                details: 'Wedding specialists • Full event planning • Luxury décor',
                size: 'large',
                capacity: '500 guests',
                highlight: 'Complete event solutions'
              }
            ].map((space, index) => (
              <motion.div
                key={space.name}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                className={`relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group cursor-pointer ${
                  space.size === 'large' ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
                whileHover={{ y: -12, scale: 1.02, rotateY: 2 }}
                onHoverStart={() => setActiveSpace(space.name)}
                onHoverEnd={() => setActiveSpace('')}
              >
                {/* Enhanced Background Pattern */}
                <div className="absolute top-0 right-0 p-6 text-6xl text-amante-red/5 group-hover:text-amante-red/10 transition-colors">
                  <motion.div
                    animate={activeSpace === space.name ? {
                      scale: [1, 1.2, 1],
                      rotate: [0, 15, 0]
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: activeSpace === space.name ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  >
                    {space.customIcon}
                  </motion.div>
                </div>
                
                {/* Premium Gradient Overlay on Hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-amante-red/5 via-transparent to-amante-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />

                {/* Card Content */}
                <div className="p-8 relative z-10">
                  {/* Icon and Header */}
                  <div className="flex items-center justify-between mb-6">
                    <motion.div 
                      className="p-4 bg-amante-red/10 rounded-xl group-hover:bg-amante-red group-hover:text-white transition-all duration-300"
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      animate={activeSpace === space.name ? {
                        scale: [1, 1.1, 1],
                        rotate: [0, 360]
                      } : {}}
                      transition={activeSpace === space.name ? {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      } : { duration: 0.5 }}
                    >
                      <space.icon className="w-8 h-8 text-amante-red group-hover:text-white transition-colors" />
                    </motion.div>
                    
                    <div className="text-right">
                      <motion.span 
                        className="text-sm font-avenir font-bold text-amante-red bg-amante-red/10 px-3 py-1 rounded-full"
                        animate={activeSpace === space.name ? {
                          scale: [1, 1.05, 1],
                          backgroundColor: ["rgba(185, 28, 28, 0.1)", "rgba(185, 28, 28, 0.2)", "rgba(185, 28, 28, 0.1)"]
                        } : {}}
                        transition={{
                          duration: 2,
                          repeat: activeSpace === space.name ? Infinity : 0,
                          ease: "easeInOut"
                        }}
                      >
                        {space.capacity}
                      </motion.span>
                    </div>
                  </div>

                  {/* Enhanced Title and Description */}
                  <motion.h3 
                    className="text-2xl font-baskerville text-amante-red mb-3 group-hover:text-amante-red transition-colors"
                    animate={activeSpace === space.name ? {
                      scale: [1, 1.02, 1],
                      color: ["#B91C1C", "#DC2626", "#B91C1C"]
                    } : {}}
                    transition={{
                      duration: 2.5,
                      repeat: activeSpace === space.name ? Infinity : 0,
                      ease: "easeInOut"
                    }}
                  >
                    {space.name}
                  </motion.h3>
                  
                  <p className="font-avenir text-gray-700 text-lg mb-4 leading-relaxed group-hover:text-gray-800 transition-colors">
                    {space.description}
                  </p>

                  {/* Details */}
                  <div className="border-t border-gray-100 pt-4 mb-4">
                    <p className="font-avenir text-gray-600 text-sm leading-relaxed">
                      {space.details}
                    </p>
                  </div>

                  {/* Highlight and CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-amante-red" />
                      <span className="text-sm font-avenir font-semibold text-amante-red">
                        {space.highlight}
                      </span>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-amante-red font-avenir font-semibold text-sm hover:text-red-700 transition-colors flex items-center gap-1 group/btn"
                    >
                      Explore Space
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </motion.button>
                  </div>

                  {/* Hover Effect Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-amante-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />
                </div>

                {/* Brand decoration on hover */}
                <motion.div
                  className="absolute bottom-4 right-4 text-amante-red text-2xl opacity-0 group-hover:opacity-30 transition-all duration-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  ♦
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-20 bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg"
          >
            <h3 className="text-3xl font-baskerville text-amante-red mb-4">
              Your Perfect Space Awaits
            </h3>
            <p className="font-avenir text-gray-700 mb-8 text-lg max-w-2xl mx-auto">
              From intimate coffee dates to grand wedding celebrations, 
              discover which Amante experience speaks to your heart.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-amante-red text-white px-8 py-4 rounded-full font-avenir font-semibold hover:bg-red-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Book Your Space
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="border-2 border-amante-red text-amante-red px-8 py-4 rounded-full font-avenir font-semibold hover:bg-amante-red hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Join Waitlist
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lead Capture Section - Enhanced Typography */}
      <section className="relative py-32 px-4 overflow-hidden">
        {/* Sophisticated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amante-pink-light/30 via-white to-amante-pink-light/20"></div>
          
          {/* Floating Brand Elements */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`capture-heart-${i}`}
                className="absolute text-amante-red/10 select-none pointer-events-none"
                style={{
                  top: `${10 + (i * 15)}%`,
                  left: `${5 + (i % 3) * 30}%`,
                }}
                animate={{
                  scale: [0.8, 1.2, 0.8],
                  y: [-10, 10, -10],
                  opacity: [0.05, 0.15, 0.05],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: i * 1.5,
                  ease: "easeInOut"
                }}
              >
                <Heart className="w-8 h-8 fill-current" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="mb-16"
          >
            {/* Premium Brand Decoration */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-center gap-4 mb-12"
            >
              <div className="w-20 h-px bg-amante-red/60"></div>
              <motion.span 
                className="text-amante-red text-2xl"
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              >
                ♦
              </motion.span>
              <Heart className="w-6 h-6 text-amante-red fill-current" />
              <motion.span 
                className="text-amante-red text-2xl"
                animate={{ rotate: [360, 180, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              >
                ♦
              </motion.span>
              <div className="w-20 h-px bg-amante-red/60"></div>
            </motion.div>

            {/* Masterful Typography */}
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-laginchy-bold text-amante-red leading-none mb-10"
            >
              <span className="block mb-3">Be the First</span>
              <span className="relative inline-block">
                to Celebrate
                <motion.div
                  className="absolute -top-2 -right-6"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, -15, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Heart className="w-6 h-6 text-amante-red/70 fill-current" />
                </motion.div>
              </span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="max-w-4xl mx-auto space-y-6 mb-16"
            >
              <p className="text-2xl md:text-3xl font-avenir text-gray-700 leading-relaxed">
                <span className="text-amante-red font-avenir-bold">Join our exclusive circle</span> and be among the first
              </p>
              <p className="text-xl md:text-2xl font-avenir text-gray-600 leading-relaxed tracking-wide">
                to experience <span className="text-amante-red font-avenir-bold">Bhopal's most anticipated destination.</span>
                <br className="hidden sm:block" />
                Reserve your opening week celebration today.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <LeadCaptureForm />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Premium Experience Statement - Agency Typography */}
      <section className="relative py-32 px-4 text-center overflow-hidden">
        {/* Sophisticated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-amante-pink-light/20 via-white to-amante-pink-light/30"></div>
          
          {/* Floating Brand Elements */}
          <div className="absolute inset-0">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`statement-heart-${i}`}
                className="absolute text-amante-red/8 select-none pointer-events-none"
                style={{
                  top: `${20 + (i * 20)}%`,
                  left: `${15 + (i % 2) * 70}%`,
                }}
                animate={{
                  scale: [0.8, 1.3, 0.8],
                  rotate: [0, 15, 0],
                  opacity: [0.05, 0.12, 0.05],
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: i * 2,
                  ease: "easeInOut"
                }}
              >
                <Heart className="w-16 h-16 fill-current" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Premium Brand Decoration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-8 mb-16"
          >
            <div className="w-32 h-px bg-gradient-to-r from-transparent to-amante-red"></div>
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="text-amante-red text-4xl"
            >
              ♦
            </motion.div>
            <Heart className="w-10 h-10 text-amante-red fill-current" />
            <motion.div
              animate={{ 
                rotate: [360, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }
              }}
              className="text-amante-red text-4xl"
            >
              ♦
            </motion.div>
            <div className="w-32 h-px bg-gradient-to-l from-transparent to-amante-red"></div>
          </motion.div>

          {/* Masterful Quote Typography */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
            className="mb-20"
          >
            <motion.blockquote 
              className="relative"
              animate={{ scale: [1, 1.005, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Opening Quote Mark */}
              <motion.span 
                className="absolute -top-8 -left-4 md:-left-16 text-6xl md:text-8xl text-amante-red/30 font-laginchy-bold leading-none"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                “
              </motion.span>
              
              <div className="text-3xl md:text-5xl lg:text-6xl font-laginchy text-amante-red leading-tight mb-8 px-4 md:px-16">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="block mb-4"
                >
                  A first date, a rooftop evening,
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="block mb-4"
                >
                  or a wedding night —
                </motion.span>
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="block font-laginchy-bold text-amante-red-dark relative"
                >
                  every celebration belongs at Amante.
                  <motion.div
                    className="absolute -bottom-2 -right-4"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, -10, 0]
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Heart className="w-8 h-8 text-amante-red/60 fill-current" />
                  </motion.div>
                </motion.span>
              </div>
              
              {/* Closing Quote Mark */}
              <motion.span 
                className="absolute -bottom-4 -right-4 md:-right-16 text-6xl md:text-8xl text-amante-red/30 font-laginchy-bold leading-none"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                ”
              </motion.span>
            </motion.blockquote>
          </motion.div>

          {/* Enhanced Attribution */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-amante-red/20">
              <motion.div
                animate={{ 
                  rotate: [0, 360]
                }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="text-amante-red text-2xl"
              >
                ♦
              </motion.div>
              <span className="font-avenir text-amante-red text-lg italic">
                The Amante Philosophy
              </span>
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Heart className="w-5 h-5 text-amante-red fill-current" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Footer - Agency-Level Design */}
      <footer className="relative bg-amante-black text-white py-12 px-4 overflow-hidden">
        {/* Premium Background Effects */}
        <div className="absolute inset-0">
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-amante-red/20 via-transparent to-amante-pink/20"></div>
          </div>
          
          {/* Floating Brand Elements */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`footer-diamond-${i}`}
                className="absolute text-amante-red/10 text-3xl select-none pointer-events-none"
                style={{
                  top: `${15 + (i * 15)}%`,
                  left: `${10 + (i % 3) * 30}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 180, 360],
                  opacity: [0.05, 0.15, 0.05],
                }}
                transition={{
                  duration: 12 + Math.random() * 4,
                  repeat: Infinity,
                  delay: i * 1.8,
                  ease: "easeInOut"
                }}
              >
                ♦
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            {/* Premium Logo Presentation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative inline-block"
              >
                <Image
                  src="/assets/logos/Secondary Logo/SVG/Pink Logo_Secondary.svg"
                  alt="Amante Logo"
                  width={200}
                  height={85}
                  className="mx-auto"
                />
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-amante-pink/5 blur-2xl scale-110 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              </motion.div>
            </motion.div>
            
            {/* Brand Tagline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-laginchy text-xl md:text-2xl text-amante-pink mb-8 leading-relaxed"
            >
              Where love, happiness, and celebrations
              <br className="hidden sm:block" />
              <span className="text-amante-pink-light font-laginchy-bold"> belong together.</span>
            </motion.p>
            
            {/* Enhanced Contact Information */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-3xl mx-auto"
            >
              {[
                { icon: '🌐', text: 'www.cafeamante.com', href: 'https://www.cafeamante.com', type: 'website' },
                { icon: '📧', text: 'contact.cafeamante@gmail.com', href: 'mailto:contact.cafeamante@gmail.com', type: 'email' }
              ].map((contact, index) => (
                <motion.div
                  key={contact.type}
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="p-4 bg-amante-red/10 rounded-xl border border-amante-red/20 hover:border-amante-red/40 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center justify-center gap-4">
                    <motion.span 
                      className="text-3xl"
                      animate={{ 
                        rotate: [0, 10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        delay: index * 1.5,
                        ease: "easeInOut"
                      }}
                    >
                      {contact.icon}
                    </motion.span>
                    <a 
                      href={contact.href} 
                      className="font-avenir text-lg text-amante-pink-light hover:text-amante-red transition-colors group-hover:text-amante-red"
                      {...(contact.type === 'website' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {contact.text}
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Social Media */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-6"
            >
              <h4 className="font-avenir-bold text-amante-pink text-lg mb-6 uppercase tracking-widest">Follow Our Journey</h4>
              <div className="flex justify-center gap-8">
                {[
                  { icon: Instagram, href: 'https://www.instagram.com/cafe_amante_india/', label: 'Instagram', color: 'hover:text-pink-400' },
                  { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-400' },
                  { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-300' }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.2, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-4 bg-amante-red/15 rounded-full border border-amante-red/30 ${social.color} transition-all duration-300 hover:border-current hover:shadow-lg group`}
                  >
                    <social.icon className="w-7 h-7" />
                    <span className="sr-only">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Premium Location Display */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mb-6"
            >
              <div className="flex items-center justify-center gap-3 p-6 bg-amante-red/10 rounded-2xl border border-amante-red/20 max-w-2xl mx-auto">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <MapPin className="w-6 h-6 text-amante-red flex-shrink-0" />
                </motion.div>
                <span className="font-avenir text-amante-pink-light text-lg text-center leading-relaxed">
                  1, Mahendra Business Square, Bawdiya Kalan,
                  <br className="sm:hidden" /> Bhopal, MP 462026
                </span>
              </div>
            </motion.div>
          </div>

          {/* Premium Divider */}
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex items-center justify-center gap-6 mb-6"
          >
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-amante-red"></div>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-amante-red text-2xl"
            >
              ♦
            </motion.div>
            <Heart className="w-6 h-6 text-amante-red fill-current" />
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-amante-red text-2xl"
            >
              ♦
            </motion.div>
            <div className="w-24 h-px bg-gradient-to-l from-transparent to-amante-red"></div>
          </motion.div>

          {/* Enhanced Footer Credits */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center space-y-3"
          >
            <p className="font-avenir text-gray-400 text-sm">
              © 2024 Amante. All rights reserved. | Where every moment becomes a memory.
            </p>
            
            {/* Freaking Minds Credit */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              <a 
                href="https://freakingminds.in" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amante-red/30 to-amante-pink/30 rounded-full border-2 border-amante-red/50 hover:border-amante-red hover:bg-gradient-to-r hover:from-amante-red/40 hover:to-amante-pink/40 transition-all duration-300 group shadow-lg hover:shadow-xl"
              >
                <motion.span 
                  className="text-lg"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                >
                  💡
                </motion.span>
                <span className="font-avenir-bold text-amante-pink-light group-hover:text-white transition-colors text-lg">
                  Designed and built by
                </span>
                <span className="font-laginchy-bold text-amante-red group-hover:text-amante-pink-light transition-colors text-xl">
                  Freaking Minds
                </span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-amante-red group-hover:text-amante-pink transition-colors"
                >
                  →
                </motion.div>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </footer>

      {/* Social Share Component */}
      <SocialShare />
    </div>
  );
}