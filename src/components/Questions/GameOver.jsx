import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Trans, useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { MoneyContext } from 'contexts/MoneyContext';
import { QuestionContext } from 'contexts/QuestionContext';
import PlayerContext from 'contexts/PlayerContext';
import './GameOver.css';

const GameOver = ({ isWinner, endGameButton }) => {
  const { t } = useTranslation('questions', { keyPrefix: 'gameOver' });
  const { questions } = useContext(QuestionContext);
  const { money, collectedMoney } = useContext(MoneyContext);
  const { playerInfo } = useContext(PlayerContext);

  return (
    <div className="text-center game-over">
      {playerInfo.name && (
      <div>
        <Trans
          ns="questions"
          i18nKey="gameOver.callPlayer"
          values={{ playerName: playerInfo.name }}
          components={{
            1: <span className="game-over-player-name" />,
          }}
        />
      </div>
      )}
      <div>
        <Trans
          ns="questions"
          i18nKey={`gameOver.${isWinner ? 'youWin' : 'youLose'}`}
          values={{ money: isWinner ? money[questions.length - 1] || money.splice(-1) : collectedMoney }}
          components={{ bold: <b /> }}
        />
      </div>
      <div>
        <Button variant="primary" onClick={endGameButton}>{t('backToMain')}</Button>
      </div>
    </div>
  );
};
GameOver.propTypes = {
  isWinner: PropTypes.bool,
  endGameButton: PropTypes.func.isRequired,
};

GameOver.defaultProps = {
  isWinner: false,
};

export default GameOver;
