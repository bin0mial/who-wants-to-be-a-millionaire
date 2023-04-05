const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

const copyString = (text, onSuccess = () => {}, onFail = () => {}) => {
  navigator.clipboard.writeText(text).then(onSuccess, onFail);
};

export { capitalizeFirstLetter, copyString };
