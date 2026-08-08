import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export const metadata: Metadata = {
  title: 'Privacy Policy | Wah Cafe',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <section className="bg-white py-16">
        <div className="content-wrap max-w-3xl">
          <h1 className="page-heading mb-8">Privacy Policy</h1>
          <p className="text-sm mb-4" style={{ lineHeight: 1.7 }}>
            At Wah Cafe, we respect your privacy and are committed to protecting your personal
            information. This Privacy Policy outlines how we collect, use, and safeguard your
            data when you visit our website or use our services.
          </p>
          <h2 className="font-bold text-base mb-3 mt-6" style={{ color: '#034230' }}>
            Information We Collect
          </h2>
          <p className="text-sm mb-4" style={{ lineHeight: 1.7 }}>
            We may collect personal information such as your name, email address, phone number,
            and company details when you fill out our contact or enquiry forms. We also collect
            non-personal information such as browser type, device information, and usage data
            through cookies and analytics tools.
          </p>
          <h2 className="font-bold text-base mb-3 mt-6" style={{ color: '#034230' }}>
            How We Use Your Information
          </h2>
          <p className="text-sm mb-4" style={{ lineHeight: 1.7 }}>
            Your information is used to respond to your enquiries, provide our catering services,
            improve our website, and communicate with you about our offerings. We do not sell,
            trade, or rent your personal information to third parties.
          </p>
          <h2 className="font-bold text-base mb-3 mt-6" style={{ color: '#034230' }}>
            Data Security
          </h2>
          <p className="text-sm mb-4" style={{ lineHeight: 1.7 }}>
            We implement industry-standard security measures to protect your personal information.
            However, no method of transmission over the Internet is 100% secure, and we cannot
            guarantee absolute security.
          </p>
          <h2 className="font-bold text-base mb-3 mt-6" style={{ color: '#034230' }}>
            Contact Us
          </h2>
          <p className="text-sm" style={{ lineHeight: 1.7 }}>
            If you have questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:connect@wahcafe.com" className="text-blue-600 underline">
              connect@wahcafe.com
            </a>.
          </p>
        </div>
      </section>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
