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

### Build the cpp Docker image

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

[Manual testing](tests)

## Node Docker Server

#### Build the nodejs server Docker image

```bash
docker build -t cpp-exec-app -f node_server/Dockerfile .
```

#### Run the nodejs server Docker container

```bash
docker run -d -p 80:3000 -v /var/run/docker.sock:/var/run/docker.sock cpp-exec-app
```
<details>
<summary>Windows</summary>

```bash
docker run -d -p 80:3000 -v //var/run/docker.sock:/var/run/docker.sock cpp-exec-app
```

</details>

#### Usage

###### Locally

```bash
curl -X POST http://localhost/execute -H "Content-Type: application/json" -d "{\"code\":\"#include <iostream>\\nint main() { std::cout << \\\"Hello World\\\" << std::endl; return 0; }\"}"
```

###### Server

```bash
curl -X POST http://ip-or-dns/execute -H "Content-Type: application/json" -d "{\"code\":\"#include <iostream>\\nint main() { std::cout << \\\"Hello World\\\" << std::endl; return 0; }\"}"
```

## Sandbox (manual debug)

```bash
./start_sandbox.sh
```

## Docker utils
<details>
<summary>Show</summary>

```bash
docker images
docker ps
```

##### Stop container
```bash
docker stop [CONTAINER_ID]
```

##### Delete container
```bash
docker rm [CONTAINER_ID]
```

##### Delete Image
```bash
docker rmi [IMAGE_ID]
```

##### Enter Container
```bash
docker exec -it [CONTAINER_ID] /bin/bash
```
Or (Windows)
```bash
docker exec -it [CONTAINER_ID] //bin/bash
```

##### Show and Remove Unused Docker Images
```bash
docker images -f "dangling=true"
```
```bash
docker rmi -f $(docker images -f "dangling=true" -q)
```

##### Others
```bash
docker network inspect bridge
```
```bash
docker scout cache prune
```

</details>