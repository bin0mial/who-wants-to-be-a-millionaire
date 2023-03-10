import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import { useContext } from 'react';
import GameSettingsContext from 'contexts/GameSettingsContext';
import FormikSwitch from 'components/Shared/Form/FormikSwitch/FormikSwitch';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga4';
import AppSettingsValidationSchema from './AppSettingsValidationSchema';

const AppSettings = ({ submitRef, setShowModal }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'homepage.settings' });
  const { updateSettings, gameSettings } = useContext(GameSettingsContext);

  const onSubmit = (values) => {
    ReactGA.event({
      category: 'gameSettings',
      action: 'Update game settings',
      label: 'Update settings Button',
    });
    updateSettings(values);
    setShowModal(false);
  };

  const conflicts = {
    stopGameLose: ['continueGameWrongAnswer'],
    continueGameWrongAnswer: ['stopGameLose'],
  };
  const onChange = (handleChange, setFieldValue) => (e) => {
    if (e.target.value !== 'true' && conflicts[e.target.name]) {
      conflicts[e.target.name].forEach((conflictName) => {
        setFieldValue(conflictName, false);
      });
    }
    handleChange(e);
  };

  return (
    <div className="row w-100">
      <Formik
        innerRef={submitRef}
        initialValues={{ ...gameSettings }}
        validationSchema={AppSettingsValidationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, handleChange, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            {Object.keys(gameSettings).map((setting) => (
              <FormikSwitch
                key={`app-settings-${setting}`}
                name={setting}
                label={t(setting)}
                onChange={onChange(handleChange, setFieldValue)}
              />
            ))}
          </Form>
        )}
      </Formik>
    </div>
  );
};

AppSettings.propTypes = {
  submitRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Object) }),
  ]).isRequired,
  setShowModal: PropTypes.func,
};

AppSettings.defaultProps = {
  setShowModal: () => {},
};

export default AppSettings;
