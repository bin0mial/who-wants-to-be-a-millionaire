import * as Yup from 'yup';
import validationMessages from 'helpers/validationMessages';

const CustomQuestionsValidationSchema = Yup.object().shape({
  questions: Yup.array().min(1, validationMessages.minNumber(1))
    .max(15, validationMessages.maxNumber(15)).of(Yup.object().shape({
      id: Yup.number().typeError(validationMessages.invalidNumber()).required(validationMessages.requiredField),
      question: Yup.string().required(validationMessages.requiredField).max(250, validationMessages.maxChars(250)),
      options: Yup.object().shape(['a', 'b', 'c', 'd'].reduce(
        (acc, key) => Object.assign(
          acc,
          { [key]: Yup.string().required(validationMessages.requiredField).max(100, validationMessages.maxChars(100)) },
        ),
        {},
      )),
      answer: Yup.string().required(validationMessages.requiredField),
    })),
});

export default CustomQuestionsValidationSchema;
