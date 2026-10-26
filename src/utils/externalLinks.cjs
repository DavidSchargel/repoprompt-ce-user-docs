const notice = '(opens in a new tab)';
const decorated = new WeakMap();

function isExternalLink(href, baseUrl, siteUrl) {
  if (!href || !/^(?:https?:)?\/\//i.test(href)) return false;
  try {
    const destination = new URL(href, baseUrl);
    return ['http:', 'https:'].includes(destination.protocol)
      && destination.origin !== new URL(baseUrl).origin
      && destination.origin !== new URL(siteUrl).origin;
  } catch {
    return false;
  }
}

function decorateExternalLinks(root, {baseUrl, siteUrl}) {
  const links = [...root.querySelectorAll('a[href]')];
  if (root.matches?.('a[href]')) links.unshift(root);
  for (const link of links) {
    if (!isExternalLink(link.getAttribute('href'), baseUrl, siteUrl)) {
      const previous = decorated.get(link);
      if (previous) {
        for (const name of ['target', 'rel', 'aria-label']) {
          if (link.getAttribute(name) === previous.applied[name]) {
            if (previous.original[name] === null) link.removeAttribute(name);
            else link.setAttribute(name, previous.original[name]);
          }
        }
        for (const node of previous.added) node.remove();
        decorated.delete(link);
      }
      continue;
    }
    if (!decorated.has(link)) {
      decorated.set(link, {
        original: Object.fromEntries(['target', 'rel', 'aria-label'].map(name => [name, link.getAttribute(name)])),
        applied: {},
        added: [],
      });
    }
    const state = decorated.get(link);
    if (link.getAttribute('target') !== '_blank') link.setAttribute('target', '_blank');
    const rel = new Set((link.getAttribute('rel') || '').split(/\s+/).filter(Boolean));
    rel.delete('opener');
    rel.add('noopener');
    rel.add('noreferrer');
    const value = [...rel].join(' ');
    if (link.getAttribute('rel') !== value) link.setAttribute('rel', value);

    if (!link.querySelector('.new-tab-indicator')) {
      const indicator = link.ownerDocument.createElement('span');
      indicator.className = 'new-tab-indicator';
      indicator.setAttribute('aria-hidden', 'true');
      indicator.textContent = '↗';
      link.append(indicator);
      state.added.push(indicator);
    }

    const label = link.getAttribute('aria-label');
    if (label) {
      if (!/opens in (?:a )?new (?:tab|window)/i.test(label)) {
        link.setAttribute('aria-label', `${label} ${notice}`);
      }
    } else if (!link.querySelector('[data-external-link-notice]')) {
      const announcement = link.ownerDocument.createElement('span');
      announcement.setAttribute('data-external-link-notice', '');
      announcement.textContent = ` ${notice}`;
      link.append(announcement);
      state.added.push(announcement);
    }
    state.applied = Object.fromEntries(['target', 'rel', 'aria-label'].map(name => [name, link.getAttribute(name)]));
  }
}

module.exports = {isExternalLink, decorateExternalLinks};
