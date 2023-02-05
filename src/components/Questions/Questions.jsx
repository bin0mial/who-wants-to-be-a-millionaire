import { useState } from 'react';
import './Questions.css';
import PropTypes from 'prop-types';
import Answer from './Answer';

const Questions = ({ questions, increaseMoneyIndex }) => {
  const [activeQuestion, setActiveQuestion] = useState(questions[0]);
  const [selectedId, setSelectedId] = useState();
  const [wronglySelected, setWronglySelected] = useState();
  const [rightAnswer, setRightAnswer] = useState();
  const [isOver, setIsOver] = useState(false);

  const nextQuestion = () => {
    setRightAnswer(null);
    const currentQuestionIndex = questions.findIndex((question) => question.id === activeQuestion.id);
    if (currentQuestionIndex < questions.length - 1) {
      setActiveQuestion(questions[currentQuestionIndex + 1]);
      increaseMoneyIndex();
    } else {
      setIsOver(true);
    }
  };

  const solve = (option) => {
    setSelectedId(null);
    setRightAnswer(null);
    setWronglySelected(null);
    if (option === activeQuestion.answer) {
      setRightAnswer(option);
      setTimeout(nextQuestion, 1000);
    } else {
      setWronglySelected(option);
    }
  };

  const handleChoice = (option) => () => {
    setSelectedId(option);
    setTimeout(() => solve(option), 2000);
  };

  return isOver ? <div>أنتهت الاسئلة!</div>
    : (
      <>
        <div className="question">
          {activeQuestion.question}
        </div>
        <div className="answers">
          {Object.entries(activeQuestion.options).map(([id, answer]) => (
            <Answer
              key={id}
              id={id}
              answer={answer}
              handleChoice={handleChoice}
              isSelected={selectedId === id}
              wronglySelected={wronglySelected === id}
              rightAnswer={rightAnswer === id}
            />
          ))}
        </div>
      </>
    );
};

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    options: PropTypes.objectOf(PropTypes.string).isRequired,
    answer: PropTypes.string.isRequired,
  })).isRequired,
  increaseMoneyIndex: PropTypes.func.isRequired,
};

export default Questions;
