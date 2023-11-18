import { useEffect, useState } from 'react';
import './Timer.css';
import PropTypes from 'prop-types';

const Timer = ({
  isReady, timeInSeconds, onTimeout, pauseTimer,
}) => {
  const [timeCountDown, setTimeCountDown] = useState(timeInSeconds);

  useEffect(() => {
    setTimeout(() => {
      if (timeCountDown > 0 && isReady && !pauseTimer) {
        setTimeCountDown((oldValue) => oldValue - 1);
      } else if (timeCountDown <= 0) {
        onTimeout();
      }
    }, 1000);
  }, [timeCountDown, isReady]);

  return (
    <div className="timer">
      <span>{timeCountDown}</span>
    </div>
  );
};

Timer.propTypes = {
  isReady: PropTypes.bool,
  timeInSeconds: PropTypes.number,
  onTimeout: PropTypes.func,
  pauseTimer: PropTypes.bool,
};

Timer.defaultProps = {
  isReady: true,
  timeInSeconds: 30,
  onTimeout: () => {},
  pauseTimer: false,
};

export default Timer;
