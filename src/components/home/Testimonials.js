import React, {Suspense, useState} from 'react';
import {Tweet} from 'react-tweet';

const tweetIds = ['1995881411459645571', '1995585157601132829', '1989474879205511226', '1980295015260983319', '1979213245681668153', '1938684064304677031', '1940933589861855514', '1938721178333651184', '1937328701961568311', '1936592573906493637'];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [selectionStatus, setSelectionStatus] = useState('');
  const selectedUrl = `https://x.com/i/status/${tweetIds[index]}`;
  const selectedLabel = `testimonial ${index + 1} of ${tweetIds.length}`;
  const loadingFallback = <p>Loading {selectedLabel}. <a href={selectedUrl}>View it on X</a>.</p>;
  const notFoundFallback = <p>The embedded {selectedLabel} is unavailable. <a href={selectedUrl}>View it on X</a>.</p>;

  function selectTestimonial(nextIndex) {
    if (nextIndex === index) return;
    setIndex(nextIndex);
    setSelectionStatus(`Testimonial ${nextIndex + 1} of ${tweetIds.length} selected`);
  }

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">What are people saying</h2>
          <p className="testimonials-subtitle">See what developers are saying about RepoPrompt on X (Twitter)</p>
        </div>
        <div className="carousel-dots" role="group" aria-label="Choose a testimonial">
          {tweetIds.map((id, i) => (
            <button
              key={id}
              type="button"
              className={`dot ${index === i ? 'active' : ''}`}
              aria-label={`Show testimonial ${i + 1} of ${tweetIds.length}`}
              aria-pressed={index === i}
              aria-controls="home-testimonial-content"
              onClick={() => selectTestimonial(i)}
            />
          ))}
        </div>
        <div className="testimonial-selection-status" role="status" aria-live="polite" aria-atomic="true">
          {selectionStatus}
        </div>
        <div className="home-tweet" id="home-testimonial-content">
          <Suspense fallback={loadingFallback}>
            <Tweet key={tweetIds[index]} id={tweetIds[index]} fallback={notFoundFallback} components={{TweetNotFound: () => notFoundFallback}} />
          </Suspense>
        </div>
        <p className="testimonial-source">
          <a href={selectedUrl}>View {selectedLabel} on X</a>
        </p>
      </div>
    </section>
  );
}
