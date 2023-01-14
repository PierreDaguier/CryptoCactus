FROM node:17

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN yarn 

# Bundle app source
COPY . .

# Expose port and start the service
EXPOSE 4000
CMD [ "npm", "start" ]
