import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import blogData from '../../../../../scripts/data/blog.json';

export default async function BlogTagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const tagMap: Record<string, string> = {
    'bangalore-catering-experts': 'Bangalore Catering Experts',
    'employee-meal-satisfaction': 'Employee Meal Satisfaction',
    'corporate-lunch-services': 'Corporate Lunch Services',
    'office-meal-solutions': 'Office Meal Solutions',
  };
  const tagName = tagMap[slug];
  if (!tagName) notFound();

  // Only post #5 has tags
  const posts = (blogData as Array<{ slug: string; title: string; excerpt: string; author: string; publishedDate: string; readTime: number; coverImage: string }>)
    .filter((p) => p.slug.includes('corporate-catering-in-bangalore-best'));

  return (
    <>
      <Header />
      <section className="bg-white py-12">
        <div className="content-wrap max-w-4xl">
          <h1 className="section-heading mb-8">#{tagName}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/post/${post.slug}`} className="no-underline block group">
                <div className="relative w-full h-48 mb-4 overflow-hidden">
                  <Image src={post.coverImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h2 className="font-bold text-base mb-2 group-hover:underline">{post.title}</h2>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{post.author}</span>
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
