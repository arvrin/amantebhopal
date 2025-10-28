'use client';

import HeroSection from '@/components/layout/HeroSection';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Utensils, Sunset, Wine, Music, Eye, Heart, Clock, Users, DollarSign } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function RestaurantPage() {
  const features = [
    {
      icon: Eye,
      title: "Panoramic Views",
      description: "Breathtaking 360-degree views of Bhopal's skyline create an unforgettable dining backdrop, especially magical during sunset and evening hours.",
    },
    {
      icon: Utensils,
      title: "Contemporary Cuisine",
      description: "Global flavors meet local ingredients in dishes that surprise and delight. Our chefs blend international techniques with regional influences.",
    },
    {
      icon: Wine,
      title: "Award-Winning Wines",
      description: "Extensive wine list featuring selections from around the world, curated by our beverage director. Premium spirits and signature cocktails also available.",
    },
    {
      icon: Music,
      title: "Live Performances",
      description: "Enjoy live acoustic music on select evenings, creating the perfect ambiance for romantic dinners and special celebrations.",
    },
    {
      icon: Sunset,
      title: "Climate Controlled",
      description: "Year-round comfort with climate-controlled seating and open-air options. Enjoy the rooftop experience in any season.",
    },
    {
      icon: Heart,
      title: "Special Occasions",
      description: "Private corner tables perfect for proposals, anniversaries, and milestone celebrations. Let us help create your unforgettable moment.",
    },
  ];

  const highlights = [
    "Panoramic views of Bhopal's skyline creating unforgettable dining ambiance",
    "Contemporary global cuisine with subtle regional influences and seasonal menus",
    "Award-winning wine list curated by expert sommeliers from around the world",
    "Signature dishes like tandoori-spiced lamb chops and truffle mushroom risotto",
    "Live acoustic music performances on select Thursday and Friday evenings",
    "Climate-controlled comfort year-round with optional open-air seating",
    "Private corner tables available for intimate occasions and proposals",
    "Legendary Sunday brunch buffet featuring global favorites and Indian classics",
  ];

  return (
    <div className="min-h-screen bg-amante-cream">

      <HeroSection
        title="Rooftop Restaurant"
        subtitle="Elevated Dining, Literally and Figuratively"
        imageSrc="/images/restaurant/restaurant-hero.jpg"
        imageAlt="Amante Rooftop Restaurant"
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
            Where Cuisine Meets the Sky
          </h2>
          <div className="space-y-4 text-lg text-amante-charcoal max-w-4xl">
            <p>
              Perched above Bhopal's bustling streets, our rooftop restaurant offers an escape into culinary excellence paired with breathtaking views. Contemporary global cuisine meets stunning skyline vistas.
            </p>
            <p>
              As the sun sets and the city lights begin to dance, our chefs present a carefully curated menu that travels the world while honoring local ingredients and techniques. This is fine dining without the stuffiness—sophisticated yet welcoming, innovative yet approachable.
            </p>
            <p>
              Each dish is a conversation starter, each cocktail a work of art, and each sunset view a natural accompaniment to memorable moments. Whether celebrating an anniversary or simply celebrating Friday, the rooftop transforms ordinary meals into extraordinary experiences.
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
              src="/images/restaurant/restaurant-dining.jpg"
              alt="Restaurant Dining"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src="/images/restaurant/restaurant-food.jpg"
              alt="Restaurant Food"
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
            Restaurant Highlights
          </h2>
          <ul className="grid md:grid-cols-2 gap-4">
            {highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3">
                <Utensils className="w-6 h-6 text-amante-red flex-shrink-0 mt-1" />
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
            <p className="text-amante-grey">12:00 PM - 11:00 PM Daily</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <Users className="w-12 h-12 text-amante-red mx-auto mb-4" />
            <h3 className="font-heading text-xl text-amante-charcoal mb-2">Capacity</h3>
            <p className="text-amante-grey">Up to 120 guests</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <DollarSign className="w-12 h-12 text-amante-red mx-auto mb-4" />
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
              Reserve Rooftop Table
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
