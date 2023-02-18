import { useContext, useEffect, useState } from 'react';
import './Questions.css';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import playSound from 'assets/sounds/play.mp3';
import correctSound from 'assets/sounds/correct.mp3';
import wrongSound from 'assets/sounds/wrong.mp3';
import { Button } from 'react-bootstrap';
import Answer from './Answer';
import GameControlContext from '../../contexts/GameControlContext';

const audios = {
  playSound: new Audio(playSound),
  correctSound: new Audio(correctSound),
  wrongSound: new Audio(wrongSound),
};

const playAudio = (audio) => {
  Object.entries(audios).forEach((audioInstance) => {
    audioInstance[1].pause();
    // eslint-disable-next-line no-param-reassign
    audioInstance[1].currentTime = 0;
  });
  audio.play();
};

const Questions = ({ questions, increaseMoneyIndex }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'questions' });
  const [activeQuestion, setActiveQuestion] = useState(questions[0]);
  const [selectedId, setSelectedId] = useState();
  const [wronglySelected, setWronglySelected] = useState();
  const [rightAnswer, setRightAnswer] = useState();
  const [isOver, setIsOver] = useState(false);
  const { endGame } = useContext(GameControlContext);

  useEffect(() => {
    playAudio(audios.playSound);
  }, []);

  const nextQuestion = () => {
    setRightAnswer(null);
    const currentQuestionIndex = questions.findIndex((question) => question.id === activeQuestion.id);
    if (currentQuestionIndex < questions.length - 1) {
      playAudio(audios.playSound);
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
      playAudio(audios.correctSound);
      setRightAnswer(option);
      setTimeout(nextQuestion, 2000);
    } else {
      playAudio(audios.wrongSound);
      setWronglySelected(option);
    }
  };

  const handleChoice = (option) => () => {
    setSelectedId(option);
    setTimeout(() => solve(option), 2000);
  };

  return isOver || !activeQuestion ? (
    <div className="text-center">
      <div>{t('noMoreQuestions')}</div>
      <div>
        <Button variant="primary" onClick={endGame}>{t('backToMain')}</Button>
      </div>
    </div>
  )
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
