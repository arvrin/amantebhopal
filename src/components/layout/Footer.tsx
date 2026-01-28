'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Menu', href: '/menu' },
    { label: 'Events', href: '/events' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ];

  const spaces = [
    { label: 'Café & Bakery', href: '/cafe' },
    { label: 'Rooftop Restaurant', href: '/restaurant' },
    { label: 'Lounge & Bar', href: '/lounge' },
    { label: 'Nightclub', href: '/club' },
    { label: 'Private Dining', href: '/private-dining' },
  ];

  return (
    <footer className="bg-gradient-to-b from-black to-[#1a0a0f] text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amante-pink/30 to-transparent" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6 transition-transform hover:scale-105 duration-300">
              <Image
                src="/logos/White Logo.svg"
                alt="Amante"
                width={200}
                height={70}
                className="h-14 w-auto drop-shadow-2xl"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Where love, happiness, and celebrations belong together. Experience Bhopal's first multi-concept destination.
            </p>
            {/* Social Media */}
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/cafe_amante_india/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-gradient-to-br hover:from-amante-red hover:to-amante-pink transition-all duration-300 border border-white/10 hover:border-amante-pink/50 group"
              >
                <Instagram className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.facebook.com/cafeamante"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-gradient-to-br hover:from-amante-red hover:to-amante-pink transition-all duration-300 border border-white/10 hover:border-amante-pink/50 group"
              >
                <Facebook className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.youtube.com/@cafeamante"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-gradient-to-br hover:from-amante-red hover:to-amante-pink transition-all duration-300 border border-white/10 hover:border-amante-pink/50 group"
              >
                <Youtube className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-amante-pink transition-colors duration-300 text-sm inline-block hover:translate-x-1 transform"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Spaces */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4 text-white">Our Spaces</h3>
            <ul className="space-y-2">
              {spaces.map((space) => (
                <li key={space.href}>
                  <Link
                    href={space.href}
                    className="text-white/70 hover:text-amante-pink transition-colors duration-300 text-sm inline-block hover:translate-x-1 transform"
                  >
                    {space.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4 text-white">Get in Touch</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+919893779100"
                  className="flex items-start gap-3 text-white/70 hover:text-amante-pink transition-colors duration-300 text-sm group"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>+91 98937 79100</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919981123101"
                  className="flex items-start gap-3 text-white/70 hover:text-amante-pink transition-colors duration-300 text-sm group"
                >
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>+91 99811 23101</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact.cafeamante@gmail.com"
                  className="flex items-start gap-3 text-white/70 hover:text-amante-pink transition-colors duration-300 text-sm group"
                >
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="break-all">contact.cafeamante@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  1, Mahendra Business Square<br />
                  Bawadia Kalan, Bhopal
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
            <p>
              © {currentYear} Amante. All rights reserved.
              <a href="/admin" className="ml-2 text-white/20 hover:text-white/40 transition-colors">•</a>
            </p>
            <div className="flex items-center gap-2">
              <span>Powered by</span>
              <a
                href="https://restronaut.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white/70 hover:text-amante-pink transition-colors"
              >
                Restronaut
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
