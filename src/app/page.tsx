import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroCarousel from '@/components/HeroCarousel';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { serviceAreas } from '@/lib/site';

const serviceCards = [
  { image: '/images/services/service-banner.jpg', title: 'Corporate Office Catering', desc: 'Delivering fresh and delicious daily lunch, snacks, breakfast, and dinner to office spaces, ensuring quality and convenience every day!' },
  { image: '/images/services/service-outdoor-catering.jpg', title: 'Outdoor Catering', desc: 'Impress at corporate events and exhibitions with our exceptional catering services, offering customized menus and seamless delivery for every occasion.' },
  { image: '/images/services/service-snack-boxes.jpg', title: 'Snack Boxes', desc: 'Celebrate RNR events, farewells, or felicitations with thoughtfully curated packed meal boxes, tailored to suit every occasion perfectly!' },
  { image: '/images/services/service-cafeteria-kiosk.jpg', title: 'Cafeteria Kiosk', desc: 'Enhance your office cafeteria with a customized kiosk offering delicious snacks and beverages, tailored to your team\'s preferences!' },
  { image: '/images/services/service-birthday-parties.jpg', title: 'Birthday Parties', desc: 'Planning a birthday party? We customize the menu to suit your taste and make your celebration truly special!' },
  { image: '/images/services/service-house-warming.jpg', title: 'House Warming', desc: 'Hosting a housewarming ceremony? Let us cater to your personal requirements with a touch of culinary excellence and warm hospitality!' },
];

const cuisineCards = [
  { image: '/images/services/cuisine-north-indian.jpg', label: 'North Indian' },
  { image: '/images/services/cuisine-south-indian.jpg', label: 'South Indian' },
  { image: '/images/services/cuisine-chats.jpg', label: 'Chats' },
  { image: '/images/services/cuisine-bakery.jpg', label: 'Bakery' },
  { image: '/images/services/cuisine-chinese.jpg', label: 'Chinese' },
];

const priorityIcons = [
  { image: '/images/home/icon-hygiene.png', label: 'Hygiene' },
  { image: '/images/home/icon-packing.png', label: 'Packing' },
  { image: '/images/home/icon-transport.png', label: 'Transport' },
  { image: '/images/home/icon-tasty.png', label: 'Tasty' },
];

export default function HomePage() {
  return (
    <>
      <Header />

      {/* Section 1: Hero Carousel */}
      <HeroCarousel />

      {/* Section 2: Photo Trio */}
      <section className="bg-white py-8">
        <div className="content-wrap">
          <div className="flex flex-wrap justify-center gap-4">
            {['photo-trio-catering.jpg', 'photo-trio-corporate.jpg', 'photo-trio-wah-cafe.jpg'].map((img, i) => (
              <div key={i} className="relative" style={{ width: 200, height: 300 }}>
                <Image src={`/images/home/${img}`} alt="" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Hero Text (duplicate) */}
      <section className="bg-white py-8">
        <div className="content-wrap max-w-2xl text-center">
          <p className="font-bold text-lg mb-2" style={{ color: '#2b5672' }}>
            Delicious Meals Delivered, Wherever You Are!
          </p>
          <p className="text-sm" style={{ color: '#2b5672', lineHeight: 1.6 }}>
            Hassle-free, professional meal solutions tailored to your business needs.
            Whether it&apos;s for meetings, team events, or client gatherings, we handle
            everything — from menu planning to on-time delivery and setup — ensuring
            your focus remains on the event. Our diverse menu options cater to various
            tastes and dietary preferences, combining quality, freshness, and presentation.
            With seamless coordination and exceptional service, we make catering for
            corporate events simple, efficient, and memorable for all attendees.
          </p>
        </div>
      </section>

      {/* Section 4: Corporate Catering Services */}
      <section className="bg-white py-16">
        <div className="content-wrap">
          <h2 className="section-heading mb-6">We Offer Below Corporate Catering Services</h2>
          <div className="text-center mb-8 max-w-3xl mx-auto space-y-3">
            <p className="text-sm" style={{ lineHeight: 1.6 }}>
              We provide a wide range of corporate catering services in Bangalore, covering areas
              such as {serviceAreas.join(', ')}, and nearby locations.
            </p>
            <p className="text-sm" style={{ lineHeight: 1.6 }}>
              Whether you need catering for corporate events like annual functions, team-building
              activities, expat meetings, or meal options like snack boxes, we&apos;ve got you covered.
            </p>
            <p className="text-sm" style={{ lineHeight: 1.6 }}>
              Additionally, we offer a permanent kiosk service at your cafeteria, creating a space
              for your team to connect, engage, and unwind effortlessly.
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map((card) => (
              <div key={card.title} className="bg-white border border-gray-100 p-4">
                <div className="relative w-full h-48 mb-4">
                  <Image src={card.image} alt={card.title} fill className="object-cover" />
                </div>
                <h3 className="font-bold text-base mb-2" style={{ color: '#000' }}>{card.title}</h3>
                <p className="text-sm" style={{ lineHeight: 1.6 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Every Cuisine to Suit Your Style */}
      <section className="py-16" style={{ background: '#f0f0f0' }}>
        <div className="content-wrap">
          <h2 className="section-heading mb-4">Every Cuisine to Suit Your Style.</h2>
          <p className="text-center text-sm mb-8 max-w-2xl mx-auto" style={{ lineHeight: 1.6 }}>
            Discover our diverse cuisine offerings, thoughtfully crafted to deliver authentic
            flavors and exceptional dining experiences for every taste and occasion.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {cuisineCards.map((c) => (
              <div key={c.label} className="text-center" style={{ width: 180 }}>
                <div className="relative w-full h-44 mb-3">
                  <Image src={c.image} alt={c.label} fill className="object-cover rounded" />
                </div>
                <h3 className="font-bold text-sm">{c.label}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Valued Clients */}
      <section className="bg-white py-16">
        <div className="content-wrap">
          <h2 className="section-heading mb-8">Valued Clients</h2>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {['client-biocon.jpg', 'client-taegutec.jpg', 'client-syngene.jpg'].map((img) => (
              <div key={img} className="relative" style={{ width: 120, height: 60 }}>
                <Image src={`/images/home/${img}`} alt="" fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Marquee CTA Banner */}
      <section className="relative w-full overflow-hidden" style={{ height: 80 }}>
        <Image
          src="/images/home/home-wide-banner.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Link
            href="/menu"
            className="text-2xl font-bold text-white no-underline hover:underline"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
          >
            ✦ Explore our menu ✦
          </Link>
        </div>
      </section>

      {/* Section 8: Our Priority + CTAs */}
      <section className="bg-white py-16">
        <div className="content-wrap">
          <h2 className="section-heading mb-4">Our Priority</h2>
          <p className="text-center text-sm mb-8 max-w-2xl mx-auto" style={{ lineHeight: 1.6 }}>
            Our priority is to deliver exceptional catering experiences tailored to your needs.
          </p>
          <p className="text-center text-sm mb-8 max-w-2xl mx-auto" style={{ lineHeight: 1.6 }}>
            From exquisite flavors to flawless presentation, we focus on quality, reliability,
            and personalized service. Whether it&apos;s a corporate event, team-building activity,
            or private gathering, our team ensures every detail is handled with care, making
            your occasion truly unforgettable.
          </p>

          {/* Priority Icons */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {priorityIcons.map((icon) => (
              <div key={icon.label} className="text-center" style={{ width: 100 }}>
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <Image src={icon.image} alt={icon.label} fill className="object-contain" />
                </div>
                <span className="text-xs font-bold">{icon.label}</span>
              </div>
            ))}
          </div>

          {/* CTA Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-8" style={{ border: '1px solid #f0f0f0' }}>
              <h3 className="section-heading mb-4 text-base">Know more about our services and standards</h3>
              <Link href="/serviceandstandards" className="btn-wah">
                Click Here
              </Link>
            </div>
            <div className="text-center p-8" style={{ border: '1px solid #f0f0f0' }}>
              <h3 className="section-heading mb-4 text-base">Ready to customize menu? Submit your details</h3>
              <Link href="/customizemenu" className="btn-wah">
                Click Here
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
