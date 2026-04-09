import ChristmasOverlay from './ChristmasOverlay';
import ChristmasDecorations from './ChristmasDecorations';

const christmasTheme = {
  id: 'christmas',
  labelKey: 'themeChristmas',
  icon: '🎄',
  cssPath: () => import('./christmas.css'),
  Overlay: ChristmasOverlay,
  Decorations: ChristmasDecorations,
};

export default christmasTheme;
