import { useContext, useEffect, useState } from 'react';
import './Questions.css';
import PropTypes from 'prop-types';
import playSound from 'assets/sounds/play.mp3';
import correctSound from 'assets/sounds/correct.mp3';
import wrongSound from 'assets/sounds/wrong.mp3';
import GameControlContext from 'contexts/GameControlContext';
import GameSettingsContext from 'contexts/GameSettingsContext';
import { MoneyContext } from 'contexts/MoneyContext';
import PlayerContext from 'contexts/PlayerContext';
import AlwaysScrollToBottom from 'components/Shared/Scrolling/AlwaysScrollToBottom';
import { Trans } from 'react-i18next';
import Answer from './Answer';
import Timer from './Timer/Timer';
import GameOver from './GameOver';

const audios = {
  playSound: new Audio(playSound),
  correctSound: new Audio(correctSound),
  wrongSound: new Audio(wrongSound),
};

const Questions = ({ questions }) => {
  const [activeQuestion, setActiveQuestion] = useState(questions[0]);
  const [selectedId, setSelectedId] = useState();
  const [wronglySelected, setWronglySelected] = useState();
  const [rightAnswer, setRightAnswer] = useState();
  const [isOver, setIsOver] = useState(false);
  const { endGame } = useContext(GameControlContext);
  const { gameSettings } = useContext(GameSettingsContext);
  const { increaseMoneyIndex, isLoaded } = useContext(MoneyContext);
  const { playerInfo } = useContext(PlayerContext);

  const playAudio = (audio) => {
    if (!gameSettings.enableSounds) return;
    Object.entries(audios).forEach((audioInstance) => {
      audioInstance[1].pause();
      // eslint-disable-next-line no-param-reassign
      audioInstance[1].currentTime = 0;
    });
    audio.play();
  };

  useEffect(() => {
    playAudio(audios.playSound);
  }, []);

  const nextQuestion = () => {
    setRightAnswer(null);
    setWronglySelected(null);
    const currentQuestionIndex = questions.findIndex((question) => question.id === activeQuestion.id);
    setActiveQuestion(questions[currentQuestionIndex + 1]);
    if (currentQuestionIndex < questions.length - 1) {
      increaseMoneyIndex();
      playAudio(audios.playSound);
    } else {
      setIsOver(true);
    }
  };

  const solve = (option, isGameOver = false, useAudio = true) => {
    setSelectedId(null);
    setRightAnswer(null);
    setWronglySelected(null);
    if (option === activeQuestion.answer) {
      setRightAnswer(option);
      let next;
      if (!isGameOver) {
        if (useAudio) playAudio(audios.correctSound);
        next = nextQuestion;
      } else {
        next = () => { setIsOver(true); };
      }
      setTimeout(next, 2000);
    } else {
      if (useAudio) playAudio(audios.wrongSound);
      if (gameSettings.continueGameWrongAnswer || gameSettings.stopGameLose) {
        solve(
          activeQuestion.answer,
          !gameSettings.continueGameWrongAnswer,
          !gameSettings.continueGameWrongAnswer,
        );
      }
      setWronglySelected(option);
    }
  };

  const handleChoice = (option) => () => {
    if (!selectedId) {
      setSelectedId(option);
      setTimeout(() => solve(option), 2000);
    }
  };

  return isOver || !activeQuestion ? (<GameOver endGameButton={endGame} isWinner={!activeQuestion} />) : (
    <>
      <div>
        {playerInfo.name && (
        <div>
          <Trans
            ns="questions"
            i18nKey="currentPlayer"
            values={{ playerName: playerInfo.name }}
            components={{
              1: <span className="on-game-player-name" />,
            }}
          />
        </div>
        )}
      </div>
      {gameSettings.enableTimer && (
        <Timer
          key={activeQuestion.id}
          isReady={isLoaded}
          onTimeout={solve}
          timeInSeconds={gameSettings.timerCountDown}
        />
      )}
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
            disabled={!isLoaded}
          />
        ))}
      </div>
      <AlwaysScrollToBottom listener={activeQuestion} />
    </>
  );
};

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    options: PropTypes.objectOf(PropTypes.string).isRequired,
    answer: PropTypes.string.isRequired,
  })).isRequired,
};

export default Questions;
