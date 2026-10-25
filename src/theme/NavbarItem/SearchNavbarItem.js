import React from 'react';
import {useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import OriginalSearchNavbarItem from '@theme-original/NavbarItem/SearchNavbarItem';

export default function SearchNavbarItem(props) {
  const {pathname} = useLocation();
  const docsPath = useBaseUrl('/docs').replace(/\/$/, '');

  if (pathname !== docsPath && !pathname.startsWith(`${docsPath}/`)) {
    return null;
  }

  return <OriginalSearchNavbarItem {...props} />;
}
