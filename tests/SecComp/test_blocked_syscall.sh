#!/bin/bash

# attempt to use the restricted 'unshare' system call
cppCode="#include <sched.h>\\n#include <iostream>\\n#include <cstring>\\n#include <cerrno>\\nint main() { if (unshare(CLONE_NEWNET) == -1) { std::cerr << \\\"Unshare failed: \\\" << std::strerror(errno) << '\\\\n'; return 1; } else { std::cout << \\\"Unshare succeeded\\\\n\\\"; } return 0; }"

curl -X POST http://localhost/execute \
    -H "Content-Type: application/json" \
    -d "{\"code\":\"$cppCode\"}"
echo ""