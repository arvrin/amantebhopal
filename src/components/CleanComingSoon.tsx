'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from './HeroSection';
import LeadCaptureForm from './LeadCaptureForm';
import { Coffee, Utensils, Wine, Music, Heart, Sparkles, MapPin, Instagram, Facebook, Twitter, Phone } from 'lucide-react';
import Image from 'next/image';

export default function CleanComingSoon() {
  const [mounted, setMounted] = useState(false);

  // Proper mount check using useEffect
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-amante-red min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-32 h-32 bg-white/10 rounded-lg"></div>
        </div>
      </div>
    );
  }

  const spaces = [
    { name: 'Café & Bakery', icon: Coffee, description: 'French-style patisserie & artisan coffee' },
    { name: 'Rooftop Restro', icon: Utensils, description: 'City views & signature cuisine' },
    { name: 'Intimate Lounge', icon: Wine, description: 'Craft cocktails & cozy ambiance' },
    { name: 'Premier Club', icon: Music, description: 'Exclusive nightlife destination' },
    { name: 'Private Dining', icon: Heart, description: 'Chef\'s table experiences' },
    { name: 'Grand Banquets', icon: Sparkles, description: 'Wedding & celebration venue' }
  ];

  return (
    <div className="bg-amante-red min-h-screen">
      {/* Clean Hero Section */}
      <HeroSection />

      {/* Simple Spaces Section */}
      <section id="spaces" className="py-20 px-4 bg-amante-pink-subtle">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-laginchy-bold text-amante-red mb-6">
              Six Distinct Spaces
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Each space at Amante tells its own story, designed for every mood and celebration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {spaces.map((space, index) => (
              <motion.div
                key={space.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-amante-pink-subtle rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-amante-red/10 rounded-lg mr-4">
                    <space.icon className="w-6 h-6 text-amante-red" />
                  </div>
                  <h3 className="text-xl font-baskerville text-amante-red font-bold">
                    {space.name}
                  </h3>
                </div>
                <p className="text-gray-700 font-avenir">
                  {space.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Lead Capture */}
      <section id="lead-form" className="py-20 px-4 bg-amante-pink-subtle">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-laginchy-bold text-amante-red mb-6">
            Be the First to Celebrate
          </h2>
          <p className="text-xl text-gray-700 mb-12">
            Join our exclusive list and be among the first to experience Amante.
          </p>
          <LeadCaptureForm />
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-amante-black text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <Image
              src="/assets/logos/Secondary Logo/SVG/Pink Logo_Secondary.svg"
              alt="Amante"
              width={260}
              height={104}
              className="mx-auto mb-6 scale-125"
            />
            <p className="font-laginchy text-xl text-amante-pink-light mb-8">
              Where love, happiness, and celebrations belong together.
            </p>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-amante-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-amante-pink-light" />
              </div>
              <a href="https://www.cafeamante.com" className="text-amante-pink-light hover:text-white transition-colors">
                www.cafeamante.com
              </a>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amante-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-amante-pink-light" />
              </div>
              <a href="tel:+919893779100" className="text-amante-pink-light hover:text-white transition-colors">
                +91 98937 79100
              </a>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amante-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-6 h-6 text-amante-pink-light" />
              </div>
              <a href="mailto:contact.cafeamante@gmail.com" className="text-amante-pink-light hover:text-white transition-colors">
                contact.cafeamante@gmail.com
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex justify-center gap-8 mb-12">
            <a href="https://www.instagram.com/cafe_amante_india/" className="bg-amante-red/20 p-3 rounded-full hover:bg-amante-red/30 transition-colors">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="bg-amante-red/20 p-3 rounded-full hover:bg-amante-red/30 transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="#" className="bg-amante-red/20 p-3 rounded-full hover:bg-amante-red/30 transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
          </div>

          {/* Location */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <MapPin className="w-5 h-5 text-amante-red" />
            <span className="text-amante-pink-light">
              1, Mahendra Business Square, Bawdiya Kalan, Bhopal, MP 462026
            </span>
          </div>

          {/* Credits */}
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm mb-4">
              © 2024 Amante. All rights reserved.
            </p>
            <a 
              href="https://freakingminds.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-amante-red/20 px-4 py-2 rounded-lg hover:bg-amante-red/30 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amante-pink-light" />
              <span className="text-amante-pink-light">Designed by Freaking Minds</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}