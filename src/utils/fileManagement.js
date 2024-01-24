const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const tempDir = '/usr/src/app/temp_executables';

const createTempFile = (extension) => {
    const filename = `temp_${uuidv4()}${extension}`;
    const filepath = path.join(tempDir, filename);

    return filepath;
};

const writeToFile = (filepath, data) => {
    fs.writeFileSync(filepath, data, { mode: 0o666 });
};

const deleteFile = (filepath) => {
    try {
        fs.unlinkSync(filepath);
    } catch (err) {
        console.error(`Error deleting file: ${err}`);
    }
};

module.exports = {
    createTempFile,
    writeToFile,
    deleteFile,
    tempDir
};
