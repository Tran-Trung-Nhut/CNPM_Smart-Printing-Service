FROM node:18-alpine

WORKDIR /backend

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]

#docker build --tag node-docker .
# docker run -p 8000:8000 -d node-docker