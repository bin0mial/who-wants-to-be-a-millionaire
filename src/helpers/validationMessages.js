const validationMessages = {
  // General Required Field
  requiredField: () => ({ key: 'validations:required' }),

  // General Invalid
  invalid: (name) => ({ key: 'validations:invalid', values: { name } }),

  // Numbers
  invalidNumber: () => ({ key: 'validations:invalidNumber' }),

  // Characters
  minChars: (min) => ({ key: 'validations:tooShort', values: { min } }),
  maxChars: (max) => ({ key: 'validations:tooLong', values: { max } }),

  // Selects
  invalidSelect: () => ({ key: 'validations:select' }),
};

export default validationMessages;
