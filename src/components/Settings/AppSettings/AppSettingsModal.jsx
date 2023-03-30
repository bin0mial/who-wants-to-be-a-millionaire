import { useTranslation } from 'react-i18next';
import { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import GeneralModal from 'components/Shared/Modals/GeneralModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears } from '@fortawesome/free-solid-svg-icons';
import AppSettings from './AppSettings';

const AppSettingsModal = () => {
  const { t } = useTranslation('settings');
  const [showModal, setShowModal] = useState(false);
  const submitRef = useRef();

  const submitButton = (
    <div>
      <Button
        className="btn btn-primary"
        onClick={() => {
          submitRef.current.handleSubmit();
        }}
      >
        Save
      </Button>
    </div>
  );

  return (
    <div className="d-flex justify-content-center">
      <GeneralModal show={showModal} setShow={setShowModal} headerText={t('title')} actions={submitButton}>
        <AppSettings submitRef={submitRef} setShowModal={setShowModal} />
      </GeneralModal>
      <Button variant="light" onClick={() => setShowModal(true)}>
        <FontAwesomeIcon icon={faGears} className="mx-1" />
        {t('label')}
      </Button>
    </div>
  );
};

export default AppSettingsModal;
