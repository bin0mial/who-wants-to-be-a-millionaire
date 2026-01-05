import React, {
  createContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';

const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
const defaultTheme = saved || 'classic';

const ThemeContext = createContext({
  theme: defaultTheme,
  setTheme: () => {},
});

export default ThemeContext;

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(defaultTheme);

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // ignore
    }
    if (typeof document !== 'undefined') {
      document.body.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const setTheme = (value) => setThemeState(value);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
