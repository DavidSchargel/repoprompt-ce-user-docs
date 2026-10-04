const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {verifyVersions} = require('../scripts/verify-toolchain.cjs');
const manifest = require('../package.json');
const root = path.join(__dirname, '..');
const yaml = require('js-yaml');

test('toolchain pins stay on exact Node 26 and pnpm 12', () => {
  assert.equal(manifest.engines.node, '26.10.0');
  assert.equal(manifest.engines.pnpm, '12.8.1');
  assert.equal(manifest.packageManager, 'pnpm@12.8.1');
  assert.equal(fs.readFileSync(path.join(root, '.node-version'), 'utf8').trim(), manifest.engines.node);
});

test('toolchain accepts only the pinned runtime and package manager', () => {
  assert.equal(verifyVersions('26.10.0', 'pnpm/12.8.1 node/v26.10.0 darwin arm64'), '12.8.1');
  for (const version of ['22.23.3', '24.0.0', '26.9.0', '27.0.0']) {
    assert.throws(() => verifyVersions(version, 'pnpm/12.8.1'), /Use Node/);
  }
  for (const agent of [null, '', 'unknown', 'pnpm/11.0.0', 'pnpm/12.8.0', 'pnpm/13.0.0', 'pnpm/12.8.1-beta.1', 'other/1 pnpm/12.8.1']) {
    assert.throws(() => verifyVersions('26.10.0', agent), /Use Node/);
  }
});

test('native scripts require explicit, version-bounded approval', () => {
  const config = yaml.load(fs.readFileSync(path.join(root, 'pnpm-workspace.yaml'), 'utf8'));
  assert.equal(config.engineStrict, true);
  assert.equal(config.pmOnFail, 'error');
  assert.equal(config.runtimeOnFail, 'error');
  assert.equal(config.ignoreScripts, true);
  assert.equal(config.strictDepBuilds, true);
  assert.equal(config.verifyDepsBeforeRun, 'error');
  assert.equal(config.sideEffectsCache, false);
  assert.equal(config.nodeLinker, 'hoisted');
  assert.deepEqual(config.allowBuilds, {'sharp@0.32.6': true, '@swc/core@1.16.13': true});
  assert.equal(config.dangerouslyAllowAllBuilds, undefined);
  assert.equal(manifest.scripts['setup:native'], 'node scripts/verify-toolchain.cjs --versions-only && pnpm rebuild --ignore-scripts=false sharp @swc/core && pnpm run verify:toolchain');
});

test('pnpm lockfile retains every direct exact dependency and approved native version', () => {
  const documents = yaml.loadAll(fs.readFileSync(path.join(root, 'pnpm-lock.yaml'), 'utf8'));
  const lock = documents.find(doc => doc.importers?.['.']?.dependencies);
  assert.ok(lock);
  assert.deepEqual(Object.keys(lock.importers['.'].dependencies).sort(), Object.keys(manifest.dependencies).sort());
  for (const [name, version] of Object.entries(manifest.dependencies)) {
    assert.equal(lock.importers['.'].dependencies[name].specifier, version);
    assert.ok(lock.packages[`${name}@${version}`]);
  }
  assert.ok(lock.packages['sharp@0.32.6']);
  assert.ok(lock.packages['@swc/core@1.16.13']);
});

test('release pipeline keeps toolchain, content, tests and finalizers', () => {
  const commands = manifest.scripts.build.split(' && ');
  assert.deepEqual(commands, [
    'node scripts/verify-toolchain.cjs', 'pnpm test', 'pnpm run check:content', 'docusaurus build',
    'node scripts/finalize-redirects.cjs', 'node scripts/finalize-llm-exports.cjs',
    'pnpm run check:artifacts',
  ]);
  for (const [name, command] of Object.entries(manifest.scripts)) {
    assert.match(command, /^node scripts\/verify-toolchain\.cjs(?: |$)/, `${name} must validate its original invoker before delegating`);
  }
  const workflow = fs.readFileSync(path.join(root, '.github/workflows/pages.yml'), 'utf8');
  assert.match(workflow, /cache: pnpm/);
  assert.match(workflow, /cache-dependency-path: pnpm-lock\.yaml/);
  assert.match(workflow, /pnpm install --frozen-lockfile --ignore-scripts/);
  assert.match(workflow, /pnpm run setup:native/);
});
