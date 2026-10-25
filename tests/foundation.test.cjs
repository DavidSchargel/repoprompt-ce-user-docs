const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const remarkIdealImages = require('../plugins/remark-ideal-images.cjs');
const {assetRequireAttributeValue} = require('@docusaurus/mdx-loader/lib/remark/utils');
const root = path.join(__dirname, '..');
const currentDocsDirectory = `versioned_docs/version-${require('../versions.json')[0]}`;

test('shared Head filters Twitter metadata while retaining other SEO', () => {
  const React = require('react');
  const SeoHead = require('../src/components/SeoHead.js');
  const {HelmetProvider} = require('react-helmet-async');
  const {renderToStaticMarkup} = require('react-dom/server');
  const context = {};
  const head = React.createElement(SeoHead, {
    meta: [{name: 'twitter:site', content: 'excluded'}, {name: 'robots', content: 'noindex'}],
  },
    React.createElement('title', null, 'Preserved title'),
    React.createElement('link', {rel: 'canonical', href: 'https://example.invalid/docs/'}),
    React.createElement('meta', {name: 'twitter:card', content: 'summary'}),
    React.createElement('meta', {property: 'Twitter:image', content: '/excluded.png'}),
    React.createElement('meta', {property: 'og:image', content: '/retained.png'}),
    React.createElement('meta', {property: 'og:title', content: 'Preserved title'}),
    React.createElement('meta', {name: 'description', content: 'Preserved description'}),
  );
  renderToStaticMarkup(React.createElement(HelmetProvider, {context}, head));
  const output = context.helmet.title.toString() + context.helmet.meta.toString() + context.helmet.link.toString();
  assert.doesNotMatch(output, /twitter:/i);
  for (const text of ['Preserved title', 'canonical', 'og:image', 'og:title', 'Preserved description']) assert.ok(output.includes(text));
  const plugin = require('../plugins/seo-policy.cjs')();
  assert.equal(plugin.configureWebpack().resolve.alias['@docusaurus/Head'], require.resolve('../src/components/SeoHead.js'));
});

test('LLM-only cleanup retains alt text, remote images, and code examples', async () => {
  const {sanitizeImages, localImageEdits} = require('../scripts/llm-markdown.cjs');
  const input = [
    '![Local screenshot](@site/static/images/example.png)',
    '![Future screenshot](../media/screen.png "Screenshot")',
    '![Static diagram](/images/diagram.svg)',
    '![Reference diagram][diagram]',
    '[diagram]: @site/static/diagram.svg',
    '![Remote diagram](https://example.invalid/diagram.png)',
    '`![Code example](@site/example.png)`',
    '```md\n![Fenced example](@site/example.png)\n```',
  ].join('\n\n');
  const output = await sanitizeImages(input);
  assert.ok(output.includes('Local screenshot'));
  assert.ok(output.includes('Future screenshot'));
  assert.ok(output.includes('Reference diagram'));
  assert.ok(output.includes('![Remote diagram](https://example.invalid/diagram.png)'));
  assert.ok(output.includes('`![Code example](@site/example.png)`'));
  assert.ok(output.includes('```md\n![Fenced example](@site/example.png)\n```'));
  assert.doesNotMatch(output, /@site\/static\/images\/example\.png|\.\.\/media|\[diagram\]:/);
  assert.equal((await localImageEdits(output)).length, 0);
  assert.equal(await sanitizeImages(output), output);
});

test('artifact metadata guard rejects quoted and minified Twitter tags', () => {
  const {assertNoTwitter} = require('../scripts/check-artifacts.cjs');
  for (const html of ['<meta name="twitter:card" content="summary">', '<meta property=twitter:image content=/image.png>', "<META NAME='Twitter:site' content='excluded'>"]) {
    assert.throws(() => assertNoTwitter(html, 'test'));
  }
  assert.doesNotThrow(() => assertNoTwitter('<meta property=og:title content="Preserved"><link rel=canonical href=/>', 'test'));
});

function imageTree(file, hash = '', alt = 'Informative alt text') {
  const value = assetRequireAttributeValue(`!/loaders/url-loader!${file}`, hash);
  return {type: 'root', children: [{type: 'paragraph', children: [{
    type: 'mdxJsxTextElement', name: 'img', attributes: [
      {type: 'mdxJsxAttribute', name: 'alt', value: alt},
      {type: 'mdxJsxAttribute', name: 'src', value},
    ], children: [],
  }]}]};
}

test('local PNG and JPEG Markdown imports reach ideal-image without string coercion', () => {
  for (const file of ['./example.png', './example.jpg', './example.JPEG']) {
    for (const alt of ['Informative alt text', '']) {
      const tree = imageTree(file, '', alt);
      remarkIdealImages()(tree);
      const image = tree.children[0].children[0];
      const value = image.attributes[1].value;
      assert.equal(value.data.estree.body[0].expression.type, 'CallExpression');
      assert.equal(value.data.estree.body[0].expression.arguments[0].value, file);
      assert.equal(value.value, `require(${JSON.stringify(file)})`);
      const altAttributes = image.attributes.filter(attribute => attribute.name === 'alt');
      assert.equal(altAttributes.length, 1);
      assert.equal(altAttributes[0].value, alt);
      assert.equal(tree.children[0].type, 'paragraph');
    }
  }
});

test('generated Markdown images retain empty alt without approving omitted JSX alt', () => {
  const tree = imageTree('./example.png', '', '');
  const image = tree.children[0].children[0];
  image.attributes = image.attributes.filter(attribute => attribute.name !== 'alt');
  remarkIdealImages()(tree);
  assert.equal(image.attributes.find(attribute => attribute.name === 'alt')?.value, '');
  const jsx = {type: 'mdxJsxTextElement', name: 'img', attributes: [
    {type: 'mdxJsxAttribute', name: 'src', value: './example.png'},
  ]};
  remarkIdealImages()({type: 'root', children: [jsx]});
  assert.equal(jsx.attributes.find(attribute => attribute.name === 'alt'), undefined);
});

test('provider comparison MDX keeps its caption, scoped headers, and keyboard-scroll region', async () => {
  const React = require('react');
  const {renderToStaticMarkup} = require('react-dom/server');
  const {compile, run} = await import('@mdx-js/mdx');
  const mdx = await import('@mdx-js/react');
  const runtime = await import('react/jsx-runtime');
  const {default: frontmatter} = await import('remark-frontmatter');
  const {code} = require('@babel/core').transformSync(fs.readFileSync(
    require.resolve('@docusaurus/theme-classic/lib/theme/MDXContent/index.js'), 'utf8'), {
    babelrc: false,
    configFile: false,
    plugins: ['@babel/plugin-transform-react-jsx', '@babel/plugin-transform-modules-commonjs'],
  });
  // The site uses intrinsic elements for the explicit table and overflow region.
  const dependencies = {react: React, '@mdx-js/react': mdx, '@theme/MDXComponents': {}};
  const exports = {};
  require('node:vm').runInNewContext(code, {exports, require(name) {
    assert.ok(Object.hasOwn(dependencies, name), `Unexpected dependency: ${name}`);
    return dependencies[name];
  }});
  const MDXContent = exports.default;
  const source = fs.readFileSync(path.join(root, currentDocsDirectory, 'agent-mode/providers.mdx'), 'utf8');
  const compiled = await compile(source, {
    remarkPlugins: [frontmatter],
    outputFormat: 'function-body',
    providerImportSource: '@mdx-js/react',
  });
  const {default: Content} = await run(compiled, {...runtime, useMDXComponents: mdx.useMDXComponents});
  const html = renderToStaticMarkup(React.createElement(MDXContent, null, React.createElement(Content)));
  const wrapper = html.match(/<div\b([^>]*)>\s*(<table>[\s\S]*?<\/table>)\s*<\/div>/);
  assert.ok(wrapper, 'Expected a table inside an explicit overflow region');
  for (const attribute of ['class="accessible-table-scroll"', 'role="region"', 'tabindex="0"']) {
    assert.ok(wrapper[1].includes(attribute), `Missing table-region ${attribute}`);
  }
  const label = wrapper[1].match(/aria-labelledby="([^"]+)"/);
  assert.ok(label, 'Table region needs a caption reference');
  const caption = wrapper[2].match(/<caption id="([^"]+)">([^<]+)<\/caption>/);
  assert.ok(caption, 'Table needs a nonempty caption');
  assert.equal(label[1], caption[1], 'Table region must be labelled by its own caption');
  assert.match(wrapper[2], /<thead>[\s\S]*?<th scope="col">Feature<\/th>/);
  assert.equal((wrapper[2].match(/<th scope="col">/g) || []).length, 6);
  assert.equal((wrapper[2].match(/<th scope="row">/g) || []).length, 8);
  assert.doesNotMatch(wrapper[2], /<td>\s*[✓—-]\s*<\/td>/);
  assert.match(html, /focus the table region/);
});

test('active docs landing keeps a navigable outline and standalone link names', async () => {
  const {compile} = await import('@mdx-js/mdx');
  const {default: frontmatter} = await import('remark-frontmatter');
  const source = fs.readFileSync(path.join(root, currentDocsDirectory, 'index.mdx'), 'utf8');
  await compile(source, {remarkPlugins: [frontmatter]});
  for (const [marker, heading] of [
    ['##', 'Talk to These Docs'],
    ['###', 'Typical Agent Context'], ['###', 'RepoPrompt Context'],
    ['###', '1. Explore'], ['###', '2. Curate'], ['###', '3. Handoff'],
    ['###', 'Without Curated Context'], ['###', 'With Curated Context'],
  ]) {
    assert.ok(source.split('\n').includes(`${marker} ${heading}`), `Missing heading: ${marker} ${heading}`);
  }
  assert.doesNotMatch(source, /\[Learn more\s*→\]/);
  for (const label of [
    'Explore the Context Builder workflow',
    'Explore Agent Orchestration workflows',
    'Learn more about CLI Providers',
  ]) assert.ok(source.includes(`[${label} →]`));
  assert.match(source, /\[!\[Video preview image\]\(https:\/\/img\.youtube\.com\/vi\/ncY6cqOCd_Y\/maxresdefault\.jpg\) RepoPrompt 101 Video walkthroughs/);
  assert.match(source, /\[!\[Podcast cover art\]\(\.\.\/\.\.\/static\/images\/docs\/images\/rate-limited_profile\.jpg\) Rate Limited Podcast AI coding workflows/);
  for (const route of [
    './agent-mode/workflows.mdx',
    './mcp-server/mcp-overview.mdx',
    '../version-classic-2.1.0/ai-providers/cli-providers.mdx',
  ]) assert.ok(source.includes(`](${route})`), `Preserve cross-version or current route: ${route}`);
});

test('unsupported formats, URL fragments, queries, and remote images stay unchanged', () => {
  for (const [file, hash] of [['./example.webp', ''], ['./example.svg', ''], ['./example.png', '#detail'], ['./example.png?raw', '']]) {
    const tree = imageTree(file, hash);
    const before = structuredClone(tree);
    remarkIdealImages()(tree);
    assert.deepEqual(tree, before);
  }
  const remote = {type: 'root', children: [{type: 'image', url: 'https://example.invalid/image.png', alt: 'Remote image'}]};
  const before = structuredClone(remote);
  remarkIdealImages()(remote);
  assert.deepEqual(remote, before);
});

test('published blog, versioned docs, and page content parse as strict MDX', async (t) => {
  const {compile} = await import('@mdx-js/mdx');
  const {default: frontmatter} = await import('remark-frontmatter');
  const {walkFiles} = require('../scripts/llm-markdown.cjs');
  const directories = ['blog', 'src/pages', ...require('../versions.json').map((version) => `versioned_docs/version-${version}`)];
  const failures = [];
  for (const directory of directories) {
    const files = walkFiles(path.join(root, directory)).filter((file) => /\.mdx?$/.test(file)).sort();
    assert.ok(files.length > 0, `No Markdown content found in ${directory}`);
    for (const file of files) {
      try {
        await compile({path: file, value: fs.readFileSync(file, 'utf8')}, {remarkPlugins: [frontmatter]});
      } catch (error) {
        failures.push(`${path.relative(root, file)}:${error.line || error.place?.line || '?'}:${error.column || error.place?.column || '?'} ${error.message}`);
      }
    }
    t.diagnostic(`Checked ${files.length} Markdown/MDX files in ${directory}`);
  }
  assert.deepEqual(failures, [], 'Published content contains strict-MDX parse errors');
});

test('responsive-image QA discovers screenshots beyond the docs index', () => {
  const {findResponsiveImages} = require('../scripts/check-artifacts.cjs');
  const pages = [
    '<main>Documentation overview without screenshots</main>',
    '<img alt="Workspace screenshot" loading=lazy src=/assets/ideal-img/workspace.640.jpg srcset="/assets/ideal-img/workspace.320.jpg 320w, /assets/ideal-img/workspace.640.jpg 640w">',
    '<img alt="Unoptimized icon" src=/images/icon.svg>',
  ];
  const images = findResponsiveImages(pages);
  assert.equal(images.length, 1);
  assert.equal(images[0].alt, 'Workspace screenshot');
});

test('a new CE release keeps older CE docs and Classic on distinct routes', async (t) => {
  const configPath = path.join(root, 'docusaurus.config.js');
  const localRequire = require('node:module').createRequire(configPath);
  const currentVersion = require('../versions.json')[0];
  const nextVersion = '99.0.0';
  const configRequire = name => name === './versions.json'
    ? [nextVersion, currentVersion, 'classic-2.1.0'] : localRequire(name);
  configRequire.resolve = localRequire.resolve;
  const context = {module: {exports: {}}, require: configRequire, process: {env: {}}, URL};
  require('node:vm').runInNewContext(fs.readFileSync(configPath, 'utf8'), context, {filename: configPath});
  const config = context.module.exports;
  const docs = config.presets[0][1].docs;
  assert.equal(docs.lastVersion, nextVersion);
  assert.equal(docs.versions[nextVersion].path, '');
  assert.equal(docs.versions[currentVersion].path, currentVersion);
  assert.equal(docs.versions['classic-2.1.0'].path, 'classic-2.1.0');
  assert.equal(docs.versions['classic-2.1.0'].label, 'Classic 2.1.0');
  assert.equal(docs.versions['classic-2.1.0'].banner, 'unmaintained');
  const sections = config.plugins.find(plugin => plugin[0] === 'docusaurus-plugin-llms')[1].docsDir;
  for (const [index, version, route, label] of [
    [0, nextVersion, 'docs', `Community Edition ${nextVersion}`],
    [1, currentVersion, `docs/${currentVersion}`, `Community Edition ${currentVersion}`],
    [2, 'classic-2.1.0', 'docs/classic-2.1.0', 'Classic 2.1.0'],
  ]) {
    assert.equal(sections[index].path, `versioned_docs/version-${version}`);
    assert.equal(sections[index].routeBasePath, route);
    assert.equal(sections[index].label, label);
  }

  // Build minimal content with the simulated configuration's real routing options.
  const fixtures = path.join(root, '.foundation-fixtures');
  fs.mkdirSync(fixtures, {recursive: true});
  const siteDir = fs.mkdtempSync(path.join(fixtures, 'next-release-'));
  t.after(() => fs.rmSync(siteDir, {recursive: true, force: true}));
  fs.writeFileSync(path.join(siteDir, 'package.json'), JSON.stringify({name: 'next-release-fixture', version: '1.0.0'}));
  fs.writeFileSync(path.join(siteDir, 'versions.json'), JSON.stringify([nextVersion, currentVersion, 'classic-2.1.0']));
  fs.writeFileSync(path.join(siteDir, 'docusaurus.config.js'), `module.exports = ${JSON.stringify({
    title: config.title,
    url: config.url,
    baseUrl: config.baseUrl,
    trailingSlash: config.trailingSlash,
    onDuplicateRoutes: config.onDuplicateRoutes,
    presets: [[require.resolve('@docusaurus/preset-classic'), {
      docs: {...docs, sidebarPath: false, remarkPlugins: []},
      blog: false,
    }]],
  })};`);
  fs.mkdirSync(path.join(siteDir, 'src/pages'), {recursive: true});
  fs.writeFileSync(path.join(siteDir, 'src/pages/index.md'), '# Release fixture\n');
  const expectedPages = [
    [nextVersion, 'docs'],
    [currentVersion, `docs/${currentVersion}`],
    ['classic-2.1.0', 'docs/classic-2.1.0'],
  ];
  for (const [version] of expectedPages) {
    const directory = path.join(siteDir, 'versioned_docs', `version-${version}`);
    fs.mkdirSync(directory, {recursive: true});
    fs.writeFileSync(path.join(directory, 'index.md'), `---\ntitle: Release ${version}\nslug: /\n---\n\nUnique content for release ${version}.\n`);
  }
  const cli = path.join(path.dirname(require.resolve('@docusaurus/core/package.json')), 'bin/docusaurus.mjs');
  await require('node:util').promisify(require('node:child_process').execFile)(
    process.execPath, [cli, 'build', siteDir, '--no-minify'], {cwd: root, timeout: 120_000, maxBuffer: 10 * 1024 * 1024},
  );
  for (const [version, route] of expectedPages) {
    const html = fs.readFileSync(path.join(siteDir, 'build', route, 'index.html'), 'utf8');
    assert.ok(html.includes(`Unique content for release ${version}.`), `Wrong content at ${route}/`);
    assert.ok(html.includes(`href="${config.url}/${route}/"`), `Wrong canonical URL at ${route}/`);
    for (const [otherVersion] of expectedPages) {
      if (otherVersion !== version) assert.ok(!html.includes(`Unique content for release ${otherVersion}.`));
    }
  }
});

test('LLM exports use configured labels for future CE, retained CE, and Classic', () => {
  const {getVersionLabel} = require('../scripts/finalize-llm-exports.cjs');
  const config = {plugins: ['unrelated-plugin', ['docusaurus-plugin-llms', {docsDir: [
    {path: 'versioned_docs/version-classic-2.1.0', label: 'Classic 2.1.0'},
    {path: 'versioned_docs/version-99.0.0', label: 'Community Edition next release'},
    {path: 'versioned_docs/version-98.0.0', label: 'Community Edition previous release'},
  ]}]]};
  assert.equal(getVersionLabel(config, '99.0.0'), 'Community Edition next release');
  assert.equal(getVersionLabel(config, '98.0.0'), 'Community Edition previous release');
  assert.equal(getVersionLabel(config, 'classic-2.1.0'), 'Classic 2.1.0');
  assert.throws(() => getVersionLabel(config, '97.0.0'), /Missing configured LLM export label.*97\.0\.0/);
  config.plugins[1][1].docsDir[1].label = ' ';
  assert.throws(() => getVersionLabel(config, '99.0.0'), /Missing configured LLM export label/);
});

test('version, theme, plugin, and redirect contracts are intact', () => {
  const config = require('../docusaurus.config.js');
  const versions = require('../versions.json');
  assert.ok(versions.includes('classic-2.1.0'));
  const docs = config.presets[0][1].docs;
  assert.equal(docs.includeCurrentVersion, false);
  assert.equal(docs.lastVersion, versions[0]);
  assert.equal(docs.versions[versions[0]].path, '');
  assert.equal(docs.versions['classic-2.1.0'].path, 'classic-2.1.0');
  assert.equal(config.future.v4, true);
  assert.equal(config.themes[0][0], 'cosmos-docusaurus-theme');
  const navbarItems = config.themeConfig.navbar.items;
  const githubIndex = navbarItems.findIndex((item) => item.className === 'header-github-link');
  assert.notEqual(githubIndex, -1);
  assert.equal(navbarItems[githubIndex].href, 'https://github.com/repoprompt/repoprompt-ce');
  assert.equal(navbarItems[githubIndex].label, 'RepoPrompt CE on GitHub');
  assert.equal(navbarItems[githubIndex + 1].type, 'search');
  assert.equal(navbarItems[githubIndex + 2].type, 'docsVersionDropdown');
  if (!config.themeConfig.algolia) {
    const localSearch = config.themes.find((theme) => Array.isArray(theme) && theme[0] === require.resolve('@easyops-cn/docusaurus-search-local'));
    assert.ok(localSearch, 'Docs search must work without Algolia credentials');
    assert.equal(localSearch[1].indexDocs, true);
    assert.equal(localSearch[1].indexBlog, false);
    assert.equal(localSearch[1].forceIgnoreNoIndex, true);
  }
  const plugins = config.plugins.map((plugin) => Array.isArray(plugin) ? plugin[0] : plugin);
  for (const name of ['docusaurus-plugin-llms', 'docusaurus-plugin-copy-page-button', '@docusaurus/plugin-ideal-image']) assert.ok(plugins.includes(name));
  assert.ok(plugins.includes('docusaurus-plugin-image-zoom'));
  assert.equal(config.themeConfig.zoom.selector, '.markdown img');
  const redirect = config.plugins.find((plugin) => plugin[0] === '@docusaurus/plugin-client-redirects')[1].redirects[0];
  assert.deepEqual(redirect.from, ['/claim', '/unsubscribe', '/appcast', '/pricing', '/roadmap', '/prompt-anatomy']);
  assert.equal(redirect.to, '/');
});
