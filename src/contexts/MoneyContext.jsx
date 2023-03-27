import {
  createContext, useMemo, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import moneyArray from 'components/Money/money.json';

const money = [...moneyArray].reverse();

const MoneyContext = createContext(null);

const MoneyIndexContext = createContext(null);

const MoneyProvider = ({ children }) => {
  const [currentMoneyIndex, setCurrentMoneyIndex] = useState(0);
  const loadedRef = useRef(false);

  const increaseMoneyIndex = () => {
    if (currentMoneyIndex < money.length) setCurrentMoneyIndex(currentMoneyIndex + 1);
  };

  const setLoaded = () => {
    loadedRef.current = true;
  };

  const contextValue = useMemo(() => ({
    isLoaded: loadedRef.current,
    money,
    increaseMoneyIndex,
  }), [loadedRef.current && currentMoneyIndex]);

  const moneyIndexContextValue = useMemo(() => ({
    setLoaded,
    currentMoneyIndex,
    setCurrentMoneyIndex,
  }), [currentMoneyIndex]);

  return (
    <MoneyContext.Provider value={contextValue}>
      <MoneyIndexContext.Provider value={moneyIndexContextValue}>
        {children}
      </MoneyIndexContext.Provider>
    </MoneyContext.Provider>
  );
};

MoneyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MoneyProvider, MoneyContext, MoneyIndexContext };
