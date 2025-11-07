'use client';

import { motion } from 'framer-motion';
import { memo, useMemo, useState, useEffect, useCallback } from 'react';

interface SlideIndicatorsProps {
  totalSlides: number;
  currentSlide: number;
  onSlideChange: (index: number) => void;
  isPlaying: boolean;
  autoRotateInterval: number;
}

// Memoized vertical dot indicator component
const VerticalDotIndicator = memo(function VerticalDotIndicator({
  index,
  isActive,
  onClick
}: {
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group touch-manipulation"
      aria-label={`Go to slide ${index + 1}`}
      aria-current={isActive ? 'true' : 'false'}
    >
      <motion.div
        className={`rounded-full transition-all duration-300 ${
          isActive
            ? 'h-8 w-1.5 bg-gradient-to-b from-[#8B1538] to-amante-pink shadow-[0_0_8px_rgba(248,187,217,0.5)]'
            : 'h-1.5 w-1.5 bg-white/40 group-hover:bg-white/60 group-hover:h-3'
        }`}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.85 }}
      />
    </button>
  );
});

const SlideIndicators = memo(function SlideIndicators({
  totalSlides,
  currentSlide,
  onSlideChange,
  isPlaying,
  autoRotateInterval
}: SlideIndicatorsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hideTimer, setHideTimer] = useState<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Memoize the slides array to prevent re-creating on every render
  const slideIndices = useMemo(() => Array.from({ length: totalSlides }, (_, i) => i), [totalSlides]);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle mouse movement to show indicators (desktop only)
  const handleMouseMove = useCallback(() => {
    if (isMobile) return; // Don't use mouse events on mobile

    setIsVisible(true);

    // Clear existing timer
    if (hideTimer) {
      clearTimeout(hideTimer);
    }

    // Set new timer to hide after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    setHideTimer(timer);
  }, [hideTimer, isMobile]);

  // Attach global mouse move listener (desktop only)
  useEffect(() => {
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (hideTimer) {
        clearTimeout(hideTimer);
      }
    };
  }, [handleMouseMove, hideTimer, isMobile]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{
        opacity: isMobile ? 1 : (isVisible ? 1 : 0),
        x: isMobile ? 0 : (isVisible ? 0 : 20)
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-40 pointer-events-auto"
    >
      <div className="flex flex-col items-center gap-2.5 px-2 py-3 rounded-full bg-black/30 backdrop-blur-md border border-white/10 shadow-lg">
        {slideIndices.map((index) => (
          <VerticalDotIndicator
            key={index}
            index={index}
            isActive={currentSlide === index}
            onClick={() => onSlideChange(index)}
          />
        ))}
      </div>
    </motion.div>
  );
});

export default SlideIndicators;
