import { FieldArray, Formik } from 'formik';
import { Button } from 'react-bootstrap';
import FormikInput from 'components/Shared/Form/FormikInput/FormikInput';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect } from 'react';
import ReactGA from 'react-ga4';
import PropTypes from 'prop-types';
import QuestionContext from 'contexts/QuestionContext';
import { exportObject } from 'helpers/export';
import { compressLZW } from 'helpers/compressors';
import storeQuestions from 'apis/firebase/questions/storeQuestions';
import FirebaseContext from 'contexts/FirebaseContext';
import AppModalContext from 'contexts/AppModalContext';
import CopyButton from 'components/Shared/Buttons/CopyButton';
import FormikSelectFloatingLabel from 'components/Shared/Form/FormikSelect/FormikSelectFloatingLabel';
import CustomQuestionsValidationSchema from './CustomQuestionsValidationSchema';
import FormikInputFloatingLabel from '../../Shared/Form/FormikInput/FormikInputFloatingLabel';

const CustomQuestions = ({
  submitRef, setShowModal, setSubmitActions, currentAction,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'questions' });
  const answerKeys = ['a', 'b', 'c', 'd'];
  const answerOptions = answerKeys.map((key) => ({ key, display: t(`choices.${key}`) }));
  const {
    questions, setQuestions, isCustom, setIsCustom,
  } = useContext(QuestionContext);
  const { db } = useContext(FirebaseContext);
  const { showAppModal } = useContext(AppModalContext);

  const submitObj = {
    submit: (values) => {
      ReactGA.event({
        category: 'gameQuestions',
        action: 'Create custom game questions',
      });
      setQuestions(values.questions);
      setShowModal(false);
      setIsCustom(true);
    },
    download: (values) => {
      ReactGA.event({
        category: 'gameQuestions',
        action: 'Download custom game questions',
      });
      exportObject(values.questions, compressLZW);
    },
    share: ((values) => {
      const postStore = (resultId) => {
        const shareUrl = `${window.location.origin}?shareId=${resultId}`;
        showAppModal(
          t('shareLink'),
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column justify-content-center bg-light rounded-5 p-2">
              <span>{shareUrl}</span>
            </div>
            <div>
              <CopyButton text={shareUrl} />
            </div>
          </div>,
        );
        setShowModal(false);
      };
      storeQuestions({ db, questions: compressLZW(JSON.stringify(values.questions)).output }, { postStore });
    }),
  };

  const onSubmit = (...submitValues) => {
    submitObj[currentAction](...submitValues);
  };

  useEffect(() => {
    const actions = Object.keys(submitObj).map((action) => ({
      actionName: action,
      actionDisplay: t(`form.${action}.text`),
      btnVariant: t(`form.${action}.btnVariant`),
    }));
    setSubmitActions(actions);
  }, []);

  return (
    <Formik
      innerRef={submitRef}
      onSubmit={onSubmit}
      initialValues={{
        questions: isCustom ? questions : [{
          id: 1,
          question: '',
          options: answerKeys.reduce((acc, key) => Object.assign(acc, { [key]: '' }), {}),
          answer: '',
        }],
      }}
      validationSchema={CustomQuestionsValidationSchema}
    >
      {({ values, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <FieldArray name="questions">
            {({ push, remove }) => (
              <div className="create-questions">
                {values.questions.map((value, index) => (
                  <div key={value.id} className="create-question mb-3 p-2">
                    <div className="d-flex justify-content-between">
                      <Button
                        className="btn btn-danger m-2 order-last"
                        onClick={() => { remove(index); }}
                      >
                        <FontAwesomeIcon icon={faMinusCircle} />
                      </Button>
                      <div className="d-flex align-self-center">
                        {t('form.questionNumber', { number: index + 1 })}
                      </div>
                    </div>
                    <FormikInputFloatingLabel name={`questions.${index}.question`} label={t('form.question')} />
                    <div className="create-options p-3">
                      {answerOptions.map((option) => (
                        <FormikInput
                          // eslint-disable-next-line react/no-array-index-key
                          key={`${index}.${option.key}`}
                          name={`questions.${index}.options.${option.key}`}
                          label={option.display}
                          inputGroup
                          removeMargin={option === answerOptions[answerOptions.length - 1]}
                        />
                      ))}
                    </div>
                    <FormikSelectFloatingLabel
                      label={t('form.answer')}
                      name={`questions.${index}.answer`}
                      options={answerOptions}
                      inputGroup
                    />
                  </div>
                ))}
                <Button
                  onClick={() => {
                    const clonedQuestion = {
                      id: Math.max(...values.questions.map((o) => o.id)) + 1,
                      question: '',
                      options: answerKeys.reduce((acc, key) => Object.assign(acc, { [key]: '' }), {}),
                      answer: '',
                    };
                    push(clonedQuestion);
                  }}
                  className="w-100"
                >
                  <FontAwesomeIcon icon={faPlusCircle} />
                </Button>
              </div>
            )}
          </FieldArray>
        </form>
      )}
    </Formik>
  );
};

CustomQuestions.propTypes = {
  submitRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Object) }),
  ]).isRequired,
  setShowModal: PropTypes.func,
  setSubmitActions: PropTypes.func.isRequired,
  currentAction: PropTypes.string,
};

CustomQuestions.defaultProps = {
  setShowModal: () => {},
  currentAction: null,
};

export default CustomQuestions;
