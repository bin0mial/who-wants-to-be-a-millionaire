const validationMessages = {
  // General Required Field
  requiredField: () => ({ key: 'validations:required' }),

  // General Invalid
  invalid: (name) => ({ key: 'validations:invalid', values: { name } }),

  // Numbers
  invalidNumber: () => ({ key: 'validations:invalidNumber' }),
  minNumber: (min) => ({ key: 'validations:tooLow', values: { min } }),
  maxNumber: (max) => ({ key: 'validations:tooHigh', values: { max } }),
  mustBeIntegerNumber: () => ({ key: 'validations:integer' }),

  // Characters
  minChars: (min) => ({ key: 'validations:tooShort', values: { min } }),
  maxChars: (max) => ({ key: 'validations:tooLong', values: { max } }),

  // Selects
  invalidSelect: () => ({ key: 'validations:select' }),

  // Auth
  invalidPassword: () => ({ key: 'validations:invalidPassword' }),
};

export default validationMessages;
