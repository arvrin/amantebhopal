'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, UtensilsCrossed, Wine, Coffee, ChevronRight, Sparkles, ChefHat, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 'food',
    name: 'Food Menu',
    icon: UtensilsCrossed,
    description: 'Chowing down on the good stuff from the world',
    href: '/menu/food',
    color: '#8B1538',
  },
  {
    id: 'bar',
    name: 'Bar Menu',
    icon: Wine,
    description: 'Craft cocktails & premium spirits',
    href: '/menu/bar',
    color: '#8B1538',
  },
  {
    id: 'cafe',
    name: 'Café Menu',
    icon: Coffee,
    description: 'Artisan coffee & fresh delights',
    href: '/menu/cafe',
    color: '#8B1538',
  }
];

export default function MenuLandingShowcase() {
  const [selectedDesign, setSelectedDesign] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F0] to-[#FFF0F5] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/menu">
            <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-4">
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Current Menu Page</span>
            </button>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-[#8B1538] mb-2">
            Menu Landing Page Design Showcase
          </h1>
          <p className="text-gray-600">
            First impression when guests scan the QR code - Choose the perfect design
          </p>
        </div>

        {/* Design Grid */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Design 1: Magazine Editorial (Based on Design 5) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Design 1: Magazine Editorial</h2>
              <button
                onClick={() => setSelectedDesign(1)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedDesign === 1
                    ? 'bg-[#8B1538] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {selectedDesign === 1 ? 'Selected' : 'Select'}
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ minHeight: '600px' }}>
              {/* Magazine Header */}
              <div className="bg-black text-white p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs uppercase tracking-[0.3em] text-gray-400">Menu 2025</div>
                  <div className="text-xs uppercase tracking-[0.3em] text-gray-400">Curated Selection</div>
                </div>
                <h1 className="text-5xl font-serif font-bold mb-3">Explore<br/>Our Menus</h1>
                <p className="text-sm text-gray-400 italic">Curated culinary experiences</p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <div
                      key={category.id}
                      className="group cursor-pointer bg-gradient-to-r from-gray-50 to-white rounded-xl p-5 border-l-4 border-[#8B1538] hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-4xl font-bold text-[#8B1538]/10 group-hover:text-[#8B1538]/20 transition-colors">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div className="w-12 h-12 rounded-full bg-[#8B1538]/10 flex items-center justify-center group-hover:bg-[#8B1538] transition-all">
                          <Icon className="w-6 h-6 text-[#8B1538] group-hover:text-white transition-colors" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-0.5">{category.name}</h3>
                          <p className="text-xs text-gray-600">{category.description}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#8B1538] group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Footer Bar */}
              <div className="bg-black text-white px-6 py-4">
                <div className="flex items-center justify-between text-xs">
                  <span>+91 98937 79100</span>
                  <span>•</span>
                  <span>www.cafeamante.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Design 2: Haute Couture Elegant (Based on Design 10) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Design 2: Haute Couture</h2>
              <button
                onClick={() => setSelectedDesign(2)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedDesign === 2
                    ? 'bg-[#8B1538] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {selectedDesign === 2 ? 'Selected' : 'Select'}
              </button>
            </div>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden" style={{ minHeight: '600px' }}>
              {/* Elegant Header with Pattern */}
              <div className="relative bg-[#8B1538] p-10 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }} />
                </div>
                <div className="relative text-center">
                  <div className="inline-block mb-4">
                    <div className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center mb-3">
                      <Sparkles className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <p className="text-sm text-white/90 italic mb-1">A celebration of passion on a plate</p>
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <div className="h-px w-20 bg-white/30" />
                    <span className="text-xs text-white/70 uppercase tracking-[0.3em]">Menu Selection</span>
                    <div className="h-px w-20 bg-white/30" />
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8">
                <div className="max-w-md mx-auto space-y-6">
                  {categories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                      <div key={category.id} className="group cursor-pointer">
                        <div className="relative">
                          {/* Decorative number */}
                          <div className="absolute -left-12 top-0 text-7xl font-serif font-bold text-gray-100 group-hover:text-[#8B1538]/10 transition-colors">
                            {index + 1}
                          </div>

                          <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 group-hover:border-[#8B1538]/30 group-hover:shadow-xl transition-all duration-300">
                            <div className="flex items-start gap-4">
                              {/* Icon */}
                              <div className="relative">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8B1538]/10 to-[#DC2626]/10 flex items-center justify-center group-hover:from-[#8B1538]/20 group-hover:to-[#DC2626]/20 transition-all">
                                  <Icon className="w-7 h-7 text-[#8B1538]" strokeWidth={1.5} />
                                </div>
                                {/* Decorative corner */}
                                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#8B1538]/30" />
                              </div>

                              <div className="flex-1">
                                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-[#8B1538] transition-colors">
                                  {category.name}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                  {category.description}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-[#8B1538] font-medium">
                                  <span className="uppercase tracking-wider">Discover</span>
                                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                              </div>
                            </div>

                            {/* Decorative corner bottom */}
                            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#8B1538]/20 group-hover:border-[#8B1538]/40 transition-colors" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Contact */}
                <div className="mt-10 pt-8 border-t border-gray-200 text-center">
                  <div className="inline-block">
                    <p className="text-sm font-semibold text-[#8B1538] mb-1">+91 98937 79100</p>
                    <p className="text-xs text-gray-500 mb-1">1, Mahendra Business Square, Bawadia Kalan</p>
                    <p className="text-xs text-gray-400">www.cafeamante.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Design 3: Luxury Art Gallery (Based on Design 11) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Design 3: Art Gallery</h2>
              <button
                onClick={() => setSelectedDesign(3)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedDesign === 3
                    ? 'bg-[#8B1538] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {selectedDesign === 3 ? 'Selected' : 'Select'}
              </button>
            </div>
            <div className="bg-[#F5F5F0] rounded-3xl shadow-2xl p-10" style={{ minHeight: '600px' }}>
              {/* Gallery Header */}
              <div className="text-center mb-12">
                <p className="text-sm text-gray-700 uppercase tracking-[0.4em] mb-2">Culinary Collection</p>
                <p className="text-xs text-gray-500 italic">Select Your Exhibition</p>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 gap-6 max-w-xl mx-auto">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.15 }}
                      className="group cursor-pointer"
                    >
                      <div className="relative bg-white p-8 shadow-xl group-hover:shadow-2xl transition-all duration-500 border-8 border-white">
                        {/* Frame shadow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 transform translate-x-2 translate-y-2 -z-10" />

                        <div className="text-center">
                          {/* Icon as art piece */}
                          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#8B1538]/10 to-[#DC2626]/10 mb-4 group-hover:scale-110 transition-transform duration-500">
                            <Icon className="w-10 h-10 text-[#8B1538]" strokeWidth={1} />
                          </div>

                          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2 tracking-wide">
                            {category.name}
                          </h3>

                          <div className="w-12 h-px bg-[#8B1538] mx-auto mb-3" />

                          <p className="text-sm text-gray-600 leading-relaxed mb-4">
                            {category.description}
                          </p>

                          <div className="inline-flex items-center gap-2 text-xs text-[#8B1538] font-semibold uppercase tracking-wider">
                            <span>View Collection</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>

                        {/* Gallery number */}
                        <div className="absolute top-2 right-2 text-xs text-gray-400 font-mono">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Gallery Info */}
              <div className="mt-12 text-center">
                <div className="inline-block border-t border-b border-gray-300 py-3 px-6">
                  <p className="text-xs text-gray-600 mb-1">+91 98937 79100</p>
                  <p className="text-xs text-gray-500">www.cafeamante.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Design 4: Modern Editorial Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Design 4: Modern Grid</h2>
              <button
                onClick={() => setSelectedDesign(4)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedDesign === 4
                    ? 'bg-[#8B1538] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {selectedDesign === 4 ? 'Selected' : 'Select'}
              </button>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-8" style={{ minHeight: '600px' }}>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B1538]/10 rounded-full mb-4">
                  <ChefHat className="w-4 h-4 text-[#8B1538]" />
                  <span className="text-xs font-semibold text-[#8B1538] uppercase tracking-wider">Menu Selection</span>
                </div>
                <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">What's Your Mood?</h1>
                <p className="text-sm text-gray-600">Select your culinary journey</p>
              </div>

              {/* Large Cards */}
              <div className="space-y-4 max-w-2xl mx-auto">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <div
                      key={category.id}
                      className="relative group cursor-pointer"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8B1538] to-[#DC2626] rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-300" />
                      <div className="relative bg-white rounded-2xl p-6 border border-gray-100 group-hover:border-[#8B1538]/30 transition-all">
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B1538]/10 to-[#DC2626]/10 flex items-center justify-center">
                              <Icon className="w-8 h-8 text-[#8B1538]" />
                            </div>
                            {index === 0 && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center">
                                <Star className="w-3 h-3 text-white fill-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-1 group-hover:text-[#8B1538] transition-colors">
                              {category.name}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed mb-3">{category.description}</p>
                            <div className="flex items-center gap-2 text-xs text-[#8B1538] font-medium">
                              <span>Explore Menu</span>
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Contact */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-500">Need assistance? Call +91 98937 79100</p>
              </div>
            </div>
          </div>

          {/* Design 5: Sophisticated Split */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Design 5: Split Layout</h2>
              <button
                onClick={() => setSelectedDesign(5)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedDesign === 5
                    ? 'bg-[#8B1538] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {selectedDesign === 5 ? 'Selected' : 'Select'}
              </button>
            </div>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden" style={{ minHeight: '600px' }}>
              {/* Decorative Top Bar */}
              <div className="h-2 bg-gradient-to-r from-[#8B1538] via-[#DC2626] to-[#8B1538]" />

              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8 pb-6 border-b-2 border-gray-100">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#8B1538]/30" />
                    <Sparkles className="w-5 h-5 text-[#8B1538]" />
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#8B1538]/30" />
                  </div>
                  <h1 className="text-2xl font-serif font-bold text-gray-900 mb-2">Our Menu Collection</h1>
                  <p className="text-sm text-gray-600 italic">Choose your experience</p>
                </div>

                {/* Split Cards */}
                <div className="space-y-4">
                  {categories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                      <div key={category.id} className="group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                        <div className="flex">
                          {/* Left - Icon Section */}
                          <div className="w-32 bg-gradient-to-br from-[#8B1538] to-[#DC2626] flex flex-col items-center justify-center p-4 group-hover:scale-105 transition-transform origin-left">
                            <Icon className="w-10 h-10 text-white mb-2" strokeWidth={1.5} />
                            <div className="text-xs font-bold text-white/80 uppercase tracking-wider">
                              {String(index + 1).padStart(2, '0')}
                            </div>
                          </div>

                          {/* Right - Content Section */}
                          <div className="flex-1 bg-white p-5">
                            <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-[#8B1538] transition-colors">
                              {category.name}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed mb-3">
                              {category.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="text-xs text-[#8B1538] font-medium uppercase tracking-wider">
                                View Menu
                              </div>
                              <ChevronRight className="w-5 h-5 text-[#8B1538] group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                  <p className="text-xs text-gray-500">+91 98937 79100 • www.cafeamante.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Design 6: Minimalist Luxury */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Design 6: Minimalist</h2>
              <button
                onClick={() => setSelectedDesign(6)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedDesign === 6
                    ? 'bg-[#8B1538] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {selectedDesign === 6 ? 'Selected' : 'Select'}
              </button>
            </div>
            <div className="bg-white rounded-3xl shadow-2xl p-12" style={{ minHeight: '600px' }}>
              {/* Minimal Header */}
              <div className="text-center mb-12">
                <h1 className="text-3xl font-serif text-gray-900 mb-3 tracking-tight">Menu Selection</h1>
                <div className="w-16 h-px bg-[#8B1538] mx-auto mb-3" />
                <p className="text-sm text-gray-600">Choose your culinary path</p>
              </div>

              {/* Vertical Elegant List */}
              <div className="space-y-8 max-w-md mx-auto">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <div key={category.id}>
                      <div className="group cursor-pointer">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B1538] to-[#DC2626] flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-serif font-bold text-gray-900 group-hover:text-[#8B1538] transition-colors">
                              {category.name}
                            </h3>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#8B1538] group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-sm text-gray-600 ml-16 leading-relaxed">{category.description}</p>
                      </div>
                      {index < categories.length - 1 && (
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mt-8" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="text-center space-y-2">
                  <p className="text-sm font-semibold text-[#8B1538]">+91 98937 79100</p>
                  <p className="text-xs text-gray-500">1, Mahendra Business Square, Bawadia Kalan, Bhopal</p>
                  <p className="text-xs text-gray-500">www.cafeamante.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Design 7: Magazine with Haute Couture Elements */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Design 7: Magazine Haute</h2>
              <button
                onClick={() => setSelectedDesign(7)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedDesign === 7
                    ? 'bg-[#8B1538] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {selectedDesign === 7 ? 'Selected' : 'Select'}
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden" style={{ minHeight: '600px' }}>
              {/* Magazine Header */}
              <div className="bg-black text-white p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs uppercase tracking-[0.3em] text-gray-400">Menu 2025</div>
                  <div className="text-xs uppercase tracking-[0.3em] text-gray-400">Curated Selection</div>
                </div>
                <h1 className="text-5xl font-serif font-bold mb-3">Explore<br/>Our Menus</h1>
                <p className="text-sm text-gray-400 italic">Curated culinary experiences</p>
              </div>

              {/* Content with Haute Couture styling */}
              <div className="p-8">
                <div className="space-y-6 max-w-md mx-auto">
                  {categories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                      <div key={category.id} className="group cursor-pointer">
                        <div className="relative">
                          {/* Decorative number */}
                          <div className="absolute -left-12 top-0 text-7xl font-serif font-bold text-gray-100 group-hover:text-[#8B1538]/10 transition-colors">
                            {index + 1}
                          </div>

                          <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 group-hover:border-[#8B1538]/30 group-hover:shadow-xl transition-all duration-300">
                            <div className="flex items-start gap-4">
                              {/* Icon */}
                              <div className="relative">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8B1538]/10 to-[#DC2626]/10 flex items-center justify-center group-hover:from-[#8B1538]/20 group-hover:to-[#DC2626]/20 transition-all">
                                  <Icon className="w-7 h-7 text-[#8B1538]" strokeWidth={1.5} />
                                </div>
                                {/* Decorative corner */}
                                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#8B1538]/30" />
                              </div>

                              <div className="flex-1">
                                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-[#8B1538] transition-colors">
                                  {category.name}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                  {category.description}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-[#8B1538] font-medium">
                                  <span className="uppercase tracking-wider">Discover</span>
                                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                              </div>
                            </div>

                            {/* Decorative corner bottom */}
                            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#8B1538]/20 group-hover:border-[#8B1538]/40 transition-colors" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Contact */}
                <div className="mt-10 pt-8 border-t border-gray-200 text-center">
                  <div className="inline-block">
                    <p className="text-sm font-semibold text-[#8B1538] mb-1">+91 98937 79100</p>
                    <p className="text-xs text-gray-500 mb-1">1, Mahendra Business Square, Bawadia Kalan</p>
                    <p className="text-xs text-gray-400">www.cafeamante.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Design 8: Haute Couture with Magazine Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Design 8: Haute Magazine</h2>
              <button
                onClick={() => setSelectedDesign(8)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedDesign === 8
                    ? 'bg-[#8B1538] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {selectedDesign === 8 ? 'Selected' : 'Select'}
              </button>
            </div>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden" style={{ minHeight: '600px' }}>
              {/* Elegant Header with Text instead of Icon */}
              <div className="relative bg-[#B91C1C] p-10 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }} />
                </div>
                <div className="relative">
                  {/* Top Corner Labels */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-xs text-white/70 uppercase tracking-[0.3em]">Menu 2025</div>
                    <div className="text-xs text-white/70 uppercase tracking-[0.3em]">Curated Selection</div>
                  </div>

                  {/* Main Title */}
                  <div className="text-center">
                    <h1 className="text-5xl font-serif font-bold text-white mb-4 tracking-tight leading-tight">
                      Explore<br/>Our Menus
                    </h1>
                    <div className="flex items-center justify-center gap-3 mt-4">
                      <div className="h-px w-20 bg-white/30" />
                      <span className="text-xs text-white/70 italic">Curated culinary experiences</span>
                      <div className="h-px w-20 bg-white/30" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8">
                <div className="max-w-md mx-auto space-y-6">
                  {categories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                      <div key={category.id} className="group cursor-pointer">
                        <div className="relative">
                          {/* Decorative number */}
                          <div className="absolute -left-12 top-0 text-7xl font-serif font-bold text-gray-100 group-hover:text-[#B91C1C]/10 transition-colors">
                            {index + 1}
                          </div>

                          <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 group-hover:border-[#B91C1C]/30 group-hover:shadow-xl transition-all duration-300">
                            <div className="flex items-start gap-4">
                              {/* Icon */}
                              <div className="relative">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#B91C1C]/10 to-[#DC2626]/10 flex items-center justify-center group-hover:from-[#B91C1C]/20 group-hover:to-[#DC2626]/20 transition-all">
                                  <Icon className="w-7 h-7 text-[#B91C1C]" strokeWidth={1.5} />
                                </div>
                                {/* Decorative corner */}
                                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#B91C1C]/30" />
                              </div>

                              <div className="flex-1">
                                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-[#B91C1C] transition-colors">
                                  {category.name}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                  {category.description}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-[#B91C1C] font-medium">
                                  <span className="uppercase tracking-wider">Discover</span>
                                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                              </div>
                            </div>

                            {/* Decorative corner bottom */}
                            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#B91C1C]/20 group-hover:border-[#B91C1C]/40 transition-colors" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Contact */}
                <div className="mt-10 pt-8 border-t border-gray-200 text-center">
                  <div className="inline-block">
                    <p className="text-sm font-semibold text-[#B91C1C] mb-1">+91 98937 79100</p>
                    <p className="text-xs text-gray-500 mb-1">1, Mahendra Business Square, Bawadia Kalan</p>
                    <p className="text-xs text-gray-400">www.cafeamante.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Design 9: Refined Haute Magazine v2 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Design 9: Refined Haute v2</h2>
              <button
                onClick={() => setSelectedDesign(9)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedDesign === 9
                    ? 'bg-[#8B1538] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {selectedDesign === 9 ? 'Selected' : 'Select'}
              </button>
            </div>
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden" style={{ minHeight: '600px' }}>
              {/* Elegant Header */}
              <div className="relative bg-gradient-to-br from-[#8B1538] to-[#6B0F28] p-10 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                    backgroundSize: '20px 20px'
                  }} />
                </div>
                <div className="relative">
                  {/* Top Corner Labels */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-xs text-white/70 uppercase tracking-[0.3em]">Menu 2025</div>
                    <div className="text-xs text-white/70 uppercase tracking-[0.3em]">Curated Selection</div>
                  </div>

                  {/* Main Title */}
                  <div className="text-center">
                    <h1 className="text-5xl font-serif font-bold text-white mb-4 tracking-tight leading-tight">
                      Explore<br/>Our Menus
                    </h1>
                    <div className="flex items-center justify-center gap-3 mt-4">
                      <div className="h-px w-20 bg-white/30" />
                      <span className="text-xs text-white/70 italic">Curated culinary experiences</span>
                      <div className="h-px w-20 bg-white/30" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8">
                <div className="max-w-md mx-auto space-y-6">
                  {categories.map((category, index) => {
                    const Icon = category.icon;
                    return (
                      <div key={category.id} className="group cursor-pointer">
                        <div className="relative">
                          {/* Decorative number */}
                          <div className="absolute -left-12 top-0 text-7xl font-serif font-bold text-gray-100 group-hover:text-[#8B1538]/10 transition-colors">
                            {index + 1}
                          </div>

                          <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 group-hover:border-[#8B1538]/30 group-hover:shadow-xl transition-all duration-300">
                            <div className="flex items-start gap-4">
                              {/* Icon */}
                              <div className="relative">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#8B1538]/10 to-[#6B0F28]/10 flex items-center justify-center group-hover:from-[#8B1538]/20 group-hover:to-[#6B0F28]/20 transition-all">
                                  <Icon className="w-7 h-7 text-[#8B1538]" strokeWidth={1.5} />
                                </div>
                                {/* Decorative corner */}
                                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#8B1538]/30" />
                              </div>

                              <div className="flex-1">
                                <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-[#8B1538] transition-colors">
                                  {category.name}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                                  {category.description}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-[#8B1538] font-medium">
                                  <span className="uppercase tracking-wider">Discover</span>
                                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                              </div>
                            </div>

                            {/* Decorative corner bottom */}
                            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#8B1538]/20 group-hover:border-[#8B1538]/40 transition-colors" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Contact */}
                <div className="mt-10 pt-8 border-t border-gray-200 text-center">
                  <div className="inline-block">
                    <p className="text-sm font-semibold text-[#8B1538] mb-1">+91 98937 79100</p>
                    <p className="text-xs text-gray-500 mb-1">1, Mahendra Business Square, Bawadia Kalan</p>
                    <p className="text-xs text-gray-400">www.cafeamante.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Selection Summary */}
        {selectedDesign && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-6 bg-white rounded-xl shadow-md border-2 border-[#8B1538]"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Selected: Design {selectedDesign}
            </h3>
            <p className="text-gray-600 mb-4">
              Ready to implement this as your menu landing page? This will be the first page guests see when scanning the QR code.
            </p>
            <div className="flex gap-3">
              <button
                className="px-6 py-2 rounded-full bg-[#8B1538] text-white font-semibold hover:bg-[#991B1B] transition-colors"
              >
                Apply This Design
              </button>
              <button
                onClick={() => setSelectedDesign(null)}
                className="px-6 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition-colors"
              >
                Clear Selection
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
