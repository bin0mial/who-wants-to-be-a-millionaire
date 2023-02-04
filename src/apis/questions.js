import wrapPromise from './warpPromise';

const indexQuestions = (url = `${process.env.PUBLIC_URL}/assets/questions.json`) => {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
  };
  return fetch(url, options)
    .then((response) => response.json());
};
export default wrapPromise(indexQuestions);
