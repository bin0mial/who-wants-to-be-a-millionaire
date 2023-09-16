import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import FormikInput from './FormikInput';

const FormikPasswordInput = ({
  name, label, showError, disabled, removeMargin,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormikInput
      name={name}
      label={label || t('password')}
      showError={showError}
      disabled={disabled}
      removeMargin={removeMargin}
      type={showPassword ? 'text' : 'password'}
      inputGroup
    >
      <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
      </Button>
    </FormikInput>
  );
};

FormikPasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  showError: PropTypes.bool,
  disabled: PropTypes.bool,
  removeMargin: PropTypes.bool,
};

FormikPasswordInput.defaultProps = {
  showError: true,
  disabled: false,
  removeMargin: false,
  label: null,
};

export default FormikPasswordInput;
