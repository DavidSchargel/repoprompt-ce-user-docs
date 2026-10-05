const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {readDocs} = require('./doc-inventory.cjs');
// These title-and-icon crops repeat the page heading and have no additional content.
// Keep empty alt text limited to this reviewed set of decorative settings images.
const decorativeSettingsImages = new Set([
  'advanced.png',
  'agent-models.png',
  'agent-permissions.png',
  'agent-workflows.png',
  'api-providers.png',
  'appearance.png',
  'chat-settings.png',
  'context-builder.png',
  'copy-prompt-order.png',
  'custom-api.png',
  'keyboard-shortcuts.png',
  'manage-presets.png',
  'manage-workspaces.png',
  'mcp-server.png',
  'model-config.png',
  'model-presets.png',
  'model-router.png',
  'openrouter.png',
  'search-settings.png',
  'telemetry.png',
  'tools.png',
  'updates.png',
  'workflow-presets.png',
  'workspace-approvals.png',
]);


// Retained CE snapshots keep the same reviewed decorative-image allowance.
const settingsDirectories = require('../versions.json')
  .filter(version => !version.startsWith('classic-'))
  .map(version => `versioned_docs/version-${version}/settings/`);
function isDecorativeSettingsImage(file, url) {
  const settingsDirectory = settingsDirectories.find(directory => file.startsWith(directory));
  if (!settingsDirectory || typeof url !== 'string' || /^[a-z][\w+.-]*:|^\//i.test(url)) return false;
  const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(file), decodeURIComponent(url.split(/[?#]/)[0])));
  return path.posix.dirname(resolved) === `${settingsDirectory}images`
    && decorativeSettingsImages.has(path.posix.basename(resolved));
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
  const plugins = [frontmatter, gfm];
  const docs = new Map();
  const walk = (node, fn) => { fn(node); (node.children || []).forEach(child => walk(child, fn)); };
  assert.equal(new Set(entries.map(entry => entry.route)).size, entries.length, 'Duplicate document route');
  for (const entry of entries) {
    await compile(entry.content, {remarkPlugins: plugins});
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
    if (/^[a-z][\w+.-]*:|^\/\//i.test(node.url)) return;
    const [base, anchor] = node.url.split('#');
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
