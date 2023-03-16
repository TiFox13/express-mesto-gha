const { PORT = 3000 } = process.env;
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParse = require('body-parser');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(cors({ origin: 'http://localhost:3001' }))
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

app.use(usersRouter);
app.use(cardsRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Страницы по данному адресу не существует' });
});

app.listen(PORT, () => {
  // console.log(`App listening on port ${PORT}`);
});
