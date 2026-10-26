const test = require('node:test');
const assert = require('node:assert/strict');
const cheerio = require('cheerio');
const {isExternalLink, decorateExternalLinks} = require('../src/utils/externalLinks.cjs');

const options = {baseUrl: 'http://localhost:3000/docs/', siteUrl: 'https://example.com'};

test('new-tab warnings are visually clipped rather than hidden from assistive technology', () => {
  const fs = require('node:fs');
  const path = require('node:path');
  const css = require('postcss').parse(fs.readFileSync(path.join(__dirname, '../src/css/typography.css'), 'utf8'));
  const rule = css.nodes.find(node => node.selector === '[data-external-link-notice]');
  assert.ok(rule, 'The generated warning must have its own visually-hidden style');
  const declarations = Object.fromEntries(rule.nodes.map(node => [node.prop, node.value]));
  assert.equal(declarations.position, 'absolute');
  assert.equal(declarations['clip-path'], 'inset(50%)');
  assert.equal(declarations.overflow, 'hidden');
  assert.notEqual(declarations.display, 'none');
  assert.notEqual(declarations.visibility, 'hidden');
});

// Exercise the DOM transformation without launching a browser.
function fixture(html) {
  const $ = cheerio.load(html);
  const cache = new WeakMap();
  const document = {
    querySelectorAll: selector => $(selector).toArray().map(wrap),
    createElement: tag => wrap($(`<${tag}></${tag}>`)[0]),
  };
  function wrap(node) {
    if (!cache.has(node)) cache.set(node, {
      ownerDocument: document,
      getAttribute: name => $(node).attr(name) ?? null,
      setAttribute: (name, value) => { $(node).attr(name, value); },
      removeAttribute: name => { $(node).removeAttr(name); },
      matches: selector => $(node).is(selector),
      querySelector: selector => $(node).find(selector)[0] ? wrap($(node).find(selector)[0]) : null,
      querySelectorAll: selector => $(node).find(selector).toArray().map(wrap),
      append: child => { $(node).append(child.node); },
      remove: () => { $(node).remove(); },
      set className(value) { $(node).attr('class', value); },
      set textContent(value) { $(node).text(value); },
      node,
    });
    return cache.get(node);
  }
  return {$, document};
}

test('only off-site HTTP links open externally', () => {
  for (const href of ['https://external.test/path', 'http://external.test', '//external.test/path']) {
    assert.ok(isExternalLink(href, options.baseUrl, options.siteUrl));
  }
  for (const href of ['/docs/', '#intro', '../guide', 'https://example.com/blog/', 'http://localhost:3000/blog/', 'mailto:hello@example.com', 'tel:123', 'javascript:void(0)', 'https://']) {
    assert.equal(isExternalLink(href, options.baseUrl, options.siteUrl), false, href);
  }
});

test('external links get one changelog indicator, a warning, and safe rel tokens', () => {
  const {$, document} = fixture('<a href="https://external.test" rel="tag opener"><strong>Read more</strong></a><a href="/docs/">Docs</a>');
  decorateExternalLinks(document, options);
  decorateExternalLinks(document, options);
  assert.equal($('a').first().attr('target'), '_blank');
  assert.equal($('a').first().attr('rel'), 'tag noopener noreferrer');
  assert.equal($('.new-tab-indicator').length, 1);
  assert.equal($('.new-tab-indicator').text(), '↗');
  assert.equal($('.new-tab-indicator').attr('aria-hidden'), 'true');
  assert.equal($('[data-external-link-notice]').length, 1);
  assert.match($('a').first().text(), /Read more.*opens in a new tab/);
  assert.equal($('strong').text(), 'Read more');
  assert.equal($('a').last().attr('target'), undefined);
});

test('existing changelog indicators and accessible labels are not duplicated', () => {
  const {$, document} = fixture('<a href="https://external.test" aria-label="Change (opens in a new tab)">Change<span class="new-tab-indicator" aria-hidden="true">↗</span></a><a href="https://other.test" aria-label="GitHub"><svg aria-hidden="true"></svg></a>');
  decorateExternalLinks(document, options);
  decorateExternalLinks(document, options);
  assert.equal($('.new-tab-indicator').length, 2);
  assert.equal($('[data-external-link-notice]').length, 0);
  assert.equal($('a').first().attr('aria-label'), 'Change (opens in a new tab)');
  assert.equal($('a').last().attr('aria-label'), 'GitHub (opens in a new tab)');
});

test('a dynamically reused link returns to its original behavior when internal', () => {
  const {$, document} = fixture('<a href="https://external.test" rel="tag">Original</a>');
  const link = document.querySelectorAll('a')[0];
  decorateExternalLinks(link, options);
  link.setAttribute('href', '/docs/');
  decorateExternalLinks(link, options);
  assert.equal($('a').attr('target'), undefined);
  assert.equal($('a').attr('rel'), 'tag');
  assert.equal($('a').text(), 'Original');
  assert.equal($('span').length, 0);
});
