
FROM node:16


WORKDIR /usr/src/app


COPY . .


RUN yarn
RUN npm i -g pm2

EXPOSE 8080

CMD ["pm2-runtime", "start", "pm2/ecosystem.config.js"]
