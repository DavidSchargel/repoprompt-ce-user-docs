const test = require('node:test');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const path = require('node:path');
const {resolveLegacyHash} = require('../src/utils/resolveLegacyHash.cjs');
const routes = require('../migration/legacy-doc-routes.json');

for (const [hash, destination] of Object.entries(routes)) {
  test(`legacy mapping ${hash}`, () => assert.equal(resolveLegacyHash(hash), destination));
}

test('legacy hashes are allowlisted, decode once, and leave ordinary headings alone', () => {
  for (const hash of ['', '#installation', '#safety', '#examples?s=overview']) assert.equal(resolveLegacyHash(hash), null);
  for (const hash of ['#s=unknown', '#ss=overview', '#s=overview&s=agent-mode', '#s=overview&ss=x&ss=y', '#s=%ZZ', '#s=%256fverview', '#s=https://evil.invalid', '#s=__proto__', '#s=overview%26ss%3Dinstallation']) assert.equal(resolveLegacyHash(hash), '/docs/');
  assert.equal(resolveLegacyHash('#ss=installation&s=%6fverview'), '/docs/overview/installation/');
  assert.equal(resolveLegacyHash('#s=agent-mode&ss='), '/docs/agent-mode/overview/');
});

test('configuration rejects partial search credentials and malformed hosting paths', () => {
  const root = path.join(__dirname, '..');
  const env = {...process.env};
  for (const key of ['ALGOLIA_APP_ID','ALGOLIA_SEARCH_API_KEY','ALGOLIA_INDEX_NAME','SITE_BASE_URL','SITE_URL','PAGES_OWNER','PAGES_REPOSITORY']) delete env[key];
  function config(overrides) {
    return JSON.parse(execFileSync(process.execPath, ['-e', 'process.stdout.write(JSON.stringify(require("./docusaurus.config.js")))'], {cwd: root, env: {...env, ...overrides}, stdio: ['ignore','pipe','pipe']}));
  }
  assert.equal(config({}).themeConfig.algolia, undefined);
  assert.throws(() => config({ALGOLIA_APP_ID: 'test'}));
  const enabled = config({ALGOLIA_APP_ID: 'test', ALGOLIA_SEARCH_API_KEY: 'public-test', ALGOLIA_INDEX_NAME: 'test'});
  assert.equal(enabled.themeConfig.algolia.contextualSearch, true);
  assert.equal(enabled.themeConfig.algolia.insights, false);
  assert.equal(config({PAGES_OWNER: 'example', PAGES_REPOSITORY: 'example.github.io'}).baseUrl, '/');
  assert.equal(config({PAGES_OWNER: 'example', PAGES_REPOSITORY: 'docs'}).baseUrl, '/docs/');
  for (const SITE_BASE_URL of ['missing-slashes','/missing-end','/bad/?x']) assert.throws(() => config({SITE_BASE_URL}));
  assert.throws(() => config({SITE_URL: 'https://example.invalid/path'}));
});

test('LLM links resolve cross-version paths and preserve fenced and inline examples', async () => {
  const {rewriteDocLinks} = require('../scripts/llm-links.cjs');
  const source = 'versioned_docs/version-1.5.0/index.mdx';
  const routes = {[source]: '/docs/', 'versioned_docs/version-classic-2.1.0/index.md': '/docs/classic-2.1.0/'};
  const input = '[Archive](../version-classic-2.1.0/index.md#overview)\n\n[Blog](/blog/)\n\n`[Example](./missing.mdx)`\n\n```md\n[Example](./missing.mdx)\n```';
  const output = await rewriteDocLinks(input, source, routes, 'https://example.invalid/project/');
  assert.ok(output.includes('(https://example.invalid/project/docs/classic-2.1.0/#overview)'));
  assert.ok(output.includes('(https://example.invalid/project/blog/)'));
  assert.ok(output.includes('`[Example](./missing.mdx)`'));
  assert.ok(output.includes('```md\n[Example](./missing.mdx)\n```'));
  await assert.rejects(rewriteDocLinks('[Broken](./missing.mdx)', source, routes, 'https://example.invalid/'));
});

test('NotFound emits noindex only with the route-specific component', () => {
  const fs = require('node:fs');
  const vm = require('node:vm');
  const React = require('react');
  const {renderToStaticMarkup} = require('react-dom/server');
  const {HelmetProvider} = require('react-helmet-async');
  const Head = require('../src/components/SeoHead.js');
  const original = (props) => React.createElement('main', null, props.message);
  const source = fs.readFileSync(path.join(__dirname, '../src/theme/NotFound/index.js'), 'utf8');
  const {code} = require('@babel/core').transformSync(source, {
    babelrc: false,
    configFile: false,
    plugins: ['@babel/plugin-transform-react-jsx', '@babel/plugin-transform-modules-commonjs'],
  });
  const exports = {};
  vm.runInNewContext(code, {exports, require(name) {
    const dependencies = {'react': React, '@docusaurus/Head': Head, '@theme-original/NotFound': original};
    assert.ok(Object.hasOwn(dependencies, name), `Unexpected dependency: ${name}`);
    return dependencies[name];
  }});
  function render(Component) {
    const context = {};
    const body = renderToStaticMarkup(React.createElement(HelmetProvider, {context}, React.createElement(Component, {message: 'Preserved original content'})));
    return {body, meta: context.helmet.meta.toString()};
  }
  const notFound = render(exports.default);
  assert.ok(notFound.body.includes('Preserved original content'));
  assert.match(notFound.meta, /name="robots" content="noindex,follow"/);
  const regularPage = render(original);
  assert.doesNotMatch(regularPage.meta, /noindex/);
});
