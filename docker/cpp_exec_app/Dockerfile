FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN apt-get update && apt-get install -y docker.io vim

COPY . .

EXPOSE 3000

ENV PORT=3000

CMD ["/bin/bash", "-c", "npm start"]