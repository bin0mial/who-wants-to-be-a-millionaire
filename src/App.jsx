import './App.css';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Homepage from 'components/Homepage';
import Game from 'components/Game';
import { QuestionProvider } from 'contexts/QuestionContext';
import GameControlContext from 'contexts/GameControlContext';
import ReactGA from 'react-ga';

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID);

const App = () => {
  const { i18n } = useTranslation();
  const { gameStarted } = useContext(GameControlContext);

  return (
    <QuestionProvider>
      <Helmet htmlAttributes={{ lang: i18n.language, dir: i18n.dir(i18n.language) }} />
      <div className="app">
        {gameStarted ? <Game /> : <Homepage />}
      </div>
    </QuestionProvider>
  );
};

export default App;
