const test = require('node:test');
const assert = require('node:assert/strict');
const {assertImageAlt} = require('../scripts/check-content.cjs');

test('Markdown and direct JSX images require reviewed paths for empty alt', async () => {
  const {createProcessor} = await import('@mdx-js/mdx');
  const file = 'versioned_docs/version-1.5.0/settings/agent-mode/overview.mdx';
  const validate = (source, destination = file) => {
    const walk = node => {
      assertImageAlt(node, destination);
      (node.children || []).forEach(walk);
    };
    walk(createProcessor().parse(source));
  };
  for (const url of ['../images/advanced.png', '../images/./advanced.png']) {
    validate(`![](${url})`);
    assert.throws(() => validate(`<img src="${url}" alt="" />`), /use Markdown syntax/);
    assert.throws(() => validate(`Text <img src="${url}" alt="" />`), /use Markdown syntax/);
    assert.throws(() => validate(`<img src="${url}" alt="" role="presentation" srcSet="generated.png 320w" />`), /use Markdown syntax/);
  }
  for (const url of ['./images/advanced.png', '../../images/advanced.png', '../images/unreviewed.png', 'https://example.com/images/advanced.png']) {
    assert.throws(() => validate(`![](${url})`), /missing image alt/);
    assert.throws(() => validate(`<img src="${url}" alt="" role="presentation" srcSet="generated.png 320w" />`), /missing image alt/);
    validate(`![Settings screenshot](${url})`);
    validate(`<img src="${url}" alt="Settings screenshot" />`);
  }
  assert.throws(() => validate('<img src="../images/advanced.png" role="presentation" />'), /missing image alt/);
  assert.throws(() => validate('![](../images/advanced.png)', 'versioned_docs/version-1.5.0/agent-mode/overview.mdx'), /missing image alt/);
});
