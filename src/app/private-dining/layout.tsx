import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Private Dining in Bhopal | Exclusive Rooms & Events | Amante',
  description: 'Book Bhopal\'s best private dining experience at Amante. Exclusive rooms for intimate dinners, corporate events & celebrations. Customized menus & dedicated service.',
  keywords: 'private dining Bhopal, private room restaurant Bhopal, intimate dining Bhopal, corporate dinner Bhopal, celebration venue Bhopal, Amante private dining',
  openGraph: {
    title: 'Best Private Dining in Bhopal | Exclusive Rooms & Events | Amante',
    description: 'Book Bhopal\'s best private dining experience at Amante. Exclusive rooms for intimate dinners, corporate events & celebrations.',
  },
};

export default function PrivateDiningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
