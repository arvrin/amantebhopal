import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./clean-globals.css";
import HeadIcons from "./head-icons";
import ConditionalLayout from "@/components/ConditionalLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://amante-coming-soon.vercel.app'),
  title: "Amante - Coming Soon | Bhopal's First Multi-Concept Destination",
  description: "Bhopal's most anticipated destination for love, food, and celebrations. Six distinct spaces including café, rooftop restaurant, lounge, club, private dining & banquets. Join our exclusive list for VIP opening updates.",
  keywords: "Amante, Bhopal restaurant, multi-concept destination, café, rooftop restaurant, lounge, nightclub, private dining, banquet hall, coming soon, Bhopal dining, celebration venue",
  authors: [{ name: "Amante" }],
  creator: "Amante",
  publisher: "Amante",
  robots: "index, follow",
  
  icons: [
    { url: '/favicon-256x256.png', sizes: '256x256', type: 'image/png' },
    { url: '/favicon-128x128.png', sizes: '128x128', type: 'image/png' },
    { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    { url: '/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
    { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
  ],

  // Open Graph metadata for social media
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://amante-coming-soon.vercel.app',
    title: "Amante - Coming Soon | Bhopal's First Multi-Concept Destination",
    description: "Bhopal's most anticipated destination for love, food, and celebrations. Six distinct spaces including café, rooftop restaurant, lounge, club, private dining & banquets. Join our exclusive list for VIP opening updates.",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 1200,
        alt: 'Amante - Where love, happiness, and celebrations belong together',
        type: 'image/png',
      },
    ],
    siteName: 'Amante',
  },

  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    site: '@cafe_amante_india',
    creator: '@cafe_amante_india',
    title: "Amante - Coming Soon | Bhopal's First Multi-Concept Destination",
    description: "Bhopal's most anticipated destination for love, food, and celebrations. Six distinct spaces. Join our exclusive list for VIP opening updates.",
    images: {
      url: '/twitter-image.png',
      alt: 'Amante - Where love, happiness, and celebrations belong together',
    },
  },

  // Additional metadata
  category: 'Restaurant',
  classification: 'Business',
  
  // Verification tags (add when available)
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  //   yahoo: 'your-yahoo-verification-code',
  // },

  // App-specific metadata
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
};

export function generateViewport() {
  return {
    themeColor: '#B91C1C',
    colorScheme: 'light',
    width: 'device-width',
    initialScale: 1,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <HeadIcons />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
