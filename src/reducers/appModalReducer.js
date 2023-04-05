const actionTypes = {
  SHOW: Symbol('SHOW'),
  HIDE: Symbol('HIDE'),
};

const appModalReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SHOW:
      return { ...action.data };
    case actionTypes.HIDE:
      return { ...state, show: false };
    default:
      return state;
  }
};
export { appModalReducer, actionTypes };
