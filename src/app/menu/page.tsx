'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, UtensilsCrossed, Wine, Coffee } from 'lucide-react';

const categories = [
  {
    id: 'food',
    name: 'Food Menu',
    icon: UtensilsCrossed,
    description: 'Chowing down on the good stuff from the world',
    href: '/menu/food',
    color: '#8B1538',
    gradient: 'from-[#8B1538]/10 to-[#FFF0F5]'
  },
  {
    id: 'bar',
    name: 'Bar Menu',
    icon: Wine,
    description: 'Craft cocktails & premium spirits',
    href: '/menu/bar',
    color: '#8B1538',
    gradient: 'from-[#8B1538]/10 to-[#FFF0F5]'
  },
  {
    id: 'cafe',
    name: 'Café Menu',
    icon: Coffee,
    description: 'Artisan coffee & fresh delights',
    href: '/menu/cafe',
    color: '#8B1538',
    gradient: 'from-[#8B1538]/10 to-[#FFF0F5]'
  }
];

export default function MenuLanding() {
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-[#FFF5F0] via-white to-[#FFF0F5] flex items-center">
      {/* Header */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          {/* Logo */}
          <div className="mb-4">
            <div className="flex justify-center">
              <Link href="/">
                <Image
                  src="/assets/logos/Primary Logo/PNG/Red Logo.png"
                  alt="Amante"
                  width={1600}
                  height={480}
                  className="h-80 md:h-96 w-auto cursor-pointer hover:opacity-80 transition-opacity"
                  priority
                />
              </Link>
            </div>
            <div className="flex items-center justify-center gap-3 mt-2">
              <div className="w-20 h-px bg-gradient-to-r from-transparent to-[#8B1538]/40"></div>
              <span className="text-[#8B1538] text-3xl">♦</span>
              <div className="w-20 h-px bg-gradient-to-l from-transparent to-[#8B1538]/40"></div>
            </div>
          </div>

          <h2 className="font-serif text-2xl md:text-3xl text-[#8B1538] mb-2 tracking-wide">
            Explore Our Menus
          </h2>
          <p className="text-gray-600 text-base max-w-md mx-auto italic">
            A celebration of passion on a plate
          </p>
        </motion.div>

        {/* Menu Category Cards */}
        <div className="grid gap-4 max-w-2xl mx-auto">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <Link href={category.href}>
                  <div
                    className={`bg-gradient-to-br ${category.gradient} rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 active:scale-[0.98]`}
                    style={{ borderColor: `${category.color}20` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div
                          className="w-16 h-16 rounded-xl flex items-center justify-center shadow-md"
                          style={{ backgroundColor: `${category.color}20` }}
                        >
                          <Icon
                            className="w-8 h-8"
                            style={{ color: category.color }}
                            strokeWidth={1.8}
                          />
                        </div>
                        <div className="text-left flex-1">
                          <h3
                            className="text-2xl font-serif font-bold mb-1 tracking-wide"
                            style={{ color: category.color }}
                          >
                            {category.name}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        className="flex-shrink-0 ml-2"
                        style={{ color: category.color }}
                        size={28}
                        strokeWidth={2}
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#8B1538]/30"></div>
            <span className="text-[#8B1538] text-lg">♦</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#8B1538]/30"></div>
          </div>
          <p className="text-gray-600 text-xs mb-1">1, Mahendra Business Square, MP Nagar, Bhopal</p>
          <p className="text-gray-500 text-xs">
            <a href="mailto:contact.cafeamante@gmail.com" className="hover:text-[#8B1538] transition-colors">
              contact.cafeamante@gmail.com
            </a>
            {' • '}
            <a href="https://www.cafeamante.com" className="hover:text-[#8B1538] transition-colors">
              www.cafeamante.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
