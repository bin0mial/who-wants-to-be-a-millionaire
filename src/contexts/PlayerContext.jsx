import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const PlayerContext = createContext(null);
export default PlayerContext;

const PlayerProvider = ({ children }) => {
  const [playerInfo, setPlayerInfo] = useState({ name: '' });

  const contextData = useMemo(() => ({
    playerInfo,
    setPlayerInfo,
  }), [playerInfo]);

  return (
    <PlayerContext.Provider value={contextData}>
      {children}
    </PlayerContext.Provider>
  );
};

PlayerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { PlayerProvider };
