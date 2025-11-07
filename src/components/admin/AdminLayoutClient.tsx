'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutClientProps {
  children: React.ReactNode;
  user: {
    name: string;
    role: string;
    phone: string;
  };
}

export default function AdminLayoutClient({ children, user }: AdminLayoutClientProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Listen for sidebar collapse state changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin-sidebar-collapsed') {
        setIsCollapsed(e.newValue === 'true');
      }
    };

    // Check initial state
    const stored = localStorage.getItem('admin-sidebar-collapsed');
    if (stored) {
      setIsCollapsed(stored === 'true');
    }

    window.addEventListener('storage', handleStorageChange);

    // Custom event for same-window updates
    const handleCustomEvent = ((e: CustomEvent) => {
      setIsCollapsed(e.detail.isCollapsed);
    }) as EventListener;

    window.addEventListener('sidebar-collapse-change', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('sidebar-collapse-change', handleCustomEvent);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black relative">
      <AdminSidebar user={user} onCollapseChange={setIsCollapsed} />
      <div
        className={`transition-all duration-300 ${
          isCollapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        <main className="min-h-screen pb-16">
          {children}
        </main>

        {/* Powered by Restronaut Footer */}
        <footer className="fixed bottom-0 right-0 p-4 z-10">
          <a
            href="https://restronaut.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm"
          >
            <span>Powered by</span>
            <span className="font-semibold">Restronaut</span>
          </a>
        </footer>
      </div>
    </div>
  );
}
