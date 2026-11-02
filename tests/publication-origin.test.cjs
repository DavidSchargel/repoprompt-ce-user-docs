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
  assert.match(step, /if: \(github\.event_name == 'push' \|\| \(github\.event_name == 'workflow_dispatch' && inputs\.publish\)\)/);
  assert.match(step, /set -eu/);
  assert.match(step, /node scripts\/check-publication-origin\.cjs/);
});


test('Pages publication runs on main pushes and opted-in manual runs only', () => {
  const yaml = require('js-yaml');
  const workflow = yaml.load(fs.readFileSync(path.join(__dirname, '../.github/workflows/pages.yml'), 'utf8'));
  assert.deepEqual(workflow.on.push.branches, ['main']);
  assert.equal(workflow.jobs.deploy.needs, 'build');
  const steps = workflow.jobs.build.steps;
  const gates = ['Check publication confirmations', 'Configure Pages', 'Upload Pages artifact']
    .map(name => steps.find(step => step.name === name).if);
  const evaluate = (expression, github, inputs, vars) =>
    Function('github', 'inputs', 'vars', 'format', `return (${expression});`)(
      github, inputs, vars, (_, ref) => `pages-validation-${ref}`);
  for (const [event, ref, publish, approved, expected] of [
    ['push', 'refs/heads/main', false, true, true],
    ['workflow_dispatch', 'refs/heads/main', true, true, true],
    ['workflow_dispatch', 'refs/heads/main', false, true, false],
    ['pull_request', 'refs/pull/1/merge', false, true, false],
    ['pull_request', 'refs/heads/main', true, true, false],
    ['workflow_dispatch', 'refs/heads/feature', true, true, false],
    ['push', 'refs/heads/main', false, false, false],
  ]) {
    const github = {event_name: event, ref};
    const inputs = {publish};
    const vars = {PUBLISH_APPROVED: String(approved), LEGAL_TEXT_APPROVED: 'true'};
    assert.equal(evaluate(workflow.jobs.deploy.if, github, inputs, vars), expected, `${event}/${ref}/${publish}/${approved}`);
    if (expected) for (const gate of gates) assert.equal(evaluate(gate, github, inputs, vars), true);
    if (event === 'pull_request' || (event === 'workflow_dispatch' && !publish)) {
      for (const gate of gates) assert.equal(evaluate(gate, github, inputs, vars), false);
    }
    if (event === 'push' && ref === 'refs/heads/main') {
      assert.equal(evaluate(workflow.jobs.deploy.if, github, inputs, {...vars, LEGAL_TEXT_APPROVED: 'false'}), false);
    }
    const group = evaluate(workflow.concurrency.group.slice(3, -2).trim(), github, inputs, vars);
    assert.equal(group === 'pages-publication', ref === 'refs/heads/main' && (event === 'push' || (event === 'workflow_dispatch' && publish)));
  }
});
