const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const yaml = require('js-yaml');

function readDocs(root = path.join(__dirname, '..')) {
  const config = require(path.join(root, 'docusaurus.config.js'));
  const options = config.presets.find(([name]) => name === 'classic')[1].docs;
  return require(path.join(root, 'versions.json')).flatMap(version => {
    const directory = `versioned_docs/version-${version}`;
    return fs.readdirSync(path.join(root, directory), {recursive: true})
      .filter(file => /\.mdx?$/.test(file)).sort().map(file => {
        const destination = `${directory}/${file}`;
        const content = fs.readFileSync(path.join(root, destination), 'utf8');
        const header = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
        assert.ok(header, `${destination}: missing frontmatter`);
        const metadata = yaml.load(header[1]);
        assert.ok(typeof metadata.slug === 'string' && metadata.slug.startsWith('/'), `${destination}: explicit slug required`);
        const prefix = options.versions[version].path;
        const route = '/' + [options.routeBasePath, prefix, metadata.slug].filter(Boolean).join('/').split('/').filter(Boolean).join('/') + '/';
        const id = path.posix.join(path.posix.dirname(file), metadata.id || path.posix.basename(file).replace(/\.mdx?$/, ''));
        return {destination, version, route, id, content};
      });
  });
}
module.exports = {readDocs};
