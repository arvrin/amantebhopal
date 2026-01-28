'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, X, ChevronDown, Mail } from 'lucide-react';
import ReservationModal from '@/components/ReservationModal';

interface HeaderGlobalProps {
  onReservationClick?: () => void;
}

export default function HeaderGlobal({ onReservationClick }: HeaderGlobalProps = {}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSpacesOpen, setIsSpacesOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  // Check if we're on homepage
  const isHomePage = pathname === '/';

  // Check if we're on a light background page (pages with white/cream backgrounds need white navbar)
  const isLightBgPage = pathname?.startsWith('/menu') ||
                        pathname?.startsWith('/nyemenu') ||
                        pathname?.startsWith('/events') ||
                        pathname?.startsWith('/about') ||
                        pathname?.startsWith('/contact') ||
                        pathname?.startsWith('/reservations');

  // Handle scroll for navbar background and visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update scrolled state
      setScrolled(currentScrollY > 50);

      // Update visibility based on scroll direction
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        // Scrolling up or near top - show navbar
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold - hide navbar
        setVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close menu when pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSpacesOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const spaceItems = [
    { label: 'Café & Bakery', href: '/cafe' },
    { label: 'Rooftop Restaurant', href: '/restaurant' },
    { label: 'Lounge & Bar', href: '/lounge' },
    { label: 'Nightclub', href: '/club' },
    { label: 'Private Dining', href: '/private-dining' },
  ];

  const mainMenuItems = [
    { label: 'Home', href: '/' },
    { label: 'Our Spaces', type: 'dropdown', items: spaceItems },
    { label: 'Menu', href: '/menu' },
    { label: 'Events', href: '/events' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'About', href: '/about' },
    { label: 'Feedback', href: '/feedback' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* Fixed Header with conditional background */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isLightBgPage
            ? 'bg-white/95 backdrop-blur-lg shadow-md'
            : scrolled
            ? 'bg-black/90 backdrop-blur-lg shadow-lg'
            : ''
        }`}
      >
        <div className="max-w-standard mx-auto flex items-center justify-between px-4 md:px-8 lg:px-12 py-4 md:py-6">
          {/* Left: Hamburger Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full transition-all duration-300 ${
              isLightBgPage
                ? 'bg-gradient-to-br from-[#8B1538] to-[#6B0F28]'
                : 'bg-gradient-to-br from-[#8B1538]/30 to-[#6B0F28]/30 backdrop-blur-sm hover:from-[#8B1538]/50 hover:to-[#6B0F28]/50 border-2 border-[#8B1538]/60'
            }`}
            aria-label="Toggle Menu"
          >
            <div className="relative w-5 h-4 sm:w-6 sm:h-5">
              <motion.span
                animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 w-full h-0.5 rounded-full bg-white"
              />
              <motion.span
                animate={isMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 rounded-full bg-white"
              />
              <motion.span
                animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 w-full h-0.5 rounded-full bg-white"
              />
            </div>
          </motion.button>

          {/* Center: Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2 transition-transform hover:scale-105 duration-300"
          >
            <Image
              src={isLightBgPage ? "/assets/logos/Primary Logo/SVG/Red Logo.svg" : "/logos/White Logo.svg"}
              alt="Amante"
              width={240}
              height={84}
              className="w-44 h-auto sm:w-48 md:w-52 lg:w-60 xl:w-72 drop-shadow-2xl"
              priority
            />
          </Link>

          {/* Right: Reserve Button */}
          <motion.button
            onClick={() => {
              if (onReservationClick) {
                onReservationClick();
              } else {
                setIsReservationModalOpen(true);
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-semibold rounded-full text-white transition-all duration-300 ${
              isLightBgPage
                ? 'bg-gradient-to-br from-[#8B1538] to-[#6B0F28]'
                : 'bg-gradient-to-br from-[#8B1538]/30 to-[#6B0F28]/30 backdrop-blur-sm hover:from-[#8B1538]/50 hover:to-[#6B0F28]/50 border-2 border-[#8B1538]/60'
            }`}
          >
            Reserve
          </motion.button>
        </div>
      </motion.header>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-md"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-[70] w-full md:w-[420px] bg-black/90 backdrop-blur-xl overflow-hidden flex flex-col border-r border-white/10"
            >
              {/* Elegant Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#8B1538] via-transparent to-amante-pink" />
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-gradient-to-br hover:from-[#8B1538]/20 hover:to-[#6B0F28]/20 border border-white/10 hover:border-[#8B1538]/50 transition-all duration-300 group z-10"
                aria-label="Close Menu"
              >
                <X className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              </button>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto px-10 py-12 pt-24 relative">
                <ul className="space-y-2">
                  {mainMenuItems.map((item, index) => {
                    if (item.type === 'dropdown') {
                      const hasActiveSpace = spaceItems.some(space => pathname === space.href);
                      return (
                        <motion.li
                          key={item.label}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03, duration: 0.3 }}
                        >
                          {/* Dropdown Header */}
                          <button
                            onClick={() => setIsSpacesOpen(!isSpacesOpen)}
                            className={`w-full flex items-center justify-between py-4 px-5 rounded-xl text-lg font-heading tracking-wide transition-all duration-300 border ${
                              hasActiveSpace || isSpacesOpen
                                ? 'bg-gradient-to-r from-[#8B1538]/20 to-amante-pink/10 text-white border-[#8B1538]/30 shadow-lg shadow-[#8B1538]/10'
                                : 'text-white/70 hover:text-white hover:bg-white/5 border-transparent hover:border-white/10'
                            }`}
                          >
                            <span>{item.label}</span>
                            <motion.div
                              animate={{ rotate: isSpacesOpen ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="w-5 h-5" />
                            </motion.div>
                          </button>

                          {/* Dropdown Content */}
                          <AnimatePresence>
                            {isSpacesOpen && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden mt-2 ml-3 space-y-1 pl-4 border-l border-white/10"
                              >
                                {spaceItems.map((space, spaceIndex) => {
                                  const isActive = pathname === space.href;
                                  return (
                                    <motion.li
                                      key={space.href}
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: spaceIndex * 0.05 }}
                                    >
                                      <Link
                                        href={space.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`block py-3 px-4 rounded-lg text-base font-body tracking-wide transition-all duration-300 border ${
                                          isActive
                                            ? 'bg-gradient-to-r from-[#8B1538] to-[#6B0F28] text-white border-[#8B1538] shadow-md shadow-[#8B1538]/20'
                                            : 'text-white/60 hover:text-white hover:bg-white/5 border-transparent hover:border-white/10 hover:pl-5'
                                        }`}
                                      >
                                        {space.label}
                                      </Link>
                                    </motion.li>
                                  );
                                })}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </motion.li>
                      );
                    }

                    // Skip items without href (shouldn't happen after dropdown check, but TypeScript needs this)
                    if (!item.href) return null;

                    const isActive = pathname === item.href;
                    return (
                      <motion.li
                        key={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03, duration: 0.3 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block py-4 px-5 rounded-xl text-lg font-heading tracking-wide transition-all duration-300 border ${
                            isActive
                              ? 'bg-gradient-to-r from-[#8B1538] to-[#6B0F28] text-white border-[#8B1538] shadow-lg shadow-[#8B1538]/20'
                              : 'text-white/70 hover:text-white hover:bg-white/5 border-transparent hover:border-white/10'
                          }`}
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="px-10 py-6 border-t border-white/10 space-y-3 relative bg-gradient-to-b from-transparent to-black/30"
              >
                {/* Phone */}
                <a
                  href="tel:+919893779100"
                  className="flex items-center gap-3 text-white/70 hover:text-amante-pink transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#8B1538]/20 group-hover:to-[#6B0F28]/20 group-hover:border-[#8B1538]/30 transition-all duration-300">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium tracking-wide">+91 98937 79100</span>
                </a>
                <a
                  href="tel:+919981123101"
                  className="flex items-center gap-3 text-white/70 hover:text-amante-pink transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#8B1538]/20 group-hover:to-[#6B0F28]/20 group-hover:border-[#8B1538]/30 transition-all duration-300">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium tracking-wide">+91 99811 23101</span>
                </a>

                {/* Email */}
                <a
                  href="mailto:contact.cafeamante@gmail.com"
                  className="flex items-center gap-3 text-white/70 hover:text-amante-pink transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#8B1538]/20 group-hover:to-[#6B0F28]/20 group-hover:border-[#8B1538]/30 transition-all duration-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium break-all tracking-wide">contact.cafeamante@gmail.com</span>
                </a>

                {/* Website */}
                <a
                  href="https://www.cafeamante.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-amante-pink transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#8B1538]/20 group-hover:to-[#6B0F28]/20 group-hover:border-[#8B1538]/30 transition-all duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium tracking-wide">www.cafeamante.com</span>
                </a>

                {/* Address */}
                <div className="flex items-start gap-3 text-white/70 pt-2">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-xs leading-relaxed tracking-wide">
                    <p className="font-semibold text-white text-sm mb-1">Visit Us</p>
                    <p className="text-white/60">1, Mahendra Business Square</p>
                    <p className="text-white/60">Bawadia Kalan, Bhopal</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Reservation Modal - Only render on non-homepage pages */}
      {!isHomePage && (
        <ReservationModal
          isOpen={isReservationModalOpen}
          onClose={() => setIsReservationModalOpen(false)}
        />
      )}
    </>
  );
}
