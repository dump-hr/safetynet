FROM node:18-slim AS builder
WORKDIR /app
ENV PORT 3000
EXPOSE 3000
HEALTHCHECK CMD curl -f http://localhost:3000/app/healthcheck || exit 1
LABEL org.opencontainers.image.source https://github.com/dump-hr/safetynet

RUN apt-get update && apt-get install -y curl git && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock ./
COPY prisma ./prisma/

RUN yarn install --immutable && yarn cache clean

COPY . .

RUN yarn build

CMD [ "yarn", "start:prod" ]