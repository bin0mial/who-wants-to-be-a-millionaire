import { Field } from 'formik';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FormikSwitch = ({ name, label, onChange }) => (
  <Field name={name}>
    {({ field }) => (
      <Form.Check
        type="switch"
        id={name}
        label={label}
        checked={!!field.value}
        {...field}
        {...(onChange && { onChange })}
      />
    )}
  </Field>
);

FormikSwitch.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

FormikSwitch.defaultProps = {
  onChange: null,
};

export default FormikSwitch;
