'use client';

import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import SlideIndicators from './SlideIndicators';
import CollageBackground from './CollageBackground';
import { heroSlides } from './slides-data';

interface HeroCarouselProps {
  autoRotateInterval?: number;
  onReservationModalOpen?: () => void;
}

// Memoized navigation button component
const NavigationButton = memo(function NavigationButton({
  direction,
  onClick,
  ariaLabel
}: {
  direction: 'left' | 'right';
  onClick: () => void;
  ariaLabel: string;
}) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
  const positionClass = direction === 'left' ? 'left-4 lg:left-8' : 'right-4 lg:right-8';
  const initialX = direction === 'left' ? -20 : 20;

  return (
    <motion.button
      initial={{ opacity: 0, x: initialX }}
      whileHover={{ opacity: 1, x: 0, scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`absolute ${positionClass} top-1/2 -translate-y-1/2 z-20 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/20 hover:border-white/50 transition-all opacity-0 group-hover:opacity-100 shadow-lg`}
      aria-label={ariaLabel}
    >
      <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-white drop-shadow-lg" />
    </motion.button>
  );
});

// Content slide component - Enhanced typography with Cormorant Garamond
const ContentSlide = memo(function ContentSlide({
  slide,
  onPrimaryCTAClick
}: {
  slide: typeof heroSlides[0];
  onPrimaryCTAClick?: () => void;
}) {
  // Parse headline to highlight specific words
  const renderHeadline = () => {
    if (!slide.headlineHighlight) {
      return slide.headline;
    }

    const parts = slide.headline.split(slide.headlineHighlight);
    return (
      <>
        {parts[0]}
        <span
          className="italic"
          style={{
            color: '#D4A5AE', // Dusty rose - subtle highlight
            textShadow: '0 0 30px rgba(139,21,56,0.4)',
          }}
        >
          {slide.headlineHighlight}
        </span>
        {parts[1]}
      </>
    );
  };

  const handlePrimaryCTA = () => {
    if (slide.primaryCTA.action === 'modal' && onPrimaryCTAClick) {
      onPrimaryCTAClick();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="text-center w-full max-w-[90%] sm:max-w-3xl lg:max-w-5xl"
    >
      {/* Main Heading - Cormorant Garamond */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
        className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] text-white mb-4 sm:mb-5 md:mb-6 leading-[1.05] px-2"
        style={{
          fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
          fontWeight: 600,
          letterSpacing: '-0.01em',
          textShadow: '0 4px 60px rgba(0,0,0,0.5)',
        }}
      >
        {renderHeadline()}
      </motion.h1>

      {/* Subheadline - Cormorant Garamond Italic */}
      <motion.p
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
        className="text-xl sm:text-2xl md:text-2xl lg:text-[1.65rem] text-[#D4A5AE] mb-3 sm:mb-4 md:mb-5 max-w-2xl mx-auto px-4"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 400,
          fontStyle: 'italic',
          letterSpacing: '0.01em',
        }}
      >
        {slide.subheadline}
      </motion.p>

      {/* Body Text - Clean Sans-Serif for contrast */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.45, ease: 'easeOut' }}
        className="text-[0.7rem] sm:text-xs md:text-sm lg:text-base text-white/90 mb-6 sm:mb-8 md:mb-10 max-w-md mx-auto px-4 uppercase"
        style={{
          fontFamily: "'Avenir Next', -apple-system, sans-serif",
          fontWeight: 600,
          letterSpacing: '0.15em',
        }}
      >
        {slide.body}
      </motion.p>

      {/* CTA Buttons - Mobile optimized */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6, ease: 'easeOut' }}
        className="flex flex-row gap-3 sm:gap-4 md:gap-5 justify-center items-center px-4"
      >
        {/* Primary CTA */}
        {slide.primaryCTA.action === 'modal' ? (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handlePrimaryCTA}
            className="group relative w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 overflow-hidden rounded-full"
          >
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F8BBD9] via-[#8B1538] to-[#F8BBD9] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            {/* Main button background */}
            <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-[#8B1538] via-[#7A1230] to-[#5A0D20]" />
            {/* Shimmer effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/15 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative z-10 text-white font-medium text-xs sm:text-sm md:text-base tracking-wider uppercase whitespace-nowrap">
              {slide.primaryCTA.text}
            </span>
          </motion.button>
        ) : (
          <Link href={slide.primaryCTA.link} className="w-auto">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 overflow-hidden rounded-full"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F8BBD9] via-[#8B1538] to-[#F8BBD9] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-[#8B1538] via-[#7A1230] to-[#5A0D20]" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/15 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10 text-white font-medium text-xs sm:text-sm md:text-base tracking-wider uppercase whitespace-nowrap">
                {slide.primaryCTA.text}
              </span>
            </motion.button>
          </Link>
        )}

        {/* Secondary CTA */}
        <Link href={slide.secondaryCTA.link} className="w-auto">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 overflow-hidden rounded-full border border-white/30 hover:border-white/50 transition-colors duration-300"
          >
            {/* Glass background */}
            <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-md" />
            {/* Accent line on hover */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-[#C4707E] to-transparent group-hover:w-3/4 transition-all duration-500" />
            <span className="relative z-10 text-white font-medium text-xs sm:text-sm md:text-base tracking-wider uppercase whitespace-nowrap group-hover:text-white transition-colors duration-300">
              {slide.secondaryCTA.text}
            </span>
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
});

export default function HeroCarousel({
  autoRotateInterval = 8000,
  onReservationModalOpen
}: HeroCarouselProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto-rotate slides with cleanup
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [isPlaying, autoRotateInterval]);

  // Memoized navigation functions
  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const goToPreviousSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlideIndex(index);
  }, []);

  const togglePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          goToPreviousSlide();
          break;
        case 'ArrowRight':
          goToNextSlide();
          break;
        case ' ':
          e.preventDefault();
          togglePlayPause();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPreviousSlide, goToNextSlide, togglePlayPause]);

  // Touch swipe handler
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        goToNextSlide();
      } else {
        goToPreviousSlide();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  }, [goToNextSlide, goToPreviousSlide]);

  return (
    <div className="relative h-full w-full group">
      {/* Permanent Collage Background */}
      <div className="absolute inset-0">
        <CollageBackground isActive={true} />
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
      </div>

      {/* Rotating Content - Only text and CTAs */}
      <div className="relative h-full flex items-center justify-center px-4 xs:px-5 sm:px-6 md:px-8 lg:px-10 z-20">
        <AnimatePresence mode="wait" initial={false}>
          <ContentSlide
            key={heroSlides[currentSlideIndex].id}
            slide={heroSlides[currentSlideIndex]}
            onPrimaryCTAClick={onReservationModalOpen}
          />
        </AnimatePresence>
      </div>

      {/* Navigation Arrows - Hidden on mobile, visible on hover on desktop */}
      <div className="hidden md:block">
        <NavigationButton
          direction="left"
          onClick={goToPreviousSlide}
          ariaLabel="Previous slide"
        />
        <NavigationButton
          direction="right"
          onClick={goToNextSlide}
          ariaLabel="Next slide"
        />
      </div>

      {/* Play/Pause Button */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlayPause}
        className="absolute top-20 xs:top-24 sm:top-28 md:top-32 right-4 sm:right-6 md:right-8 z-30 w-11 h-11 xs:w-12 xs:h-12 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/25 hover:border-white/50 transition-all shadow-lg"
        aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 xs:w-5 xs:h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white drop-shadow-lg" />
        ) : (
          <Play className="w-4 h-4 xs:w-5 xs:h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white ml-0.5 drop-shadow-lg" />
        )}
      </motion.button>

      {/* Progress Bar */}
      {isPlaying && (
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/5 z-30">
          <motion.div
            key={currentSlideIndex}
            className="h-full bg-gradient-to-r from-[#8B1538]/60 via-amante-pink/50 to-[#F8BBD9]/40"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: autoRotateInterval / 1000,
              ease: 'linear'
            }}
          />
        </div>
      )}

      {/* Slide Indicators */}
      <SlideIndicators
        totalSlides={heroSlides.length}
        currentSlide={currentSlideIndex}
        onSlideChange={goToSlide}
        isPlaying={isPlaying}
        autoRotateInterval={autoRotateInterval}
      />

      {/* Slide Counter - Mobile Only */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="md:hidden absolute top-20 xs:top-24 sm:top-28 left-4 z-30"
      >
        <div className="bg-black/40 backdrop-blur-md px-3 xs:px-4 py-1.5 xs:py-2 rounded-full border border-white/20 shadow-lg">
          <span className="text-white text-xs xs:text-sm font-semibold tracking-wide">
            {currentSlideIndex + 1} <span className="text-white/60">/</span> {heroSlides.length}
          </span>
        </div>
      </motion.div>

      {/* Touch Swipe Support - Mobile Only */}
      <div
        className="absolute inset-0 z-0 md:hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'pan-y' }}
      />
    </div>
  );
}
