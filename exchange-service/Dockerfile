FROM node:carbon

RUN npm install -g yarn

# Create app directory
COPY . /usr/src/exchange-service
WORKDIR /usr/src/exchange-service

# Install app dependencies
RUN yarn

CMD ["yarn", "start"]

EXPOSE 3001
