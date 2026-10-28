const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const remarkDocMoves = require('../plugins/remark-doc-moves.cjs');

test('current Agent Mode migration keeps old routes as direct redirects', () => {
  const {readDocs} = require('../scripts/doc-inventory.cjs');
  const docs = readDocs();
  const routes = new Set(docs.map(doc => doc.route));
  const moves = require('../src/utils/agentModeDocMoves.cjs');
  const config = require('../docusaurus.config.js');
  const redirects = config.plugins.find(plugin => Array.isArray(plugin) && plugin[0] === '@docusaurus/plugin-client-redirects')[1].redirects;
  assert.ok(!docs.some(doc => doc.version === '1.7.0' && doc.route.startsWith('/docs/sessions/')));
  for (const [from, to] of Object.entries(moves)) {
    assert.ok(routes.has(to), `Missing destination ${to}`);
    assert.ok(!routes.has(`${from}/`), `Redirect shadows document ${from}`);
    assert.ok(redirects.some(redirect => [redirect.from].flat().includes(from) && redirect.to === to));
    assert.equal(remarkDocMoves.resolveMovedDocLink(null, `${from}/?view=all#details`), `${to}?view=all#details`);
  }
  const source = path.resolve('versioned_docs/version-1.7.0/index.mdx');
  assert.equal(remarkDocMoves.resolveMovedDocLink(source, './sessions/oracle.mdx#attach-files-to-an-oracle-consultation'), './agent-mode/oracle.mdx#attach-files-to-an-oracle-consultation'.replace(/^\.\//, ''));
});

test('legacy links resolve during MDX compilation without changing source content', async () => {
  const {compile} = await import('@mdx-js/mdx');
  const source = path.resolve(__dirname, 'fixtures/page.mdx');
  const content = '[Example](/docs/agent-mode/providers/)';
  const result = String(await compile({value: content, path: source}, {
    remarkPlugins: [remarkDocMoves],
  }));
  assert.ok(content.includes('/docs/agent-mode/providers/'));
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
