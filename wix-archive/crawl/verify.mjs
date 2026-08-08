import { chromium } from 'playwright';

const b = await chromium.launch({ headless: true, executablePath: 'C:/Users/vishw/AppData/Local/ms-playwright/chromium-1140/chrome-win/chrome.exe' });
const p = await b.newPage({ viewport: { width: 390, height: 844 } }); // mobile size — where hamburger shows

// block all external network (WIX/GTM/CDN) — local file needs none of it
await p.route('**/*', r => {
  const u = r.request().url();
  if (u.startsWith('file://') || u.startsWith('blob:')) return r.continue();
  return r.abort();
});

await p.goto('file:///C:/Users/vishw/Downloads/wahcafe/1.html', { waitUntil: 'domcontentloaded', timeout: 30000 });
await p.waitForTimeout(1200);

const openBtn = p.locator('.wixui-hamburger-open-button');
console.log('open button visible:', await openBtn.isVisible());
const overlayBefore = await p.evaluate(() => {
  const o = document.querySelector('.HamburgerOverlay547129737__root');
  return o && getComputedStyle(o).visibility;
});
console.log('overlay visibility before:', overlayBefore);

await openBtn.click();
await p.waitForTimeout(600);

const state = await p.evaluate(() => {
  const o = document.querySelector('.HamburgerOverlay547129737__root');
  const m = o && o.querySelector('.ZBf0K1');
  const links = o ? [...o.querySelectorAll('a[href]')].map(a => a.getAttribute('href')) : [];
  return {
    overlayClass: o ? o.className.slice(0, 80) : null,
    overlayVisibility: o ? getComputedStyle(o).visibility : null,
    menuOpacity: m ? getComputedStyle(m).opacity : null,
    drawerLinks: links,
  };
});
console.log('AFTER CLICK:', JSON.stringify(state, null, 1));

// screenshot the open drawer
await p.screenshot({ path: 'drawer-open.png' });

// test close
await p.locator('.wixui-hamburger-close-button').click();
await p.waitForTimeout(400);
const vis = await p.evaluate(() => getComputedStyle(document.querySelector('.HamburgerOverlay547129737__root')).visibility);
console.log('after close, overlay visibility:', vis);

await b.close();
