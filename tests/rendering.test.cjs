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
  for (const alt of ['RepoPrompt application logo', '', undefined]) {
    const Content = () => {
      const components = {img: 'img', ...mdx.useMDXComponents()};
      return React.createElement(components.img, {src, alt});
    };
    const html = renderToStaticMarkup(React.createElement(MDXContent, null, React.createElement(Content)));
    assert.doesNotMatch(html, /\[object Object\]/);
    assert.match(html, /src="\/project\/assets\/logo.png"/);
    assert.match(html, /srcSet="\/project\/assets\/logo-320.png 320w"/);
    assert.match(html, /loading="lazy"/);
    if (alt === undefined) {
      assert.doesNotMatch(html, /alt=|role="presentation"/, 'Omitted alt must not become decorative');
    } else {
      assert.ok(html.includes(`alt="${alt}"`), 'Meaningful and deliberately empty alt must survive rendering');
    }
  }
});

test('Markdown images retain responsive variants and use lossless native pixels for high density and zoom', () => {
  const React = require('react');
  const Img = loadJsx(path.join(__dirname, '../src/theme/MDXComponents/Img/index.js'), {
    react: React,
    '@theme-original/MDXComponents/Img': (props) => React.createElement('img', props),
  });
  const src = {src: {src: '/small.png', images: [
    {path: '/small.png', width: 320, height: 55},
    {path: '/large.png', width: 1764, height: 304},
  ]}};
  const element = Img({src, alt: 'Session composer', 'data-zoom-src': '/original.png'});
  assert.equal(element.props.srcSet, '/small.png 320w, /original.png 1764w');
  assert.equal(element.props['data-zoom-src'], '/original.png');
  assert.equal(element.props.width, 1764);
  assert.equal(element.props.height, 304);
  assert.equal(element.props.style.maxWidth, '100%');
  assert.equal(element.props.style.height, 'auto');
  const config = require('../docusaurus.config.js');
  const options = config.plugins.find(plugin => plugin[0] === '@docusaurus/plugin-ideal-image')[1];
  assert.ok(options.sizes.includes(Number.MAX_SAFE_INTEGER), 'Responsive loader must include native width');
});

test('testimonials preserve selection, fallbacks, and controllable rotation', () => {
  const React = require('react');
  const state = [];
  const effects = [];
  let hook = 0;
  let timer;
  let reducedMotion = false;
  const Tweet = () => null;
  const Testimonials = loadJsx(path.join(__dirname, '../src/components/home/Testimonials.js'), {
    react: {...React, useState(initial) {
      const slot = hook++;
      if (!(slot in state)) state[slot] = initial;
      return [state[slot], (value) => { state[slot] = typeof value === 'function' ? value(state[slot]) : value; }];
    }, useRef: () => ({current: null}), useEffect: (effect) => effects.push(effect)},
    'react-tweet': {Tweet},
  }, {
    window: {matchMedia: () => ({matches: reducedMotion, addEventListener() {}, removeEventListener() {}})},
    document: {hidden: false, addEventListener() {}, removeEventListener() {}},
    setInterval(callback, delay) { assert.ok(delay > 0); timer = callback; return 1; },
    clearInterval() { timer = undefined; },
  });
  const render = () => { hook = 0; effects.length = 0; return Testimonials(); };
  const collect = (node, predicate, result = []) => {
    if (Array.isArray(node)) { for (const child of node) collect(child, predicate, result); return result; }
    if (!node || typeof node !== 'object' || !('props' in node)) return result;
    if (predicate(node)) result.push(node);
    collect(node.props.children, predicate, result);
    return result;
  };
  const buttons = (tree) => collect(tree, (node) => node.type === 'button' && 'aria-pressed' in node.props);
  const activeSlide = (tree) => collect(tree, (node) => node.props['aria-roledescription'] === 'slide' && !node.props.hidden)[0];
  const selectedTweet = (tree) => collect(activeSlide(tree), (node) => node.type === Tweet)[0];
  const status = (tree) => collect(tree, (node) => node.props.role === 'status')[0];
  const rotation = (tree) => collect(tree, (node) => node.props.className === 'testimonial-rotation')[0];
  let tree = render();
  const cleanup = effects[0]();
  tree = render();
  const stopTimer = effects[1]();
  assert.equal(typeof timer, 'function');
  timer();
  tree = render();
  assert.equal(state[0], 1);
  assert.equal(status(tree).props.children, '', 'Automatic rotation must not announce every slide');
  stopTimer();
  assert.equal(timer, undefined);
  const count = buttons(tree).length;
  assert.ok(count > 1, 'A carousel needs multiple items');
  assert.equal(collect(tree, (node) => node.type === Tweet).length, 1, 'Only the active tweet should mount');
  assert.equal(buttons(tree).filter((button) => button.props['aria-pressed']).length, 1);
  const selected = 0;
  buttons(tree)[selected].props.onClick();
  tree = render();
  effects[1]();
  assert.equal(timer, undefined, 'Manual selection must pause rotation');
  assert.equal(state[0], selected);
  assert.ok(status(tree).props.children.trim(), 'Manual selection must be announced');
  assert.equal(buttons(tree)[selected].props['aria-pressed'], true);
  assert.equal(collect(tree, (node) => node.props['aria-roledescription'] === 'slide' && node.props.hidden).length, count - 1);
  assert.equal(collect(tree, (node) => node.type === Tweet).length, 1, 'Selecting a slide must not mount hidden tweets');
  const assertFallbackLinks = (currentTree) => {
    const tweet = selectedTweet(currentTree);
    const url = `https://x.com/i/status/${tweet.props.id}`;
    const suspense = collect(activeSlide(currentTree), (node) => node.type === React.Suspense)[0];
    for (let fallback of [tweet.props.fallback, tweet.props.components.TweetNotFound(), suspense.props.fallback]) {
      if (typeof fallback.type === 'function') fallback = fallback.type(fallback.props);
      const links = collect(fallback, (node) => node.type === 'a');
      assert.equal(links[0].props.href, url);
    }
  };
  assertFallbackLinks(tree);
  buttons(tree)[count - 1].props.onClick();
  tree = render();
  rotation(tree).props.onClick();
  tree = render();
  assert.equal(status(tree).props.children, '', 'Restarting rotation must clear the stale selection status');
  const stopResumed = effects[1]();
  timer();
  tree = render();
  assert.equal(state[0], 0, 'Rotation wraps after the final testimonial');
  assert.equal(status(tree).props.children, '', 'Automatic rotation must leave selection status empty');
  assert.equal(collect(tree, (node) => node.type === Tweet).length, 1);
  stopResumed();
  tree.props.onMouseEnter();
  tree = render();
  effects[1]();
  assert.equal(timer, undefined, 'Hover suspends rotation');
  tree.props.onMouseLeave();
  tree.props.onFocusCapture({target: {closest: () => null}});
  tree = render();
  effects[1]();
  assert.equal(timer, undefined, 'Keyboard focus stops rotation until explicitly restarted');
  cleanup();
  reducedMotion = true;
  effects[0]();
  tree = render();
  effects[1]();
  assert.equal(timer, undefined, 'Reduced motion must start with rotation stopped');
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

test('resource checks reject serialized objects and validate relative as well as absolute URLs', () => {
  for (const value of [undefined, {}, '', '[object Object]', '[object%20Object]', '/project/[object%20Object]', 'undefined', 'null', 'javascript:alert(1)']) {
    assert.throws(() => assertResourceUrl(value, 'fixture'));
  }
  for (const value of ['/project/assets/logo.png', 'assets/logo.png', 'https://example.invalid/image.png', 'data:image/png;base64,AA==']) {
    assertResourceUrl(value, 'fixture');
  }
});

test('homepage mobile navigation contains focus and restores background state on close', () => {
  const React = require('react');
  let effect;
  let toggles = 0;
  let shown = true;
  let pathname = '/';
  let refHook = 0;
  const refs = [];
  const listeners = new Map();
  const sidebarListeners = new Map();
  const attributes = new Map();
  const document = {activeElement: null, location: {href: 'https://docs.example/'}};
  const control = () => ({tabIndex: 0, disabled: false, isConnected: true,
    closest: () => null, getClientRects: () => [{}],
    focus() { document.activeElement = this; },
  });
  const trigger = control();
  const first = control();
  const last = control();
  const sidebar = {
    contains: (element) => [sidebar, first, last].includes(element),
    getAttribute: (name) => attributes.get(name) ?? null,
    setAttribute: (name, value) => attributes.set(name, value),
    removeAttribute: (name) => attributes.delete(name),
    querySelector: () => first,
    querySelectorAll: () => [first, last],
    addEventListener: (name, listener) => sidebarListeners.set(name, listener),
    removeEventListener: (name) => sidebarListeners.delete(name),
  };
  const background = [false, true].map((inert) => ({inert, contains: () => false}));
  Object.assign(document, {
    activeElement: trigger,
    querySelector: (selector) => selector === '.navbar-sidebar' ? sidebar : trigger,
    querySelectorAll: () => background,
    addEventListener: (name, listener) => listeners.set(name, listener),
    removeEventListener: (name) => listeners.delete(name),
  });
  const Navigation = loadJsx(path.join(__dirname, '../src/theme/Navbar/MobileSidebar/index.js'), {
    react: {...React, useEffect: (callback) => { effect = callback; }, useRef: (initial) => {
      const slot = refHook++;
      return refs[slot] || (refs[slot] = {current: initial});
    }},
    '@theme-original/Navbar/MobileSidebar': () => null,
    '@docusaurus/theme-common/internal': {useNavbarMobileSidebar: () => ({shown, toggle: () => { toggles++; }})},
    '@docusaurus/router': {useLocation: () => ({pathname})},
    '@docusaurus/useBaseUrl': () => '/',
  }, {document, requestAnimationFrame: (callback) => { callback(); return 1; }, cancelAnimationFrame() {},
    getComputedStyle: () => ({visibility: 'visible', display: 'block'}),
  });
  const render = () => { refHook = 0; Navigation({}); };
  render();
  const cleanup = effect();
  assert.equal(attributes.get('aria-modal'), 'true');
  assert.equal(document.activeElement, first);
  assert.ok(background.every((element) => element.inert));
  document.activeElement = last;
  listeners.get('keydown')({key: 'Tab', shiftKey: false, preventDefault() {}});
  assert.equal(document.activeElement, first);
  listeners.get('keydown')({key: 'Tab', shiftKey: true, preventDefault() {}});
  assert.equal(document.activeElement, last);
  listeners.get('keydown')({key: 'Escape', preventDefault() {}});
  assert.equal(toggles, 1);
  shown = false;
  render();
  cleanup();
  assert.equal(document.activeElement, trigger);
  assert.deepEqual(background.map((element) => element.inert), [false, true]);
  assert.equal(listeners.size, 0);
  assert.equal(sidebarListeners.size, 0);
  assert.equal(attributes.size, 0);

  const clickLink = (href) => sidebarListeners.get('click')({target: {closest: () => ({href, target: '_self'})}});

  shown = true;
  render();
  const sameRouteCleanup = effect();
  assert.equal(document.activeElement, first);
  clickLink(document.location.href);
  shown = false;
  render();
  sameRouteCleanup();
  assert.equal(document.activeElement, trigger, 'A current-route link must return focus when the sidebar closes');

  shown = true;
  render();
  const routeCleanup = effect();
  assert.equal(document.activeElement, first);
  clickLink('https://docs.example/docs/');
  shown = false;
  render();
  routeCleanup();
  assert.equal(document.activeElement, first, 'Closing before navigation must not return focus to the old trigger');
  pathname = '/docs/';
  document.location.href = 'https://docs.example/docs/';
  render();
  assert.equal(document.activeElement, first, 'The destination route must retain control of focus');
  assert.deepEqual(background.map((element) => element.inert), [false, true]);
  assert.equal(sidebarListeners.size, 0);
});
