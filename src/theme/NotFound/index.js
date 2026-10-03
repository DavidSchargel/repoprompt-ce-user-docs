import React from 'react';
import Head from '@docusaurus/Head';
import OriginalNotFound from '@theme-original/NotFound';

export default function NotFound(props) {
  return (
    <>
      <OriginalNotFound {...props} />
      <Head><meta name="robots" content="noindex,follow" /></Head>
    </>
  );
}
