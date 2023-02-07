import './App.css';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Homepage from './components/Homepage';
import Game from './components/Game';

const App = () => {
  const { i18n } = useTranslation();
  const [gameStarted, setGameStarted] = useState(false);
  return (
    <>
      <Helmet htmlAttributes={{ lang: i18n.language, dir: i18n.dir(i18n.language) }} />
      <div className="app">
        {gameStarted ? <Game /> : <Homepage setGameStarted={setGameStarted} />}
      </div>
    </>
  );
};

export default App;
