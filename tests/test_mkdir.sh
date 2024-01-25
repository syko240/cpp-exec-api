#!/bin/bash

cppCode="#include <cstdlib>\\nint main() { system(\\\"mkdir /some_restricted_directory\\\"); return 0; }"

curl -X POST http://localhost/execute \
    -H "Content-Type: application/json" \
    -d "{\"code\":\"$cppCode\"}"
echo ""
