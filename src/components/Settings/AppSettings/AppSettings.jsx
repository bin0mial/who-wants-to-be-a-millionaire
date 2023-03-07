import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import { useContext } from 'react';
import GameSettingsContext from 'contexts/GameSettingsContext';
import FormikSwitch from 'components/Shared/Form/FormikSwitch/FormikSwitch';

// eslint-disable-next-line react/prop-types
const AppSettings = ({ submitRef, setShowModal }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'homepage.settings' });
  const { updateSettings, gameSettings } = useContext(GameSettingsContext);

  const onSubmit = (values) => {
    updateSettings(values);
    setShowModal(false);
  };

  return (
    <div className="row w-100">
      <Formik
        innerRef={submitRef}
        initialValues={{ ...gameSettings }}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormikSwitch name="stopGameLose" label={t('stopGameLose')} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AppSettings;
