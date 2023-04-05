import * as initializations from './appInitializers';

const initApp = () => {
  const readyArray = Object.values(initializations).map((initializer) => initializer());
  return readyArray.length && readyArray.every(Boolean);
};

export default initApp;
