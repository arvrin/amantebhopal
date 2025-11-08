import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';

if (!process.env.JWT_SECRET) {
  throw new Error(
    'CRITICAL: JWT_SECRET environment variable is required but not set. ' +
    'Admin authentication will not work without this.'
  );
}

const JWT_SECRET: string = process.env.JWT_SECRET;

export interface AdminUser {
  phone: string;
  name: string;
  role: string;
  accessLevel: string;
}

export async function getAdminUser(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token');

    if (!token) {
      return null;
    }

    const decoded = verify(token.value, JWT_SECRET) as AdminUser;
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function requireAdmin(): Promise<AdminUser> {
  const user = await getAdminUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
}
