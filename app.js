const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const formController = require('./controllers/formController');

dotenv.config({ path: './config.env' });

const app = express();

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

//MIDDLEWARE
app.use(express.static(`${__dirname}/public`));

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Connection error', error));

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submit-form', (req, res) => {
  formController.createFormEntry(req, res);
  res.sendFile(__dirname + '/public/formSubmissionSuccess.html');
});

module.exports = app;
