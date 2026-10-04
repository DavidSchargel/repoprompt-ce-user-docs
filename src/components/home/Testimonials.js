import React, {Suspense, useState} from 'react';
import {Tweet} from 'react-tweet';

const tweetIds = ['1995881411459645571', '1995585157601132829', '1989474879205511226', '1980295015260983319', '1979213245681668153', '1938684064304677031', '1940933589861855514', '1938721178333651184', '1937328701961568311', '1936592573906493637'];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const fallback = <a href={`https://x.com/i/status/${tweetIds[index]}`}>View this testimonial on X</a>;
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2 className="testimonials-title">What are people saying</h2>
          <p className="testimonials-subtitle">See what developers are saying about RepoPrompt on X (Twitter)</p>
        </div>
        <div className="carousel-dots" aria-label="Choose a testimonial">
          {tweetIds.map((id, i) => <button key={id} className={`dot ${index === i ? 'active' : ''}`} aria-label={`Show testimonial ${i + 1}`} aria-pressed={index === i} onClick={() => setIndex(i)} />)}
        </div>
        <div className="home-tweet">
          <Suspense fallback={fallback}>
            <Tweet key={tweetIds[index]} id={tweetIds[index]} fallback={fallback} components={{TweetNotFound: () => fallback}} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
