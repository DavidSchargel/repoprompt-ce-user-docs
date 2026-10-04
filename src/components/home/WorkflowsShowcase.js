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
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" className="pipeline-svg">
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
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none" className="pipeline-svg">
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
      <rect x={sx + sw - 50} y={sy - 12} width={56} height={20} rx="5" fill="#F28C38" />
      <text x={sx + sw - 22} y={sy + 1} textAnchor="middle" fontSize="10" fontWeight="700"
        fill="white" fontFamily="'SF Mono', monospace">9 / 54</text>
    </svg>
  );
};

const HandoffCard = () => (
  <div className="handoff-card">
    <div className="handoff-header">Curated Context</div>
    {[
      {name: 'auth.ts', lines: 'L5-89'},
      {name: 'api.ts', lines: 'L22-58'},
      {name: 'useAuth.ts', lines: 'L1-41'},
      {name: 'Header.tsx', lines: 'L12-67'},
      {name: 'Sidebar.tsx', lines: 'L1-34'},
    ].map((f) => (
      <div key={f.name} className="handoff-row">
        <span className="handoff-dot" />
        <span className="handoff-file">{f.name}</span>
        <span className="handoff-lines">{f.lines}</span>
      </div>
    ))}
  </div>
);

const Arrow = ({ color }) => (
  <div className="diagram-arrow">
    <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
      <path d="M4 10H32M26 4l6 6-6 6" stroke={color} strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
    </svg>
  </div>
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
          <div className="diagram-stages">
            <div className="diagram-stage">
              <div className="diagram-stage-visual" style={{ borderColor: '#D8472520', background: '#D8472508' }}>
                <ExploreDots />
              </div>
              <span className="diagram-stage-num" style={{ color: '#D84725' }}>01</span>
              <div className="diagram-stage-label" style={{ color: '#D84725' }}>Explore</div>
              <div className="diagram-stage-sub">Agent navigates codebase</div>
            </div>
            <Arrow color="#F28C38" />
            <div className="diagram-stage">
              <div className="diagram-stage-visual" style={{ borderColor: '#F28C3820', background: '#F28C3808' }}>
                <CurateDots />
              </div>
              <span className="diagram-stage-num" style={{ color: '#F28C38' }}>02</span>
              <div className="diagram-stage-label" style={{ color: '#F28C38' }}>Curate</div>
              <div className="diagram-stage-sub">Select within token budget</div>
            </div>
            <Arrow color="#6366F1" />
            <div className="diagram-stage">
              <div className="diagram-stage-visual handoff-visual" style={{ borderColor: '#6366F120', background: '#6366F108' }}>
                <HandoffCard />
              </div>
              <span className="diagram-stage-num" style={{ color: '#6366F1' }}>03</span>
              <div className="diagram-stage-label" style={{ color: '#6366F1' }}>Handoff</div>
              <div className="diagram-stage-sub">Structured prompt for analysis</div>
            </div>
          </div>
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
