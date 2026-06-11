'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Leaf, Coffee, Wine, Sparkles, Sunrise, Flower2 } from 'lucide-react';

const categories = [
  {
    id: 'breakfast',
    name: 'Breakfast Menu',
    icon: Sunrise,
    description: 'Morning specials — available 7 AM to 12 PM',
    href: '/amantesatvik/breakfast',
  },
  {
    id: 'satvik',
    name: 'Satvik Food Menu',
    icon: Leaf,
    description: 'Pure vegetarian satvik delicacies — including Rajwadi Rasoi & thalis',
    href: '/amantesatvik/satvik',
  },
  {
    id: 'jain',
    name: 'Satvik Jain Menu',
    icon: Flower2,
    description: 'No onion, garlic or root vegetables — sabzis, thalis & more',
    href: '/amantesatvik/jain',
  },
  {
    id: 'cafe',
    name: 'Café & Bakery Menu',
    icon: Coffee,
    description: 'Artisan coffee & fresh-baked delights',
    href: '/amantesatvik/cafe',
  },
  {
    id: 'bar',
    name: 'Bar Menu',
    icon: Wine,
    description: 'Craft cocktails & premium spirits',
    href: '/amantesatvik/bar',
  },
];

export default function SatvikMenuLanding() {
  const [greeting, setGreeting] = useState('');

  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Afternoon';
    if (hour >= 17 && hour < 21) return 'Good Evening';
    return 'Good Night';
  };

  useEffect(() => {
    setGreeting(getGreeting());
    const interval = setInterval(() => setGreeting(getGreeting()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF8F1]">
      {/* Spacer for HeaderGlobal */}
      <div className="h-20 md:h-24" />

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-4 sm:mx-auto my-8">
        {/* Elegant Header */}
        <div className="relative bg-gradient-to-br from-[#2F5233] to-[#233D26] p-6 sm:p-8 md:p-10 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }} />
          </div>
          <div className="relative">
            {/* Top Corner Labels */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-[10px] sm:text-xs text-[#C9A227] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium">Satvik · Jain</div>
              <div className="text-[10px] sm:text-xs text-white/80 uppercase tracking-[0.2em] sm:tracking-[0.3em]">Pure Vegetarian</div>
            </div>

            {/* Main Title */}
            <div className="text-center">
              {greeting && (
                <p className="text-white/80 text-sm sm:text-base mb-2 font-light tracking-wide">
                  {greeting}
                </p>
              )}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tight leading-tight">
                Satvik<br/>by Amante
              </h1>
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="h-px w-16 bg-[#C9A227]/50" />
                <span className="text-xs text-[#C9A227] italic flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Shuddh, soulful &amp; satvik
                </span>
                <div className="h-px w-16 bg-[#C9A227]/50" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 md:p-8">
          {/* Pure Veg banner */}
          <div className="mb-6 bg-gradient-to-r from-[#2F5233] to-[#233D26] rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center">
                <Leaf className="w-5 h-5 text-[#C9A227]" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">100% Pure Vegetarian Kitchen</p>
                <p className="text-white/70 text-xs">Dedicated Jain &amp; Satvik options — no onion, garlic or root vegetables</p>
              </div>
            </div>
          </div>

          <div className="max-w-sm sm:max-w-md lg:max-w-lg mx-auto space-y-4 sm:space-y-6">
            {categories.map((category, index) => {
              const Icon = category.icon;
              return (
                <Link key={category.id} href={category.href}>
                  <div className="group cursor-pointer">
                    <div className="relative">
                      {/* Decorative number */}
                      <div className="hidden lg:block absolute -left-12 top-0 text-7xl font-serif font-bold text-gray-100 group-hover:text-[#2F5233]/40 transition-colors">
                        {index + 1}
                      </div>

                      <div className="relative bg-gradient-to-br from-[#FCFAF4] to-white rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-100 group-hover:border-[#2F5233]/30 group-hover:shadow-xl transition-all duration-300">
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className="relative">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-[#2F5233]/10 to-[#233D26]/10 group-hover:from-[#2F5233]/20 group-hover:to-[#233D26]/20 transition-all">
                              <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[#2F5233]" strokeWidth={1.5} />
                            </div>
                            {/* Decorative corner */}
                            <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-[#C9A227]/50" />
                          </div>

                          <div className="flex-1">
                            <h3 className="text-lg sm:text-xl font-serif font-bold text-gray-900 group-hover:text-[#2F5233] transition-colors mb-2">
                              {category.name}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3">
                              {category.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs text-[#2F5233] font-medium">
                              <span className="uppercase tracking-wider">Discover</span>
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>

                        {/* Decorative corner bottom */}
                        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#C9A227]/30 group-hover:border-[#C9A227]/60 transition-colors" />
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
              <p className="text-sm font-semibold text-[#2F5233] mb-1">
                <a href="tel:+919893779100" className="hover:opacity-80 transition-opacity">
                  +91 98937 79100
                </a>
              </p>
              <p className="text-xs text-gray-500 mb-1">1, Mahendra Business Square, Bawadia Kalan, Bhopal</p>
              <p className="text-xs text-gray-500">
                <a href="mailto:contact.cafeamante@gmail.com" className="hover:text-[#2F5233] transition-colors">
                  contact.cafeamante@gmail.com
                </a>
                {' • '}
                <a href="https://www.cafeamante.com" className="hover:text-[#2F5233] transition-colors">
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
          className="text-xs sm:text-sm text-gray-400 hover:text-[#2F5233] transition-colors duration-300"
        >
          Powered by <span className="font-bold">Restronaut</span>
        </a>
      </div>
    </div>
  );
}
