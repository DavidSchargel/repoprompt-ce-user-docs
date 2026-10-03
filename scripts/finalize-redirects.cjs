const fs = require('node:fs');
const path = require('node:path');
const config = require('../docusaurus.config.js');
const options = config.plugins.find((plugin) => Array.isArray(plugin) && plugin[0] === '@docusaurus/plugin-client-redirects')[1];
for (const redirect of options.redirects) {
  for (const from of [redirect.from].flat()) {
    const file = path.join(__dirname, '..', 'build', from, 'index.html');
    let html = fs.readFileSync(file, 'utf8');
    if (!html.includes('name="robots"')) html = html.replace('</head>', '<meta name="robots" content="noindex,follow">\n  </head>');
    html = html.replace(/window\.location\.href = ([^;]+);/, 'window.location.replace($1);');
    fs.writeFileSync(file, html);
  }
}
console.log('Finalized redirect noindex and history replacement; destinations, queries, and hashes retained.');
