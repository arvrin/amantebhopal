'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Search, X, Circle, Volume2, Sparkles, PartyPopper, MessageCircle } from 'lucide-react';

// Import NYE menu data
import nyeMenu from '@/data/menus/nye.json';

// Scrollbar hide styles
const scrollbarHideStyles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

const themeColor = '#8B1538';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  dietary?: string[];
  spiceLevel?: number | null;
  isAvailable?: boolean;
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

const menu = nyeMenu as Menu;

export default function NYEMenuPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [speakingItemId, setSpeakingItemId] = useState<string | null>(null);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const whatsappLink = `https://wa.me/919770650078?text=${encodeURIComponent("Hi! I'd like to book for the New Year's Eve 2026 celebration at Amante.")}`;

  // Track navbar visibility based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setNavbarVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavbarVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Text-to-speech function
  const speakItem = (item: MenuItem) => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      if (speakingItemId === item.id) {
        setSpeakingItemId(null);
        return;
      }
    }

    setSpeakingItemId(item.id);
    const utterance = new SpeechSynthesisUtterance(item.name);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice =>
      (voice.name.includes('Veena') ||
       voice.name.includes('Indian') && voice.name.includes('Female') ||
       voice.lang === 'en-IN' && voice.name.toLowerCase().includes('female')) ||
      (voice.lang === 'en-GB' && voice.name.toLowerCase().includes('female'))
    ) || voices.find(voice =>
      voice.lang.startsWith('en') && voice.name.toLowerCase().includes('female')
    );

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.rate = 0.85;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    utterance.onend = () => setSpeakingItemId(null);
    utterance.onerror = () => setSpeakingItemId(null);

    window.speechSynthesis.speak(utterance);
  };

  // Flatten all items and filter
  const allItems = useMemo(() => {
    return menu.categories.flatMap(cat =>
      cat.items.map(item => ({ ...item, categoryName: cat.name }))
    );
  }, []);

  const filteredItems = useMemo(() => {
    let items = allItems;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        item =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      items = items.filter(item => item.categoryName === selectedCategory);
    }

    if (dietFilter === 'veg') {
      items = items.filter(item => item.dietary?.includes('veg') && !item.dietary?.includes('non-veg'));
    } else if (dietFilter === 'non-veg') {
      items = items.filter(item => item.dietary?.includes('non-veg'));
    }

    return items;
  }, [allItems, searchQuery, selectedCategory, dietFilter]);

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
      {/* Inject scrollbar hide styles */}
      <style jsx global>{scrollbarHideStyles}</style>

      {/* Spacer for HeaderGlobal */}
      <div className="h-20 md:h-24" />

      {/* Header */}
      <div
        className={`sticky z-20 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm transition-all duration-300 ease-in-out ${
          navbarVisible ? 'top-20 md:top-24' : 'top-0'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4">
          {/* NYE Banner */}
          <div className="mb-4 bg-gradient-to-r from-[#8B1538] to-[#6B0F28] rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <PartyPopper className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">New Year Special Menu</p>
                  <p className="text-white/70 text-xs">31st Dec 2025 & 1st Jan 2026</p>
                </div>
              </div>
              <Link href="/events">
                <button className="bg-white text-[#8B1538] px-4 py-2 rounded-lg text-xs font-bold hover:bg-white/90 transition-colors">
                  NYE Event
                </button>
              </Link>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-4">
            <h1
              className="text-xl sm:text-2xl md:text-3xl font-serif font-bold"
              style={{ color: themeColor }}
            >
              {menu.name}
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">{menu.description}</p>
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
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#8B1538] focus:ring-opacity-50 bg-white"
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
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            {/* Diet Toggle */}
            <div className="flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setDietFilter('all')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  dietFilter === 'all'
                    ? 'bg-[#8B1538] text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setDietFilter('veg')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1 ${
                  dietFilter === 'veg'
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="w-3 h-3 border border-current rounded-sm flex items-center justify-center">
                  <Circle className="w-1.5 h-1.5 fill-current" />
                </div>
                Veg
              </button>
              <button
                onClick={() => setDietFilter('non-veg')}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1 ${
                  dietFilter === 'non-veg'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <div className="w-3 h-3 border border-current rounded-sm flex items-center justify-center">
                  <Circle className="w-1.5 h-1.5 fill-current" />
                </div>
                Non-Veg
              </button>
            </div>
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
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6">
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
                  setDietFilter('all');
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
                  transition={{ delay: index * 0.03 }}
                  className="relative bg-gradient-to-br from-white via-[#FFF9F5] to-white rounded-2xl p-4 sm:p-5 md:p-6 shadow-xl border border-[#8B1538]/10 hover:shadow-2xl transition-all duration-500 overflow-hidden group"
                >
                  {/* Decorative corner accents */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#8B1538]/5 to-transparent rounded-bl-full" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#8B1538]/5 to-transparent rounded-tr-full" />

                  <div className="relative">
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="relative">
                            <DietaryIcon dietary={item.dietary} />
                            {item.dietary?.includes('veg') && !item.dietary?.includes('non-veg') && (
                              <div className="absolute -inset-1 bg-green-600/20 rounded-full blur-sm -z-10" />
                            )}
                            {item.dietary?.includes('non-veg') && (
                              <div className="absolute -inset-1 bg-red-600/20 rounded-full blur-sm -z-10" />
                            )}
                          </div>
                          <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                            {item.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-[11px] sm:text-xs uppercase tracking-wide sm:tracking-widest text-gray-500 font-medium">
                            {item.categoryName}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          <button
                            onClick={() => speakItem(item)}
                            className="group/btn flex items-center gap-1.5 text-[#8B1538] hover:text-[#6B0F28] transition-colors p-1.5 -m-1.5"
                          >
                            <Volume2 className={`w-4 h-4 sm:w-5 sm:h-5 ${speakingItemId === item.id ? 'animate-pulse' : ''}`} />
                            <span className="text-xs sm:text-sm font-medium">
                              {speakingItemId === item.id ? 'Stop' : 'Listen'}
                            </span>
                          </button>
                        </div>
                      </div>
                      <div className="text-right ml-4 flex-shrink-0">
                        <div className="inline-flex flex-col items-end bg-gradient-to-br from-[#8B1538] to-[#6B0F28] px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-xl shadow-lg shadow-[#8B1538]/20 min-w-[90px] sm:min-w-[110px] md:min-w-[120px]">
                          <span className="text-[10px] sm:text-xs text-white/80 uppercase tracking-wider font-medium">
                            Price
                          </span>
                          <span className="text-lg sm:text-xl md:text-2xl font-bold text-white">₹{item.price.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="relative pl-4 sm:pl-6 md:pl-8 border-l-2 border-[#8B1538]/20">
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed italic">
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
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Floating WhatsApp Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-5 py-3 rounded-full shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="hidden sm:inline">Book NYE</span>
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 sm:py-8 text-xs sm:text-sm text-gray-500 border-t border-gray-200 mt-6 sm:mt-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#8B1538]" />
          <span>New Year&apos;s Eve 2026</span>
          <Sparkles className="w-4 h-4 text-[#8B1538]" />
        </div>
        <p className="mb-2">All prices are exclusive of taxes. Government taxes as applicable</p>
        <p className="mb-4 text-[#8B1538]">♦ AMANTE ♦</p>
        <Link href="/events" className="text-[#8B1538] hover:text-[#6B0F28] underline text-sm">
          View NYE Event Details
        </Link>
        <div className="mt-4">
          <a
            href="https://restronaut.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-[#8B1538] transition-colors"
          >
            <span>Powered by</span>
            <span className="font-semibold">Restronaut</span>
          </a>
        </div>
      </div>
    </div>
  );
}
