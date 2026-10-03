import React from 'react';
import OriginalImg from '@theme-original/MDXComponents/Img';

export default function MarkdownImage({src, ...props}) {
  const image = src?.default ?? src;
  if (image?.src?.images?.length) {
    return (
      <OriginalImg
        {...props}
        src={image.src.src}
        srcSet={image.src.images.map(({path, width}) => `${path} ${width}w`).join(', ')}
        sizes="(max-width: 996px) 100vw, 800px"
        width={image.src.width}
        height={image.src.height}
        loading="lazy"
        decoding="async"
      />
    );
  }
  return <OriginalImg {...props} src={image} />;
}
