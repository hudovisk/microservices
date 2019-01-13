FROM node:10-alpine

WORKDIR /usr/src/app

COPY packages/auth/package.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY packages/auth .

EXPOSE 3000

CMD ["yarn", "start"]