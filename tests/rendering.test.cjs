const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {assertResourceUrl, assertCosmosLayers} = require('../scripts/render-contracts.cjs');

function loadJsx(file, dependencies) {
  const {code} = require('@babel/core').transformSync(fs.readFileSync(file, 'utf8'), {
    babelrc: false,
    configFile: false,
    plugins: ['@babel/plugin-transform-react-jsx', '@babel/plugin-transform-modules-commonjs'],
  });
  const exports = {};
  vm.runInNewContext(code, {exports, require(name) {
    assert.ok(Object.hasOwn(dependencies, name), `Unexpected dependency: ${name}`);
    return dependencies[name];
  }});
  return exports.default;
}

test('home MDX receives the responsive image adapter through the real MDX provider', async () => {
  const React = require('react');
  const mdx = await import('@mdx-js/react');
  const {renderToStaticMarkup} = require('react-dom/server');
  const Img = loadJsx(path.join(__dirname, '../src/theme/MDXComponents/Img/index.js'), {
    react: React,
    '@theme-original/MDXComponents/Img': (props) => React.createElement('img', props),
  });
  const MDXContent = loadJsx(require.resolve('@docusaurus/theme-classic/lib/theme/MDXContent/index.js'), {
    react: React,
    '@mdx-js/react': mdx,
    '@theme/MDXComponents': {img: Img},
  });
  const src = {default: {src: {src: '/project/assets/logo.png', images: [{path: '/project/assets/logo-320.png', width: 320}]}}};
  function HomeContent() {
    const components = {img: 'img', ...mdx.useMDXComponents()};
    return React.createElement(components.img, {src, alt: 'Repo Prompt application logo'});
  }
  const Home = loadJsx(path.join(__dirname, '../src/pages/index.js'), {
    react: React,
    '@theme/Layout': ({children}) => children,
    '@theme/MDXContent': MDXContent,
    './_home.mdx': HomeContent,
    './index.module.css': {},
  });
  const html = renderToStaticMarkup(React.createElement(Home));
  assert.doesNotMatch(html, /\[object Object\]/);
  assert.match(html, /src="\/project\/assets\/logo.png"/);
  assert.match(html, /srcSet="\/project\/assets\/logo-320.png 320w"/);
  assert.match(html, /loading="lazy"/);
});

test('production and development CSS retain native layers and unlayered Cosmos tokens', async () => {
  const postcss = require('postcss');
  const presetEnv = require('postcss-preset-env');
  const browserslist = require('browserslist');
  const {PostCssPluginWrapInLayer} = require('@docusaurus/plugin-css-cascade-layers/lib/postCssPlugin');
  const {DEFAULT_OPTIONS} = require('@docusaurus/plugin-css-cascade-layers/lib/options');
  const infimaPath = require.resolve('infima/dist/css/default/default.css');
  const cosmosPath = require.resolve('cosmos-docusaurus-theme/css/theme.css');
  for (const env of ['production', 'development']) {
    const targets = browserslist.loadConfig({path: path.join(__dirname, '..'), env});
    assert.ok(targets?.length, 'An explicit supported-browser policy is required');
    const transform = (file) => postcss([presetEnv({browsers: targets}), PostCssPluginWrapInLayer(DEFAULT_OPTIONS)])
      .process(fs.readFileSync(file, 'utf8'), {from: file});
    const infima = await transform(infimaPath);
    const cosmos = await transform(cosmosPath);
    assertCosmosLayers(infima.css + '\n' + cosmos.css);
    assert.doesNotMatch(infima.css, /:not\(#/);
  }
  assert.throws(() => assertCosmosLayers(':root{--ifm-font-family-base:Outfit}'), /Missing native Infima/);
});

test('wide Markdown tables use scoped scroll containment in the configured stylesheet', () => {
  const config = require('../docusaurus.config.js');
  const options = config.presets.find(([name]) => name === 'classic')[1];
  assert.equal(options.theme.customCss, path.join(__dirname, '../src/css/responsive-tables.css'));
  const tree = require('postcss').parse(fs.readFileSync(options.theme.customCss, 'utf8'));
  assert.equal(tree.nodes.length, 1, 'Keep this fix scoped to tables, not page clipping');
  const rule = tree.nodes[0];
  assert.equal(rule.type, 'rule');
  assert.equal(rule.selector, 'main .markdown table');
  assert.equal(rule.nodes.length, 4);
  assert.deepEqual(Object.fromEntries(rule.nodes.map(decl => [decl.prop, decl.value])), {
    display: 'block', width: '100%', 'max-width': '100%', 'overflow-x': 'auto',
  });
  for (const decl of rule.nodes) assert.ok(decl.important, `Must override Cosmos important ${decl.prop}`);
  assert.equal(rule.parent.type, 'root', 'Remain unlayered to override unlayered Cosmos important rules');
});

test('resource checks reject serialized objects and validate relative as well as absolute URLs', () => {
  for (const value of [undefined, {}, '', '[object Object]', '[object%20Object]', '/project/[object%20Object]', 'undefined', 'null', 'javascript:alert(1)']) {
    assert.throws(() => assertResourceUrl(value, 'fixture'));
  }
  for (const value of ['/project/assets/logo.png', 'assets/logo.png', 'https://example.invalid/image.png', 'data:image/png;base64,AA==']) {
    assertResourceUrl(value, 'fixture');
  }
});
