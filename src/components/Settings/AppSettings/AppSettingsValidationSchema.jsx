import * as Yup from 'yup';
import validationMessages from 'helpers/validationMessages';

const AppSettingsValidationSchema = Yup.object().shape({
  stopGameLose: Yup.bool().required(validationMessages.requiredField),
  continueGameWrongAnswer: Yup.bool().required(validationMessages.requiredField),
  enableSounds: Yup.bool().required(validationMessages.requiredField),
  enableTimer: Yup.bool().required(validationMessages.requiredField),
  timerCountDown: Yup.number()
    .typeError(validationMessages.invalidNumber)
    .integer(validationMessages.mustBeIntegerNumber)
    .min(1, validationMessages.minNumber(1))
    .max(999, validationMessages.maxNumber(999)),
});

export default AppSettingsValidationSchema;
