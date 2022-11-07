const joi = require("joi");

const userName = joi
  .string()
  .pattern(/^[\S]{1,6}$/)
  .required();
const password = joi
  .string()
  .pattern(/^[\S]{6,12}$/)
  .required();

exports.userCheck = {
  body: {
    userName,
    password,
  },
};

const category = joi.string().required();
const page = joi.number().integer().required();
const size = joi.number().integer().required();

exports.courseCheck = {
  query: {
    category,
    page,
    size,
  },
};

const title = joi.string();
const price = joi.number();
const id = joi.number().integer().required();

exports.updateCheck = {
  query: {
    title,
    price,
    id,
  },
};

exports.deleteCheck = {
  query: {
    id,
  },
};
