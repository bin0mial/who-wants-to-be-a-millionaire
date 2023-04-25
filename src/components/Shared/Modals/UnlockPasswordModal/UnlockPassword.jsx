import { Formik } from 'formik';
import FormikPasswordInput from 'components/Shared/Form/FormikInput/FormikPasswordInput';
import validationMessages from 'helpers/validationMessages';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import UnlockPasswordModalValidationSchema from './UnlockPasswordModalValidationSchema';

const UnlockPassword = ({ unlockAction, submitRef }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' });
  const onSubmit = (values, { setErrors }) => {
    if (!unlockAction(values.password)) {
      setErrors({ password: validationMessages.invalidPassword() });
    }
  };

  return (
    <Formik
      initialValues={{ password: '' }}
      innerRef={submitRef}
      onSubmit={onSubmit}
      validationSchema={UnlockPasswordModalValidationSchema}
    >
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <p>{t('lockedContentDescription')}</p>
          <FormikPasswordInput name="password" />
        </form>
      )}
    </Formik>
  );
};

UnlockPassword.propTypes = {
  unlockAction: PropTypes.func.isRequired,
  submitRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Object) }),
  ]).isRequired,
};

export default UnlockPassword;
