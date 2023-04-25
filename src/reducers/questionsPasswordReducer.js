const questionsPasswordActionTypes = {
  LOCK: Symbol('LOCK'),
  UNLOCK: Symbol('HIDE'),
  SET_PASSWORD: Symbol('SET_PASSWORD'),
};

const questionsPasswordReducer = (state, action) => {
  switch (action.type) {
    case questionsPasswordActionTypes.LOCK:
      return { ...state, isLocked: true };
    case questionsPasswordActionTypes.UNLOCK:
      return { ...state, isLocked: false };
    case questionsPasswordActionTypes.SET_PASSWORD:
      return { ...state, password: action.password, isLocked: true };
    default:
      return state;
  }
};
export { questionsPasswordReducer, questionsPasswordActionTypes };
