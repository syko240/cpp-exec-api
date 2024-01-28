const express = require('express');
const router = express.Router();
const executeDocker = require('../utils/dockerExec');
const validateCode = require('../utils/validateCode');

router.post('/', async (req, res) => {
  const cppCode = req.body.code;

  try {
    const validatedCode = await validateCode(cppCode);
    const output = await executeDocker(validatedCode);
    res.send(`Output:\n${output}`);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

module.exports = router;