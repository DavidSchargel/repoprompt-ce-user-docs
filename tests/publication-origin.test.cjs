const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {publicationOrigin} = require('../scripts/check-publication-origin.cjs');

test('publication accepts HTTPS public origins and the GitHub Pages fallback', () => {
  assert.equal(publicationOrigin({SITE_URL: 'https://docs.repoprompt.com/'}), 'https://docs.repoprompt.com');
  assert.equal(publicationOrigin({PAGES_OWNER: 'repoprompt'}), 'https://repoprompt.github.io');
});

test('publication rejects development and placeholder origins', () => {
  for (const SITE_URL of [
    'http://docs.repoprompt.com', 'https://localhost', 'https://app.localhost',
    'https://localhost.', 'https://127.0.0.1', 'https://127.0.0.2', 'https://[::1]',
    'https://192.168.1.10', 'https://docs.local', 'https://docs.internal',
    'https://example.invalid', 'https://docs.test', 'https://docs.example',
    'https://example.com', 'https://docs.example.org',
  ]) assert.throws(() => publicationOrigin({SITE_URL}), undefined, SITE_URL);
});

test('publication rejects URLs that are not bare origins', () => {
  assert.throws(() => publicationOrigin({}));
  for (const SITE_URL of [
    'not a URL', 'ftp://docs.repoprompt.com', 'https://docs.repoprompt.com/docs/',
    'https://docs.repoprompt.com/?preview=true', 'https://docs.repoprompt.com/#intro',
    'https://user:password@docs.repoprompt.com',
  ]) assert.throws(() => publicationOrigin({SITE_URL}), undefined, SITE_URL);
});

test('the origin guard remains in the publication-only confirmation step', () => {
  const workflow = fs.readFileSync(path.join(__dirname, '../.github/workflows/pages.yml'), 'utf8');
  const step = workflow.split('- name: Check publication confirmations')[1].split('- name: Install locked dependencies')[0];
  assert.match(step, /if: github\.event_name == 'workflow_dispatch' && inputs\.publish/);
  assert.match(step, /set -eu/);
  assert.match(step, /node scripts\/check-publication-origin\.cjs/);
});
