import { Trans, useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import LanguageChanger from './LanguageChanger';
import './Homepage.css';

const Homepage = ({ setGameStarted }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'homepage' });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    setGameStarted(true);
  };

  return (
    <div className="d-flex flex-column h-100 w-100 justify-content-center align-items-center text-dark">
      <LanguageChanger />
      <div className="img-thumbnail home-form">
        <div className="row mb-4">
          <div className="col-12">
            <h2>{t('appName')}</h2>
            <div>{t('aboutApp')}</div>
          </div>
        </div>
        <Formik initialValues={{}} onSubmit={onSubmit}>
          {({ handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
              <h3>{t('form.header')}</h3>
              <div>
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
      <div className="row fixed-bottom text-center text-white">
        <div className="col-12 mb-2">
          <Trans
            i18nKey="homepage.footer"
            values={{ githubUser: '@bin0mial', appName: t('appName') }}
            components={{
              1: <a href="https://github.com/bin0mial">Github</a>,
              3: <a href="https://github.com/bin0mial/who-wants-to-be-a-millionaire">Github Repo</a>,
            }}
          />
        </div>
      </div>
    </div>
  );
};

Homepage.propTypes = {
  setGameStarted: PropTypes.func.isRequired,
};

export default Homepage;
