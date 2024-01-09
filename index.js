const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const tempDir = path.join(__dirname, 'temp_executables');

const executionTimeout = 10000;
const cpuLimit = "1.0";
const memoryLimit = "100m";

if (!fs.existsSync(tempDir)){
    fs.mkdirSync(tempDir);
}

app.get('/', (req, res) => {
  res.send('CPP Execution API');
});

app.post('/execute', (req, res) => {
  const cppCode = req.body.code;

  if (!cppCode || cppCode.length === 0) {
    return res.status(400).send('Error: Code is empty');
  }

  if (cppCode.length > 1000) {
    return res.status(400).send('Error: Code is too long');
  }

  const codeFileName = path.join(tempDir, `temp_${uuidv4()}.cpp`);
  const executableName = path.join(tempDir, `temp_${uuidv4()}`);

  fs.writeFileSync(codeFileName, cppCode);

  const dockerCommand = `docker run --rm --cpus="${cpuLimit}" --memory="${memoryLimit}" -v "${tempDir}":/usr/src/app cpp-exec-env /bin/bash -c "g++ /usr/src/app/${path.basename(codeFileName)} -o /usr/src/app/${path.basename(executableName)} && /usr/src/app/${path.basename(executableName)}"`;

  exec(dockerCommand, { timeout: executionTimeout }, (error, stdout, stderr) => {
    if (error) {
      if (error.killed && error.signal === 'SIGTERM') {
        return res.status(408).send('Error: Execution timed out');
      }
      if (error.code === 137) {
        return res.status(500).send('Error: Memory limit exceeded');
      }
      if (error.code === 139) {
        return res.status(500).send('Error: Segmentation fault');
      }
      console.error(`Execution error: ${error}`);
      return res.status(500).send(`Error: ${error.message}`);
    }
    if (stderr) {
      console.error(`Error: ${stderr}`);
      return res.status(400).send(`Compile/Runtime Error: ${stderr}`);
    }

    res.send(`Output:\n${stdout}`);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
