import { Field } from 'formik';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import FormikErrorMessage from '../FormikErrorMessage/FormikErrorMessage';

const FormikSwitch = ({
  name, label, onChange, showError,
}) => (
  <Field name={name}>
    {({ field }) => (
      <>
        <Form.Check
          type="switch"
          id={name}
          label={label}
          checked={!!field.value}
          {...field}
          {...(onChange && { onChange })}
        />
        {showError && <FormikErrorMessage name={name} />}
      </>
    )}
  </Field>
);

FormikSwitch.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  showError: PropTypes.bool,
};

FormikSwitch.defaultProps = {
  onChange: null,
  showError: true,
};

export default FormikSwitch;
