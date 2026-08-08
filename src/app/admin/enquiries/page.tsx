import { db } from '@/lib/db';
import { enquiries } from '@/lib/schema';
import { desc } from 'drizzle-orm';

export default async function AdminEnquiriesPage() {
  const allEnquiries = await db.select().from(enquiries).orderBy(desc(enquiries.createdAt));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Enquiries</h2>
        <a
          href="/api/admin/enquiries/export"
          className="btn-wah text-xs"
          download
        >
          Export CSV
        </a>
      </div>

      {allEnquiries.length === 0 ? (
        <p className="text-sm text-gray-500">No enquiries yet.</p>
      ) : (
        <div className="bg-white border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Type</th>
                <th className="p-3">Status</th>
                <th className="p-3">Source</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {allEnquiries.map((e) => (
                <tr key={e.id} className="border-b border-gray-50">
                  <td className="p-3">{e.firstName} {e.lastName}</td>
                  <td className="p-3">
                    <a href={`mailto:${e.email}`} className="text-blue-600 hover:underline">{e.email}</a>
                  </td>
                  <td className="p-3">
                    <a href={`tel:${e.phone}`} className="hover:underline">{e.phone}</a>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 text-xs bg-gray-100 rounded">{e.formType}</span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs rounded ${
                      e.status === 'new' ? 'bg-blue-100 text-blue-800' :
                      e.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="p-3 text-xs text-gray-500">{e.sourcePath || '-'}</td>
                  <td className="p-3">{e.createdAt?.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
