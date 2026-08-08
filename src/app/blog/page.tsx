import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import blogData from '../../../scripts/data/blog.json';

export const metadata: Metadata = {
  title: 'Blog | Wah Cafe',
};

export default function BlogPage() {
  const posts = blogData as Array<{
    slug: string;
    title: string;
    excerpt: string;
    author: string;
    publishedDate: string;
    readTime: number;
    coverImage: string;
  }>;

  return (
    <>
      <Header />

      <section className="bg-white py-12">
        <div className="content-wrap max-w-4xl">
          <h1 className="section-heading mb-8">All Posts</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/post/${post.slug}`}
                className="no-underline block group"
              >
                {/* Cover image */}
                <div className="relative w-full h-48 mb-4 overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <h2 className="font-bold text-base mb-2 group-hover:underline" style={{ color: '#000' }}>
                  {post.title}
                </h2>

                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                  <span>{post.author}</span>
                  <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  <span>{post.readTime} min read</span>
                </div>

                {post.excerpt && (
                  <p className="text-sm text-gray-600 line-clamp-3" style={{ lineHeight: 1.6 }}>
                    {post.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
