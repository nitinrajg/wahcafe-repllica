'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const slides = [
  { src: '/images/home/hero-buffet-spread.jpg', alt: 'Wah Cafe Buffet Spread' },
  { src: '/images/home/hero-chafing-dome-setup.jpg', alt: 'Chafing Dome Setup' },
  { src: '/images/home/hero-buffet-plates.jpg', alt: 'Buffet with Plates' },
  { src: '/images/home/hero-wah-cafe-kiosk.jpg', alt: 'Wah Cafe Kiosk' },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  // Auto-slideshow every 4 seconds
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full bg-white overflow-hidden" style={{ height: '60vh', minHeight: 400 }}>
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Overlay text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/80 p-8 md:p-12 max-w-2xl text-center">
          <h2 className="hero-title mb-4">Delicious Meals Delivered, Wherever You Are!</h2>
          <p className="hero-desc">
            Hassle-free, professional meal solutions tailored to your business needs.
            Whether it&apos;s for meetings, team events, or client gatherings, we handle
            everything — from menu planning to on-time delivery and setup — ensuring
            your focus remains on the event. Our diverse menu options cater to various
            tastes and dietary preferences, combining quality, freshness, and presentation.
            With seamless coordination and exceptional service, we make catering for
            corporate events simple, efficient, and memorable for all attendees.
          </p>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="w-2 h-2 rounded-full transition-colors"
            style={{ background: i === current ? '#034230' : '#ccc' }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
