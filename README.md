# C++ Code Execution API

### Prerequisites

- Node.js
- npm (Node.js package manager)
- Docker

## Quick Setup

### Install Node.js Dependencies

```
npm install
```

### Running the Server

```
node index.js
```

### API Usage

Execute C++ Code
- Endpoint: POST /execute
- Payload: JSON object containing the C++ code.
- Example:
```
curl -X POST http://localhost:3000/execute -H "Content-Type: application/json" -d "{\"code\":\"#include <iostream>\\nint main() { std::cout << \\\"Hello World\\\" << std::endl; return 0; }\"}"
```

## Testing

#### Execution timeout
```
{
  "code": "#include <iostream>\nint main() { while(true) {  } return 0; }"
}
```

#### High Memory Usage
```
{
  "code": "#include <iostream>\n#include <vector>\nint main() { std::vector<int> v(100000000); return 0; }"
}
```