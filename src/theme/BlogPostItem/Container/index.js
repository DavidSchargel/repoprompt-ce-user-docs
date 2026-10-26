import React from 'react';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';

export default function BlogPostItemContainer({children, className}) {
  const {isBlogPostPage} = useBlogPost();

  return (
    <article
      id={isBlogPostPage ? 'blog-post-intro' : undefined}
      tabIndex={isBlogPostPage ? -1 : undefined}
      className={className}>
      {children}
    </article>
  );
}
