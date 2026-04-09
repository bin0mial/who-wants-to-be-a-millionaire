import React, { useContext } from 'react';
import ThemeContext from 'contexts/ThemeContext';

const ThemeOverlay = () => {
  const { themeConfig } = useContext(ThemeContext);

  const { Overlay, Decorations } = themeConfig;

  return (
    <>
      {Decorations && <Decorations />}
      {Overlay && <Overlay />}
    </>
  );
};

export default ThemeOverlay;
