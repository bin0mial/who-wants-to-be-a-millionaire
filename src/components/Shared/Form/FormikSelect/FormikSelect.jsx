import { Field } from 'formik';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const FormikSelect = ({ name, label, options }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' });
  return (
    <Field name={name}>
      {/* eslint-disable-next-line no-unused-vars */}
      {({ field }) => (
        <div className="my-3">
          <Form.Label htmlFor={name}>{label}</Form.Label>
          <Form.Select
            {...field}
            id={name}
          >
            <option value="" disabled>{t('defaultSelect')}</option>
            {options.map(({ display, key }) => (
              <option key={key} value={key}>{display}</option>
            ))}
          </Form.Select>
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
};

export default FormikSelect;
