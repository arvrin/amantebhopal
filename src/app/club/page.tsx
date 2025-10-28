'use client';

import TransparentHeader from '@/components/layout/TransparentHeader';
import HeroSection from '@/components/layout/HeroSection';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Music, Zap, Sparkles, Users, Shield, Calendar, Clock, Gift } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ClubPage() {
  const features = [
    {
      icon: Music,
      title: "World-Class DJs",
      description: "Top DJs spinning electronic, Bollywood, and commercial hits. Regular guest DJ performances and special theme nights throughout the year.",
    },
    {
      icon: Zap,
      title: "Premium Sound",
      description: "State-of-the-art sound system and dynamic lighting design create immersive experiences that transform the dance floor into pure energy.",
    },
    {
      icon: Sparkles,
      title: "VIP Service",
      description: "Exclusive VIP table service with premium bottle selections, dedicated servers, and prime positioning for the ultimate club experience.",
    },
    {
      icon: Users,
      title: "Spacious Floor",
      description: "Large dance floor designed for maximum energy and movement. Room to dance, connect, and celebrate all night long.",
    },
    {
      icon: Shield,
      title: "Safe Environment",
      description: "Professional security team ensuring a safe, welcoming atmosphere where everyone can enjoy themselves with complete peace of mind.",
    },
    {
      icon: Calendar,
      title: "Theme Nights",
      description: "Special theme nights, guest DJ performances, and exclusive events throughout the month. Follow us for the latest lineup.",
    },
  ];

  const highlights = [
    "State-of-the-art sound system and dynamic lighting creating immersive experiences",
    "Top DJs spinning electronic dance music, Bollywood hits, and commercial favorites",
    "VIP table service with premium bottle selections and dedicated attention",
    "Spacious dance floor designed for maximum energy and movement",
    "Professional security team ensuring safe, welcoming environment for all guests",
    "Special theme nights and guest DJ performances throughout the month",
    "Open Thursday through Saturday nights from 9 PM to 2 AM",
    "Premium bottle menu featuring top vodka, whisky, and champagne selections",
  ];

  return (
    <div className="min-h-screen bg-amante-cream">
      <TransparentHeader />

      <HeroSection
        title="Premier Club"
        subtitle="Where Bhopal Comes Alive After Dark"
        imageSrc="/images/club/club-hero.jpg"
        imageAlt="Amante Premier Club"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        {/* Intro Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-amante-red mb-6">
            The Pulse of Bhopal's Nightlife
          </h2>
          <div className="space-y-4 text-lg text-amante-charcoal max-w-4xl">
            <p>
              When the sun goes down and the city's energy rises, our club becomes the heartbeat of Bhopal's nightlife. World-class DJs, cutting-edge systems, and electric atmosphere create unforgettable nights.
            </p>
            <p>
              This isn't just dancing—it's an experience crafted by world-class DJs, cutting-edge sound and lighting systems, and an atmosphere that's electric from the first beat to the last call. Our spacious dance floor pulses with energy while VIP sections offer the perfect vantage point for those who like to see and be seen.
            </p>
            <p>
              From Thursday through Saturday, we transform into the destination where Bhopal's young professionals, celebration seekers, and music lovers come to let loose, make memories, and dance like tomorrow doesn't exist.
            </p>
          </div>
        </motion.div>

        {/* Gallery Images */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-6 mb-20"
        >
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src="/images/club/club-lights.jpg"
              alt="Club Lights"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src="/images/club/club-vip.jpg"
              alt="Club VIP"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="font-heading text-3xl md:text-4xl text-amante-red mb-12 text-center">
            Experience the Difference
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                  <Icon className="w-12 h-12 text-amante-red mb-4" />
                  <h3 className="font-heading text-xl text-amante-charcoal mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-amante-grey">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 md:p-12 rounded-lg shadow-md mb-20"
        >
          <h2 className="font-heading text-3xl md:text-4xl text-amante-red mb-8">
            Club Highlights
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3">
                <Music className="w-6 h-6 text-amante-red flex-shrink-0 mt-1" />
                <span className="text-amante-charcoal">{highlight}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Clock className="w-12 h-12 text-amante-red mx-auto mb-4" />
            <h3 className="font-heading text-xl text-amante-charcoal mb-2">Timing</h3>
            <p className="text-amante-grey">9:00 PM - 2:00 AM (Thu-Sat)</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Users className="w-12 h-12 text-amante-red mx-auto mb-4" />
            <h3 className="font-heading text-xl text-amante-charcoal mb-2">Capacity</h3>
            <p className="text-amante-grey">Up to 200 guests</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Gift className="w-12 h-12 text-amante-red mx-auto mb-4" />
            <h3 className="font-heading text-xl text-amante-charcoal mb-2">Price Range</h3>
            <p className="text-amante-grey">₹₹₹</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link href="/reservations">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-amante-red hover:bg-amante-red-dark text-white font-bold text-lg rounded-full transition-all duration-300 shadow-xl shadow-amante-red/30"
            >
              Reserve VIP Table
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
