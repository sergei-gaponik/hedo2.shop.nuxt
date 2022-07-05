FROM node:16-alpine
WORKDIR /usr/src/app
RUN npm install -g nuxt@2.13.3
COPY ./package.json ./package.json
COPY ./node_modules ./node_modules
COPY ./dist ./dist
COPY ./.nuxt ./.nuxt

CMD [ "npm", "start" ]

