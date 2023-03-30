import { useEffect, useRef, useState } from 'react';
import './Timer.css';
import PropTypes from 'prop-types';

const Timer = ({ isReady, timeInSeconds, onTimeout }) => {
  const [timeCountDown, setTimeCountDown] = useState(timeInSeconds);
  const initialWaitFinish = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      if (initialWaitFinish.current && timeCountDown > 0 && isReady) {
        setTimeCountDown((oldValue) => oldValue - 1);
      } else if (timeCountDown <= 0) {
        onTimeout();
      } else {
        initialWaitFinish.current = true;
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
};

Timer.defaultProps = {
  isReady: true,
  timeInSeconds: 30,
  onTimeout: () => {},
};

export default Timer;
