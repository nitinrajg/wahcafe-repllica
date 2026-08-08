#!/usr/bin/env node
// Import images from wix-archive/*_files/ into public/images/ with semantic names.
// Source files are found by name across all *_files folders (first match wins),
// which dedupes the logo and social icons that appear in every folder.
import { copyFile, mkdir, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ARCHIVE = join(ROOT, 'wix-archive');
const PUBLIC_IMAGES = join(ROOT, 'public', 'images');
const LOW_RES_BYTES = 50 * 1024;

// source filename -> public/images destination path
const MANIFEST = {
  // Logo
  'Wah Cafe Logo_page-0001 (3).jpg': 'logo/wah-cafe-logo.jpg',

  // Social icons
  '11062b_ca1d837ce7194421b781ee7384061a8e~mv2.png': 'social/instagram.png',
  '11062b_362ef89dec51403eb0ee59a21bde967c~mv2.png': 'social/facebook.png',
  '11062b_72c275822d4344358ee379f14e7e115f~mv2.png': 'social/linkedin.png',

  // Home
  '641169_cf235c47967d4f1fbc1264cb16923b6f~mv2.jpg': 'home/hero-buffet-spread.jpg',
  '641169_1d37d51b66774fae8d7bea816c169044~mv2.jpg': 'home/hero-chafing-dome-setup.jpg',
  '641169_9d8c2c86a01d409e8161bfdd2c7eccb1~mv2.jpg': 'home/hero-buffet-plates.jpg',
  '641169_4794469e4f284f9cb7e4b4dab0d29e4d~mv2.jpg': 'home/hero-wah-cafe-kiosk.jpg',
  '641169_43bfc9e18f76404c8dd58b5c291c1953~mv2.jpg': 'home/home-wide-banner.jpg',
  'Corporate Catering(1).jpg': 'services/service-banner.jpg',
  'Outdoor Catering.jpg': 'services/service-outdoor-catering.jpg',
  'Food Packaging.jpg': 'services/service-snack-boxes.jpg',
  'Wah Cafe Cafetaria.jpg': 'services/service-cafeteria-kiosk.jpg',
  'Birthday Parties.jpg': 'services/service-birthday-parties.jpg',
  'House Warming.jpg': 'services/service-house-warming.jpg',
  'Catering.jpg': 'home/photo-trio-catering.jpg',
  'Wah Cafe.jpg': 'home/photo-trio-wah-cafe.jpg',
  'Corporate Catering.jpg': 'home/photo-trio-corporate.jpg',
  'North Indian.jpg': 'services/cuisine-north-indian.jpg',
  'South Indian.jpg': 'services/cuisine-south-indian.jpg',
  'Chat.jpg': 'services/cuisine-chats.jpg',
  'Bakery.jpg': 'services/cuisine-bakery.jpg',
  'Stir fried noodles.jpeg': 'services/cuisine-chinese.jpg',
  'Biocon.jpg': 'home/client-biocon.jpg',
  'Syngene.jpg': 'home/client-syngene.jpg',
  'Taegutec.jpg': 'home/client-taegutec.jpg',
  'Hygiene.png': 'home/icon-hygiene.png',
  'Packing.png': 'home/icon-packing.png',
  'Transport.png': 'home/icon-transport.png',
  'Tasty.png': 'home/icon-tasty.png',

  // About
  'Chef at Work.jpg': 'about/chef-cooking.jpg',
  'Final Touches.jpg': 'about/final-touches.jpg',
  'GettyImages-1823979425_b.jpg': 'about/indian-food-spread.jpg',
  'Wah Cafe (1).jpg': 'about/delivery-vehicle.jpg',
  'Wah Cafe (4).jpg': 'about/event-setup.jpg',
  'Wah Cafe (5).jpg': 'about/buffet-with-logo.jpg',

  // Menu
  'Idli Wah Cafe.jpg': 'menu/idli.jpg',
  'Dosa at Wah Cafe.jpg': 'menu/dosa.jpg',
  'Dal at Wah Cafe.jpg': 'menu/dal.jpg',
  'Capathi at Wah Cafe.jpg': 'menu/chapati.jpg',
  'Murgh Do Pyaza.jpg': 'menu/murgh-do-pyaza.jpg',
  'Paneer Pasanda.jpg': 'menu/paneer-pasanda.jpg',
  'Kadi Pakodi.jpg': 'menu/kadi-pakodi.jpg',
  'Jeera Pulao.jpg': 'menu/jeera-pulao.jpg',
  'Cumin Rice.jpg': 'menu/cumin-rice.jpg',
  'Kosambari Salad.jpg': 'menu/kosambari-salad.jpg',
  'Pumpkin Soup.png': 'menu/pumpkin-soup.png',
  'Veg Croquettes.jpg': 'menu/veg-croquettes.jpg',
  '_Veg Dumpling with Sweet & Sour Sauce.jpg': 'menu/veg-dumpling.jpg',
  'Rabdi with Jalebi.jpg': 'menu/rabdi-jalebi.jpg',
  'Wah Cafe Sandwich.jpg': 'menu/sandwich.jpg',
  'Wah Cafe Kachori.jpg': 'menu/kachori.jpg',
  'Bento Box.jpg': 'menu/bento-box.jpg',
  'Wah Cafe (6).png': 'menu/wah-cafe-buffet-setup.jpg',

  // Gallery
  'WhatsApp Image 2025-01-08 at 12_41_20 (1).jpeg': 'gallery/crockery-01.jpg',
  'WhatsApp Image 2025-01-08 at 12_41_22 (1).jpeg': 'gallery/crockery-02.jpg',
  'WhatsApp Image 2025-01-08 at 12_41_23.jpeg': 'gallery/crockery-03.jpg',
  'WhatsApp Image 2025-01-08 at 12_41_20 (2).jpeg': 'gallery/crockery-04.jpg',
  'WhatsApp Image 2025-01-08 at 12_39_52.jpeg': 'gallery/crockery-05.jpg',
  'WhatsApp Image 2025-01-08 at 12_41_18 (2).jpeg': 'gallery/kiosk-01.jpg',
  'WhatsApp Image 2025-01-08 at 12_41_11.jpeg': 'gallery/kiosk-02.jpg',
  'WhatsApp Image 2025-01-08 at 12_41_08 (1).jpeg': 'gallery/kiosk-03.jpg',
  'WhatsApp Image 2025-01-08 at 12_41_12 (1).jpeg': 'gallery/kiosk-04.jpg',
  'WhatsApp Image 2025-01-08 at 12_41_11 (2).jpeg': 'gallery/kiosk-05.jpg',
  'WhatsApp Image 2025-01-08 at 12_41_10 (1).jpeg': 'gallery/team-01.jpg',
  'WhatsApp Image 2025-01-08 at 12_41_edited.jpg': 'gallery/ready-food-01.jpg',
  'WhatsApp Image 2025-01-08 at 12_41_edited(1).jpg': 'gallery/ready-food-02.jpg',
  'WhatsApp Image 2025-01-08 at 12_41_16.jpeg': 'gallery/ready-food-03.jpg',
  'WhatsApp Image 2025-01-08 at 12_41_10.jpeg': 'gallery/relishing-01.jpg',
  'WhatsApp Image 2025-01-08 at 12_41_17.jpeg': 'gallery/relishing-02.jpg',
  'WhatsApp Image 2025-01-08 at 12_41_24.jpeg': 'gallery/relishing-03.jpg',
  'WhatsApp Image 2025-01-08 at 12_41_16 (2).jpeg': 'gallery/relishing-04.jpg',
  'WhatsApp Image 2025-01-08 at 12_41_09.jpeg': 'gallery/relishing-05.jpg',
  'Mahindra Zor.jpg': 'gallery/vehicle-mahindra-zor.jpg',
  'Ace.jpg': 'gallery/vehicle-tata-ace.jpg',
  'Wah Cafe (5).png': 'gallery/vehicle-03.jpg',
  '48.jpg': 'gallery/infra-kitchen-hood.jpg',
  '49.jpg': 'gallery/infra-kitchen-equipment.jpg',
  '50.jpg': 'gallery/infra-kitchen-range.jpg',
  '53.jpg': 'gallery/infra-kitchen-dark.jpg',
  '54.jpg': 'gallery/infra-kitchen-pantry.jpg',

  // Blog
  '3f1643_5fd5b3a08b1b4645a3fbaf3591ebda9f~mv2.webp': 'blog/cover-01.webp',
  '3f1643_8e18096b8c3d4e518d13833add146dd8~mv2.webp': 'blog/cover-02.webp',
};

const srcDirs = (await readdir(ARCHIVE)).filter((d) => d.endsWith('_files')).sort();
const foundCache = new Map();

function findSource(filename) {
  if (foundCache.has(filename)) return foundCache.get(filename);
  for (const dir of srcDirs) {
    const p = join(ARCHIVE, dir, filename);
    if (existsSync(p)) {
      foundCache.set(filename, p);
      return p;
    }
  }
  foundCache.set(filename, null);
  return null;
}

let copied = 0, warnings = 0, errors = 0;

for (const [src, dest] of Object.entries(MANIFEST)) {
  const destPath = join(PUBLIC_IMAGES, dest);
  const srcPath = findSource(src);
  if (!srcPath) {
    console.warn(`[skip] source not found: ${src}`);
    warnings++;
    continue;
  }
  try {
    await mkdir(dirname(destPath), { recursive: true });
    await copyFile(srcPath, destPath);
    copied++;
    const { size } = await stat(destPath);
    if (size < LOW_RES_BYTES) {
      console.warn(`[low-res] ${dest} is ${size} bytes (<50KB) — likely a Wix SSR placeholder`);
      warnings++;
    }
  } catch (err) {
    console.error(`[error] ${src} -> ${destPath}: ${err.message}`);
    errors++;
  }
}

console.log(`\nSummary: ${copied} copied, ${warnings} warnings, ${errors} errors`);
