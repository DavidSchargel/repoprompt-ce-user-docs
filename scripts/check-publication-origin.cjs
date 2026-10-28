const {isIP} = require('node:net');

function publicationOrigin(env = process.env) {
  if (!env.SITE_URL && !env.PAGES_OWNER) throw new Error('Publication requires SITE_URL or PAGES_OWNER.');
  const origin = new URL(env.SITE_URL || `https://${env.PAGES_OWNER}.github.io`);
  if (origin.protocol !== 'https:' || origin.pathname !== '/' || origin.search || origin.hash || origin.username || origin.password) {
    throw new Error('Publication requires SITE_URL to be an HTTPS origin without a path, query, fragment, or credentials.');
  }
  const hostname = origin.hostname.toLowerCase().replace(/\.$/, '');
  const ip = hostname.replace(/^\[|\]$/g, '');
  const reserved = ['localhost', 'local', 'internal', 'invalid', 'test', 'example', 'example.com', 'example.net', 'example.org'];
  if (!hostname.includes('.') || isIP(ip) || reserved.some(domain => hostname === domain || hostname.endsWith(`.${domain}`))) {
    throw new Error('Publication requires a public SITE_URL hostname, not a local, IP-literal, or placeholder origin.');
  }
  return origin.origin;
}

module.exports = {publicationOrigin};

if (require.main === module) {
  console.log(`Publishing site configured for ${publicationOrigin()}`);
}
