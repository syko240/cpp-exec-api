function validateCode(cppCode) {
    return new Promise((resolve, reject) => {
        if (!cppCode || cppCode.length === 0 || cppCode.length > 1000) {
            reject(new Error('Code is empty or too long.'));
        } else if (containsDangerousPatterns(cppCode)) {
            reject(new Error('Unsafe code submitted.'));
        } else if (isResourceAbusive(cppCode)) {
            reject(new Error('Unsafe code submitted.'));
        } else {
            resolve(cppCode);
        }
    });
}

module.exports = validateCode;

function containsDangerousPatterns(cppCode) {
    const patterns = [
        /system\s*\([^)]*\)/,
        /std::(ifstream|ofstream|fstream)\b/,
        /<filesystem>/,
        /std::filesystem::/,
        /\bfork\s*\(/,
        /\bexec[lv]?p?\s*\(/,
        /\bpopen\s*\(/,
        /\bchmod\s*\(/,
        /<csignal>/,
        /std::signal\s*\(/,
        /malloc\s*\(/,
        /calloc\s*\(/,
        /realloc\s*\(/,
        /strcpy\s*\(/,
        /strcat\s*\(/,
    ];
    return patterns.some(pattern => pattern.test(cppCode));
}

function isResourceAbusive(cppCode) {
    const patterns = [
        /while\s*\(\s*true\s*\)\s*{[^}]*}/,
        /for\s*\(\s*;\s*;\s*\)\s*{[^}]*}/,
        /malloc\s*\(\s*[1-9]\d{7,}\s*\)/,
        /new\s+(char|std::\w+)\s*\[\s*[1-9]\d{7,}\s*\]/,
        /\bstd::thread\s*\(/,
        /std::thread/,
        /\bstd::async\s*\(/,
        /std::net::/,
        /socket\s*\(/,
        /std::remove\s*\(/,
        /std::rename\s*\(/,
        /std::getenv\s*\(/,
        /std::putenv\s*\(/,
        /std::setenv\s*\(/,
        /std::unsetenv\s*\(/,
        /std::system_category\s*\(/,
    ];
    return patterns.some(pattern => pattern.test(cppCode));
}
