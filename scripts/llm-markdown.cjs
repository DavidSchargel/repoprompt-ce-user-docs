const fs = require('node:fs');
const path = require('node:path');

function walkFiles(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walkFiles(file) : [file];
  });
}

function exportFiles(directory) {
  return walkFiles(directory).filter((file) => file.endsWith('.md') || /^llms.*\.txt$/.test(path.basename(file)));
}

async function localImageEdits(markdown) {
  const {unified} = await import('unified');
  const {default: remarkParse} = await import('remark-parse');
  const tree = unified().use(remarkParse).parse(markdown);
  const nodes = [];
  function visit(node) {
    nodes.push(node);
    node.children?.forEach(visit);
  }
  visit(tree);
  const definitions = new Map();
  for (const node of nodes.filter((item) => item.type === 'definition')) {
    if (!definitions.has(node.identifier)) definitions.set(node.identifier, node);
  }
  const linkIds = new Set(nodes.filter((node) => node.type === 'linkReference').map((node) => node.identifier));
  const removedDefinitions = new Set();
  const edits = [];
  for (const node of nodes) {
    if (node.type !== 'image' && node.type !== 'imageReference') continue;
    const definition = node.type === 'imageReference' ? definitions.get(node.identifier) : undefined;
    const url = node.url ?? definition?.url;
    if (url && /^(https?:)?\/\//i.test(url)) continue;
    const alt = (node.alt || 'Image').replace(/\s+/g, ' ').replace(/[\\`*_[\]<>]/g, '\\$&');
    edits.push({start: node.position.start.offset, end: node.position.end.offset, text: alt, url});
    if (definition && !linkIds.has(node.identifier) && !removedDefinitions.has(node.identifier)) {
      edits.push({start: definition.position.start.offset, end: definition.position.end.offset, text: ''});
      removedDefinitions.add(node.identifier);
    }
  }
  return edits;
}

async function sanitizeImages(markdown) {
  const edits = await localImageEdits(markdown);
  let result = markdown;
  for (const edit of edits.sort((a, b) => b.start - a.start)) {
    result = result.slice(0, edit.start) + edit.text + result.slice(edit.end);
  }
  return result;
}

module.exports = {walkFiles, exportFiles, localImageEdits, sanitizeImages};
