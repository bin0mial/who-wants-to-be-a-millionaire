import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import LanguageChanger from './LanguageChanger';

const Homepage = ({ setGameStarted }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'homepage' });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    setGameStarted(true);
  };

  return (
    <div className="d-flex flex-column h-100 w-100 justify-content-center align-items-center text-dark">
      <LanguageChanger />
      <Formik initialValues={{}} onSubmit={onSubmit}>
        {({ handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="img-thumbnail">
              <div className="mb-1">
                <Form.Label htmlFor="name">{t('form.yourName')}</Form.Label>
                <Form.Control type="text" id="name" />
              </div>

              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={isSubmitting}
              >
                {t('form.startGame')}
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

Homepage.propTypes = {
  setGameStarted: PropTypes.func.isRequired,
};

export default Homepage;
