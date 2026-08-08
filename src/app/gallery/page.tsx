'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

interface GallerySection {
  title: string;
  images: { src: string; alt: string }[];
}

const sections: GallerySection[] = [
  {
    title: 'Crockery & Food Presentation',
    images: [
      { src: '/images/gallery/crockery-01.jpg', alt: 'Crockery' },
      { src: '/images/gallery/crockery-02.jpg', alt: 'Crockery' },
      { src: '/images/gallery/crockery-03.jpg', alt: 'Crockery' },
      { src: '/images/gallery/crockery-04.jpg', alt: 'Crockery' },
      { src: '/images/gallery/crockery-05.jpg', alt: 'Crockery' },
    ],
  },
  {
    title: 'Kiosk at your Cafeteria',
    images: [
      { src: '/images/gallery/kiosk-01.jpg', alt: 'Kiosk' },
      { src: '/images/gallery/kiosk-02.jpg', alt: 'Kiosk' },
      { src: '/images/gallery/kiosk-03.jpg', alt: 'Kiosk' },
      { src: '/images/gallery/kiosk-04.jpg', alt: 'Kiosk' },
      { src: '/images/gallery/kiosk-05.jpg', alt: 'Kiosk' },
    ],
  },
  {
    title: 'Team',
    images: [
      { src: '/images/gallery/team-01.jpg', alt: 'Team' },
    ],
  },
  {
    title: 'Ready Food',
    images: [
      { src: '/images/gallery/ready-food-01.jpg', alt: 'Ready Food' },
      { src: '/images/gallery/ready-food-02.jpg', alt: 'Ready Food' },
      { src: '/images/gallery/ready-food-03.jpg', alt: 'Ready Food' },
    ],
  },
  {
    title: 'Relishing Experience',
    images: [
      { src: '/images/gallery/relishing-01.jpg', alt: 'Relishing' },
      { src: '/images/gallery/relishing-02.jpg', alt: 'Relishing' },
      { src: '/images/gallery/relishing-03.jpg', alt: 'Relishing' },
      { src: '/images/gallery/relishing-04.jpg', alt: 'Relishing' },
      { src: '/images/gallery/relishing-05.jpg', alt: 'Relishing' },
    ],
  },
  {
    title: 'Vehicles',
    images: [
      { src: '/images/gallery/vehicle-mahindra-zor.jpg', alt: 'Mahindra Zor' },
      { src: '/images/gallery/vehicle-tata-ace.jpg', alt: 'Tata Ace' },
      { src: '/images/gallery/vehicle-03.jpg', alt: 'Vehicle' },
    ],
  },
  {
    title: 'Infrastructure',
    images: [
      { src: '/images/gallery/infra-kitchen-hood.jpg', alt: 'Kitchen' },
      { src: '/images/gallery/infra-kitchen-equipment.jpg', alt: 'Kitchen' },
      { src: '/images/gallery/infra-kitchen-range.jpg', alt: 'Kitchen' },
      { src: '/images/gallery/infra-kitchen-dark.jpg', alt: 'Kitchen' },
      { src: '/images/gallery/infra-kitchen-pantry.jpg', alt: 'Pantry' },
    ],
  },
];

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      <Header />

      <section className="bg-white py-12">
        <div className="content-wrap">
          {sections.map((section) => (
            <div key={section.title} className="mb-16">
              <h2 className="section-heading mb-6">{section.title}</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {section.images.map((img) => (
                  <button
                    key={img.src}
                    onClick={() => setLightbox(img.src)}
                    className="relative cursor-pointer border-0 p-0 bg-transparent"
                    style={{ width: 250, height: 180 }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover hover:opacity-90 transition-opacity"
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[99999] bg-black/80 flex items-center justify-center p-8"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-white text-3xl cursor-pointer bg-transparent border-none"
            aria-label="Close"
          >
            &times;
          </button>
          <div className="relative" style={{ maxWidth: '90vw', maxHeight: '85vh' }}>
            <Image
              src={lightbox}
              alt=""
              width={1200}
              height={800}
              className="object-contain"
              style={{ maxWidth: '90vw', maxHeight: '85vh' }}
            />
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
