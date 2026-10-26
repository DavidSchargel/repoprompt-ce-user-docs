import siteConfig from '@generated/docusaurus.config';
import {decorateExternalLinks} from '../utils/externalLinks.cjs';

let observer;

export function onRouteDidUpdate() {
  if (typeof document === 'undefined') return;
  const options = {baseUrl: window.location.href, siteUrl: siteConfig.url};
  decorateExternalLinks(document, options);

  if (!observer) {
    observer = new MutationObserver((records) => {
      for (const record of records) {
        if (record.type === 'attributes') {
          decorateExternalLinks(record.target, options);
        } else {
          // React can replace a link's children without replacing the link.
          const link = record.target.closest?.('a[href]');
          if (link) decorateExternalLinks(link, options);
          for (const node of record.addedNodes) {
            if (node.nodeType === 1) decorateExternalLinks(node, options);
          }
        }
      }
    });
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['href', 'target', 'rel', 'aria-label'],
    });
  }
}
