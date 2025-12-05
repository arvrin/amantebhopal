import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Photo Gallery | Amante Bhopal | Best Restaurant, Café & Club',
  description: 'Browse photos of Amante Bhopal - Best café, rooftop restaurant, lounge & nightclub. See our stunning interiors, delicious food & memorable events. Visit us!',
  keywords: 'Amante Bhopal photos, restaurant gallery Bhopal, café photos Bhopal, club pictures Bhopal, best restaurant images Bhopal, Amante interiors',
  openGraph: {
    title: 'Photo Gallery | Amante Bhopal | Best Restaurant, Café & Club',
    description: 'Browse photos of Amante Bhopal - Best café, rooftop restaurant, lounge & nightclub. See our stunning interiors, delicious food & memorable events.',
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
