const express = require('express');
const router = express.Router();
const executeDocker = require('../utils/dockerExec');

router.post('/', (req, res) => {
  const cppCode = req.body.code;

  if (!cppCode || cppCode.length === 0) {
    return res.status(400).send('Error: Code is empty');
  }

  if (cppCode.length > 1000) {
    return res.status(400).send('Error: Code is too long');
  }

  executeDocker(cppCode)
    .then(output => res.send(`Output:\n${output}`))
    .catch(err => res.status(500).send(`Error: ${err.message}`));
});

module.exports = router;
