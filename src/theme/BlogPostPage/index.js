import React, {useMemo} from 'react';
import OriginalBlogPostPage from '@theme-original/BlogPostPage';

export default function BlogPostPage({content: Content, ...props}) {
  const contentWithIntro = useMemo(() => {
    function BlogPostContent(contentProps) {
      return <Content {...contentProps} />;
    }

    return Object.assign(BlogPostContent, Content, {
      toc: [
        {
          value: 'Intro',
          id: 'blog-post-intro',
          level: Content.frontMatter.toc_min_heading_level ?? 2,
        },
        ...Content.toc,
      ],
    });
  }, [Content]);

  return <OriginalBlogPostPage {...props} content={contentWithIntro} />;
}
