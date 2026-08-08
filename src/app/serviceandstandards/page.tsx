import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export const metadata: Metadata = {
  title: 'Service & Standards | Wah Cafe',
};

const sections = [
  {
    title: 'Daily Services',
    items: [
      'Offers breakfast, lunch, dinner, and snacks daily.',
      'Provides catering services for corporate banquets.',
    ],
  },
  {
    title: 'Menu Customization',
    items: [
      'Weekly menu revisions in collaboration with corporate clients.',
      'Over 1,500 standardized recipes to choose from, with client suggestions welcomed and incorporated.',
    ],
  },
  {
    title: 'Client Interaction and Issue Resolution',
    items: [
      'Maintains personalized contact with Client, Admin, and HR departments.',
      'Adopts a prioritized problem-solving approach to handle on-site issues efficiently.',
      'Senior supervisors are deputed at client sites to oversee operations.',
    ],
  },
  {
    title: 'Front-of-House (FoH) Staff',
    items: [
      'Polite and well-trained FoH staff who undergo regular customer service training.',
      'Focus on delivering exceptional guest experiences.',
    ],
  },
  {
    title: 'Transportation and Delivery',
    items: [
      'Uses insulated food barrels (Cambro) to maintain temperature, aroma, taste, and hygiene during transportation.',
    ],
  },
  {
    title: 'Hygiene and Safety Standards',
    items: [
      'Mandatory use of caps and gloves by all staff during food preparation.',
      'Fresh meals are prepared daily at the base kitchen or client sites; any leftovers are discarded.',
      'Daily deep cleaning of the base kitchen using professional-grade cleaning agents and equipment.',
      'All new recruits are trained in personal hygiene and food safety before deployment.',
      'Regular inspections, pest control, and microbial lab tests are conducted as per FSSAI and WHO standards.',
      'Water sensory analysis and licensed vendors ensure high standards of hygiene and safety.',
      'Strict protocols are followed to avoid cross-contamination and food-borne illnesses.',
    ],
  },
  {
    title: 'Natural and Authentic Food',
    items: [
      'Committed to serving natural and real food, prepared with homemade masalas and without artificial colors, flavors, or enhancers.',
      'Food is cooked using simple, wholesome ingredients, just as it would be in a home kitchen.',
    ],
  },
  {
    title: 'Quality Control',
    items: [
      'Meals are prepared using a process-driven approach monitored by professional chefs and the Executive Chef.',
      'Raw materials are sourced directly from wholesale licensed vendors to ensure freshness.',
      'Internal quality control inspectors conduct regular checks on staff and equipment hygiene, packaging and delivery processes, and general kitchen functions (monitored via CCTV cameras).',
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />

      <section className="bg-white py-16">
        <div className="content-wrap max-w-3xl">
          <h1 className="page-heading mb-12">Service &amp; Standards</h1>

          {sections.map((section) => (
            <div key={section.title} className="mb-10">
              <h2 className="font-bold text-base mb-3" style={{ color: '#034230' }}>
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i} className="text-sm pl-4" style={{ lineHeight: 1.7 }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </>
  );
}
