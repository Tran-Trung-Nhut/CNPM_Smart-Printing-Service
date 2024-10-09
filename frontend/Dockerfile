FROM node:18.15-alpine

WORKDIR /frontend

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5173

ENV PORT=5173

CMD [ "npm", "start" ]

# CMD [ "npm", "run", "dev" ]