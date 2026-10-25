import React from 'react';
import OriginalDefaultNavbarItem from '@theme-original/NavbarItem/DefaultNavbarItem';
import GitHubNavbarItem from './GitHubNavbarItem';

export default function DefaultNavbarItem(props) {
  if (props.className?.split(/\s+/).includes('header-github-link')) {
    return <GitHubNavbarItem {...props} />;
  }

  return <OriginalDefaultNavbarItem {...props} />;
}
