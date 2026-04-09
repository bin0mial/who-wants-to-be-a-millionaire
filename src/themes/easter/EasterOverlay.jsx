import React from 'react';

const EasterOverlay = () => {
  const particles = Array.from({ length: 22 }).map(() => {
    const left = Math.random() * 100;
    const size = 3 + Math.random() * 5;
    const duration = 8 + Math.random() * 10;
    const delay = Math.random() * -20;
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

  return (
    <div className="easter-rays" aria-hidden>
      {particles}
    </div>
  );
};

export default EasterOverlay;
