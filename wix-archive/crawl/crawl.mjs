import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE = 'https://wahcafe.com';
const OUT = 'graph.json';

const browser = await chromium.launch({
  headless: true,
  executablePath: 'C:/Users/vishw/AppData/Local/ms-playwright/chromium-1140/chrome-win/chrome.exe',
});
const ctx = await browser.newContext({ userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36' });
const page = await ctx.newPage();

const visited = new Map(); // path -> {title, h1, links: [paths], forms, images, desc}
const queue = ['/'];
const fails = [];

const HOSTS = new Set(['wahcafe.com', 'www.wahcafe.com']);

function canon(path) {
  if (!path) return null;
  let u;
  try { u = new URL(path, BASE); } catch { return null; }
  if (!HOSTS.has(u.hostname)) return null;
  let p = u.pathname;
  if (p.endsWith('/') && p.length > 1) p = p.slice(0, -1);
  if (!p) p = '/';
  return p;
}

async function scrape(path) {
  const url = path === '/' ? BASE : BASE + path;
  const res = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  const status = res ? res.status() : null;
  await page.waitForTimeout(1200); // let client-side rendering settle

  const data = await page.evaluate(() => {
    const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();
    const anchors = [...document.querySelectorAll('a[href]')];
    const links = anchors.map(a => ({ href: a.getAttribute('href'), text: clean(a.innerText || a.textContent) }))
      .filter(l => l.href && !l.href.startsWith('mailto:') && !l.href.startsWith('tel:') && !l.href.startsWith('javascript:') && l.href !== '#');
    const txt = (el) => clean(el?.textContent);
    return {
      title: document.title,
      h1: [...document.querySelectorAll('h1')].map(txt),
      metaDesc: clean(document.querySelector('meta[name="description"]')?.content),
      canonical: document.querySelector('link[rel="canonical"]')?.href || null,
      links,
      forms: [...document.forms].map(f => ({ id: f.id || '', action: f.action || '', inputs: [...f.querySelectorAll('input,select,textarea')].map(i => i.name || i.id).filter(Boolean).slice(0, 30) })),
      hasNav: !!document.querySelector('nav, header nav'),
      hasFooter: !!document.querySelector('footer'),
      images: document.querySelectorAll('img').length,
      sectionHeadings: [...document.querySelectorAll('h2')].map(txt).slice(0, 25),
    };
  });

  const internal = [...new Set(data.links.map(l => canon(l.href)).filter(Boolean))];
  const classify = (href) => {
    if (href.startsWith('tel:')) return 'tel';
    if (href.startsWith('wa.me') || href.includes('api.whatsapp.com') || href.includes('whatsapp.com')) return 'whatsapp';
    if (href.startsWith('mailto:')) return 'mailto';
    if (href.includes('maps.google') || href.includes('maps.app.goo.gl') || href.includes('goo.gl/maps')) return 'maps';
    if (href.includes('instagram.com')) return 'instagram';
    if (href.includes('facebook.com')) return 'facebook';
    if (href.includes('linkedin.com')) return 'linkedin';
    if (href.includes('youtube.com') || href.includes('youtu.be')) return 'youtube';
    if (href.includes('twitter.com') || href.includes('x.com')) return 'twitter';
    return 'other';
  };
  const external = [...new Map(data.links
    .filter(l => !canon(l.href))
    .map(l => [l.href, { href: l.href, type: classify(l.href), text: l.text }])
  ).values()];
  visited.set(path, {
    url: url === BASE ? BASE + '/' : url,
    status,
    title: data.title,
    metaDesc: data.metaDesc,
    h1: data.h1,
    sectionHeadings: data.sectionHeadings,
    forms: data.forms,
    hasNav: data.hasNav,
    hasFooter: data.hasFooter,
    imageCount: data.images,
    outboundCount: data.links.length,
    internalLinks: internal,
    externalLinks: external,
  });
  return internal;
}

const seen = new Set(['/']);
while (queue.length) {
  const path = queue.shift();
  try {
    const internal = await scrape(path);
    for (const p of internal) {
      if (!seen.has(p)) { seen.add(p); queue.push(p); }
    }
  } catch (e) {
    fails.push({ path, error: String(e).slice(0, 200) });
  }
}

await browser.close();

const pages = [...visited.entries()].map(([path, v]) => ({ path, ...v }));
const edges = [];
for (const [from, v] of visited.entries()) {
  for (const to of v.internalLinks) edges.push({ from, to });
}
const uniqueEdges = [...new Map(edges.map(e => [`${e.from}->${e.to}`, e])).values()];

// Also attempt static detection of pages not linked in nav (sitemap/robots)
let sitemapPages = [];
try {
  const r = await fetch(BASE + '/sitemap.xml');
  if (r.ok) {
    const txt = await r.text();
    sitemapPages = [...txt.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => canon(m[1])).filter(Boolean);
  }
} catch {}

fs.writeFileSync(OUT, JSON.stringify({ pages, edges: uniqueEdges, sitemapPages, fails, crawlOrder: [...seen] }, null, 2));
console.log(JSON.stringify({ pagesFound: pages.length, edgesFound: uniqueEdges.length, sitemapPages, fails }, null, 2));
