import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Satvik Menu | Pure Veg, Jain & Satvik Food in Bhopal | Amante',
  description: 'Amante\'s Satvik menu - pure vegetarian, Jain & satvik delicacies, Rajwadi thalis, plus café & bar. Shuddh, soulful food in Bhopal.',
  keywords: 'Amante satvik menu, Jain food Bhopal, pure veg restaurant Bhopal, satvik food Bhopal, Rajwadi thali Bhopal, no onion garlic food Bhopal',
  openGraph: {
    title: 'Satvik Menu | Pure Veg, Jain & Satvik Food | Amante',
    description: 'Pure vegetarian, Jain & satvik delicacies, Rajwadi thalis, café & bar at Amante, Bhopal.',
  },
};

export default function SatvikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
