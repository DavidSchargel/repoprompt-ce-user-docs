import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';

const AgentSection = () => {

  return (
    <section id="agent" className="agent-section">
      <div className="container">
        <div className="agent-header">
          <span className="agent-badge">AGENT MODE</span>
          <h2 className="section-title">A Native Home for Your Coding Agents</h2>
          <p className="section-subtitle">
            Run CLI agents with full codebase context, token-efficient MCP tools, and built-in orchestration, all inside a beautiful Mac-native interface.
          </p>
        </div>

        <div className="agent-providers">
          <div className="agent-provider-card">
            <div className="provider-icon" style={{ background: 'rgba(16, 185, 129, 0.12)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                <polyline points="4 17 10 11 4 5"/>
                <line x1="12" y1="19" x2="20" y2="19"/>
              </svg>
            </div>
            <div className="provider-info">
              <h4>Codex CLI</h4>
              <span className="provider-badge native">App Server</span>
            </div>
          </div>
          <div className="agent-provider-card">
            <img src={useBaseUrl("/images/home/claudecodelogo.png")} alt="Claude Code" className="provider-logo" style={{ background: 'rgba(139, 69, 19, 0.1)' }} loading="lazy" />
            <div className="provider-info">
              <h4>Claude Code</h4>
              <span className="provider-badge mcp-indigo">Headless CLI</span>
            </div>
          </div>
          <div className="agent-provider-card">
            <div className="provider-icon" style={{ background: 'rgba(245, 158, 11, 0.12)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </div>
            <div className="provider-info">
              <h4>Gemini CLI</h4>
              <span className="provider-badge mcp-amber">Via ACP</span>
            </div>
          </div>
          <div className="agent-provider-card">
            <img src={useBaseUrl("/images/home/opencode-logo-light.svg")} alt="OpenCode" className="provider-logo" style={{ background: 'rgba(139, 92, 246, 0.1)' }} loading="lazy" />
            <div className="provider-info">
              <h4>OpenCode</h4>
              <span className="provider-badge mcp-violet">Via ACP</span>
            </div>
          </div>
        </div>

        <div className="agent-screenshot">
          <picture>
            <source srcSet={useBaseUrl("/images/home/agentMode.webp")} type="image/webp" />
            <img
              src={useBaseUrl("/images/home/agentMode.jpg")}
              alt="Repo Prompt Agent Mode showing a Claude Code session with file reading and workspace context"
              className="agent-screenshot-image"
              loading="lazy"
            />
          </picture>
        </div>

        <div className="orchestration-callout">
          <div className="orchestration-icon">
            <img src={useBaseUrl("/images/home/openclaw.svg")} alt="OpenClaw" style={{ width: 28, height: 28 }} />
          </div>
          <div className="orchestration-content">
            <h3>Launch from Your Personal Agent</h3>
            <p>
              <strong>OpenClaw</strong> and other personal agents can launch Repo Prompt's orchestrate workflow via CLI, planning, decomposing, and dispatching sub-agents to complete complex engineering work while you sleep.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentSection;
