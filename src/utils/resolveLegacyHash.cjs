const routes = require('../../migration/legacy-doc-routes.json');

function resolveLegacyHash(hash) {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  if (!params.has('s') && !params.has('ss')) return null;
  if (params.getAll('s').length !== 1 || params.getAll('ss').length > 1) return '/docs/';
  const section = params.get('s');
  const subsection = params.get('ss');
  const key = `#s=${encodeURIComponent(section)}${subsection ? `&ss=${encodeURIComponent(subsection)}` : ''}`;
  return Object.hasOwn(routes, key) ? routes[key] : '/docs/';
}

module.exports = {resolveLegacyHash};
