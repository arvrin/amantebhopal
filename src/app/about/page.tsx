'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import TransparentHeader from '@/components/layout/TransparentHeader';
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
import Button from '@/components/ui/Button';

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
    <div className="bg-white">
      <TransparentHeader />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/about/about-story.jpg"
            alt="About Amante"
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

        <div className="relative h-full flex items-center justify-center px-6">
          <div className="text-center max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight">
                Our Story
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-body text-xl md:text-2xl text-amante-pink-light max-w-3xl mx-auto"
            >
              Building Bhopal's Premier Dining Destination
            </motion.p>
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

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-amante-pink/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-amante-red/10 rounded-full blur-3xl" />
      </section>

      {/* The Beginning */}
      <section id="story" className="py-20 lg:py-32 px-4 bg-amante-cream">
        <div className="max-w-standard mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-heading text-3xl md:text-4xl text-amante-red mb-6">
                The Beginning
              </h2>
              <p className="font-body text-lg text-amante-charcoal leading-relaxed">
                Amante was born from a simple observation: Bhopal deserved a dining destination as dynamic and diverse as its people. Our founders spent years in hospitality across India and internationally, experiencing world-class dining destinations that seamlessly blended multiple concepts under one roof.
              </p>
              <p className="font-body text-lg text-amante-charcoal leading-relaxed">
                They saw how people's needs shift throughout the day, throughout the week, throughout life's celebrations. Yet Bhopal lacked a venue offering this versatility. In 2023, they decided to change that. The vision was ambitious—create six distinct spaces, each excellent on its own, yet harmoniously united.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-96 bg-gradient-to-br from-amante-pink-light to-amante-pink rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Target className="w-24 h-24 text-amante-red/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Journey */}
      <section className="py-20 lg:py-32 px-4 bg-white">
        <div className="max-w-standard mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-96 bg-gradient-to-br from-amante-red/10 to-amante-red/5 rounded-2xl overflow-hidden shadow-lg md:order-1"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe className="w-24 h-24 text-amante-red/20" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6 md:order-2"
            >
              <h2 className="font-heading text-3xl md:text-4xl text-amante-red mb-6">
                The Journey
              </h2>
              <p className="font-body text-lg text-amante-charcoal leading-relaxed">
                Building Amante meant assembling the right team—chefs trained in India's finest kitchens and international destinations, hospitality professionals who understand service excellence, mixologists who approach cocktails as craft, and designers who could create six distinct atmospheres within one cohesive destination.
              </p>
              <p className="font-body text-lg text-amante-charcoal leading-relaxed">
                We spent months sourcing the perfect location, central yet offering the space our vision demanded. After eighteen months of meticulous planning and construction, Amante opened its doors, immediately becoming Bhopal's most talked-about dining destination.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-32 px-4 bg-amante-cream">
        <div className="max-w-standard mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-5xl text-amante-red mb-6">
              Our Philosophy
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-lg"
          >
            <p className="font-body text-lg text-amante-charcoal leading-relaxed mb-6">
              Our philosophy centers on three unwavering principles: <span className="font-semibold text-amante-red">quality ingredients</span>, <span className="font-semibold text-amante-red">expert preparation</span>, and <span className="font-semibold text-amante-red">genuine hospitality</span>.
            </p>
            <p className="font-body text-lg text-amante-charcoal leading-relaxed mb-6">
              We source ingredients from trusted suppliers who share our commitment to excellence—whether imported specialty items or local seasonal produce. Our culinary team brings ingredients to life through techniques that respect their origin while adding creative flair.
            </p>
            <p className="font-body text-lg text-amante-charcoal leading-relaxed">
              But great food without great service is just a meal. We've cultivated a culture where every team member understands they're creating experiences, not just serving customers. From the barista remembering your usual order to the events coordinator anticipating your unstated needs, we believe hospitality is about making people feel valued, welcomed, and genuinely cared for.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 lg:py-32 px-4 bg-white">
        <div className="max-w-standard mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-5xl text-amante-red mb-6">
              Our Values
            </h2>
            <p className="font-body text-lg text-amante-charcoal max-w-3xl mx-auto">
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
                  className="bg-amante-cream rounded-xl p-8 hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 bg-amante-red/10 rounded-full flex items-center justify-center mb-6">
                    <ValueIcon className="w-8 h-8 text-amante-red" />
                  </div>
                  <h3 className="font-heading text-2xl text-amante-red mb-4">
                    {value.title}
                  </h3>
                  <p className="font-body text-amante-charcoal leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20 lg:py-32 px-4 bg-amante-cream overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <Image
            src="/images/about/about-team.jpg"
            alt="Amante Team"
            fill
            className="object-cover"
          />
        </div>
        <div className="max-w-standard mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-5xl text-amante-red mb-6">
              The Team Behind Amante
            </h2>
            <p className="font-body text-lg text-amante-charcoal max-w-3xl mx-auto">
              Behind every memorable Amante experience are passionate professionals who take pride in their craft.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-12"
          >
            <p className="font-body text-lg text-amante-charcoal leading-relaxed mb-6">
              Our executive chef brings fifteen years of experience from five-star properties and international culinary adventures. The pastry team includes award-winning bakers who create morning magic. Our beverage director has curated wine lists for luxury hotels and crafts cocktail menus that surprise and delight.
            </p>
            <p className="font-body text-lg text-amante-charcoal leading-relaxed">
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
                  className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <HighlightIcon className="w-10 h-10 text-amante-red mx-auto mb-3" />
                  <div className="font-heading text-3xl text-amante-red mb-2">
                    {highlight.stat}
                  </div>
                  <div className="font-body text-sm text-amante-grey">
                    {highlight.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 lg:py-32 px-4 bg-white">
        <div className="max-w-narrow mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-heading text-3xl md:text-5xl text-amante-red mb-6">
              Awards & Recognition
            </h2>
            <p className="font-body text-lg text-amante-charcoal">
              We're honored to be recognized by our guests and the community.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-amante-cream rounded-2xl p-8 md:p-12"
          >
            <div className="flex items-center justify-center mb-8">
              <Award className="w-16 h-16 text-amante-red" />
            </div>
            <div className="text-center space-y-6">
              <div>
                <div className="font-heading text-4xl text-amante-red mb-2">5.0</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-6 h-6 fill-amante-red text-amante-red" />
                  ))}
                </div>
                <p className="font-body text-amante-grey">Average Guest Rating</p>
              </div>

              <div className="border-t border-amante-grey-light pt-6">
                <p className="font-body text-lg text-amante-charcoal mb-4">
                  <span className="font-semibold text-amante-red">1,000+</span> Five-Star Reviews
                </p>
                <p className="font-body text-lg text-amante-charcoal">
                  <span className="font-semibold text-amante-red">500+</span> Happy Events Hosted
                </p>
              </div>

              <div className="border-t border-amante-grey-light pt-6">
                <p className="font-body text-amante-charcoal italic">
                  "Bhopal's Premier Multi-Venue Dining Destination"
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Future */}
      <section className="py-20 lg:py-32 px-4 bg-amante-cream">
        <div className="max-w-standard mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-heading text-3xl md:text-4xl text-amante-red mb-6">
                Looking Forward
              </h2>
              <p className="font-body text-lg text-amante-charcoal leading-relaxed">
                As we look ahead, our commitment remains unchanged: continue evolving while staying true to what makes Amante special. We're constantly refining our menus based on seasonal availability and guest preferences, bringing in guest chefs for special collaborations, and creating unique events that keep our regular guests excited.
              </p>
              <p className="font-body text-lg text-amante-charcoal leading-relaxed">
                Our goal isn't just maintaining Bhopal's premier dining destination—it's continually raising the bar for what hospitality can be. Whether you're visiting for the first time or the hundredth, we want you to discover something new, something delightful, something worth sharing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-96 bg-gradient-to-br from-amante-red to-amante-red-dark rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <TrendingUp className="w-24 h-24 text-white/20" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 px-4 bg-gradient-to-br from-amante-red via-amante-red-dark to-amante-charcoal text-white">
        <div className="max-w-narrow mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl mb-6">
              Experience Our Story Yourself
            </h2>
            <p className="font-body text-lg md:text-xl text-amante-pink-light mb-10">
              Visit us and become part of the Amante story. Your perfect moment awaits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/reservations">
                <Button variant="primary" size="lg">
                  Reserve Your Table
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
