const validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUrlInput(data) {
  let errors = {};

  data.url = !isEmpty(data.url) ? data.url : "";

  if (validator.isEmpty(data.url)) {
    errors.url = "URL link is required";
  } else if (!validator.isURL(data.url)) {
    errors.url = "You must enter a valid URL";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
