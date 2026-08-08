import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import blogData from '../../../../../scripts/data/blog.json';

interface BlogPost {
  slug: string;
  title: string;
  markdown: string;
  excerpt: string;
  author: string;
  publishedDate: string;
  readTime: number;
  coverImage: string;
}

const posts = blogData as BlogPost[];

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article', publishedTime: post.publishedDate },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <Header />

      <article className="bg-white py-12">
        <div className="content-wrap max-w-3xl">
          {/* Cover */}
          {post.coverImage && (
            <div className="relative w-full h-64 mb-8">
              <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
            </div>
          )}

          <h1 className="page-heading text-3xl mb-4" style={{ fontSize: 32 }}>{post.title}</h1>

          <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
            <span className="font-bold">{post.author}</span>
            <span>{new Date(post.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            <span>{post.readTime} min read</span>
          </div>

          {/* Render markdown content */}
          <div
            className="prose prose-sm max-w-none"
            style={{ lineHeight: 1.8 }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.markdown}</ReactMarkdown>
          </div>
        </div>
      </article>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
