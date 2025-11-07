'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function IndicatorsShowcase() {
  const [currentSlide1, setCurrentSlide1] = useState(2);
  const [currentSlide2, setCurrentSlide2] = useState(2);
  const [currentSlide3, setCurrentSlide3] = useState(2);
  const [currentSlide4, setCurrentSlide4] = useState(2);
  const [currentSlide5, setCurrentSlide5] = useState(2);
  const [currentSlide6, setCurrentSlide6] = useState(2);
  const [currentSlide7, setCurrentSlide7] = useState(2);
  const [currentSlide8, setCurrentSlide8] = useState(2);

  const totalSlides = 7;
  const slideArray = Array.from({ length: totalSlides }, (_, i) => i);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <Link href="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-heading mb-4">Slide Indicator Styles</h1>
        <p className="text-white/70 text-lg">Choose your preferred style for the carousel indicators</p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Style 1: Minimal Dots */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-2">1. Minimal Dots</h3>
          <p className="text-white/60 mb-6">Clean, simple dots with subtle animations</p>

          <div className="h-64 bg-gradient-to-br from-[#8B1538]/20 to-black/40 rounded-xl flex items-center justify-center border border-white/5">
            <div className="flex items-center gap-2">
              {slideArray.map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide1(index)}
                  className="group"
                >
                  <motion.div
                    className={`rounded-full transition-all duration-300 ${
                      currentSlide1 === index
                        ? 'w-8 h-2 bg-gradient-to-r from-[#8B1538] to-amante-pink'
                        : 'w-2 h-2 bg-white/40 group-hover:bg-white/60'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Style 2: Numbered Pills */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-2">2. Numbered Pills</h3>
          <p className="text-white/60 mb-6">Elegant numbered indicators</p>

          <div className="h-64 bg-gradient-to-br from-[#8B1538]/20 to-black/40 rounded-xl flex items-center justify-center border border-white/5">
            <div className="flex items-center gap-3">
              {slideArray.map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide2(index)}
                  className="group"
                >
                  <motion.div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      currentSlide2 === index
                        ? 'bg-gradient-to-br from-[#8B1538] to-amante-pink text-white scale-110 shadow-lg shadow-[#8B1538]/50'
                        : 'bg-white/10 text-white/50 group-hover:bg-white/20 group-hover:text-white/70'
                    }`}
                    whileHover={{ scale: 1.15 }}
                  >
                    {index + 1}
                  </motion.div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Style 3: Line Progress */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-2">3. Line Progress</h3>
          <p className="text-white/60 mb-6">Sleek horizontal line segments</p>

          <div className="h-64 bg-gradient-to-br from-[#8B1538]/20 to-black/40 rounded-xl flex items-center justify-center border border-white/5">
            <div className="flex items-center gap-2">
              {slideArray.map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide3(index)}
                  className="group"
                >
                  <motion.div
                    className={`h-1 rounded-full transition-all duration-300 ${
                      currentSlide3 === index
                        ? 'w-12 bg-gradient-to-r from-[#8B1538] via-amante-pink to-white'
                        : 'w-8 bg-white/30 group-hover:bg-white/50'
                    }`}
                    whileHover={{ width: currentSlide3 === index ? '3rem' : '2.5rem' }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Style 4: Diamond Shapes */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-2">4. Diamond Shapes</h3>
          <p className="text-white/60 mb-6">Elegant diamond indicators</p>

          <div className="h-64 bg-gradient-to-br from-[#8B1538]/20 to-black/40 rounded-xl flex items-center justify-center border border-white/5">
            <div className="flex items-center gap-3">
              {slideArray.map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide4(index)}
                  className="group"
                >
                  <motion.div
                    className={`w-3 h-3 rotate-45 transition-all duration-300 ${
                      currentSlide4 === index
                        ? 'bg-gradient-to-br from-[#8B1538] to-amante-pink scale-150 shadow-lg shadow-[#8B1538]/50'
                        : 'bg-white/40 group-hover:bg-white/60 group-hover:scale-125'
                    }`}
                    whileHover={{ rotate: 45, scale: currentSlide4 === index ? 1.6 : 1.3 }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Style 5: Vertical Bars */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-2">5. Vertical Bars</h3>
          <p className="text-white/60 mb-6">Modern vertical bar indicators</p>

          <div className="h-64 bg-gradient-to-br from-[#8B1538]/20 to-black/40 rounded-xl flex items-center justify-center border border-white/5">
            <div className="flex items-center gap-2">
              {slideArray.map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide5(index)}
                  className="group"
                >
                  <motion.div
                    className={`w-1 rounded-full transition-all duration-300 ${
                      currentSlide5 === index
                        ? 'h-12 bg-gradient-to-b from-[#8B1538] via-amante-pink to-white'
                        : 'h-6 bg-white/30 group-hover:bg-white/50 group-hover:h-8'
                    }`}
                    whileHover={{ height: currentSlide5 === index ? '3.5rem' : '2.5rem' }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Style 6: Thumbnail Dots with Border */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-2">6. Ring Dots</h3>
          <p className="text-white/60 mb-6">Hollow rings with fill animation</p>

          <div className="h-64 bg-gradient-to-br from-[#8B1538]/20 to-black/40 rounded-xl flex items-center justify-center border border-white/5">
            <div className="flex items-center gap-3">
              {slideArray.map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide6(index)}
                  className="group"
                >
                  <motion.div
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      currentSlide6 === index
                        ? 'border-2 border-amante-pink bg-gradient-to-br from-[#8B1538] to-amante-pink scale-125 shadow-lg shadow-amante-pink/50'
                        : 'border-2 border-white/40 bg-transparent group-hover:border-white/70 group-hover:scale-110'
                    }`}
                    whileHover={{ scale: currentSlide6 === index ? 1.35 : 1.2 }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Style 7: Slide Counter Text */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-2">7. Text Counter</h3>
          <p className="text-white/60 mb-6">Simple text-based counter</p>

          <div className="h-64 bg-gradient-to-br from-[#8B1538]/20 to-black/40 rounded-xl flex items-center justify-center border border-white/5">
            <div className="flex flex-col items-center gap-4">
              <div className="text-6xl font-bold bg-gradient-to-r from-[#8B1538] to-amante-pink bg-clip-text text-transparent">
                {currentSlide7 + 1}
              </div>
              <div className="text-white/50 text-sm">/ {totalSlides}</div>
              <div className="flex gap-2 mt-4">
                {slideArray.map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide7(index)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      currentSlide7 === index
                        ? 'bg-gradient-to-r from-[#8B1538] to-amante-pink text-white'
                        : 'bg-white/10 text-white/50 hover:bg-white/20'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Style 8: Fraction Style */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-lg border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-2">8. Fraction Inline</h3>
          <p className="text-white/60 mb-6">Compact inline fraction with dots</p>

          <div className="h-64 bg-gradient-to-br from-[#8B1538]/20 to-black/40 rounded-xl flex items-center justify-center border border-white/5">
            <div className="bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 flex items-center gap-4">
              <span className="text-2xl font-bold text-amante-pink">{currentSlide8 + 1}</span>
              <span className="text-white/40">/</span>
              <span className="text-lg text-white/60">{totalSlides}</span>
              <div className="h-6 w-px bg-white/20 mx-2"></div>
              <div className="flex gap-1.5">
                {slideArray.map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide8(index)}
                    className="group"
                  >
                    <motion.div
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        currentSlide8 === index
                          ? 'bg-amante-pink scale-150'
                          : 'bg-white/30 group-hover:bg-white/50'
                      }`}
                      whileHover={{ scale: currentSlide8 === index ? 1.7 : 1.3 }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-12 text-center text-white/50 text-sm">
        Click on any indicator style to see it in action
      </div>
    </div>
  );
}
