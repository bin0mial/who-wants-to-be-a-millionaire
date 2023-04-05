import './App.css';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Homepage from 'components/Homepage';
import Game from 'components/Game';
import GameControlContext from 'contexts/GameControlContext';
import ReactGA from 'react-ga4';
import initApp from 'helpers/app';
import { AppModalProvider } from 'contexts/AppModalContext';

ReactGA.initialize(process.env.REACT_APP_FIREBASE_MEASUREMENT_ID);

const App = () => {
  const { i18n } = useTranslation();
  const { gameStarted } = useContext(GameControlContext);

  const isInitialized = initApp();

  return (
    <AppModalProvider>
      <Helmet htmlAttributes={{ lang: i18n.language, dir: i18n.dir(i18n.language) }} />

      {isInitialized && (
      <div className="app">
          {gameStarted ? <Game /> : <Homepage />}
      </div>
      )}
    </AppModalProvider>
  );
};

export default App;
