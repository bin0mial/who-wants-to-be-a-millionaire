import React from 'react';

const EasterOverlay = () => {
  const particles = Array.from({ length: 16 }).map(() => {
    const left = Math.random() * 100;
    const size = 3 + Math.random() * 4;
    const duration = 10 + Math.random() * 12;
    const delay = Math.random() * -22;
    const id = Math.random().toString(36).slice(2, 9);
    return (
      <div
        key={`particle-${id}`}
        className="easter-particle"
        style={{
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  });

  const clouds = Array.from({ length: 5 }).map((_, i) => {
    const top = 5 + Math.random() * 30;
    const scale = 0.6 + Math.random() * 0.8;
    const duration = 50 + Math.random() * 40;
    const delay = -(Math.random() * 60);
    const id = Math.random().toString(36).slice(2, 9);
    return (
      <div
        key={`cloud-${id}`}
        className="easter-cloud"
        style={{
          top: `${top}%`,
          transform: `scale(${scale})`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          opacity: 0.25 + Math.random() * 0.15,
          zIndex: i % 2 === 0 ? 1 : 0,
        }}
      />
    );
  });

  const doves = Array.from({ length: 4 }).map(() => {
    const left = 10 + Math.random() * 80;
    const size = 12 + Math.random() * 10;
    const duration = 14 + Math.random() * 10;
    const delay = -(Math.random() * 20);
    const id = Math.random().toString(36).slice(2, 9);
    return (
      <div
        key={`dove-${id}`}
        className="easter-dove"
        style={{
          left: `${left}%`,
          fontSize: `${size}px`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      >
        🕊
      </div>
    );
  });

  return (
    <div className="easter-rays" aria-hidden>
      {clouds}
      {doves}
      {particles}
    </div>
  );
};

export default EasterOverlay;
