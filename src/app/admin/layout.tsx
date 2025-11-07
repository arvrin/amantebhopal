import { getAdminUser } from '@/lib/admin/auth';
import AdminLayoutClient from '@/components/admin/AdminLayoutClient';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAdminUser();

  // If not logged in, allow login page to render
  if (!user) {
    return children;
  }

  return <AdminLayoutClient user={user}>{children}</AdminLayoutClient>;
}
