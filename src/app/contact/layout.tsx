import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Amante Bhopal | Best Restaurant & Café Reservations & Inquiries',
  description: 'Get in touch with Amante Bhopal - Best café, restaurant & club. Call +91 98937 79100 for reservations, event bookings, corporate inquiries. Quick response guaranteed.',
  keywords: 'contact Amante Bhopal, Amante phone number, Amante reservations, best restaurant Bhopal contact, café Bhopal booking, club Bhopal inquiries',
  openGraph: {
    title: 'Contact Amante Bhopal | Best Restaurant & Café Reservations & Inquiries',
    description: 'Get in touch with Amante Bhopal - Best café, restaurant & club. Call +91 98937 79100 for reservations, event bookings, corporate inquiries.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
