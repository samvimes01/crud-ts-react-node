FROM node:12-alpine
WORKDIR /client
ENV PATH /client/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install --silent
COPY . .
CMD ["npm", "start"]
