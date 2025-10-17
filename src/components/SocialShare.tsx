'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Instagram, Facebook, Twitter, Heart, Copy, Check } from 'lucide-react';

export default function SocialShare() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = "I can't wait to celebrate at Amante - Bhopal's most exciting new destination for love, food, and celebrations! 🥂❤️";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareOptions = [
    {
      name: 'Instagram',
      icon: Instagram,
      action: () => {
        // Instagram doesn't support direct web sharing, so we copy the text
        navigator.clipboard?.writeText(`${shareText} ${shareUrl}`);
        alert('Content copied! Paste it in your Instagram story or post.');
      },
      color: 'bg-gradient-to-br from-purple-500 to-pink-500'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      action: () => {
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
        window.open(url, '_blank', 'width=600,height=400');
      },
      color: 'bg-blue-600'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      action: () => {
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        window.open(url, '_blank', 'width=600,height=400');
      },
      color: 'bg-black'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border-2 border-amante-pink-light/50 min-w-[300px] overflow-hidden"
          >
            {/* Premium Background Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-amante-pink-light/20 to-transparent opacity-0 animate-pulse"
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Floating Brand Element */}
            <motion.div
              className="absolute top-2 right-2 text-amante-red/20 text-lg"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              ♦
            </motion.div>
            <div className="text-center mb-6 relative z-10">
              <motion.h3 
                className="font-baskerville text-amante-red text-xl mb-3"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                Share the Excitement
              </motion.h3>
              <motion.p 
                className="font-avenir text-gray-600 text-sm leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Let your friends know about Amante's upcoming launch!
              </motion.p>
            </div>

            {/* Enhanced Share Buttons */}
            <div className="space-y-3 mb-6 relative z-10">
              {shareOptions.map((option, index) => (
                <motion.button
                  key={option.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={option.action}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${option.color} relative overflow-hidden`}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Button Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-white/10 opacity-0"
                    whileHover={{ opacity: 1, x: ['-100%', '100%'] }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
                    className="relative z-10"
                  >
                    <option.icon className="w-5 h-5" />
                  </motion.div>
                  <span className="font-avenir font-medium relative z-10">Share on {option.name}</span>
                </motion.button>
              ))}

              {/* Enhanced Copy Link */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 hover:from-amante-red/10 hover:to-amante-pink-light/20 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200 hover:border-amante-red/30 relative overflow-hidden"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Copy Button Background Animation */}
                <motion.div
                  className="absolute inset-0 bg-amante-red/5 opacity-0"
                  animate={copied ? { opacity: [0, 1, 0] } : {}}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  animate={copied ? { scale: [1, 1.2, 1], rotate: [0, 360] } : {}}
                  transition={{ duration: 0.5 }}
                  className="relative z-10"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </motion.div>
                <motion.span 
                  className="font-avenir font-medium relative z-10"
                  animate={copied ? { color: ["#374151", "#16a34a", "#374151"] } : {}}
                  transition={{ duration: 2 }}
                >
                  {copied ? 'Copied!' : 'Copy Link'}
                </motion.span>
              </motion.button>
            </div>

            {/* Enhanced Preview Text */}
            <motion.div 
              className="bg-gradient-to-r from-amante-pink-light/50 to-amante-pink-light/30 p-4 rounded-xl text-sm font-avenir text-gray-700 border-l-4 border-amante-red shadow-inner relative z-10 backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.p
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                "{shareText}"
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Share Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-br from-amante-red to-red-600 text-white w-16 h-16 rounded-full shadow-2xl hover:shadow-amante-red/50 transition-all duration-300 flex items-center justify-center group relative overflow-hidden border-2 border-amante-pink-light/20"
        animate={{
          boxShadow: [
            "0 10px 25px rgba(185, 28, 28, 0.3)",
            "0 15px 35px rgba(185, 28, 28, 0.5)", 
            "0 10px 25px rgba(185, 28, 28, 0.3)"
          ]
        }}
        transition={{
          boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        {/* Button Background Animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
        
        {/* Floating Hearts Background */}
        <motion.div
          className="absolute top-1 left-1 text-amante-pink/30 text-xs"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 15, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ♦
        </motion.div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative z-10"
        >
          {isOpen ? (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              className="text-2xl font-bold"
              transition={{ duration: 0.3, ease: "backOut" }}
            >
              ×
            </motion.div>
          ) : (
            <motion.div 
              className="flex items-center relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, ease: "backOut" }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Share2 className="w-7 h-7" />
              </motion.div>
              
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 15, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <Heart className="w-4 h-4 text-amante-pink-light fill-current" />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </motion.button>
    </div>
  );
}