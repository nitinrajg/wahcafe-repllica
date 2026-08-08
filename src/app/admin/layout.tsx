import { redirect } from 'next/navigation';
import { getAdminUser } from '@/lib/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Skip auth check for the login page
  // (login page is at /admin/login, which is inside this layout)

  const user = await getAdminUser();

  // If not on login page and no session, redirect
  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="/admin" className="font-bold text-lg" style={{ color: '#034230' }}>
            Wah Cafe Admin
          </a>
          <nav className="flex gap-4 text-sm">
            <a href="/admin" className="hover:underline">Dashboard</a>
            <a href="/admin/menu" className="hover:underline">Menu</a>
            <a href="/admin/blog" className="hover:underline">Blog</a>
            <a href="/admin/gallery" className="hover:underline">Gallery</a>
            <a href="/admin/enquiries" className="hover:underline">Enquiries</a>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-500">{user.name}</span>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className="text-red-500 hover:underline cursor-pointer bg-transparent border-none text-sm">
              Logout
            </button>
          </form>
        </div>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
