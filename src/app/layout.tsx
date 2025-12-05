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
  title: "Best Café & Club in Bhopal | Multi-Concept Restaurant, Lounge & Private Dining | Amante",
  description: "Bhopal's #1 destination for café, club, rooftop dining & nightlife. Premium multi-concept venue with 5 unique spaces: Best Café, Rooftop Restaurant, Lounge Bar, Nightclub & Private Dining. Book now!",
  keywords: "best café in Bhopal, best club in Bhopal, best restaurant Bhopal, rooftop restaurant Bhopal, nightclub Bhopal, lounge bar Bhopal, private dining Bhopal, Amante Bhopal, fine dining Bhopal, best nightlife Bhopal, café near me Bhopal",
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
    title: "Best Café & Club in Bhopal | Multi-Concept Restaurant, Lounge & Private Dining | Amante",
    description: "Bhopal's #1 destination for café, club, rooftop dining & nightlife. Premium multi-concept venue with 5 unique spaces: Best Café, Rooftop Restaurant, Lounge Bar, Nightclub & Private Dining. Book now!",
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
    title: "Best Café & Club in Bhopal | Multi-Concept Restaurant, Lounge & Private Dining | Amante",
    description: "Bhopal's #1 destination for café, club, rooftop dining & nightlife. 5 unique spaces: Café, Restaurant, Lounge, Club & Private Dining. Book now!",
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
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: '#8B1538' },
      { media: '(prefers-color-scheme: dark)', color: '#8B1538' }
    ],
    colorScheme: 'light',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5, // Allow users to zoom up to 5x for accessibility
    userScalable: true, // Enable pinch-to-zoom on iOS
    viewportFit: 'cover', // Support iPhone notch/Dynamic Island
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
