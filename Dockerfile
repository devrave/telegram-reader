FROM node:16-alpine

WORKDIR /usr/devrave/telegram-reader

COPY package*.json ./

RUN npm ci
RUN npm install -g @nestjs/cli

COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
