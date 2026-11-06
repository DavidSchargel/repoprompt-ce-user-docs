/**
 * Checks shared metadata filtering, LLM Markdown transformations and exports, image
 * processing adapters, and responsive-image artifact validation.
 */
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

test('LLM exports are generated directly with versioned routes and resolved content', async (t) => {
  const fs = require('node:fs');
  const path = require('node:path');
  const {generateExports} = require('../scripts/generate-llm-exports.cjs');
  const root = fs.mkdtempSync(path.join(require('node:os').tmpdir(), 'llm-exports-'));
  t.after(() => fs.rmSync(root, {recursive: true, force: true}));
  for (const baseUrl of ['/', '/project/', '/project name/', '/café/', '/project%20name/']) {
    const site = fs.mkdtempSync(path.join(root, 'site-'));
    const basePath = new URL(baseUrl, 'https://example.invalid').pathname;
    const versions = {'9.4.0': {label: '9.4', path: ''}, 'classic-2.1.0': {label: 'Classic 2.1', path: 'classic-2.1.0'}};
    fs.writeFileSync(path.join(site, 'versions.json'), JSON.stringify(Object.keys(versions)));
    fs.writeFileSync(path.join(site, 'docusaurus.config.js'), `module.exports = ${JSON.stringify({
      title: 'Fixture docs', tagline: 'Fixture guides', url: 'https://example.invalid', baseUrl,
      presets: [['classic', {docs: {routeBasePath: 'docs', versions}}]],
    })};`);
    for (const version of Object.keys(versions)) {
      const directory = path.join(site, `versioned_docs/version-${version}`);
      fs.mkdirSync(directory, {recursive: true});
      fs.writeFileSync(path.join(directory, 'start.mdx'), '---\ntitle: Start\ndescription: Start guide\nslug: /\n---\n\n[Guide](./guide.mdx#setup)\n\n![Local screenshot](./screen.png)\n');
      fs.writeFileSync(path.join(directory, 'guide.mdx'), '---\ntitle: Guide\ndescription: Details\nslug: /guide\n---\n\n## Setup\n\nGuide content.\n');
    }
    // No Docusaurus/plugin output exists before generation.
    await generateExports({root: site});
    const build = path.join(site, 'build');
    for (const prefix of ['docs', 'docs/classic-2.1.0']) {
      const article = fs.readFileSync(path.join(build, prefix + '.md'), 'utf8');
      assert.ok(article.includes(`https://example.invalid${basePath}${prefix}/guide/#setup`));
      assert.ok(article.includes('Local screenshot'));
      assert.doesNotMatch(article, /screen\.png|\.\/guide\.mdx/);
      assert.ok(fs.existsSync(path.join(build, prefix, 'guide.md')));
    }
    for (const filename of ['llms.txt', 'llms-full.txt']) {
      const content = fs.readFileSync(path.join(build, filename), 'utf8');
      if (filename === 'llms.txt') {
        assert.ok(content.includes('Community Edition 9.4'));
        assert.ok(content.includes('Classic 2.1'));
        assert.ok(content.includes(`https://example.invalid${basePath}docs/guide.md`));
      } else {
        assert.ok(content.includes('Guide content.'));
        assert.ok(content.includes(`https://example.invalid${basePath}docs/classic-2.1.0/guide/#setup`));
      }
    }
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

test('responsive-image QA accepts inline images while checking file origins and base paths', (t) => {
  const {assertResponsiveImageCandidate: validate} = require('../scripts/check-artifacts.cjs');
  const fs = require('node:fs');
  const path = require('node:path');
  const config = {url: 'https://example.invalid', baseUrl: '/project/'};
  const root = fs.mkdtempSync(path.join(require('node:os').tmpdir(), 'responsive-image-test-'));
  t.after(() => fs.rmSync(root, {recursive: true, force: true}));
  fs.writeFileSync(path.join(root, 'fixture.png'), 'fixture');
  validate('data:image/png;base64,iVBORw0KGgo= 320w', config, root);
  validate('/project/fixture.png 320w', config, root);
  assert.throws(() => validate('data:text/html;base64,SGVsbG8= 320w', config, root), /Invalid inline/);
  assert.throws(() => validate('/fixture.png 320w', config, root), /base path/);
  assert.throws(() => validate('/project/missing.png 320w', config, root), /Missing responsive/);
  assert.throws(() => validate('https://elsewhere.invalid/project/fixture.png 320w', config, root), /External responsive/);
});
