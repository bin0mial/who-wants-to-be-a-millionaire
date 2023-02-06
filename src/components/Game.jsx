import { useState } from 'react';
import Questions from './Questions/Questions';
import Money from './Money/Money';
import moneyArray from './Money/money.json';
import indexQuestions from '../apis/questions';

const fetchQuestions = indexQuestions();

const Game = () => {
  const money = [...moneyArray].reverse();
  const [currentMoneyIndex, setCurrentMoneyIndex] = useState(0);
  const activeMoneyTableIndex = money.length - currentMoneyIndex;

  const increaseMoneyIndex = () => {
    if (currentMoneyIndex < money.length) setCurrentMoneyIndex(currentMoneyIndex + 1);
  };
  return (
    <>
      <div className="main">
        <Questions questions={fetchQuestions.read()} increaseMoneyIndex={increaseMoneyIndex} />
      </div>
      <div className="pyramid">
        <Money
          money={money}
          activeMoneyTableIndex={activeMoneyTableIndex}
          currentMoneyIndex={currentMoneyIndex}
          setCurrentMoneyIndex={setCurrentMoneyIndex}
        />
      </div>
    </>
  );
};

export default Game;
