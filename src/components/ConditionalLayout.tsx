'use client';

import { usePathname } from 'next/navigation';
import TransparentHeader from '@/components/layout/TransparentHeader';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      {!isHomePage && <TransparentHeader />}
      {children}
    </>
  );
}
