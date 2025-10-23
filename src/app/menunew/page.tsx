'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, X, ChevronDown, Phone, MapPin, Mail, Globe } from 'lucide-react';
import foodMenuData from '@/data/menus/food-enhanced.json';
import barMenuData from '@/data/menus/bar-enhanced.json';
import cafeMenuData from '@/data/menus/cafe-enhanced.json';

type Venue = 'food' | 'bar' | 'cafe';
type MenuItem = any; // Type from JSON

const VENUE_CONFIG = {
  food: {
    title: '🍽️ Food Menu',
    data: foodMenuData,
    cuisineFilters: [
      { id: 'all', label: 'All', icon: '🌍' },
      { id: 'indian', label: 'Indian', icon: '🇮🇳' },
      { id: 'asian', label: 'Asian', icon: '🌏' },
      { id: 'continental', label: 'Continental', icon: '🍝' },
    ],
  },
  bar: {
    title: '🍸 Bar Menu',
    data: barMenuData,
    cuisineFilters: [
      { id: 'all', label: 'All', icon: '🍹' },
      { id: 'cocktails', label: 'Cocktails', icon: '🍸' },
      { id: 'spirits', label: 'Spirits', icon: '🥃' },
      { id: 'wine', label: 'Wine', icon: '🍷' },
      { id: 'beer', label: 'Beer', icon: '🍺' },
      { id: 'mocktails', label: 'Mocktails', icon: '🥤' },
    ],
  },
  cafe: {
    title: '☕ Café Menu',
    data: cafeMenuData,
    cuisineFilters: [
      { id: 'all', label: 'All', icon: '☕' },
      { id: 'hot', label: 'Hot', icon: '🔥' },
      { id: 'cold', label: 'Cold', icon: '🧊' },
    ],
  },
};

const TAG_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  popular: { label: 'Most Popular', icon: '🌟', color: 'bg-yellow-100 text-yellow-800' },
  new: { label: 'New', icon: '🆕', color: 'bg-green-100 text-green-800' },
  spicy: { label: 'Spicy', icon: '🔥', color: 'bg-red-100 text-red-800' },
  mild: { label: 'Mild', icon: '👶', color: 'bg-blue-100 text-blue-800' },
  premium: { label: 'Premium', icon: '💎', color: 'bg-purple-100 text-purple-800' },
  signature: { label: 'Signature', icon: '✨', color: 'bg-pink-100 text-pink-800' },
};

export default function MenuNewPage() {
  const [activeVenue, setActiveVenue] = useState<Venue>('food');
  const [cuisineFilter, setCuisineFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showVegOnly, setShowVegOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const venueConfig = VENUE_CONFIG[activeVenue];
  const menuData = venueConfig.data;

  // Filter items based on all criteria
  const filteredCategories = useMemo(() => {
    return menuData.categories
      .map((category: any) => {
        const filteredItems = category.items.filter((item: MenuItem) => {
          // Search filter
          if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchesSearch =
              item.name.toLowerCase().includes(query) ||
              item.description?.toLowerCase().includes(query) ||
              item.localDescription?.toLowerCase().includes(query);
            if (!matchesSearch) return false;
          }

          // Veg filter
          if (showVegOnly && !item.dietary?.includes('veg')) {
            return false;
          }

          // Cuisine/type filter
          if (cuisineFilter !== 'all') {
            if (activeVenue === 'food') {
              if (item.cuisine !== cuisineFilter) return false;
            } else if (activeVenue === 'bar') {
              const drinkType = item.drinkType || item.tags?.find((t: string) =>
                ['cocktails', 'spirits', 'wine', 'beer', 'mocktails'].includes(t)
              );
              if (cuisineFilter === 'cocktails' && drinkType !== 'cocktails' && !item.tags?.includes('cocktails')) return false;
              if (cuisineFilter === 'spirits' && !item.tags?.includes('spirits')) return false;
              if (cuisineFilter === 'wine' && drinkType !== 'wine') return false;
              if (cuisineFilter === 'beer' && drinkType !== 'beer') return false;
              if (cuisineFilter === 'mocktails' && drinkType !== 'mocktails') return false;
            } else if (activeVenue === 'cafe') {
              if (cuisineFilter === 'hot' && item.temperature !== 'hot' && item.temperature !== 'both') return false;
              if (cuisineFilter === 'cold' && item.temperature !== 'cold' && item.temperature !== 'both' && !item.tags?.includes('iced')) return false;
            }
          }

          // Tag filters
          if (selectedTags.length > 0) {
            const itemTags = item.tags || [];
            const hasAllTags = selectedTags.every(tag => itemTags.includes(tag));
            if (!hasAllTags) return false;
          }

          return true;
        });

        return {
          ...category,
          items: filteredItems,
        };
      })
      .filter((category: any) => category.items.length > 0);
  }, [menuData, cuisineFilter, searchQuery, selectedTags, showVegOnly, activeVenue]);

  // Get unique tags from current venue
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    menuData.categories.forEach((category: any) => {
      category.items.forEach((item: MenuItem) => {
        item.tags?.forEach((tag: string) => tags.add(tag));
      });
    });
    return Array.from(tags).filter(tag => TAG_LABELS[tag]);
  }, [menuData]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setCuisineFilter('all');
    setSearchQuery('');
    setSelectedTags([]);
    setShowVegOnly(false);
  };

  const totalItems = filteredCategories.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#8B1538] text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              AMANTE
            </Link>
            <Link
              href="/menu"
              className="text-sm px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              Classic Menu →
            </Link>
          </div>
        </div>
      </header>

      {/* Venue Tabs */}
      <div className="bg-white border-b sticky top-[72px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide py-3">
            {(Object.keys(VENUE_CONFIG) as Venue[]).map((venue) => (
              <button
                key={venue}
                onClick={() => {
                  setActiveVenue(venue);
                  clearAllFilters();
                }}
                className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-all ${
                  activeVenue === venue
                    ? 'bg-[#8B1538] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {VENUE_CONFIG[venue].title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border-b sticky top-[144px] z-30 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${venueConfig.title.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1538] focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Cuisine/Type Filters */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4">
            {venueConfig.cuisineFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setCuisineFilter(filter.id)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
                  cuisineFilter === filter.id
                    ? 'bg-[#8B1538] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{filter.icon}</span>
                <span>{filter.label}</span>
              </button>
            ))}
          </div>

          {/* Quick Filters & Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            {activeVenue === 'food' && (
              <button
                onClick={() => setShowVegOnly(!showVegOnly)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  showVegOnly
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                💚 Veg Only
              </button>
            )}

            {availableTags.slice(0, 5).map((tag) => {
              const tagConfig = TAG_LABELS[tag];
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-[#8B1538] text-white'
                      : `${tagConfig.color} hover:opacity-80`
                  }`}
                >
                  <span>{tagConfig.icon}</span> {tagConfig.label}
                </button>
              );
            })}

            {(cuisineFilter !== 'all' || selectedTags.length > 0 || showVegOnly || searchQuery) && (
              <button
                onClick={clearAllFilters}
                className="ml-auto px-4 py-2 text-sm text-[#8B1538] hover:bg-red-50 rounded-lg transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Results Count */}
          {totalItems > 0 && (
            <div className="mt-3 text-sm text-gray-600">
              Showing <span className="font-semibold text-[#8B1538]">{totalItems}</span> items
            </div>
          )}
        </div>
      </div>

      {/* Menu Content */}
      <main className="container mx-auto px-4 py-8">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your filters or search query
            </p>
            <button
              onClick={clearAllFilters}
              className="px-6 py-3 bg-[#8B1538] text-white rounded-lg hover:bg-[#6d1029] transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          filteredCategories.map((category: any) => (
            <section key={category.id} className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-[#8B1538]"></div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                  {category.description && (
                    <p className="text-sm text-gray-600">{category.description}</p>
                  )}
                </div>
                <span className="ml-auto text-sm font-medium text-[#8B1538] bg-red-50 px-3 py-1 rounded-full">
                  {category.items.length} items
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item: MenuItem) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border border-gray-100"
                  >
                    {/* Item Header */}
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-bold text-gray-900 flex-1 pr-2">
                        {item.name}
                      </h3>
                      <div className="text-right">
                        <div className="text-xl font-bold text-[#8B1538]">
                          ₹{item.price}
                        </div>
                        {item.bottlePrice && (
                          <div className="text-xs text-gray-500">
                            Bottle: ₹{item.bottlePrice}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    {item.description && (
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    )}

                    {/* Local Description */}
                    {item.localDescription && (
                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-3 rounded">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">💡 </span>
                          {item.localDescription}
                        </p>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.dietary?.includes('veg') && (
                        <span className="inline-block w-5 h-5 border-2 border-green-600 rounded-sm flex items-center justify-center">
                          <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                        </span>
                      )}
                      {item.dietary?.includes('non-veg') && (
                        <span className="inline-block w-5 h-5 border-2 border-red-600 rounded-sm flex items-center justify-center">
                          <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                        </span>
                      )}
                      {item.isJainFriendly && (
                        <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded">
                          Jain
                        </span>
                      )}
                      {item.tags?.map((tag: string) => {
                        const tagConfig = TAG_LABELS[tag];
                        if (!tagConfig) return null;
                        return (
                          <span
                            key={tag}
                            className={`px-2 py-1 text-xs font-medium rounded ${tagConfig.color}`}
                          >
                            {tagConfig.icon} {tagConfig.label}
                          </span>
                        );
                      })}
                      {item.spiceLevel && item.spiceLevel > 0 && (
                        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">
                          {'🌶️'.repeat(Math.min(item.spiceLevel, 5))}
                        </span>
                      )}
                    </div>

                    {/* Additional Info */}
                    {(item.servingSize || item.allergens) && (
                      <div className="text-xs text-gray-500 border-t pt-3 mt-3">
                        {item.servingSize && <div>Serving: {item.servingSize}</div>}
                        {item.allergens && item.allergens.length > 0 && (
                          <div>Contains: {item.allergens.join(', ')}</div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">AMANTE</h3>
              <p className="text-gray-400">
                Experience culinary excellence in the heart of Bhopal
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#8B1538]" />
                <a
                  href="tel:+919893779100"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  +91 98937 79100
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#8B1538]" />
                <span className="text-gray-300">Bhopal, Madhya Pradesh</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#8B1538]" />
                <a
                  href="mailto:hello@amante.in"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  hello@amante.in
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-[#8B1538]" />
                <a
                  href="https://amante.in"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  amante.in
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Amante. All rights reserved.</p>
            <p className="mt-2">
              Powered by{' '}
              <a
                href="https://restronaut.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B1538] hover:text-[#a81943] transition-colors"
              >
                Restronaut
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
