'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Utensils, Wine, Music, Heart, Clock, Star, Sparkles } from 'lucide-react';

interface TimelineProps {
  activeSpace: string;
  setActiveSpace: (space: string) => void;
}

// Redesigned to 4 key moments with stronger brand focus
const timelineData = [
  {
    id: 'morning',
    time: '8 AM - 12 PM',
    title: 'Morning Bliss',
    subtitle: 'Café & Bakery',
    description: 'Bhopal\'s finest artisan coffee with French pastries and fresh bakes',
    details: 'Premium single-origin beans • Handcrafted croissants • Instagram-worthy brunch platters',
    icon: Coffee,
    brandIcon: '♦',
    bgImage: 'linear-gradient(135deg, #FCE7F3 0%, #F8BBD9 50%, #FCE7F3 100%)',
    accentColor: '#B91C1C'
  },
  {
    id: 'afternoon',
    time: '12 PM - 6 PM',
    title: 'Golden Hours',
    subtitle: 'Rooftop Dining',
    description: 'MP\'s highest rooftop with 360° city views and signature cuisine',
    details: 'Panoramic Bhopal skyline • Chef\'s special thalis • Perfect for dates & celebrations',
    icon: Utensils,
    brandIcon: '♦',
    bgImage: 'linear-gradient(135deg, #FCE7F3 0%, #F8BBD9 50%, #FCE7F3 100%)',
    accentColor: '#B91C1C'
  },
  {
    id: 'evening',
    time: '6 PM - 10 PM',
    title: 'Intimate Evenings',
    subtitle: 'Lounge & Private Dining',
    description: 'Crafted cocktails in Bhopal\'s most romantic setting',
    details: 'Award-winning mixologists • Cozy private booths • Live acoustic sessions',
    icon: Wine,
    brandIcon: '♦',
    bgImage: 'linear-gradient(135deg, #FCE7F3 0%, #F8BBD9 50%, #FCE7F3 100%)',
    accentColor: '#B91C1C'
  },
  {
    id: 'night',
    time: '10 PM - 2 AM',
    title: 'Celebration Mode',
    subtitle: 'Club & Late Night',
    description: 'MP\'s premier nightclub with international DJs and energy',
    details: 'State-of-the-art sound system • Celebrity DJ performances • VIP bottle service',
    icon: Music,
    brandIcon: '♦',
    bgImage: 'linear-gradient(135deg, #FCE7F3 0%, #F8BBD9 50%, #FCE7F3 100%)',
    accentColor: '#B91C1C'
  }
];

export default function InteractiveTimeline({ activeSpace, setActiveSpace }: TimelineProps) {
  return (
    <div className="relative">
      {/* Enhanced Timeline Line - Red Background Theme */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-amante-pink/40 via-amante-pink-light to-amante-pink/40 hidden md:block rounded-full shadow-lg">
        {/* Pulsing glow effect */}
        <motion.div
          className="absolute inset-0 bg-amante-pink-light rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        {/* Diamond decorations on timeline */}
        <motion.div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-amante-pink-light text-2xl"
          animate={{ 
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          ♦
        </motion.div>
        <motion.div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-amante-pink-light text-2xl"
          animate={{ 
            rotate: [360, 180, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        >
          ♦
        </motion.div>
      </div>

      {/* Timeline Items - Brand-Focused Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        {timelineData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="relative"
            onMouseEnter={() => setActiveSpace(item.id)}
            onMouseLeave={() => setActiveSpace('')}
            onClick={() => setActiveSpace(activeSpace === item.id ? '' : item.id)}
          >
            {/* Enhanced Timeline Dot - Red Background Theme */}
            <div className="absolute left-1/2 md:left-auto md:right-0 transform -translate-x-1/2 md:translate-x-1/2 -top-2 z-20 hidden md:block">
              <motion.div 
                className="w-10 h-10 bg-amante-pink-light rounded-full border-4 border-amante-pink shadow-2xl flex items-center justify-center relative"
                whileHover={{ scale: 1.3 }}
                animate={activeSpace === item.id ? { scale: 1.4 } : { scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <Heart className="w-4 h-4 text-amante-red fill-current" />
                
                {/* Pulsing rings */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-amante-pink"
                  animate={activeSpace === item.id ? { 
                    scale: [1, 2.2, 1],
                    opacity: [0.8, 0.2, 0.8]
                  } : {}}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border border-amante-pink-light"
                  animate={activeSpace === item.id ? { 
                    scale: [1, 1.8, 1],
                    opacity: [0.6, 0.1, 0.6]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                />
              </motion.div>
            </div>

            {/* Content Card - Red Background Theme */}
            <motion.div
              whileHover={{ 
                y: -12, 
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(185, 28, 28, 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-8 rounded-3xl cursor-pointer transition-all duration-500 overflow-hidden backdrop-blur-sm ${
                activeSpace === item.id 
                  ? 'bg-white/95 ring-4 ring-amante-pink-light/80 shadow-2xl border border-amante-pink/30' 
                  : 'bg-white/90 hover:bg-white/95 shadow-xl hover:shadow-2xl border border-amante-pink-light/20'
              }`}
              transition={{ duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
            >
              {/* Enhanced Brand decoration */}
              <motion.div 
                className="absolute top-6 right-6 text-amante-red/30 text-3xl"
                animate={{
                  rotate: [0, 360],
                  scale: activeSpace === item.id ? [1, 1.3, 1] : 1
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                {item.brandIcon}
              </motion.div>
              
              {/* Floating hearts for active state */}
              <AnimatePresence>
                {activeSpace === item.id && (
                  <motion.div
                    className="absolute top-4 left-4"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      animate={{
                        y: [-5, -15, -5],
                        x: [0, 5, 0],
                        rotate: [0, 15, 0]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Heart className="w-5 h-5 text-amante-red/40 fill-current" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Enhanced Time Badge */}
              <motion.div 
                className={`inline-flex items-center gap-3 px-5 py-3 rounded-full text-sm font-avenir font-bold mb-6 shadow-lg transition-all duration-300 ${
                  activeSpace === item.id 
                    ? 'bg-amante-red text-amante-pink-light border-2 border-amante-pink-light/50' 
                    : 'bg-amante-red/15 text-amante-red border border-amante-red/20'
                }`}
                whileHover={{ scale: 1.05 }}
                animate={activeSpace === item.id ? { 
                  scale: [1, 1.08, 1],
                  boxShadow: ["0 4px 15px rgba(185, 28, 28, 0.3)", "0 8px 25px rgba(185, 28, 28, 0.5)", "0 4px 15px rgba(185, 28, 28, 0.3)"]
                } : {}}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.div
                  animate={activeSpace === item.id ? { rotate: 360 } : {}}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Clock className="w-4 h-4" />
                </motion.div>
                {item.time}
              </motion.div>

              {/* Enhanced Content Header */}
              <div className="flex items-start gap-5 mb-6">
                <motion.div 
                  className={`p-5 rounded-2xl transition-all duration-500 shadow-lg ${
                    activeSpace === item.id 
                      ? 'bg-gradient-to-br from-amante-red to-amante-red-dark text-amante-pink-light border border-amante-pink/30' 
                      : 'bg-amante-red/15 text-amante-red hover:bg-amante-red/20'
                  }`}
                  whileHover={{ 
                    rotate: [0, -10, 10, 0],
                    scale: 1.05
                  }}
                  transition={{ duration: 0.5 }}
                  animate={activeSpace === item.id ? {
                    boxShadow: ["0 4px 15px rgba(185, 28, 28, 0.4)", "0 8px 25px rgba(185, 28, 28, 0.6)", "0 4px 15px rgba(185, 28, 28, 0.4)"]
                  } : {}}
                >
                  <item.icon className="w-9 h-9" />
                </motion.div>

                <div className="flex-1">
                  <motion.h3 
                    className="text-2xl md:text-3xl font-laginchy-bold text-amante-red mb-2 leading-tight"
                    animate={activeSpace === item.id ? {
                      scale: [1, 1.02, 1]
                    } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {item.title}
                  </motion.h3>
                  <p className="text-amante-red/80 font-avenir font-bold text-sm uppercase tracking-widest">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* Enhanced Description */}
              <p className="font-avenir text-gray-700 text-lg md:text-xl mb-6 leading-relaxed">
                {item.description}
              </p>

              {/* Expandable Details */}
              <AnimatePresence>
                {activeSpace === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-amante-red/20 pt-4"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <Star className="w-5 h-5 text-amante-red mt-1 flex-shrink-0" />
                      <p className="font-avenir text-gray-600 text-sm leading-relaxed">
                        {item.details}
                      </p>
                    </div>
                    
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2 text-amante-red">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-avenir font-medium">
                          Experience this moment at Amante
                        </span>
                      </div>
                      <Heart className="w-5 h-5 text-amante-red/40 hover:text-amante-red transition-colors heart-symbol" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile tap indicator */}
              <div className="md:hidden absolute bottom-4 right-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-amante-red/40 text-sm font-avenir"
                >
                  Tap to explore
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Enhanced Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center mt-20 relative"
      >
        {/* Enhanced Brand decoration */}
        <motion.div 
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-6">
            <div className="w-20 h-px bg-gradient-to-r from-transparent to-amante-pink-light"></div>
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="text-amante-pink text-2xl"
            >
              ♦
            </motion.div>
            <Heart className="w-8 h-8 text-amante-pink-light fill-current" />
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [360, 180, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3
              }}
              className="text-amante-pink text-2xl"
            >
              ♦
            </motion.div>
            <div className="w-20 h-px bg-gradient-to-l from-transparent to-amante-pink-light"></div>
          </div>
        </motion.div>

        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl font-laginchy-bold text-amante-pink-light mb-6 pt-8"
        >
          <span className="block">24 Hours of</span>
          <span className="text-amante-pink relative">
            Pure Magic
            <motion.div
              className="absolute -top-2 -right-8"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Heart className="w-6 h-6 text-amante-pink fill-current" />
            </motion.div>
          </span>
        </motion.h3>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-avenir text-amante-pink-light/90 mb-10 max-w-4xl mx-auto text-xl leading-relaxed"
        >
          From morning coffee rituals to midnight celebrations, Amante transforms with your every mood. 
          <br className="hidden sm:block" />
          <span className="text-amante-pink font-avenir-bold"> Book your perfect moment in Bhopal's most loved destination.</span>
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.08, y: -4 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-amante-pink-light to-white text-amante-red px-12 py-5 rounded-full font-avenir-bold text-lg shadow-2xl hover:shadow-amante-red/20 flex items-center gap-3 relative overflow-hidden border-2 border-amante-pink/30"
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-amante-pink/20 to-amante-pink-light/40"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            <span className="relative z-10">Reserve Your Experience</span>
            <Heart className="w-6 h-6 relative z-10 fill-current" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-amante-pink-light text-amante-pink-light px-10 py-5 rounded-full font-avenir-bold hover:bg-amante-pink-light hover:text-amante-red transition-all duration-300 shadow-xl"
          >
            Get Early Access
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}