import React, { useEffect, useState, useRef } from 'react';

export default function Header({ slides = [], intervalMs = 5000, height = '50vh' }) {
  const [index, setIndex] = useState(0);
  const [hovering, setHovering] = useState(false);
  const reduce = usePrefersReducedMotion();
  const total = slides.length;
  const timerRef = useRef(null);

  const sliderRef = useRef(null);
  const swipeRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    dx: 0,
    dy: 0,
    locked: null,     // 'x' | 'y' | null
    pointerId: null,
  });

  const next = React.useCallback(() => setIndex((i) => (i + 1) % total), [total]);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  useEffect(() => {
    if (total <= 1 || reduce || hovering) return;
    timerRef.current = setInterval(next, intervalMs);
    return () => clearInterval(timerRef.current);
  }, [total, reduce, hovering, intervalMs, next]);

  const onPointerDown = (e) => {
    // Only handle primary pointer
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    swipeRef.current.active = true;
    swipeRef.current.pointerId = e.pointerId;
    swipeRef.current.startX = e.clientX;
    swipeRef.current.startY = e.clientY;
    swipeRef.current.dx = 0;
    swipeRef.current.dy = 0;
    swipeRef.current.locked = null;

    sliderRef.current?.setPointerCapture?.(e.pointerId);
    setHovering(true); // pause auto-advance
    clearInterval(timerRef.current);
  };

  const onPointerMove = (e) => {
    if (!swipeRef.current.active) return;
    swipeRef.current.dx = e.clientX - swipeRef.current.startX;
    swipeRef.current.dy = e.clientY - swipeRef.current.startY;

    const { dx, dy, locked } = swipeRef.current;
    if (!locked) {
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
        swipeRef.current.locked = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      }
    }
    // If horizontal swipe, prevent vertical scroll jitter
    if (swipeRef.current.locked === 'x') {
      e.preventDefault();
    }
  };

  const endSwipe = () => {
    if (!swipeRef.current.active) return;
    const { dx, locked, pointerId } = swipeRef.current;
    const threshold = 40; // px to trigger

    if (locked === 'x' && Math.abs(dx) > threshold) {
      if (dx < 0) next();
      else prev();
    }

    // Reset
    swipeRef.current.active = false;
    swipeRef.current.pointerId = null;
    swipeRef.current.locked = null;
    swipeRef.current.dx = 0;
    swipeRef.current.dy = 0;

    try { sliderRef.current?.releasePointerCapture?.(pointerId); } catch {
      // Intentionally ignore errors when releasing pointer capture
    }
    setHovering(false); // resume auto on next effect tick
  };

  const onPointerUp = () => endSwipe();
  const onPointerCancel = () => endSwipe();

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
      <div
        className="slider"
        ref={sliderRef}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
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