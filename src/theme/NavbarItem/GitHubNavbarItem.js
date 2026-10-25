import React from 'react';
import {FiGithub} from 'react-icons/fi';

export default function GitHubNavbarItem({mobile, href, label}) {
  const link = (
    <a
      href={href}
      className={mobile ? 'menu__link header-github-link--mobile' : 'navbar__item navbar__link header-github-link'}
      aria-label={mobile ? undefined : label}
    >
      <FiGithub aria-hidden="true" focusable="false" />
      {mobile && <span>{label}</span>}
    </a>
  );

  return mobile ? <li className="menu__list-item">{link}</li> : link;
}
