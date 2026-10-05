import React, {Suspense, useEffect, useRef, useState} from 'react';
import {Tweet} from 'react-tweet';

const tweetIds = ['1995881411459645571', '1995585157601132829', '1989474879205511226', '1980295015260983319', '1979213245681668153', '1938684064304677031', '1940933589861855514', '1938721178333651184', '1937328701961568311', '1936592573906493637'];

const TweetLoading = ({url, label}) => (
  <div className="tweet-skeleton">
    <div aria-hidden="true">
      <div className="tweet-skeleton-header">
        <div className="tweet-skeleton-avatar" />
        <div className="tweet-skeleton-info">
          <div className="tweet-skeleton-name" />
          <div className="tweet-skeleton-username" />
        </div>
      </div>
      <div className="tweet-skeleton-line" />
      <div className="tweet-skeleton-line" />
      <div className="tweet-skeleton-line short" />
    </div>
    <p className="tweet-loading-label">Loading {label}. <a href={url}>View it on X</a>.</p>
  </div>
);

class TweetErrorBoundary extends React.Component {
  state = {hasError: false};

  static getDerivedStateFromError() {
    return {hasError: true};
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [selectionStatus, setSelectionStatus] = useState('');
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPlaying(!motion.matches);
    const handleMotion = () => { if (motion.matches) setPlaying(false); };
    const handleVisibility = () => setPageVisible(!document.hidden);
    handleVisibility();
    motion.addEventListener('change', handleMotion);
    document.addEventListener('visibilitychange', handleVisibility);
    const observer = typeof IntersectionObserver === 'undefined' ? null : new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting), {threshold: 0.1},
    );
    if (observer) observer.observe(sectionRef.current);
    else setVisible(true);
    return () => {
      motion.removeEventListener('change', handleMotion);
      document.removeEventListener('visibilitychange', handleVisibility);
      observer?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!playing || hovered || !visible || !pageVisible) return undefined;
    const timer = setInterval(() => setIndex((current) => (current + 1) % tweetIds.length), 5000);
    return () => clearInterval(timer);
  }, [playing, hovered, visible, pageVisible, index]);

  function toggleRotation() {
    if (!playing) setSelectionStatus('');
    setPlaying(!playing);
  }

  function selectTestimonial(nextIndex) {
    setPlaying(false);
    if (nextIndex === index) return;
    setIndex(nextIndex);
    setSelectionStatus(`Testimonial ${nextIndex + 1} of ${tweetIds.length} selected`);
  }

  return (
    <section id="testimonials" className="testimonials-section" ref={sectionRef}
      aria-labelledby="testimonials-title" aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={(event) => {
        if (!event.target.closest('.testimonial-rotation')) setPlaying(false);
      }}>
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 id="testimonials-title" className="testimonials-title">What are people saying</h2>
          <p className="testimonials-subtitle">See what developers are saying about RepoPrompt on X.com/Twitter</p>
        </div>
        <div className="testimonial-controls">
          <button type="button" className="testimonial-rotation" onClick={toggleRotation}
            aria-label={playing ? 'Pause testimonial rotation' : 'Start testimonial rotation'}>
            <svg aria-hidden="true" focusable="false" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              {playing ? <path d="M2 1h3v10H2zM7 1h3v10H7z" /> : <path d="M3 1l8 5-8 5z" />}
            </svg>
          </button>
          <div className="carousel-dots" role="group" aria-label="Choose a testimonial">
            {tweetIds.map((id, i) => (
              <button key={id} type="button" className={`dot ${index === i ? 'active' : ''}`}
                aria-label={`Show testimonial ${i + 1} of ${tweetIds.length}`} aria-pressed={index === i}
                aria-controls="home-testimonial-content" onClick={() => selectTestimonial(i)} />
            ))}
          </div>
        </div>
        <div className="testimonial-selection-status" role="status" aria-live="polite" aria-atomic="true">
          {selectionStatus}
        </div>
        <div className="testimonials-carousel" id="home-testimonial-content">
          <div className="tweets-viewport">
            {tweetIds.map((id, i) => {
              const url = `https://x.com/i/status/${id}`;
              const label = `testimonial ${i + 1} of ${tweetIds.length}`;
              const loading = <TweetLoading url={url} label={label} />;
              const unavailable = <p className="tweet-error">This testimonial is unavailable. <a href={url}>View {label} on X</a>.</p>;
              return (
                <div key={id} className={`tweet-slide ${index === i ? 'active' : ''}`} hidden={index !== i}
                  role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${tweetIds.length}`}>
                  {index === i && (
                    <div className="tweet-wrapper">
                      <TweetErrorBoundary fallback={unavailable}>
                        <Suspense fallback={loading}>
                          <Tweet id={id} fallback={loading} components={{TweetNotFound: () => unavailable}} />
                        </Suspense>
                      </TweetErrorBoundary>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
