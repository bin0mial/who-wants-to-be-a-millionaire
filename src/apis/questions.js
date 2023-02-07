import PropTypes from 'prop-types';
import wrapPromise from './warpPromise';

const BASE_URL = process.env.PUBLIC_URL;
const indexQuestions = (urlOptions) => {
  const url = urlOptions.urlType === 'default'
    ? `${BASE_URL}/assets/questions-${urlOptions.lang}.json`
    : urlOptions.url;

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

indexQuestions.propTypes = {
  urlOption: PropTypes.shape({
    urlType: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    url: PropTypes.string,
  }),
};

indexQuestions.defaultProps = {
  urlOption: {
    urlType: 'default',
    lang: 'ar',
  },
};
export default wrapPromise(indexQuestions);
