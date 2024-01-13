# C++ Code Execution API

### Prerequisites

- Node.js
- npm (Node.js package manager)
- Docker

## Quick Setup

### Install Node.js Dependencies

```bash
npm install
```

### Build the Docker image

```bash
docker build --no-cache -t cpp-exec-env .
```

### Running the Server

```bash
npm start
```

### API Usage

Execute C++ Code
- Endpoint: POST /execute
- Payload: JSON object containing the C++ code.
- Example:
```bash
curl -X POST http://localhost:3000/execute -H "Content-Type: application/json" -d "{\"code\":\"#include <iostream>\\nint main() { std::cout << \\\"Hello World\\\" << std::endl; return 0; }\"}"
```

## Testing

#### Execution timeout
###### Payload
```json
{
  "code": "#include <iostream>\nint main() { while(true) {  } return 0; }"
}
```

#### High Memory Usage
###### Payload
```json
{
  "code": "#include <iostream>\n#include <vector>\nint main() { std::vector<int> v(100000000); return 0; }"
}
```

## Sandbox (manual debug)

```bash
chmod +x start_sandbox.sh
```

```bash
./start_sandbox.sh
```