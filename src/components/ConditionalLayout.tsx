'use client';

import { usePathname } from 'next/navigation';
import TransparentHeader from '@/components/layout/TransparentHeader';
import Footer from '@/components/layout/Footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isMenuPage = pathname?.startsWith('/menu');

  return (
    <>
      {!isHomePage && <TransparentHeader />}
      {children}
      {!isHomePage && !isMenuPage && <Footer />}
    </>
  );
}
