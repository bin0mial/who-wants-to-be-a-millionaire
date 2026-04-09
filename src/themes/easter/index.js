import EasterOverlay from './EasterOverlay';
import EasterDecorations from './EasterDecorations';

const easterTheme = {
  id: 'easter',
  labelKey: 'themeEaster',
  icon: '✝️',
  cssPath: () => import('./easter.css'),
  Overlay: EasterOverlay,
  Decorations: EasterDecorations,
};

export default easterTheme;
