const express = require('express');
const bodyParser = require('body-parser');
const executeRoute = require('./routes/execute');
const rateLimiter = require('./middleware/rateLimit');

const app = express();

app.use(bodyParser.json());
app.use(rateLimiter);

app.use('/execute', executeRoute);

app.get('/', (req, res) => {
  res.send('CPP Execution API');
});

module.exports = app;
