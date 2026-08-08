import fs from 'node:fs';
const g = JSON.parse(fs.readFileSync('graph.json', 'utf8'));

const ext = {};
for (const p of g.pages) for (const l of p.externalLinks || []) {
  (ext[l.type] ??= new Set()).add(l.href);
}
console.log('=== EXTERNAL LINKS BY TYPE ===');
for (const [t, s] of Object.entries(ext)) {
  console.log(`\n[${t}] (${s.size}):`);
  for (const h of s) console.log('  ', h);
}

console.log('\n=== FORMS ===');
for (const p of g.pages) if (p.forms?.length) {
  const f = p.forms[0];
  console.log(p.path, '-> inputs:', JSON.stringify(f.inputs));
}

// sitemap inventory
for (const sm of ['https://wahcafe.com/sitemap.xml', 'https://www.wahcafe.com/sitemap.xml']) {
  try {
    const r = await fetch(sm);
    console.log(`\n=== ${sm} [${r.status}] ===`);
    if (r.ok) console.log((await r.text()).slice(0, 2000));
  } catch (e) { console.log(sm, 'ERR', String(e).slice(0, 120)); }
}
