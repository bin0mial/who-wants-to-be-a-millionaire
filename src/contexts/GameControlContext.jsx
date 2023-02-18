import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const GameControlContext = createContext(null);
export default GameControlContext;

const GameControlProvider = ({ children }) => {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  const endGame = () => {
    setGameStarted(false);
  };

  const gameControlContextValue = useMemo(() => ({
    gameStarted,
    startGame,
    endGame,
  }), [gameStarted]);

  return (
    <GameControlContext.Provider value={gameControlContextValue}>
      {children}
    </GameControlContext.Provider>
  );
};

GameControlProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { GameControlProvider };
