const test = require('node:test');
const assert = require('node:assert/strict');
const {assertSearchResultRoute} = require('../scripts/check-artifacts.cjs');

test('search result origins accept a trailing slash in the site URL', () => {
  for (const baseUrl of ['/', '/project/']) {
    const config = {url: 'https://example.invalid/', baseUrl};
    const routes = new Set(['/docs/', '/docs/guide/']);
    assert.equal(assertSearchResultRoute({u: `${config.url.slice(0, -1)}${baseUrl}docs/guide/#heading`}, 'current', routes, config), 'docs/guide/');
    assert.throws(() => assertSearchResultRoute({u: 'https://external.invalid/docs/'}, 'current', routes, config), /External search result/);
  }
});

test('search results must belong to the exact version inventory', () => {
  const config = {url: 'https://example.invalid', baseUrl: '/project/'};
  const current = new Set(['/docs/', '/docs/guide/']);
  const archived = new Set(['/docs/archive/', '/docs/archive/guide/']);
  const result = route => ({u: `https://example.invalid/project${route}`});
  assert.equal(assertSearchResultRoute(result('/docs/archive/guide/'), 'archived', archived, config), 'docs/archive/guide/');
  assert.throws(() => assertSearchResultRoute(result('/docs/archive/guide/'), 'current', current, config), /Wrong-version/);
  assert.throws(() => assertSearchResultRoute(result('/docs/guide/'), 'archived', archived, config), /Wrong-version/);
  assert.throws(() => assertSearchResultRoute(result('/docs/missing/'), 'current', current, config), /Wrong-version/);
  assert.throws(() => assertSearchResultRoute({u: 'https://example.invalid/docs/guide/'}, 'current', current, config), /outside base path/);
});
