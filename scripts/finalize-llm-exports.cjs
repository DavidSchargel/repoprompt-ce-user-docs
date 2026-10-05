const fs = require('node:fs/promises');
const path = require('node:path');
const {exportFiles, sanitizeImages} = require('./llm-markdown.cjs');
const {rewriteDocLinks} = require('./llm-links.cjs');
const {processMarkdownFile} = require('docusaurus-plugin-llms/lib/processor');
const {generateLLMFile} = require('docusaurus-plugin-llms/lib/generator');

function getVersionLabel(config, version) {
  const options = config.plugins.find(plugin => Array.isArray(plugin) && plugin[0] === 'docusaurus-plugin-llms')?.[1];
  const section = options?.docsDir?.find(section => section.path === `versioned_docs/version-${version}`);
  if (typeof section?.label !== 'string' || !section.label.trim()) {
    throw new Error(`Missing configured LLM export label for documentation version ${version}.`);
  }
  return section.label;
}

async function main() {
  const root = path.join(__dirname, '..');
  const directory = path.join(root, 'build');
  const config = require('../docusaurus.config.js');
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
  for (const file of exportFiles(directory)) await fs.unlink(file);
  for (const doc of docs) {
    const file = path.join(directory, new URL(doc.url).pathname.slice(config.baseUrl.length));
    await fs.mkdir(path.dirname(file), {recursive: true});
    await fs.writeFile(file, `# ${doc.title}\n\n> ${doc.description}\n\n${doc.content}\n`);
  }
  for (const full of [false, true]) {
    await generateLLMFile(docs, path.join(directory, full ? 'llms-full.txt' : 'llms.txt'), config.title, config.tagline, full, undefined, undefined, 100, false);
  }
  console.log(`Finalized ${docs.length} LLM documents with canonical version paths, resolved article links, and image alt text.`);
}

module.exports = {getVersionLabel};
if (require.main === module) main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
