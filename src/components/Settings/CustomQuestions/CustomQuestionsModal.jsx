import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import CustomQuestions from './CustomQuestions';
import GeneralModal from '../../Shared/Modals/GeneralModal';

const CustomQuestionsModal = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'questions.form.modal' });
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="d-flex justify-content-center">
      <GeneralModal show={showModal} setShow={setShowModal} headerText={t('title')}>
        <CustomQuestions />
      </GeneralModal>
      <Button
        variant="success"
        type="button"
        className="mb-3"
        onClick={() => setShowModal(true)}
      >
        {t('addQuestions')}
      </Button>
    </div>
  );
};

export default CustomQuestionsModal;
