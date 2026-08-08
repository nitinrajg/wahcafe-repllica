'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { navLinks } from '@/lib/site';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    if (menuOpen) {
      document.addEventListener('keydown', handler);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      {/* Sticky header */}
      <header
        className="sticky top-0 z-50 bg-white flex items-center justify-between"
        style={{ minHeight: 121, paddingLeft: 24, paddingRight: 24 }}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/logo/wah-cafe-logo.jpg"
            alt="Wah Cafe"
            width={220}
            height={110}
            className="object-cover"
            priority
          />
        </Link>

        {/* Hamburger button */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="flex flex-col items-center gap-1 p-3 cursor-pointer bg-transparent border-none"
          aria-label="Menu"
        >
          {/* 3-line hamburger icon */}
          <svg width="30" height="18" viewBox="0 0 30 18" fill="none">
            <rect y="0" width="30" height="2" fill="#000" />
            <rect y="8" width="30" height="2" fill="#000" />
            <rect y="16" width="30" height="2" fill="#000" />
          </svg>
          <span className="text-xs font-bold mt-1">Menu</span>
        </button>
      </header>

      {/* Drawer overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[99999] flex"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />

          {/* Drawer panel */}
          <nav className="relative ml-auto w-full max-w-[400px] bg-white h-full overflow-y-auto flex flex-col p-8">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 p-2 cursor-pointer bg-transparent border-none"
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Logo in drawer */}
            <Image
              src="/images/logo/wah-cafe-logo.jpg"
              alt="Wah Cafe"
              width={160}
              height={80}
              className="mb-8 object-contain"
            />

            {/* Nav links */}
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-bold text-black no-underline py-2 border-b border-gray-100 hover:text-forest transition-colors"
                  style={{ color: '#000' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
