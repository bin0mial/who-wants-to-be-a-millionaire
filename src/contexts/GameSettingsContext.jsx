import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const dependentChildren = {
  enableTimer: ['timerCountDown'],
  enableKeyboardShortcuts: ['shortcutA', 'shortcutB', 'shortcutC', 'shortcutD'],
};

const switchSettings = [
  'stopGameLose', 'continueGameWrongAnswer', 'enableSounds', 'enableTimer', 'enableKeyboardShortcuts',
];

const inputSettings = [
  { name: 'timerCountDown', type: 'number' },
  { name: 'shortcutA', type: 'hotkey' },
  { name: 'shortcutB', type: 'hotkey' },
  { name: 'shortcutC', type: 'hotkey' },
  { name: 'shortcutD', type: 'hotkey' },
];

const savedSettings = JSON.parse(localStorage.getItem('settings'));
const defaultValue = {
  gameSettings: {
    stopGameLose: savedSettings?.stopGameLose ?? false,
    continueGameWrongAnswer: savedSettings?.continueGameWrongAnswer ?? true,
    enableSounds: savedSettings?.enableSounds ?? true,
    enableTimer: savedSettings?.enableTimer ?? true,
    timerCountDown: savedSettings?.timerCountDown ?? 30,
    enableKeyboardShortcuts: savedSettings?.enableKeyboardShortcuts ?? true,
    shortcutA: savedSettings?.shortcutA ?? 'Shift+A',
    shortcutB: savedSettings?.shortcutB ?? 'Shift+B',
    shortcutC: savedSettings?.shortcutC ?? 'Shift+C',
    shortcutD: savedSettings?.shortcutD ?? 'Shift+D',
  },
  dependentChildren,
  switchSettings,
  inputSettings,
  updateSettings: () => {},
};

const GameSettingsContext = createContext(defaultValue);

export default GameSettingsContext;

const GameSettingsProvider = ({ children }) => {
  const [gameSettings, setGameSettings] = useState(defaultValue.gameSettings);

  const updateSettings = (settings) => {
    const values = {
      stopGameLose: settings.stopGameLose,
      continueGameWrongAnswer: settings.continueGameWrongAnswer,
      enableSounds: settings.enableSounds,
      enableTimer: settings.enableTimer,
      timerCountDown: settings.timerCountDown,
      enableKeyboardShortcuts: settings.enableKeyboardShortcuts,
      shortcutA: settings.shortcutA,
      shortcutB: settings.shortcutB,
      shortcutC: settings.shortcutC,
      shortcutD: settings.shortcutD,
    };
    setGameSettings(values);
    localStorage.setItem('settings', JSON.stringify(values));
  };

  const GameSettingsContextValue = useMemo(() => ({
    gameSettings,
    dependentChildren,
    switchSettings,
    inputSettings,
    updateSettings,
  }), [gameSettings]);

  return (
    <GameSettingsContext.Provider value={GameSettingsContextValue}>
      {children}
    </GameSettingsContext.Provider>
  );
};

GameSettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { GameSettingsProvider };
