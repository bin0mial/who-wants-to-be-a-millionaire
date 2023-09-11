import { useContext, useEffect, useState } from 'react';
import './Money.css';
import { MoneyContext, MoneyIndexContext } from 'contexts/MoneyContext';
import { QuestionContext } from 'contexts/QuestionContext';

const Money = () => {
  const { money } = useContext(MoneyContext);
  const { currentMoneyIndex, setCurrentMoneyIndex, setLoaded } = useContext(MoneyIndexContext);
  const { questions } = useContext(QuestionContext);
  const [isInitialized, setIsInitialized] = useState(false);
  const questionsLength = questions.length;

  useEffect(() => {
    if (questionsLength <= currentMoneyIndex - 1) {
      setCurrentMoneyIndex(1);
      setIsInitialized(true);
      setLoaded();
    }
    if (!isInitialized) {
      setTimeout(() => {
        setCurrentMoneyIndex(currentMoneyIndex + 1);
      }, 50);
    }
  }, [currentMoneyIndex, isInitialized, questionsLength]);

  return (
    <div className="money-list">
      <ul>
        {[...Array(questionsLength)].map((_, index) => (
          <li
            key={money[index]}
            className={[
              index < currentMoneyIndex ? 'active' : '',
              index === currentMoneyIndex - 1 ? 'current' : '',
            ].join(' ')}
          >
            <span />
            {money[index]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Money;
