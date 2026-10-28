import React, {useEffect} from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useLocation} from '@docusaurus/router';
import Heading from '@theme/Heading';

// DocRoot also renders this component for unmatched /docs/ routes.
export default function NotFoundContent({className}) {
  const introduction = useBaseUrl('/docs/');
  const {pathname, search} = useLocation();
  useEffect(() => {
    window.location.replace(introduction + search);
  }, [introduction, pathname, search]);

  return (
    <main className={['container margin-vert--xl', className].filter(Boolean).join(' ')}>
      <div className="row">
        <div className="col col--8 col--offset-2">
          <Heading as="h1" className="hero__title">Page Not Found</Heading>
          <p>
            This link is no longer available. Continue to the{' '}
            <Link to={introduction}>Introduction to RepoPrompt</Link>.
          </p>
        </div>
      </div>
    </main>
  );
}
