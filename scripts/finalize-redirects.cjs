const fs = require('node:fs');
const path = require('node:path');
const config = require('../docusaurus.config.js');
const options = config.plugins.find((plugin) => Array.isArray(plugin) && plugin[0] === '@docusaurus/plugin-client-redirects')[1];

function finalizeRedirectHtml(html, destination) {
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!canonical) throw new Error('Redirect page is missing its canonical destination.');
  // The plugin normalizes away a trailing slash before a fragment. Restore the
  // configured URL in its meta refresh, canonical link, and script together.
  if (destination) html = html.split(canonical).join(encodeURI(destination));
  if (!html.includes('name="robots"')) html = html.replace('</head>', '<meta name="robots" content="noindex,follow">\n  </head>');
  html = html.replace(/window\.location\.href = ([^;]+);/, 'window.location.replace($1);');
  if (!html.includes('<title>')) html = html.replace('</head>', '<title>Page moved | RepoPrompt</title>\n  </head>');
  html = html.replace('<html>', '<html lang="en">');
  if (!html.includes('<body>')) {
    const destination = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    html = html.replace('</html>', `<body><p>This page has moved. <a href="${destination}">Continue to RepoPrompt</a>.</p></body>\n</html>`);
  }
  return html;
}

function finalizeRedirects(directory = path.join(__dirname, '..', 'build'), baseUrl = config.baseUrl) {
  for (const redirect of options.redirects) {
    for (const from of [redirect.from].flat()) {
      const file = path.join(directory, from, 'index.html');
      const destination = redirect.to.startsWith('/') ? baseUrl + redirect.to.slice(1) : redirect.to;
      fs.writeFileSync(file, finalizeRedirectHtml(fs.readFileSync(file, 'utf8'), destination));
    }
  }
}

module.exports = {finalizeRedirectHtml, finalizeRedirects};
if (require.main === module) {
  finalizeRedirects();
  console.log('Finalized redirect metadata, history replacement, and fallback links.');
}
