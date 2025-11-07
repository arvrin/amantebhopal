'use client';

import { useState, createContext, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Calendar,
  PartyPopper,
  MessageSquare,
  Briefcase,
  Mail,
  LogOut,
  Menu,
  X,
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { toast } from 'react-hot-toast';

// Create context for sidebar state
const SidebarContext = createContext<{
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}>({
  isCollapsed: false,
  setIsCollapsed: () => {},
});

export const useSidebar = () => useContext(SidebarContext);

interface AdminSidebarProps {
  user: {
    name: string;
    role: string;
    phone: string;
  };
  onCollapseChange?: (isCollapsed: boolean) => void;
}

export default function AdminSidebar({ user, onCollapseChange }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin-sidebar-collapsed') === 'true';
    }
    return false;
  });

  const handleToggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);

    // Save to localStorage
    localStorage.setItem('admin-sidebar-collapsed', String(newState));

    // Notify parent component
    onCollapseChange?.(newState);

    // Dispatch custom event for cross-component communication
    window.dispatchEvent(new CustomEvent('sidebar-collapse-change', {
      detail: { isCollapsed: newState }
    }));
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: Calendar, label: 'Reservations', href: '/admin/reservations' },
    { icon: PartyPopper, label: 'Events', href: '/admin/events' },
    { icon: MessageSquare, label: 'Feedback', href: '/admin/feedback' },
    { icon: Briefcase, label: 'Careers', href: '/admin/careers' },
    { icon: Mail, label: 'Contact', href: '/admin/contact' },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      toast.success('Logged out successfully');
      router.push('/admin');
      router.refresh();
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const SidebarContent = ({ isCollapsed }: { isCollapsed: boolean }) => (
    <>
      {/* Logo/Header */}
      <div className="p-6 border-b border-white/10 flex items-center justify-center">
        {!isCollapsed ? (
          <Image
            src="/assets/logos/Primary Logo/SVG/White Logo_BlackBG.svg"
            alt="Amante"
            width={240}
            height={84}
            className="w-48 h-auto drop-shadow-2xl transition-all duration-300"
          />
        ) : (
          <Image
            src="/assets/logos/Icon/SVG/White Logo_BlackBG Icon.svg"
            alt="Amante"
            width={40}
            height={40}
            className="w-10 h-10 transition-all duration-300"
          />
        )}
      </div>

      {/* User Info */}
      {!isCollapsed && (
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#8B1538]/20 to-[#6B0F28]/20 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-amante-pink" />
            </div>
            <div className="overflow-hidden">
              <p className="font-semibold text-white text-sm truncate">{user.name}</p>
              <p className="text-xs text-white/60 truncate">{user.role}</p>
            </div>
          </div>
        </div>
      )}

      {isCollapsed && (
        <div className="p-4 border-b border-white/10 flex justify-center">
          <div className="w-10 h-10 bg-gradient-to-br from-[#8B1538]/20 to-[#6B0F28]/20 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-amante-pink" />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`
                flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-xl transition-all duration-200
                ${isActive
                  ? 'bg-gradient-to-r from-[#8B1538] to-[#6B0F28] text-white shadow-lg shadow-[#8B1538]/30'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
                }
              `}
              title={isCollapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-xl w-full text-white/70 hover:bg-white/5 hover:text-white transition-all duration-200`}
          title={isCollapsed ? 'Logout' : undefined}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </>
  );

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 bg-white/5 backdrop-blur-xl border-r border-white/10 transition-all duration-300 ${
          isCollapsed ? 'lg:w-20' : 'lg:w-64'
        }`}
      >
        <SidebarContent isCollapsed={isCollapsed} />

        {/* Collapse Toggle Button */}
        <button
          onClick={handleToggleCollapse}
          className="absolute -right-3 top-20 w-6 h-6 bg-gradient-to-br from-[#8B1538] to-[#6B0F28] rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform duration-200"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-y-0 left-0 w-64 bg-black border-r border-white/10 z-50 flex flex-col"
            >
              <SidebarContent isCollapsed={false} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </SidebarContext.Provider>
  );
}
