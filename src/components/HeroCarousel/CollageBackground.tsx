'use client';

import { useState, useEffect, useCallback, useRef, memo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// All gallery images
const allImages = [
  '/gallery/gallery-11.jpg',
  '/gallery/gallery-12.jpg',
  '/gallery/gallery-13.jpg',
  '/gallery/gallery-14.jpg',
  '/gallery/gallery-15.jpg',
  '/gallery/gallery-17.jpg',
  '/gallery/gallery-18.jpg',
  '/gallery/gallery-19.jpg',
  '/gallery/gallery-20.jpg',
  '/gallery/gallery-21.jpg',
  '/gallery/gallery-22.jpg',
  '/gallery/gallery-23.jpg',
  '/gallery/gallery-24.jpg',
  '/gallery/gallery-26.jpg',
  '/gallery/gallery-27.jpg',
  '/gallery/gallery-28.jpg',
  '/gallery/gallery-29.jpg',
  '/gallery/gallery-30.jpg',
  '/gallery/gallery-31.jpg',
  '/gallery/gallery-32.jpg',
  '/gallery/gallery-34.jpg',
  '/gallery/gallery-35.jpg',
  '/gallery/gallery-36.jpg',
  '/gallery/gallery-37.jpg',
  '/gallery/gallery-38.jpg',
  '/gallery/gallery-39.jpg',
  '/gallery/gallery-40.jpg',
  '/gallery/gallery-41.jpg',
  '/gallery/gallery-42.jpg',
  '/gallery/gallery-43.jpg',
  '/gallery/gallery-44.jpg',
];

// Grid configuration - responsive
// Desktop: 5 cols × 4 rows = 20 cells
// Mobile: 3 cols × 5 rows = 15 cells
const DESKTOP_COLS = 5;
const DESKTOP_ROWS = 4;
const MOBILE_COLS = 3;
const MOBILE_ROWS = 5;
const TOTAL_CELLS = DESKTOP_COLS * DESKTOP_ROWS; // Use max for image pool

// Each cell holds current image + next image for crossfade
interface CellState {
  currentImage: string;
  nextImage: string | null;
  isTransitioning: boolean;
  lastChanged: number;
}

// Get adjacent cell indices (up, down, left, right)
const getAdjacentCells = (index: number, cols: number, rows: number): number[] => {
  const row = Math.floor(index / cols);
  const col = index % cols;
  const adjacent: number[] = [];

  if (row > 0) adjacent.push(index - cols);
  if (row < rows - 1) adjacent.push(index + cols);
  if (col > 0) adjacent.push(index - 1);
  if (col < cols - 1) adjacent.push(index + 1);

  return adjacent;
};

interface CollageBackgroundProps {
  isActive?: boolean;
}

const CollageBackground = memo(function CollageBackground({ isActive = true }: CollageBackgroundProps) {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const gridCols = isMobile ? MOBILE_COLS : DESKTOP_COLS;
  const gridRows = isMobile ? MOBILE_ROWS : DESKTOP_ROWS;
  const totalCells = gridCols * gridRows;

  // Initialize grid with first 20 images (deterministic for SSR)
  const [cells, setCells] = useState<CellState[]>(() =>
    allImages.slice(0, TOTAL_CELLS).map(img => ({
      currentImage: img,
      nextImage: null,
      isTransitioning: false,
      lastChanged: 0,
    }))
  );

  // Track which images are currently NOT in the grid
  const availableImagesRef = useRef<string[]>([...allImages.slice(TOTAL_CELLS)]);

  // Shuffle available images only after mount to avoid hydration mismatch
  const hasShuffled = useRef(false);
  useEffect(() => {
    if (!hasShuffled.current) {
      availableImagesRef.current = [...availableImagesRef.current].sort(() => Math.random() - 0.5);
      hasShuffled.current = true;
    }
  }, []);

  // Track currently transitioning cells to avoid adjacent swaps
  const transitioningCellsRef = useRef<Set<number>>(new Set());

  // Function to swap a single cell
  const swapSingleImage = useCallback(() => {
    if (!isActive) return;

    const available = availableImagesRef.current;
    if (available.length === 0) return;

    const now = Date.now();
    // Slower swaps on mobile for battery saving
    const minTimeBetweenChanges = isMobile ? 4000 : 3000;

    // Find eligible cells
    const eligibleCells = cells
      .slice(0, totalCells) // Only consider visible cells
      .map((cell, idx) => ({ cell, idx }))
      .filter(({ cell, idx }) => {
        if (cell.isTransitioning) return false;
        if (now - cell.lastChanged < minTimeBetweenChanges) return false;
        const adjacent = getAdjacentCells(idx, gridCols, gridRows);
        if (adjacent.some(adjIdx => transitioningCellsRef.current.has(adjIdx))) return false;
        return true;
      });

    if (eligibleCells.length === 0) return;

    // Pick a random eligible cell
    const randomChoice = eligibleCells[Math.floor(Math.random() * eligibleCells.length)];
    const cellIndex = randomChoice.idx;

    // Pick a random image from available pool
    const availableIndex = Math.floor(Math.random() * available.length);
    const newImage = available[availableIndex];
    const oldImage = cells[cellIndex].currentImage;

    // Update available pool
    available.splice(availableIndex, 1);
    available.push(oldImage);

    // Mark cell as transitioning
    transitioningCellsRef.current.add(cellIndex);

    // Start transition
    setCells(prev => {
      const updated = [...prev];
      updated[cellIndex] = {
        ...updated[cellIndex],
        nextImage: newImage,
        isTransitioning: true,
      };
      return updated;
    });

    // After transition completes, finalize swap
    setTimeout(() => {
      transitioningCellsRef.current.delete(cellIndex);
      setCells(prev => {
        const updated = [...prev];
        updated[cellIndex] = {
          currentImage: newImage,
          nextImage: null,
          isTransitioning: false,
          lastChanged: Date.now(),
        };
        return updated;
      });
    }, 1200);
  }, [cells, isActive, isMobile, totalCells, gridCols, gridRows]);

  // Continuous swapping
  useEffect(() => {
    if (!isActive) return;
    // Slower interval on mobile for battery saving
    const interval = setInterval(swapSingleImage, isMobile ? 800 : 600);
    return () => clearInterval(interval);
  }, [swapSingleImage, isActive, isMobile]);

  // Enhanced grid with varied cell sizes for depth
  const getCellStyle = useCallback((index: number) => {
    const cols = isMobile ? MOBILE_COLS : DESKTOP_COLS;
    const row = Math.floor(index / cols);
    const col = index % cols;

    // Create subtle scale variations for depth
    const scaleVariations = [1, 1.02, 0.98, 1.01, 0.99];
    const scale = scaleVariations[(row + col) % 5];

    // Subtle brightness variations
    const brightnessVariations = [0.85, 0.9, 0.8, 0.88, 0.82];
    const brightness = brightnessVariations[(row * 2 + col) % 5];

    return { scale, brightness };
  }, [isMobile]);

  // Only render visible cells based on current grid
  const visibleCells = cells.slice(0, totalCells);

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Base grid - responsive: 3 cols on mobile, 5 cols on desktop */}
      <div
        className="absolute inset-0 w-full h-full grid"
        style={{
          gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(5, 1fr)',
          gridTemplateRows: isMobile ? 'repeat(5, 1fr)' : 'repeat(4, 1fr)',
        }}
      >
        {visibleCells.map((cell, index) => {
          const { scale, brightness } = getCellStyle(index);
          return (
            <div
              key={index}
              className="relative overflow-hidden"
              style={{ transform: `scale(${scale})` }}
            >
              <div className="absolute inset-0" style={{ filter: `brightness(${brightness})` }}>
                <Image
                  src={cell.currentImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes={isMobile ? "33vw" : "20vw"}
                  priority={index < 10}
                />
              </div>

              {/* Next image (fades in on top) */}
              {cell.nextImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0"
                  style={{ filter: `brightness(${brightness})` }}
                >
                  <Image
                    src={cell.nextImage}
                    alt=""
                    fill
                    className="object-cover"
                    sizes={isMobile ? "33vw" : "20vw"}
                  />
                </motion.div>
              )}

              {/* Subtle inner shadow for depth */}
              <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.3)]" />
            </div>
          );
        })}
      </div>

      {/* Vignette overlay for cinematic depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_70%,rgba(0,0,0,0.7)_100%)]" />

      {/* Film grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
});

export default CollageBackground;
