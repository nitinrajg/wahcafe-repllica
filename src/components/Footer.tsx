import Link from 'next/link';
import Image from 'next/image';
import { SITE, footerLinks } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8" style={{ minHeight: 517 }}>
      <div className="content-wrap">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Column 1: Navigation links */}
          <div className="flex flex-col gap-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="text-sm no-underline hover:underline"
                style={{ color: '#000' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Column 2: Contact info */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg" style={{ color: '#000' }}>
              Know more about Us
            </h3>

            {/* Phone */}
            <a
              href={`tel:${SITE.phone}`}
              className="flex items-center gap-2 text-sm no-underline hover:underline"
              style={{ color: '#000' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {SITE.phoneDisplay}
            </a>

            {/* Map */}
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm no-underline hover:underline"
              style={{ color: '#000' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              View on Google Maps
            </a>

            {/* Drop a query */}
            <Link
              href="/customizemenu"
              className="text-sm no-underline hover:underline"
              style={{ color: '#000' }}
            >
              Or drop a query here
            </Link>
          </div>
        </div>

        {/* Address */}
        <div className="text-sm mb-6" style={{ color: '#444' }}>
          Registered Office Address: {SITE.address}
        </div>

        {/* Copyright */}
        <div className="text-sm mb-4" style={{ color: '#444' }}>
          {SITE.copyright} {SITE.division}
        </div>

        {/* Bottom row */}
        <div className="flex flex-wrap gap-4 text-xs mb-6" style={{ color: '#666' }}>
          <Link href="/privacypolicy" className="no-underline hover:underline" style={{ color: '#666' }}>
            Privacy Policy
          </Link>
          <span>{SITE.poweredBy}</span>
        </div>

        {/* Social icons */}
        <div className="flex gap-4 mb-8">
          <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Image src="/images/social/instagram.png" alt="Instagram" width={24} height={24} />
          </a>
          <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Image src="/images/social/facebook.png" alt="Facebook" width={24} height={24} />
          </a>
          <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Image src="/images/social/linkedin.png" alt="LinkedIn" width={24} height={24} />
          </a>
        </div>

        {/* SEO keyword block */}
        <div className="text-[10px] leading-relaxed" style={{ color: '#999' }}>
          {SITE.seoKeywords}
        </div>
      </div>
    </footer>
  );
}
