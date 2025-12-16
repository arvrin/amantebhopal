'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, UtensilsCrossed, Wine, Coffee, Sunrise } from 'lucide-react';

const baseCategories = [
  {
    id: 'food',
    name: 'Food Menu',
    icon: UtensilsCrossed,
    description: 'Chowing down on the good stuff from the world',
    href: '/menu/food',
  },
  {
    id: 'bar',
    name: 'Bar Menu',
    icon: Wine,
    description: 'Craft cocktails & premium spirits',
    href: '/menu/bar',
  },
  {
    id: 'cafe',
    name: 'Café & Bakery Menu',
    icon: Coffee,
    description: 'Artisan coffee & fresh delights',
    href: '/menu/cafe',
  },
  {
    id: 'breakfast',
    name: 'Breakfast Menu',
    icon: Sunrise,
    description: 'Start your day with delicious morning delights',
    href: '/menu/breakfast',
  }
];

export default function MenuLanding() {
  const [categories, setCategories] = useState(baseCategories);
  const [isBreakfastTime, setIsBreakfastTime] = useState(false);
  const [greeting, setGreeting] = useState('');

  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Afternoon';
    if (hour >= 17 && hour < 21) return 'Good Evening';
    return 'Good Night';
  };

  const checkBreakfastTime = (): boolean => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTimeMinutes = hours * 60 + minutes;
    // 7:30 AM (450 min) to 12:00 PM (720 min)
    return currentTimeMinutes >= 450 && currentTimeMinutes < 720;
  };

  const updateCategories = () => {
    const breakfastActive = checkBreakfastTime();
    setIsBreakfastTime(breakfastActive);
    setGreeting(getGreeting());

    if (breakfastActive) {
      // Move breakfast to top
      const reordered = [
        baseCategories.find(c => c.id === 'breakfast')!,
        ...baseCategories.filter(c => c.id !== 'breakfast')
      ];
      setCategories(reordered);
    } else {
      setCategories(baseCategories);
    }
  };

  useEffect(() => {
    updateCategories();

    // Update every minute
    const interval = setInterval(() => {
      updateCategories();
    }, 60000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="min-h-screen bg-white">
      {/* Spacer for HeaderGlobal */}
      <div className="h-20 md:h-24" />

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-4 sm:mx-auto my-8">
        {/* Elegant Header */}
        <div className="relative bg-gradient-to-br from-[#8B1538] to-[#6B0F28] p-6 sm:p-8 md:p-10 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }} />
          </div>
          <div className="relative">
            {/* Top Corner Labels */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-[10px] sm:text-xs text-white/80 uppercase tracking-[0.2em] sm:tracking-[0.3em]">Menu 2025</div>
              <div className="text-[10px] sm:text-xs text-white/80 uppercase tracking-[0.2em] sm:tracking-[0.3em]">Curated Selection</div>
            </div>

            {/* Main Title */}
            <div className="text-center">
              {greeting && (
                <p className="text-white/80 text-sm sm:text-base mb-2 font-light tracking-wide">
                  {greeting}
                </p>
              )}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tight leading-tight">
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
        <div className="p-4 sm:p-6 md:p-8">

          {/* Now Serving Breakfast Banner */}
          {isBreakfastTime && (
            <div className="mb-6 bg-gradient-to-r from-[#8B1538] to-[#6B0F28] rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Sunrise className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">Now Serving Breakfast</p>
                    <p className="text-white/70 text-xs">Available until 12:00 PM</p>
                  </div>
                </div>
                <Link href="/menu/breakfast">
                  <button className="bg-white text-[#8B1538] px-4 py-2 rounded-lg text-xs font-bold hover:bg-white/90 transition-colors">
                    View
                  </button>
                </Link>
              </div>
            </div>
          )}

          <div className="max-w-sm sm:max-w-md lg:max-w-lg mx-auto space-y-4 sm:space-y-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              const isBreakfastCard = category.id === 'breakfast' && isBreakfastTime;

              return (
                <Link key={category.id} href={category.href}>
                  <div className="group cursor-pointer">
                    <div className="relative">
                      {/* Decorative number */}
                      <div className="hidden lg:block absolute -left-12 top-0 text-7xl font-serif font-bold text-gray-100 group-hover:text-[#8B1538]/40 transition-colors">
                        {index + 1}
                      </div>

                      <div className={`relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 sm:p-5 md:p-6 border transition-all duration-300 ${
                        isBreakfastCard
                          ? 'border-[#8B1538] shadow-lg ring-1 ring-[#8B1538]/20'
                          : 'border-gray-100 group-hover:border-[#8B1538]/30 group-hover:shadow-xl'
                      }`}>
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className="relative">
                            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all ${
                              isBreakfastCard
                                ? 'bg-[#8B1538]'
                                : 'bg-gradient-to-br from-[#8B1538]/10 to-[#6B0F28]/10 group-hover:from-[#8B1538]/20 group-hover:to-[#6B0F28]/20'
                            }`}>
                              <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${isBreakfastCard ? 'text-white' : 'text-[#8B1538]'}`} strokeWidth={1.5} />
                            </div>
                            {/* Decorative corner */}
                            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#8B1538]/30" />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 group-hover:text-[#8B1538] transition-colors">
                                {category.name}
                              </h3>
                              {isBreakfastCard && (
                                <span className="px-2 py-0.5 bg-[#8B1538] text-white text-[10px] font-bold uppercase tracking-wide rounded-full animate-pulse">
                                  Live
                                </span>
                              )}
                            </div>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
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
                </Link>
              );
            })}
          </div>

          {/* Footer Contact */}
          <div className="mt-6 sm:mt-8 md:mt-10 pt-6 sm:pt-8 border-t border-gray-200 text-center">
            <div className="inline-block">
              <p className="text-sm font-semibold text-[#8B1538] mb-1">
                <a href="tel:+919893779100" className="hover:opacity-80 transition-opacity">
                  +91 98937 79100
                </a>
              </p>
              <p className="text-xs text-gray-500 mb-1">1, Mahendra Business Square, Bawadia Kalan, Bhopal</p>
              <p className="text-xs text-gray-500">
                <a href="mailto:contact.cafeamante@gmail.com" className="hover:text-[#8B1538] transition-colors">
                  contact.cafeamante@gmail.com
                </a>
                {' • '}
                <a href="https://www.cafeamante.com" className="hover:text-[#8B1538] transition-colors">
                  www.cafeamante.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Powered by Restronaut */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-10">
        <a
          href="https://restronaut.in"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs sm:text-sm text-gray-400 hover:text-[#8B1538] transition-colors duration-300"
        >
          Powered by <span className="font-bold">Restronaut</span>
        </a>
      </div>
    </div>
  );
}
