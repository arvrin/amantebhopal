'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-sm transition-all duration-normal focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-gradient-to-br from-[#8B1538] to-[#6B0F28] text-white hover:from-[#6B0F28] hover:to-[#8B1538] focus:ring-[#8B1538] shadow-lg shadow-[#8B1538]/30 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0',
      secondary: 'bg-amante-pink-light text-amante-red border border-amante-pink hover:bg-amante-pink hover:border-amante-pink-dark focus:ring-amante-pink',
      outline: 'bg-transparent text-white border-2 border-[#8B1538] hover:bg-gradient-to-br hover:from-[#8B1538] hover:to-[#6B0F28] hover:text-white focus:ring-[#8B1538]',
      ghost: 'bg-transparent text-amante-charcoal hover:bg-amante-cream focus:ring-amante-grey-light',
      danger: 'bg-error text-amante-white hover:bg-red-600 focus:ring-error shadow-sm',
      link: 'bg-transparent text-amante-red underline hover:text-amante-red-dark focus:ring-0',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm min-h-[36px]',
      md: 'px-6 py-3 text-base min-h-[44px]',
      lg: 'px-8 py-4 text-lg min-h-[52px]',
    };

    const widthClass = fullWidth ? 'w-full' : '';

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
