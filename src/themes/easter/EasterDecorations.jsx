import React from 'react';

const IMG_PATH = `${process.env.PUBLIC_URL}/images/easter-risen.png`;

const overlayGradient = [
  'linear-gradient(180deg,',
  'rgba(42,140,196,0.45) 0%,',
  'rgba(91,189,227,0.30) 30%,',
  'rgba(244,211,94,0.25) 55%,',
  'rgba(166,123,91,0.40) 80%,',
  'rgba(107,66,38,0.60) 100%)',
].join(' ');

const EasterDecorations = () => (
  <div
    className="easter-bg-image"
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      pointerEvents: 'none',
      backgroundImage: `${overlayGradient}, url(${IMG_PATH})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      backgroundAttachment: 'fixed',
    }}
    aria-hidden
  />
);

export default EasterDecorations;
