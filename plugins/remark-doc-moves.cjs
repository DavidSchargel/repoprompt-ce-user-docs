const path = require('node:path');

const root = path.resolve(__dirname, '..');
const moves = new Map([
  [
    path.join(root, 'versioned_docs/version-1.6.0/agent-mode/sessions.mdx'),
    path.join(root, 'versioned_docs/version-1.6.0/sessions/overview.mdx'),
  ],
  [
    path.join(root, 'versioned_docs/version-1.6.0/agent-mode/providers.mdx'),
    path.join(root, 'versioned_docs/version-1.6.0/providers/overview.mdx'),
  ],
]);

// Preserve source links from the immutable Classic archive when a CE guide moves.
function resolveMovedDocLink(sourceFile, url) {
  if (!sourceFile || typeof url !== 'string' || /^[a-z][\w+.-]*:|^\/|^#/i.test(url)) return url;
  const [, request, suffix] = url.match(/^([^?#]*)(.*)$/s);
  const destination = moves.get(path.resolve(path.dirname(sourceFile), decodeURIComponent(request)));
  if (!destination) return url;
  return path.relative(path.dirname(sourceFile), destination).split(path.sep).join('/') + suffix;
}

function remarkDocMoves() {
  return (tree, file) => {
    function visit(node) {
      if (node.type === 'link' || node.type === 'definition') {
        node.url = resolveMovedDocLink(file.path, node.url);
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}

module.exports = remarkDocMoves;
module.exports.resolveMovedDocLink = resolveMovedDocLink;
