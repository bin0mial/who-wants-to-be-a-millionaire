import { useContext, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { QuestionPasswordContext } from 'contexts/QuestionContext';
import GeneralModal from 'components/Shared/Modals/GeneralModal';
import UnlockPasswordModal from 'components/Shared/Modals/UnlockPasswordModal/UnlockPasswordModal';
import CustomQuestions from './CustomQuestions';

const CustomQuestionsModal = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'questions.form.modal' });
  const [showModal, setShowModal] = useState(false);
  const [submitActions, setSubmitActions] = useState([]);
  const [action, setAction] = useState(null);
  const { questionsPassword, unlockPasswordQuestions } = useContext(QuestionPasswordContext);
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

  const unlockQuestionsAction = (password) => unlockPasswordQuestions(password);

  return (
    <div className="d-flex justify-content-center">
      {questionsPassword.isLocked
        ? <UnlockPasswordModal show={showModal} unlockAction={unlockQuestionsAction} setShow={setShowModal} /> : (
          <GeneralModal show={showModal} setShow={setShowModal} headerText={t('title')} actions={submitButton}>
            <CustomQuestions
              submitRef={submitRef}
              setShowModal={setShowModal}
              setSubmitActions={setSubmitActions}
              currentAction={action}
            />
          </GeneralModal>
        )}

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
