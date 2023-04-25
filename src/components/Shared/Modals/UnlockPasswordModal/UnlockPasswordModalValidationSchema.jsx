import * as Yup from 'yup';
import validationMessages from 'helpers/validationMessages';

const UnlockPasswordModalValidationSchema = Yup.object().shape({
  password: Yup.string().trim().required(validationMessages.requiredField),
});

export default UnlockPasswordModalValidationSchema;
