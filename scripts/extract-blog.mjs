import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const HTML_PATH = resolve(ROOT, 'wix-archive/7.html');
const OUT_PATH = resolve(ROOT, 'scripts/data/blog.json');

const AUTHOR = 'LE CHÂTEAU';

function extractWarmupData(html) {
  const open = html.match(/<script[^>]*wix-warmup-data[^>]*>/);
  if (!open) throw new Error('wix-warmup-data script tag not found');
  const start = open.index + open[0].length;
  const end = html.indexOf('</script>', start);
  if (end === -1) throw new Error('wix-warmup-data closing tag not found');
  return JSON.parse(html.slice(start, end));
}

/** Concatenate all TEXT node content under a node (recursively). */
function collectText(nodes) {
  let out = '';
  for (const n of nodes || []) {
    if (n.type === 'TEXT') out += n.textData?.text ?? '';
    else out += collectText(n.nodes);
  }
  return out;
}

function listItemText(item) {
  const parts = (item.nodes || [])
    .map((child) => collectText(child.nodes).trim())
    .filter(Boolean);
  return parts.join(' ');
}

function renderList(items, ordered) {
  return items
    .filter((it) => it.type === 'LIST_ITEM')
    .map((it, i) => `${ordered ? `${i + 1}.` : '-'} ${listItemText(it)}`)
    .join('\n');
}

function renderBlockquote(node) {
  return (node.nodes || [])
    .map((p) => collectText(p.nodes).trim())
    .filter(Boolean)
    .map((p) => p.split('\n').map((l) => `> ${l}`).join('\n'))
    .join('\n\n');
}

function renderMarkdown(richContent) {
  const out = [];
  for (const node of richContent?.nodes || []) {
    switch (node.type) {
      case 'HEADING': {
        const level = node.headingData?.level || 2;
        out.push(`${'#'.repeat(level)} ${collectText(node.nodes).trim()}`);
        out.push('');
        break;
      }
      case 'PARAGRAPH': {
        const text = collectText(node.nodes).trim();
        if (text) {
          out.push(text);
          out.push('');
        }
        break;
      }
      case 'IMAGE': {
        const src = node.imageData?.image?.src?.id;
        if (src) {
          const alt = node.imageData?.altText || collectText(node.nodes).trim();
          out.push(`![${alt}](https://static.wixstatic.com/media/${src})`);
          out.push('');
        }
        break;
      }
      case 'BULLETED_LIST':
        out.push(renderList(node.nodes, false));
        out.push('');
        break;
      case 'ORDERED_LIST':
        out.push(renderList(node.nodes, true));
        out.push('');
        break;
      case 'BLOCKQUOTE':
        out.push(renderBlockquote(node));
        out.push('');
        break;
      default:
        break; // TEXT, CAPTION, LIST_ITEM are handled by their parents
    }
  }
  return out.join('\n').trimEnd() + '\n';
}

/** Convert a wix:image URI to a static.wixstatic.com/media CDN URL. */
function wixImageUrl(uri) {
  if (!uri) return null;
  const match = String(uri).match(/wix:image:\/\/v1\/([^/?#]+)/);
  const id = match ? match[1] : String(uri).split('#')[0];
  return id ? `https://static.wixstatic.com/media/${id}` : null;
}

const html = readFileSync(HTML_PATH, 'utf8');
const warmup = extractWarmupData(html);
const records =
  warmup.appsWarmupData?.dataBinding?.dataStore?.recordsByCollectionId?.['Blog/Posts'];
if (!records || typeof records !== 'object') {
  throw new Error('Blog/Posts records not found in warmup data');
}

const posts = Object.values(records)
  .map((record) => ({
    slug: record.slug,
    title: record.title,
    markdown: renderMarkdown(record.richContent),
    excerpt: record.excerpt,
    author: AUTHOR,
    publishedDate: record.publishedDate?.$date,
    readTime: record.timeToRead,
    coverImage: wixImageUrl(record.coverImage),
    categories: record.categories ?? [],
    tags: record.tags ?? [],
  }))
  .sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1));

mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, JSON.stringify(posts, null, 2));

console.log(`Extracted ${posts.length} posts -> ${OUT_PATH}`);
for (const post of posts) {
  console.log(
    `  ${post.slug}  markdown=${post.markdown.length} chars  cover=${post.coverImage}`,
  );
}
