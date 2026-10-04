import Link from '@docusaurus/Link';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const BlogSection = () => {
    const featuredPost = {
        title: "Repo Prompt Community Edition",
        excerpt: "Repo Prompt Community Edition is now live on GitHub. It's your turn to remix and improve it for everyone.",
        date: "June 13, 2026",
        link: "/blog/repo-prompt-community-edition"
    };

    const previousPost = {
        title: "Repo Prompt’s Next Chapter",
        excerpt: "A look back at Repo Prompt's evolution, why curated context still matters for coding agents, and what comes next as the app moves toward Community Edition.",
        date: "May 27, 2026",
        link: "/blog/repo-prompt-next-chapter"
    };

    const posts = [
        featuredPost,
        previousPost,
        {
            title: "Context Over Convenience",
            excerpt: "Coding agents are convenient but wasteful with context. Planning with the full picture beats navigating in the fog.",
            date: "Nov 04, 2025",
            link: "/blog/context-over-convenience"
        }
    ];

    return (
        <section id="blog" className="blog-section">
            <div className="container">
                <div className="blog-header">
                    <h2 className="section-title">Latest from the Blog</h2>
                    <Link to="/blog/" className="view-all-link">
                        View All Posts <FaArrowRight />
                    </Link>
                </div>

                <div className="blog-grid">
                    {posts.map((post) => (
                        <Link key={post.link} to={post.link + "/"} className="blog-card">
                            <div className="blog-card-content">
                                <div className="blog-date">{post.date}</div>
                                <h3 className="blog-title">{post.title}</h3>
                                <p className="blog-excerpt">{post.excerpt}</p>
                                <span className="read-more">Read Article →</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
