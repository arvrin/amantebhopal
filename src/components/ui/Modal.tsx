'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
}

export default function Modal({ isOpen, onClose, children, title, maxWidth = '4xl' }: ModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full ${maxWidthClasses[maxWidth]} my-8`}
            >
              {/* Modal Content */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
                {/* Header */}
                {title && (
                  <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <h2 className="font-heading text-2xl text-white">{title}</h2>
                    <button
                      onClick={onClose}
                      className="p-2 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/10"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                )}

                {/* Close button (when no title) */}
                {!title && (
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/10"
                  >
                    <X className="w-6 h-6" />
                  </button>
                )}

                {/* Content */}
                <div className={title ? 'p-6' : 'p-6 pt-12'}>
                  {children}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
