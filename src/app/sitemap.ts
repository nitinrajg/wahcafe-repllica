import type { MetadataRoute } from 'next';
import blogData from '../../scripts/data/blog.json';

const BASE = 'https://wahcafe.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = blogData as Array<{ slug: string }>;

  const staticPages = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${BASE}/aboutus`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE}/serviceandstandards`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE}/menu`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE}/gallery`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE}/customizemenu`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${BASE}/privacypolicy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
  ];

  const blogPages = posts.map((post) => ({
    url: `${BASE}/blog/post/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
