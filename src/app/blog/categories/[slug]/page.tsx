import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import blogData from '../../../../../scripts/data/blog.json';

export default async function BlogCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // Category slug → title mapping
  const categoryMap: Record<string, string> = {
    'corporate-catering-bangalore': 'Corporate Catering Bangalore',
  };
  const categoryName = categoryMap[slug];
  if (!categoryName) notFound();

  const posts = (blogData as Array<{ slug: string; title: string; excerpt: string; author: string; publishedDate: string; readTime: number; coverImage: string }>)
    .filter((p) => p.title.toLowerCase().includes('corporate catering'));

  return (
    <>
      <Header />
      <section className="bg-white py-12">
        <div className="content-wrap max-w-4xl">
          <h1 className="section-heading mb-8">{categoryName}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/post/${post.slug}`} className="no-underline block group">
                <div className="relative w-full h-48 mb-4 overflow-hidden">
                  <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h2 className="font-bold text-base mb-2 group-hover:underline">{post.title}</h2>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{post.author}</span>
                  <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  <span>{post.readTime} min read</span>
                </div>
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
