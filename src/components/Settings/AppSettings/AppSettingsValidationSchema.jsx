import * as Yup from 'yup';
import validationMessages from 'helpers/validationMessages';

const AppSettingsValidationSchema = Yup.object().shape({
  stopGameLose: Yup.bool().required(validationMessages.requiredField),
  continueGameWrongAnswer: Yup.bool().required(validationMessages.requiredField),
});

export default AppSettingsValidationSchema;
