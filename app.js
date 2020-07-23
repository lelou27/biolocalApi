import express from 'express';
import bodyParser from 'body-parser';

const PORT = 5000;
const mongoose = require('mongoose');
const dbConf = require('./config/db/dbConf')

mongoose.connect(
    dbConf.connectionString,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(require('./app/routes/routes'));

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
