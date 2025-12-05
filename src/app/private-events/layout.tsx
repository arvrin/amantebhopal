import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Host Your Event | Best Event Venue in Bhopal | Amante',
  description: 'Plan your event at Bhopal\'s best venue - Amante. Weddings, corporate events, birthdays & celebrations. Multiple spaces, custom packages. Get a quote today!',
  keywords: 'event venue Bhopal, party venue Bhopal, wedding venue Bhopal, corporate event Bhopal, birthday party Bhopal, Amante events, best venue Bhopal, banquet Bhopal',
  openGraph: {
    title: 'Host Your Event | Best Event Venue in Bhopal | Amante',
    description: 'Plan your event at Bhopal\'s best venue - Amante. Weddings, corporate events, birthdays & celebrations. Multiple spaces, custom packages.',
  },
};

export default function PrivateEventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
