## Manual Setup

### Build Images and Volumes

```bash
docker volume create cpp-exec-files
```

#### Build the nodejs server Docker image

```bash
docker build -t cpp-exec-app -f docker/cpp_exec_app/Dockerfile .
```

### Build the cpp Docker image

```bash
docker build --no-cache -t cpp-exec-env -f docker/cpp_exec_env/Dockerfile .
```

### Run the nodejs server Docker container

##### Important: Modify naming of Volume Mount and Docker Image: [dockerCommand](../src/utils/dockerExec.js)

```bash
docker run -d -p 80:3000 -v cpp-exec-files:/usr/src/app/temp_executables -v /var/run/docker.sock:/var/run/docker.sock cpp-exec-app
```
<details>
<summary>Windows</summary>

```bash
docker run -d -p 80:3000 -v cpp-exec-files:/usr/src/app/temp_executables -v //var/run/docker.sock:/var/run/docker.sock cpp-exec-app
```

</details>

## Docker stuff
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
```bash
docker-compose up --build
```
```bash
docker-compose up -d
```

</details>