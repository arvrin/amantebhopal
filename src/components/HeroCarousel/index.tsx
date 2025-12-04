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
      className="text-center w-[90%] max-w-5xl mx-auto"
    >
      {/* Main Heading - Fluid typography using clamp() */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
        className="text-white leading-[1.05] px-2"
        style={{
          fontFamily: "'Cormorant Garamond', 'Playfair Display', Georgia, serif",
          fontWeight: 600,
          letterSpacing: '-0.01em',
          textShadow: '0 4px 60px rgba(0,0,0,0.5)',
          // Fluid: min 2.5rem (40px), preferred 8vw, max 5.5rem (88px)
          fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
          marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
        }}
      >
        {renderHeadline()}
      </motion.h1>

      {/* Subheadline - Fluid typography */}
      <motion.p
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
        className="text-[#D4A5AE] max-w-2xl mx-auto px-4"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 400,
          fontStyle: 'italic',
          letterSpacing: '0.01em',
          // Fluid: min 1.125rem (18px), preferred 3.5vw, max 1.75rem (28px)
          fontSize: 'clamp(1.125rem, 3.5vw, 1.75rem)',
          marginBottom: 'clamp(0.75rem, 2vw, 1.25rem)',
        }}
      >
        {slide.subheadline}
      </motion.p>

      {/* Body Text - Fluid typography */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.45, ease: 'easeOut' }}
        className="text-white/90 max-w-md mx-auto px-4 uppercase"
        style={{
          fontFamily: "'Avenir Next', -apple-system, sans-serif",
          fontWeight: 600,
          letterSpacing: '0.15em',
          // Fluid: min 0.65rem (10px), preferred 1.5vw, max 1rem (16px)
          fontSize: 'clamp(0.65rem, 1.5vw, 1rem)',
          marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
        }}
      >
        {slide.body}
      </motion.p>

      {/* CTA Buttons - Fluid sizing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6, ease: 'easeOut' }}
        className="flex flex-row justify-center items-center px-4"
        style={{ gap: 'clamp(0.75rem, 2vw, 1.25rem)' }}
      >
        {/* Primary CTA */}
        {slide.primaryCTA.action === 'modal' ? (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handlePrimaryCTA}
            className="group relative overflow-hidden rounded-full"
            style={{
              padding: 'clamp(0.625rem, 1.5vw, 1rem) clamp(1.25rem, 3vw, 2.5rem)',
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F8BBD9] via-[#8B1538] to-[#F8BBD9] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-[#8B1538] via-[#7A1230] to-[#5A0D20]" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/15 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span
              className="relative z-10 text-white font-medium tracking-wider uppercase whitespace-nowrap"
              style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.875rem)' }}
            >
              {slide.primaryCTA.text}
            </span>
          </motion.button>
        ) : (
          <Link href={slide.primaryCTA.link}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative overflow-hidden rounded-full"
              style={{
                padding: 'clamp(0.625rem, 1.5vw, 1rem) clamp(1.25rem, 3vw, 2.5rem)',
              }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F8BBD9] via-[#8B1538] to-[#F8BBD9] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-[#8B1538] via-[#7A1230] to-[#5A0D20]" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/15 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span
                className="relative z-10 text-white font-medium tracking-wider uppercase whitespace-nowrap"
                style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.875rem)' }}
              >
                {slide.primaryCTA.text}
              </span>
            </motion.button>
          </Link>
        )}

        {/* Secondary CTA */}
        <Link href={slide.secondaryCTA.link}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative overflow-hidden rounded-full border border-white/30 hover:border-white/50 transition-colors duration-300"
            style={{
              padding: 'clamp(0.625rem, 1.5vw, 1rem) clamp(1.25rem, 3vw, 2.5rem)',
            }}
          >
            <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-md" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-[#C4707E] to-transparent group-hover:w-3/4 transition-all duration-500" />
            <span
              className="relative z-10 text-white font-medium tracking-wider uppercase whitespace-nowrap group-hover:text-white transition-colors duration-300"
              style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.875rem)' }}
            >
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
