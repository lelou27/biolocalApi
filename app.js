import express from 'express';
import bodyParser from 'body-parser';

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

app.use(require('./app/routes/UserRoutes'));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
