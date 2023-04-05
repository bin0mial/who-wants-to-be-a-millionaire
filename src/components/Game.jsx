import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import indexQuestions from 'apis/questions';
import QuestionContext from 'contexts/QuestionContext';
import { MoneyProvider } from 'contexts/MoneyContext';
import { decompressObjectifyLZW } from 'helpers/compressors';
import Money from './Money/Money';
import './Game.css';
import Questions from './Questions/Questions';

const Game = () => {
  const { i18n } = useTranslation();
  const { questions, setQuestions, setIsCustom } = useContext(QuestionContext);

  useEffect(() => {
    if (!questions || !questions?.length) {
      const questionsResp = indexQuestions(
        { urlType: 'default', lang: i18n.language },
        { postFetch: decompressObjectifyLZW },
      );
      setIsCustom(false);
      setQuestions(questionsResp);
    }
  }, []);

  if (!questions || !questions?.length) return null;

  return (
    <MoneyProvider>
      <div className="game">
        <Helmet htmlAttributes={{ lang: i18n.language, dir: i18n.dir(i18n.language) }} />
        <div className="main">
          <Questions questions={questions} />
        </div>
        <div className="pyramid">
          <Money />
        </div>
      </div>
    </MoneyProvider>
  );
};

export default Game;
