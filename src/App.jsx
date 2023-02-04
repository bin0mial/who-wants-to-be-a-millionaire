import './App.css';
import { useState } from 'react';
import moneyArray from './components/money.json';
import Money from './components/Money';
import Questions from './components/Questions/Questions';
import indexQuestions from './apis/questions';

const fetchQuestions = indexQuestions();

function App() {
  const money = [...moneyArray].reverse();
  const [currentMoneyIndex, setCurrentMoneyIndex] = useState(0);
  const activeMoneyTableIndex = money.length - currentMoneyIndex;

  const increaseMoneyIndex = () => {
    if (currentMoneyIndex < money.length) setCurrentMoneyIndex(currentMoneyIndex + 1);
  };

  return (
    <div className="app">
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

    </div>
  );
}

export default App;
