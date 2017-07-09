FROM node:latest

RUN mkdir /src

WORKDIR /src

ADD ./package.json /src/package.json

RUN npm install

EXPOSE 8000

CMD npm start