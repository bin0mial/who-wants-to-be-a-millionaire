import { Form } from 'react-bootstrap';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import FormikErrorMessage from '../FormikErrorMessage/FormikErrorMessage';

const FormikInput = ({
  name, label, type, showError, disabled,
}) => (
  <Field name={name}>
    {({ field, meta }) => (
      <Form.Group className="mb-3">
        <Form.Label htmlFor={name}>{label}</Form.Label>
        <Form.Control type={type} id={name} {...field} isInvalid={meta.touched && meta.error} disabled={disabled} />
        {showError && <FormikErrorMessage name={name} />}
      </Form.Group>
    )}
  </Field>
);

FormikInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'number']),
  showError: PropTypes.bool,
  disabled: PropTypes.bool,
};

FormikInput.defaultProps = {
  type: 'text',
  showError: true,
  disabled: false,
};

export default FormikInput;
