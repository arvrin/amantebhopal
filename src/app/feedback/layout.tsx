import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Share Your Experience | Feedback for Amante Bhopal | Best Café & Restaurant',
  description: 'Tell us about your experience at Amante Bhopal. Rate our café, restaurant, lounge & club. Your feedback helps us serve you better. Share what you loved!',
  keywords: 'Amante Bhopal feedback, restaurant review Bhopal, café feedback Bhopal, best restaurant Bhopal reviews, Amante customer experience',
  openGraph: {
    title: 'Share Your Experience | Feedback for Amante Bhopal | Best Café & Restaurant',
    description: 'Tell us about your experience at Amante Bhopal. Rate our café, restaurant, lounge & club. Your feedback helps us serve you better.',
  },
};

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
