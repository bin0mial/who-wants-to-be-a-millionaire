import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import './GeneralModal.css';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const GeneralModal = ({
  show, setShow, headerText, actions, children, isAppModal, ...props
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'common' });

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className={isAppModal ? 'app-modal' : ''}
      size="lg"
      {...props}
    >
      {headerText && (
        <Modal.Header className="d-flex justify-content-between">
          <Modal.Title id="contained-modal-title-vcenter">
            {headerText}
          </Modal.Title>
          <Button type="button" onClick={() => setShow(false)} variant="light">
            <FontAwesomeIcon icon={faClose} />
          </Button>
        </Modal.Header>
      )}
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        {actions}
        <Button className="btn btn-dark" onClick={() => setShow(false)}>{t('close')}</Button>
      </Modal.Footer>
    </Modal>
  );
};

GeneralModal.propTypes = {
  headerText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  isAppModal: PropTypes.bool,
  actions: PropTypes.node,
  children: PropTypes.node,
};

GeneralModal.defaultProps = {
  headerText: '',
  actions: null,
  children: null,
  isAppModal: false,
};

export default GeneralModal;
