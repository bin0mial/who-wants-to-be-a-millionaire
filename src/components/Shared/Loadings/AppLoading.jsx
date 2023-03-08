import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';
import './AppLoading.css';

const AppLoading = ({ color }) => (
  <ReactLoading
    className="app-loading"
    type="spinningBubbles"
    color={color}
    height="20%"
    width="20%"
  />
);

AppLoading.propTypes = {
  color: PropTypes.string,
};

AppLoading.defaultProps = {
  color: '#ffffff',
};

export default AppLoading;
