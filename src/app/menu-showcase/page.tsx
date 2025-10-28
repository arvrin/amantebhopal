'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Circle, Volume2 } from 'lucide-react';

// Sample menu item data
const sampleItem = {
  id: '1',
  name: 'Yasai Yakitori',
  description: 'Zucchini, broccoli, bell pepper, tofu, spring onion, yakitori sauce - Japanese vegetable skewers',
  price: 549,
  category: 'Appetizers & Starters',
  dietary: ['veg'],
  spiceLevel: 0,
  isRecommended: false,
  isChefSpecial: false
};

const DietaryIcon = ({ dietary }: { dietary?: string[] }) => {
  if (!dietary) return null;
  const isVeg = dietary.includes('veg') && !dietary.includes('non-veg');
  const isNonVeg = dietary.includes('non-veg');

  if (isVeg) {
    return (
      <div className="w-5 h-5 border-2 border-green-600 rounded flex items-center justify-center">
        <Circle className="w-2.5 h-2.5 fill-green-600 text-green-600" />
      </div>
    );
  }
  if (isNonVeg) {
    return (
      <div className="w-5 h-5 border-2 border-red-600 rounded flex items-center justify-center">
        <Circle className="w-2.5 h-2.5 fill-red-600 text-red-600" />
      </div>
    );
  }
  return null;
};

export default function MenuShowcase() {
  const [selectedDesign, setSelectedDesign] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F0] to-[#FFF0F5] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/menu/food">
            <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-4">
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Menu</span>
            </button>
          </Link>
          <h1 className="text-3xl font-serif font-bold text-[#8B1538] mb-2">
            Menu Card Design Showcase
          </h1>
          <p className="text-gray-600">
            Compare different design variations for menu item cards
          </p>
        </div>

        {/* Design Grid */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Design 1: Luxury Restaurant Style */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Design 1: Luxury</h2>
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
            <div className="relative bg-gradient-to-br from-white via-[#FFF9F5] to-white rounded-2xl p-6 shadow-xl border border-[#8B1538]/10 hover:shadow-2xl transition-all duration-500 overflow-hidden group">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#8B1538]/5 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#8B1538]/5 to-transparent rounded-tr-full" />

              <div className="relative">
                {/* Header Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="relative">
                        <DietaryIcon dietary={sampleItem.dietary} />
                        <div className="absolute -inset-1 bg-green-600/20 rounded-full blur-sm -z-10" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-gray-900 tracking-tight">
                        {sampleItem.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                        {sampleItem.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <button className="group/btn flex items-center gap-1.5 text-[#8B1538] hover:text-[#6B0F28] transition-colors">
                        <Volume2 className="w-4 h-4" />
                        <span className="text-xs font-medium">Listen</span>
                      </button>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="inline-flex flex-col items-end bg-gradient-to-br from-[#8B1538] to-[#6B0F28] px-5 py-3 rounded-xl shadow-lg shadow-[#8B1538]/20">
                      <span className="text-xs text-white/80 uppercase tracking-wider font-medium">Price</span>
                      <span className="text-2xl font-bold text-white">₹{sampleItem.price}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="relative pl-8 border-l-2 border-[#8B1538]/20">
                  <p className="text-sm text-gray-600 leading-relaxed italic">
                    {sampleItem.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Design 2: Michelin Star Minimalist */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Design 2: Michelin</h2>
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
            <div className="bg-black text-white rounded-3xl p-8 shadow-2xl hover:scale-[1.02] transition-transform duration-500 relative overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B1538]/10 via-transparent to-[#8B1538]/5" />

              <div className="relative">
                {/* Top Section */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/30">
                      <Circle className="w-3 h-3 fill-white text-white" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold mb-1 tracking-wide">
                        {sampleItem.name}
                      </h3>
                      <p className="text-xs text-gray-400 uppercase tracking-[0.2em]">
                        {sampleItem.category}
                      </p>
                    </div>
                  </div>
                  <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all">
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-300 leading-relaxed mb-6 font-light">
                  {sampleItem.description}
                </p>

                {/* Price Bar */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-xs text-gray-500 uppercase tracking-widest">Total</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-[#F8BBD9] via-white to-[#F8BBD9] bg-clip-text text-transparent">
                    ₹{sampleItem.price}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Design 3: Elegant Magazine Layout */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Design 3: Magazine</h2>
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
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500">
              {/* Color accent bar */}
              <div className="h-1.5 bg-gradient-to-r from-[#8B1538] via-[#B91C1C] to-[#8B1538]" />

              <div className="p-6">
                {/* Header with number */}
                <div className="flex gap-6 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8B1538] to-[#DC2626] flex items-center justify-center shadow-lg shadow-[#8B1538]/30">
                      <DietaryIcon dietary={sampleItem.dietary} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-1 leading-tight">
                      {sampleItem.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-wider">
                      <span>{sampleItem.category}</span>
                      <button className="ml-2 flex items-center gap-1 text-[#8B1538] hover:text-[#DC2626] transition-colors">
                        <Volume2 className="w-3.5 h-3.5" />
                        <span className="font-medium">Play</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {sampleItem.description}
                </p>

                {/* Price footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Price Point</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-gray-500">₹</span>
                    <span className="text-3xl font-bold text-[#8B1538]">{sampleItem.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Design 4: Premium Card with Hover */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Design 4: Premium</h2>
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
            <div className="group relative">
              {/* Glow effect on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8B1538] to-[#DC2626] rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500" />

              <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                {/* Decorative element */}
                <div className="absolute -top-3 -right-3 w-20 h-20 bg-gradient-to-br from-[#F8BBD9] to-[#8B1538] rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity" />

                <div className="relative">
                  {/* Title row */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative pt-1">
                      <DietaryIcon dietary={sampleItem.dietary} />
                      {/* Animated ring */}
                      <div className="absolute inset-0 rounded-full border-2 border-green-600 animate-ping opacity-20" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif text-xl font-bold text-gray-900 mb-1 group-hover:text-[#8B1538] transition-colors">
                        {sampleItem.name}
                      </h3>
                      <p className="text-xs text-gray-500 uppercase tracking-[0.15em] font-medium">
                        {sampleItem.category}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-2xl font-bold bg-gradient-to-r from-[#8B1538] to-[#DC2626] bg-clip-text text-transparent">
                        ₹{sampleItem.price}
                      </span>
                      <button className="p-2 rounded-full bg-[#8B1538]/5 hover:bg-[#8B1538]/10 transition-colors">
                        <Volume2 className="w-4 h-4 text-[#8B1538]" />
                      </button>
                    </div>
                  </div>

                  {/* Description with gradient fade */}
                  <div className="relative">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {sampleItem.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Design 5: Artistic Asymmetric */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Design 5: Artistic</h2>
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
            <div className="relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
              {/* Artistic background shapes */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#8B1538]/10 to-transparent rounded-full -translate-y-10 translate-x-10" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#F8BBD9]/20 to-transparent rounded-full translate-y-10 -translate-x-10" />

              <div className="relative">
                {/* Asymmetric header */}
                <div className="mb-5">
                  <div className="flex items-center gap-3 mb-3">
                    <DietaryIcon dietary={sampleItem.dietary} />
                    <div className="h-px flex-1 bg-gradient-to-r from-gray-300 to-transparent" />
                    <button className="p-2.5 rounded-xl bg-gradient-to-br from-[#8B1538] to-[#DC2626] hover:shadow-lg hover:shadow-[#8B1538]/30 transition-all">
                      <Volume2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2 leading-tight">
                    {sampleItem.name}
                  </h3>
                  <p className="text-xs text-[#8B1538] uppercase tracking-[0.2em] font-semibold">
                    {sampleItem.category}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-5 pl-4 border-l-2 border-[#8B1538]/30">
                  {sampleItem.description}
                </p>

                {/* Price tag */}
                <div className="flex justify-end">
                  <div className="inline-flex items-baseline gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#8B1538] to-[#DC2626] shadow-lg shadow-[#8B1538]/25">
                    <span className="text-sm text-white/90 font-medium">from</span>
                    <span className="text-2xl font-bold text-white">₹{sampleItem.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Design 6: Ultra Modern Gradient */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Design 6: Modern</h2>
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
            <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 group">
              {/* Gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2d1a1f] to-[#1a1a1a]" />

              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B1538]/20 via-transparent to-[#DC2626]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-7">
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/50">
                      <Circle className="w-3.5 h-3.5 fill-white text-white" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-bold text-white mb-0.5">
                        {sampleItem.name}
                      </h3>
                      <p className="text-xs text-gray-400 uppercase tracking-[0.15em]">
                        {sampleItem.category}
                      </p>
                    </div>
                  </div>
                  <button className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 transition-all">
                    <Volume2 className="w-4 h-4 text-white" />
                  </button>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-300 leading-relaxed mb-5 font-light">
                  {sampleItem.description}
                </p>

                {/* Price section */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10">
                  <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">Price</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm text-[#F8BBD9]">₹</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-[#F8BBD9] to-white bg-clip-text text-transparent">
                      {sampleItem.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Design 7: Classic Fine Dining */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Design 7: Classic</h2>
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
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-100">
              {/* Ornamental top border */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#8B1538]/30 to-[#8B1538]/30" />
                <DietaryIcon dietary={sampleItem.dietary} />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#8B1538]/30 to-[#8B1538]/30" />
              </div>

              {/* Title */}
              <h3 className="font-serif text-3xl font-bold text-center text-gray-900 mb-2 tracking-tight">
                {sampleItem.name}
              </h3>

              {/* Category */}
              <p className="text-center text-xs text-[#8B1538] uppercase tracking-[0.25em] font-semibold mb-4">
                {sampleItem.category}
              </p>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed text-center mb-6 px-4">
                {sampleItem.description}
              </p>

              {/* Price and action */}
              <div className="flex items-center justify-center gap-6">
                <button className="p-3 rounded-full border-2 border-[#8B1538]/20 hover:border-[#8B1538] hover:bg-[#8B1538]/5 transition-all">
                  <Volume2 className="w-5 h-5 text-[#8B1538]" />
                </button>
                <div className="relative px-8 py-3 rounded-full bg-gradient-to-r from-[#8B1538] to-[#DC2626]">
                  <span className="text-2xl font-bold text-white">₹{sampleItem.price}</span>
                </div>
              </div>

              {/* Ornamental bottom border */}
              <div className="h-px mt-6 bg-gradient-to-r from-transparent via-[#8B1538]/20 to-transparent" />
            </div>
          </div>

          {/* Design 8: Contemporary Boutique */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Design 8: Boutique</h2>
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
            <div className="relative group">
              {/* Card content */}
              <div className="relative bg-gradient-to-br from-white via-[#FFF9F9] to-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                {/* Top bar with icon and audio */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-xl rotate-6" />
                      <div className="relative w-full h-full bg-white rounded-xl flex items-center justify-center shadow-md">
                        <Circle className="w-3 h-3 fill-green-600 text-green-600" />
                      </div>
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">
                      {sampleItem.category}
                    </span>
                  </div>
                  <button className="relative p-3 rounded-xl bg-gradient-to-br from-[#8B1538] to-[#DC2626] hover:scale-110 transition-transform shadow-lg shadow-[#8B1538]/30">
                    <Volume2 className="w-4 h-4 text-white" />
                    <div className="absolute inset-0 rounded-xl bg-white animate-ping opacity-20" />
                  </button>
                </div>

                {/* Main content */}
                <div className="mb-4">
                  <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3 leading-tight">
                    {sampleItem.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {sampleItem.description}
                  </p>
                </div>

                {/* Price bar */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#8B1538]" />
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                      Best Value
                    </span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg text-gray-400">₹</span>
                    <span className="text-3xl font-bold text-[#8B1538]">{sampleItem.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Selection Summary */}
        {selectedDesign && (
          <div className="mt-8 p-6 bg-white rounded-xl shadow-md border-2 border-[#8B1538]">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Selected: Design {selectedDesign}
            </h3>
            <p className="text-gray-600 mb-4">
              Ready to apply this design to your menu? Let me know and I'll implement it.
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
          </div>
        )}
      </div>
    </div>
  );
}
