'use client';

import { SelectHTMLAttributes, forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      className = '',
      required,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-body-sm font-medium text-amante-charcoal mb-2">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            className={`
              w-full px-4 py-3
              font-body text-body text-gray-900
              bg-white border border-gray-300 rounded-xl
              transition-all duration-fast
              focus:outline-none focus:ring-2 focus:ring-[#8B1538] focus:border-[#8B1538]
              disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
              appearance-none cursor-pointer
              hover:border-gray-400
              ${error ? 'border-error' : ''}
              ${className}
            `}
            required={required}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
          >
            {children}
          </select>

          {/* Dropdown arrow */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {error ? (
              <AlertCircle className="h-5 w-5 text-error" />
            ) : (
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </div>
        </div>

        {error && (
          <p id={`${props.id}-error`} className="mt-1 text-body-sm text-error flex items-center gap-1">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p className="mt-1 text-body-xs text-amante-grey">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
