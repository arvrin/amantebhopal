'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import HeaderGlobal from '@/components/layout/HeaderGlobal';
import Footer from '@/components/layout/Footer';
import {
  Coffee,
  Utensils,
  Wine,
  Music,
  Heart,
  Sparkles,
  UtensilsCrossed,
  Image as ImageIcon,
  X,
  Share2,
  ChevronDown,
  Filter
} from 'lucide-react';

// Gallery categories
const categories = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'cafe', label: 'Café', icon: Coffee },
  { id: 'restaurant', label: 'Restaurant', icon: Utensils },
  { id: 'lounge', label: 'Lounge', icon: Wine },
  { id: 'club', label: 'Club', icon: Music },
  { id: 'private-dining', label: 'Private Dining', icon: Heart },
  { id: 'events', label: 'Events', icon: Music },
  { id: 'food', label: 'Food', icon: UtensilsCrossed }
];

// Gallery items with real images
const galleryItems = [
  { id: 1, category: 'lounge', title: 'Signature Cocktail', image: '/gallery/gallery-11.jpg' },
  { id: 2, category: 'food', title: 'Sushi Boat Platter', image: '/gallery/gallery-12.jpg' },
  { id: 3, category: 'lounge', title: 'Strawberry Cocktail', image: '/gallery/gallery-13.jpg' },
  { id: 4, category: 'lounge', title: 'Berry Bliss Cocktail', image: '/gallery/gallery-14.jpg' },
  { id: 5, category: 'food', title: 'Truffle Cream Pasta', image: '/gallery/gallery-15.jpg' },
  { id: 6, category: 'lounge', title: 'Blue Lagoon Martini', image: '/gallery/gallery-17.jpg' },
  { id: 7, category: 'food', title: 'Cream Pasta Served', image: '/gallery/gallery-18.jpg' },
  { id: 8, category: 'food', title: 'Crispy Kebab Platter', image: '/gallery/gallery-19.jpg' },
  { id: 9, category: 'restaurant', title: 'Elegant Dining Space', image: '/gallery/gallery-20.jpg' },
  { id: 10, category: 'restaurant', title: 'Bar Seating Area', image: '/gallery/gallery-21.jpg' },
  { id: 11, category: 'lounge', title: 'Lounge Interiors', image: '/gallery/gallery-22.jpg' },
  { id: 12, category: 'restaurant', title: 'Cellist Wall Art', image: '/gallery/gallery-23.jpg' },
  { id: 13, category: 'private-dining', title: 'Cozy Booth Seating', image: '/gallery/gallery-24.jpg' },
  { id: 14, category: 'club', title: 'DJ Console', image: '/gallery/gallery-26.jpg' },
  { id: 15, category: 'restaurant', title: 'Gallery Wall Seating', image: '/gallery/gallery-27.jpg' },
  { id: 16, category: 'lounge', title: 'Premium Bar Counter', image: '/gallery/gallery-28.jpg' },
  { id: 17, category: 'restaurant', title: 'Ambient Lighting', image: '/gallery/gallery-29.jpg' },
  { id: 18, category: 'food', title: 'Steamed Dimsum', image: '/gallery/gallery-30.jpg' },
  { id: 19, category: 'food', title: 'Dimsum with Chopsticks', image: '/gallery/gallery-31.jpg' },
  { id: 20, category: 'food', title: 'Indian Feast Spread', image: '/gallery/gallery-32.jpg' },
  { id: 21, category: 'cafe', title: 'Rooftop Terrace', image: '/gallery/gallery-34.jpg' },
  { id: 22, category: 'cafe', title: 'Club Amante Outdoor', image: '/gallery/gallery-35.jpg' },
  { id: 23, category: 'restaurant', title: 'Fountain Sculpture', image: '/gallery/gallery-36.jpg' },
  { id: 24, category: 'food', title: 'Seekh Kebab with Dips', image: '/gallery/gallery-37.jpg' },
  { id: 25, category: 'restaurant', title: 'Chevron Chair Dining', image: '/gallery/gallery-38.jpg' },
  { id: 26, category: 'lounge', title: 'Stone Wall Seating', image: '/gallery/gallery-39.jpg' },
  { id: 27, category: 'restaurant', title: 'Full Bar View', image: '/gallery/gallery-40.jpg' },
  { id: 28, category: 'food', title: 'Paneer Tikka Spread', image: '/gallery/gallery-41.jpg' },
  { id: 29, category: 'cafe', title: 'Outdoor High Seating', image: '/gallery/gallery-42.jpg' },
  { id: 30, category: 'cafe', title: 'Club Amante Neon', image: '/gallery/gallery-43.jpg' },
  { id: 31, category: 'cafe', title: 'Fountain Terrace View', image: '/gallery/gallery-44.jpg' }
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<typeof galleryItems[0] | null>(null);

  const filteredItems = selectedCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === selectedCategory);

  const handleShare = (item: typeof galleryItems[0]) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: `Check out this photo from Amante: ${item.title}`,
        url: window.location.href
      });
    } else {
      alert('Share functionality would be implemented here');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <HeaderGlobal />

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/gallery/gallery-11.jpg"
            alt="Amante Gallery"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 py-20 sm:py-24 md:py-32">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Icon */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-6"
              >
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm border border-white/20">
                  <ImageIcon className="w-10 h-10 text-amante-pink" />
                </div>
              </motion.div>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-4 sm:mb-6"
              >
                <span className="inline-block px-4 sm:px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full text-amante-pink text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] border border-white/20">
                  Visual Journey
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-heading text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-4 sm:mb-6 tracking-tight leading-tight"
              >
                Experience
                <br />
                <span className="text-amante-pink">Amante</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
              >
                Explore our spaces, dishes, and moments through our visual gallery
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <a href="#gallery" className="flex flex-col items-center text-white/80 hover:text-white transition-colors">
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </a>
        </motion.div>
      </div>

      {/* Filter Section */}
      <section id="gallery" className="py-12 px-4 bg-black/95 border-b border-white/10 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-amante-pink" />
              <h3 className="font-heading text-lg md:text-xl text-amante-pink">Filter by Category</h3>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => {
                const CategoryIcon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-body font-semibold text-sm transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-amante-pink text-black shadow-lg shadow-amante-pink/30'
                        : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-amante-pink/30'
                    }`}
                  >
                    <CategoryIcon className="w-4 h-4" />
                    {category.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid - Masonry Style */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-amante-pink mb-4">
              {selectedCategory === 'all'
                ? 'All Photos'
                : `${categories.find(c => c.id === selectedCategory)?.label} Gallery`
              }
            </h2>
            <p className="font-body text-base md:text-lg text-white/60">
              {filteredItems.length} {filteredItems.length === 1 ? 'photo' : 'photos'}
            </p>
          </motion.div>

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item, index) => {
              // Vary heights for masonry effect
              const heights = ['h-64', 'h-80', 'h-72', 'h-96'];
              const heightClass = heights[index % heights.length];

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: (index % 9) * 0.05 }}
                  viewport={{ once: true }}
                  className="break-inside-avoid mb-6"
                >
                  <div
                    onClick={() => setSelectedImage(item)}
                    className={`relative ${heightClass} rounded-2xl overflow-hidden border border-white/10 hover:border-amante-pink/30 transition-all duration-300 cursor-pointer group`}
                  >
                    {/* Image */}
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />

                    {/* Title overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="font-heading text-lg md:text-xl text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="font-body text-sm text-amante-pink">
                          Click to view
                        </p>
                      </div>
                    </div>

                    {/* Quick action buttons */}
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(item);
                        }}
                        className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors backdrop-blur-sm"
                        aria-label="Share"
                      >
                        <Share2 className="w-4 h-4 text-amante-red" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <ImageIcon className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <p className="font-body text-base md:text-lg text-white/50">
                No photos found for this category. Check back soon!
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white backdrop-blur-sm border border-white/20"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image container */}
              <div className="relative h-[70vh] rounded-2xl overflow-hidden shadow-2xl border border-white/20">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Image info and actions */}
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-xl md:text-2xl text-white mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="font-body text-sm md:text-base text-amante-pink">
                    {categories.find(c => c.id === selectedImage.category)?.label}
                  </p>
                </div>

                <button
                  onClick={() => handleShare(selectedImage)}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white backdrop-blur-sm border border-white/20"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="font-body hidden sm:inline">Share</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 px-4 bg-gradient-to-br from-amante-red via-amante-red-dark to-black border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <ImageIcon className="w-16 h-16 mx-auto mb-6 text-amante-pink" />
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              Create Your Own Memories
            </h2>
            <p className="font-body text-base md:text-lg lg:text-xl text-white/80 mb-10">
              Come experience these spaces in person. Reserve your table today and become part of the Amante story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white text-amante-red font-bold text-base md:text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <a href="/reservations">Reserve Your Table</a>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold text-base md:text-lg rounded-full transition-all duration-300 border-2 border-white/30"
              >
                <a href="/contact">Contact Us</a>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
