import { chromium } from 'playwright';
const b = await chromium.launch({ headless: true, executablePath: 'C:/Users/vishw/AppData/Local/ms-playwright/chromium-1140/chrome-win/chrome.exe' });
const p = await b.newPage();
await p.goto('https://wahcafe.com/', { waitUntil: 'domcontentloaded' });
await p.waitForTimeout(1000);
const ls = await p.evaluate(() => [...document.querySelectorAll('a[href]')].map(a => a.href).filter(h => h && !h.startsWith('javascript') && h !== '#'));
console.log('TOTAL LINKS:', ls.length);
console.log(ls.slice(0, 140).join('\n'));
await b.close();
