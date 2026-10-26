const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {readDocs} = require('./doc-inventory.cjs');
const remarkDocMoves = require('../plugins/remark-doc-moves.cjs');
// These title-and-icon crops repeat the page heading and have no additional content.
// Keep empty alt text limited to this reviewed set of decorative settings images.
// Approval follows reviewed bytes, not a release number. New or changed images
// require a reviewed fingerprint before they can use empty alt text.
const {createHash} = require('node:crypto');
const reviewedSettingsImages = require('./decorative-settings-images.json');
const decorativeSettingsImages = new Set(Object.keys(reviewedSettingsImages));
const decorativeImagesByDirectory = new Map(require('../versions.json')
  .filter(version => !version.startsWith('classic-'))
  .map(version => [`versioned_docs/version-${version}/settings/`, decorativeSettingsImages]));
function isDecorativeSettingsImage(file, url) {
  const settingsDirectory = [...decorativeImagesByDirectory.keys()].find(directory => file.startsWith(directory));
  if (!settingsDirectory || typeof url !== 'string' || /^[a-z][\w+.-]*:|^\//i.test(url)) return false;
  const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(file), decodeURIComponent(url.split(/[?#]/)[0])));
  const name = path.posix.basename(resolved);
  if (path.posix.dirname(resolved) !== `${settingsDirectory}images`
    || !decorativeImagesByDirectory.get(settingsDirectory).has(name)) return false;
  try {
    const bytes = fs.readFileSync(path.join(__dirname, '..', resolved));
    return createHash('sha256').update(bytes).digest('hex') === reviewedSettingsImages[name];
  } catch (error) {
    if (error.code === 'ENOENT') return false;
    throw error;
  }
}

function assertImageAlt(node, file) {
  const jsx = ['mdxJsxFlowElement', 'mdxJsxTextElement'].includes(node.type) && node.name === 'img';
  if (node.type !== 'image' && !jsx) return;
  const attribute = name => node.attributes.find(attr => attr.type === 'mdxJsxAttribute' && attr.name === name)?.value;
  const alt = jsx ? attribute('alt') : node.alt;
  const url = jsx ? attribute('src') : node.url;
  // Literal JSX paths bypass Markdown asset processing and resolve against the
  // published page URL. They cannot establish approval for decorative images.
  assert.ok((typeof alt === 'string' && alt.trim()) || (!jsx && alt === '' && isDecorativeSettingsImage(file, url)), `${file}: missing image alt text; use Markdown syntax for reviewed decorative assets`);
  return {alt, url};
}


async function main() {
  const root = path.join(__dirname, '..');
  const entries = readDocs(root);
  const {compile, createProcessor} = await import('@mdx-js/mdx');
  const {default: frontmatter} = await import('remark-frontmatter');
  const {default: gfm} = await import('remark-gfm');
  const {default: GithubSlugger} = await import('github-slugger');
  const plugins = [frontmatter, gfm, remarkDocMoves];
  const docs = new Map();
  const walk = (node, fn) => { fn(node); (node.children || []).forEach(child => walk(child, fn)); };
  assert.equal(new Set(entries.map(entry => entry.route)).size, entries.length, 'Duplicate document route');
  for (const entry of entries) {
    await compile({value: entry.content, path: path.join(root, entry.destination)}, {remarkPlugins: plugins});
    const tree = createProcessor({remarkPlugins: plugins}).parse(entry.content);
    const ids = new Set(), slugger = new GithubSlugger();
    walk(tree, node => {
      if (node.type !== 'heading') return;
      let text = '';
      walk(node, child => { if (['text', 'inlineCode'].includes(child.type)) text += child.value; });
      const explicit = text.match(/\s*\{#([^}]+)\}$/);
      ids.add(explicit ? explicit[1] : slugger.slug(text));
    });
    docs.set(entry.destination, {tree, ids});
  }
  for (const [file, doc] of docs) walk(doc.tree, node => {
    assertImageAlt(node, file);
    if (!['link', 'image', 'definition'].includes(node.type)) return;
    const url = remarkDocMoves.resolveMovedDocLink(path.join(root, file), node.url);
    if (/^[a-z][\w+.-]*:|^\/\//i.test(url)) return;
    const [base, anchor] = url.split('#');
    if (base.startsWith('/')) return; // Public routes are checked by the production build.
    const resolved = base ? path.posix.normalize(path.posix.join(path.posix.dirname(file), decodeURIComponent(base))) : file;
    assert.ok(fs.existsSync(path.join(root, resolved)), `${file}: broken link ${node.url}`);
    if (anchor && docs.has(resolved)) assert.ok(docs.get(resolved).ids.has(decodeURIComponent(anchor)), `${file}: broken anchor ${node.url}`);
  });
  for (const version of new Set(entries.map(entry => entry.version))) {
    const sidebar = require(path.join(root, `versioned_sidebars/version-${version}-sidebars.json`));
    const ids = [];
    const flatten = items => items.forEach(item => typeof item === 'string' ? ids.push(item) : flatten(item.items));
    flatten(sidebar.docsSidebar);
    assert.equal(ids.length, new Set(ids).size, 'Duplicate sidebar entry');
    assert.deepEqual(ids.sort(), entries.filter(entry => entry.version === version).map(entry => entry.id).sort());
  }
  const routes = new Set(entries.map(entry => entry.route));
  for (const route of Object.values(require('../src/utils/resolveLegacyHash.cjs').routes)) assert.ok(routes.has(route), `Unknown redirect destination: ${route}`);
  console.log(`Validated ${entries.length} documents, sidebars, local links, images, anchors, and redirect destinations.`);
}
module.exports = {assertImageAlt, isDecorativeSettingsImage};
if (require.main === module) main().catch(error => { console.error(error); process.exitCode = 1; });
