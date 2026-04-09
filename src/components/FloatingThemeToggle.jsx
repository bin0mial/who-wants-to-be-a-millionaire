import React, { useContext, useCallback } from 'react';
import ThemeContext from 'contexts/ThemeContext';
import { allThemes } from 'themes/registry';
import './FloatingThemeToggle.css';

const FloatingThemeToggle = () => {
  const { theme, themeConfig, setTheme } = useContext(ThemeContext);

  const cycleTheme = useCallback(() => {
    const currentIndex = allThemes.findIndex((t) => t.id === theme);
    const nextIndex = (currentIndex + 1) % allThemes.length;
    setTheme(allThemes[nextIndex].id);
  }, [theme, setTheme]);

  return (
    <button
      type="button"
      className="floating-theme-toggle"
      onClick={cycleTheme}
      aria-label="Switch theme"
      title={`Theme: ${themeConfig.id}`}
    >
      <span className="floating-theme-icon">{themeConfig.icon}</span>
    </button>
  );
};

export default FloatingThemeToggle;
