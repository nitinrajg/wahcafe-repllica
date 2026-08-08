import { chromium } from 'playwright';

const b = await chromium.launch({ headless: true, executablePath: 'C:/Users/vishw/AppData/Local/ms-playwright/chromium-1140/chrome-win/chrome.exe' });
const pages = ['1.html','2.html','3.html','4.html','5.html','6.html','7.html'];
const titles = ['Home','About','Service & Standards','Menu','Gallery','Customize Menu','Blog'];

for (let i = 0; i < pages.length; i++) {
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  await p.route('**/*', r => { const u = r.request().url(); if (u.startsWith('file://') || u.startsWith('blob:')) return r.continue(); return r.abort(); });
  await p.goto(`file:///C:/Users/vishw/Downloads/wahcafe/${pages[i]}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await p.waitForTimeout(800);

  const btn = p.locator('.wixui-hamburger-open-button');
  const visBefore = await p.evaluate(() => getComputedStyle(document.querySelector('.HamburgerOverlay547129737__root')).visibility);
  await btn.click();
  await p.waitForTimeout(500);
  const state = await p.evaluate(() => {
    const o = document.querySelector('.HamburgerOverlay547129737__root');
    const links = o ? [...o.querySelectorAll('a[href]')].map(a => a.getAttribute('href')) : [];
    return { vis: getComputedStyle(o).visibility, links };
  });

  const label = titles[i];
  const ok = state.vis === 'visible' && state.links.length === 7;
  console.log(`${ok ? '✓' : '✗'} ${label.padEnd(22)} overlay:${state.vis.padEnd(7)} links: ${state.links.join(', ')}`);
  await p.close();
}
await b.close();
