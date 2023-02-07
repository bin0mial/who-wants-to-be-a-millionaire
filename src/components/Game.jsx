import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import Money from './Money/Money';
import moneyArray from './Money/money.json';
import './Game.css';
import indexQuestions from '../apis/questions';
import Questions from './Questions/Questions';

const Game = () => {
  const { i18n } = useTranslation();
  const [fetchQuestions, setFetchQuestions] = useState();

  const money = [...moneyArray].reverse();
  const [currentMoneyIndex, setCurrentMoneyIndex] = useState(0);
  const increaseMoneyIndex = () => {
    if (currentMoneyIndex < money.length) setCurrentMoneyIndex(currentMoneyIndex + 1);
  };

  useEffect(() => {
    const questions = indexQuestions({ urlType: 'default', lang: i18n.language });
    setFetchQuestions(questions);
  }, []);

  if (!fetchQuestions) return null;

  return (
    <>
      <Helmet htmlAttributes={{ lang: i18n.language, dir: i18n.dir(i18n.language) }} />
      <div className="main">
        <Questions questions={fetchQuestions.read()} increaseMoneyIndex={increaseMoneyIndex} />
      </div>
      <div className="pyramid">
        <Money
          money={money}
          currentMoneyIndex={currentMoneyIndex}
          setCurrentMoneyIndex={setCurrentMoneyIndex}
        />
      </div>
    </>
  );
};

export default Game;
