'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';
import { AlertCircle } from 'lucide-react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxLength?: number;
  showCount?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      helperText,
      className = '',
      required,
      maxLength,
      showCount = false,
      value,
      ...props
    },
    ref
  ) => {
    const currentLength = value ? String(value).length : 0;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-body-sm font-medium text-amante-charcoal mb-2">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={ref}
            className={`
              w-full px-4 py-3
              font-body text-body text-gray-900
              bg-white border border-gray-300 rounded-xl
              transition-all duration-fast
              placeholder:text-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#8B1538] focus:border-[#8B1538]
              disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
              resize-y min-h-[120px]
              hover:border-gray-400
              ${error ? 'border-error' : ''}
              ${className}
            `}
            required={required}
            maxLength={maxLength}
            value={value}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
          />

          {error && (
            <div className="absolute right-3 top-3 text-error">
              <AlertCircle className="h-5 w-5" />
            </div>
          )}
        </div>

        <div className="flex justify-between items-start mt-1">
          <div className="flex-1">
            {error && (
              <p id={`${props.id}-error`} className="text-body-sm text-error">
                {error}
              </p>
            )}

            {helperText && !error && (
              <p className="text-body-xs text-amante-grey">
                {helperText}
              </p>
            )}
          </div>

          {showCount && maxLength && (
            <p className="text-body-xs text-amante-grey ml-2">
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
