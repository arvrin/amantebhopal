'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      className = '',
      required,
      leftIcon,
      rightIcon,
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
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-amante-grey">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            className={`
              w-full px-4 py-3
              font-body text-body text-amante-charcoal
              bg-amante-white border rounded-sm
              transition-all duration-fast
              placeholder:text-amante-grey
              focus:outline-none focus:ring-2 focus:ring-amante-red focus:ring-offset-0
              disabled:bg-gray-50 disabled:text-amante-grey disabled:cursor-not-allowed
              ${error ? 'border-error' : 'border-amante-grey-light'}
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}
              ${className}
            `}
            required={required}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
          />

          {rightIcon && !error && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-amante-grey">
              {rightIcon}
            </div>
          )}

          {error && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-error">
              <AlertCircle className="h-5 w-5" />
            </div>
          )}
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

Input.displayName = 'Input';

export default Input;
