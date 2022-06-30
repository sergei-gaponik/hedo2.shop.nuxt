FROM node:16 AS appbuild
WORKDIR /usr/src/app
RUN npm install -g nuxt@2.13.3
COPY package.json ./
RUN npm install
COPY . .
RUN nuxt build

FROM node:16-alpine
WORKDIR /usr/src/app
COPY --from=appbuild /usr/src/app .

CMD [ "npm", "start" ]