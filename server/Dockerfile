FROM node:12-alpine
WORKDIR /server
ENV PATH /server/node_modules/.bin:$PATH
# install bcrypt dependencies https://github.com/kelektiv/node.bcrypt.js/wiki/Installation-Instructions#alpine-linux-based-images
RUN apk --no-cache add --virtual builds-deps build-base python
COPY package*.json ./
RUN npm install --silent
COPY . .
CMD npm run dev
