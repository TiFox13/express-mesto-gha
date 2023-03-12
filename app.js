const { PORT = 3000 } = process.env;
const express = require('express');
const mongoose = require('mongoose')
const bodyParse = require('body-parser');
const path = require('path');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');


mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const app = express();

// app.use(express.static(path.join((__dirname, ''))));   //можно удалить. статические файлы не юзаютс в проекте
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }))

app.use((req, res, next) => {
  req.user = {
    _id: '64070a5146ec33d6e543d735'// _id созданного тест пользователя (хардкод)
  };
  next();
});

app.use(usersRouter);
app.use(cardsRouter);

app.use((req, res) => {
  res.status(404).send({ message: "Страницы по данному адресу не существует" });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})