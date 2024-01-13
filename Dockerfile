FROM ubuntu:latest

RUN apt-get update && apt-get install -y g++
WORKDIR /usr/src/app

#COPY . .

CMD ["/bin/bash"]