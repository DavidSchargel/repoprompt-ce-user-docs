const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
test('color mode control toggles only light and dark without a tooltip', () => {
  const React = require('react');
  const Toggle = loadJsx(path.join(__dirname, '../src/theme/ColorModeToggle/index.js'), {
    react: React,
    '@docusaurus/useIsBrowser': () => true,
    '@theme/Icon/LightMode': () => null,
    '@theme/Icon/DarkMode': () => null,
    './styles.module.css': {},
  });
  for (const [value, expected] of [['light', 'dark'], ['dark', 'light'], [null, 'dark']]) {
    let selected;
    const button = Toggle({value, onChange: (mode) => { selected = mode; }}).props.children;
    assert.equal(button.props.title, undefined);
    assert.equal(button.props['aria-label'], `Switch to ${expected} mode`);
    button.props.onClick();
    assert.equal(selected, expected);
  }
});

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

test('blog listing has one page heading inside its existing main landmark', () => {
  const React = require('react');
  const {renderToStaticMarkup} = require('react-dom/server');
  const received = {};
  const BlogListPage = loadJsx(path.join(__dirname, '../src/theme/BlogListPage/index.js'), {
    react: React,
    clsx: (...parts) => parts.filter(Boolean).join(' '),
    '@docusaurus/useDocusaurusContext': () => ({siteConfig: {title: 'RepoPrompt'}}),
    '@docusaurus/theme-common': {
      PageMetadata: (props) => { received.pageMetadata = props; return null; },
      HtmlClassNameProvider: ({children}) => children,
      ThemeClassNames: {wrapper: {blogPages: 'blog-wrapper'}, page: {blogListPage: 'blog-list-page'}},
    },
    '@theme/BlogLayout': ({sidebar, children}) => { received.sidebar = sidebar; return React.createElement('main', null, children); },
    '@theme/BlogListPaginator': ({metadata}) => { received.paginatorMetadata = metadata; return null; },
    '@theme/SearchMetadata': ({tag}) => { received.searchTag = tag; return null; },
    '@theme/BlogPostItems': ({items}) => { received.items = items; return React.createElement('h2', null, 'Example post'); },
    '@theme/BlogListPage/StructuredData': (props) => { received.structuredData = props; return null; },
  });
  const metadata = {blogTitle: 'RepoPrompt CE Blog', blogDescription: 'News and updates', permalink: '/blog/'};
  const items = [{content: 'Example post'}];
  const sidebar = {items: [{title: '2026'}]};
  const html = renderToStaticMarkup(React.createElement(BlogListPage, {metadata, items, sidebar}));
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /<main><h1>RepoPrompt CE Blog<\/h1><h2>Example post<\/h2><\/main>/);
  assert.deepEqual(received.pageMetadata, {title: 'RepoPrompt CE Blog', description: 'News and updates'});
  assert.equal(received.searchTag, 'blog_posts_list');
  assert.equal(received.sidebar, sidebar);
  assert.equal(received.items, items);
  assert.equal(received.paginatorMetadata, metadata);
  assert.equal(received.structuredData.metadata, metadata);
  assert.equal(received.structuredData.items, items);
  assert.equal(received.structuredData.sidebar, sidebar);
});

test('React homepage component SSR preserves authored structure and base-path assets', () => {
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
  assert.equal((html.match(/<main\b/g) || []).length, 1);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.ok(html.indexOf('</main>') < html.indexOf('<footer'), 'Page footer must be outside main');
  assert.match(html, /<footer[^>]*>[\s\S]*?<nav aria-label="Footer">/);
  assert.doesNotMatch(html, /target="_blank"/, 'Authored homepage links should not force new tabs');
  assert.match(html, /role="group" aria-label="Choose a testimonial"/);
  assert.match(html, /id="home-testimonial-content"/);
  assert.match(html, /role="status" aria-live="polite" aria-atomic="true"/);
  assert.equal((html.match(/aria-controls="home-testimonial-content"/g) || []).length, 10);
  assert.equal((html.match(/aria-pressed="true"/g) || []).length, 1);
  assert.equal((html.match(/aria-label="Show testimonial \d+ of 10"/g) || []).length, 10);
  assert.doesNotMatch(html, /<h4\b/);
  assert.match(html, /<h3[^>]*>Codex CLI<\/h3>/);
  assert.doesNotMatch(html, /orch-process|class="orch-diagram" aria-hidden/);
  assert.match(html, /<ol class="orch-diagram" role="list"/);
  assert.match(html, /<ol class="orch-row-top" role="list"/);
  assert.equal((html.match(/class="flow-node-title"/g) || []).length, 3);
  assert.equal((html.match(/class="flow-node-title" style="color:inherit"/g) || []).length, 2,
    'Prompt and Context Builder must keep their inherited title color');
  assert.match(html, /<ol class="orch-col-tasks" role="list">/);
  assert.match(html, /<ul class="orch-col-agents" role="list">/);
  assert.match(html, /aria-labelledby="orch-sequential"/);
  assert.match(html, /aria-labelledby="orch-parallel"/);
  assert.equal((html.match(/shared source of truth/g) || []).length, 1);
  assert.match(html, /<svg role="img" aria-labelledby="handoff-title handoff-description"/);
  assert.match(html, /<desc id="handoff-description">Example handoff:/);
  assert.ok(html.indexOf('class="pipeline-svg handoff-svg"') < html.indexOf('>Handoff</div>'));
  assert.match(html, /aria-hidden="true"[^>]*focusable="false"/);
  assert.match(html, /alt=""/, 'Decorative images need explicit empty alt');
  const images = [...html.matchAll(/(?:src|srcSet)="\/project\/([^" ]+)"/g)];
  assert.ok(images.length > 5);
  for (const [, image] of images) assert.ok(fs.existsSync(path.join(__dirname, '../static', image)), `Missing homepage asset: ${image}`);
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
    setInterval(callback, delay) { assert.equal(delay, 5000); timer = callback; return 1; },
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
  assert.equal(buttons(tree).length, 10);
  assert.equal(collect(tree, (node) => node.type === Tweet).length, 1, 'Only the active tweet should mount');
  assert.equal(buttons(tree).filter((button) => button.props['aria-pressed']).length, 1);
  buttons(tree)[2].props.onClick();
  tree = render();
  effects[1]();
  assert.equal(timer, undefined, 'Manual selection must pause rotation');
  assert.equal(state[0], 2);
  assert.equal(status(tree).props.children, 'Testimonial 3 of 10 selected');
  assert.equal(buttons(tree)[2].props['aria-pressed'], true);
  assert.equal(collect(tree, (node) => node.props['aria-roledescription'] === 'slide' && node.props.hidden).length, 9);
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
  buttons(tree)[9].props.onClick();
  tree = render();
  assert.equal(state[0], 9);
  assert.equal(status(tree).props.children, 'Testimonial 10 of 10 selected');
  assertFallbackLinks(tree);
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

test('wide Markdown tables retain Cosmos overrides and use a scoped accessible overflow region', () => {
  const config = require('../docusaurus.config.js');
  const options = config.presets.find(([name]) => name === 'classic')[1];
  const tableStylesheet = path.join(__dirname, '../src/css/responsive-tables.css');
  assert.ok([options.theme.customCss].flat().includes(tableStylesheet));
  const tree = require('postcss').parse(fs.readFileSync(tableStylesheet, 'utf8'));
  const rules = tree.nodes.filter((node) => node.type === 'rule');
  assert.equal(rules.length, tree.nodes.length, 'Keep rules unlayered so Cosmos overrides remain effective');
  const allowed = new Set([
    'main .markdown table',
    'main .markdown .accessible-table-scroll',
    'main .markdown .accessible-table-scroll:focus-visible',
    'main .markdown .accessible-table-scroll table',
  ]);
  assert.equal(rules.length, allowed.size, 'Duplicate rules could override the scroll contract');
  assert.deepEqual(new Set(rules.map((rule) => rule.selector)), allowed, 'No page-wide overflow clipping or unrelated rules');
  const declarations = (selector) => Object.fromEntries(rules.find((rule) => rule.selector === selector).nodes.map((decl) => [decl.prop, decl]));
  const ordinary = declarations('main .markdown table');
  for (const [prop, value] of Object.entries({display: 'block', width: '100%', 'max-width': '100%', 'overflow-x': 'auto'})) {
    assert.equal(ordinary[prop]?.value, value);
    assert.ok(ordinary[prop].important, `Must override Cosmos important ${prop}`);
  }
  const region = declarations('main .markdown .accessible-table-scroll');
  assert.equal(region['overflow-x']?.value, 'auto');
  assert.equal(region['max-width']?.value, '100%');
  const focus = declarations('main .markdown .accessible-table-scroll:focus-visible');
  assert.match(focus.outline?.value || '', /\b3px\b/);
  const inner = declarations('main .markdown .accessible-table-scroll table');
  for (const [prop, value] of Object.entries({display: 'table', width: 'max-content', 'min-width': '100%', 'max-width': 'none', overflow: 'visible'})) {
    assert.equal(inner[prop]?.value, value);
    assert.ok(inner[prop].important, `Wrapped table must override Cosmos important ${prop}`);
  }
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

test('header GitHub item has an accessible icon link on desktop and a visible mobile label', () => {
  const React = require('react');
  const {renderToStaticMarkup} = require('react-dom/server');
  const GitHubNavbarItem = loadJsx(path.join(__dirname, '../src/theme/NavbarItem/GitHubNavbarItem.js'), {
    react: React,
    'react-icons/fi': {FiGithub: (props) => React.createElement('svg', props)},
  });
  const linkProps = {href: 'https://github.com/repoprompt/repoprompt-ce', label: 'RepoPrompt CE on GitHub'};
  const desktop = renderToStaticMarkup(React.createElement(GitHubNavbarItem, linkProps));
  assert.match(desktop, /href="https:\/\/github\.com\/repoprompt\/repoprompt-ce"/);
  assert.match(desktop, /aria-label="RepoPrompt CE on GitHub"/);
  assert.match(desktop, /aria-hidden="true"/);
  const mobile = renderToStaticMarkup(React.createElement(GitHubNavbarItem, {...linkProps, mobile: true}));
  assert.match(mobile, /RepoPrompt CE on GitHub/);
  assert.match(mobile, /menu__list-item/);

  const DefaultNavbarItem = loadJsx(path.join(__dirname, '../src/theme/NavbarItem/DefaultNavbarItem.js'), {
    react: React,
    '@theme-original/NavbarItem/DefaultNavbarItem': {__esModule: true, default: () => React.createElement('span', null, 'Original item')},
    './GitHubNavbarItem': {__esModule: true, default: GitHubNavbarItem},
  });
  assert.match(renderToStaticMarkup(React.createElement(DefaultNavbarItem, {...linkProps, className: 'header-github-link'})), /aria-label="RepoPrompt CE on GitHub"/);
  assert.match(renderToStaticMarkup(React.createElement(DefaultNavbarItem, {...linkProps, className: 'header-github-link', mobile: true})), /menu__list-item/);
  assert.match(renderToStaticMarkup(React.createElement(DefaultNavbarItem, {...linkProps, className: 'other-link'})), /Original item/);
});

test('search navbar item appears only on docs routes, including versioned docs', () => {
  const React = require('react');
  const {renderToStaticMarkup} = require('react-dom/server');
  let pathname = '/site/';
  const SearchNavbarItem = loadJsx(path.join(__dirname, '../src/theme/NavbarItem/SearchNavbarItem.js'), {
    react: React,
    '@docusaurus/router': {useLocation: () => ({pathname})},
    '@docusaurus/useBaseUrl': {__esModule: true, default: (url) => `/site${url}`},
    '@theme-original/NavbarItem/SearchNavbarItem': {__esModule: true, default: () => React.createElement('button', {type: 'button'}, 'Search docs')},
  });
  for (pathname of ['/site/', '/site/blog/', '/site/docs-other/']) {
    assert.equal(renderToStaticMarkup(React.createElement(SearchNavbarItem)), '');
  }
  for (pathname of ['/site/docs', '/site/docs/', '/site/docs/classic-2.1.0/']) {
    assert.match(renderToStaticMarkup(React.createElement(SearchNavbarItem)), /Search docs/);
  }
});
