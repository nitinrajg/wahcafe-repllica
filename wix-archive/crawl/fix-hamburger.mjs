import fs from 'node:fs';
import path from 'node:path';

const root = '..'; // wahcafe dir
const files = ['1.html', '2.html', '3.html', '4.html', '5.html', '6.html', '7.html'];
const MARK = 'WAHCAFE_HAMBURGER_FIX';

const INJECT = `<style data-${MARK}="">
.HamburgerOverlay547129737__root.HamburgerOverlay547129737--isMenuOpen{visibility:visible!important;z-index:99999;top:0!important;height:100vh!important}
</style>
<script data-${MARK}="">
(function () {
  var overlay = document.querySelector('.HamburgerOverlay547129737__root');
  var menu = overlay && overlay.querySelector('.ZBf0K1');
  var openBtn = document.querySelector('.wixui-hamburger-open-button');
  var closeBtn = document.querySelector('.wixui-hamburger-close-button');
  function open() {
    if (!overlay) return;
    overlay.classList.add('HamburgerOverlay547129737--isMenuOpen');
    overlay.setAttribute('data-visible', 'true');
    if (menu) { menu.style.opacity = '1'; menu.style.transform = 'none'; menu.style.clipPath = 'inset(0)'; }
    document.body.style.overflow = 'hidden';
  }
  function close() {
    if (!overlay) return;
    overlay.classList.remove('HamburgerOverlay547129737--isMenuOpen');
    overlay.setAttribute('data-visible', 'false');
    if (menu) { menu.style.opacity = ''; menu.style.transform = ''; menu.style.clipPath = ''; }
    document.body.style.overflow = '';
  }
  if (openBtn) openBtn.addEventListener('click', open);
  if (closeBtn) closeBtn.addEventListener('click', close);
  if (overlay) overlay.addEventListener('click', function (e) {
    if (e.target === overlay || (e.target.classList && e.target.classList.contains('HamburgerOverlay547129737__overlay'))) close();
  });
})();
<\/script>
`;

for (const f of files) {
  const p = path.join(root, f);
  const src = fs.readFileSync(p, 'utf8');
  if (src.includes(MARK)) { console.log(f, 'already patched, skip'); continue; }
  const bak = f.replace('.html', '.html.bak');
  if (!fs.existsSync(path.join(root, bak))) fs.copyFileSync(p, path.join(root, bak));
  const out = src.replace('</body>', INJECT + '</body>');
  fs.writeFileSync(p, out);
  console.log(f, 'patched', '(' + src.length + ' -> ' + out.length + ' bytes)');
}
