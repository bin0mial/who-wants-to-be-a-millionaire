import React from 'react';

const ChristmasOverlay = () => {
  const flakes = Array.from({ length: 28 }).map(() => {
    const left = Math.random() * 100;
    const size = 4 + Math.random() * 6;
    const duration = 6 + Math.random() * 8;
    const delay = Math.random() * -20;
    const id = Math.random().toString(36).slice(2, 9);
    return (
      <div
        key={`flake-${id}`}
        className="christmas-snowflake"
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
    <div className="christmas-snow" aria-hidden>
      {flakes}
    </div>
  );
};

export default ChristmasOverlay;
