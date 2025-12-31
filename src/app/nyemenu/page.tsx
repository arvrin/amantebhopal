'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, Leaf, Circle, Volume2, Sparkles, PartyPopper, MessageCircle } from 'lucide-react';

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
  const [showVegOnly, setShowVegOnly] = useState(false);
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
        <div className="w-5 h-5 border-2 border-green-500 rounded flex items-center justify-center bg-black/30">
          <Circle className="w-2.5 h-2.5 fill-green-500 text-green-500" />
        </div>
      );
    }
    if (isNonVeg) {
      return (
        <div className="w-5 h-5 border-2 border-red-500 rounded flex items-center justify-center bg-black/30">
          <Circle className="w-2.5 h-2.5 fill-red-500 text-red-500" />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a0505] to-[#1a0a0a]">
      {/* Inject scrollbar hide styles */}
      <style jsx global>{scrollbarHideStyles}</style>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#4a1515_0%,transparent_50%)] opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,#2a1a00_0%,transparent_40%)] opacity-40" />
        {/* Sparkle dots */}
        <div className="absolute top-20 left-10 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse delay-100" />
        <div className="absolute top-60 left-1/4 w-1 h-1 bg-amber-300 rounded-full animate-pulse delay-200" />
        <div className="absolute bottom-40 right-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-300" />
      </div>

      {/* Spacer for HeaderGlobal */}
      <div className="h-20 md:h-24" />

      {/* Header */}
      <div
        className={`sticky z-20 bg-black/90 backdrop-blur-md border-b border-amber-500/20 shadow-lg shadow-amber-500/5 transition-all duration-300 ease-in-out ${
          navbarVisible ? 'top-20 md:top-24' : 'top-0'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4">
          {/* Title Section */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 rounded-full mb-2">
              <PartyPopper className="w-4 h-4 text-amber-400" />
              <span className="text-amber-300 font-semibold text-xs uppercase tracking-wider">New Year Special</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200">
              {menu.name}
            </h1>
            <p className="text-sm sm:text-base text-amber-200/70 mt-1">{menu.description}</p>
            <p className="text-xs text-amber-400/60 mt-1">31st December 2025 & 1st January 2026</p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400/50"
              size={20}
            />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-amber-500/30 focus:outline-none focus:ring-2 focus:ring-amber-500/50 bg-black/50 text-white placeholder-amber-200/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-400/50 hover:text-amber-300"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Filters */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
            <button
              onClick={() => setShowVegOnly(!showVegOnly)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                showVegOnly
                  ? 'bg-green-600 text-white'
                  : 'bg-white/10 text-amber-200 hover:bg-white/20'
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
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black'
                    : 'bg-white/10 text-amber-200 hover:bg-white/20'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 relative z-10">
        <AnimatePresence mode="wait">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-amber-200/70 text-lg">No items found</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory(null);
                  setShowVegOnly(false);
                }}
                className="mt-4 text-sm underline text-amber-400"
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
                  className="relative bg-gradient-to-br from-black/80 via-[#1a0a05]/90 to-black/80 rounded-2xl p-4 sm:p-5 md:p-6 border border-amber-500/20 hover:border-amber-500/40 shadow-xl hover:shadow-amber-500/10 transition-all duration-500 overflow-hidden group"
                >
                  {/* Decorative corner accents */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/5 to-transparent rounded-bl-full" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-500/5 to-transparent rounded-tr-full" />

                  <div className="relative">
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="relative">
                            <DietaryIcon dietary={item.dietary} />
                          </div>
                          <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-amber-100 tracking-tight">
                            {item.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-[11px] sm:text-xs uppercase tracking-wide sm:tracking-widest text-amber-400/60 font-medium">
                            {item.categoryName}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-amber-500/30" />
                          <button
                            onClick={() => speakItem(item)}
                            className="group/btn flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors p-1.5 -m-1.5"
                          >
                            <Volume2 className={`w-4 h-4 sm:w-5 sm:h-5 ${speakingItemId === item.id ? 'animate-pulse' : ''}`} />
                            <span className="text-xs sm:text-sm font-medium">
                              {speakingItemId === item.id ? 'Stop' : 'Listen'}
                            </span>
                          </button>
                        </div>
                      </div>
                      <div className="text-right ml-4 flex-shrink-0">
                        <div className="inline-flex flex-col items-end bg-gradient-to-br from-amber-500 to-yellow-600 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-xl shadow-lg shadow-amber-500/20 min-w-[90px] sm:min-w-[110px] md:min-w-[120px]">
                          <span className="text-[10px] sm:text-xs text-black/60 uppercase tracking-wider font-medium">
                            Price
                          </span>
                          <span className="text-lg sm:text-xl md:text-2xl font-bold text-black">₹{item.price.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="relative pl-4 sm:pl-6 md:pl-8 border-l-2 border-amber-500/30">
                      <p className="text-sm sm:text-base text-amber-100/70 leading-relaxed italic">
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
      <div className="text-center py-6 sm:py-8 text-xs sm:text-sm text-amber-200/50 border-t border-amber-500/20 mt-6 sm:mt-8 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>New Year&apos;s Eve 2026</span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>
        <p className="mb-2">All prices are exclusive of taxes. Government taxes as applicable</p>
        <p className="mb-4 text-amber-400">♦ AMANTE ♦</p>
        <Link href="/events" className="text-amber-400 hover:text-amber-300 underline text-sm">
          View NYE Event Details
        </Link>
        <div className="mt-4">
          <a
            href="https://restronaut.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-amber-200/40 hover:text-amber-400 transition-colors"
          >
            <span>Powered by</span>
            <span className="font-semibold">Restronaut</span>
          </a>
        </div>
      </div>
    </div>
  );
}
