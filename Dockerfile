FROM node:alpine

WORKDIR /usr/app/frontend

COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npm install react-scripts@3.0.1 

COPY . ./

EXPOSE 3000

CMD ["npm", "start"]
