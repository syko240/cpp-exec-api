# C++ Code Execution API

### Prerequisites

- Node.js
- npm (Node.js package manager)
- Docker
- Docker Compose

## Quick Setup

#### Running the Server with Docker Compose
```bash
docker-compose up -d
```

#### Inspect 
```bash
docker-compose logs
```

#### Stop the services
```bash
docker-compose down
```

### API Usage

Execute C++ Code
- Endpoint: POST /execute
- Payload: JSON object containing the C++ code.
- Example:
```bash
curl -X POST http://localhost/execute -H "Content-Type: application/json" -d "{\"code\":\"#include <iostream>\\nint main() { std::cout << \\\"Hello World\\\" << std::endl; return 0; }\"}"
```
or
```bash
curl -X POST http://ip-or-dns/execute -H "Content-Type: application/json" -d "{\"code\":\"#include <iostream>\\nint main() { std::cout << \\\"Hello World\\\" << std::endl; return 0; }\"}"
```

## Testing

#### Execution timeout
###### Payload
```json
{
  "code": "#include <iostream>\nint main() { while(true) {} return 0; }"
}
```

#### High Memory Usage
###### Payload
```json
{
  "code": "#include <iostream>\n#include <vector>\nint main() { std::vector<int> v(100000000); return 0; }"
}
```

[Manual testing](tests)