FROM node:10-alpine

WORKDIR /usr/src/app

COPY packages/api-gateway/package.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY packages/api-gateway .

EXPOSE 3000

CMD ["yarn", "start"]