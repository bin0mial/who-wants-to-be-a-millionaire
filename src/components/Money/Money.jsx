import { useContext, useEffect, useState } from 'react';
import './Money.css';
import { MoneyContext, MoneyIndexContext } from 'contexts/MoneyContext';

const Money = () => {
  const { money } = useContext(MoneyContext);
  const { currentMoneyIndex, setCurrentMoneyIndex, setLoaded } = useContext(MoneyIndexContext);
  const [isInitialized, setIsInitialized] = useState(false);
  const moneyLength = money.length;
  const activeMoneyTableIndex = money.length - currentMoneyIndex;

  useEffect(() => {
    if (moneyLength <= currentMoneyIndex - 1) {
      setCurrentMoneyIndex(1);
      setIsInitialized(true);
      setLoaded();
    }
    if (!isInitialized) {
      setTimeout(() => {
        setCurrentMoneyIndex(currentMoneyIndex + 1);
      }, 50);
    }
  }, [currentMoneyIndex, isInitialized, moneyLength]);

  return (
    <div className="money-list">
      <ul>
        {money.map((number, index) => (
          <li key={number} className={index >= activeMoneyTableIndex ? 'active' : ''}>
            <span />
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Money;
