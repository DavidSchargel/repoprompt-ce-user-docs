import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';

const MCPIntegration = () => {
  const assetBase = useBaseUrl("/images/home/");

  const integrations = [
    {
      name: "Claude Code",
      description: "Context Builder & orchestration",
      features: [],
      logo: "claudecodelogo.png",
      bgColor: "rgba(139, 69, 19, 0.1)"
    },
    {
      name: "Cursor",
      description: "Enhanced editing",
      features: [],
      logo: "cursor.jpeg",
      bgColor: "rgba(59, 130, 246, 0.1)"
    },
    {
      name: "OpenCode",
      description: "Multi-provider agents",
      features: [],
      logo: "opencode-logo-light.svg",
      bgColor: "rgba(139, 92, 246, 0.1)"
    },
    {
      name: "Gemini CLI",
      description: "Google AI integration",
      features: [],
      icon: {
        svg: true,
        color: "#F59E0B",
        bgColor: "rgba(245, 158, 11, 0.1)",
        path: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      },
      bgColor: "rgba(245, 158, 11, 0.1)"
    },

  ];

  return (
    <section className="mcp-integration">
      <div className="container">
        <div className="mcp-header">
          <span className="mcp-badge">MCP READY</span>
          <h2 className="section-title">Works With Every Agent</h2>
          <p className="section-subtitle">
            15+ token-efficient MCP tools, automated context curation, and multi-agent orchestration. Accessible from any MCP-compatible client.
          </p>
        </div>

        <div className="integration-flow">
          <div className="flow-diagram">
            <div className="repo-prompt-hub">
              <img src={useBaseUrl("/images/home/RepoPromptLogo_NoBG.png")} alt="RepoPrompt" className="hub-logo" />
              <span className="hub-label">RepoPrompt</span>
              <span className="hub-status">MCP Server</span>
              <div className="hub-features">
                <span>• 15+ tools available</span>
                <span>• Standard protocol</span>
                <span>• Future compatible</span>
              </div>
            </div>

            <svg className="connections-svg" viewBox="0 0 1100 400" preserveAspectRatio="xMidYMid meet">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7"
                  refX="9" refY="3.5" orient="auto">
                  <polygon className="connection-arrow" points="0 0, 10 3.5, 0 7" />
                </marker>
                <marker id="arrowhead-reverse" markerWidth="10" markerHeight="7"
                  refX="1" refY="3.5" orient="auto">
                  <polygon className="connection-arrow" points="10 0, 0 3.5, 10 7" />
                </marker>
              </defs>

              <path className="connection-path" style={{ '--delay': '0.3s' }}
                d="M 280 200 Q 380 150 480 100"
                markerEnd="url(#arrowhead)"
                markerStart="url(#arrowhead-reverse)" />

              <path className="connection-path" style={{ '--delay': '0.5s' }}
                d="M 280 200 Q 550 150 820 100"
                markerEnd="url(#arrowhead)"
                markerStart="url(#arrowhead-reverse)" />

              <path className="connection-path" style={{ '--delay': '0.7s' }}
                d="M 280 200 Q 380 250 480 300"
                markerEnd="url(#arrowhead)"
                markerStart="url(#arrowhead-reverse)" />

              <path className="connection-path" style={{ '--delay': '0.9s' }}
                d="M 280 200 Q 550 250 820 300"
                markerEnd="url(#arrowhead)"
                markerStart="url(#arrowhead-reverse)" />
            </svg>

              <div className="integration-grid">
                {integrations.map((integration, index) => (
                  <div key={index} className="integration-card" style={{ '--index': index }}>
                    <div className="card-header">
                      <div className="integration-logo">
                        {integration.logo ? (
                          <img
                            src={assetBase + integration.logo}
                            alt={integration.name}
                            className="logo-image"
                            style={{ '--bg-color': integration.bgColor }}
                            loading="lazy"
                          />
                        ) : integration.icon?.svg ? (
                          <div className="logo-icon" style={{ background: integration.icon.bgColor }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke={integration.icon.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                              <path d={integration.icon.path} />
                            </svg>
                          </div>
                        ) : (
                          <div className="logo-placeholder">{integration.name[0]}</div>
                        )}
                      </div>
                      <h4>{integration.name}</h4>
                      <p>{integration.description}</p>
                    </div>
                    {integration.features.length > 0 && (
                      <ul className="integration-features">
                        {integration.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
          </div>

                      <div className="mcp-features">
              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="7" strokeWidth="2" />
                    <path d="M20 20l-3-3" strokeWidth="2" strokeLinecap="round" />
                    <path d="M11 8v3l2 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>Automated Context Curation</h3>
                <p>Context Builder explores your codebase, selects the most relevant files within a token budget, and hands curated context to powerful analysis models.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" strokeWidth="2" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="3" strokeWidth="2" />
                  </svg>
                </div>
                <h3>Multi-Agent Orchestration</h3>
                <p>Launch parallel or sequential agent sessions, steer them mid-flight, and let an orchestrator verify the work.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>Codemaps &amp; Token Efficiency</h3>
                <p>Function signatures via tree-sitter let agents see 10x more files. Slices, codemaps, and full content: the right detail level for every file.</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>Oracle Collaboration</h3>
                <p>Your agent consults powerful reasoning models mid-session. Context Builder finds the answer using your full repo, no manual file selection needed.</p>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default MCPIntegration;
