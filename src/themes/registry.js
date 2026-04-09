/**
 * Theme Registry — single source of truth for all themes.
 *
 * To add a new theme:
 * 1. Create a folder under src/themes/<name>/ with a CSS file and optional Overlay/Decorations components.
 * 2. Create an index.js that exports a theme object matching the shape below.
 * 3. Import and add it to the `themes` array in this file.
 * 4. Add an i18n key for `homepage.<labelKey>` in each locale.
 *
 * Theme object shape:
 *   id          — unique string, used for data-theme attribute & localStorage
 *   labelKey    — i18n key under the "homepage" namespace
 *   icon        — emoji or short string for the floating toggle
 *   cssPath     — function returning a dynamic import() for the theme CSS (null for classic)
 *   Overlay     — React component for ambient effects (snow, particles, etc.) or null
 *   Decorations — React component for static decorations (garlands, etc.) or null
 */

import christmasTheme from './christmas';
import easterTheme from './easter';

const classicTheme = {
  id: 'classic',
  labelKey: 'themeClassic',
  icon: '🎮',
  cssPath: null,
  Overlay: null,
  Decorations: null,
};

const themes = [
  classicTheme,
  christmasTheme,
  easterTheme,
];

export const allThemes = themes;

export const getTheme = (id) => themes.find((t) => t.id === id) || classicTheme;

export default themes;
