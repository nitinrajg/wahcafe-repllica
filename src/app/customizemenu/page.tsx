import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import LeadForm from '@/components/LeadForm';
import { seoKeywords } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Customize Menu | Wah Cafe',
};

export default function CustomizeMenuPage() {
  return (
    <>
      <Header />

      <section className="bg-white py-16">
        <div className="content-wrap max-w-2xl text-center">
          <h2 className="section-heading mb-8">
            Drop your details here and We will connect back soon
          </h2>
          <LeadForm formType="customize-menu" />
        </div>
      </section>

      {/* SEO keyword footer block (verbatim from Wix) */}
      <section className="bg-white py-8 border-t border-gray-100">
        <div className="content-wrap">
          <p className="text-[10px] leading-relaxed text-center" style={{ color: '#999' }}>
            {seoKeywords}
          </p>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
