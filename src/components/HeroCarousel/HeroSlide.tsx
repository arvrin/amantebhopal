'use client';

import { motion, MotionProps } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useMemo } from 'react';
import { HeroSlide as HeroSlideType } from './slides-data';

interface HeroSlideProps {
  slide: HeroSlideType;
  isActive: boolean;
  onPrimaryCTAClick?: () => void;
}

// Memoized component for better performance
const HeroSlide = memo(function HeroSlide({ slide, isActive, onPrimaryCTAClick }: HeroSlideProps) {
  // Parse headline to highlight specific words
  const renderHeadline = useMemo(() => {
    if (!slide.headlineHighlight) {
      return slide.headline;
    }

    const parts = slide.headline.split(slide.headlineHighlight);
    return (
      <>
        {parts[0]}
        <span className="text-amante-pink drop-shadow-[0_2px_8px_rgba(248,187,217,0.5)]">
          {slide.headlineHighlight}
        </span>
        {parts[1]}
      </>
    );
  }, [slide.headline, slide.headlineHighlight]);

  const handlePrimaryCTA = () => {
    if (slide.primaryCTA.action === 'modal' && onPrimaryCTAClick) {
      onPrimaryCTAClick();
    }
  };

  // Animation variants for better performance
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0, scale: 1.05 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 }
  }), []);

  const kenBurnsVariants = useMemo(() => ({
    initial: { scale: 1, x: 0, y: 0 },
    animate: {
      scale: [1, 1.08],
      x: [0, -15],
      y: [0, -8]
    }
  }), []);

  const contentVariants = {
    heading: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 }
    },
    subheading: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 }
    },
    body: {
      hidden: { opacity: 0, y: 25 },
      visible: { opacity: 1, y: 0 }
    },
    cta: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="absolute inset-0"
      style={{ zIndex: 1 }}
    >
      {/* Background Image with Ken Burns Effect */}
      <motion.div
        variants={kenBurnsVariants}
        initial="initial"
        animate="animate"
        transition={{
          duration: 12,
          ease: 'linear'
        }}
        className="absolute inset-0 w-full h-full will-change-transform"
      >
        <Image
          src={slide.backgroundImage}
          alt={slide.headline}
          fill
          sizes="100vw"
          quality={85}
          className="object-cover opacity-60 grayscale-[30%] brightness-75 will-change-transform"
          priority={slide.id === 'brand-intro'}
          loading={slide.id === 'brand-intro' ? 'eager' : 'lazy'}
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.theme.overlayGradient}`} />

      {/* Content Container */}
      <div className="relative h-full flex items-center justify-center px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 z-20">
        <div className="text-center w-full max-w-[90%] xs:max-w-xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
          {/* Main Heading */}
          <motion.h1
            variants={contentVariants.heading}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="font-heading text-[clamp(1.75rem,5vw,5rem)] sm:text-[clamp(2.5rem,6vw,6rem)] md:text-[clamp(3rem,7vw,7rem)] lg:text-[clamp(3.5rem,8vw,8rem)] text-white mb-3 xs:mb-4 sm:mb-5 md:mb-6 tracking-tight leading-[1.1] px-2 drop-shadow-2xl"
            style={{ color: slide.theme.textColor }}
          >
            {renderHeadline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={contentVariants.subheading}
            transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
            className="font-body text-[clamp(0.875rem,2.5vw,1.5rem)] sm:text-[clamp(1rem,3vw,1.75rem)] md:text-[clamp(1.125rem,3.5vw,2rem)] text-amante-pink-light mb-2 xs:mb-3 sm:mb-4 max-w-[85%] sm:max-w-3xl mx-auto px-4 sm:px-2 drop-shadow-lg"
          >
            {slide.subheadline}
          </motion.p>

          {/* Body Text */}
          <motion.p
            variants={contentVariants.body}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            className="font-body text-[clamp(0.75rem,2vw,1.125rem)] sm:text-[clamp(0.875rem,2.25vw,1.25rem)] md:text-[clamp(1rem,2.5vw,1.5rem)] text-white/85 mb-6 xs:mb-7 sm:mb-8 md:mb-10 max-w-[90%] sm:max-w-2xl mx-auto px-4 sm:px-2 drop-shadow-md leading-relaxed"
          >
            {slide.body}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={contentVariants.cta}
            transition={{ duration: 0.8, delay: 0.65, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center items-stretch sm:items-center px-4 xs:px-6 sm:px-4"
          >
            {/* Primary CTA */}
            {slide.primaryCTA.action === 'modal' ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrimaryCTA}
                className="group relative w-full sm:w-auto px-6 xs:px-8 sm:px-10 md:px-12 py-4 xs:py-4 sm:py-4.5 md:py-5 bg-gradient-to-br from-[#8B1538] via-[#7A1230] to-[#6B0F28] hover:from-[#6B0F28] hover:via-[#7A1230] hover:to-[#8B1538] text-white font-bold text-base xs:text-lg sm:text-xl md:text-xl rounded-full transition-all duration-300 shadow-lg shadow-[#8B1538]/30 hover:shadow-xl hover:shadow-[#8B1538]/50 overflow-hidden"
              >
                <span className="relative z-10">{slide.primaryCTA.text}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700" />
              </motion.button>
            ) : (
              <Link href={slide.primaryCTA.link} className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative w-full sm:w-auto px-6 xs:px-8 sm:px-10 md:px-12 py-4 xs:py-4 sm:py-4.5 md:py-5 bg-gradient-to-br from-[#8B1538] via-[#7A1230] to-[#6B0F28] hover:from-[#6B0F28] hover:via-[#7A1230] hover:to-[#8B1538] text-white font-bold text-base xs:text-lg sm:text-xl md:text-xl rounded-full transition-all duration-300 shadow-lg shadow-[#8B1538]/30 hover:shadow-xl hover:shadow-[#8B1538]/50 overflow-hidden"
                >
                  <span className="relative z-10">{slide.primaryCTA.text}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700" />
                </motion.button>
              </Link>
            )}

            {/* Secondary CTA */}
            <Link href={slide.secondaryCTA.link} className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full sm:w-auto px-6 xs:px-8 sm:px-10 md:px-12 py-4 xs:py-4 sm:py-4.5 md:py-5 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold text-base xs:text-lg sm:text-xl md:text-xl rounded-full transition-all duration-300 border-2 border-white/30 hover:border-white/50 shadow-md hover:shadow-lg overflow-hidden"
              >
                <span className="relative z-10">{slide.secondaryCTA.text}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

export default HeroSlide;
