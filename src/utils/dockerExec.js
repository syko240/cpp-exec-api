const { exec } = require('child_process');
const path = require('path');
const fileManagement = require('./fileManagement');
const { v4: uuidv4 } = require('uuid');

const executionTimeout = 10000;
const cpuLimit = "1.0";
const memoryLimit = "100m";

const executeDocker = (cppCode) => {
    return new Promise((resolve, reject) => {
        const containerName = `cpp_exec_${uuidv4()}`;
        const codeFileName = fileManagement.createTempFile('.cpp');
        const executableName = fileManagement.createTempFile('');

        fileManagement.writeToFile(codeFileName, cppCode);

        const dockerCommand = `docker run --rm --name ${containerName} --cpus="${cpuLimit}" --memory="${memoryLimit}" -v "${fileManagement.tempDir}":/usr/src/app cpp-exec-env /bin/bash -c "g++ /usr/src/app/${path.basename(codeFileName)} -o /usr/src/app/${path.basename(executableName)} && /usr/src/app/${path.basename(executableName)}"`;

        exec(dockerCommand, { timeout: executionTimeout }, (error, stdout, stderr) => {
        if (error) {
            if (error.killed && error.signal === 'SIGTERM') {
                exec(`docker stop ${containerName}`, (stopError, stopStdout, stopStderr) => {
                    if (stopError) {
                    console.error(`Failed to stop container ${containerName}: ${stopError}`);
                    }
                });
                reject(new Error('Execution timed out'));
            } else {
                reject(error);
            }
        } else if (stderr) {
            reject(new Error(`Compile/Runtime Error: ${stderr}`));
        } else {
            resolve(stdout);
        }
        });
    });
};

module.exports = executeDocker;
