import { db } from '@/lib/db';
import { galleryImages } from '@/lib/schema';
import { asc } from 'drizzle-orm';

export default async function AdminGalleryPage() {
  const images = await db.select().from(galleryImages).orderBy(asc(galleryImages.sortOrder));

  return (
    <div>
      <h2 className="text-lg font-bold mb-6">Gallery Management</h2>
      <p className="text-sm text-gray-500 mb-6">
        Gallery images are seeded from the Wix site. Upload new images via Vercel Blob in the future.
      </p>

      {images.length === 0 ? (
        <p className="text-sm text-gray-500">No images yet. Run the gallery seed script.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="bg-white border border-gray-200 p-2">
              <div className="aspect-square bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                {img.section}
              </div>
              <p className="text-xs mt-2 truncate">{img.alt || img.src.split('/').pop()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
