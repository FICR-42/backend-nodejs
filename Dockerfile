# este documento contém os passos para criação da imagem com o backend em nodejs
FROM node:12.16.2-alpine
WORKDIR /usr/app/backend-nodejs/
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000

CMD [ "npm", "start" ]

# COPY /database/init_mysql.sh init_mysql.sh
# RUN chmod +x /usr/app/backend/database/init_mysql.sh
