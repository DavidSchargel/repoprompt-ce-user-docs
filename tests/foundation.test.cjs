const test = require('node:test');
const assert = require('node:assert/strict');
const remarkIdealImages = require('../plugins/remark-ideal-images.cjs');
const {assetRequireAttributeValue} = require('@docusaurus/mdx-loader/lib/remark/utils');

// Keep this suite independent of page copy, provider catalogs, and release numbers.
// Validate actual documents and their links with scripts/check-content.cjs.

test('shared Head filters Twitter metadata while retaining other SEO', () => {
  const React = require('react');
  const SeoHead = require('../src/components/SeoHead.js');
  const {HelmetProvider} = require('react-helmet-async');
  const {renderToStaticMarkup} = require('react-dom/server');
  const context = {};
  const head = React.createElement(SeoHead, {
    meta: [{name: 'twitter:site', content: 'excluded'}, {name: 'robots', content: 'noindex'}],
  },
    React.createElement('title', null, 'Preserved title'),
    React.createElement('link', {rel: 'canonical', href: 'https://example.invalid/docs/'}),
    React.createElement('meta', {name: 'twitter:card', content: 'summary'}),
    React.createElement('meta', {property: 'Twitter:image', content: '/excluded.png'}),
    React.createElement('meta', {property: 'og:image', content: '/retained.png'}),
    React.createElement('meta', {property: 'og:title', content: 'Preserved title'}),
    React.createElement('meta', {name: 'description', content: 'Preserved description'}),
  );
  renderToStaticMarkup(React.createElement(HelmetProvider, {context}, head));
  const output = context.helmet.title.toString() + context.helmet.meta.toString() + context.helmet.link.toString();
  assert.doesNotMatch(output, /twitter:/i);
  for (const text of ['Preserved title', 'canonical', 'og:image', 'og:title', 'Preserved description']) assert.ok(output.includes(text));
  const plugin = require('../plugins/seo-policy.cjs')();
  assert.equal(plugin.configureWebpack().resolve.alias['@docusaurus/Head'], require.resolve('../src/components/SeoHead.js'));
});

test('LLM-only cleanup retains alt text, remote images, and code examples', async () => {
  const {sanitizeImages, localImageEdits} = require('../scripts/llm-markdown.cjs');
  const input = [
    '![Local screenshot](@site/static/images/example.png)',
    '![Future screenshot](../media/screen.png "Screenshot")',
    '![Static diagram](/images/diagram.svg)',
    '![Reference diagram][diagram]',
    '[diagram]: @site/static/diagram.svg',
    '![Remote diagram](https://example.invalid/diagram.png)',
    '`![Code example](@site/example.png)`',
    '```md\n![Fenced example](@site/example.png)\n```',
  ].join('\n\n');
  const output = await sanitizeImages(input);
  assert.ok(output.includes('Local screenshot'));
  assert.ok(output.includes('Future screenshot'));
  assert.ok(output.includes('Reference diagram'));
  assert.ok(output.includes('![Remote diagram](https://example.invalid/diagram.png)'));
  assert.ok(output.includes('`![Code example](@site/example.png)`'));
  assert.ok(output.includes('```md\n![Fenced example](@site/example.png)\n```'));
  assert.doesNotMatch(output, /@site\/static\/images\/example\.png|\.\.\/media|\[diagram\]:/);
  assert.equal((await localImageEdits(output)).length, 0);
  assert.equal(await sanitizeImages(output), output);
});

test('artifact metadata guard rejects quoted and minified Twitter tags', () => {
  const {assertNoTwitter} = require('../scripts/check-artifacts.cjs');
  for (const html of ['<meta name="twitter:card" content="summary">', '<meta property=twitter:image content=/image.png>', "<META NAME='Twitter:site' content='excluded'>"]) {
    assert.throws(() => assertNoTwitter(html, 'test'));
  }
  assert.doesNotThrow(() => assertNoTwitter('<meta property=og:title content="Preserved"><link rel=canonical href=/>', 'test'));
});

function imageTree(file, hash = '', alt = 'Informative alt text') {
  const value = assetRequireAttributeValue(`!/loaders/url-loader!${file}`, hash);
  return {type: 'root', children: [{type: 'paragraph', children: [{
    type: 'mdxJsxTextElement', name: 'img', attributes: [
      {type: 'mdxJsxAttribute', name: 'alt', value: alt},
      {type: 'mdxJsxAttribute', name: 'src', value},
    ], children: [],
  }]}]};
}

test('local PNG and JPEG Markdown imports reach ideal-image without string coercion', () => {
  for (const file of ['./example.png', './example.jpg', './example.JPEG']) {
    for (const alt of ['Informative alt text', '']) {
      const tree = imageTree(file, '', alt);
      remarkIdealImages()(tree);
      const image = tree.children[0].children[0];
      const value = image.attributes[1].value;
      assert.equal(value.data.estree.body[0].expression.type, 'CallExpression');
      assert.equal(value.data.estree.body[0].expression.arguments[0].value, file);
      assert.equal(value.value, `require(${JSON.stringify(file)})`);
      const altAttributes = image.attributes.filter(attribute => attribute.name === 'alt');
      assert.equal(altAttributes.length, 1);
      assert.equal(altAttributes[0].value, alt);
      assert.equal(tree.children[0].type, 'paragraph');
    }
  }
});

test('generated Markdown images retain empty alt without approving omitted JSX alt', () => {
  const tree = imageTree('./example.png', '', '');
  const image = tree.children[0].children[0];
  image.attributes = image.attributes.filter(attribute => attribute.name !== 'alt');
  remarkIdealImages()(tree);
  assert.equal(image.attributes.find(attribute => attribute.name === 'alt')?.value, '');
  const jsx = {type: 'mdxJsxTextElement', name: 'img', attributes: [
    {type: 'mdxJsxAttribute', name: 'src', value: './example.png'},
  ]};
  remarkIdealImages()({type: 'root', children: [jsx]});
  assert.equal(jsx.attributes.find(attribute => attribute.name === 'alt'), undefined);
});

test('LLM links preserve routes, fragments, site prefixes, and literal examples', async () => {
  const {rewriteDocLinks} = require('../scripts/llm-links.cjs');
  const source = 'docs/start.mdx';
  const routes = {[source]: '/docs/start/', 'docs/guide.mdx': '/docs/guide/'};
  const input = '[Guide](./guide.mdx#setup)\n[Here](#details)\n\n'
    + '[Reference][guide]\n\n[guide]: ./guide.mdx\n\n'
    + '[External](https://example.org/)\n`[Code](./guide.mdx)`';
  const result = await rewriteDocLinks(input, source, routes, 'https://example.invalid/project/');
  assert.ok(result.includes('[Guide](https://example.invalid/project/docs/guide/#setup)'));
  assert.ok(result.includes('[Here](https://example.invalid/project/docs/start/#details)'));
  assert.ok(result.includes('[guide]: https://example.invalid/project/docs/guide/'));
  assert.ok(result.includes('[External](https://example.org/)'));
  assert.ok(result.includes('`[Code](./guide.mdx)`'));
  await assert.rejects(
    rewriteDocLinks('[Missing](./missing.mdx)', source, routes, 'https://example.invalid/'),
    /Unresolved LLM link/,
  );
});

test('unsupported formats, URL fragments, queries, and remote images stay unchanged', () => {
  for (const [file, hash] of [['./example.webp', ''], ['./example.svg', ''], ['./example.png', '#detail'], ['./example.png?raw', '']]) {
    const tree = imageTree(file, hash);
    const before = structuredClone(tree);
    remarkIdealImages()(tree);
    assert.deepEqual(tree, before);
  }
  const remote = {type: 'root', children: [{type: 'image', url: 'https://example.invalid/image.png', alt: 'Remote image'}]};
  const before = structuredClone(remote);
  remarkIdealImages()(remote);
  assert.deepEqual(remote, before);
});

test('responsive-image QA discovers screenshots beyond the docs index', () => {
  const {findResponsiveImages} = require('../scripts/check-artifacts.cjs');
  const pages = [
    '<main>Documentation overview without screenshots</main>',
    '<img alt="Workspace screenshot" loading=lazy src=/assets/ideal-img/workspace.640.jpg srcset="/assets/ideal-img/workspace.320.jpg 320w, /assets/ideal-img/workspace.640.jpg 640w">',
    '<img alt="Unoptimized icon" src=/images/icon.svg>',
  ];
  const images = findResponsiveImages(pages);
  assert.equal(images.length, 1);
  assert.equal(images[0].alt, 'Workspace screenshot');
});

test('LLM export labels come from configuration and reject missing or empty labels', () => {
  const {getVersionLabel} = require('../scripts/finalize-llm-exports.cjs');
  const config = {plugins: ['unrelated-plugin', ['docusaurus-plugin-llms', {docsDir: [
    {path: 'versioned_docs/version-example', label: 'Example release'},
  ]}]]};
  assert.equal(getVersionLabel(config, 'example'), 'Example release');
  assert.throws(() => getVersionLabel(config, 'missing'), /Missing configured LLM export label/);
  config.plugins[1][1].docsDir[0].label = ' ';
  assert.throws(() => getVersionLabel(config, 'example'), /Missing configured LLM export label/);
});

test('current and historical documentation have distinct routes and matching export paths', () => {
  const config = require('../docusaurus.config.js');
  const versions = require('../versions.json');
  const docs = config.presets[0][1].docs;
  const sections = config.plugins.find(plugin => Array.isArray(plugin) && plugin[0] === 'docusaurus-plugin-llms')[1].docsDir;
  assert.ok(versions.length > 0);
  assert.equal(docs.includeCurrentVersion, false);
  assert.equal(docs.lastVersion, versions[0]);
  assert.equal(new Set(sections.map(section => section.routeBasePath)).size, versions.length);
  for (const [index, version] of versions.entries()) {
    const route = index === 0 ? '' : version;
    assert.equal(docs.versions[version].path, route);
    const section = sections.find(section => section.path === `versioned_docs/version-${version}`);
    assert.equal(section.routeBasePath, [docs.routeBasePath, route].filter(Boolean).join('/'));
    assert.ok(section.label.trim());
  }
});
