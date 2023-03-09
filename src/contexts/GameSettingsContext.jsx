import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const savedSettings = JSON.parse(localStorage.getItem('settings'));
const defaultValue = {
  gameSettings: {
    stopGameLose: savedSettings?.stopGameLose ?? false,
    continueGameWrongAnswer: savedSettings?.continueGameWrongAnswer ?? true,
  },
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
    };
    setGameSettings(values);
    localStorage.setItem('settings', JSON.stringify(values));
  };

  const GameSettingsContextValue = useMemo(() => ({
    gameSettings,
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
