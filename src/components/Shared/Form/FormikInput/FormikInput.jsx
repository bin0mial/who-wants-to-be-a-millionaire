import { Form } from 'react-bootstrap';
import { Field } from 'formik';
import PropTypes from 'prop-types';

const FormikInput = ({ name, label, type }) => (
  <Field name={name}>
    {({ field }) => (
      <Form.Group className="mb-3">
        <Form.Label htmlFor={name}>{label}</Form.Label>
        <Form.Control type={type} id={name} {...field} />
      </Form.Group>
    )}
  </Field>
);

FormikInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text']),
};

FormikInput.defaultProps = {
  type: 'text',
};

export default FormikInput;
