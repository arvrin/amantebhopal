'use client';

import TransparentHeader from '@/components/layout/TransparentHeader';
import HeroSection from '@/components/layout/HeroSection';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Lock, Users, ChefHat, Presentation, Wine, Sparkles, Clock, Gift } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function PrivateDiningPage() {
  const features = [
    {
      icon: Lock,
      title: "Complete Privacy",
      description: "Multiple private rooms with separate entrance options ensuring complete privacy and exclusivity for your important gatherings.",
    },
    {
      icon: ChefHat,
      title: "Custom Menus",
      description: "Work with our executive chef to create personalized menus reflecting your preferences, dietary requirements, and the occasion you're celebrating.",
    },
    {
      icon: Users,
      title: "Dedicated Service",
      description: "Service staff assigned exclusively to your event, providing attentive, personalized hospitality throughout your entire celebration.",
    },
    {
      icon: Presentation,
      title: "AV Equipment",
      description: "Advanced audio-visual equipment perfect for business presentations, video tributes, or entertainment during your private event.",
    },
    {
      icon: Wine,
      title: "Sommelier Service",
      description: "Expert sommelier-guided wine pairings available to complement your customized menu and enhance the dining experience.",
    },
    {
      icon: Sparkles,
      title: "Custom Desserts",
      description: "Dedicated pastry team creates custom desserts and celebration cakes tailored to your milestone moments and preferences.",
    },
  ];

  const highlights = [
    "Multiple private rooms accommodating 10-50 guests each with flexible configurations",
    "Completely customizable menus crafted by executive chef for your preferences",
    "Dedicated service staff assigned exclusively to your event for personalized attention",
    "Advanced AV equipment for presentations, entertainment, and video tributes",
    "Complete privacy with separate entrance options and discrete service",
    "Sommelier-guided wine pairings available to complement your custom menu",
    "Custom desserts and celebration cakes from dedicated pastry team",
    "Perfect for milestone celebrations, business dinners, and intimate wedding receptions",
  ];

  return (
    <div className="min-h-screen bg-amante-cream">
      <TransparentHeader />

      <HeroSection
        title="Private Dining"
        subtitle="Exclusive Spaces for Your Most Important Moments"
        imageSrc="/images/private-dining/private-dining-hero.jpg"
        imageAlt="Amante Private Dining"
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
            Intimate Excellence, Exclusively Yours
          </h2>
          <div className="space-y-4 text-lg text-amante-charcoal max-w-4xl">
            <p>
              Some moments deserve intimacy and exclusivity. Our private dining spaces offer the perfect setting for occasions that matter—personalized menus, dedicated service, and complete privacy.
            </p>
            <p>
              Our private dining rooms offer intimate settings for gatherings ranging from 10 to 50 guests, combining the exclusivity you need with access to Amante's full culinary excellence. Whether hosting a family milestone celebration, confidential business dinner, or intimate wedding reception, you'll enjoy dedicated service, customizable menus, and spaces designed to make your guests feel special.
            </p>
            <p>
              Our events team works closely with you to understand your vision, then executes flawlessly—from customized table settings to personalized menus and seamless service that anticipates every need before you voice it.
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
              src="/images/private-dining/private-dining-room.jpg"
              alt="Private Dining Room"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src="/images/private-dining/private-dining-table.jpg"
              alt="Private Dining Table"
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
            Private Dining Highlights
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3">
                <Lock className="w-6 h-6 text-amante-red flex-shrink-0 mt-1" />
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
            <p className="text-amante-grey">Available by Reservation</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Users className="w-12 h-12 text-amante-red mx-auto mb-4" />
            <h3 className="font-heading text-xl text-amante-charcoal mb-2">Capacity</h3>
            <p className="text-amante-grey">10-50 guests per room</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Gift className="w-12 h-12 text-amante-red mx-auto mb-4" />
            <h3 className="font-heading text-xl text-amante-charcoal mb-2">Price Range</h3>
            <p className="text-amante-grey">₹₹₹₹</p>
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
              Request Proposal
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
