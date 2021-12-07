FROM node:14.18.1

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent

COPY . ./

CMD ["npm", "start"]