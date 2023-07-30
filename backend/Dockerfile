FROM node:18

WORKDIR /queuequicker

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8800
EXPOSE 8080

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait

RUN chmod +x /wait

CMD /wait && npm start