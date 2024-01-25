#!/bin/bash

for i in {1..11}
do
   curl -X POST http://localhost/execute -H "Content-Type: application/json" -d "{\"code\":\"#include <iostream>\\nint main() { std::cout << \\\"Hello World\\\" << std::endl; return 0; }\"}"
   echo ""
done