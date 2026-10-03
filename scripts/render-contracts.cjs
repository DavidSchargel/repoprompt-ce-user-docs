const assert = require('node:assert/strict');
const postcss = require('postcss');

function assertResourceUrl(value, label) {
  assert.equal(typeof value, 'string', `${label}: resource URL is not a string`);
  assert.ok(value.trim(), `${label}: empty resource URL`);
  assert.doesNotMatch(decodeURIComponent(value), /\[object\s|^(?:undefined|null)$/i, `${label}: serialized non-URL resource ${value}`);
  assert.ok(!/\s/.test(value), `${label}: unescaped whitespace in resource URL ${value}`);
  const url = new URL(value, 'https://example.invalid/');
  assert.ok(['http:', 'https:', 'data:'].includes(url.protocol), `${label}: unsupported resource protocol ${url.protocol}`);
}

function assertCosmosLayers(css) {
  const tree = postcss.parse(css);
  let infimaLayer = false;
  let cosmosBaseFont = false;
  tree.walkAtRules('layer', (rule) => {
    if (rule.params === 'docusaurus.infima' && rule.nodes?.length) infimaLayer = true;
  });
  tree.walkDecls('--ifm-font-family-base', (decl) => {
    if (!decl.value.includes('Outfit')) return;
    for (let parent = decl.parent; parent; parent = parent.parent) {
      if (parent.type === 'atrule' && parent.name === 'layer') return;
    }
    cosmosBaseFont = true;
  });
  assert.ok(infimaLayer, 'Missing native Infima cascade layer; per-file layer polyfills break Cosmos precedence');
  assert.ok(cosmosBaseFont, 'Missing unlayered Cosmos Outfit font token');
}

module.exports = {assertResourceUrl, assertCosmosLayers};
