import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import menuData from '../../../scripts/data/menu.json';

export const metadata: Metadata = {
  title: 'Menu at Wah Cafe',
};

export default function MenuPage() {
  const categories = Object.entries(menuData);

  return (
    <>
      <Header />

      {/* Menu Hero */}
      <section className="bg-white py-12">
        <div className="content-wrap max-w-3xl text-center">
          <h1 className="page-heading mb-4">Menu at Wah Cafe</h1>
          <p className="text-sm" style={{ lineHeight: 1.6 }}>
            Explore the delightful menu at Wah Cafe, where every dish is a celebration of flavors!
            From hearty breakfast options to soul-satisfying meals, our diverse menu offers
            something for every palate. Ideal for casual dining or takeout, Wah Cafe is your
            go-to destination for delicious food served with warmth and care. Taste the difference today!
          </p>
        </div>
      </section>

      {/* Menu Sections */}
      {categories.map(([categoryName, category], catIdx) => {
        const isLunch = categoryName === 'Lunch Menu';
        const bgColor = catIdx % 2 === 0 ? '#f0f0f0' : '#ffffff';
        const catAny = category as any;
        const items = catAny.items as Array<{ name: string; is_veg: boolean; description?: string }> | undefined;
        const subcategories = catAny.subcategories as Record<string, Array<{ name: string; is_veg: boolean; description?: string }>> | undefined;

        return (
          <section key={categoryName} className="py-16" style={{ background: bgColor }}>
            <div className="content-wrap max-w-4xl">
              <h2 className="section-heading mb-4">{categoryName.replace(' Menu', '')} Menu</h2>
              {'description' in category && category.description && (
                <p className="text-center text-sm mb-8 max-w-2xl mx-auto" style={{ lineHeight: 1.6 }}>
                  {String(category.description)}
                </p>
              )}

              {/* Lunch uses tabs (subcategory groups); others use flat list */}
              {isLunch && subcategories ? (
                <div className="space-y-8">
                  {Object.entries(subcategories).map(([subName, subItems]) => (
                    <div key={subName}>
                      <h3 className="font-bold text-base mb-3 text-center" style={{ color: '#034230' }}>
                        {subName}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {subItems.map((item) => (
                          <div key={item.name} className="text-sm text-center py-1">
                            {item.name}
                            {item.description && (
                              <span className="text-gray-500 text-xs"> ({item.description})</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : subcategories ? (
                <div className="space-y-6">
                  {Object.entries(subcategories).map(([subName, subItems]) => (
                    <div key={subName}>
                      <h3 className="font-bold text-sm mb-2 text-center" style={{ color: '#034230' }}>
                        {subName}
                      </h3>
                      <div className="space-y-1">
                        {subItems.map((item) => (
                          <div key={item.name} className="text-sm text-center py-1">
                            {item.name}
                            {item.description && (
                              <span className="text-gray-500 text-xs"> ({item.description})</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : items ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {items.map((item) => (
                    <div key={item.name} className="text-sm text-center py-1">
                      {item.name}
                      {item.description && (
                        <span className="text-gray-500 text-xs"> ({item.description})</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        );
      })}

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
