import { Form, InputGroup } from 'react-bootstrap';
import { Field } from 'formik';
import PropTypes from 'prop-types';
import { useState } from 'react';
import FormikErrorMessage from '../FormikErrorMessage/FormikErrorMessage';
import './FormikHotkeyInput.css';

const MODIFIER_KEYS = new Set(['Shift', 'Control', 'Alt', 'Meta']);

const buildComboString = (e) => {
  const parts = [];
  if (e.ctrlKey) parts.push('Ctrl');
  if (e.altKey) parts.push('Alt');
  if (e.shiftKey) parts.push('Shift');
  if (e.metaKey) parts.push('Meta');

  const key = e.key.length === 1 ? e.key.toUpperCase() : e.key;
  if (!MODIFIER_KEYS.has(key)) {
    parts.push(key);
  }
  return parts.join('+');
};

const FormikHotkeyInput = ({
  name, label, showError, disabled,
}) => {
  const [recording, setRecording] = useState(false);

  return (
    <Field name={name}>
      {({ field, form, meta }) => {
        const onKeyDown = (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (MODIFIER_KEYS.has(e.key)) return;
          const combo = buildComboString(e);
          form.setFieldValue(name, combo);
          setRecording(false);
          e.target.blur();
        };

        return (
          <div className="mb-3">
            <InputGroup>
              <InputGroup.Text htmlFor={name}>{label}</InputGroup.Text>
              <Form.Control
                id={name}
                type="text"
                readOnly
                value={recording ? '...' : field.value}
                onFocus={() => setRecording(true)}
                onBlur={() => setRecording(false)}
                onKeyDown={onKeyDown}
                isInvalid={meta.touched && meta.error}
                disabled={disabled}
                className={`hotkey-input${recording ? ' hotkey-recording' : ''}`}
              />
            </InputGroup>
            {showError && <FormikErrorMessage name={name} />}
          </div>
        );
      }}
    </Field>
  );
};

FormikHotkeyInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  showError: PropTypes.bool,
  disabled: PropTypes.bool,
};

FormikHotkeyInput.defaultProps = {
  showError: true,
  disabled: false,
};

export { buildComboString };
export default FormikHotkeyInput;
