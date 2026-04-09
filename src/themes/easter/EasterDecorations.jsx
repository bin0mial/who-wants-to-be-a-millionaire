import React from 'react';

const IMG_PATH = `${process.env.PUBLIC_URL}/images/easter-risen.png`;

const overlayGradient = [
  'linear-gradient(180deg,',
  'rgba(106,175,224,0.35) 0%,',
  'rgba(142,200,232,0.22) 25%,',
  'rgba(232,208,152,0.18) 55%,',
  'rgba(176,128,96,0.32) 78%,',
  'rgba(122,80,53,0.45) 100%)',
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
