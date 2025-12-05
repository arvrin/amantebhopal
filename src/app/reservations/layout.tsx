import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Table | Reservations at Amante Bhopal | Best Restaurant & Café',
  description: 'Reserve your table at Bhopal\'s best restaurant. Book rooftop dining, café seating, lounge, private dining or club VIP tables. Easy online booking at Amante.',
  keywords: 'table reservation Bhopal, book restaurant Bhopal, Amante reservations, best restaurant booking Bhopal, rooftop dining reservation, private dining Bhopal booking',
  openGraph: {
    title: 'Book a Table | Reservations at Amante Bhopal | Best Restaurant & Café',
    description: 'Reserve your table at Bhopal\'s best restaurant. Book rooftop dining, café seating, lounge, private dining or club VIP tables.',
  },
};

export default function ReservationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
