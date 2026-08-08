import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/site';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: SITE.tagline,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  metadataBase: new URL('https://wahcafe.com'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: SITE.name,
    title: SITE.tagline,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.tagline,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo/wah-cafe-logo.jpg" />
      </head>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
