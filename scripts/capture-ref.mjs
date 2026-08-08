import { chromium } from 'playwright';
import { mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'design-ref');
const BASE_URL = 'https://wahcafe.com';

// Wix slug → output slug
const PAGES = [
  { path: '/', slug: 'home' },
  { path: '/aboutus', slug: 'aboutus' },
  { path: '/serviceandstandards', slug: 'services' },
  { path: '/menu', slug: 'menu' },
  { path: '/gallery', slug: 'gallery' },
  { path: '/customizemenu', slug: 'customizemenu' },
  { path: '/blog', slug: 'blog' },
];

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 375, height: 812 },
];

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const fileSize = (p) => statSync(p).size;

let captured = 0;
let totalBytes = 0;

mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ userAgent: USER_AGENT });
const page = await context.newPage();

// Wix keeps long-lived connections open, so networkidle rarely fires even
// though the page is fully rendered in ~2s. Try networkidle first (spec'd),
// fall back to 'load' + a settle window so every page still gets captured.
async function navigate(url) {
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
    return 'networkidle';
  } catch (err) {
    await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(3000); // settle for late images/fonts
    return 'load-fallback';
  }
}

// Trigger lazy-loading (IntersectionObserver) so below-fold Wix images render
// before the full-page capture.
async function triggerLazyLoad() {
  await page.evaluate(async () => {
    const step = 600;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 50));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1000);
}

for (const { path, slug } of PAGES) {
  const url = `${BASE_URL}${path}`;
  for (const { name, width, height } of VIEWPORTS) {
    const file = join(OUT_DIR, `${slug}-${name}.png`);
    try {
      console.log(`Capturing ${slug} ${name} (${width}x${height}) <- ${url}`);
      await page.setViewportSize({ width, height });
      const mode = await navigate(url);
      await triggerLazyLoad();
      await page.screenshot({ path: file, fullPage: true });
      const size = fileSize(file);
      captured += 1;
      totalBytes += size;
      console.log(`  OK ${file} (${(size / 1024).toFixed(1)} KiB, via ${mode})`);
    } catch (err) {
      console.error(`  FAIL ${slug}-${name}: ${err.message}`);
    }
    await delay(2000);
  }
}

await browser.close();

console.log(`\nSummary: ${captured}/${PAGES.length * VIEWPORTS.length} screenshots captured, total ${(totalBytes / 1024 / 1024).toFixed(2)} MiB`);
