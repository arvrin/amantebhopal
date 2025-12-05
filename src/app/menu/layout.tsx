import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Menu | Best Restaurant & Café in Bhopal | Food & Drinks | Amante',
  description: 'Explore Amante\'s full menu - Multi-cuisine dishes, craft cocktails, artisan coffee & bakery items. Best food in Bhopal at our restaurant, café, lounge & club.',
  keywords: 'Amante menu, restaurant menu Bhopal, café menu Bhopal, best food Bhopal, cocktail menu Bhopal, multi-cuisine menu Bhopal, food prices Bhopal',
  openGraph: {
    title: 'Menu | Best Restaurant & Café in Bhopal | Food & Drinks | Amante',
    description: 'Explore Amante\'s full menu - Multi-cuisine dishes, craft cocktails, artisan coffee & bakery items. Best food in Bhopal.',
  },
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
