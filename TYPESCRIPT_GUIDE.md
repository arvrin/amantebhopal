# TypeScript Guide - Amante Restaurant Website

Complete guide to TypeScript usage, patterns, and best practices for the Amante Restaurant website project.

## Table of Contents

- [Overview](#overview)
- [Type System Architecture](#type-system-architecture)
- [Type Definitions](#type-definitions)
- [Common Patterns](#common-patterns)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Adding New Types](#adding-new-types)

## Overview

This project uses **strict TypeScript** with comprehensive type coverage across:
- All components (React/Next.js)
- All API routes
- Database operations (Supabase)
- Form handling and validation (Zod + React Hook Form)
- Utility functions

**TypeScript Configuration**: `tsconfig.json`
- Strict mode enabled
- No implicit any
- Strict null checks
- No unused locals/parameters
- No implicit returns

## Type System Architecture

```
src/types/
├── index.ts          # Core application types (forms, models, responses)
├── database.ts       # Supabase database types (auto-generated)
├── menu.ts           # Menu system types
├── api.ts            # API request/response types
├── components.ts     # Component prop types
├── forms.ts          # Form-related types
└── utils.ts          # Utility and helper types
```

### Type Import Patterns

```typescript
// Core types from index.ts
import type { ReservationFormData, ApiResponse } from '@/types';

// Database types
import type { Database } from '@/types/database';
import type { Reservation, ReservationInsert } from '@/lib/supabase';

// API types
import type { FormSubmissionResponse, ApiErrorCode } from '@/types/api';

// Component types
import type { ButtonProps, InputProps } from '@/types/components';

// Form types
import type { FormState, ValidationResult } from '@/types/forms';

// Utility types
import type { Result, AsyncResult, Nullable } from '@/types/utils';
```

## Type Definitions

### 1. Form Data Types

All form data types are defined with strict validation:

```typescript
// src/types/index.ts

export interface ReservationFormData {
  date: string; // ISO format: "YYYY-MM-DD"
  time: '11:00 AM' | '1:00 PM' | '3:00 PM' | '7:00 PM' | '9:00 PM' | '11:00 PM';
  partySize: number; // 1-20
  spacePreference: 'Rooftop Restaurant' | 'Lounge' | 'Café' | 'Any';
  occasion?: string;
  name: string;
  phone: string; // Format: +91XXXXXXXXXX
  email: string;
  specialRequests?: string;
  agreeToSMS: boolean;
}
```

### 2. API Response Types

Standard API responses follow a consistent pattern:

```typescript
// src/types/api.ts

export type ApiResponse<T = any> =
  | { success: true; data: T; message?: string }
  | { success: false; error: ApiError };

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}
```

**Usage in API Routes:**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import type { ApiResponse, FormSubmissionResponse } from '@/types/api';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // ... handle request

    const response: ApiResponse<FormSubmissionResponse> = {
      success: true,
      data: {
        id: 'reservation-123',
        message: 'Reservation created successfully'
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    const errorResponse: ApiResponse = {
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Something went wrong'
      }
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}
```

### 3. Component Props

All components must have properly typed props:

```typescript
// src/components/ui/Button.tsx

import type { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  ...props
}: ButtonProps) {
  // Implementation
}
```

### 4. Database Types

Database operations use Supabase-generated types:

```typescript
import { getServerClient } from '@/lib/supabase';
import type { ReservationInsert } from '@/lib/supabase';

// Inserting data
const data: ReservationInsert = {
  date: '2025-11-15',
  time: '7:00 PM',
  party_size: 4,
  name: 'John Doe',
  phone: '+919876543210',
  email: 'john@example.com',
  agree_to_sms: true,
  status: 'pending'
};

const { data: reservation, error } = await supabase
  .from('reservations')
  .insert(data)
  .select()
  .single();
```

### 5. Form Validation with Zod

Zod schemas provide runtime validation and type inference:

```typescript
import { z } from 'zod';

export const reservationSchema = z.object({
  date: z.string(),
  time: z.enum(['11:00 AM', '1:00 PM', '3:00 PM', '7:00 PM', '9:00 PM', '11:00 PM']),
  partySize: z.number().int().min(1).max(20),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  // ... other fields
});

// Type is automatically inferred from schema
export type ReservationFormData = z.infer<typeof reservationSchema>;
```

## Common Patterns

### 1. Type Guards

Use type guards to narrow types safely:

```typescript
import type { ApiResponse } from '@/types/api';

function isApiError(response: ApiResponse): response is { success: false; error: ApiError } {
  return response.success === false;
}

// Usage
const response = await fetch('/api/reservations');
const data: ApiResponse = await response.json();

if (isApiError(data)) {
  console.error(data.error.message);
} else {
  console.log(data.data);
}
```

### 2. Generic Functions

Create reusable typed functions:

```typescript
async function fetchApi<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  return response.json();
}

// Usage with type inference
const reservations = await fetchApi<Reservation[]>('/api/reservations');
```

### 3. Result Type Pattern

Use Result types for operations that can fail:

```typescript
import type { Result } from '@/types/utils';

async function validateEmail(email: string): Promise<Result<string, Error>> {
  try {
    // Validation logic
    return { success: true, data: email };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}

// Usage
const result = await validateEmail('test@example.com');

if (result.success) {
  console.log('Valid email:', result.data);
} else {
  console.error('Invalid email:', result.error.message);
}
```

### 4. Branded Types

Prevent mixing similar primitive types:

```typescript
import type { Brand } from '@/types/utils';

type UserId = Brand<string, 'UserId'>;
type ReservationId = Brand<string, 'ReservationId'>;

function getUser(id: UserId) { /* ... */ }
function getReservation(id: ReservationId) { /* ... */ }

const userId = '123' as UserId;
const reservationId = '456' as ReservationId;

getUser(userId);              // OK
getUser(reservationId);       // Type Error!
```

### 5. Partial Updates

Use utility types for partial updates:

```typescript
import type { PartialExcept } from '@/types/utils';

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

// ID is required, everything else optional
type UpdateUser = PartialExcept<User, 'id'>;

function updateUser(data: UpdateUser) {
  // Implementation
}

updateUser({ id: '123', name: 'John' }); // OK
updateUser({ name: 'John' }); // Error: id is required
```

## Best Practices

### 1. Always Type Function Parameters and Returns

```typescript
// Good
function calculateTotal(price: number, tax: number): number {
  return price + (price * tax);
}

// Bad
function calculateTotal(price, tax) {
  return price + (price * tax);
}
```

### 2. Use Interfaces for Component Props

```typescript
// Good
interface UserCardProps {
  name: string;
  email: string;
  avatar?: string;
}

export function UserCard({ name, email, avatar }: UserCardProps) {
  // ...
}

// Avoid
export function UserCard({ name, email, avatar }: any) {
  // ...
}
```

### 3. Avoid `any` - Use `unknown` Instead

```typescript
// Good
function processData(data: unknown): void {
  if (typeof data === 'string') {
    // TypeScript knows data is a string here
    console.log(data.toUpperCase());
  }
}

// Bad
function processData(data: any): void {
  console.log(data.toUpperCase()); // No type safety
}
```

### 4. Use Const Assertions

```typescript
// Good
const ROUTES = {
  HOME: '/',
  MENU: '/menu',
  RESERVATIONS: '/reservations'
} as const;

type Route = typeof ROUTES[keyof typeof ROUTES];
// Type: '/' | '/menu' | '/reservations'

// Bad
const ROUTES = {
  HOME: '/',
  MENU: '/menu',
  RESERVATIONS: '/reservations'
};
// Type: { HOME: string; MENU: string; RESERVATIONS: string }
```

### 5. Proper Null Handling

```typescript
// Good
function getUser(id: string): User | null {
  const user = users.find(u => u.id === id);
  return user ?? null;
}

const user = getUser('123');
if (user !== null) {
  console.log(user.name); // Safe
}

// Bad
function getUser(id: string): User {
  return users.find(u => u.id === id); // Type error
}
```

### 6. Use Type Imports

```typescript
// Good
import type { User } from '@/types';

// This is only a type import, will be removed at compile time
const users: User[] = [];

// Also good (inline type import)
import { getUsers } from './api';
import type { User } from '@/types';
```

## Troubleshooting

### Common Type Errors

#### 1. "Property does not exist on type"

**Problem:**
```typescript
const data = await fetchApi('/api/users');
console.log(data.users); // Error: Property 'users' does not exist
```

**Solution:**
```typescript
interface UsersResponse {
  users: User[];
}

const data = await fetchApi<UsersResponse>('/api/users');
console.log(data.users); // OK
```

#### 2. "Type 'X' is not assignable to type 'Y'"

**Problem:**
```typescript
const status: 'pending' | 'confirmed' = 'pending';
const obj = { status }; // obj.status is type 'string'
obj.status = 'confirmed'; // Error
```

**Solution:**
```typescript
const obj = { status } as const;
// OR
const obj: { status: 'pending' | 'confirmed' } = { status: 'pending' };
```

#### 3. "Argument of type 'X | undefined' is not assignable"

**Problem:**
```typescript
function greet(name: string) {
  console.log(`Hello, ${name}`);
}

const userName = user?.name;
greet(userName); // Error: userName might be undefined
```

**Solution:**
```typescript
// Option 1: Use non-null assertion (if you're sure)
greet(userName!);

// Option 2: Provide default
greet(userName ?? 'Guest');

// Option 3: Check first
if (userName) {
  greet(userName);
}
```

### Type Checking Commands

```bash
# Full type check
npx tsc --noEmit

# Check specific file
npx tsc --noEmit src/app/page.tsx

# Watch mode
npx tsc --noEmit --watch

# Build (includes type checking)
npm run build
```

## Adding New Types

### 1. Adding Form Types

**Step 1:** Create Zod schema in `src/lib/validations.ts`
```typescript
export const newFormSchema = z.object({
  field1: z.string(),
  field2: z.number(),
  // ...
});

export type NewFormData = z.infer<typeof newFormSchema>;
```

**Step 2:** Export from `src/types/index.ts`
```typescript
export type { NewFormData } from './validations';
```

### 2. Adding API Types

Add to `src/types/api.ts`:
```typescript
export interface NewApiRequest {
  // Request fields
}

export interface NewApiResponse {
  // Response fields
}
```

### 3. Adding Component Types

Add to `src/types/components.ts`:
```typescript
export interface NewComponentProps {
  // Props
}
```

### 4. Adding Database Types

Database types are auto-generated. To update:

```bash
# After schema changes in Supabase
npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/types/database.ts
```

## Type Safety Checklist

Before committing code, ensure:

- [ ] All function parameters are typed
- [ ] All function return types are explicit
- [ ] No `any` types (use `unknown` if needed)
- [ ] All component props have interfaces
- [ ] All API routes have typed request/response
- [ ] Database operations use proper types
- [ ] Forms use Zod schemas for validation
- [ ] `npx tsc --noEmit` passes with 0 errors
- [ ] No unused variables or imports
- [ ] JSDoc comments on public functions

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Next.js with TypeScript](https://nextjs.org/docs/app/building-your-application/configuring/typescript)
- [Zod Documentation](https://zod.dev/)
- [Supabase TypeScript Support](https://supabase.com/docs/guides/api/typescript-support)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

---

**Last Updated:** October 25, 2025
**Maintained By:** TypeScript Specialist
**Project:** Amante Restaurant Website
