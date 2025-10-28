'use client';

import HeroSection from '@/components/layout/HeroSection';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Martini, Sofa, Sparkles, Music, Clock, Users, Gift } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LoungePage() {
  const features = [
    {
      icon: Martini,
      title: "Expert Mixology",
      description: "Craft cocktails created by expert mixologists using premium spirits, fresh ingredients, and innovative techniques. Classic and signature options.",
    },
    {
      icon: Sparkles,
      title: "Premium Spirits",
      description: "Extensive collection featuring rare whiskeys, premium vodkas, aged rums, and specialty spirits. Curated for the discerning palate.",
    },
    {
      icon: Sofa,
      title: "Plush Seating",
      description: "Deep leather chairs and comfortable seating designed for extended conversations and relaxation. Sophisticated comfort in every corner.",
    },
    {
      icon: Music,
      title: "Live Acoustic",
      description: "Live acoustic performances on Thursday and Friday evenings featuring talented local musicians and soulful original compositions.",
    },
    {
      icon: Clock,
      title: "Happy Hour",
      description: "Daily happy hour specials from 5 PM to 8 PM featuring discounted cocktails, beers, wines, and appetizers perfect for unwinding.",
    },
    {
      icon: Users,
      title: "Social Atmosphere",
      description: "Welcoming environment perfect for after-work drinks, catching up with friends, or making new connections in sophisticated surroundings.",
    },
  ];

  const highlights = [
    "Expert mixologists creating both classic cocktails and innovative signature creations",
    "Extensive spirits collection featuring rare whiskeys and premium international labels",
    "Signature 'Bhopal Sunset' cocktail featuring locally-inspired botanical ingredients",
    "Elevated small plates menu including truffle fries and butter chicken sliders",
    "Live acoustic performances every Thursday and Friday evening from 8-11 PM",
    "Sophisticated ambiance with plush seating and warm, inviting lighting",
    "Daily Happy Hour from 5-8 PM with special pricing on drinks and appetizers",
    "Thoughtfully curated playlists creating perfect backdrop for conversation",
  ];

  return (
    <div className="min-h-screen bg-amante-cream">

      <HeroSection
        title="Intimate Lounge"
        subtitle="Where Conversations Flow and Time Slows Down"
        imageSrc="/images/lounge/lounge-hero.jpg"
        imageAlt="Amante Intimate Lounge"
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
            Your Sophisticated Escape
          </h2>
          <div className="space-y-4 text-lg text-amante-charcoal max-w-4xl">
            <p>
              Step into our lounge and feel the day's stress melt away. Bhopal's sophisticated living room—a space designed for those who appreciate quality without pretense. Premium cocktails, elevated small plates, and timeless ambiance.
            </p>
            <p>
              This is Bhopal's sophisticated living room—a space designed for those who appreciate quality without pretense. Sink into deep leather seating as soft lighting sets the mood and carefully curated playlists provide the perfect backdrop to conversation.
            </p>
            <p>
              Our mixologists craft cocktails that are equal parts art and science, while our small plates menu offers elevated comfort food perfect for sharing. Whether you're catching up with old friends, making new ones, or enjoying quiet contemplation with a premium whisky, the lounge welcomes you like you've been coming here for years.
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
              src="/images/lounge/lounge-seating.jpg"
              alt="Lounge Seating"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src="/images/lounge/lounge-bar.jpg"
              alt="Lounge Bar"
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
            Lounge Highlights
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3">
                <Martini className="w-6 h-6 text-amante-red flex-shrink-0 mt-1" />
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
            <p className="text-amante-grey">5:00 PM - 1:00 AM Daily</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Users className="w-12 h-12 text-amante-red mx-auto mb-4" />
            <h3 className="font-heading text-xl text-amante-charcoal mb-2">Capacity</h3>
            <p className="text-amante-grey">Up to 80 guests</p>
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
              Reserve Lounge Seating
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
