const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {assertResourceUrl, assertCosmosLayers} = require('../scripts/render-contracts.cjs');

function loadJsx(file, dependencies, globals = {}) {
  const {code} = require('@babel/core').transformSync(fs.readFileSync(file, 'utf8'), {
    babelrc: false,
    configFile: false,
    plugins: ['@babel/plugin-transform-react-jsx', '@babel/plugin-transform-modules-commonjs'],
  });
  const exports = {};
  vm.runInNewContext(code, {...globals, exports, require(name) {
    assert.ok(Object.hasOwn(dependencies, name), `Unexpected dependency: ${name}`);
    return dependencies[name];
  }});
  return exports.default;
}

test('MDX receives the responsive image adapter through the real MDX provider', async () => {
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
    return React.createElement(components.img, {src, alt: 'RepoPrompt application logo'});
  }
  const html = renderToStaticMarkup(React.createElement(MDXContent, null, React.createElement(HomeContent)));
  assert.doesNotMatch(html, /\[object Object\]/);
  assert.match(html, /src="\/project\/assets\/logo.png"/);
  assert.match(html, /srcSet="\/project\/assets\/logo-320.png 320w"/);
  assert.match(html, /loading="lazy"/);
});

test('React homepage renders its content and resolves assets and navigation under a deployment base path', () => {
  const React = require('react');
  const {renderToStaticMarkup} = require('react-dom/server');
  const dependencies = {
    react: React,
    '@theme/Layout': ({children}) => children,
    '@docusaurus/Link': ({to, children, ...props}) => React.createElement('a', {href: `/project${to}`, ...props}, children),
    '@docusaurus/useBaseUrl': (url) => `/project${url}`,
    'react-icons/fi': require('react-icons/fi'),
    'react-icons/fa': require('react-icons/fa'),
    'react-tweet': {Tweet: ({fallback}) => fallback},
    '../components/home/home.css': {},
    '../components/home/adaptations.css': {},
  };
  for (const name of ['Hero', 'OrchestrationFlow', 'AgentSection', 'WorkflowsShowcase', 'Demo', 'MCPIntegration', 'Testimonials', 'CopyrightYear']) {
    dependencies[`../components/home/${name}`] = loadJsx(path.join(__dirname, `../src/components/home/${name}.js`), dependencies);
  }
  const Home = loadJsx(path.join(__dirname, '../src/pages/index.js'), dependencies);
  const html = renderToStaticMarkup(React.createElement(Home));
  for (const heading of ['RepoPrompt', 'Community Edition', 'From prompt to verified delivery', 'Context Builder Workflows', 'Works With Every Agent']) assert.ok(html.includes(heading));
  assert.match(html, /href="\/project\/docs\/"/);
  assert.match(html, /href="\/project\/docs\/classic-2.1.0\/"/);
  assert.match(html, /href="\/project\/docs\/agent-mode\/workflows\/"/);
  assert.match(html, /href="#download"/);
  assert.match(html, /id="download"/);
  assert.doesNotMatch(html, /id="(?:benchmark|blog)"/);
  assert.doesNotMatch(html.match(/<footer[\s\S]*?<\/footer>/)[0], /href="\/project\/docs\/"/);
  assert.doesNotMatch(html, /\[object Object\]|(?:src|srcSet)="\/images\//);
  const images = [...html.matchAll(/(?:src|srcSet)="\/project\/([^" ]+)"/g)];
  assert.ok(images.length > 5);
  for (const [, image] of images) assert.ok(fs.existsSync(path.join(__dirname, '../static', image)), `Missing homepage asset: ${image}`);
});

test('copyright year updates at New Year and after a suspended tab resumes', () => {
  const React = require('react');
  let now = new Date(2026, 11, 31, 23, 59, 59).getTime();
  let effect;
  let year;
  let scheduled;
  const listeners = new Map();
  const target = {
    addEventListener: (event, callback) => listeners.set(event, callback),
    removeEventListener: (event) => listeners.delete(event),
  };
  class Clock extends Date {
    constructor(...args) { super(...(args.length ? args : [now])); }
  }
  const CopyrightYear = loadJsx(path.join(__dirname, '../src/components/home/CopyrightYear.js'), {
    react: {...React, useState: () => [null, (value) => { year = value; }], useEffect: (callback) => { effect = callback; }},
  }, {
    Date: Clock,
    window: target,
    document: target,
    setTimeout: (callback, delay) => { scheduled = {callback, delay}; return 1; },
    clearTimeout: () => { scheduled = null; },
  });
  CopyrightYear();
  const cleanup = effect();
  assert.equal(year, 2026);
  assert.equal(scheduled.delay, 1000);
  now += 1000;
  scheduled.callback();
  assert.equal(year, 2027);
  assert.ok(scheduled.delay > 0 && scheduled.delay <= 86400000);
  now = new Date(2028, 0, 1).getTime();
  listeners.get('visibilitychange')();
  assert.equal(year, 2028);
  cleanup();
  assert.equal(listeners.size, 0);
  assert.equal(scheduled, null);
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
  const tableStylesheet = path.join(__dirname, '../src/css/responsive-tables.css');
  assert.ok([options.theme.customCss].flat().includes(tableStylesheet));
  const tree = require('postcss').parse(fs.readFileSync(tableStylesheet, 'utf8'));
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
