const mongoose = require('mongoose');
const { Joi } = require('celebrate');


const method = (value, helpers) => {
if (mongoose.isObjectIdOrHexString(new mongoose.Types.ObjectId())) {
  return;
} else {
  return helpers.message('not Id')
}
}

const idValidator = Joi.string().custom(method, 'custom id validation');
module.exports = idValidator;