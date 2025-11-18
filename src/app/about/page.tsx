'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import HeaderGlobal from '@/components/layout/HeaderGlobal';
import Footer from '@/components/layout/Footer';
import {
  Heart,
  Award,
  Users,
  Target,
  Lightbulb,
  Globe,
  ChevronDown,
  Star,
  TrendingUp,
  Handshake
} from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: 'Excellence Without Compromise',
      description: "Quality isn't negotiable—it's the foundation of everything we do. From ingredient sourcing to service delivery, we commit to excellence at every touchpoint. Our chefs won't compromise on ingredients, our service team won't compromise on attention, and our leadership won't compromise on standards."
    },
    {
      icon: Lightbulb,
      title: 'Innovation Rooted in Tradition',
      description: "We honor culinary traditions while embracing creative innovation. Our menus respect the techniques and flavors that have stood the test of time while exploring new combinations, presentations, and experiences. Innovation without foundation lacks authenticity; tradition without evolution lacks excitement."
    },
    {
      icon: Heart,
      title: 'Hospitality as Heart',
      description: "At our core, we're in the people business. Food and ambiance bring guests through the door, but genuine hospitality keeps them coming back. We train our team to anticipate needs, personalize interactions, and treat every guest like a welcomed friend."
    },
    {
      icon: Handshake,
      title: 'Community Connection',
      description: "We're proud to be part of Bhopal's vibrant community. Supporting local suppliers, employing local talent, participating in community initiatives, and creating spaces where our neighbors gather for life's moments—this is how we contribute beyond great dining."
    }
  ];

  const teamHighlights = [
    {
      icon: Users,
      stat: '15+',
      label: 'Years of Combined Experience'
    },
    {
      icon: Award,
      stat: '500+',
      label: 'Events Successfully Hosted'
    },
    {
      icon: Star,
      stat: '5-Star',
      label: 'Guest Rating'
    },
    {
      icon: Heart,
      stat: '1000+',
      label: 'Happy Guests Monthly'
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <HeaderGlobal />

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/about/about-story.jpg"
            alt="About Amante"
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
                  <Heart className="w-10 h-10 text-amante-pink" />
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
                  Our Story
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-heading text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-4 sm:mb-6 tracking-tight leading-tight"
              >
                Building Bhopal's
                <br />
                <span className="text-amante-pink">Premier Destination</span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4"
              >
                A celebration of passion, innovation, and genuine hospitality
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <a href="#story" className="flex flex-col items-center text-white/80 hover:text-white transition-colors">
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </a>
        </motion.div>
      </div>

      {/* The Beginning */}
      <section id="story" className="py-20 lg:py-32 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-amante-pink mb-6">
                The Beginning
              </h2>
              <p className="font-body text-base md:text-lg text-white/80 leading-relaxed">
                Amante was born from a simple observation: Bhopal deserved a dining destination as dynamic and diverse as its people. Our founders spent years in hospitality across India and internationally, experiencing world-class dining destinations that seamlessly blended multiple concepts under one roof.
              </p>
              <p className="font-body text-base md:text-lg text-white/80 leading-relaxed">
                They saw how people's needs shift throughout the day, throughout the week, throughout life's celebrations. Yet Bhopal lacked a venue offering this versatility. In 2023, they decided to change that. The vision was ambitious—create six distinct spaces, each excellent on its own, yet harmoniously united.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-96 bg-gradient-to-br from-amante-pink/20 to-amante-red/20 rounded-2xl overflow-hidden border border-white/10"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Target className="w-24 h-24 text-amante-pink/30" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Journey */}
      <section className="py-20 lg:py-32 px-4 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-96 bg-gradient-to-br from-amante-red/20 to-amante-pink/10 rounded-2xl overflow-hidden border border-white/10 md:order-1"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe className="w-24 h-24 text-amante-pink/30" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6 md:order-2"
            >
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-amante-pink mb-6">
                The Journey
              </h2>
              <p className="font-body text-base md:text-lg text-white/80 leading-relaxed">
                Building Amante meant assembling the right team—chefs trained in India's finest kitchens and international destinations, hospitality professionals who understand service excellence, mixologists who approach cocktails as craft, and designers who could create six distinct atmospheres within one cohesive destination.
              </p>
              <p className="font-body text-base md:text-lg text-white/80 leading-relaxed">
                We spent months sourcing the perfect location, central yet offering the space our vision demanded. After eighteen months of meticulous planning and construction, Amante opened its doors, immediately becoming Bhopal's most talked-about dining destination.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-32 px-4 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-amante-pink mb-6">
              Our Philosophy
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10"
          >
            <p className="font-body text-base md:text-lg text-white/80 leading-relaxed mb-6">
              Our philosophy centers on three unwavering principles: <span className="font-semibold text-amante-pink">quality ingredients</span>, <span className="font-semibold text-amante-pink">expert preparation</span>, and <span className="font-semibold text-amante-pink">genuine hospitality</span>.
            </p>
            <p className="font-body text-base md:text-lg text-white/80 leading-relaxed mb-6">
              We source ingredients from trusted suppliers who share our commitment to excellence—whether imported specialty items or local seasonal produce. Our culinary team brings ingredients to life through techniques that respect their origin while adding creative flair.
            </p>
            <p className="font-body text-base md:text-lg text-white/80 leading-relaxed">
              But great food without great service is just a meal. We've cultivated a culture where every team member understands they're creating experiences, not just serving customers. From the barista remembering your usual order to the events coordinator anticipating your unstated needs, we believe hospitality is about making people feel valued, welcomed, and genuinely cared for.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 lg:py-32 px-4 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-amante-pink mb-6">
              Our Values
            </h2>
            <p className="font-body text-base md:text-lg text-white/60 max-w-3xl mx-auto">
              These core principles guide every decision we make and every experience we create.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const ValueIcon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:border-amante-pink/30 transition-all"
                >
                  <div className="w-16 h-16 bg-amante-pink/10 rounded-full flex items-center justify-center mb-6">
                    <ValueIcon className="w-8 h-8 text-amante-pink" />
                  </div>
                  <h3 className="font-heading text-xl md:text-2xl text-amante-pink mb-4">
                    {value.title}
                  </h3>
                  <p className="font-body text-sm md:text-base text-white/70 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20 lg:py-32 px-4 bg-black border-t border-white/5 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/images/about/about-team.jpg"
            alt="Amante Team"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-amante-pink mb-6">
              The Team Behind Amante
            </h2>
            <p className="font-body text-base md:text-lg text-white/60 max-w-3xl mx-auto">
              Behind every memorable Amante experience are passionate professionals who take pride in their craft.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10 mb-12"
          >
            <p className="font-body text-base md:text-lg text-white/80 leading-relaxed mb-6">
              Our executive chef brings fifteen years of experience from five-star properties and international culinary adventures. The pastry team includes award-winning bakers who create morning magic. Our beverage director has curated wine lists for luxury hotels and crafts cocktail menus that surprise and delight.
            </p>
            <p className="font-body text-base md:text-lg text-white/80 leading-relaxed">
              The events team has collectively orchestrated hundreds of flawless celebrations. Our front-of-house staff undergo continuous training in hospitality excellence and food knowledge. Together, they form a family united by shared commitment: ensuring every guest leaves happier than they arrived.
            </p>
          </motion.div>

          {/* Team Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamHighlights.map((highlight, index) => {
              const HighlightIcon = highlight.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center border border-white/10 hover:border-amante-pink/30 transition-all"
                >
                  <HighlightIcon className="w-10 h-10 text-amante-pink mx-auto mb-3" />
                  <div className="font-heading text-2xl md:text-3xl text-amante-pink mb-2">
                    {highlight.stat}
                  </div>
                  <div className="font-body text-xs md:text-sm text-white/60">
                    {highlight.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 lg:py-32 px-4 bg-black border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-amante-pink mb-6">
              Awards & Recognition
            </h2>
            <p className="font-body text-base md:text-lg text-white/60">
              We're honored to be recognized by our guests and the community.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10"
          >
            <div className="flex items-center justify-center mb-8">
              <Award className="w-16 h-16 text-amante-pink" />
            </div>
            <div className="text-center space-y-6">
              <div>
                <div className="font-heading text-4xl md:text-5xl text-amante-pink mb-2">5.0</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-6 h-6 fill-amante-pink text-amante-pink" />
                  ))}
                </div>
                <p className="font-body text-sm md:text-base text-white/60">Average Guest Rating</p>
              </div>

              <div className="border-t border-white/10 pt-6">
                <p className="font-body text-base md:text-lg text-white/80 mb-4">
                  <span className="font-semibold text-amante-pink">1,000+</span> Five-Star Reviews
                </p>
                <p className="font-body text-base md:text-lg text-white/80">
                  <span className="font-semibold text-amante-pink">500+</span> Happy Events Hosted
                </p>
              </div>

              <div className="border-t border-white/10 pt-6">
                <p className="font-body text-white/70 italic">
                  "Bhopal's Premier Multi-Venue Dining Destination"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Future */}
      <section className="py-20 lg:py-32 px-4 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-amante-pink mb-6">
                Looking Forward
              </h2>
              <p className="font-body text-base md:text-lg text-white/80 leading-relaxed">
                As we look ahead, our commitment remains unchanged: continue evolving while staying true to what makes Amante special. We're constantly refining our menus based on seasonal availability and guest preferences, bringing in guest chefs for special collaborations, and creating unique events that keep our regular guests excited.
              </p>
              <p className="font-body text-base md:text-lg text-white/80 leading-relaxed">
                Our goal isn't just maintaining Bhopal's premier dining destination—it's continually raising the bar for what hospitality can be. Whether you're visiting for the first time or the hundredth, we want you to discover something new, something delightful, something worth sharing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-96 bg-gradient-to-br from-amante-red/20 to-amante-pink/20 rounded-2xl overflow-hidden border border-white/10"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <TrendingUp className="w-24 h-24 text-amante-pink/30" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 px-4 bg-gradient-to-br from-amante-red via-amante-red-dark to-black border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-6">
              Experience Our Story Yourself
            </h2>
            <p className="font-body text-base md:text-lg lg:text-xl text-white/80 mb-10">
              Visit us and become part of the Amante story. Your perfect moment awaits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <Link href="/reservations">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white text-amante-red font-bold text-base md:text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Reserve Your Table
                </motion.button>
              </Link>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold text-base md:text-lg rounded-full transition-all duration-300 border-2 border-white/30"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
