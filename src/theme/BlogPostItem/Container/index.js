import React from 'react';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';

export default function BlogPostItemContainer({children, className}) {
  const {isBlogPostPage} = useBlogPost();
  // The layered !important utility wins over unlayered spacing overrides.
  const articleClassName = isBlogPostPage ? className : [
    'blog-post-list-item',
    ...(className || '').split(/\s+/).filter(name => name && name !== 'margin-bottom--xl'),
  ].join(' ');

  return (
    <article
      id={isBlogPostPage ? 'blog-post-intro' : undefined}
      tabIndex={isBlogPostPage ? -1 : undefined}
      className={articleClassName}>
      {children}
    </article>
  );
}
