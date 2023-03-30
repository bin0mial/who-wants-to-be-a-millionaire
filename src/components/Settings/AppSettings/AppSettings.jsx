import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import { useContext, useRef } from 'react';
import GameSettingsContext from 'contexts/GameSettingsContext';
import FormikSwitch from 'components/Shared/Form/FormikSwitch/FormikSwitch';
import FormikInput from 'components/Shared/Form/FormikInput/FormikInput';
import PropTypes from 'prop-types';
import ReactGA from 'react-ga4';
import AppSettingsValidationSchema from './AppSettingsValidationSchema';
import './AppSettings.css';

const AppSettings = ({ submitRef, setShowModal }) => {
  const { t } = useTranslation('settings', { keyPrefix: 'settings' });
  const {
    updateSettings, gameSettings, switchSettings, inputSettings, dependentChildren,
  } = useContext(GameSettingsContext);
  const taken = useRef([]);

  const nonSwitchSettings = {};

  inputSettings.forEach(({ name, type }) => {
    nonSwitchSettings[name] = {
      Component: FormikInput,
      props: {
        name,
        type,
        label: t(name),
      },
    };
  });

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
        {({
          values, handleSubmit, handleChange, setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            {switchSettings.map((setting) => (
              <>
                <FormikSwitch
                  key={`app-settings-${setting}`}
                  name={setting}
                  label={t(setting)}
                  onChange={onChange(handleChange, setFieldValue)}
                />
                {dependentChildren[setting] && (
                  <div className={`setting-dependent-child${!values[setting] ? ' d-none' : ''}`}>
                    {dependentChildren[setting].map((dependent) => {
                      taken.current.push(dependent);
                      const { Component, props } = nonSwitchSettings[dependent];
                      return <Component key={`app-settings-${dependent}`} {...props} disabled={!values[setting]} />;
                    })}
                  </div>
                )}
              </>
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
