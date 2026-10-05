const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {walkFiles, exportFiles, localImageEdits} = require('./llm-markdown.cjs');

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map(([tag]) => {
    const attributes = {};
    for (const match of tag.matchAll(/([^\s=<>/]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
      attributes[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4];
    }
    return attributes;
  });
}

function assertNoTwitter(html, label) {
  for (const meta of tags(html, 'meta')) {
    assert.ok(![meta.name, meta.property].some((value) => /^twitter:/i.test(value || '')), `${label}: forbidden Twitter metadata`);
  }
}

function findResponsiveImages(pages) {
  return pages.flatMap((html) => tags(html, 'img')).filter((image) => image.src?.includes('/assets/ideal-img/'));
}

async function main() {
  const root = path.join(__dirname, '..');
  const directory = path.join(root, 'build');
  const config = require('../docusaurus.config.js');
  const files = walkFiles(directory);
  for (const file of files.filter((name) => name.endsWith('.html'))) {
    assertNoTwitter(fs.readFileSync(file, 'utf8'), path.relative(directory, file));
  }
  for (const route of ['', 'docs/', 'docs/classic-2.1.0/', 'blog/']) {
    const html = fs.readFileSync(path.join(directory, route, 'index.html'), 'utf8');
    const meta = tags(html, 'meta');
    assert.ok(/<title\b[^>]*>[^<]+<\/title>/i.test(html), `${route}: missing title`);
    assert.ok(meta.some((entry) => entry.name === 'description' && entry.content), `${route}: missing description`);
    assert.ok(meta.some((entry) => entry.property === 'og:title' && entry.content), `${route}: missing Open Graph title`);
    assert.ok(meta.some((entry) => entry.property === 'og:description' && entry.content), `${route}: missing Open Graph description`);
    const canonical = tags(html, 'link').find((entry) => entry.rel === 'canonical');
    assert.equal(canonical?.href, new URL(config.baseUrl + route, config.url).href, `${route}: canonical changed`);
    const links = tags(html, 'link');
    const icons = links.filter((entry) => entry.rel === 'icon');
    assert.equal(icons.length, 2, `${route}: missing or duplicate favicons`);
    assert.ok(icons.some((entry) => entry.href === `${config.baseUrl}favicon.ico`), `${route}: missing ICO`);
    assert.ok(icons.some((entry) => entry.href === `${config.baseUrl}favicon-96x96.png` && entry.sizes === '96x96' && entry.type === 'image/png'), `${route}: missing PNG icon`);
    assert.equal(links.find((entry) => entry.rel === 'apple-touch-icon')?.href, `${config.baseUrl}apple-touch-icon.png`);
    assert.equal(links.find((entry) => entry.rel === 'manifest')?.href, `${config.baseUrl}site.webmanifest`);
  }
  assert.ok(!fs.existsSync(path.join(directory, 'images/site/favicon.png')), 'Obsolete favicon was published');
  const manifest = JSON.parse(fs.readFileSync(path.join(directory, 'site.webmanifest'), 'utf8'));
  for (const icon of manifest.icons) {
    const pathname = new URL(icon.src, new URL(config.baseUrl + 'site.webmanifest', config.url)).pathname;
    assert.ok(pathname.startsWith(config.baseUrl), 'Manifest icon escaped the configured base path');
    const png = fs.readFileSync(path.join(directory, pathname.slice(config.baseUrl.length)));
    assert.equal(png.subarray(1, 4).toString(), 'PNG');
    assert.equal(`${png.readUInt32BE(16)}x${png.readUInt32BE(20)}`, icon.sizes, `Incorrect dimensions for ${icon.src}`);
  }
  for (const route of ['claim', 'unsubscribe', 'appcast', 'pricing', 'roadmap', 'prompt-anatomy']) {
    const html = fs.readFileSync(path.join(directory, route, 'index.html'), 'utf8');
    assert.equal(tags(html, 'meta').find((entry) => entry['http-equiv'] === 'refresh')?.content, `0; url=${config.baseUrl}`, `${route}: redirect changed`);
  }
  for (const file of ['llms.txt', 'llms-full.txt', 'docs.md', 'docs/classic-2.1.0.md']) {
    assert.ok(fs.readFileSync(path.join(directory, file), 'utf8').trim(), `${file}: missing or empty export`);
  }
  for (const file of exportFiles(directory)) {
    assert.equal((await localImageEdits(fs.readFileSync(file, 'utf8'))).length, 0, `${file}: unresolved local image in LLM export`);
  }
  const docsDirectory = path.join(directory, 'docs') + path.sep;
  const docsPages = files.filter((file) => file.startsWith(docsDirectory) && file.endsWith('.html'));
  const images = findResponsiveImages(docsPages.map((file) => fs.readFileSync(file, 'utf8')));
  assert.ok(images.length > 0, 'No responsive Markdown images found across the documentation');
  for (const image of images) {
    assert.ok(image.alt?.trim() && image.srcset, `Markdown ideal-image alt text or srcset missing: ${image.src}`);
    assert.equal(image.loading, 'lazy', `Image is not lazy-loaded: ${image.src}`);
    for (const candidate of image.srcset.split(', ')) {
      const pathname = new URL(candidate.split(' ')[0], config.url).pathname;
      assert.ok(pathname.startsWith(config.baseUrl), 'Image escaped the configured base path');
      assert.ok(fs.existsSync(path.join(directory, decodeURIComponent(pathname.slice(config.baseUrl.length)))), `Missing responsive image ${pathname}`);
    }
  }
  console.log('Artifact QA passed: no Twitter metadata, SEO retained, routes/redirects intact, clean LLM exports, lazy responsive Markdown images.');
}

module.exports = {tags, assertNoTwitter, findResponsiveImages};
if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
