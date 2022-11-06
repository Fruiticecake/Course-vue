const joi = require("joi");

const userName = joi
  .string()
  .pattern(/^[\s](1,6)$/)
  .required();
const password = joi
  .string()
  .pattern(/^[\s](6,12)$/)
  .required();

exports.userCheck = {
  body: {
    userName,
    password,
  },
};
