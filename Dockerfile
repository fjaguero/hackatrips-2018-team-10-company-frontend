FROM node:boron

WORKDIR /usr/travel-app/src

COPY . .

RUN yarn install
RUN yarn build

ENTRYPOINT ["yarn", "serve"]

