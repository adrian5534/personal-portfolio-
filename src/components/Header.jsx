import React, { useEffect, useState, useRef } from 'react';

export default function Header({ slides = [], intervalMs = 5000, height = '50vh' }) {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const reduce = usePrefersReducedMotion();
  const total = slides.length;
  const timerRef = useRef(null);

  const next = React.useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  useEffect(() => {
    if (total <= 1 || reduce || hovering) return;
    timerRef.current = setInterval(next, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [total, reduce, hovering, intervalMs, next]);

  if (!total) {
    return (
      <header className="HeroHeader" style={{ '--hero-h': height }}>
        <div className="slider">
          <div className="slide is-active">
            <div className="slide-content">
              <h1>Featured Work</h1>
              <a className="btn btn-primary" href="#projects">See projects</a>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="HeroHeader" style={{ '--hero-h': height }} role="region" aria-label="Featured work slideshow">
      <div className="slider" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
        {slides.map((s, i) => {
          const active = i === index;
          return (
            <div key={i} className={`slide${active ? ' is-active' : ''}`} aria-hidden={!active}>
              <iframe
                className="frame"
                title={s.title || `slide-${i + 1}`}
                src={s.src}
                loading="lazy"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="slide-scrim" aria-hidden="true" />
              <div className="slide-content">
                {s.kicker && <span className="kicker">{s.kicker}</span>}
                {s.title && <h1>{s.title}</h1>}
                {s.subtitle && <p className="subtitle">{s.subtitle}</p>}
                <div className="cta-row">
                  {s.href && (
                    <a className="btn btn-primary" href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.cta || 'Open project'}
                    </a>
                  )}
                  <a className="btn btn-outline-light" href="#projects">All projects</a>
                </div>
              </div>
            </div>
          );
        })}

        {total > 1 && (
          <>
            <button className="nav-btn prev" aria-label="Previous slide" onClick={prev}>‹</button>
            <button className="nav-btn next" aria-label="Next slide" onClick={next}>›</button>
            <div className="dots" role="tablist" aria-label="Slide selector">
              {slides.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === index}
                  className={`dot${i === index ? ' active' : ''}`}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </header>
  );
}

function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setPrefers(!!m.matches);
    onChange();
    m.addEventListener?.('change', onChange);
    return () => m.removeEventListener?.('change', onChange);
  }, []);
  return prefers;
}