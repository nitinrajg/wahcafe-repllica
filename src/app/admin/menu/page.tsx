import { db } from '@/lib/db';
import { menuCategories, menuItems } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { asc } from 'drizzle-orm';

export default async function AdminMenuPage() {
  const categories = await db
    .select()
    .from(menuCategories)
    .orderBy(asc(menuCategories.sortOrder));

  const items = await db
    .select()
    .from(menuItems)
    .orderBy(asc(menuItems.sortOrder));

  // Group items by category
  const itemsByCategory = new Map<string, typeof items>();
  for (const item of items) {
    const list = itemsByCategory.get(item.categoryId) || [];
    list.push(item);
    itemsByCategory.set(item.categoryId, list);
  }

  return (
    <div>
      <h2 className="text-lg font-bold mb-6">Menu Management</h2>

      <p className="text-sm text-gray-500 mb-6">
        Menu items are seeded from the Wix site. Edit the seed data in{' '}
        <code className="bg-gray-100 px-1 py-0.5 text-xs">scripts/data/menu.json</code>{' '}
        and re-run the seed script to update.
      </p>

      {categories.map((cat) => (
        <div key={cat.id} className="bg-white border border-gray-200 mb-4">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-bold">{cat.name}</h3>
            <span className="text-sm text-gray-500">
              {(itemsByCategory.get(cat.id) || []).length} items
            </span>
          </div>
          <div className="p-4">
            <ul className="space-y-1">
              {(itemsByCategory.get(cat.id) || []).map((item) => (
                <li key={item.id} className="text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: item.isVeg === false ? '#e03939' : '#399f00' }} />
                  {item.name}
                  {item.subcategory && <span className="text-gray-400 text-xs">({item.subcategory})</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
