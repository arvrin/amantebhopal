'use client';

import Link from 'next/link';
import { ChevronRight, UtensilsCrossed, Wine, Coffee } from 'lucide-react';

const categories = [
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
    name: 'Café Menu',
    icon: Coffee,
    description: 'Artisan coffee & fresh delights',
    href: '/menu/cafe',
  }
];

export default function MenuLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Spacer for HeaderGlobal */}
      <div className="h-20 md:h-24" />

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto my-8">
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
                <Link key={category.id} href={category.href}>
                  <div className="group cursor-pointer">
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
                </Link>
              );
            })}
          </div>

          {/* Footer Contact */}
          <div className="mt-10 pt-8 border-t border-gray-200 text-center">
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
          className="text-[10px] sm:text-xs text-gray-400 hover:text-[#8B1538] transition-colors duration-300"
        >
          Powered by <span className="font-bold">Restronaut</span>
        </a>
      </div>
    </div>
  );
}
