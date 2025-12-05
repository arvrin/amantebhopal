import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events & Live Music | Best Nightlife in Bhopal | Amante Club & Lounge',
  description: 'Upcoming events at Amante Bhopal - Live music, DJ nights, themed parties & special celebrations. Experience Bhopal\'s best nightlife. Check event calendar now!',
  keywords: 'events Bhopal, live music Bhopal, DJ nights Bhopal, nightlife events Bhopal, Amante events, best club events Bhopal, parties Bhopal',
  openGraph: {
    title: 'Events & Live Music | Best Nightlife in Bhopal | Amante Club & Lounge',
    description: 'Upcoming events at Amante Bhopal - Live music, DJ nights, themed parties & special celebrations. Experience Bhopal\'s best nightlife.',
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
