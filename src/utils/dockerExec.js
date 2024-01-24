const { exec } = require('child_process');
const path = require('path');
const fileManagement = require('./fileManagement');
const { v4: uuidv4 } = require('uuid');

const EXECUTION_TIMEOUT = 60000;
const CPU_LIMIT = "1.0";
const MEMORY_LIMIT = "100m";

const MAX_OUTPUT_LENGTH = 2000;
const TRUNCATION_MESSAGE = "\n[Output truncated due to length]";

const executeDocker = (cppCode) => {
    return new Promise((resolve, reject) => {
        const containerName = `cpp_exec_${uuidv4()}`;
        const codeFileName = fileManagement.createTempFile('.cpp');
        const executableName = fileManagement.createTempFile('');

        fileManagement.writeToFile(codeFileName, cppCode);

        const seccompProfilePath = path.join(__dirname, '..', '..', 'profiles', 'seccomp', 'profile.json');
        const dockerCommand = `docker run --rm --name ${containerName} \
            --security-opt apparmor=docker-default \
            --security-opt seccomp=${seccompProfilePath} \
            --cpus="${CPU_LIMIT}" \
            --memory="${MEMORY_LIMIT}" \
            --network none \
            -v cpp-exec-api_cpp-exec-files:/usr/src/app \
            cpp-exec-api-cpp-exec-env /bin/bash -c \
            "g++ /usr/src/app/${path.basename(codeFileName)} \
            -o /usr/src/app/${path.basename(executableName)} && \
            /usr/src/app/${path.basename(executableName)}"`;

        exec(dockerCommand, { timeout: EXECUTION_TIMEOUT }, (error, stdout, stderr) => {
            fileManagement.deleteFile(codeFileName);
            fileManagement.deleteFile(executableName);

            if (error) {
                console.error(`Execution error: ${error.message}`);

                let errorMessage = `Error: ${error.message}`;
                if (error.cmd) {
                    errorMessage = errorMessage.replace(error.cmd, "").trim();
                }
                if (error.killed && error.signal === 'SIGTERM') {
                    errorMessage = 'Error: Execution timed out';
                } else if (error.code === 137) {
                    errorMessage = 'Error: Memory limit exceeded';
                } else if (error.code === 139) {
                    errorMessage = 'Error: Segmentation fault';
                }
                exec(`docker ps -q -f name=${containerName}`, (psError, psStdout) => {
                    if (psStdout) {
                        exec(`docker stop ${containerName}`, (stopError) => {
                            if (stopError) {
                                console.error(`Failed to stop container ${containerName}: ${stopError}`);
                            }
                        });
                    }
                    if (psError) {
                        console.error(`Error checking for container ${containerName}: ${psError}`);
                    }
                });
                reject(new Error(errorMessage));
            } else if (stderr) {
                reject(new Error(`Compile/Runtime Error: ${stderr}`));
            } else {
                let output = stdout;
                if (stdout.length > MAX_OUTPUT_LENGTH) {
                    output = stdout.substring(0, MAX_OUTPUT_LENGTH) + TRUNCATION_MESSAGE;
                }
                resolve(output);
            }
        });
    });
};

module.exports = executeDocker;