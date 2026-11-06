const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {createRequire} = require('node:module');

// Exercise the real config with synthetic CE versions, independent of editorial releases.
test('documentation labels omit zero patches without changing version IDs or published routes', () => {
  const filename = path.resolve(__dirname, '../docusaurus.config.js');
  const configRequire = createRequire(filename);
  const versions = ['9.4.0', '9.3.0', '9.2.5', 'classic-2.1.0'];
  const fixtureRequire = Object.assign(
    id => id === './versions.json' ? versions : configRequire(id),
    {resolve: configRequire.resolve},
  );
  const context = {module: {exports: {}}, require: fixtureRequire, process: {env: {}}, URL};
  vm.runInNewContext(fs.readFileSync(filename, 'utf8'), context, {filename});
  const config = context.module.exports;
  const docs = config.presets[0][1].docs;
  assert.equal(docs.lastVersion, versions[0]);
  assert.equal(docs.includeCurrentVersion, false);
  assert.deepEqual(Object.keys(docs.versions), versions);
  const llm = config.plugins.find(plugin => Array.isArray(plugin) && plugin[0] === 'docusaurus-plugin-llms')[1];
  for (const [id, label, route, banner] of [
    ['9.4.0', '9.4', '', 'none'],
    ['9.3.0', '9.3', '9.3.0', 'unmaintained'],
    ['9.2.5', '9.2.5', '9.2.5', 'unmaintained'],
    ['classic-2.1.0', 'Classic 2.1', 'classic-2.1.0', 'unmaintained'],
  ]) {
    assert.equal(docs.versions[id].label, label);
    assert.equal(docs.versions[id].path, route);
    assert.equal(docs.versions[id].banner, banner);
    const directory = llm.docsDir.find(entry => entry.path === `versioned_docs/version-${id}`);
    assert.equal(directory.routeBasePath, ['docs', route].filter(Boolean).join('/'));
    assert.equal(directory.label, id.startsWith('classic-') ? label : `Community Edition ${label}`);
  }
});
