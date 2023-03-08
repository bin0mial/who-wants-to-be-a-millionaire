import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import Money from './Money/Money';
import moneyArray from './Money/money.json';
import './Game.css';
import indexQuestions from '../apis/questions';
import Questions from './Questions/Questions';
import QuestionContext from '../contexts/QuestionContext';

const Game = () => {
  const { i18n } = useTranslation();
  const { questions, setQuestions, setIsCustom } = useContext(QuestionContext);

  const money = [...moneyArray].reverse();
  const [currentMoneyIndex, setCurrentMoneyIndex] = useState(0);
  const increaseMoneyIndex = () => {
    if (currentMoneyIndex < money.length) setCurrentMoneyIndex(currentMoneyIndex + 1);
  };

  useEffect(() => {
    if (!questions || !questions?.length) {
      const questionsResp = indexQuestions({ urlType: 'default', lang: i18n.language });
      setIsCustom(false);
      setQuestions(questionsResp);
    }
  }, []);

  if (!questions || !questions?.length) return null;

  return (
    <div className="game">
      <Helmet htmlAttributes={{ lang: i18n.language, dir: i18n.dir(i18n.language) }} />
      <div className="main">
        <Questions questions={questions} increaseMoneyIndex={increaseMoneyIndex} />
      </div>
      <div className="pyramid">
        <Money
          money={money}
          currentMoneyIndex={currentMoneyIndex}
          setCurrentMoneyIndex={setCurrentMoneyIndex}
        />
      </div>
    </div>
  );
};

export default Game;
