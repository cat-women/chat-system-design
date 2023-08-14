FROM node:16-alpine
WORKDIR ./server

ADD ./package.json .
RUN npm install

RUN mkdir ./src

ADD ./src/* ./src/

ADD ./server.js .

EXPOSE 8000

CMD ["npm", "start"]
