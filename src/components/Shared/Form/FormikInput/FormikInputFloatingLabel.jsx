import { FloatingLabel, Form } from 'react-bootstrap';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import FormikErrorMessage from '../FormikErrorMessage/FormikErrorMessage';

const FormikInput = ({
  name, label, type, showError, disabled, removeMargin,
}) => (
  <Field name={name}>
    {({ field, meta }) => (
      <>
        <FloatingLabel label={label} className={removeMargin ? '' : 'mb-3'}>
          <Form.Control
            type={type}
            id={name}
            placeholder={label}
            {...field}
            isInvalid={meta.touched && meta.error}
            disabled={disabled}
          />
        </FloatingLabel>
        {showError && <FormikErrorMessage name={name} />}
      </>
    )}
  </Field>
);

FormikInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'number']),
  showError: PropTypes.bool,
  disabled: PropTypes.bool,
  removeMargin: PropTypes.bool,
};

FormikInput.defaultProps = {
  type: 'text',
  showError: true,
  disabled: false,
  removeMargin: false,
};

export default FormikInput;
