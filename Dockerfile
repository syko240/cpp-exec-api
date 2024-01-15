FROM ubuntu:22.04

RUN apt-get update && apt-get install -y g++ \
    && rm -rf /var/lib/apt/lists/* \
    && useradd -m cppuser

WORKDIR /usr/src/app

USER cppuser

CMD ["/bin/bash"]