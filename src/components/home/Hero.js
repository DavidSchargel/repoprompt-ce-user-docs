import useBaseUrl from '@docusaurus/useBaseUrl';
import Link from '@docusaurus/Link';
import React from "react";
import {
  FiArrowDown,
  FiCheck,
  FiDownload,
  FiGithub,
} from "react-icons/fi";
import { FaApple } from "react-icons/fa";

function DownloadOptions() {
  return (
    <section
      id="download"
      className="download-section"
      aria-labelledby="download-heading"
    >
      <div className="download-container">
        <div className="download-header">
          <p className="download-eyebrow">Download RepoPrompt</p>
          <h2 id="download-heading">Choose the edition that fits your workflow</h2>
          <p className="download-intro">
            RepoPrompt is now open source. Community Edition is the active home
            for new development, while Classic remains available for the original
            manual prompt-building workflow.
          </p>
        </div>

        <div className="edition-grid">
          <div className="edition-card edition-card-community">
            <div className="edition-card-topline">
              <span className="edition-status edition-status-active">
                Active development
              </span>
              <span className="edition-meta">Free / Open source</span>
            </div>

            <div className="edition-title-row">
              <span className="edition-icon edition-icon-community" aria-hidden="true">
                <FiGithub />
              </span>
              <div>
                <p className="edition-label">Recommended</p>
                <h3>Community Edition</h3>
              </div>
            </div>

            <p className="edition-description">
              Built for modern coding agents. Curate dense, reviewable context,
              connect MCP clients, and coordinate agent work from a native macOS app.
            </p>

            <ul className="edition-features">
              <li>
                <FiCheck aria-hidden="true" />
                <span>Context Builder, CodeMaps, and reviewable handoffs</span>
              </li>
              <li>
                <FiCheck aria-hidden="true" />
                <span>MCP and CLI agent integrations</span>
              </li>
              <li>
                <FiCheck aria-hidden="true" />
                <span>Community-driven development on GitHub</span>
              </li>
            </ul>

            <div className="edition-actions">
              <a
                href="https://github.com/repoprompt/repoprompt-ce/releases/latest"
                className="edition-button edition-button-primary"
                rel="noopener noreferrer"
              >
                <FaApple aria-hidden="true" />
                Download Community Edition’s latest release
              </a>
              <a
                href="https://github.com/repoprompt/repoprompt-ce"
                className="edition-text-link"
                rel="noopener noreferrer"
              >
                <FiGithub aria-hidden="true" />
                View Community Edition source
              </a>
              <Link className="edition-text-link" to="/docs/">Community Edition docs →</Link>
            </div>
          </div>

          <div className="edition-card edition-card-classic">
            <div className="edition-card-topline">
              <span className="edition-status edition-status-legacy">Legacy</span>
              <span className="edition-meta">No longer supported</span>
            </div>

            <div className="edition-title-row">
              <span className="edition-icon edition-icon-classic" aria-hidden="true">
                <FiDownload />
              </span>
              <div>
                <p className="edition-label">Original workflow</p>
                <h3>Classic</h3>
              </div>
            </div>

            <p className="edition-description">
              The original RepoPrompt experience for selecting files, assembling
              prompts, and copying them into your AI tool. Keep it for established
              manual workflows as RepoPrompt Classic is archived. The “Classic 2.1.0” docs on this site may also
              cover earlier releases.
            </p>

            <ul className="edition-features">
              <li>
                <FiCheck aria-hidden="true" />
                <span>Manual IDE mode and copy-paste workflow</span>
              </li>
              <li>
                <FiCheck aria-hidden="true" />
                <span>Archived source available for reference</span>
              </li>
              <li>
                <FiCheck aria-hidden="true" />
                <span>No future updates or support</span>
              </li>
            </ul>

            <div className="edition-actions">
              <a
                href="https://d2ruaev2blr0t3.cloudfront.net/RepoPrompt.dmg"
                className="edition-button edition-button-classic"
                rel="noopener noreferrer"
              >
                <FiDownload aria-hidden="true" />
                Download Classic
              </a>
              <a
                href="https://github.com/repoprompt/repoprompt-classic"
                className="edition-text-link"
                rel="noopener noreferrer"
              >
                <FiGithub aria-hidden="true" />
                View Classic archived source
              </a>
              <Link className="edition-text-link" to="/docs/classic-2.1.0/">Classic documentation →</Link>
            </div>
          </div>
        </div>

        <div className="download-community">
          <p>
            <strong>Built in the open.</strong> Report issues, contribute
            improvements, and help shape what RepoPrompt becomes next.
          </p>
          <a
            href="https://discord.gg/NtbFDAJPGM"
            rel="noopener noreferrer"
          >
            Join the Discord community
          </a>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  return (
    <>
      <section id="hero" className="hero">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-logo-container">
              <img
                src={useBaseUrl("/images/home/RepoPromptLogo_NoBG.png")}
                alt=""
                className="hero-logo"
                fetchPriority="high"
              />
              <div className="logo-glow"></div>
            </div>

            <h1 className="hero-headline">RepoPrompt</h1>

            <div className="hero-copy">
              <p className="hero-tagline">
                Curate the right context, run deep analysis, and orchestrate coding
                agents from one native macOS app.
              </p>
            </div>

            <div className="hero-actions">
              <a
                href="#download"
                className="hero-download-button"
              >
                <FaApple aria-hidden="true" />
                Download
                <FiArrowDown aria-hidden="true" />
              </a>
              <a
                href="https://discord.gg/NtbFDAJPGM"
                className="hero-discord-button"
                rel="noopener noreferrer"
              >
                <img
                  src={useBaseUrl("/images/home/icon_clyde_blurple_RGB.svg")}
                  alt=""
                  aria-hidden="true"
                />
                Join Discord
              </a>
            </div>
            <Link className="hero-docs-link" to="/docs/">Read the documentation →</Link>
          </div>
        </div>
      </section>
      <DownloadOptions />
    </>
  );
}

export default Hero;
