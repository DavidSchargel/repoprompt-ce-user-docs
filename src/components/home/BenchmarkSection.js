import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';
import { FaChartBar, FaArrowRight } from 'react-icons/fa';

const BenchmarkSection = () => {

    return (
        <section id="benchmark" className="benchmark-section">
            <div className="container">
                <div className="benchmark-content">
                    <div className="benchmark-text">
                        <div className="benchmark-badge">
                            <FaChartBar className="badge-icon" />
                            <span>Repo Bench</span>
                        </div>
                        <h2 className="section-title">Measure AI Coding Performance</h2>
                        <p className="section-subtitle">
                            Don't guess which model is best for your codebase. Repo Bench provides data-driven rankings measuring large context reasoning, file editing precision, and instruction adherence.
                        </p>
                        <div className="benchmark-stats">
                            <div className="stat-box">
                                <span className="stat-value">100s</span>
                                <span className="stat-label">Models Tested</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-value">Community</span>
                                <span className="stat-label">Driven Results</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-value">Realtime</span>
                                <span className="stat-label">Updates</span>
                            </div>
                        </div>
                        <a href="https://repoprompt.com/bench" className="benchmark-cta">
                            View Leaderboards <FaArrowRight className="cta-icon" />
                        </a>
                    </div>
                    <div className="benchmark-visual">
                        <div className="visual-card">
                            <picture>
                                <source srcSet={useBaseUrl("/images/home/rp_bench.webp")} type="image/webp" />
                                <img
                                    src={useBaseUrl("/images/home/rp_bench.jpg")}
                                    alt="Repo Bench Leaderboard"
                                    className="benchmark-image"
                                    loading="lazy"
                                />
                            </picture>
                            <div className="visual-glow"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BenchmarkSection;
