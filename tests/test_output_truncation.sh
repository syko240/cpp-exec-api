#!/bin/bash

cppCode="#include <iostream>\\nint main() { for(int i = 1; i < 500; ++i) { std::cout << \\\"Line \\\" << i << \\\" of output\\\\n\\\"; } return 0; }"

curl -X POST http://localhost:3000/execute \
    -H "Content-Type: application/json" \
    -d "{\"code\":\"$cppCode\"}"

echo ""