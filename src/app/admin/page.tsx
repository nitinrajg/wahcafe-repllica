import { db } from '@/lib/db';
import { enquiries, blogPosts, menuItems } from '@/lib/schema';
import { count } from 'drizzle-orm';

export default async function AdminDashboard() {
  const [enquiryCount] = await db.select({ value: count() }).from(enquiries);
  const [blogCount] = await db.select({ value: count() }).from(blogPosts);
  const [menuCount] = await db.select({ value: count() }).from(menuItems);

  const recentEnquiries = await db
    .select()
    .from(enquiries)
    .orderBy(enquiries.createdAt)
    .limit(5);

  return (
    <div>
      <h2 className="text-lg font-bold mb-6">Dashboard</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 border border-gray-200">
          <p className="text-sm text-gray-500">Enquiries</p>
          <p className="text-2xl font-bold">{enquiryCount?.value ?? 0}</p>
        </div>
        <div className="bg-white p-4 border border-gray-200">
          <p className="text-sm text-gray-500">Blog Posts</p>
          <p className="text-2xl font-bold">{blogCount?.value ?? 0}</p>
        </div>
        <div className="bg-white p-4 border border-gray-200">
          <p className="text-sm text-gray-500">Menu Items</p>
          <p className="text-2xl font-bold">{menuCount?.value ?? 0}</p>
        </div>
      </div>

      {/* Recent Enquiries */}
      <div className="bg-white border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-bold">Recent Enquiries</h3>
        </div>
        {recentEnquiries.length === 0 ? (
          <p className="p-4 text-sm text-gray-500">No enquiries yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Type</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentEnquiries.map((e) => (
                <tr key={e.id} className="border-b border-gray-50">
                  <td className="p-3">{e.firstName} {e.lastName}</td>
                  <td className="p-3">{e.email}</td>
                  <td className="p-3">{e.phone}</td>
                  <td className="p-3">{e.formType}</td>
                  <td className="p-3">{e.createdAt?.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
