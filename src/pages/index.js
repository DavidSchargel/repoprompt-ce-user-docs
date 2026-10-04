import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Hero from '../components/home/Hero';
import OrchestrationFlow from '../components/home/OrchestrationFlow';
import AgentSection from '../components/home/AgentSection';
import WorkflowsShowcase from '../components/home/WorkflowsShowcase';
import Demo from '../components/home/Demo';
import MCPIntegration from '../components/home/MCPIntegration';
import Testimonials from '../components/home/Testimonials';
import CopyrightYear from '../components/home/CopyrightYear';
import '../components/home/home.css';
import '../components/home/adaptations.css';

export default function Home() {
  return (
    <Layout title="RepoPrompt — context for coding agents" description="Curate the right context, run deep analysis, and orchestrate coding agents with RepoPrompt Community Edition, a free, open-source native macOS app.">
      <div className="repo-home">
        <main>
          <Hero />
          <OrchestrationFlow />
          <AgentSection />
          <WorkflowsShowcase />
          <Demo />
          <MCPIntegration />
          <Testimonials />
        </main>
        <footer className="home-footer">
          <p>© <CopyrightYear /> RepoPrompt</p>
          <nav aria-label="Footer"><Link to="/privacy/">Privacy policy</Link><Link to="/terms/">Terms and conditions</Link></nav>
        </footer>
      </div>
    </Layout>
  );
}
