const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {tags} = require('./check-artifacts.cjs');
const {walkFiles, exportFiles} = require('./llm-markdown.cjs');
const {assertResourceUrl, assertCosmosLayers} = require('./render-contracts.cjs');

async function main() {
  const root = path.join(__dirname, '..');
  const directory = path.join(root, 'build');
  const config = require('../docusaurus.config.js');
  const origin = new URL(config.url).origin;
  const canonicalBase = new URL(config.baseUrl, config.url).href;
  const excluded = /repo\s*bench|benchmark|cloudflare|wrangler|privacy officer|contact us|mailto:|https?:\/\/(?:www\.)?(?:twitter|x)\.com\/|helpful links|localization|localisation|translation|[\w.+-]+@[\w.-]+\.[a-z]{2,}/i;
  const files = walkFiles(directory);
  const bannedAssets = require('../migration/item-4-asset-exclusions.json');
  const bannedHashes = new Set(bannedAssets.map((asset) => asset.sha256));
  const crypto = require('node:crypto');
  for (const file of [...files, ...walkFiles(path.join(root, 'static'))].filter((file) => /\.(png|jpe?g|webp|svg)$/i.test(file))) {
    const name = path.basename(file);
    assert.ok(!bannedAssets.some((asset) => name === asset.file || name.startsWith(asset.file.replace(/\.[^.]+$/, '') + '.')), `Excluded screenshot or generated variant: ${file}`);
    assert.ok(!bannedHashes.has(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')), `Renamed excluded screenshot: ${file}`);
  }
  const htmlFiles = files.filter((file) => file.endsWith('.html'));
  const cssFiles = files.filter((file) => /assets\/css\/.*\.css$/.test(file));
  assert.ok(cssFiles.length, 'Missing built stylesheets');
  assertCosmosLayers(cssFiles.map((file) => fs.readFileSync(file, 'utf8')).join('\n'));
  let checkedAssets = 0;
  function exists(url) {
    const parsed = new URL(url, config.url);
    if (parsed.origin !== origin) return;
    assert.ok(parsed.pathname.startsWith(config.baseUrl), `Escaped project base: ${url}`);
    const relative = decodeURIComponent(parsed.pathname.slice(config.baseUrl.length));
    const file = path.join(directory, relative);
    assert.ok(fs.existsSync(file) || fs.existsSync(path.join(file, 'index.html')), `Missing local output: ${url}`);
    checkedAssets++;
  }
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const label = path.relative(directory, file);
    const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ');
    assert.doesNotMatch(visible, excluded, `${label}: excluded public prose`);
    const meta = tags(html, 'meta');
    const redirect = meta.some((tag) => tag['http-equiv'] === 'refresh');
    const noindex = meta.some((tag) => tag.name === 'robots' && /noindex/.test(tag.content));
    if (redirect || label === '404.html' || /^(privacy|terms)\//.test(label) || config.noIndex) assert.ok(noindex, `${label}: missing noindex`);
    if (!config.noIndex && (label === 'index.html' || label.startsWith('docs/') || label === 'blog/index.html')) assert.equal(noindex, false, `${label}: public content unexpectedly marked noindex`);
    if (!redirect && label !== '404.html') {
      const canonical = tags(html, 'link').find((tag) => tag.rel === 'canonical')?.href;
      assert.ok(canonical?.startsWith(canonicalBase), `${label}: invalid canonical ${canonical}`);
      assert.ok(meta.some((tag) => tag.name === 'description' && tag.content?.trim()), `${label}: missing description`);
      assert.ok(meta.some((tag) => tag.property === 'og:image' && tag.content?.startsWith(canonicalBase)), `${label}: missing base-aware Open Graph image`);
    }
    function resource(value) {
      assertResourceUrl(value, label);
      if (!value.startsWith('data:')) exists(new URL(value, canonicalBase + label.replace(/index\.html$/, '')).href);
    }
    for (const image of tags(html, 'img')) {
      assert.ok(image.alt?.trim(), `${label}: image without alt`);
      resource(image.src);
      if (image.srcset) for (const candidate of image.srcset.split(',')) resource(candidate.trim().split(/\s+/)[0]);
    }
    for (const script of tags(html, 'script')) if (script.src !== undefined) resource(script.src);
    for (const link of tags(html, 'link')) if (['stylesheet','icon'].includes(link.rel)) resource(link.href);
  }
  const index = fs.readFileSync(path.join(directory, 'docs/index.html'), 'utf8');
  for (const exportName of ['llms.txt', 'llms-full.txt']) {
    const href = config.baseUrl + exportName;
    assert.ok(tags(index, 'a').some((tag) => tag.href === href), `Missing base-aware raw export link: ${href}`);
    exists(href);
  }
  for (const route of Object.values(require('../migration/legacy-doc-routes.json'))) exists(config.baseUrl + route.slice(1));
  const robots = fs.readFileSync(path.join(directory, 'robots.txt'), 'utf8');
  if (config.noIndex) {
    assert.ok(robots.includes(`Disallow: ${config.baseUrl}`));
  } else {
    assert.ok(robots.includes(`Sitemap: ${canonicalBase}sitemap.xml`));
    const sitemap = fs.readFileSync(path.join(directory, 'sitemap.xml'), 'utf8');
    for (const [, url] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      assert.ok(url.startsWith(canonicalBase));
      assert.doesNotMatch(url, /\/(claim|unsubscribe|appcast|pricing|roadmap|prompt-anatomy|documentation|privacy-policy|terms-and-conditions|privacy|terms|404)\/?$/);
      exists(url);
    }
  }
  for (const feed of ['rss.xml','atom.xml']) {
    const xml = fs.readFileSync(path.join(directory, 'blog', feed), 'utf8');
    assert.ok(xml.includes(`${canonicalBase}blog/`), `${feed}: incorrect feed base`);
    assert.doesNotMatch(xml, excluded, `${feed}: excluded content`);
  }
  const {unified} = await import('unified');
  const {default: remarkParse} = await import('remark-parse');
  const exports = exportFiles(directory);
  assert.equal(exports.filter((file) => file.endsWith('.md')).length, 82);
  for (const file of exports) {
    const text = fs.readFileSync(file, 'utf8');
    assert.doesNotMatch(text, excluded, `${file}: excluded LLM content`);
    const tree = unified().use(remarkParse).parse(text);
    function visit(node) {
      if (['link','definition'].includes(node.type)) {
        assert.doesNotMatch(node.url, /\.mdx(?:#|$)|versioned_docs|version-classic/, `${file}: unresolved source link`);
        if (!/^[a-z][\w+.-]*:|^\/\//i.test(node.url)) throw new Error(`${file}: relative export link ${node.url}`);
        exists(node.url);
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  }
  assert.ok(!files.some((file) => /(?:^|\/)(?:maintainers|migration|functions|\.github|i18n)(?:\/|$)/.test(path.relative(directory, file))));
  console.log(JSON.stringify({status: 'passed', htmlPages: htmlFiles.length, llmExports: exports.length, checkedLocalReferences: checkedAssets, baseUrl: config.baseUrl, indexable: !config.noIndex}));
}

main().catch((error) => {console.error(error); process.exitCode = 1;});
