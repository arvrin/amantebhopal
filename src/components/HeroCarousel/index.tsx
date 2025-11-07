'use client';

import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import HeroSlide from './HeroSlide';
import SlideIndicators from './SlideIndicators';
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

  // Keyboard navigation with useCallback dependencies
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
      {/* Background Slides - AnimatePresence for smooth transitions */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait" initial={false}>
          <HeroSlide
            key={heroSlides[currentSlideIndex].id}
            slide={heroSlides[currentSlideIndex]}
            isActive={true}
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
        className="absolute top-20 xs:top-24 sm:top-28 md:top-32 right-4 sm:right-6 md:right-8 z-30 w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/25 hover:border-white/50 transition-all shadow-lg"
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

      {/* Touch Swipe Support - Mobile Only - Low z-index to not block CTAs */}
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
