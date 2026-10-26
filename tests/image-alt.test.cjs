const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {createHash} = require('node:crypto');

const current = 'versioned_docs/version-fixture-current';
const archived = 'versioned_docs/version-classic-fixture';
const reviewedBytes = Buffer.from('reviewed fixture image');

function imagePolicy(versions = ['fixture-current', 'classic-fixture']) {
  const scriptPath = require.resolve('../scripts/check-content.cjs');
  const localRequire = require('node:module').createRequire(scriptPath);
  const root = path.resolve(__dirname, '..');
  const images = new Map([[`${current}/settings/images/reviewed.png`, reviewedBytes]]);
  const configRequire = name => {
    if (name === '../versions.json') return versions;
    if (name === './decorative-settings-images.json') {
      return {'reviewed.png': createHash('sha256').update(reviewedBytes).digest('hex')};
    }
    if (name === 'node:fs') return {
      readFileSync(file) {
        const bytes = images.get(path.relative(root, file).split(path.sep).join('/'));
        if (!bytes) throw Object.assign(new Error('Missing fixture image'), {code: 'ENOENT'});
        return bytes;
      },
    };
    return localRequire(name);
  };
  const context = {module: {exports: {}}, require: configRequire, __dirname: path.dirname(scriptPath)};
  require('node:vm').runInNewContext(fs.readFileSync(scriptPath, 'utf8'), context, {filename: scriptPath});
  return {validate: context.module.exports.assertImageAlt, images};
}

test('Markdown and direct JSX images require reviewed paths for empty alt', async () => {
  const {createProcessor} = await import('@mdx-js/mdx');
  const policy = imagePolicy();
  const validate = (source, destination = `${current}/settings/example/page.mdx`) => {
    const walk = node => {
      policy.validate(node, destination);
      (node.children || []).forEach(walk);
    };
    walk(createProcessor().parse(source));
  };
  for (const url of ['../images/reviewed.png', '../images/./reviewed.png']) {
    validate(`![](${url})`);
    assert.throws(() => validate(`<img src="${url}" alt="" />`), /use Markdown syntax/);
    assert.throws(() => validate(`Text <img src="${url}" alt="" />`), /use Markdown syntax/);
  }
  for (const url of ['./images/reviewed.png', '../../images/reviewed.png', '../images/unreviewed.png', 'https://example.com/images/reviewed.png']) {
    assert.throws(() => validate(`![](${url})`), /missing image alt/);
    assert.throws(() => validate(`<img src="${url}" alt="" role="presentation" />`), /missing image alt/);
    validate(`![Example image](${url})`);
    validate(`<img src="${url}" alt="Example image" />`);
  }
  assert.throws(() => validate('<img src="../images/reviewed.png" role="presentation" />'), /missing image alt/);
  assert.throws(() => validate('![](../images/reviewed.png)', `${current}/example/page.mdx`), /missing image alt/);
  assert.throws(() => validate('![](../images/reviewed.png)', `${archived}/settings/example/page.mdx`), /missing image alt/);
});

test('image approval follows reviewed bytes across registered versions', () => {
  const next = 'versioned_docs/version-fixture-next';
  const {validate, images} = imagePolicy(['fixture-next', 'fixture-current', 'classic-fixture']);
  const image = {type: 'image', alt: '', url: '../images/reviewed.png'};
  assert.doesNotThrow(() => validate(image, `${current}/settings/example/page.mdx`));
  for (const directory of [next, archived, 'versioned_docs/version-unlisted']) {
    assert.throws(() => validate(image, `${directory}/settings/example/page.mdx`), /missing image alt/);
    assert.doesNotThrow(() => validate({...image, alt: 'Example image'}, `${directory}/settings/example/page.mdx`));
  }
  images.set(`${next}/settings/images/reviewed.png`, reviewedBytes);
  assert.doesNotThrow(() => validate(image, `${next}/settings/example/page.mdx`));
  images.set(`${next}/settings/images/reviewed.png`, Buffer.from('changed image bytes'));
  assert.throws(() => validate(image, `${next}/settings/example/page.mdx`), /missing image alt/);
});
