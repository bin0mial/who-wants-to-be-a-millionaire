import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import GeneralModal from '../GeneralModal';
import UnlockPassword from './UnlockPassword';

const UnlockPasswordModal = ({
  show, setShow, headerText, unlockAction, isAppModal,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' });
  const submitRef = useRef();

  const submitButton = (
    <Button onClick={() => { submitRef.current.handleSubmit(); }} variant="primary">{t('unlock')}</Button>
  );

  return (
    <GeneralModal
      show={show}
      setShow={setShow}
      isAppModal={isAppModal}
      actions={submitButton}
      headerText={headerText || (
      <>
        <span>{t('lockedContent')}</span>
        <FontAwesomeIcon icon={faLock} className="text-primary mx-2" />
      </>
      )}
    >
      <UnlockPassword unlockAction={unlockAction} submitRef={submitRef} />
    </GeneralModal>
  );
};

UnlockPasswordModal.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  headerText: PropTypes.string,
  unlockAction: PropTypes.func.isRequired,
  isAppModal: PropTypes.bool,
};

UnlockPasswordModal.defaultProps = {
  headerText: null,
  isAppModal: false,
};

export default UnlockPasswordModal;
