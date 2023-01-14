FROM node:19

COPY metadata.controller.js /
COPY secrets.json /
COPY package-lock.json /
COPY package.json /

RUN npm install
EXPOSE 3000