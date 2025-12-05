import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Amante | Best Multi-Concept Restaurant & Café in Bhopal',
  description: 'Discover Amante - Bhopal\'s premier destination for fine dining, café culture & nightlife. Our story, values, and commitment to excellence. 5 unique spaces under one roof.',
  keywords: 'about Amante Bhopal, best restaurant Bhopal story, fine dining Bhopal history, café Bhopal about us, multi-concept restaurant Bhopal',
  openGraph: {
    title: 'About Amante | Best Multi-Concept Restaurant & Café in Bhopal',
    description: 'Discover Amante - Bhopal\'s premier destination for fine dining, café culture & nightlife. Our story, values, and commitment to excellence.',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
