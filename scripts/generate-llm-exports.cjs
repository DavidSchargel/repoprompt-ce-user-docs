/**
 * Generates documentation Markdown exports, llms.txt, and llms-full.txt in build/.
 * Runs once after Docusaurus, using the registered documentation inventory and
 * version labels to preserve canonical routes, resolve links, and retain image
 * descriptions. Uses docusaurus-plugin-llms as a processing library; the package
 * is not registered as a Docusaurus plugin.
 */
const fs = require('node:fs/promises');
const path = require('node:path');
const {sanitizeImages} = require('./llm-markdown.cjs');
const {rewriteDocLinks} = require('./llm-links.cjs');
const {processMarkdownFile} = require('docusaurus-plugin-llms/lib/processor');
const {generateLLMFile} = require('docusaurus-plugin-llms/lib/generator');

function getVersionLabel(config, version) {
  const options = config.presets.find(([name]) => name === 'classic')[1].docs.versions[version];
  if (typeof options?.label !== 'string' || !options.label.trim()) {
    throw new Error(`Missing configured LLM export label for documentation version ${version}.`);
  }
  return version.startsWith('classic-') ? options.label : `Community Edition ${options.label}`;
}

async function generateExports({root = path.join(__dirname, '..'), directory = path.join(root, 'build')} = {}) {
  const config = require(path.join(root, 'docusaurus.config.js'));
  const siteUrl = new URL(config.baseUrl, config.url).href;
  const entries = require('./doc-inventory.cjs').readDocs(root);
  const labels = new Map([...new Set(entries.map(entry => entry.version))]
    .map(version => [version, getVersionLabel(config, version)]));
  const routes = Object.fromEntries(entries.map((entry) => [entry.destination, entry.route]));
  const docs = [];
  for (const entry of entries) {
    const doc = await processMarkdownFile(path.join(root, entry.destination), root, siteUrl, 'docs', {
      excludeImports: true, resolvedUrl: entry.route,
    });
    doc.content = await rewriteDocLinks(await sanitizeImages(doc.content), entry.destination, routes, siteUrl);
    doc.url = new URL(entry.route.slice(1).replace(/\/$/, '') + '.md', siteUrl).href;
    doc.section = labels.get(entry.version);
    docs.push(doc);
  }
  for (const doc of docs) {
    const file = path.join(directory, new URL(doc.url).pathname.slice(config.baseUrl.length));
    await fs.mkdir(path.dirname(file), {recursive: true});
    await fs.writeFile(file, `# ${doc.title}\n\n> ${doc.description}\n\n${doc.content}\n`);
  }
  for (const full of [false, true]) {
    await generateLLMFile(docs, path.join(directory, full ? 'llms-full.txt' : 'llms.txt'), config.title, config.tagline, full, undefined, undefined, 100, false);
  }
  console.log(`Generated ${docs.length} LLM documents with canonical version paths, resolved article links, and image alt text.`);
}

module.exports = {getVersionLabel, generateExports};
if (require.main === module) generateExports().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
