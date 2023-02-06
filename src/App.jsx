import './App.css';
import { useState } from 'react';
import Homepage from './components/Homepage';
import Game from './components/Game';

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  return (
    <div className="app">
      {gameStarted ? <Game /> : <Homepage setGameStarted={setGameStarted} />}
    </div>
  );
};

export default App;
