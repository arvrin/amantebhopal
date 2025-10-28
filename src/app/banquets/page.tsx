'use client';

import { motion } from 'framer-motion';
import { Building2, Users, Sparkles, Presentation, UtensilsCrossed, PartyPopper, Heart, Calendar, ChevronRight } from 'lucide-react';
import HeroSection from '@/components/layout/HeroSection';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';

export default function BanquetsPage() {
  const features = [
    {
      icon: Building2,
      title: "Elegant Venues",
      description: "Multiple halls featuring contemporary elegance, soaring ceilings, and sophisticated interiors that adapt to any theme or celebration style.",
    },
    {
      icon: Users,
      title: "Flexible Capacity",
      description: "Accommodate 100-500 guests with customizable layouts for seated dinners, cocktail receptions, conferences, and mixed-format events.",
    },
    {
      icon: UtensilsCrossed,
      title: "Complete Catering",
      description: "In-house culinary team creates extensive buffets, plated dinners, and interactive food stations featuring global and regional cuisines.",
    },
    {
      icon: Presentation,
      title: "Advanced AV",
      description: "State-of-the-art audio-visual and lighting systems ensuring presentations, performances, and entertainment exceed expectations.",
    },
    {
      icon: Sparkles,
      title: "Event Coordination",
      description: "Dedicated event coordinators manage every detail from planning through execution, ensuring seamless, stress-free celebrations.",
    },
    {
      icon: PartyPopper,
      title: "Full Service",
      description: "Comprehensive setup, breakdown, valet parking, and coordination with external vendors. Focus on celebrating while we handle everything.",
    },
  ];

  const highlights = [
    "Multiple elegant halls accommodating 100-500 guests with flexible layouts",
    "Contemporary interiors with soaring ceilings and sophisticated design elements",
    "Complete in-house catering featuring customizable menus and live cooking stations",
    "State-of-the-art audio-visual systems and professional lighting design",
    "Dedicated event coordinators managing every detail from concept to execution",
    "Ample parking facilities with professional valet service for guest convenience",
    "Spacious pre-function areas and elegant bridal suites for wedding events",
    "Perfect for weddings, corporate galas, conferences, and grand celebrations",
  ];

  return (
    <div className="min-h-screen bg-amante-cream">

      <HeroSection
        title="Grand Banquets"
        subtitle="Transform Your Vision Into Unforgettable Reality"
        imageSrc="/images/banquets/banquets-hero.jpg"
        imageAlt="Amante Grand Banquets"
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">

        {/* Intro Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h2 className="font-heading text-3xl md:text-4xl text-amante-red mb-6">
            Where Dreams Become Celebrations
          </h2>
          <div className="space-y-4 font-body text-lg text-amante-charcoal">
            <p>
              Your grandest celebrations deserve Bhopal's most comprehensive banquet facilities. Our elegant halls accommodate up to 500 guests with sophisticated interiors, state-of-the-art facilities, and complete event services that transform your vision into reality.
            </p>
            <p>
              Whether planning a dream wedding, corporate gala, large-scale conference, or community celebration, our experienced events team manages every detail—from initial concept through final execution. We're not just a venue; we're your partner in creating moments your guests will remember forever.
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="font-heading text-2xl md:text-3xl text-amante-red text-center mb-12">
            Comprehensive Event Services
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="w-14 h-14 bg-amante-red/10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-amante-red" />
                  </div>
                  <h4 className="font-heading text-xl text-amante-charcoal mb-3">
                    {feature.title}
                  </h4>
                  <p className="font-body text-amante-charcoal/80">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Highlights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-amante-red/5 to-amante-pink/5 rounded-2xl p-8 md:p-12 mb-20"
        >
          <h3 className="font-heading text-2xl md:text-3xl text-amante-red text-center mb-8">
            Why Choose Our Banquets
          </h3>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <ChevronRight className="w-5 h-5 text-amante-red flex-shrink-0 mt-1" />
                <p className="font-body text-amante-charcoal">{highlight}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <Calendar className="w-12 h-12 text-amante-red mx-auto mb-4" />
            <h4 className="font-heading text-lg text-amante-charcoal mb-2">Availability</h4>
            <p className="font-body text-amante-charcoal/80">By Reservation</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <Users className="w-12 h-12 text-amante-red mx-auto mb-4" />
            <h4 className="font-heading text-lg text-amante-charcoal mb-2">Capacity</h4>
            <p className="font-body text-amante-charcoal/80">100-500 guests</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-md">
            <Heart className="w-12 h-12 text-amante-red mx-auto mb-4" />
            <h4 className="font-heading text-lg text-amante-charcoal mb-2">Perfect For</h4>
            <p className="font-body text-amante-charcoal/80">Weddings, Galas, Conferences</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button variant="primary" size="lg">
            <a href="/banquet-booking" className="flex items-center gap-2">
              Schedule Venue Tour
              <ChevronRight className="w-5 h-5" />
            </a>
          </Button>
        </motion.div>

      </div>

      <Footer />
    </div>
  );
}
