import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Rooftop Restaurant in Bhopal | Fine Dining | Amante',
  description: 'Experience Bhopal\'s best rooftop restaurant at Amante. Premium fine dining with stunning city views. Multi-cuisine menu, romantic ambiance. Reserve your table today!',
  keywords: 'best rooftop restaurant Bhopal, fine dining Bhopal, rooftop dining Bhopal, Amante restaurant, best restaurant Bhopal, romantic dinner Bhopal, multi-cuisine Bhopal',
  openGraph: {
    title: 'Best Rooftop Restaurant in Bhopal | Fine Dining | Amante',
    description: 'Experience Bhopal\'s best rooftop restaurant at Amante. Premium fine dining with stunning city views. Multi-cuisine menu, romantic ambiance.',
  },
};

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
