import React, {
  createContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { allThemes, getTheme } from 'themes/registry';

const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
const isValidTheme = (id) => allThemes.some((t) => t.id === id);
const defaultTheme = (saved && isValidTheme(saved)) ? saved : 'classic';

const ThemeContext = createContext({
  theme: defaultTheme,
  themeConfig: getTheme(defaultTheme),
  setTheme: () => {},
});

export default ThemeContext;

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(defaultTheme);
  const themeConfig = useMemo(() => getTheme(theme), [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // ignore
    }
    if (typeof document !== 'undefined') {
      document.body.setAttribute('data-theme', theme);
    }

    if (themeConfig.cssPath) {
      themeConfig.cssPath();
    }
  }, [theme, themeConfig]);

  const setTheme = useCallback((value) => {
    if (isValidTheme(value)) {
      setThemeState(value);
    }
  }, []);

  const value = useMemo(() => ({ theme, themeConfig, setTheme }), [theme, themeConfig, setTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
