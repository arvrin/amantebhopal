'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Search, X, Leaf, Drumstick, Circle } from 'lucide-react';
import { use } from 'react';

// Import menu data
import foodMenu from '@/data/menus/food.json';
import barMenu from '@/data/menus/bar.json';
import cafeMenu from '@/data/menus/cafe.json';

const menus = {
  food: foodMenu,
  bar: barMenu,
  cafe: cafeMenu
};

const categoryColors = {
  food: '#8B1538',
  bar: '#7C3AED',
  cafe: '#059669'
};

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  dietary?: string[];
  spiceLevel?: number;
  isRecommended?: boolean;
  isChefSpecial?: boolean;
  isNew?: boolean;
  isAvailable?: boolean;
  allergens?: string[];
}

interface MenuCategory {
  id: string;
  name: string;
  description: string;
  displayOrder?: number;
  items: MenuItem[];
}

interface Menu {
  venue: string;
  name: string;
  description: string;
  tagline?: string;
  categories: MenuCategory[];
}

export default function MenuPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = use(params);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showVegOnly, setShowVegOnly] = useState(false);

  const menu = menus[resolvedParams.category as keyof typeof menus] as Menu;
  const themeColor = categoryColors[resolvedParams.category as keyof typeof categoryColors];

  // Flatten all items and filter
  const allItems = useMemo(() => {
    return menu.categories.flatMap(cat =>
      cat.items.map(item => ({ ...item, categoryName: cat.name }))
    );
  }, [menu]);

  const filteredItems = useMemo(() => {
    let items = allItems;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        item =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory) {
      items = items.filter(item => item.categoryName === selectedCategory);
    }

    // Veg only filter
    if (showVegOnly) {
      items = items.filter(item => item.dietary?.includes('veg'));
    }

    return items;
  }, [allItems, searchQuery, selectedCategory, showVegOnly]);

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

  return (
    <div className="min-h-screen bg-[#FFF5F0]">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          {/* Logo */}
          <div className="flex justify-center mb-3">
            <Link href="/menu">
              <Image
                src="/assets/logos/Primary Logo/PNG/Red Logo.png"
                alt="Amante"
                width={400}
                height={120}
                className="h-20 md:h-24 w-auto cursor-pointer hover:opacity-80 transition-opacity"
              />
            </Link>
          </div>

          <div className="flex items-center justify-between mb-4">
            <Link href="/menu">
              <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                <ArrowLeft size={20} />
                <span className="font-medium">Back</span>
              </button>
            </Link>
            <div className="text-center flex-1">
              <h1
                className="text-xl font-serif font-bold"
                style={{ color: themeColor }}
              >
                {menu.name}
              </h1>
              <p className="text-xs text-gray-600 mt-1">{menu.description}</p>
            </div>
            <div className="w-16"></div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
            <button
              onClick={() => setShowVegOnly(!showVegOnly)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                showVegOnly
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Leaf size={16} />
                Veg Only
              </span>
            </button>
            {menu.categories.map(cat => (
              <button
                key={cat.id}
                onClick={() =>
                  setSelectedCategory(selectedCategory === cat.name ? null : cat.name)
                }
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.name
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor:
                    selectedCategory === cat.name ? themeColor : undefined
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="container mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">No items found</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                  setShowVegOnly(false);
                }}
                className="mt-4 text-sm underline"
                style={{ color: themeColor }}
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <div className="flex items-start gap-2 mb-2">
                        <DietaryIcon dietary={item.dietary} />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 leading-tight">
                            {item.name}
                            {item.isRecommended && (
                              <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                                Recommended
                              </span>
                            )}
                            {item.isChefSpecial && (
                              <span
                                className="ml-2 text-xs text-white px-2 py-0.5 rounded-full"
                                style={{ backgroundColor: themeColor }}
                              >
                                Chef's Special
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                            {item.description}
                          </p>
                          {item.spiceLevel && item.spiceLevel > 0 && (
                            <div className="flex items-center gap-1 mt-2">
                              {Array.from({ length: item.spiceLevel }).map((_, i) => (
                                <span key={i} className="text-red-500">
                                  🌶️
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p
                        className="text-lg font-bold"
                        style={{ color: themeColor }}
                      >
                        ₹{item.price}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.categoryName}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="text-center py-8 text-gray-500 text-sm border-t border-gray-200 mt-8">
        <p className="mb-2">All prices are inclusive of taxes</p>
        <p>♦ AMANTE ♦</p>
      </div>
    </div>
  );
}
