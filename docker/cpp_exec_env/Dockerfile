FROM ubuntu:22.04

RUN apt-get update && apt-get install -y g++ \
    && rm -rf /var/lib/apt/lists/*

RUN useradd -m appuser
USER appuser

WORKDIR /usr/src/app

CMD ["/bin/bash"]
