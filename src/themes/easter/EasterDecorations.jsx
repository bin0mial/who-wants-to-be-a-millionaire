import React from 'react';

const IMG_PATH = `${process.env.PUBLIC_URL}/images/easter-risen.png`;

const overlayGradient = [
  'linear-gradient(180deg,',
  'rgba(61,111,140,0.40) 0%,',
  'rgba(127,191,212,0.25) 28%,',
  'rgba(201,168,76,0.20) 55%,',
  'rgba(154,123,98,0.35) 80%,',
  'rgba(92,58,32,0.50) 100%)',
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
