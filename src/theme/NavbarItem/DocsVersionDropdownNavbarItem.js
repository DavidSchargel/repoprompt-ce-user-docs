import React from 'react';
import {useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import OriginalDropdown from '@theme-original/NavbarItem/DocsVersionDropdownNavbarItem';

export default function DocsVersionDropdownNavbarItem(props) {
  const {pathname} = useLocation();
  const homePath = useBaseUrl('/').replace(/\/$/, '');
  const blogPath = useBaseUrl('/blog');
  const path = pathname.replace(/\/$/, '');

  if (path === homePath || path === blogPath || path.startsWith(`${blogPath}/`)) {
    return null;
  }

  return <OriginalDropdown {...props} />;
}
