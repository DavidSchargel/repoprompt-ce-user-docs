/**
 * Checks legacy redirects and MDX link rewriting, version labels and routes,
 * LLM export configuration, and search-result origins and version membership.
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {createRequire} = require('node:module');
const remarkDocMoves = require('../plugins/remark-doc-moves.cjs');
const {assertSearchResultRoute} = require('../scripts/check-artifacts.cjs');

test('current Agent Mode migration keeps old routes as direct redirects', () => {
  const {readDocs} = require('../scripts/doc-inventory.cjs');
  const docs = readDocs();
  const routes = new Set(docs.map(doc => doc.route));
  const moves = require('../src/utils/agentModeDocMoves.cjs');
  const config = require('../docusaurus.config.js');
  const redirects = config.plugins.find(plugin => Array.isArray(plugin) && plugin[0] === '@docusaurus/plugin-client-redirects')[1].redirects;
  for (const [from, to] of Object.entries(moves)) {
    assert.ok(routes.has(to), `Missing destination ${to}`);
    assert.ok(!routes.has(`${from}/`), `Redirect shadows document ${from}`);
    assert.ok(redirects.some(redirect => [redirect.from].flat().includes(from) && redirect.to === to));
    assert.equal(remarkDocMoves.resolveMovedDocLink(null, `${from}/?view=all#details`), `${to}?view=all#details`);
  }
  const source = path.resolve('versioned_docs/version-1.7.0/index.mdx');
  assert.equal(remarkDocMoves.resolveMovedDocLink(source, './sessions/oracle.mdx#attach-files-to-an-oracle-consultation'), './agent-mode/oracle.mdx#attach-files-to-an-oracle-consultation'.replace(/^\.\//, ''));
});

test('legacy links resolve during MDX compilation', async () => {
  const {compile} = await import('@mdx-js/mdx');
  const source = path.resolve(__dirname, 'fixtures/page.mdx');
  const content = '[Example](/docs/agent-mode/providers/)';
  const result = String(await compile({value: content, path: source}, {
    remarkPlugins: [remarkDocMoves],
  }));
  assert.ok(result.includes('/docs/providers/overview/'));
  assert.ok(!result.includes('/docs/agent-mode/providers/'));
});

test('moved links preserve suffixes and leave unrelated URLs unchanged', () => {
  const source = path.resolve(__dirname, 'fixtures/page.mdx');
  const resolve = url => remarkDocMoves.resolveMovedDocLink(source, url);
  for (const suffix of ['', '/', '?view=all#details', '/?view=all#details']) {
    assert.equal(resolve(`/docs/agent-mode/providers${suffix}`),
      `/docs/providers/overview/${suffix.replace(/^\//, '')}`);
  }
  assert.equal(resolve('/docs/agent-mode/sessions/#details'), '/docs/agent-mode/overview/#details');
  for (const url of ['https://example.com/docs/agent-mode/providers/', '//example.com/docs/agent-mode/providers/', '/docs/agent-mode/providers/other/', '#details']) {
    assert.equal(resolve(url), url);
  }
  const tree = {type: 'root', children: [{type: 'definition', url: '/docs/agent-mode/providers/'}]};
  remarkDocMoves()(tree, {path: source});
  assert.equal(tree.children[0].url, '/docs/providers/overview/');
});

// Exercise the real config with synthetic CE versions, independent of editorial releases.
test('documentation labels omit zero patches without changing version IDs or published routes', () => {
  const filename = path.resolve(__dirname, '../docusaurus.config.js');
  const configRequire = createRequire(filename);
  const versions = ['9.4.0', '9.3.0', '9.2.5', 'classic-2.1.0'];
  const fixtureRequire = Object.assign(
    id => id === './versions.json' ? versions : configRequire(id),
    {resolve: configRequire.resolve},
  );
  const context = {module: {exports: {}}, require: fixtureRequire, process: {env: {}}, URL};
  vm.runInNewContext(fs.readFileSync(filename, 'utf8'), context, {filename});
  const config = context.module.exports;
  const docs = config.presets[0][1].docs;
  assert.equal(docs.lastVersion, versions[0]);
  assert.equal(docs.includeCurrentVersion, false);
  assert.deepEqual(Object.keys(docs.versions), versions);
  const llm = config.plugins.find(plugin => Array.isArray(plugin) && plugin[0] === 'docusaurus-plugin-llms')[1];
  for (const [id, label, route, banner] of [
    ['9.4.0', '9.4', '', 'none'],
    ['9.3.0', '9.3', '9.3.0', 'unmaintained'],
    ['9.2.5', '9.2.5', '9.2.5', 'unmaintained'],
    ['classic-2.1.0', 'Classic 2.1', 'classic-2.1.0', 'unmaintained'],
  ]) {
    assert.equal(docs.versions[id].label, label);
    assert.equal(docs.versions[id].path, route);
    assert.equal(docs.versions[id].banner, banner);
    const directory = llm.docsDir.find(entry => entry.path === `versioned_docs/version-${id}`);
    assert.equal(directory.routeBasePath, ['docs', route].filter(Boolean).join('/'));
    assert.equal(directory.label, id.startsWith('classic-') ? label : `Community Edition ${label}`);
  }
});

test('search result origins accept a trailing slash in the site URL', () => {
  for (const baseUrl of ['/', '/project/']) {
    const config = {url: 'https://example.invalid/', baseUrl};
    const routes = new Set(['/docs/', '/docs/guide/']);
    assert.equal(assertSearchResultRoute({u: `${config.url.slice(0, -1)}${baseUrl}docs/guide/#heading`}, 'current', routes, config), 'docs/guide/');
    assert.throws(() => assertSearchResultRoute({u: 'https://external.invalid/docs/'}, 'current', routes, config), /External search result/);
  }
});

test('search results must belong to the exact version inventory', () => {
  const config = {url: 'https://example.invalid', baseUrl: '/project/'};
  const current = new Set(['/docs/', '/docs/guide/']);
  const archived = new Set(['/docs/archive/', '/docs/archive/guide/']);
  const result = route => ({u: `https://example.invalid/project${route}`});
  assert.equal(assertSearchResultRoute(result('/docs/archive/guide/'), 'archived', archived, config), 'docs/archive/guide/');
  assert.throws(() => assertSearchResultRoute(result('/docs/archive/guide/'), 'current', current, config), /Wrong-version/);
  assert.throws(() => assertSearchResultRoute(result('/docs/guide/'), 'archived', archived, config), /Wrong-version/);
  assert.throws(() => assertSearchResultRoute(result('/docs/missing/'), 'current', current, config), /Wrong-version/);
  assert.throws(() => assertSearchResultRoute({u: 'https://example.invalid/docs/guide/'}, 'current', current, config), /outside base path/);
});
