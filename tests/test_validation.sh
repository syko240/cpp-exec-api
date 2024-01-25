#!/bin/bash

send_code() {
    local code=$1
    local json=$(printf '{"code": "%s"}' "$code")
    echo "Testing code: $code"
    curl -X POST http://localhost/execute \
        -H "Content-Type: application/json" \
        -d "$json"
    echo -e "\n"
}

# system call
send_code "#include <cstdlib>\\nint main() { system(\\\"ls\\\"); return 0; }"

# file stream
send_code "#include <fstream>\\nint main() { std::fstream fs; fs.open(\\\"test.txt\\\", std::fstream::in | std::fstream::out); return 0; }"

# infinite loop with while
send_code "int main() { while(true) {}; return 0; }"

# large memory allocation with malloc
send_code "#include <cstdlib>\\nint main() { malloc(10000000); return 0; }"

# thread creation
send_code "#include <thread>\\nint main() { std::thread t([](){}); t.join(); return 0; }"

# safe code
send_code "#include <iostream>\\nint main() { std::cout << \\\"Hello, World!\\\" << std::endl; return 0; }"
send_code "#include <vector>\\nint main() { std::vector<int> v = {1, 2, 3}; return 0; }"
send_code "#include <iostream>\\nint main() { int a = 5; int b = 10; int c = a + b; std::cout << c << std::endl; return 0; }"