import Link from '@docusaurus/Link';
import React from 'react';

const ExploreDots = () => {
  const COLS = 9;
  const ROWS = 6;
  const W = 320;
  const H = 220;
  const SX = W / (COLS + 1);
  const SY = H / (ROWS + 1);
  const R = 5;
  const highlighted = new Set([
    '0-2','0-7','1-4','1-6','2-1','2-5','2-8','3-3','3-7','4-0','4-5','4-6','5-2','5-4',
  ]);
  return (
    <svg aria-hidden="true" focusable="false" width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" className="pipeline-svg">
      {Array.from({length: ROWS}).map((_, r) =>
        Array.from({length: COLS}).map((_, c) => {
          const active = highlighted.has(`${r}-${c}`);
          return (
            <circle key={`${r}-${c}`} cx={SX + c * SX} cy={SY + r * SY}
              r={active ? R + 1.5 : R}
              fill={active ? '#D84725' : 'rgba(var(--text-rgb),0.18)'}
              opacity={active ? 0.85 : 1} />
          );
        })
      )}
    </svg>
  );
};

const CurateDots = () => {
  const COLS = 9;
  const ROWS = 6;
  const W = 320;
  const H = 220;
  const SX = W / (COLS + 1);
  const SY = H / (ROWS + 1);
  const R = 5;
  const isActive = (r, c) => r >= 1 && r <= 3 && c >= 3 && c <= 5;
  const PAD = SX * 0.5;
  const sx = SX + 3 * SX - PAD;
  const sy = SY + 1 * SY - PAD;
  const sw = 2 * SX + 2 * PAD;
  const sh = 2 * SY + 2 * PAD;
  return (
    <svg aria-hidden="true" focusable="false" width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" className="pipeline-svg">
      <rect x={sx} y={sy} width={sw} height={sh} rx="8" fill="#F28C3810" stroke="#F28C38" strokeWidth="1.5" />
      {Array.from({length: ROWS}).map((_, r) =>
        Array.from({length: COLS}).map((_, c) => {
          const active = isActive(r, c);
          return (
            <circle key={`${r}-${c}`} cx={SX + c * SX} cy={SY + r * SY}
              r={active ? R + 1.5 : R}
              fill={active ? '#F28C38' : 'rgba(var(--text-rgb),0.18)'} />
          );
        })
      )}
      <rect x={sx + sw - 50} y={sy - 12} width={56} height={20} rx="5" fill="#934009" />
      <text x={sx + sw - 22} y={sy + 1} textAnchor="middle" fontSize="10" fontWeight="700"
        fill="white" fontFamily="'SF Mono', monospace">9 / 54</text>
    </svg>
  );
};

const HandoffCard = () => (
  <svg role="img" aria-labelledby="handoff-title handoff-description" width="320" height="220" viewBox="0 0 320 220" className="pipeline-svg handoff-svg">
    <title id="handoff-title">Curated Context</title>
    <desc id="handoff-description">Example handoff: auth.ts lines 5–89, api.ts lines 22–58, useAuth.ts lines 1–41, Header.tsx lines 12–67, and Sidebar.tsx lines 1–34.</desc>
    <rect x="20" y="2" width="280" height="170" rx="12" fill="var(--card-bg)" stroke="#6366F120" />
    <g aria-hidden="true" fill="var(--diagram-indigo)">
      <text x="160" y="24" textAnchor="middle" fontSize="11.2" fontWeight="700" letterSpacing="0.9" fontFamily="var(--font-heading)">CURATED CONTEXT</text>
      <path d="M20 37H300" stroke="#6366F120" />
      {[
        {name: 'auth.ts', lines: 'L5-89'},
        {name: 'api.ts', lines: 'L22-58'},
        {name: 'useAuth.ts', lines: 'L1-41'},
        {name: 'Header.tsx', lines: 'L12-67'},
        {name: 'Sidebar.tsx', lines: 'L1-34'},
      ].map((file, index) => (
        <g key={file.name} transform={`translate(0 ${55 + index * 27})`} fontFamily="'SF Mono', 'Monaco', monospace">
          <circle cx="40.5" cy="-4" r="2.5" fill="#6366F1" opacity="0.4" />
          <text x="140" textAnchor="middle" fontSize="12.8">{file.name}</text>
          <text x="282" textAnchor="end" fontSize="11.52">{file.lines}</text>
        </g>
      ))}
    </g>
  </svg>
);

const Arrow = ({ color }) => (
  <svg aria-hidden="true" focusable="false" className="diagram-arrow" width="40" height="20" viewBox="0 0 40 20" fill="none">
    <path d="M4 10H32M26 4l6 6-6 6" stroke={color} strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
  </svg>
);

const workflows = [
  {
    command: "/rp-orchestrate",
    title: "Orchestrate",
    description: "Plan, decompose into tasks, and dispatch sub-agents across providers to complete complex work autonomously",
    color: "#8B5CF6",
    colorRgb: "139, 92, 246",
  },
  {
    command: "/rp-review",
    title: "Code Reviews",
    description: "Publishes git diffs alongside codebase context for reviews that understand what changed",
    color: "#6366F1",
    colorRgb: "99, 102, 241",
  },
  {
    command: "/rp-refactor",
    title: "Refactor Code",
    description: "Two-pass: analyze for opportunities, then plan implementation preserving behavior",
    color: "#10B981",
    colorRgb: "16, 185, 129",
  },
  {
    command: "/rp-investigate",
    title: "Investigate Issues",
    description: "Systematic exploration with evidence gathering until root cause is found",
    color: "#F59E0B",
    colorRgb: "245, 158, 11",
  }
];

const WorkflowsShowcase = () => {

  return (
    <section id="workflows" className="workflows-showcase">
      <div className="container">
        <div className="workflows-badge">Workflows</div>
        <h2 className="section-title">Context Builder Workflows</h2>
        <p className="section-subtitle">
          Included slash commands you can run from any MCP client
        </p>

        <div className="workflow-diagram">
          <ol className="diagram-stages" role="list">
            <li className="diagram-stage">
              <div className="diagram-stage-visual" style={{ borderColor: '#D8472520', background: '#D8472508' }}>
                <ExploreDots />
              </div>
              <span className="diagram-stage-num" style={{ color: 'var(--diagram-rust)' }}>01</span>
              <div className="diagram-stage-label" style={{ color: 'var(--diagram-rust)' }}>Explore</div>
              <div className="diagram-stage-sub">Agent navigates codebase</div>
              <Arrow color="#F28C38" />
            </li>
            <li className="diagram-stage">
              <div className="diagram-stage-visual" style={{ borderColor: '#F28C3820', background: '#F28C3808' }}>
                <CurateDots />
              </div>
              <span className="diagram-stage-num" style={{ color: '#F28C38' }}>02</span>
              <div className="diagram-stage-label" style={{ color: '#F28C38' }}>Curate</div>
              <div className="diagram-stage-sub">Select within token budget</div>
              <Arrow color="#6366F1" />
            </li>
            <li className="diagram-stage">
              <div className="diagram-stage-visual handoff" style={{ borderColor: '#6366F120', background: '#6366F108' }}>
                <HandoffCard />
              </div>
              <span className="diagram-stage-num" style={{ color: 'var(--diagram-indigo)' }}>03</span>
              <div className="diagram-stage-label" style={{ color: 'var(--diagram-indigo)' }}>Handoff</div>
              <div className="diagram-stage-sub">Structured prompt for analysis</div>
            </li>
          </ol>
        </div>

        <div className="workflows-grid">
          {workflows.map((workflow, index) => (
            <div
              key={index}
              className="workflow-card"
              style={{ '--workflow-color': workflow.color, '--workflow-color-rgb': workflow.colorRgb }}
            >
              <code className="workflow-command">{workflow.command}</code>
              <h3 className="workflow-title">{workflow.title}</h3>
              <p className="workflow-description">{workflow.description}</p>
            </div>
          ))}
        </div>

        <div className="workflows-cta">
          <Link to="/docs/agent-mode/workflows/" className="workflows-docs-link">
            Explore the docs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WorkflowsShowcase;
