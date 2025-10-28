'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import TransparentHeader from '@/components/layout/TransparentHeader';
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
  Download,
  Share2,
  ChevronDown,
  Filter
} from 'lucide-react';
import Button from '@/components/ui/Button';

// Gallery categories
const categories = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'cafe', label: 'Café', icon: Coffee },
  { id: 'restaurant', label: 'Restaurant', icon: Utensils },
  { id: 'lounge', label: 'Lounge', icon: Wine },
  { id: 'club', label: 'Club', icon: Music },
  { id: 'private-dining', label: 'Private Dining', icon: Heart },
  { id: 'banquets', label: 'Banquets', icon: Sparkles },
  { id: 'events', label: 'Events', icon: Music },
  { id: 'food', label: 'Food', icon: UtensilsCrossed }
];

// Gallery items with real images
const galleryItems = [
  // Using the 10 downloaded gallery images
  { id: 1, category: 'cafe', title: 'Morning Coffee Setup', image: '/images/gallery/gallery-1.jpg' },
  { id: 2, category: 'restaurant', title: 'Rooftop Dining Setup', image: '/images/gallery/gallery-2.jpg' },
  { id: 3, category: 'lounge', title: 'Cocktail Bar', image: '/images/gallery/gallery-3.jpg' },
  { id: 4, category: 'club', title: 'Night Energy', image: '/images/gallery/gallery-4.jpg' },
  { id: 5, category: 'private-dining', title: 'Intimate Dining Room', image: '/images/gallery/gallery-5.jpg' },
  { id: 6, category: 'banquets', title: 'Grand Ballroom', image: '/images/gallery/gallery-6.jpg' },
  { id: 7, category: 'events', title: 'Live Music Night', image: '/images/gallery/gallery-7.jpg' },
  { id: 8, category: 'food', title: 'Gourmet Plating', image: '/images/gallery/gallery-8.jpg' },
  { id: 9, category: 'cafe', title: 'Fresh Pastries Display', image: '/images/gallery/gallery-9.jpg' },
  { id: 10, category: 'restaurant', title: 'Evening Ambiance', image: '/images/gallery/gallery-10.jpg' }
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
      // Fallback for browsers that don't support Web Share API
      alert('Share functionality would be implemented here');
    }
  };

  return (
    <div className="bg-white">
      <TransparentHeader />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/gallery/gallery-1.jpg"
            alt="Amante Gallery"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Sophisticated Brand Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-br from-amante-red/15 via-transparent to-amante-pink/10" />
          {/* Vignette effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_100%)] opacity-40" />
        </div>

        <div className="relative z-10 max-w-standard mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ImageIcon className="w-10 h-10 text-white" />
            </div>

            <h1 className="font-heading text-4xl md:text-6xl mb-6">Experience Amante</h1>

            <p className="font-body text-lg md:text-xl text-amante-pink-light mb-10 max-w-3xl mx-auto">
              Explore our spaces, dishes, and moments through our visual gallery. From intimate cafÃ© corners to grand celebration halls, discover what makes Amante special.
            </p>
          </motion.div>

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
      </section>

      {/* Filter Section */}
      <section id="gallery" className="py-12 px-4 bg-amante-cream border-b border-amante-grey-light sticky top-0 z-30 backdrop-blur-sm bg-amante-cream/95">
        <div className="max-w-standard mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-2 mb-6">
              <Filter className="w-5 h-5 text-amante-red" />
              <h3 className="font-heading text-xl text-amante-red">Filter by Category</h3>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => {
                const CategoryIcon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-body font-semibold text-sm transition-all ${
                      selectedCategory === category.id
                        ? 'bg-amante-red text-white shadow-lg'
                        : 'bg-white text-amante-charcoal hover:bg-amante-pink-light'
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
      <section className="py-20 px-4 bg-white">
        <div className="max-w-standard mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-amante-red mb-4">
              {selectedCategory === 'all'
                ? 'All Photos'
                : `${categories.find(c => c.id === selectedCategory)?.label} Gallery`
              }
            </h2>
            <p className="font-body text-amante-charcoal">
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
                    className={`relative ${heightClass} rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group`}
                  >
                    {/* Image */}
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />

                    {/* Title overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="font-heading text-xl text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="font-body text-sm text-white/80">
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
                        className="p-2 bg-white/90 rounded-lg hover:bg-white transition-colors"
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
              <ImageIcon className="w-16 h-16 text-amante-grey mx-auto mb-4" />
              <p className="font-body text-lg text-amante-grey">
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
                className="absolute -top-12 right-0 p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image container */}
              <div className="relative h-[70vh] rounded-2xl overflow-hidden shadow-2xl">
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
                  <h3 className="font-heading text-2xl text-white mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="font-body text-amante-pink-light">
                    {categories.find(c => c.id === selectedImage.category)?.label}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => alert('Download functionality would be implemented here')}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
                  >
                    <Download className="w-5 h-5" />
                    <span className="font-body">Download</span>
                  </button>
                  <button
                    onClick={() => handleShare(selectedImage)}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
                  >
                    <Share2 className="w-5 h-5" />
                    <span className="font-body">Share</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 px-4 bg-gradient-to-br from-amante-red via-amante-red-dark to-amante-charcoal text-white">
        <div className="max-w-narrow mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <ImageIcon className="w-16 h-16 mx-auto mb-6 text-amante-pink-light" />
            <h2 className="font-heading text-3xl md:text-4xl mb-6">
              Create Your Own Memories
            </h2>
            <p className="font-body text-lg md:text-xl text-amante-pink-light mb-10">
              Come experience these spaces in person. Reserve your table today and become part of the Amante story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                <a href="/reservations">Reserve Your Table</a>
              </Button>
              <Button variant="outline" size="lg">
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
