/**
 * Component Prop Type Definitions
 *
 * Comprehensive type definitions for all component props.
 * This ensures type safety and consistency across all UI components.
 */

import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react';

// ============================================================================
// UI COMPONENT TYPES
// ============================================================================

/**
 * Button component props
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

/**
 * Input component props
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helpText?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

/**
 * Textarea component props
 */
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helpText?: string;
  fullWidth?: boolean;
  maxLength?: number;
  showCount?: boolean;
}

/**
 * Select component props
 */
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  helpText?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  options: SelectOption[];
  placeholder?: string;
}

/**
 * Select option type
 */
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * File upload component props
 */
export interface FileUploadProps {
  label?: string;
  name: string;
  accept: string;
  maxSize: number;
  error?: string;
  helpText?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (file: File | null) => void;
}

/**
 * Loading spinner props
 */
export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
  text?: string;
}

/**
 * Modal component props
 */
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
}

/**
 * Toast notification props
 */
export interface ToastProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  onClose?: (id: string) => void;
}

/**
 * Badge component props
 */
export interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
}

/**
 * Card component props
 */
export interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  onClick?: () => void;
}

// ============================================================================
// LAYOUT COMPONENT TYPES
// ============================================================================

/**
 * Header component props
 */
export interface HeaderProps {
  transparent?: boolean;
  sticky?: boolean;
  showNav?: boolean;
}

/**
 * Footer component props
 */
export interface FooterProps {
  showNewsletter?: boolean;
  showSocial?: boolean;
}

/**
 * Container component props
 */
export interface ContainerProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

/**
 * Section component props
 */
export interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: 'white' | 'cream' | 'dark' | 'transparent';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

// ============================================================================
// FORM COMPONENT TYPES
// ============================================================================

/**
 * Form field wrapper props
 */
export interface FormFieldProps {
  label?: string;
  error?: string;
  helpText?: string;
  required?: boolean;
  children: ReactNode;
  htmlFor?: string;
}

/**
 * Form group props
 */
export interface FormGroupProps {
  children: ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}

/**
 * Checkbox props
 */
export interface CheckboxProps {
  id?: string;
  name: string;
  label: string;
  checked?: boolean;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

/**
 * Radio button props
 */
export interface RadioProps {
  id?: string;
  name: string;
  value: string;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

/**
 * Radio group props
 */
export interface RadioGroupProps {
  name: string;
  label?: string;
  options: RadioOption[];
  value?: string;
  error?: string;
  required?: boolean;
  onChange?: (value: string) => void;
}

/**
 * Radio option type
 */
export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// ============================================================================
// NAVIGATION COMPONENT TYPES
// ============================================================================

/**
 * Navigation link type
 */
export interface NavLink {
  label: string;
  href: string;
  icon?: ReactNode;
  children?: NavLink[];
  external?: boolean;
}

/**
 * Navigation menu props
 */
export interface NavMenuProps {
  links: NavLink[];
  mobile?: boolean;
  onLinkClick?: () => void;
}

/**
 * Breadcrumb item type
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Breadcrumb props
 */
export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
}

/**
 * Tabs props
 */
export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline';
}

/**
 * Tab item type
 */
export interface TabItem {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

// ============================================================================
// CONTENT COMPONENT TYPES
// ============================================================================

/**
 * Hero section props
 */
export interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  overlay?: boolean;
  height?: 'sm' | 'md' | 'lg' | 'full';
  children?: ReactNode;
}

/**
 * Testimonial card props
 */
export interface TestimonialCardProps {
  name: string;
  rating: number;
  text: string;
  spaceVisited?: string;
  date?: string;
  avatar?: string;
}

/**
 * Stats card props
 */
export interface StatsCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

/**
 * Feature card props
 */
export interface FeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  image?: string;
  link?: string;
}

/**
 * Gallery image type
 */
export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  thumbnail?: string;
}

/**
 * Gallery props
 */
export interface GalleryProps {
  images: GalleryImage[];
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  onClick?: (image: GalleryImage) => void;
}

// ============================================================================
// INTERACTIVE COMPONENT TYPES
// ============================================================================

/**
 * Accordion item type
 */
export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
  defaultOpen?: boolean;
}

/**
 * Accordion props
 */
export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  variant?: 'default' | 'bordered' | 'separated';
}

/**
 * Dropdown menu item type
 */
export interface DropdownItem {
  id: string;
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  href?: string;
  divider?: boolean;
  disabled?: boolean;
}

/**
 * Dropdown menu props
 */
export interface DropdownProps {
  trigger: ReactNode;
  items: DropdownItem[];
  align?: 'left' | 'right' | 'center';
  closeOnClick?: boolean;
}

/**
 * Pagination props
 */
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  maxVisible?: number;
}

/**
 * Search input props
 */
export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  debounce?: number;
  loading?: boolean;
}

/**
 * Filter props
 */
export interface FilterProps {
  filters: FilterOption[];
  activeFilters: Record<string, any>;
  onChange: (filters: Record<string, any>) => void;
  onReset?: () => void;
}

/**
 * Filter option type
 */
export interface FilterOption {
  id: string;
  label: string;
  type: 'select' | 'checkbox' | 'radio' | 'range' | 'date';
  options?: SelectOption[];
  min?: number;
  max?: number;
}

// ============================================================================
// DATE/TIME COMPONENT TYPES
// ============================================================================

/**
 * Date picker props
 */
export interface DatePickerProps {
  label?: string;
  value?: string;
  onChange: (date: string) => void;
  min?: string;
  max?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

/**
 * Time picker props
 */
export interface TimePickerProps {
  label?: string;
  value?: string;
  onChange: (time: string) => void;
  min?: string;
  max?: string;
  step?: number;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

/**
 * Countdown timer props
 */
export interface CountdownTimerProps {
  targetDate: string;
  onComplete?: () => void;
  labels?: {
    days?: string;
    hours?: string;
    minutes?: string;
    seconds?: string;
  };
}

// ============================================================================
// UTILITY COMPONENT TYPES
// ============================================================================

/**
 * Icon props
 */
export interface IconProps {
  name: string;
  size?: number | string;
  color?: string;
  className?: string;
}

/**
 * Divider props
 */
export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  children?: ReactNode;
}

/**
 * Skeleton loader props
 */
export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

/**
 * Error boundary props
 */
export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}
