import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers at Amante Bhopal | Jobs in Best Restaurant, Café & Club',
  description: 'Join Bhopal\'s best hospitality team at Amante. Open positions: Chef, Bartender, Server, Manager & more. Competitive pay, growth opportunities. Apply now!',
  keywords: 'jobs Amante Bhopal, restaurant jobs Bhopal, café careers Bhopal, hospitality jobs Bhopal, chef jobs Bhopal, bartender jobs Bhopal, best restaurant careers',
  openGraph: {
    title: 'Careers at Amante Bhopal | Jobs in Best Restaurant, Café & Club',
    description: 'Join Bhopal\'s best hospitality team at Amante. Open positions: Chef, Bartender, Server, Manager & more. Apply now!',
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
