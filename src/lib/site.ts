// Site configuration constants — edit here to update contact info, socials, etc.
export const SITE = {
  name: 'Wah Cafe',
  tagline: 'Office Catering in Bangalore | Wah Cafe – Corporate Solutions',
  description:
    'Looking for office catering in Bangalore? Wah Cafe delivers fresh, delicious corporate meals for meetings, team events, and daily office catering. Customizable menus, on-time delivery.',

  // Contact
  phone: '+919916683311',
  phoneDisplay: '+91 99166 83311',
  email: 'connect@wahcafe.com',
  whatsapp: 'https://wa.me/+919916683311',
  address:
    'Plot No.261, SARA Square, Sri Rampura Circle, Bommasandra Jigani Link Rd, opp. Biocon Park, Bengaluru, Karnataka 560099',
  mapsUrl: 'https://maps.app.goo.gl/LMw3xvJ7sYUCLKGF8',
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5!2d77.6648!3d12.805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDQ4JzE4LjAiTiA3N8KwMzknNTMuMyJF!5e0!3m2!1sen!2sin!4v1',

  // Social
  social: {
    instagram: 'https://www.instagram.com/wahcafe.blr/',
    facebook: 'https://www.facebook.com/profile.php?id=61571551032408',
    linkedin: 'https://www.linkedin.com/company/wah-cafe/',
  },

  // Footer
  copyright: '© 2026 All rights reserved by Wah Cafe, Bangalore, India.',
  division: 'A Division of Le Château.',
  poweredBy: 'Powered by: Lets Go Digital Market',

  // Service areas
  serviceAreas: [
    'HSR Layout',
    'Hosur Road',
    'Electronic City',
    'Bommasandra',
    'Bannerghatta Road',
    'Chandapura',
  ],

  // Navigation
  navLinks: [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/aboutus' },
    { label: 'Service & Standards', href: '/serviceandstandards' },
    { label: 'Menu', href: '/menu' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Customize Menu', href: '/customizemenu' },
    { label: 'Blog', href: '/blog' },
  ],

  footerLinks: [
    { label: 'About Us', href: '/aboutus' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Testimonials', href: '/aboutus#testimonials' },
    { label: 'FSSAI Certified', href: '/serviceandstandards' },
    { label: 'Services & Standards', href: '/serviceandstandards' },
  ],

  // SEO keyword block (reproduced verbatim from Wix /customizemenu page footer)
  seoKeywords:
    'Office Food Vendor near electronic city Corporate Lunches Bangalore | Corporate Lunches Bengaluru | Corporate Caterers Bangalore | Corporate Caterers Bengaluru | Corporate Catering Bangalore | Corporate Catering Bengaluru | Corporate Lunch Catering Bangalore | Corporate Catering Service Bangalore | Corporate Catering Service Bengaluru | Catering for Corporate Bangalore | Catering for Companies | Company Cater | Industrial Catering Service Bangalore | Corp Catering | Corporate Catering Service Bangalore | Best Corporate Caterer Bangalore | Corporate Catering Service Near Me | Corporate Event Caterer Bangalore | Daily Office Catering Bangalore | Office Lunches Bangalore | Office Caterers Bangalore | Office Catering Bangalore | Office Lunch Catering Bangalore | Office Catering Service Bangalore | Catering for Office Bangalore | Catering Corporate | Corporate Meal Box | Corporate Packed Lunch Box | Corporate Lunch Box | Corporate Box Lunches | Commercial Caterers | High Tea in Bangalore | Corporate High Tea | Hi Tea in Bangalore | Corporate Hi Tea | Corporate Catering in Koramangala | Corporate Catering in Hosur Road | Corporate Catering in HSR | Catering Corporate | Corporate Food Vendor Bangalore | Corporate Food Vendor near me | Corporate Lunch Vendor Bangalore | Corporate Breakfast Vendor Bangalore | Corporate Snacks Vendor Bangalore | Office Food Vendor Bangalore | Office Lunch Vendor Bangalore | Office Breakfast Vendor Bangalore | Office Snacks Vendor Bangalore | Office Food Vendor near me',
} as const;

// Exports for convenience
export const { phone, phoneDisplay, email, whatsapp, address, mapsUrl, social } = SITE;
export const { navLinks, footerLinks, serviceAreas, seoKeywords } = SITE;
