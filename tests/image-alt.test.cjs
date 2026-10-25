const test = require('node:test');
const assert = require('node:assert/strict');
const {assertImageAlt} = require('../scripts/check-content.cjs');
const currentDocsDirectory = `versioned_docs/version-${require('../versions.json')[0]}`;
const classicDocsDirectory = `versioned_docs/version-${require('../versions.json').find(version => version.startsWith('classic-'))}`;

test('Markdown and direct JSX images require reviewed paths for empty alt', async () => {
  const {createProcessor} = await import('@mdx-js/mdx');
  const file = `${currentDocsDirectory}/settings/agent-mode/overview.mdx`;
  const validate = (source, destination = file) => {
    const walk = node => {
      assertImageAlt(node, destination);
      (node.children || []).forEach(walk);
    };
    walk(createProcessor().parse(source));
  };
  for (const url of ['../images/advanced.png', '../images/./advanced.png']) {
    validate(`![](${url})`);
    assert.throws(() => validate(`<img src="${url}" alt="" />`), /use Markdown syntax/);
    assert.throws(() => validate(`Text <img src="${url}" alt="" />`), /use Markdown syntax/);
    assert.throws(() => validate(`<img src="${url}" alt="" role="presentation" srcSet="generated.png 320w" />`), /use Markdown syntax/);
  }
  for (const url of ['./images/advanced.png', '../../images/advanced.png', '../images/unreviewed.png', 'https://example.com/images/advanced.png']) {
    assert.throws(() => validate(`![](${url})`), /missing image alt/);
    assert.throws(() => validate(`<img src="${url}" alt="" role="presentation" srcSet="generated.png 320w" />`), /missing image alt/);
    validate(`![Settings screenshot](${url})`);
    validate(`<img src="${url}" alt="Settings screenshot" />`);
  }
  assert.throws(() => validate('<img src="../images/advanced.png" role="presentation" />'), /missing image alt/);
  assert.throws(() => validate('![](../images/advanced.png)', `${currentDocsDirectory}/agent-mode/overview.mdx`), /missing image alt/);
  assert.throws(() => validate('![](../images/advanced.png)', `${classicDocsDirectory}/settings/agent-mode/overview.mdx`), /missing image alt/);
});

test('listing a new CE release does not approve its decorative images', () => {
  const fs = require('node:fs');
  const scriptPath = require.resolve('../scripts/check-content.cjs');
  const localRequire = require('node:module').createRequire(scriptPath);
  const nextVersion = '99.0.0';
  let futureBytes;
  const configRequire = name => {
    if (name === '../versions.json') return [nextVersion, ...require('../versions.json')];
    if (name === 'node:fs') return {...fs, readFileSync(file, ...args) {
      if (futureBytes && file.endsWith(`version-${nextVersion}/settings/images/advanced.png`)) return futureBytes;
      return fs.readFileSync(file, ...args);
    }};
    return localRequire(name);
  };
  const context = {module: {exports: {}}, require: configRequire, __dirname: require('node:path').dirname(scriptPath)};
  require('node:vm').runInNewContext(fs.readFileSync(scriptPath, 'utf8'), context, {filename: scriptPath});
  const validate = context.module.exports.assertImageAlt;
  const image = {type: 'image', alt: '', url: '../images/advanced.png'};
  const nextDirectory = `versioned_docs/version-${nextVersion}`;
  for (const directory of [currentDocsDirectory]) {
    assert.doesNotThrow(() => validate(image, `${directory}/settings/agent-mode/overview.mdx`));
    assert.throws(() => validate({...image, url: '../images/unreviewed.png'}, `${directory}/settings/agent-mode/overview.mdx`), /missing image alt/);
    assert.throws(() => validate(image, `${directory}/agent-mode/overview.mdx`), /missing image alt/);
    assert.throws(() => validate({type: 'mdxJsxTextElement', name: 'img', attributes: [
      {type: 'mdxJsxAttribute', name: 'src', value: image.url},
      {type: 'mdxJsxAttribute', name: 'alt', value: ''},
    ]}, `${directory}/settings/agent-mode/overview.mdx`), /missing image alt/);
  }
  for (const directory of [nextDirectory, classicDocsDirectory, 'versioned_docs/version-unlisted']) {
    assert.throws(() => validate(image, `${directory}/settings/agent-mode/overview.mdx`), /missing image alt/);
    assert.doesNotThrow(() => validate({...image, alt: 'Settings screenshot'}, `${directory}/settings/agent-mode/overview.mdx`));
  }
  futureBytes = fs.readFileSync(require('node:path').join(__dirname, '..', currentDocsDirectory, 'settings/images/advanced.png'));
  assert.doesNotThrow(() => validate(image, `${nextDirectory}/settings/agent-mode/overview.mdx`), 'Identical reviewed images remain approved in future releases');
  futureBytes = Buffer.from('changed image content');
  assert.throws(() => validate(image, `${nextDirectory}/settings/agent-mode/overview.mdx`), /missing image alt/, 'Changed images require review');
});
