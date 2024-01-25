#!/bin/bash

# attempt to access a restricted file (/etc/shadow)
cppCode="#include <fstream>\\n#include <iostream>\\n#include <string>\\nint main() { std::ifstream file(\\\"/etc/shadow\\\"); std::string line; if(file.is_open()) { while(getline(file, line)) { std::cout << line << '\\\\n'; } file.close(); } else std::cout << \\\"Unable to open file\\\\n\\\"; return 0; }"

curl -X POST http://localhost/execute \
    -H "Content-Type: application/json" \
    -d "{\"code\":\"$cppCode\"}"
echo ""