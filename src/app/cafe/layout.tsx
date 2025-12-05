import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Café in Bhopal | Coffee, Bakery & Brunch | Amante Café',
  description: 'Visit Bhopal\'s best café at Amante. Freshly brewed coffee, artisan bakery, all-day breakfast & brunch. Perfect for work, dates or hangouts. Open 8 AM daily!',
  keywords: 'best café Bhopal, coffee shop Bhopal, bakery Bhopal, brunch Bhopal, breakfast café Bhopal, Amante café, café near me Bhopal, best coffee Bhopal',
  openGraph: {
    title: 'Best Café in Bhopal | Coffee, Bakery & Brunch | Amante Café',
    description: 'Visit Bhopal\'s best café at Amante. Freshly brewed coffee, artisan bakery, all-day breakfast & brunch. Perfect for work, dates or hangouts.',
  },
};

export default function CafeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
