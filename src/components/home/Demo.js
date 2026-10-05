import React from 'react';

export default function Demo() {
  return (
    <section id="demo" className="demo">
      <div className="demo-content">
        <h2 className="demo-title">Stop prompting models directly — orchestrate with RepoPrompt</h2>
        <div className="player-wrapper">
          <iframe
            src="https://www.youtube-nocookie.com/embed/5YNOxxdSHVk"
            title="RepoPrompt workflow demonstration"
            loading="lazy"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
        <p className="demo-caption">This is from an older RepoPrompt but the basics are still the same. If the embedded player is unavailable, <a href="https://www.youtube.com/watch?v=5YNOxxdSHVk">watch the workflow demonstration on YouTube</a>.
        </p>
      </div>
    </section>
  );
}
