'use client';

import HeroSection from '@/components/layout/HeroSection';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Coffee, Croissant, Clock, Users, Wifi, Gift } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CafePage() {
  const features = [
    {
      icon: Croissant,
      title: "Artisan Baking",
      description: "Fresh-baked pastries, sourdough loaves, and croissants made daily by our expert bakers using traditional techniques and premium ingredients.",
    },
    {
      icon: Coffee,
      title: "Specialty Coffee",
      description: "Single-origin beans prepared by certified baristas. From classic cappuccinos to innovative seasonal creations, every cup is crafted with care.",
    },
    {
      icon: Clock,
      title: "All-Day Menu",
      description: "Hearty breakfast bowls, gourmet sandwiches, fresh salads, and comfort classics available from morning till evening. Something delicious anytime.",
    },
    {
      icon: Wifi,
      title: "Work-Friendly",
      description: "Free Wi-Fi, comfortable seating, and welcoming atmosphere make our café perfect for remote work or casual meetings over great coffee.",
    },
    {
      icon: Users,
      title: "Community Space",
      description: "Whether catching up with friends, having a business chat, or enjoying solo time, our café provides the perfect backdrop for connection.",
    },
    {
      icon: Gift,
      title: "Custom Catering",
      description: "Custom cakes, catering platters, and takeaway options for your special occasions. Fresh baked goods to go, exactly when you need them.",
    },
  ];

  const highlights = [
    "Fresh-baked croissants, pastries, and artisan breads made daily on-site",
    "Specialty coffee program featuring single-origin beans and expert baristas",
    "All-day breakfast menu with both comfort classics and innovative options",
    "Grab-and-go selection perfect for busy schedules and morning commutes",
    "Free Wi-Fi and comfortable seating ideal for extended stays and remote work",
    "Signature almond croissants and buttermilk pancakes that have become local favorites",
    "Custom cakes and catering services available for special occasions",
    "Vegan and gluten-free options always available on our inclusive menu",
  ];

  return (
    <div className="min-h-screen bg-amante-cream">

      <HeroSection
        title="Café & Bakery"
        subtitle="Your Daily Dose of Comfort & Craft"
        imageSrc="/images/cafe/cafe-hero.jpg"
        imageAlt="Amante Café & Bakery"
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
            Where Every Morning Starts Right
          </h2>
          <div className="space-y-4 text-lg text-amante-charcoal max-w-4xl">
            <p>
              Our in-house bakers arrive before dawn, crafting fresh croissants, sourdough loaves, and pastries that would make any Parisian proud. But we're not just about baked goods—our all-day menu features hearty breakfast bowls, gourmet sandwiches, fresh salads, and comfort food done right.
            </p>
            <p>
              Whether you're grabbing your morning cappuccino, meeting a friend for lunch, or stealing a quiet moment with a book, our café wraps you in warmth that feels like home but tastes like you're somewhere special.
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
              src="/images/cafe/cafe-products.jpg"
              alt="Café Products"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src="/images/cafe/cafe-coffee.jpg"
              alt="Café Coffee"
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
            Café Highlights
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3">
                <Coffee className="w-6 h-6 text-amante-red flex-shrink-0 mt-1" />
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
            <p className="text-amante-grey">7:00 AM - 11:00 PM Daily</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Users className="w-12 h-12 text-amante-red mx-auto mb-4" />
            <h3 className="font-heading text-xl text-amante-charcoal mb-2">Capacity</h3>
            <p className="text-amante-grey">Up to 50 guests</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Gift className="w-12 h-12 text-amante-red mx-auto mb-4" />
            <h3 className="font-heading text-xl text-amante-charcoal mb-2">Price Range</h3>
            <p className="text-amante-grey">₹₹</p>
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
              Reserve Your Spot
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
