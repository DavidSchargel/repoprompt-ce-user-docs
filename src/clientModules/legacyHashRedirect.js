import siteConfig from '@generated/docusaurus.config';
import {resolveLegacyHash} from '../utils/resolveLegacyHash.cjs';

function redirectLegacyHash() {
  if (typeof window === 'undefined') return;
  const pathname = '/' + window.location.pathname.slice(siteConfig.baseUrl.length);
  const legacyLanding = ['/', '/docs', '/docs/', '/documentation', '/documentation/'].includes(pathname);
  const destination = resolveLegacyHash(window.location.hash, {legacyLanding});
  if (destination) window.location.replace(siteConfig.baseUrl + destination.slice(1) + window.location.search);
}

if (typeof window !== 'undefined') window.addEventListener('hashchange', redirectLegacyHash);

export function onRouteDidUpdate() {
  redirectLegacyHash();
}
