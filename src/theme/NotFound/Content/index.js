import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

// DocRoot also renders this component for unmatched /docs/ routes.
export default function NotFoundContent({className}) {
  return (
    <main className={['container margin-vert--xl', className].filter(Boolean).join(' ')}>
      <div className="row">
        <div className="col col--8 col--offset-2">
          <Heading as="h1" className="hero__title">Page Not Found</Heading>
          <p>
            We couldn’t find that page. You’re welcome to explore the{' '}
            <Link to="/">homepage</Link>, browse the{' '}
            <Link to="/docs/">current documentation</Link>, or catch up on the{' '}
            <Link to="/blog/">blog</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
