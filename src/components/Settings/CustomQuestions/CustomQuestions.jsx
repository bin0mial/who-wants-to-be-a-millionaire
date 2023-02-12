import { FieldArray, Formik } from 'formik';
import { Button } from 'react-bootstrap';
import FormikInput from 'components/Shared/Form/FormikInput/FormikInput';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import FormikSelect from '../../Shared/Form/FormikSelect/FormikSelect';

const CustomQuestions = () => {
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'questions' });
  const answerKeys = ['a', 'b', 'c', 'd'];
  const answerOptions = answerKeys.map((key) => ({ key, display: t(`choices.${key}`) }));
  return (
    <Formik initialValues={{
      questions: [{
        id: 1,
        question: '',
        options: answerKeys.reduce((acc, key) => Object.assign(acc, { [key]: '' }), {}),
        answer: '',
      }],
    }}
    >
      {({ values, initialValues }) => (
        <form>
          <FieldArray name="questions">
            {({ push, remove }) => (
              <div className="create-questions">
                {values.questions.map((value, index) => (
                  <div key={value.id} className="create-question mb-3 p-2">
                    <Button
                      className={`btn btn-danger m-2 ${i18n.dir() === 'rtl' ? 'float-start' : 'float-end'}`}
                      onClick={() => { remove(index); }}
                    >
                      <FontAwesomeIcon icon={faMinusCircle} />
                    </Button>
                    <div>
                      {t('form.questionNumber', { number: index + 1 })}
                    </div>
                    <FormikInput name={`questions.${index}.question`} label={t('form.question')} />
                    <div className="create-options p-3">
                      {answerOptions.map((option) => (
                        <FormikInput
                          // eslint-disable-next-line react/no-array-index-key
                          key={`${index}.${option.key}`}
                          name={`questions.${index}.options.${option.key}`}
                          label={option.display}
                        />
                      ))}
                    </div>
                    <FormikSelect label={t('form.answer')} name={`questions.${index}.answer`} options={answerOptions} />
                  </div>
                ))}
                <Button
                  onClick={() => {
                    const clonedQuestion = structuredClone(initialValues.questions[0]);
                    if (values.questions.length >= 1) {
                      clonedQuestion.id = Math.max(...values.questions.map((o) => o.id)) + 1;
                    }
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

export default CustomQuestions;
