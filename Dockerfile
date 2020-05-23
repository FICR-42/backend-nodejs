FROM node:12.16.2-alpine
WORKDIR /usr/app/backend-nodejs/
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000

CMD [ "npm", "start" ]
