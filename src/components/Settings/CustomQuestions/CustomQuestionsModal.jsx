import { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import CustomQuestions from './CustomQuestions';
import GeneralModal from '../../Shared/Modals/GeneralModal';

const CustomQuestionsModal = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'questions.form.modal' });
  const [showModal, setShowModal] = useState(false);
  const [submitActions, setSubmitActions] = useState([]);
  const [action, setAction] = useState(null);
  const submitRef = useRef();

  const submitButton = (
    <div className="row w-100">
      {submitActions.map(({ actionName, actionDisplay, btnVariant }) => (
        <div key={`customQuestion.${actionName}Button`} className="col-sm-12 col-md-12 col-lg-4 pb-2">
          <Button
            className={`btn btn-${btnVariant} w-100`}
            onClick={() => {
              setAction(actionName);
              submitRef.current.handleSubmit();
            }}
          >
            {actionDisplay}
          </Button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="d-flex justify-content-center">
      <GeneralModal show={showModal} setShow={setShowModal} headerText={t('title')} actions={submitButton}>
        <CustomQuestions
          submitRef={submitRef}
          setShowModal={setShowModal}
          setSubmitActions={setSubmitActions}
          currentAction={action}
        />
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
