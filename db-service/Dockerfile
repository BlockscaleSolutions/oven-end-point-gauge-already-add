FROM node:carbon

RUN npm install -g yarn

# Create app directory
COPY . /usr/src/template-service
WORKDIR /usr/src/template-service

# Install app dependencies
RUN yarn

CMD ["yarn", "start"]

EXPOSE 3001
