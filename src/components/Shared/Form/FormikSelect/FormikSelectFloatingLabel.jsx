import { Field } from 'formik';
import PropTypes from 'prop-types';
import { FloatingLabel, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import FormikErrorMessage from '../FormikErrorMessage/FormikErrorMessage';

const FormikSelect = ({
  name, label, options, showError,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' });
  return (
    <Field name={name}>
      {({ field, meta }) => (
        <div className="my-3">
          <FloatingLabel controlId={name} label={label}>
            <Form.Select
              {...field}
              id={name}
              isInvalid={meta.touched && meta.error}
            >
              <option value="" disabled>{t('defaultSelect')}</option>
              {options.map(({ display, key }) => (
                <option key={key} value={key}>{display}</option>
              ))}
            </Form.Select>
          </FloatingLabel>
          {showError && <FormikErrorMessage name={name} />}
        </div>
      )}
    </Field>
  );
};

FormikSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      display: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    }),
  ).isRequired,
  showError: PropTypes.bool,
};

FormikSelect.defaultProps = {
  showError: true,
};

export default FormikSelect;
