const mongoose = require('mongoose');
const { Joi } = require('celebrate');

function method(value, helpers) {
  if (mongoose.isObjectIdOrHexString(value)) {
    return (value);
  }
  return helpers.message('not Id');
}

const idValidator = Joi.string().custom(method, 'custom id validation');

module.exports = { idValidator };
