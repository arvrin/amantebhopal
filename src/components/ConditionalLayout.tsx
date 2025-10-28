'use client';

import { usePathname } from 'next/navigation';
import HeaderGlobal from '@/components/layout/HeaderGlobal';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      {!isHomePage && <HeaderGlobal />}
      {children}
    </>
  );
}
