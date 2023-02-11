import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

const QuestionContext = createContext(null);
export default QuestionContext;

const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState(null);

  const contextData = useMemo(() => ({
    questions,
    setQuestions,
  }), [questions]);

  return (
    <QuestionContext.Provider value={contextData}>
      {children}
    </QuestionContext.Provider>
  );
};

QuestionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { QuestionProvider };
