import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Lounge Bar in Bhopal | Craft Cocktails & Premium Spirits | Amante',
  description: 'Discover Bhopal\'s best lounge bar at Amante. Craft cocktails, premium spirits, live music & sophisticated ambiance. Perfect for after-work drinks & celebrations.',
  keywords: 'best lounge Bhopal, bar Bhopal, cocktail bar Bhopal, Amante lounge, best bar Bhopal, drinks Bhopal, premium spirits Bhopal, nightlife Bhopal',
  openGraph: {
    title: 'Best Lounge Bar in Bhopal | Craft Cocktails & Premium Spirits | Amante',
    description: 'Discover Bhopal\'s best lounge bar at Amante. Craft cocktails, premium spirits, live music & sophisticated ambiance.',
  },
};

export default function LoungeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
