const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const remarkDocMoves = require('../plugins/remark-doc-moves.cjs');

test('archived provider links resolve before MDX renders without changing archive files', async () => {
  const {compile} = await import('@mdx-js/mdx');
  const source = path.resolve(__dirname, '../versioned_docs/version-classic-2.1.0/ai-providers/api-providers.mdx');
  const content = fs.readFileSync(source, 'utf8');
  const result = String(await compile({value: content, path: source}, {
    remarkPlugins: [remarkDocMoves],
  }));
  assert.ok(content.includes('/docs/agent-mode/providers/'));
  assert.ok(result.includes('/docs/providers/overview/'));
  assert.ok(!result.includes('/docs/agent-mode/providers/'));
});

test('moved links preserve suffixes and leave unrelated URLs unchanged', () => {
  const source = path.resolve(__dirname, '../versioned_docs/version-classic-2.1.0/ai-providers/cli-providers.mdx');
  const resolve = url => remarkDocMoves.resolveMovedDocLink(source, url);
  for (const suffix of ['', '/', '?view=all#details', '/?view=all#details']) {
    assert.equal(resolve(`/docs/agent-mode/providers${suffix}`),
      `/docs/providers/overview/${suffix.replace(/^\//, '')}`);
  }
  assert.equal(resolve('/docs/agent-mode/sessions/#details'), '/docs/sessions/overview/#details');
  assert.equal(resolve('../../version-1.6.0/agent-mode/providers.mdx#details'),
    '../../version-1.6.0/providers/overview.mdx#details');
  for (const url of ['https://example.com/docs/agent-mode/providers/', '//example.com/docs/agent-mode/providers/', '/docs/agent-mode/providers/other/', '#details']) {
    assert.equal(resolve(url), url);
  }
  const tree = {type: 'root', children: [{type: 'definition', url: '/docs/agent-mode/providers/'}]};
  remarkDocMoves()(tree, {path: source});
  assert.equal(tree.children[0].url, '/docs/providers/overview/');
});
