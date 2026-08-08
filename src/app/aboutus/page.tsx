import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export const metadata: Metadata = {
  title: 'About Us | Wah Cafe',
};

const testimonials = [
  {
    name: 'Nidhi Khobragade',
    company: 'Biocon',
    quote: 'I would like to extend my gratitude towards you for your service and efforts at yesterday\'s event. I\'m happy to share that everyone on the floor enjoyed the snacks and service provided by your team.',
  },
  {
    name: 'Priyadharshini',
    company: '',
    quote: 'Tea is good taste and quality. Service is good. Good number of varieties are served. Variety of snacks provided is good.',
  },
  {
    name: 'Niharika C Mouli',
    company: 'Syngene',
    quote: 'We are glad to have this amazing cafe in our campus: Extremely friendly staff making us feel at home. Availability of food. Perfect menu at perfect timing. A go to place for all moods. Hang out and recreation as well as basic needs met. Taste of the food is amazing. Well maintained... Great going guys! Keep up the good work.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />

      {/* About Us Content */}
      <section className="bg-white py-16">
        <div className="content-wrap max-w-3xl">
          <h1 className="page-heading mb-8">About Us</h1>

          <p className="text-sm mb-6" style={{ lineHeight: 1.7 }}>
            Wah Café is a celebration of India&apos;s rich culinary heritage, bringing you the
            authentic flavors of traditional Indian cuisine with a modern twist. Our menu is
            crafted with the finest ingredients, capturing the essence of regional specialties
            from across the country. From aromatic biryanis to sizzling tandoori delights,
            every dish is a tribute to India&apos;s diverse food culture. Experience the warmth of
            Indian hospitality and the joy of soulful flavors at Wah Café!
          </p>

          <h2 className="font-bold text-lg mb-3 mt-8" style={{ color: '#034230' }}>Mission</h2>
          <p className="text-sm mb-6" style={{ lineHeight: 1.7 }}>
            Our mission at Wah Café is to create a dining experience that blends tradition with
            innovation, offering authentic Indian flavors with a contemporary touch. We aim to
            preserve the essence of regional cuisines while embracing creativity in our dishes.
            Through quality ingredients, skilled craftsmanship, and heartfelt hospitality, we
            strive to bring people together over great food. Our goal is to make every meal a
            celebration of India&apos;s rich culinary traditions, served with warmth and passion.
          </p>

          <h2 className="font-bold text-lg mb-3 mt-8" style={{ color: '#034230' }}>Team</h2>
          <p className="text-sm mb-4" style={{ lineHeight: 1.7 }}>
            Our team comprises members from both North and South India, bringing authentic
            regional flavors to our dishes. Some team members have experience working in
            five-star hotels, while others bring valuable expertise from diverse culinary backgrounds.
          </p>
          <p className="text-sm mb-6" style={{ lineHeight: 1.7 }}>
            To ensure the health and safety of our food handlers, we conduct regular health
            checks, vaccinations, and deworming.
          </p>

          {/* Team images */}
          <div className="flex flex-wrap gap-4 mb-8">
            {['chef-cooking.jpg', 'final-touches.jpg', 'indian-food-spread.jpg'].map((img) => (
              <div key={img} className="relative" style={{ width: 250, height: 180 }}>
                <Image src={`/images/about/${img}`} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>

          <h2 className="font-bold text-lg mb-3 mt-8" style={{ color: '#034230' }}>About Chief Chef</h2>
          <p className="text-sm mb-6" style={{ lineHeight: 1.7 }}>
            Chef Prakash is a seasoned globe-trotter, having explored diverse culinary landscapes
            across Spain, Italy, the US, Russia, and Far East Asia. His adventurous journey led
            him to Niraamaya Wellness Retreats, where he played a pivotal role in shaping the
            brand over the past 14+ years. As the Corporate Chef of a Relais &amp; Châteaux property,
            his passion for authentic, traditional cuisine deepened, driving him to push the
            boundaries of gourmet innovation. Today, Chef Prakash collaborates independently
            with premium, privately-owned resorts, guiding them in their transformation into
            distinguished luxury wellness brands.
          </p>

          <div className="flex flex-wrap gap-4 mb-8">
            {['buffet-with-logo.jpg', 'event-setup.jpg'].map((img) => (
              <div key={img} className="relative" style={{ width: 300, height: 200 }}>
                <Image src={`/images/about/${img}`} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-white py-16" style={{ minHeight: 524 }}>
        <div className="content-wrap">
          <h3 className="font-bold text-base mb-8 text-center">Testimonials</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="p-6 border border-gray-100">
                <p className="text-sm mb-4" style={{ lineHeight: 1.6 }}>&ldquo;{t.quote}&rdquo;</p>
                <p className="font-bold text-sm">{t.name}</p>
                {t.company && <p className="text-xs text-gray-500">{t.company}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
