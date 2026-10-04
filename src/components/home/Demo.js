import React from 'react';

export default function Demo() {
  return (
    <section id="demo" className="demo">
      <div className="demo-content">
        <h2 className="demo-title">Stop prompting models directly — orchestrate with Repo Prompt</h2>
        <div className="player-wrapper">
          <iframe
            src="https://www.youtube-nocookie.com/embed/5YNOxxdSHVk"
            title="Repo Prompt workflow demonstration"
            loading="lazy"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
        <p className="demo-caption">This is from an older Repo Prompt but the basics are still the same.</p>
      </div>
    </section>
  );
}
