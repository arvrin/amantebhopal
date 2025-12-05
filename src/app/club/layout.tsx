import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Nightclub in Bhopal | DJ Nights & VIP Tables | Amante Club',
  description: 'Experience Bhopal\'s best nightclub at Amante. Premium DJ nights, VIP bottle service, state-of-the-art sound & lighting. The ultimate nightlife destination. Book VIP now!',
  keywords: 'best nightclub Bhopal, club Bhopal, DJ nights Bhopal, VIP tables Bhopal, Amante club, best nightlife Bhopal, party Bhopal, discotheque Bhopal',
  openGraph: {
    title: 'Best Nightclub in Bhopal | DJ Nights & VIP Tables | Amante Club',
    description: 'Experience Bhopal\'s best nightclub at Amante. Premium DJ nights, VIP bottle service, state-of-the-art sound & lighting.',
  },
};

export default function ClubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
