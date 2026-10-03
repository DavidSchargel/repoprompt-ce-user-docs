const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const remarkIdealImages = require('../plugins/remark-ideal-images.cjs');
const {assetRequireAttributeValue} = require('@docusaurus/mdx-loader/lib/remark/utils');
const root = path.join(__dirname, '..');

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

function imageTree(file, hash = '') {
  const value = assetRequireAttributeValue(`!/loaders/url-loader!${file}`, hash);
  return {type: 'root', children: [{type: 'paragraph', children: [{
    type: 'mdxJsxTextElement', name: 'img', attributes: [
      {type: 'mdxJsxAttribute', name: 'alt', value: 'Informative alt text'},
      {type: 'mdxJsxAttribute', name: 'src', value},
    ], children: [],
  }]}]};
}

test('local PNG and JPEG Markdown imports reach ideal-image without string coercion', () => {
  for (const file of ['./example.png', './example.jpg', './example.JPEG']) {
    const tree = imageTree(file);
    remarkIdealImages()(tree);
    const image = tree.children[0].children[0];
    const value = image.attributes[1].value;
    assert.equal(value.data.estree.body[0].expression.type, 'CallExpression');
    assert.equal(value.data.estree.body[0].expression.arguments[0].value, file);
    assert.equal(value.value, `require(${JSON.stringify(file)})`);
    assert.equal(image.attributes[0].value, 'Informative alt text');
    assert.equal(tree.children[0].type, 'paragraph');
  }
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

test('published blog, versioned docs, and page content parse as strict MDX', async (t) => {
  const {compile} = await import('@mdx-js/mdx');
  const {default: frontmatter} = await import('remark-frontmatter');
  const {walkFiles} = require('../scripts/llm-markdown.cjs');
  const directories = ['blog', 'src/pages', ...require('../versions.json').map((version) => `versioned_docs/version-${version}`)];
  const failures = [];
  for (const directory of directories) {
    const files = walkFiles(path.join(root, directory)).filter((file) => /\.mdx?$/.test(file)).sort();
    assert.ok(files.length > 0, `No Markdown content found in ${directory}`);
    for (const file of files) {
      try {
        await compile({path: file, value: fs.readFileSync(file, 'utf8')}, {remarkPlugins: [frontmatter]});
      } catch (error) {
        failures.push(`${path.relative(root, file)}:${error.line || error.place?.line || '?'}:${error.column || error.place?.column || '?'} ${error.message}`);
      }
    }
    t.diagnostic(`Checked ${files.length} Markdown/MDX files in ${directory}`);
  }
  assert.deepEqual(failures, [], 'Published content contains strict-MDX parse errors');
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

test('version, theme, plugin, and redirect contracts are intact', () => {
  const config = require('../docusaurus.config.js');
  const versions = require('../versions.json');
  assert.deepEqual(versions, ['1.5.0', 'classic-2.1.0']);
  const docs = config.presets[0][1].docs;
  assert.equal(docs.includeCurrentVersion, false);
  assert.equal(docs.lastVersion, '1.5.0');
  assert.equal(docs.versions['1.5.0'].path, '');
  assert.equal(config.future.v4, true);
  assert.equal(config.themes[0][0], 'cosmos-docusaurus-theme');
  const plugins = config.plugins.map((plugin) => Array.isArray(plugin) ? plugin[0] : plugin);
  for (const name of ['docusaurus-plugin-llms', 'docusaurus-plugin-copy-page-button', 'docusaurus-plugin-image-zoom', '@docusaurus/plugin-ideal-image']) assert.ok(plugins.includes(name));
  const redirect = config.plugins.find((plugin) => plugin[0] === '@docusaurus/plugin-client-redirects')[1].redirects[0];
  assert.deepEqual(redirect.from, ['/claim', '/unsubscribe', '/appcast', '/pricing', '/roadmap', '/prompt-anatomy']);
  assert.equal(redirect.to, '/');
});
