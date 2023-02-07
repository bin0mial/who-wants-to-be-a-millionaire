import { useEffect, useState } from 'react';
import './Money.css';
import PropTypes from 'prop-types';

const Money = ({
  money, currentMoneyIndex, setCurrentMoneyIndex,
}) => {
  const moneyLength = money.length;
  const [isInitialized, setIsInitialized] = useState(false);
  const activeMoneyTableIndex = money.length - currentMoneyIndex;

  useEffect(() => {
    if (moneyLength <= currentMoneyIndex - 1) {
      setCurrentMoneyIndex(1);
      setIsInitialized(true);
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

Money.propTypes = {
  money: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  currentMoneyIndex: PropTypes.number.isRequired,
  setCurrentMoneyIndex: PropTypes.func.isRequired,
};

export default Money;
