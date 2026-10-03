import React from 'react';
import Layout from '@theme/Layout';
import MDXContent from '@theme/MDXContent';
import HomeContent from './_home.mdx';
import styles from './index.module.css';

export default function Home() {
  return (
    <Layout title="Repo Prompt — context for coding agents" description="Curate the right context, run deep analysis, and orchestrate coding agents with Repo Prompt Community Edition, a free, open-source native macOS app.">
      <main className={`container margin-vert--xl ${styles.home}`}>
        <div className="markdown"><MDXContent><HomeContent /></MDXContent></div>
        <footer className={styles.footer}>
          <p>© {new Date().getFullYear()} Repo Prompt</p>
        </footer>
      </main>
    </Layout>
  );
}
