const mongoose = require('mongoose');
const validator = require('validator')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Поле "email" должно быть email-адресом',
    },
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто'
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь'
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
       return /https?\:\/{2,}w{0,3}[a-zA-Z0-9]/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }) // this — это модель User
  .then((user) => {
    // не нашёлся — отклоняем промис
    if (!user) {
      return Promise.reject(new Error('Неправильные почта или пароль'));
    }
      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password)
        .then ((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        })
    })

};


module.exports = mongoose.model('user', userSchema);
