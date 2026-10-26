const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const remarkDocMoves = require('../plugins/remark-doc-moves.cjs');

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
  assert.equal(resolve('/docs/agent-mode/sessions/#details'), '/docs/sessions/overview/#details');
  for (const url of ['https://example.com/docs/agent-mode/providers/', '//example.com/docs/agent-mode/providers/', '/docs/agent-mode/providers/other/', '#details']) {
    assert.equal(resolve(url), url);
  }
  const tree = {type: 'root', children: [{type: 'definition', url: '/docs/agent-mode/providers/'}]};
  remarkDocMoves()(tree, {path: source});
  assert.equal(tree.children[0].url, '/docs/providers/overview/');
});
