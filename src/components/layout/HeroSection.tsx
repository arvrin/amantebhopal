'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
  overlayIntensity?: 'light' | 'medium' | 'dark';
}

export default function HeroSection({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  overlayIntensity = 'medium',
}: HeroSectionProps) {
  const overlayClasses = {
    light: 'from-black/30 via-transparent to-black/20',
    medium: 'from-black via-transparent to-black/30',
    dark: 'from-black/80 via-black/40 to-black/60',
  };

  return (
    <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          priority
        />
        {/* Sophisticated Brand Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-b ${overlayClasses[overlayIntensity]}`} />
        <div className="absolute inset-0 bg-gradient-to-br from-amante-red/15 via-transparent to-amante-pink/10" />
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_100%)] opacity-40" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-6">
        <div className="text-center max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight">
              {title}
            </h1>
          </motion.div>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-body text-xl md:text-2xl text-amante-pink-light max-w-3xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-amante-pink/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-amante-red/10 rounded-full blur-3xl" />
    </div>
  );
}
