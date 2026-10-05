import React from 'react';

const FlowNode = ({ color, title, subtitle, model, filled, arrow }) => (
  <li className="flow-node" style={{
    background: filled ? color + '18' : color + '0A',
    borderColor: filled ? color + '40' : color + '22',
  }}>
    <div className="flow-node-title" style={{ color: color === '#D84725' ? 'inherit' : 'var(--diagram-indigo)' }}>{title}</div>
    <div className="flow-node-sub">{subtitle}</div>
    {model && <span className="flow-node-model">{model}</span>}
    {arrow && <FlowArrow />}
  </li>
);

const FlowArrow = () => (
  <svg aria-hidden="true" focusable="false" className="flow-h-arrow" width="28" height="14" viewBox="0 0 28 14" fill="none">
    <path d="M4 7H20M17 3.5l4 3.5-4 3.5" stroke="var(--text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.2" />
  </svg>
);

const DownArrow = () => (
  <svg aria-hidden="true" focusable="false" className="flow-v-arrow" width="24" height="20" viewBox="0 0 24 20" fill="none">
    <path d="M12 2V14M8 11l4 4 4-4" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
  </svg>
);

const AgentCard = ({ provider, task, color }) => (
  <li className="agent-card" style={{ borderColor: color + '22' }}>
    <span className="agent-card-provider" style={{ color: `var(--diagram-${provider === 'OpenCode' ? 'violet' : provider === 'Codex' ? 'green' : 'amber'})`, background: color + '12' }}>{provider}</span>
    <span className="agent-card-task">{task}</span>
  </li>
);

const OrchestrationFlow = () => {

  return (
    <section id="orchestration" className="orchestration-flow">
      <div className="container">
        <span className="orch-badge">Orchestration</span>
        <h2 className="section-title">From prompt to verified delivery</h2>
        <p className="section-subtitle">
          Plan with a powerful reasoning model, then dispatch sub-agents across providers to implement, each scoped to its own files.
        </p>

        <ol className="orch-diagram" role="list" aria-label="From prompt to verified delivery">
          <li className="orch-intake">
            <ol className="orch-row-top" role="list" aria-label="Prepare the execution plan">
              <FlowNode color="#D84725" title="Prompt" subtitle="Describe the task" arrow />
              <FlowNode color="#D84725" title="Context Builder" subtitle="Curates relevant code" model="Discovery agent" filled arrow />
              <FlowNode color="#6366F1" title="Oracle" subtitle="Drafts execution plan" model="Deep reasoning" />
            </ol>

            <DownArrow />
          </li>
          <li className="orch-decompose">

            <div className="orch-bar">
              <svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 24 24" fill="none" className="orch-bar-icon">
                <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" stroke="#8B5CF6" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" stroke="#8B5CF6" strokeWidth="1.5" />
              </svg>
              <strong>Orchestrator decomposes plan into tasks</strong>
              <span>Each sub-agent gets scoped file boundaries</span>
            </div>

            <div className="orch-fork">
              <svg aria-hidden="true" focusable="false" className="orch-fork-svg" viewBox="0 0 600 28" fill="none" preserveAspectRatio="xMidYMid meet">
                <path d="M300 0V10H150V24" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
                <path d="M146 20l4 5 4-5" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
                <path d="M300 0V10H450V24" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
                <path d="M446 20l4 5 4-5" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
              </svg>
            </div>

          </li>
          <li className="orch-execute" aria-label="Execute both branches using the shared plan">
            <div className="orch-columns">
              <section className="orch-col sequential" aria-labelledby="orch-sequential">
                <h3 id="orch-sequential" className="orch-col-label" style={{ color: 'var(--diagram-orange)' }}>Sequential</h3>

                <div className="orch-col-card">
                  <span className="orch-col-model" style={{ color: 'var(--diagram-indigo)', background: '#6366F112' }}>Deep reasoning model</span>
                  <ol className="orch-col-tasks" role="list">
                    <li className="orch-task"><span aria-hidden="true" className="orch-task-num">1.</span> Implement auth service</li>
                    <li className="orch-task"><span aria-hidden="true" className="orch-task-num">2.</span> Add API validation</li>
                    <li className="orch-task"><span aria-hidden="true" className="orch-task-num">3.</span> Wire up middleware</li>
                  </ol>
                </div>
                <div className="orch-steer">
                  <svg aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M17 1l4 4-4 4" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 11V9a4 4 0 014-4h14" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7 23l-4-4 4-4" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 13v2a4 4 0 01-4 4H3" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Orchestrator <strong>steers</strong> between tasks</span>
                </div>
              </section>

              <div className="orch-plan-col">
                <svg aria-hidden="true" focusable="false" className="plan-arrow-left" width="16" height="20" viewBox="0 0 16 20" fill="none">
                  <path d="M16 10H4" stroke="var(--text)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.25" strokeLinecap="round" />
                  <path d="M7 6L3 10l4 4" stroke="var(--text)" strokeWidth="1.5" opacity="0.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="orch-plan-badge">
                  <svg aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="var(--text)" strokeWidth="1.5" strokeLinejoin="round" opacity="0.4" />
                    <path d="M14 2v6h6" stroke="var(--text)" strokeWidth="1.5" strokeLinejoin="round" opacity="0.4" />
                  </svg>
                  <strong>Plan.md</strong>
                  <span>shared source of truth</span>
                </div>
                <svg aria-hidden="true" focusable="false" className="plan-arrow-right" width="16" height="20" viewBox="0 0 16 20" fill="none">
                  <path d="M0 10H12" stroke="var(--text)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.25" strokeLinecap="round" />
                  <path d="M9 6l4 4-4 4" stroke="var(--text)" strokeWidth="1.5" opacity="0.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <section className="orch-col parallel" aria-labelledby="orch-parallel">
                <h3 id="orch-parallel" className="orch-col-label" style={{ color: 'var(--diagram-indigo)' }}>Parallel</h3>
                <ul className="orch-col-agents" role="list">
                  <AgentCard provider="OpenCode" task="Explore codebase" color="#8B5CF6" />
                  <AgentCard provider="Codex" task="Backend logic" color="#10B981" />
                  <AgentCard provider="Gemini" task="Update configs" color="#F59E0B" />
                </ul>
                <div className="orch-steer">
                  <svg aria-hidden="true" focusable="false" width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#8B5CF6" strokeWidth="1.5" />
                    <path d="M12 7v5l3 3" stroke="#8B5CF6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span><strong>Multi-wait</strong>: unblocks when first completes</span>
                </div>
              </section>
            </div>

            <div className="orch-merge">
              <svg aria-hidden="true" focusable="false" className="orch-merge-svg" viewBox="0 0 600 24" fill="none" preserveAspectRatio="xMidYMid meet">
                <path d="M150 0V10H300V20" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
                <path d="M450 0V10H300V20" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
                <path d="M296 16l4 5 4-5" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
              </svg>
            </div>

          </li>
          <li className="orch-verify">
            <svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 12l2 2 4-4" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="9" stroke="#8B5CF6" strokeWidth="1.5" />
            </svg>
            <strong>Orchestrator verifies adherence to plan</strong>
            <span>then continues until complete</span>
          </li>
        </ol>
      </div>
    </section>
  );
};

export default OrchestrationFlow;
