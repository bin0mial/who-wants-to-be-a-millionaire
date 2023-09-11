import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const AlwaysScrollToBottom = ({ listener }) => {
  const elementRef = useRef();
  useEffect(() => {
    elementRef.current.scrollIntoView();
  }, [listener]);
  return <div ref={elementRef} />;
};

AlwaysScrollToBottom.propTypes = {
  listener: PropTypes.oneOfType(Object),
};

AlwaysScrollToBottom.defaultProps = {
  listener: null,
};

export default AlwaysScrollToBottom;
