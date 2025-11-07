'use client';

import { useState, useRef, InputHTMLAttributes, forwardRef } from 'react';
import { Upload, X, File, AlertCircle } from 'lucide-react';
import Button from './Button';

export interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
  maxSize?: number; // in MB
  acceptedFormats?: string[];
  onFileSelect?: (file: File | null) => void;
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      label,
      error,
      helperText,
      className = '',
      required,
      maxSize = 5,
      acceptedFormats = ['.pdf', '.doc', '.docx'],
      onFileSelect,
      ...props
    },
    ref
  ) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      setFileError(null);

      if (!file) {
        setSelectedFile(null);
        onFileSelect?.(null);
        return;
      }

      // Check file size
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSize) {
        setFileError(`File size must be less than ${maxSize}MB`);
        return;
      }

      // Check file format
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!acceptedFormats.some(format => format.toLowerCase() === fileExtension)) {
        setFileError(`Please upload ${acceptedFormats.join(', ')} files only`);
        return;
      }

      setSelectedFile(file);
      onFileSelect?.(file);
    };

    const handleRemove = () => {
      setSelectedFile(null);
      setFileError(null);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
      onFileSelect?.(null);
    };

    const displayError = error || fileError;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-body-sm font-medium text-amante-charcoal mb-2">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div
          className={`
            relative border-2 border-dashed rounded-xl p-6
            transition-all duration-fast
            bg-white/5 backdrop-blur-sm
            ${displayError ? 'border-error' : 'border-white/20 hover:border-amante-pink'}
            ${!selectedFile ? 'cursor-pointer' : ''}
            ${className}
          `}
          onClick={() => !selectedFile && inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            className="sr-only"
            onChange={handleFileChange}
            accept={acceptedFormats.join(',')}
            {...props}
          />

          {!selectedFile ? (
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-white/40" />
              <p className="mt-2 text-body text-white">
                <span className="font-semibold text-amante-pink">Click to upload</span> or drag and drop
              </p>
              <p className="mt-1 text-body-xs text-white/60">
                {acceptedFormats.join(', ')} (max {maxSize}MB)
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amante-pink/20 rounded-md">
                  <File className="h-6 w-6 text-amante-pink" />
                </div>
                <div>
                  <p className="text-body-sm font-medium text-white">
                    {selectedFile.name}
                  </p>
                  <p className="text-body-xs text-white/60">
                    {formatFileSize(selectedFile.size)}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="!p-2 text-white hover:text-amante-pink"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>

        {displayError && (
          <p className="mt-1 text-body-sm text-error flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            {displayError}
          </p>
        )}

        {helperText && !displayError && (
          <p className="mt-1 text-body-xs text-amante-grey">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';

export default FileUpload;
