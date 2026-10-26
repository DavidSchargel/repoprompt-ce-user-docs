import React from 'react';
import OriginalImg from '@theme-original/MDXComponents/Img';

export default function MarkdownImage({src, alt, ...props}) {
  const image = src?.default ?? src;
  if (image?.src?.images?.length) {
    const variants = image.src.images;
    const native = variants.reduce((largest, candidate) => candidate.width > largest.width ? candidate : largest);
    const original = props['data-zoom-src'];
    const candidates = variants.map(({path, width}) => `${original && width === native.width ? original : path} ${width}w`);
    return (
      <OriginalImg
        {...props}
        alt={alt}
        role={alt === '' ? 'presentation' : props.role}
        src={image.src.src}
        srcSet={candidates.join(', ')}
        sizes="(max-width: 996px) 100vw, 800px"
        width={native.width}
        height={native.height}
        style={{maxWidth: '100%', height: 'auto', ...props.style}}
        loading="lazy"
        decoding="async"
      />
    );
  }
  return <OriginalImg {...props} alt={alt} role={alt === '' ? 'presentation' : props.role} src={image} />;
}
