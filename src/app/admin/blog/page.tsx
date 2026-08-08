import { db } from '@/lib/db';
import { blogPosts } from '@/lib/schema';
import { desc } from 'drizzle-orm';

export default async function AdminBlogPage() {
  const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.publishedAt));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Blog Posts</h2>
        <p className="text-sm text-gray-500">
          Posts are seeded from the Wix site. Edit the seed data in{' '}
          <code className="bg-gray-100 px-1 py-0.5 text-xs">scripts/data/blog.json</code>{' '}
          and re-run the seed script to update.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-gray-500">No posts yet. Run the blog seed script.</p>
      ) : (
        <div className="bg-white border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-left">
                <th className="p-3">Title</th>
                <th className="p-3">Author</th>
                <th className="p-3">Status</th>
                <th className="p-3">Published</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-gray-50">
                  <td className="p-3">
                    <a href={`/blog/post/${post.slug}`} className="hover:underline" target="_blank" rel="noopener noreferrer">
                      {post.title}
                    </a>
                  </td>
                  <td className="p-3">{post.author}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs rounded ${post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="p-3">{post.publishedAt?.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
