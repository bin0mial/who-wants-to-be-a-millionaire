import { Form, InputGroup } from 'react-bootstrap';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import FormikErrorMessage from '../FormikErrorMessage/FormikErrorMessage';
import './FormikInput.css';

const FormikInput = ({
  name, label, type, showError, disabled, inputGroup, removeMargin, children,
}) => {
  const Wrapper = inputGroup ? InputGroup : Form.Group;
  const Label = inputGroup ? InputGroup.Text : Form.Label;

  return (
    <Field name={name}>
      {({ field, meta }) => (
        <div className={removeMargin ? '' : 'mb-3'}>
          <Wrapper>
            <Label htmlFor={name}>{label}</Label>
            <Form.Control type={type} id={name} {...field} isInvalid={meta.touched && meta.error} disabled={disabled} />
            {children}
          </Wrapper>
          {showError && <FormikErrorMessage name={name} />}
        </div>
      )}
    </Field>
  );
};

FormikInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['text', 'number', 'password']),
  showError: PropTypes.bool,
  disabled: PropTypes.bool,
  inputGroup: PropTypes.bool,
  removeMargin: PropTypes.bool,
  children: PropTypes.node,
};

FormikInput.defaultProps = {
  type: 'text',
  showError: true,
  disabled: false,
  inputGroup: false,
  removeMargin: false,
  children: null,
};

export default FormikInput;
