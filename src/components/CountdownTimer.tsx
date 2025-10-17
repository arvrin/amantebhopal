'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Set target date to March 2025 (you can modify this to actual opening date)
  const targetDate = new Date('2025-03-15T00:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.9, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="flex justify-center items-center gap-6 md:gap-10 mb-16"
    >
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 + index * 0.15, ease: "easeOut" }}
          className="text-center group"
        >
          <motion.div 
            className="relative bg-white/95 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl border-2 border-amante-pink-light/50 hover:border-amante-pink transition-all duration-300 overflow-hidden cursor-pointer"
            whileHover={{ 
              scale: 1.05, 
              y: -8,
              boxShadow: "0 25px 50px rgba(248, 187, 217, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Premium Background Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-amante-pink-light/10 to-amante-pink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={false}
            />
            
            {/* Floating Brand Element */}
            <motion.div 
              className="absolute top-2 right-2 text-amante-red/20 text-lg"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }
              }}
            >
              ♦
            </motion.div>

            <div className="relative z-10">
              <motion.div
                key={unit.value}
                initial={{ y: -30, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className="text-4xl md:text-5xl lg:text-6xl font-laginchy-bold text-amante-red font-bold mb-2 leading-none"
              >
                <motion.span
                  animate={{ 
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: index * 0.3
                  }}
                >
                  {String(unit.value).padStart(2, '0')}
                </motion.span>
              </motion.div>
              
              <motion.div 
                className="text-sm md:text-base lg:text-lg font-avenir-bold text-amante-red/80 uppercase tracking-widest"
                animate={{
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.4
                }}
              >
                {unit.label}
              </motion.div>
            </div>

            {/* Pulse Effect for Active State */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-amante-pink opacity-0 group-hover:opacity-100"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}