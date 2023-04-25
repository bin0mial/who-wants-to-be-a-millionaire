import {
  createContext, useMemo, useReducer, useState,
} from 'react';
import PropTypes from 'prop-types';
import { questionsPasswordActionTypes, questionsPasswordReducer } from 'reducers/questionsPasswordReducer';
import { checkMd5 } from 'helpers/hashes';

const QuestionContext = createContext(null);
const QuestionPasswordContext = createContext(null);

const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState(null);
  const [isCustom, setIsCustom] = useState(false);
  const [questionsPassword, dispatch] = useReducer(questionsPasswordReducer, {
    password: null,
    isLocked: false,
  });

  const lockPasswordQuestions = (password) => {
    dispatch({ type: questionsPasswordActionTypes.SET_PASSWORD, password });
  };

  const unlockPasswordQuestions = (password) => {
    if (!questionsPassword.password || checkMd5(password, questionsPassword.password)) {
      dispatch({ type: questionsPasswordActionTypes.UNLOCK });
      return true;
    }
    return false;
  };

  const contextData = useMemo(() => ({
    questions,
    setQuestions,
    isCustom,
    setIsCustom,
  }), [questions]);

  const questionsPasswordContextData = useMemo(() => ({
    questionsPassword,
    lockPasswordQuestions,
    unlockPasswordQuestions,
  }), [questionsPassword]);

  return (
    <QuestionContext.Provider value={contextData}>
      <QuestionPasswordContext.Provider value={questionsPasswordContextData}>
        {children}
      </QuestionPasswordContext.Provider>
    </QuestionContext.Provider>
  );
};

QuestionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { QuestionProvider, QuestionContext, QuestionPasswordContext };
