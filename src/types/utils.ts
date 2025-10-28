/**
 * Type Utility Definitions
 *
 * Advanced TypeScript utility types and helper types for the application.
 * These provide reusable type transformations and patterns.
 */

// ============================================================================
// PARTIAL UTILITIES
// ============================================================================

/**
 * Make specific properties optional while keeping others required
 *
 * @example
 * type User = { id: string; name: string; email: string; age: number };
 * type UpdateUser = PartialExcept<User, 'id'>;
 * // Result: { id: string; name?: string; email?: string; age?: number }
 */
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;

/**
 * Make specific properties required while keeping others optional
 *
 * @example
 * type User = { id?: string; name?: string; email?: string };
 * type NewUser = RequireOnly<User, 'name' | 'email'>;
 * // Result: { id?: string; name: string; email: string }
 */
export type RequireOnly<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;

/**
 * Make all properties and nested properties optional
 *
 * @example
 * type User = { id: string; profile: { name: string; age: number } };
 * type DeepPartialUser = DeepPartial<User>;
 * // Result: { id?: string; profile?: { name?: string; age?: number } }
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Make all properties and nested properties required
 *
 * @example
 * type User = { id?: string; profile?: { name?: string } };
 * type RequiredUser = DeepRequired<User>;
 * // Result: { id: string; profile: { name: string } }
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

// ============================================================================
// OBJECT UTILITIES
// ============================================================================

/**
 * Make all properties readonly and nested properties readonly
 *
 * @example
 * type User = { id: string; profile: { name: string } };
 * type ImmutableUser = DeepReadonly<User>;
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * Pick properties by value type
 *
 * @example
 * type User = { id: string; name: string; age: number; active: boolean };
 * type StringProps = PickByType<User, string>;
 * // Result: { id: string; name: string }
 */
export type PickByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};

/**
 * Omit properties by value type
 *
 * @example
 * type User = { id: string; name: string; age: number; active: boolean };
 * type NonStringProps = OmitByType<User, string>;
 * // Result: { age: number; active: boolean }
 */
export type OmitByType<T, U> = {
  [P in keyof T as T[P] extends U ? never : P]: T[P];
};

/**
 * Extract keys of a type that match a specific type
 *
 * @example
 * type User = { id: string; name: string; age: number; active: boolean };
 * type StringKeys = KeysOfType<User, string>;
 * // Result: 'id' | 'name'
 */
export type KeysOfType<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

/**
 * Make specific properties nullable
 *
 * @example
 * type User = { id: string; name: string; email: string };
 * type NullableEmailUser = Nullable<User, 'email'>;
 * // Result: { id: string; name: string; email: string | null }
 */
export type Nullable<T, K extends keyof T = keyof T> = {
  [P in keyof T]: P extends K ? T[P] | null : T[P];
};

/**
 * Make specific properties non-nullable
 *
 * @example
 * type User = { id: string | null; name: string | null };
 * type NonNullableId = NonNullableKeys<User, 'id'>;
 * // Result: { id: string; name: string | null }
 */
export type NonNullableKeys<T, K extends keyof T = keyof T> = {
  [P in keyof T]: P extends K ? NonNullable<T[P]> : T[P];
};

// ============================================================================
// PROMISE UTILITIES
// ============================================================================

/**
 * Extract the resolved type of a Promise
 *
 * @example
 * type UserPromise = Promise<{ id: string; name: string }>;
 * type User = Awaited<UserPromise>;
 * // Result: { id: string; name: string }
 */
export type Awaited<T> = T extends Promise<infer U> ? U : T;

/**
 * Extract the resolved type of a Promise or return the type if not a Promise
 *
 * @example
 * type Result1 = UnwrapPromise<Promise<string>>;  // string
 * type Result2 = UnwrapPromise<string>;           // string
 */
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

// ============================================================================
// FUNCTION UTILITIES
// ============================================================================

/**
 * Extract the return type of a function, unwrapping promises
 *
 * @example
 * async function getUser() { return { id: '1', name: 'John' }; }
 * type User = AsyncReturnType<typeof getUser>;
 * // Result: { id: string; name: string }
 */
export type AsyncReturnType<T extends (...args: any) => Promise<any>> = Awaited<ReturnType<T>>;

/**
 * Make a function's parameters optional
 *
 * @example
 * type Fn = (a: string, b: number) => void;
 * type OptionalFn = OptionalParameters<Fn>;
 * // Result: (a?: string, b?: number) => void
 */
export type OptionalParameters<T extends (...args: any) => any> = (
  ...args: Partial<Parameters<T>>
) => ReturnType<T>;

// ============================================================================
// ARRAY UTILITIES
// ============================================================================

/**
 * Get the element type of an array
 *
 * @example
 * type Users = Array<{ id: string; name: string }>;
 * type User = ArrayElement<Users>;
 * // Result: { id: string; name: string }
 */
export type ArrayElement<T> = T extends (infer E)[] ? E : T extends ReadonlyArray<infer E> ? E : never;

/**
 * Make an array type non-empty
 *
 * @example
 * type Users = NonEmptyArray<User>;
 * // Ensures array has at least one element
 */
export type NonEmptyArray<T> = [T, ...T[]];

// ============================================================================
// CONDITIONAL UTILITIES
// ============================================================================

/**
 * Require at least one of the specified properties
 *
 * @example
 * type Contact = { email?: string; phone?: string; address?: string };
 * type ValidContact = RequireAtLeastOne<Contact, 'email' | 'phone'>;
 * // Must have either email or phone (or both)
 */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

/**
 * Require exactly one of the specified properties
 *
 * @example
 * type Auth = { password?: string; token?: string; oauth?: string };
 * type ValidAuth = RequireExactlyOne<Auth, 'password' | 'token' | 'oauth'>;
 * // Must have exactly one authentication method
 */
export type RequireExactlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, never>>;
  }[Keys];

/**
 * Create a union of property value types
 *
 * @example
 * type User = { id: string; name: string; age: number };
 * type Values = ValueOf<User>;
 * // Result: string | number
 */
export type ValueOf<T> = T[keyof T];

// ============================================================================
// RESULT/ERROR TYPES
// ============================================================================

/**
 * Result type for operations that can succeed or fail
 *
 * @example
 * function parseJSON(str: string): Result<object, Error> {
 *   try {
 *     return { success: true, data: JSON.parse(str) };
 *   } catch (error) {
 *     return { success: false, error: error as Error };
 *   }
 * }
 */
export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

/**
 * Async result type
 *
 * @example
 * async function fetchUser(): AsyncResult<User, ApiError> {
 *   try {
 *     const user = await api.getUser();
 *     return { success: true, data: user };
 *   } catch (error) {
 *     return { success: false, error: error as ApiError };
 *   }
 * }
 */
export type AsyncResult<T, E = Error> = Promise<Result<T, E>>;

/**
 * Option type (value or null)
 *
 * @example
 * function findUser(id: string): Option<User> {
 *   return users.find(u => u.id === id) ?? null;
 * }
 */
export type Option<T> = T | null;

// ============================================================================
// STRING UTILITIES
// ============================================================================

/**
 * Create a type from a string literal
 *
 * @example
 * type HttpMethod = StringLiteral<'GET' | 'POST' | 'PUT' | 'DELETE'>;
 */
export type StringLiteral<T> = T extends string ? (string extends T ? never : T) : never;

/**
 * Split a string by a delimiter
 *
 * @example
 * type Path = 'user/profile/settings';
 * type Parts = Split<Path, '/'>;
 * // Result: ['user', 'profile', 'settings']
 */
export type Split<S extends string, D extends string> = S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : [S];

/**
 * Join string array with delimiter
 *
 * @example
 * type Parts = ['user', 'profile', 'settings'];
 * type Path = Join<Parts, '/'>;
 * // Result: 'user/profile/settings'
 */
export type Join<T extends string[], D extends string> = T extends [
  infer F extends string,
  ...infer R extends string[]
]
  ? R extends []
    ? F
    : `${F}${D}${Join<R, D>}`
  : '';

// ============================================================================
// BRANDED TYPES
// ============================================================================

/**
 * Create a branded type to prevent mixing similar primitive types
 *
 * @example
 * type UserId = Brand<string, 'UserId'>;
 * type OrderId = Brand<string, 'OrderId'>;
 *
 * function getUser(id: UserId) { ... }
 * function getOrder(id: OrderId) { ... }
 *
 * const userId = '123' as UserId;
 * const orderId = '456' as OrderId;
 *
 * getUser(userId);    // OK
 * getUser(orderId);   // Error: Type 'OrderId' is not assignable to type 'UserId'
 */
export type Brand<T, B> = T & { __brand: B };

// ============================================================================
// MERGE UTILITIES
// ============================================================================

/**
 * Deep merge two types
 *
 * @example
 * type A = { a: string; b: { c: string } };
 * type B = { b: { d: number }; e: boolean };
 * type Merged = DeepMerge<A, B>;
 * // Result: { a: string; b: { c: string; d: number }; e: boolean }
 */
export type DeepMerge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof T
    ? K extends keyof U
      ? T[K] extends object
        ? U[K] extends object
          ? DeepMerge<T[K], U[K]>
          : U[K]
        : U[K]
      : T[K]
    : K extends keyof U
    ? U[K]
    : never;
};

// ============================================================================
// DATABASE TYPES
// ============================================================================

/**
 * Extract insert type for database tables
 */
export type InsertType<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>;

/**
 * Extract update type for database tables
 */
export type UpdateType<T> = Partial<InsertType<T>>;

/**
 * Database record with timestamps
 */
export interface WithTimestamps {
  created_at: string;
  updated_at: string;
}

/**
 * Database record with ID
 */
export interface WithId {
  id: string;
}

/**
 * Complete database record
 */
export type DatabaseRecord = WithId & WithTimestamps;

// ============================================================================
// TYPE GUARDS
// ============================================================================

/**
 * Check if value is defined (not null or undefined)
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Check if value is null or undefined
 */
export function isNullish<T>(value: T | null | undefined): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Check if value is a Result success
 */
export function isSuccess<T, E>(result: Result<T, E>): result is { success: true; data: T } {
  return result.success === true;
}

/**
 * Check if value is a Result error
 */
export function isError<T, E>(result: Result<T, E>): result is { success: false; error: E } {
  return result.success === false;
}

// ============================================================================
// NEXT.JS SPECIFIC UTILITIES
// ============================================================================

/**
 * Next.js page props type
 */
export interface PageProps<
  Params extends Record<string, string> = Record<string, string>,
  SearchParams extends Record<string, string | string[] | undefined> = Record<
    string,
    string | string[] | undefined
  >
> {
  params: Promise<Params>;
  searchParams: Promise<SearchParams>;
}

/**
 * Next.js layout props type
 */
export interface LayoutProps<Params extends Record<string, string> = Record<string, string>> {
  children: React.ReactNode;
  params: Promise<Params>;
}

/**
 * Next.js metadata type
 */
export interface Metadata {
  title?: string | { default: string; template?: string };
  description?: string;
  keywords?: string[];
  authors?: Array<{ name: string; url?: string }>;
  openGraph?: {
    title?: string;
    description?: string;
    images?: string[];
    type?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    images?: string[];
  };
}
