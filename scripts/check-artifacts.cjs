const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {walkFiles, exportFiles, localImageEdits} = require('./llm-markdown.cjs');
const {readDocs} = require('./doc-inventory.cjs');
const {assertImageAlt} = require('./check-content.cjs');

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

function assertResponsiveImageCandidate(candidate, config, directory) {
  const url = candidate.split(' ')[0];
  // Webpack can inline the native source of small screenshots in srcset.
  // These images have no filesystem path or deployment base path.
  if (url.startsWith('data:')) {
    assert.match(url, /^data:image\/(?:png|jpeg|gif|webp);base64,[A-Za-z0-9+/]+={0,2}$/, 'Invalid inline responsive image');
    return;
  }
  const resolved = new URL(url, config.url);
  assert.equal(resolved.origin, new URL(config.url).origin, 'External responsive image');
  const pathname = resolved.pathname;
  assert.ok(pathname.startsWith(config.baseUrl), 'Image escaped the configured base path');
  assert.ok(fs.existsSync(path.join(directory, decodeURIComponent(pathname.slice(config.baseUrl.length)))), `Missing responsive image ${pathname}`);
}

function assertSearchResultRoute(result, version, routes, config) {
  const url = new URL(result.u, config.url);
  assert.equal(url.origin, new URL(config.url).origin, `External search result for ${version}: ${result.u}`);
  assert.ok(url.pathname.startsWith(config.baseUrl), `Search result outside base path for ${version}: ${result.u}`);
  const route = url.pathname.slice(config.baseUrl.length);
  assert.ok(routes.has('/' + route), `Wrong-version search result for ${version}: ${result.u}`);
  return route;
}

async function main() {
  const root = path.join(__dirname, '..');
  const {createProcessor} = await import('@mdx-js/mdx');
  const {default: frontmatter} = await import('remark-frontmatter');
  const reviewedImagesByRoute = new Map();
  const docs = readDocs(root);
  for (const entry of docs) {
    const reviewed = new Set();
    const walk = node => {
      const image = assertImageAlt(node, entry.destination);
      if (image?.alt === '') reviewed.add(path.posix.parse(image.url).name);
      (node.children || []).forEach(walk);
    };
    walk(createProcessor({remarkPlugins: [frontmatter]}).parse(entry.content));
    reviewedImagesByRoute.set(entry.route, reviewed);
  }
  const directory = path.join(root, 'build');
  const config = require('../docusaurus.config.js');
  const docsOptions = config.presets.find(([name]) => name === 'classic')[1].docs;
  const docsRoutes = Object.values(docsOptions.versions).map(options =>
    [docsOptions.routeBasePath, options.path].filter(Boolean).join('/') + '/');
  const files = walkFiles(directory);
  const home = fs.readFileSync(path.join(directory, 'index.html'), 'utf8');
  const homeStyles = tags(home, 'link').filter((link) => link.rel === 'stylesheet').map((link) => {
    const pathname = new URL(link.href, config.url).pathname;
    return fs.readFileSync(path.join(directory, pathname.slice(config.baseUrl.length)), 'utf8');
  }).join('\n');
  for (const token of ['tweet-font-color', 'tweet-font-family', 'tweet-bg-color', 'tweet-body-font-size']) {
    assert.match(homeStyles, new RegExp(`--${token}\\s*:`), `Homepage tweet theme is missing ${token}`);
  }
  for (const file of files.filter((name) => name.endsWith('.html'))) {
    assertNoTwitter(fs.readFileSync(file, 'utf8'), path.relative(directory, file));
  }
  for (const route of ['', ...docsRoutes, 'blog/']) {
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
  for (const file of ['llms.txt', 'llms-full.txt', ...docsRoutes.map(route => route.replace(/\/$/, '.md'))]) {
    assert.ok(fs.readFileSync(path.join(directory, file), 'utf8').trim(), `${file}: missing or empty export`);
  }
  for (const file of exportFiles(directory)) {
    assert.equal((await localImageEdits(fs.readFileSync(file, 'utf8'))).length, 0, `${file}: unresolved local image in LLM export`);
  }
  if (!config.themeConfig.algolia) {
    for (const [version, options] of Object.entries(docsOptions.versions)) {
      const versionRoutes = new Set(docs.filter(entry => entry.version === version).map(entry => entry.route));
      const versionRoute = [docsOptions.routeBasePath, options.path].filter(Boolean).join('/') + '/';
      const indexDirectory = options.path ? path.join(directory, versionRoute) : directory;
      const indexFile = path.join(indexDirectory, 'search-index.json');
      assert.ok(fs.existsSync(indexFile), `Missing local search index for ${version}`);
      const shards = JSON.parse(fs.readFileSync(indexFile, 'utf8'));
      const results = shards.flatMap((shard) => shard.documents || []);
      assert.ok(results.length > 0, `Empty local search index for ${version}`);
      for (const result of results) {
        const route = assertSearchResultRoute(result, version, versionRoutes, config);
        assert.ok(fs.existsSync(path.join(directory, route, 'index.html')), `Dead search result for ${version}: ${result.u}`);
      }
    }
  }
  const docsDirectory = path.join(directory, docsOptions.routeBasePath) + path.sep;
  const docsPages = files.filter((file) => file.startsWith(docsDirectory) && file.endsWith('.html'));
  const images = findResponsiveImages(docsPages.map((file) => fs.readFileSync(file, 'utf8')));
  assert.ok(images.length > 0, 'No responsive Markdown images found across the documentation');
  for (const file of docsPages) {
    const route = '/' + path.relative(directory, path.dirname(file)).split(path.sep).join('/') + '/';
    const reviewed = reviewedImagesByRoute.get(route) || new Set();
    for (const image of findResponsiveImages([fs.readFileSync(file, 'utf8')])) {
      const name = path.posix.basename(image.src).match(/^(.*)\.[a-f0-9]{7}\.\d+\.[^.]+$/)?.[1];
      assert.ok((image.alt?.trim() || (image.alt === '' && reviewed.has(name))) && image.srcset, `Markdown ideal-image alt text or srcset missing: ${image.src}`);
      assert.equal(image.loading, 'lazy', `Image is not lazy-loaded: ${image.src}`);
      for (const candidate of image.srcset.split(', ')) {
        assertResponsiveImageCandidate(candidate, config, directory);
      }
    }
  }
  console.log('Artifact QA passed: no Twitter metadata, SEO retained, routes/redirects intact, local search results valid when enabled, clean LLM exports, lazy responsive Markdown images.');
}

module.exports = {tags, assertNoTwitter, findResponsiveImages, assertSearchResultRoute, assertResponsiveImageCandidate};
if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
