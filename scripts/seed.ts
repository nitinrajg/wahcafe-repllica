/**
 * Seed the database with menu, blog, gallery, and admin user data.
 * Run: npx tsx scripts/seed.ts
 * Requires DATABASE_URL env var.
 */
import { db } from '../src/lib/db';
import { menuCategories, menuItems, blogPosts, galleryImages, adminUsers } from '../src/lib/schema';
import { hashPassword } from '../src/lib/auth';
import menuData from './data/menu.json';
import blogData from './data/blog.json';

async function seed() {
  console.log('Seeding database...');

  // 1. Seed menu categories and items
  console.log('Seeding menu...');
  let catSortOrder = 0;
  for (const [catName, catDataRaw] of Object.entries(menuData)) {
    const catData = catDataRaw as any;
    const slug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '');
    const [cat] = await db
      .insert(menuCategories)
      .values({ name: catName.replace(' Menu', ''), slug, description: catData.description || null, sortOrder: catSortOrder++ })
      .returning({ id: menuCategories.id });

    let itemSortOrder = 0;
    const items = catData.items as Array<{ name: string; is_veg: boolean; description?: string }> | undefined;
    const subcategories = catData.subcategories as Record<string, Array<{ name: string; is_veg: boolean; description?: string }>> | undefined;

    if (items) {
      for (const item of items) {
        await db.insert(menuItems).values({
          categoryId: cat.id,
          name: item.name,
          description: item.description || null,
          isVeg: item.is_veg,
          sortOrder: itemSortOrder++,
        });
      }
    }
    if (subcategories) {
      for (const [subName, subItems] of Object.entries(subcategories)) {
        for (const item of subItems) {
          await db.insert(menuItems).values({
            categoryId: cat.id,
            subcategory: subName,
            name: item.name,
            description: item.description || null,
            isVeg: item.is_veg,
            sortOrder: itemSortOrder++,
          });
        }
      }
    }
    console.log(`  ✓ ${catName}: ${(items?.length || 0) + (subcategories ? Object.values(subcategories).reduce((a, b) => a + b.length, 0) : 0)} items`);
  }

  // 2. Seed blog posts
  console.log('Seeding blog posts...');
  for (const post of blogData as Array<any>) {
    await db.insert(blogPosts).values({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt || null,
      content: post.markdown,
      coverImage: post.coverImage || null,
      author: post.author,
      category: post.categories?.length ? 'Corporate Catering Bangalore' : null,
      tags: post.tags || [],
      publishedAt: new Date(post.publishedDate),
      status: 'published',
    });
  }
  console.log(`  ✓ ${(blogData as any[]).length} posts`);

  // 3. Seed gallery images
  console.log('Seeding gallery...');
  const galleryManifest = [
    { src: '/images/gallery/crockery-01.jpg', alt: 'Crockery', section: 'crockery', order: 1 },
    { src: '/images/gallery/crockery-02.jpg', alt: 'Crockery', section: 'crockery', order: 2 },
    { src: '/images/gallery/crockery-03.jpg', alt: 'Crockery', section: 'crockery', order: 3 },
    { src: '/images/gallery/crockery-04.jpg', alt: 'Crockery', section: 'crockery', order: 4 },
    { src: '/images/gallery/crockery-05.jpg', alt: 'Crockery', section: 'crockery', order: 5 },
    { src: '/images/gallery/kiosk-01.jpg', alt: 'Kiosk', section: 'kiosk', order: 6 },
    { src: '/images/gallery/kiosk-02.jpg', alt: 'Kiosk', section: 'kiosk', order: 7 },
    { src: '/images/gallery/kiosk-03.jpg', alt: 'Kiosk', section: 'kiosk', order: 8 },
    { src: '/images/gallery/kiosk-04.jpg', alt: 'Kiosk', section: 'kiosk', order: 9 },
    { src: '/images/gallery/kiosk-05.jpg', alt: 'Kiosk', section: 'kiosk', order: 10 },
    { src: '/images/gallery/team-01.jpg', alt: 'Team', section: 'team', order: 11 },
    { src: '/images/gallery/ready-food-01.jpg', alt: 'Ready Food', section: 'ready-food', order: 12 },
    { src: '/images/gallery/ready-food-02.jpg', alt: 'Ready Food', section: 'ready-food', order: 13 },
    { src: '/images/gallery/ready-food-03.jpg', alt: 'Ready Food', section: 'ready-food', order: 14 },
    { src: '/images/gallery/relishing-01.jpg', alt: 'Relishing', section: 'relishing', order: 15 },
    { src: '/images/gallery/relishing-02.jpg', alt: 'Relishing', section: 'relishing', order: 16 },
    { src: '/images/gallery/relishing-03.jpg', alt: 'Relishing', section: 'relishing', order: 17 },
    { src: '/images/gallery/relishing-04.jpg', alt: 'Relishing', section: 'relishing', order: 18 },
    { src: '/images/gallery/relishing-05.jpg', alt: 'Relishing', section: 'relishing', order: 19 },
    { src: '/images/gallery/vehicle-mahindra-zor.jpg', alt: 'Mahindra Zor', section: 'vehicles', order: 20 },
    { src: '/images/gallery/vehicle-tata-ace.jpg', alt: 'Tata Ace', section: 'vehicles', order: 21 },
    { src: '/images/gallery/vehicle-03.jpg', alt: 'Vehicle', section: 'vehicles', order: 22 },
    { src: '/images/gallery/infra-kitchen-hood.jpg', alt: 'Kitchen', section: 'infrastructure', order: 23 },
    { src: '/images/gallery/infra-kitchen-equipment.jpg', alt: 'Kitchen', section: 'infrastructure', order: 24 },
    { src: '/images/gallery/infra-kitchen-range.jpg', alt: 'Kitchen', section: 'infrastructure', order: 25 },
    { src: '/images/gallery/infra-kitchen-dark.jpg', alt: 'Kitchen', section: 'infrastructure', order: 26 },
    { src: '/images/gallery/infra-kitchen-pantry.jpg', alt: 'Pantry', section: 'infrastructure', order: 27 },
  ];
  await db.insert(galleryImages).values(galleryManifest.map((g) => ({
    src: g.src, alt: g.alt, section: g.section, sortOrder: g.order,
  })));
  console.log(`  ✓ ${galleryManifest.length} images`);

  // 4. Create admin user (password: admin123 — CHANGE THIS!)
  console.log('Creating admin user...');
  const passwordHash = await hashPassword('admin123');
  await db.insert(adminUsers).values({
    email: 'admin@wahcafe.com',
    name: 'Admin',
    passwordHash,
  });
  console.log('  ✓ admin@wahcafe.com / admin123 (CHANGE PASSWORD!)');

  console.log('\nSeeding complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
