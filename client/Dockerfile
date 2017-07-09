FROM node:latest

RUN mkdir /src

WORKDIR /src
ADD package.json /src/package.json
RUN npm install

EXPOSE 4000

CMD npm start